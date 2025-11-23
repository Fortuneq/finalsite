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

echo -e "${BLUE}Building image: ${FULL_IMAGE_NAME}${NC}"

# Сборка образа
docker build -t "${FULL_IMAGE_NAME}" .

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Тегируем также как latest если это не latest
if [ "$VERSION" != "latest" ]; then
    docker tag "${FULL_IMAGE_NAME}" "${IMAGE_NAME}:latest"
    echo -e "${GREEN}Tagged as latest${NC}"
fi

# Показываем размер образа
echo -e "${BLUE}Image size:${NC}"
docker images "${IMAGE_NAME}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Спрашиваем подтверждение на пуш
echo -e "${BLUE}Do you want to push the image to Docker Hub? (y/n)${NC}"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo -e "${BLUE}Pushing image...${NC}"

    # Пушим версионный тег
    docker push "${FULL_IMAGE_NAME}"

    if [ $? -ne 0 ]; then
        echo -e "${RED}Push failed! Make sure you are logged in: docker login${NC}"
        exit 1
    fi

    # Пушим latest если был создан
    if [ "$VERSION" != "latest" ]; then
        docker push "${IMAGE_NAME}:latest"
    fi

    echo -e "${GREEN}Successfully pushed to Docker Hub!${NC}"
    echo -e "${GREEN}Image: ${FULL_IMAGE_NAME}${NC}"
    echo ""
    echo -e "${BLUE}To use on server, update docker-compose.yml with:${NC}"
    echo "  nextjs:"
    echo "    image: ${FULL_IMAGE_NAME}"
else
    echo -e "${BLUE}Push cancelled${NC}"
fi