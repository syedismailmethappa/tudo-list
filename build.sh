
      cd frontend && npm install && npm run build
      cp -r build ../backend/static/
      cd ../backend
      pip install -r requirements.txt
      python manage.py collectstatic --noinput
      python manage.py migrate
    startCommand: gunicorn backend.wsgi:application
