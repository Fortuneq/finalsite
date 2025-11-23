# Quick Start Guide

## Первоначальная настройка (делается один раз)

### 1. На локальной машине

```bash
# Войдите в Docker Hub
docker login

# Установите ваш Docker Hub username
export DOCKER_USERNAME=your-dockerhub-username

# Добавьте в ~/.zshrc для постоянного использования
echo 'export DOCKER_USERNAME=your-dockerhub-username' >> ~/.zshrc
source ~/.zshrc
```

### 2. На сервере

```bash
# Подключитесь к серверу
ssh user@your-server

# Установите переменную окружения
export DOCKER_USERNAME=your-dockerhub-username

# Добавьте в ~/.bashrc
echo 'export DOCKER_USERNAME=your-dockerhub-username' >> ~/.bashrc
source ~/.bashrc
```

## Ежедневный процесс деплоя

### На локальной машине (разработка)

```bash
# 1. Внесите изменения в код
# 2. Протестируйте
npm run dev

# 3. Соберите и отправьте образ
./build-and-push.sh
```

Скрипт соберет образ (~5-10 минут) и отправит в Docker Hub (~1-2 минуты).

### На сервере (деплой)

```bash
# Просто запустите скрипт деплоя
./deploy.sh
```

Это займет ~1-2 минуты вместо 20+ минут!

## Что происходит?

**Локально:**
- Собирается Docker образ (долго, но у вас мощный компьютер)
- Образ отправляется в Docker Hub (быстро)

**На сервере:**
- Скачивается готовый образ из Docker Hub (быстро)
- Запускаются контейнеры (мгновенно)

## Дополнительная информация

Смотрите `DOCKER_DEPLOY.md` для подробной документации.
