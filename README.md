# cloudVision_W2

## Version de python
La version de python utiliser est la 3.11.12 ou (3.11)

Vous pouvez l'installer via pyenv avec la commande :

```bash
pyenv install 3.11
```

## Environemment virtuel

Créer votre environnement virtuel dans le dossier **backend**

```bash
python -m venv .venv
```
Sourcer ensuite l'environnemt avec la commande :

```bash
source venv/bin/activate  # Linux/macOS
# OU
.venv\Scripts\activate     # Windows
```

⚠️ ***Pour désactiver l'environnement virtuel :***
```bash
deactivate
```

Instaler les dépendances :

```bash
pip install -r requirements.txt

```
## Lancer le projet

Il suffit d'éxécuter le fichier run.py

```bash
python run.py
```
## Lancer le projet Front end

Il suffit d'éxécuter la commande suivant

```bash
 cd /frontend
```
## Installer les packages

Il suffit d'éxécuter la commande suivant

```bash
  npm install
```

## Lancer le projet Front end Vite

Il suffit d'éxécuter la commande suivant

```bash
  npm run dev
```
## Lancer le projet sur Dockerd Desktop

Il suffit d'éxécuter la commande suivant et assuer vous que votre docker desktop est ouvert
Rassurez-vous que vous êtes à la racine du projet CloudVision_W2

```bash
docker-compose up --build
```

## Arrêter le projet sur Docker

Il suffit d'éxécuter la commande suivant Attention elle supprime les conteneurs

```bash
docker-compose down
```
## Mettre en pause 

Il suffit d'éxécuter la commande suivant

```bash
docker-compose stop

```

## Relancer ensuite 

Il suffit d'éxécuter la commande suivant

```bash
docker-compose start

```