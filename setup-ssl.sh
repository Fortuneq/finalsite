#!/bin/bash

# Script to set up SSL certificate for aloda.agency
echo "Setting up SSL certificate for aloda.agency..."

# Check if email is provided
if [ -z "$1" ]; then
    echo "Usage: ./setup-ssl.sh your-email@example.com"
    exit 1
fi

EMAIL=$1
DOMAIN="aloda.agency"

echo "Step 1: Using HTTP-only configuration..."
# Temporarily use HTTP-only config
rm -f nginx/conf.d/default.conf
cp nginx/conf.d/http-only.conf nginx/conf.d/default.conf

echo "Step 2: Restarting nginx..."
docker compose restart nginx

echo "Step 3: Obtaining SSL certificate..."
docker compose run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo "Step 4: Certificate obtained successfully!"
    echo "Step 5: Switching to HTTPS configuration..."

    # Restore full HTTPS config
    cat > nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name aloda.agency www.aloda.agency;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name aloda.agency www.aloda.agency;

    ssl_certificate /etc/letsencrypt/live/aloda.agency/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aloda.agency/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    client_max_body_size 100M;

    location / {
        proxy_pass http://nextjs:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

    echo "Step 6: Reloading nginx with HTTPS configuration..."
    docker compose exec nginx nginx -s reload

    echo ""
    echo "✓ SSL certificate setup complete!"
    echo "✓ Your site is now accessible at https://aloda.agency"
else
    echo "✗ Failed to obtain SSL certificate"
    echo "Please check:"
    echo "  1. Your domain aloda.agency points to this server's IP"
    echo "  2. Ports 80 and 443 are open"
    echo "  3. No other services are using these ports"
    exit 1
fi
