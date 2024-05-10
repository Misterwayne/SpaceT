# SpaceT
# Projet Astéroïdes : Une Application Web Django & React

## Aperçu

Le Projet Astéroïdes "SpaceT" est une application web qui combine Django pour la logique backend avec React pour une interface utilisateur dynamique et interactive. Ce projet est conçu pour fournir une plateforme complète pour explorer et apprendre sur les astéroïdes, en exploitant des données en temps réel et des visualisations interactives.

## Caractéristiques

- **Backend Django** : Utilise le cadre Django pour gérer la logique backend, y compris les modèles de données, les vues et les API.
- **Frontend React** : Offre une interface utilisateur hautement interactive, permettant aux utilisateurs d'explorer les données sur les astéroïdes de manière visuellement engageante.
- **Données en Temps Réel** : Récupère et affiche des données en temps réel sur les astéroïdes, fournissant aux utilisateurs des informations à jour.
- **Visualisations Interactives** : Utilise des composants React pour afficher les données sur les astéroïdes de manière intuitive et visuellement attrayante.
- **I.A Implémentation**: Description dynamique générer par une I.A

## Démarrage Rapide

### Prérequis

- Python 3.12+
- Node.js et npm

### Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/votreusername/projet-asteroides.git
   cd projet-asteroides
   ```

2. Installez les dépendances Python :
   ```
   pip install -r requirements.txt
   ```

3. Installez les dépendances JavaScript :
   ```
   npm install
   ```

4. Lancez le serveur de développement :
   ```
   npm run start
   ```

   Cette commande démarre le serveur webpack-dev-server, qui sert votre application React et la rechargent automatiquement lorsqu'il détecte des modifications.

5. Construisez le projet pour la production :
   ```
   npm run build
   ```

   Cette commande compile vos actifs pour la production, les optimisant pour les performances.

## Utilisation

Naviguez jusqu'au répertoire racine du projet et lancez le serveur de développement en utilisant `npm run start`. Cela servira vos actifs frontend à être consommés par `django-webpack-loader`. Gardez à l'esprit, cette configuration est destinée aux besoins de développement ; pour la production, utilisez `npm run build` pour compiler vos actifs.

## Contribution

Les contributions sont les bienvenues. N'hésitez pas à soumettre une demande de tirage ou à ouvrir un problème si vous rencontrez des problèmes ou avez des suggestions pour amélioration.

## Licence

Le Projet Astéroïdes est sous licence MIT. Voir `LICENSE` pour plus de détails.

