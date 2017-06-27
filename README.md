# twitterApi
Outil d'excution de API TWITTER
## Description
Cet outil permet l'excution unitaire ou à partir d'un fichier d'API de TWITTER
## Installation
Cet outil a besoin des logiciels suivants :  

| Outil| Usage | Installation |
|------|------|-----|
| nodejs     | serveur JAVASCRIPT pour l'execution des requetes     | installation à partir du site : [nodejs](https://nodejs.org/)    |
| module OAUTH     |  module de paramétrage du protocole de securité OAUTH    | installation NPM, avec la commande `npm install oauth`    |
| module PROMPT     | module de saisie pendant l'execution du script     | installation NPM, avec la commande `npm install prompt`     |
| module COLORS     | module d'affichage en COULEUR du texte du scipt     | installation NPM, avec la commande `npm install colors`    |


* * *
## Appel UNITAIRE
```javascript
nodejs simple.js <chaine à rechercher>
```
Le résultat est stoké dans le fichier `RESULT.CSV`.  
Les données exportées, suite à la recherche sont : 
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

## Appel à partir d'un fichier de valeur
Ce fichier nommé `LISTE.CSV` est un fichier contenant 1 enregistrement par recherche.  
La recherche supporte les espaces et respecte la casse.

### Génération de commandes pour chaque ligne du fichier 
```javascript
nodejs generate.js
```
Le fichier START.SH est alors généré et contient toutes les commandes.  
Automatiquement le script lance START.SH et la recherche commence.  

#### Execution manuelle des commandes générées
```javascript
sh start.sh
```
