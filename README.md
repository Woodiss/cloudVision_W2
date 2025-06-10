# PicToPlate 📸🍽️

**Transformez vos photos d'ingrédients en recettes délicieuses grâce à l'IA !**

PicToPlate est une application innovante qui utilise l'intelligence artificielle pour analyser les images d'aliments et proposer des recettes adaptées. Basé sur le projet CloudVision, notre solution combine reconnaissance d'images avancée et suggestions culinaires personnalisées.

## ✨ Fonctionnalités

- 📷 **Analyse d'images** : Upload d'une photo d'ingrédients
- 🤖 **Reconnaissance IA** : Détection automatique des aliments avec YOLO v11
- 🍳 **Suggestions de recettes** : Recommandations basées sur les ingrédients détectés
- 🌐 **Interface moderne** : Interface utilisateur responsive avec Next.js et Tailwind CSS
- 🐳 **Déploiement containerisé** : Application entièrement dockerisée
- ☸️ **Infrastructure Kubernetes** : Déploiement scalable et robuste

## 🛠️ Technologies utilisées

### Frontend
- **Next.js** - Framework React pour l'interface utilisateur
- **Tailwind CSS** - Framework CSS utilitaire pour le styling
- **TypeScript/JavaScript** - Langage de programmation
- **Spoonacular API** - Base de données de recettes

### Backend
- **Python Flask** - API REST backend
- **YOLO v11** - Modèle de détection d'objets pour la reconnaissance d'aliments
- **OpenCV** - Traitement et segmentation d'images


### DevOps & Infrastructure
- **Docker** - Containerisation de l'application
- **Kubernetes** - Orchestration 
- **pytest** - Tests unitaires

### Outils de développement
- **Google Colab** - Fine-tuning du modèle YOLO
- **Git** - Contrôle de version

## 🚀 Installation et démarrage

### Prérequis
- Node.js (v18 ou supérieur)
- Python 3.11.0
- Docker
- Kubernetes

### Frontend (Next.js)

```bash
# Cloner le repository
git clone https://github.com/Woodiss/cloudVision_W2

cd /frontend

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build
npm start
```

### Backend (Flask)

```bash
# Aller dans le dossier backend
cd /backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
.venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Démarrer le serveur Flask
python run.py
```

### Docker

```bash
# Build et démarrer avec Docker Compose
docker-compose up --build

# Arrêter les services
docker-compose down
```

### Kubernetes

```bash
# Démarrer avec les commande Kubectl

Voir le K8s.md dans le dossier K8s/docs/
```

### Tests

```bash
# Exécuter les tests unitaires
cd backend

pytest 

```

## 🏗️ Architecture

```
cloudVision_W2/
├── frontend/             # Application Next.js
│   ├── pages/
│   ├── components/
│   └── styles/
├── backend/               # API Flask
│   ├── app.py
│   └── tests/             # Tests unitaires
│   ├── models/
│   └── utils/
├── docker-compose.yml
├── K8s/                   # Manifests K8s

```

## 🔬 Modèle IA

Notre modèle de reconnaissance d'aliments est basé sur **YOLO v11**, fine-tuné spécifiquement pour la détection d'ingrédients culinaires :

- **Entraînement** : Google Colab pour le fine-tuning
- **Préprocessing** : OpenCV pour la segmentation d'images
- **Précision** : Optimisé pour reconnaître une large variété d'aliments

## 🚧 Difficultés rencontrées

- **Changement de technologie** : Adaptation aux nouvelles stack techniques
- **Entraînement de l'IA** : Optimisation du modèle YOLO pour notre cas d'usage
- **Déploiement Backend** : Résolution des problèmes de CORS (Cross-Origin Resource Sharing)

## 🔮 Améliorations futures

- [ ] **Amélioration de l'IA** : Précision accrue de la reconnaissance
- [ ] **Gestion vidéo** : Support de l'analyse vidéo en temps réel
- [ ] **Recettes par IA** : Génération de recettes personnalisées avec LLM + images
- [ ] **Système SAAS** : Modèle d'abonnement et fonctionnalités premium
- [ ] **Traduction intelligente** : Multilingue basé sur l'IA *(en cours)*
- [ ] **Prétraitement avancé** : Amélioration du pipeline d'images *(en cours)*

## 👥 Équipe de développement

| Nom | Prénom | GitHub |
|-----|--------|--------|
| Descarpentries | Stéphane | [@Woodiss](https://github.com/Woodiss) |
| Sanchez | Amaury | [@Amaury057](https://github.com/Amaury057) |
| DE PASQUAL | Christopher | [@christopherDEPASQUAL](https://github.com/christopherDEPASQUAL) |
| Codandabany | Devanandhan | [@MrDevaa](https://github.com/MrDevaa) |
| Allard | Adrien | [@The-Leyn](https://github.com/The-Leyn) |


---

**Bon appétit avec PicToPlate ! 🍽️✨**