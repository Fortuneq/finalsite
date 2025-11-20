#!/bin/bash

# Deployment script for finalsite
echo "Deploying finalsite to aloda.agency..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}✗ Docker is not running${NC}"
    exit 1
fi

# Check if docker compose is available
if ! docker compose version &> /dev/null; then
    echo -e "${RED}✗ docker compose is not available${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Building Docker image...${NC}"
docker compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"

echo -e "${BLUE}Step 2: Starting containers...${NC}"
docker compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to start containers${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Containers started${NC}"

echo -e "${BLUE}Step 3: Checking container status...${NC}"
docker compose ps

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Make sure your domain aloda.agency points to this server"
echo "  2. Run './setup-ssl.sh your-email@example.com' to set up HTTPS"
echo ""
echo "Useful commands:"
echo "  - View logs: docker compose logs -f"
echo "  - Stop services: docker compose down"
echo "  - Restart services: docker compose restart"
