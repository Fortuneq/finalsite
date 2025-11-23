# Deployment Checklist

## ✅ Локальная машина (сделано)

- [x] Docker Desktop установлен и запущен
- [x] Docker Hub username: **vladfortune**
- [x] Залогинены в Docker Hub: `docker login`
- [x] Переменная окружения установлена: `export DOCKER_USERNAME=vladfortune`
- [x] Образ собран: **vladfortune/finalsite-nextjs:latest** (337MB)
- [x] Образ отправлен в Docker Hub: ✅ успешно

## 📋 Что нужно сделать на сервере

### Единоразовая настройка:

1. [ ] Подключиться к серверу: `ssh user@your-server`
2. [ ] Перейти в директорию проекта: `cd /path/to/finalSiteBroFinal`
3. [ ] Скопировать новые файлы: `git pull origin master`
4. [ ] Установить переменную окружения:
   ```bash
   export DOCKER_USERNAME=vladfortune
   echo 'export DOCKER_USERNAME=vladfortune' >> ~/.bashrc
   source ~/.bashrc
   ```
5. [ ] Проверить Docker: `docker --version && docker compose version`
6. [ ] Сделать скрипт исполняемым: `chmod +x deploy.sh`

### Деплой (каждый раз):

1. [ ] На локальной машине собрать и отправить образ: `./build-and-push.sh`
2. [ ] На сервере запустить деплой: `./deploy.sh`
3. [ ] Проверить логи: `docker compose -f docker-compose.prod.yml logs -f`
4. [ ] Проверить сайт: открыть в браузере

## 🎯 Результат

**До:**
- Сборка на сервере: ~20 минут ⏱️

**После:**
- Сборка локально: ~5-7 минут (один раз)
- Деплой на сервере: ~1-2 минуты ⚡

**Экономия времени на каждом деплое: ~18 минут!**

## 📁 Созданные файлы

- `build-and-push.sh` - скрипт для сборки и пуша образа
- `deploy.sh` - скрипт для деплоя на сервере
- `docker-compose.prod.yml` - конфигурация для production
- `DOCKER_DEPLOY.md` - подробная документация
- `QUICKSTART.md` - краткая инструкция
- `SERVER_SETUP.md` - инструкции для сервера
- `.env.docker` - переменные окружения

## 🔗 Ссылки

- Docker Hub образ: https://hub.docker.com/r/vladfortune/finalsite-nextjs
- Размер образа: 337MB
- Multi-stage build для оптимизации размера

## 💡 Полезные команды

### На локальной машине:
```bash
# Собрать и отправить образ
./build-and-push.sh

# Или с версией
./build-and-push.sh v1.0.0

# Проверить локальные образы
docker images vladfortune/finalsite-nextjs
```

### На сервере:
```bash
# Деплой
./deploy.sh

# Посмотреть логи
docker compose -f docker-compose.prod.yml logs -f

# Статус контейнеров
docker compose -f docker-compose.prod.yml ps

# Перезапуск
docker compose -f docker-compose.prod.yml restart
```
