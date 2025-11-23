# Docker Deployment Guide

Эта инструкция описывает процесс сборки Docker образа локально и развертывания на сервере через Docker Hub.

## Преимущества этого подхода

- **Быстрое развертывание**: на сервере не нужно собирать образ (20+ минут), только скачать готовый (1-2 минуты)
- **Консистентность**: гарантия, что локально протестированный образ будет работать на сервере
- **Версионирование**: возможность откатиться на предыдущую версию
- **Меньше нагрузки на сервер**: нет необходимости в мощном CPU для сборки

## Первоначальная настройка

### 1. Создание Docker Hub аккаунта

1. Перейдите на https://hub.docker.com
2. Создайте аккаунт (если еще нет)
3. Запомните ваш username

### 2. Настройка локальной машины

```bash
# Войдите в Docker Hub
docker login

# Установите переменную окружения с вашим Docker Hub username
export DOCKER_USERNAME=your-dockerhub-username

# Добавьте эту строку в ~/.zshrc или ~/.bashrc для постоянного использования
echo 'export DOCKER_USERNAME=your-dockerhub-username' >> ~/.zshrc
source ~/.zshrc
```

### 3. Настройка сервера

```bash
# На сервере также установите переменную окружения
ssh user@your-server
export DOCKER_USERNAME=your-dockerhub-username

# Добавьте в ~/.bashrc или ~/.zshrc
echo 'export DOCKER_USERNAME=your-dockerhub-username' >> ~/.bashrc
source ~/.bashrc
```

## Процесс разработки и развертывания

### Локальная разработка и сборка

```bash
# 1. Внесите изменения в код
# 2. Протестируйте локально
npm run dev

# 3. Соберите и отправьте образ в Docker Hub
./build-and-push.sh

# Или с версией (рекомендуется)
./build-and-push.sh v1.0.0
```

Скрипт `build-and-push.sh` автоматически:
- Соберет Docker образ
- Покажет размер образа
- Спросит подтверждение перед отправкой в Docker Hub
- Отправит образ с указанной версией и тегом `latest`

### Развертывание на сервере

```bash
# 1. Подключитесь к серверу
ssh user@your-server

# 2. Перейдите в директорию проекта
cd /path/to/finalSiteBroFinal

# 3. Скачайте последнюю версию образа
docker pull $DOCKER_USERNAME/finalsite-nextjs:latest

# 4. Остановите старые контейнеры
docker-compose -f docker-compose.prod.yml down

# 5. Запустите новые контейнеры
docker-compose -f docker-compose.prod.yml up -d

# 6. Проверьте логи
docker-compose -f docker-compose.prod.yml logs -f nextjs
```

## Полезные команды

### Просмотр доступных образов

```bash
# Список локальных образов
docker images $DOCKER_USERNAME/finalsite-nextjs

# Список образов на Docker Hub
docker search $DOCKER_USERNAME/finalsite-nextjs
```

### Работа с версиями

```bash
# Сборка с конкретной версией
./build-and-push.sh v1.2.3

# Развертывание конкретной версии на сервере
docker pull $DOCKER_USERNAME/finalsite-nextjs:v1.2.3
# Отредактируйте docker-compose.prod.yml, заменив :latest на :v1.2.3
docker-compose -f docker-compose.prod.yml up -d
```

### Откат на предыдущую версию

```bash
# Найдите нужную версию
docker images $DOCKER_USERNAME/finalsite-nextjs

# Запустите контейнер с этой версией
docker-compose -f docker-compose.prod.yml down
# Измените версию в docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

### Очистка старых образов

```bash
# На локальной машине
docker image prune -a

# На сервере
docker image prune -a
```

## Автоматизация (опционально)

### Создание скрипта для быстрого деплоя на сервере

Создайте файл `deploy.sh` на сервере:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Скачиваем последний образ
echo "📥 Pulling latest image..."
docker pull $DOCKER_USERNAME/finalsite-nextjs:latest

# Останавливаем старые контейнеры
echo "🛑 Stopping old containers..."
docker-compose -f docker-compose.prod.yml down

# Запускаем новые
echo "▶️  Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Показываем статус
echo "✅ Deployment complete!"
docker-compose -f docker-compose.prod.yml ps

# Показываем последние логи
echo "📋 Recent logs:"
docker-compose -f docker-compose.prod.yml logs --tail=50 nextjs
```

Сделайте его исполняемым:
```bash
chmod +x deploy.sh
```

Теперь для деплоя достаточно:
```bash
./deploy.sh
```

## Структура файлов

- `Dockerfile` - описание сборки образа (multi-stage build для оптимизации размера)
- `docker-compose.yml` - для локальной разработки (собирает образ)
- `docker-compose.prod.yml` - для production (использует готовый образ)
- `build-and-push.sh` - скрипт для сборки и отправки образа
- `deploy.sh` (опционально) - скрипт для быстрого деплоя на сервере

## Troubleshooting

### Ошибка при docker login

```bash
# Убедитесь, что Docker Desktop запущен
# Попробуйте выйти и войти снова
docker logout
docker login
```

### Ошибка "permission denied" при push

```bash
# Убедитесь, что вы залогинены
docker login

# Проверьте имя образа (должно начинаться с вашего username)
docker images | grep finalsite
```

### Образ не обновляется на сервере

```bash
# Принудительно скачайте свежий образ
docker pull $DOCKER_USERNAME/finalsite-nextjs:latest --no-cache

# Пересоздайте контейнеры
docker-compose -f docker-compose.prod.yml up -d --force-recreate
```

### Проверка размера образа

```bash
# Посмотреть размер
docker images $DOCKER_USERNAME/finalsite-nextjs --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Если образ слишком большой, проверьте .dockerignore
```

## Best Practices

1. **Всегда тестируйте локально** перед отправкой в Docker Hub
2. **Используйте версионирование** для важных релизов (v1.0.0, v1.1.0, и т.д.)
3. **Регулярно очищайте старые образы** чтобы не засорять место
4. **Проверяйте логи** после деплоя на сервере
5. **Делайте бэкапы** перед мажорными обновлениями
