README - Documentation Docker & Kubernetes
==========================================

Projet : cloudVision_W2
Stack : Frontend (React + Vite), Backend (Python Flask)
Conteneurisation : Docker
Orchestration : Kubernetes via Docker Desktop

------------------------------------------------------
1. DOCKER – Conteneurisation des services
------------------------------------------------------

📁 Structure :
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
└── docker-compose.yaml

✅ Objectif :
Conteneuriser les deux services (React + Flask) localement.

🛠️ Commande utilisée :
> docker-compose up --build

🔧 Résultat :
- Deux conteneurs créés : `frontend` (port 5173) # 3000, `backend` (port 5000)
- Fonctionnel via Docker Desktop sans nginx pour l'instant.

🧰 Automatisation avec scripts :
Pour simplifier l’utilisation des conteneurs Docker, des scripts Bash ont été proposés :

- `start.sh` : Lance les services définis dans docker-compose.yaml en mode détaché (-d) avec --build pour reconstruire les images si nécessaire.
- `stop.sh` : Arrête tous les conteneurs et les supprime proprement avec docker-compose down.
- `restart.sh` : Enchaîne docker-compose down puis docker-compose up --build -d pour redémarrer tous les services.

Pour lancer le script il suffit de faire  chmod +x start.sh ou stop.sh ou restart.sh suivi de la commande ./start.sh ou ./stop.sh ou ./restart.sh

------------------------------------------------------
2. KUBERNETES – Déploiement des services
------------------------------------------------------

✅ Objectif :
Passer d’une simple exécution via Docker à un vrai déploiement orchestré via Kubernetes.

🔹 Étapes réalisées :
- Activation de Kubernetes dans Docker Desktop
- Création des fichiers de manifests YAML :
  - `frontend-deployment.yaml` et `frontend-service.yaml`
  - `backend-deployment.yaml` et `backend-service.yaml`

🧩 Type de services : NodePort

🏗️ Construction des images Docker (avant déploiement Kubernetes)
 - Avant d’appliquer les fichiers de déploiement et de services Kubernetes, il est nécessaire de construire les images Docker localement à l’aide des commandes suivantes :

 > docker build -t flask-backend:latest ./backend
 > docker build -t react-frontend:latest ./frontend

🖥️ Commandes utilisées :
- Déploiement : 
  > kubectl apply -f backend-deployment.yaml  
  > kubectl apply -f backend-service.yaml  
  > kubectl apply -f frontend-deployment.yaml  
  > kubectl apply -f frontend-service.yaml

- Vérification des pods et services :  
  > kubectl get pods  
  > kubectl get services

🎯 Accès aux applications :
- Backend : http://localhost:<port-NodePort-backend> # 30349
- Frontend : http://localhost:<port-NodePort-frontend> # 30418

🧪 Test de résilience :
- Suppression manuelle d’un pod avec `kubectl delete pod <nom-du-pod>`
- Résultat : Kubernetes recrée automatiquement un nouveau pod sans interruption de service côté utilisateur (grâce à la configuration du `Deployment`)
- Ce comportement confirme le fonctionnement attendu de l’auto-réparation (self-healing) de Kubernetes


------------------------------------------------------
3. KUBERNETES DASHBOARD 
------------------------------------------------------

## Prérequis

- Kubernetes activé dans Docker Desktop
- `kubectl` installé et configuré pour communiquer avec ton cluster

---

## Étape 1 : Déployer le Dashboard

Exécute la commande suivante pour déployer le dashboard avec ses composants nécessaires :

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

```

## Étape 2 : Création Admin account

Créer un compte administrateur pour accéder au Dashboard Crée un fichier admin-user.yaml puis appliquer avec la commande : 

```bash
kubectl apply -f admin-user.yaml

```

## Étape 3 : Récupérer le token d'accès

Pour te connecter au dashboard, récupère le token du compte admin :

```bash
kubectl -n kubernetes-dashboard create token admin-user

```
Copie le token affiché, tu en auras besoin à la connexion.

## Étape 4 : Proxy

Lancer le proxy pour accéder au Dashboard : 
Exécute la commande suivante :

```bash
kubectl proxy

```
Le proxy démarre et écoute sur 127.0.0.1:8001.

## Étape 5 : Accéder à l’interface Web du Dashboard
Ouvre ton navigateur à l’adresse suivante :

```bash
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

```

## Étape 6 : Connexion au Dashboard
  - Choisis "Token" comme méthode d’authentification
  - Colle le token récupéré à l’étape 3
  - Clique sur "Sign In"
