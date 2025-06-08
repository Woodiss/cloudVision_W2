#!/bin/bash

echo "🚀 Démarrage de l’environnement Docker..."
docker-compose up --build &

sleep 2
echo "🌐 Ouverture de http://localhost:5173 # 3000 dans le navigateur..."
start "" http://localhost:5173 # 3000
