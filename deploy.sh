#!/bin/bash

# Deployment script for finalsite - pulls pre-built image from Docker Hub
echo "Deploying finalsite to aloda.agency..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if DOCKER_USERNAME is set
if [ -z "$DOCKER_USERNAME" ]; then
    echo -e "${RED}✗ DOCKER_USERNAME environment variable is not set${NC}"
    echo "Please set it: export DOCKER_USERNAME=your-dockerhub-username"
    exit 1
fi

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

# Settings
IMAGE_NAME="${DOCKER_USERNAME}/finalsite-nextjs:latest"
COMPOSE_FILE="docker-compose.prod.yml"

echo -e "${BLUE}Step 1: Pulling latest image from Docker Hub...${NC}"
docker pull "${IMAGE_NAME}"

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to pull image${NC}"
    echo "Make sure the image exists on Docker Hub: ${IMAGE_NAME}"
    exit 1
fi

echo -e "${GREEN}✓ Image pulled successfully${NC}"

echo -e "${BLUE}Step 2: Stopping old containers...${NC}"
docker compose -f "${COMPOSE_FILE}" down

echo -e "${BLUE}Step 3: Starting new containers...${NC}"
docker compose -f "${COMPOSE_FILE}" up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to start containers${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Containers started${NC}"

# Wait for containers to start
echo -e "${BLUE}⏳ Waiting for containers to start...${NC}"
sleep 5

echo -e "${BLUE}Step 4: Checking container status...${NC}"
docker compose -f "${COMPOSE_FILE}" ps

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}📋 Recent logs:${NC}"
docker compose -f "${COMPOSE_FILE}" logs --tail=30 nextjs
echo ""
echo -e "${YELLOW}💡 Useful commands:${NC}"
echo "  - View live logs: docker compose -f ${COMPOSE_FILE} logs -f"
echo "  - Stop services: docker compose -f ${COMPOSE_FILE} down"
echo "  - Restart services: docker compose -f ${COMPOSE_FILE} restart"
echo "  - Check status: docker compose -f ${COMPOSE_FILE} ps"
