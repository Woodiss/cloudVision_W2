#!/bin/bash

echo "🛑 Arrêt des conteneurs Docker..."
docker-compose down

echo ""
echo "🧱 Reconstruction des images Docker..."
docker-compose build

echo ""
echo "🚀 Lancement de l’environnement Docker..."
docker-compose up
