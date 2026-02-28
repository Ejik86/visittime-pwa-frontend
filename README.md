# Данила Мастер — Онлайн-запись (PWA)

Современный Frontend для системы онлайн-записи барбершопа "Данила Мастер". 
Дизайн выполнен в премиальном темном стиле с серо-зелеными акцентами, реализован как Progressive Web App (PWA) и готов к статическому размещению на Cloudflare Pages.

## Стэк технологий
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand
- PWA (Service Worker + Manifest)

## Запуск проекта локально

Убедитесь, что у вас установлен Node.js.

1. Установите зависимости:
```bash
npm install
```

2. Запустите сервер для разработки:
```bash
npm run dev
```

Проект будет доступен по адресу: http://localhost:3000

## Как редактировать услуги и время

В текущей версии все данные мокируются в файле `src/lib/api.ts`:
- **Услуги**: редактируйте массив `MOCK_SERVICES` в файле `api.ts`.
- **Слоты времени**: логика генерации доступного времени находится в функции `getTimeSlots`. Для изменения рабочих часов поправьте цикл `for (let h = 10; h <= 20; h++)`.

## Деплой на Cloudflare Pages

Проект настроен на **Static Export** (`output: "export"` в конфигурации Next.js), что идеально подходит для бесплатного хостинга на Cloudflare Pages.

**Шаги для деплоя:**
1. Зайдите в [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Перейдите в раздел **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**
3. Выберите репозиторий `visittime-pwa-frontend`. *(Если репозиторий не виден, перейдите в настройки GitHub -> Applications -> Cloudflare Pages и выдайте доступ к этому репозиторию).*
4. Нажмите **Begin setup** и укажите:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
5. Нажмите **Save and Deploy**. Cloudflare автоматически соберет и опубликует ваш проект.

## Акцентный цвет (Бренд)

Все цвета (dark theme, accent gray-green) настраиваются в файле `src/app/globals.css` в блоке `@theme`.
Для замены акцентного цвета отредактируйте:
```css
  --color-accent: #6F8F86;
  --color-accent-2: #5D7A72;
```
