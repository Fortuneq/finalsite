# Final Deploy Steps - Готово к деплою!

## ✅ Что уже сделано на локальной машине:

1. ✅ Docker образ собран для **linux/amd64** (x86_64 VPS)
2. ✅ Образ отправлен в Docker Hub: **vladfortune/finalsite-nextjs:latest**
3. ✅ Все скрипты и конфигурации закоммичены в Git

## 📋 Действия на сервере (VPS):

### 1. Подключитесь к серверу

```bash
ssh user@your-server
```

### 2. Перейдите в директорию проекта

```bash
cd /path/to/finalSiteBroFinal
```

### 3. Получите последние изменения из Git

```bash
git pull origin master
```

Вы получите:
- `docker-compose.prod.yml` - конфигурация для production
- `deploy.sh` - скрипт для быстрого деплоя
- Обновленную документацию

### 4. Установите переменную окружения

```bash
export DOCKER_USERNAME=vladfortune

# Добавьте в ~/.bashrc для постоянного использования
echo 'export DOCKER_USERNAME=vladfortune' >> ~/.bashrc
source ~/.bashrc
```

### 5. Запустите деплой

```bash
./deploy.sh
```

Скрипт автоматически:
- Скачает готовый образ из Docker Hub (~1-2 минуты)
- Остановит старые контейнеры
- Запустит новые контейнеры
- Покажет статус и логи

### 6. Проверьте работу сайта

```bash
# Проверка статуса контейнеров
docker compose -f docker-compose.prod.yml ps

# Проверка логов
docker compose -f docker-compose.prod.yml logs -f nextjs

# Проверка через curl
curl http://localhost:3000

# Проверка в браузере
# Откройте http://aloda.agency
```

## 🎯 Результат

**Время деплоя сократилось с 20+ минут до 1-2 минут!**

- Локальная сборка: ~5-7 минут (один раз)
- Деплой на сервере: ~1-2 минуты (каждый раз)

## 🔄 Процесс обновления (в будущем)

### На локальной машине:

```bash
# 1. Внесите изменения в код
# 2. Соберите и отправьте образ
./build-and-push.sh
```

### На сервере:

```bash
# Просто запустите деплой
./deploy.sh
```

## 🐛 Troubleshooting

### Если контейнеры не запускаются:

```bash
# Посмотрите логи
docker compose -f docker-compose.prod.yml logs

# Пересоздайте контейнеры
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --force-recreate
```

### Если образ не скачивается:

```bash
# Проверьте переменную окружения
echo $DOCKER_USERNAME

# Попробуйте скачать вручную
docker pull vladfortune/finalsite-nextjs:latest
```

### Если порты заняты:

```bash
# Найдите процессы на портах
sudo lsof -i :80
sudo lsof -i :443

# Остановите старые контейнеры
docker ps -a
docker stop <container_id>
docker rm <container_id>
```

## 📝 Полезные команды на сервере

```bash
# Просмотр логов в реальном времени
docker compose -f docker-compose.prod.yml logs -f

# Перезапуск сервисов
docker compose -f docker-compose.prod.yml restart

# Остановка всех сервисов
docker compose -f docker-compose.prod.yml down

# Запуск всех сервисов
docker compose -f docker-compose.prod.yml up -d

# Просмотр использования ресурсов
docker stats

# Очистка неиспользуемых образов
docker image prune -a
```

## 📚 Дополнительная документация

- `DOCKER_DEPLOY.md` - подробная документация по Docker деплою
- `QUICKSTART.md` - краткая инструкция
- `SERVER_SETUP.md` - настройка сервера
- `DEPLOYMENT_CHECKLIST.md` - чеклист для деплоя
