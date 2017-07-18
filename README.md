# twitterApi
Outil d'excution de API TWITTER
## Description
Cet outil permet l'excution unitaire ou à partir d'un fichier d'API de TWITTER.  
L'api disponible permet de recherche l'existence d'un compte twitter, à partir d'une chaine de caractères de recherche.  
* * *
## Pré-requis
Vous devez disposer d'un compte TWITTER et avoir activé l'usage des APIs sur votre compte. 

Pour ce faire : 
1. connectez-vous à votre compte TWITTER Application Mangement, à l'adresse [Application Management](https://apps.twitter.com)
2. Cliquez sur le Bouton `sign in` et rentrer les informations de votre compte
3. Cliquez sur le bouton `Create New App`
4. Renseigner les informations suivantes : 
    * Name : myAppApi
    * Dexcription : My application for Twitter AP I
    * WebSite : http://myAppApi.fr
4. cliquez sur la case `Developer Agreement` et cliquez sur le bouton `Create your Twitter application` 
L'application est créee. 
5. Cliquez sur l'onglet  `Keys and Access Tokens`
6. Naviguer dans la page jusqu'à la section `Your Access Token`
7. Cliquer sur le bouton `Create my access token`
8. Modifier le fichier `twitterAPI.js`, avec les clés obtenues :
    * Consumer Key
    * Consumer Secret
    * Access Token
    * Access Token Secret

La documentation des API est disponible sur le site [Twitter Developer Documentation]( https://dev.twitter.com/rest/public) 
* * *
## Installation
Cet outil a besoin des logiciels suivants : 

| Outil| Usage | Installation |
|------|------|-----|
| nodejs     | serveur JAVASCRIPT pour l'execution des requetes     | installation à partir du site : [nodejs](https://nodejs.org/)    |
| module OAUTH     |  module de paramétrage du protocole de securité OAUTH    | installation NPM, avec la commande `npm install oauth --save`    |
| module PROMPT     | module de saisie pendant l'execution du script     | installation NPM, avec la commande `npm install prompt --save`     |
| module COLORS     | module d'affichage en COULEUR du texte du scipt     | installation NPM, avec la commande `npm install colors --save`    |
| module CLEAR     | module d'effacement de la console     | installation NPM, avec la commande `npm install clear --save`    |

Pour installer tous ces composants, lancer les commandes suivantes  :

```
git clone https://github.com/thgautier92/twitterApi.git 
cd twitterApi
npm install
```

* * *
## Appel UNITAIRE
```javascript
node callTwitter.js <chaine à rechercher>
```
La recherche supporte les espaces et __respecte la casse__.
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
Ce fichier, nommé `LISTE.CSV` doit contenir __1 enregistrement par recherche__.  
Exemple : 
````
Jean DUPOND, PARIS
Jean Charles, VERSAILLES
````

La recherche supporte les espaces et __respecte la casse__.

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
