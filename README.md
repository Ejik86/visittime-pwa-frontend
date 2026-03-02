# Данила Мастер — Онлайн-запись (PWA)

Современный Frontend для системы онлайн-записи барбершопа "Данила Мастер".
Дизайн выполнен в премиальном темном стиле с серо-зелеными акцентами, реализован как Progressive Web App (PWA).

## Стэк технологий
- Next.js 16 (App Router, Static Export)
- TypeScript
- Tailwind CSS v4
- Zustand
- PWA (Service Worker + Manifest)
- Docker + Nginx (production)

---

## Локальная разработка

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Развертывание на сервере (первый раз)

### 1. Требования к серверу
- Ubuntu 22.04+
- Docker и Docker Compose v2
- Домен, направленный A-записью на IP сервера (Cloudflare DNS → «DNS only», без прокси)

### 2. Установка Docker (если не установлен)
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
# перезайти в SSH-сессию после добавления в группу
```

### 3. Создание deploy-пользователя (опционально)
```bash
sudo adduser deploy --disabled-password
sudo usermod -aG docker deploy
sudo mkdir -p /home/deploy/.ssh
# скопировать публичный ключ:
sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
sudo chown -R deploy:deploy /home/deploy/.ssh
```

### 4. Клонирование репозитория
```bash
sudo mkdir -p /opt/visittime/prod
sudo chown $(whoami):$(whoami) /opt/visittime/prod
cd /opt/visittime/prod
git clone https://github.com/Ejik86/visittime-pwa-frontend.git .
```

### 5. Создание .env
```bash
cp .env.example .env
nano .env
# Указать DOMAIN=your-domain.ru
```

### 6. Получение SSL-сертификата (Let's Encrypt)

Перед первым запуском с HTTPS нужно получить сертификат. Временно запустим Nginx на порту 80 без SSL:
```bash
# Создать директорию для certbot webroot
mkdir -p certbot-webroot

# Установить certbot
sudo apt install -y certbot

# Получить сертификат (домен должен указывать на этот сервер)
sudo certbot certonly --standalone -d YOUR_DOMAIN --agree-tos --email your@email.com --non-interactive
```

### 7. Запуск
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### 8. Проверка
```bash
curl -f https://YOUR_DOMAIN/
curl -f https://YOUR_DOMAIN/health
```

### 9. Автозапуск после перезагрузки
Docker уже настроен на автозапуск (`restart: unless-stopped`). Убедитесь, что Docker-сервис включён:
```bash
sudo systemctl enable docker
```

### 10. Обновление SSL (автоматическое)
```bash
# Добавить в crontab:
sudo crontab -e
# Добавить строку:
0 3 1 */2 * certbot renew --quiet && docker compose -f /opt/visittime/prod/docker-compose.prod.yml restart
```

---

## GitHub Actions (CI/CD)

Деплой происходит автоматически при пуше в `main`.

**Необходимые GitHub Secrets** (Settings → Secrets → Actions):
| Secret | Описание |
|--------|----------|
| `SERVER_HOST` | IP или домен сервера |
| `SERVER_USER` | Пользователь для SSH (например `deploy`) |
| `SERVER_SSH_KEY` | Приватный SSH-ключ пользователя |

---

## Настройка контента

| Что изменить | Где редактировать |
|---|---|
| Услуги (название, цена, время) | `src/lib/api.ts` → `MOCK_SERVICES` |
| Слоты времени | `src/lib/api.ts` → `getTimeSlots` |
| Акцентный цвет | `src/app/globals.css` → `--color-accent` |
| Контакты / адрес | `src/app/page.tsx` |
