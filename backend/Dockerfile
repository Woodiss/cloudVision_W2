FROM python:3.11-slim

# FROM python:alpine             // 🚧 image ultra-légère et tu es à l’aise pour ajouter manuellement les paquets nécessaires
# FROM python:3.13.3-slim        // Rencontre des problèmes de compatibilité
# FROM python:3.11-slim          // Rencontre des problèmes de compatibilité

# Cela desactive le stockage des fichiers .pyc dans le dossier de travail.
ENV PYTHONDONTWRITEBYTECODE=1  
#Cela désactive le buffering de la sortie standard (stdout/stderr) de Python.
ENV PYTHONUNBUFFERED=1         

WORKDIR /app 

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]