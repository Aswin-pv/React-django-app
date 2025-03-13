FROM python:3.13.0-alpine3.20

ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY . .

EXPOSE 8000

# Run the server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]