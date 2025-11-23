# Server Setup Instructions

## Единоразовая настройка на сервере

### 1. Подключитесь к серверу

```bash
ssh user@your-server
```

### 2. Перейдите в директорию проекта

```bash
cd /path/to/finalSiteBroFinal
```

### 3. Скопируйте новые файлы с Git

```bash
git pull origin master
```

### 4. Установите переменную окружения

```bash
export DOCKER_USERNAME=vladfortune

# Добавьте в ~/.bashrc для постоянного использования
echo 'export DOCKER_USERNAME=vladfortune' >> ~/.bashrc
source ~/.bashrc
```

### 5. Убедитесь, что Docker установлен

```bash
docker --version
docker compose version
```

Если Docker не установлен, установите его:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Выйдите и войдите снова для применения изменений группы
```

## Процесс деплоя (каждый раз)

После того как вы собрали и отправили образ с локальной машины:

```bash
# На сервере просто запустите:
./deploy.sh
```

Скрипт автоматически:
1. Скачает последний образ из Docker Hub (~1-2 минуты)
2. Остановит старые контейнеры
3. Запустит новые контейнеры
4. Покажет статус и логи

## Проверка работы

После деплоя проверьте:

```bash
# Статус контейнеров
docker compose -f docker-compose.prod.yml ps

# Логи
docker compose -f docker-compose.prod.yml logs -f nextjs

# Проверка сайта
curl http://localhost:3000
```

## Устранение проблем

### Контейнеры не запускаются

```bash
# Посмотрите логи
docker compose -f docker-compose.prod.yml logs

# Пересоздайте контейнеры
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --force-recreate
```

### Образ не скачивается

```bash
# Проверьте, что переменная установлена
echo $DOCKER_USERNAME

# Попробуйте скачать вручную
docker pull vladfortune/finalsite-nextjs:latest
```

### Порты заняты

```bash
# Найдите процессы на портах 80/443
sudo lsof -i :80
sudo lsof -i :443

# Остановите старые контейнеры
docker ps -a
docker stop <container_id>
docker rm <container_id>
```

## Полезные команды

```bash
# Просмотр всех контейнеров
docker ps -a

# Просмотр логов конкретного контейнера
docker logs finalsite-nextjs

# Вход в контейнер для отладки
docker exec -it finalsite-nextjs sh

# Очистка неиспользуемых образов
docker image prune -a

# Перезапуск только Next.js контейнера
docker compose -f docker-compose.prod.yml restart nextjs

# Остановка всех сервисов
docker compose -f docker-compose.prod.yml down

# Запуск всех сервисов
docker compose -f docker-compose.prod.yml up -d
```

## Мониторинг

```bash
# Использование ресурсов
docker stats

# Проверка работы сайта
curl -I http://localhost:3000

# Просмотр логов в реальном времени
docker compose -f docker-compose.prod.yml logs -f
```
