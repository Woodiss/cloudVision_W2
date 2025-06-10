#!/bin/bash

echo "🛑 Arrêt des conteneurs Docker..."
docker-compose down

echo "🧹 Nettoyage des ressources inutilisées..."
docker system prune -f

echo ""
echo "🧱 Reconstruction des images Docker..."
docker-compose up --build