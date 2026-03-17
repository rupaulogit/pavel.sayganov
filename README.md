# Проект: CV-страница Павла Сайганова

Статический сайт-резюме для публикации на GitHub Pages.

## Локальный запуск
```bash
python3 -m http.server 8000
```
Открыть: `http://localhost:8000`.

## Что восстановлено для GitHub Pages
- Добавлен workflow деплоя через GitHub Actions: `.github/workflows/deploy-pages.yml`.
- Добавлен файл `.nojekyll`, чтобы GitHub Pages не пытался обрабатывать сайт через Jekyll.
- В `index.html` убраны локальные артефакты сохранённой страницы (`saved_resource`) и подключен корректный Google Fonts URL.

## Важно проверить в GitHub (один раз)
1. **Settings → Pages**
2. **Build and deployment → Source: GitHub Actions**
3. Убедиться, что дефолтная ветка репозитория — `main` (workflow запускается на push в `main`)
4. После пуша открыть вкладку **Actions** и дождаться зелёного статуса `Deploy static site to GitHub Pages`.

После этого сайт должен открываться по Pages-URL репозитория.
