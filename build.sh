
      cd frontend && npm install && npm run build
      cp -r build ../backend/static/
      cd ../backend 
      pip install -r requirements.txt
      python manage.py collectstatic --noinput
      python manage.py migrate
      gunicorn tudo_backend.wsgi:application --bind 0.0.0.0:8000
     
