#!/bin/bash

echo "🛑 Arrêt et suppression complète..."
docker-compose down --volumes --rmi local

echo "🧹 Nettoyage des ressources inutilisées..."
docker system prune -f

echo "🏁 Environnement Docker arreté."