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

## Appel UNITAIRE
```javascript
nodejs simple.js <chaine à rechercher>
```
Le résultat eststoké dans le fichier RESULT.CSV

## Appel à partir d'un fichier de valeur
Ce fichier nommé `LISTE.CSV` est un fichier contenant 1 enregistrement par recherche
Chaque enregistrement est formaté comme suit : <nom>,<ville>

### Génération de commandes pour chaque ligne du fichier 
```javascript
nodejs generate.js
```
Le fichier START.BAT est alors généré et contient toutes les commandes
#### Execution des commandes générées
```javascript
start.bat
```