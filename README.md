# twitterApi
Outil d'excution de API TWITTER
## Description
Cet outil permet l'excution unitaire ou à partir d'un fichier d'API de TWITTER.  
L'api disponible permet de recherche l'existence d'un compte twitter, à partir d'une chaine de caractères de recherche.  
* * *
## Installation
Cet outil a besoin des logiciels suivants :  

| Outil| Usage | Installation |
|------|------|-----|
| nodejs     | serveur JAVASCRIPT pour l'execution des requetes     | installation à partir du site : [nodejs](https://nodejs.org/)    |
| module OAUTH     |  module de paramétrage du protocole de securité OAUTH    | installation NPM, avec la commande `npm install oauth`    |
| module PROMPT     | module de saisie pendant l'execution du script     | installation NPM, avec la commande `npm install prompt`     |
| module COLORS     | module d'affichage en COULEUR du texte du scipt     | installation NPM, avec la commande `npm install colors`    |
| module CLEAR     | module d'effacement de la console     | installation NPM, avec la commande `npm install clear`    |

Pour installer tous ces composants, lancer les commandes suivantes  : 
`git clone https://github.com/thgautier92/twitterApi.git
cd twitterApi
npm install`

* * *
## Appel UNITAIRE
```javascript
node simple.js <chaine à rechercher>
```
Le résultat est stocké dans le fichier `RESULT.CSV`. Les données exportées sont : 
* name
* screen_name
* location
* description
* protected
* followers_count
* friends_count
* favourites_count
* statuses_count
* created_at  
Toutes les valeurs sont séparées par des points-virgules.  

## Appel à partir d'un fichier de valeurs
Cette option permet de lancer plusieurs recherche à la chaine, à partir d'un fichier de valeurs.  
Ce fichier, nommé `LISTE.CSV` doit conteny 1 enregistrement par recherche.  
La recherche supporte les espaces et respecte la casse.

### Génération de commandes pour chaque ligne du fichier 
```javascript
node generate.js
```
Le fichier START.SH est alors généré et contient toutes les commandes.  
Automatiquement le script lance START.SH et la recherche commence.  

#### Execution manuelle des commandes générées
```javascript
sh start.sh
```
