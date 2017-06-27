# twitterApi
Outil d'excution de API TWITTER
## Description
Cet outil permet l'excution unitaire ou à partir d'un fichier d'API de TWITTER
## Installation
Cet outil a besoin des logiciels suivants :  
Outil | Installation  
------------ | -------------  
nodeJs | installation à partir du site : [nodejs](https://nodejs.org/)  
module nodejs OAUTH | installation NPM, avec la commande `npm install oauth`  
module nodejs PROMPT | installation NPM, avec la commande `npm install prompt`  
module nodejs COLORS | installation NPM, avec la commande `npm install colors`
* * *
## Appel UNITAIRE
```javascript
nodejs simple.js <chaine à rechercher>
```
Le résultat est stoké dans le fichier RESULT.CSV
Les données exportées, suite à la recherche sont : 
name
screen_name
location
util.inspect(description']) + sep +
protected
followers_count
friends_count
favourites_count
statuses_count
created_at

## Appel à partir d'un fichier de valeur
Ce fichier nommé `LISTE.CSV` est un fichier contenant 1 enregistrement par recherche.  
Chaque enregistrement est formaté comme suit : nom,ville

### Génération de commandes pour chaque ligne du fichier 
```javascript
nodejs generate.js
```
Le fichier START.SH est alors généré et contient toutes les commandes
#### Execution des commandes générées
```javascript
sh start.sh
```
