FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1  
ENV PYTHONUNBUFFERED=1         
RUN apt-get update && apt-get install -y \
    libglib2.0-0 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app 

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000:5000

CMD ["python", "run.py"]