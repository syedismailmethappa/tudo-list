#!/usr/bin/env bash
set -o errexit  

# 1. Build frontend (Vite -> dist folder)
cd tudo_frontend
npm install
npm run build

# 2. Copy React build files into Django static folder
cp -r dist ../tudo_backend/static/

# 3. Backend setup
cd ../tudo_backend
pip install -r ../requirements.txt

# 4. Django collectstatic and migrations
python manage.py collectstatic --noinput
python manage.py migrate

# 5. Start Gunicorn server
gunicorn tudo_backend.wsgi:application

