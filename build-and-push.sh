#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Docker Image Build & Push Script ===${NC}"

# Проверяем переменные окружения
if [ -z "$DOCKER_USERNAME" ]; then
    echo -e "${RED}Error: DOCKER_USERNAME environment variable is not set${NC}"
    echo "Please set it: export DOCKER_USERNAME=your-dockerhub-username"
    exit 1
fi

# Настройки
IMAGE_NAME="${DOCKER_USERNAME}/finalsite-nextjs"
VERSION="${1:-latest}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${VERSION}"

echo -e "${BLUE}Building image for linux/amd64 (x86_64 VPS): ${FULL_IMAGE_NAME}${NC}"

# Создаем builder если его нет
if ! docker buildx ls | grep -q "multiplatform"; then
    echo -e "${BLUE}Creating builder...${NC}"
    docker buildx create --name multiplatform --use
    docker buildx inspect --bootstrap
fi

# Сборка и пуш образа для AMD64
echo -e "${BLUE}Building and pushing image...${NC}"
docker buildx build \
    --platform linux/amd64 \
    -t "${FULL_IMAGE_NAME}" \
    --push \
    .

if [ $? -ne 0 ]; then
    echo -e "${RED}Build and push failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Build and push successful!${NC}"

# Тегируем также как latest если это не latest
if [ "$VERSION" != "latest" ]; then
    echo -e "${BLUE}Pushing additional tag: ${IMAGE_NAME}:latest${NC}"
    docker buildx build \
        --platform linux/amd64 \
        -t "${IMAGE_NAME}:latest" \
        --push \
        .
    echo -e "${GREEN}Tagged and pushed as latest${NC}"
fi

echo -e "${GREEN}Successfully pushed to Docker Hub!${NC}"
echo -e "${GREEN}Image: ${FULL_IMAGE_NAME}${NC}"
echo -e "${GREEN}Platform: linux/amd64 (compatible with x86_64 VPS)${NC}"
echo ""
echo -e "${BLUE}To use on server, update docker-compose.yml with:${NC}"
echo "  nextjs:"
echo "    image: ${FULL_IMAGE_NAME}"