# Metrio LITE (English version)

Metrio LITE is a new web application used to **fill out forms** to potentially generate environmental indicators.

## The test

You will need to build the frontend for this application. Here are the requirements:

- We want to visualize the list of forms, as well as the number of data entries in each form.
- We want to create, edit and delete forms.
- We want to view the data entries of a specific form. This list must be sortable by date or value.
- We want to create and modify the data inputs of a form based on the form schema. For example, each tag can be displayed in the form of a drop-down list to limit the possible choices.
- We want to remove data entries from a form.
- We want the app to be responsive (i.e. adapt to desktop and mobile).

### Assessment

The test will be evaluated according to the following criteria:

- Code quality (simplicity, style, use of Typescript, etc.)
- Understanding and compliance with requirements.
- The visual aspect (UI/UX). The choice of a React component library (e.g. MUI) is left to your discretion.

## Configuration

You will need to create a React application (with [TypeScript](https://www.typescriptlang.org/)). **_You can use the framework of your choice._**

Here is an example with [Create React App](https://create-react-app.dev/docs/getting-started):

```
npx create-react-app metrio-lite --template typescript
metro-lite cd
npm start
```

### Start API

Copy the `db.json` database to the root of `metrio-lite`.

Start the API server:

```
npx json-server --watch db.json --port 3001
```

## Existing features

We use [json-server](https://github.com/typicode/json-server) to serve the API based on the `db.json` file. The API is:

```
# Forms

GET /forms Get forms
GET /forms/:id Get a form
POST /forms Create a form
PUT /forms/:id Update a form
DELETE /forms/:id Delete a form

# Data

GET /data?formId=:formId Get form data
GET /data/:id Get specific data
POST /data Create data in a form
PUT /data/:id Update data
DELETE /data/:id Delete data
```

For example, with `curl`, here are some possible operations:

```
# Create a form:

curl\
  -X POST "http://localhost:3001/forms" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"name\": \"My form\", \
    \"tags\": [{ \"name\": \"My tag\", \"choices\": [\"A\", \"B\", \"C\"] }] \
  }"

# Create data in a form:

curl\
  -X POST "http://localhost:3001/data/" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"formId\": 1, \
    \"date\": \"2024-01-01\", \
    \"note\": \"My data\", \
    \"tags\": { \"My tag\": \"A\" }, \
    \"value\": 1 \
  }"
```

The rest of the API documentation can be inferred from the [json-server](https://github.com/typicode/json-server) documentation.

# Metrio LITE (Version française)

Metrio LITE est une nouvelle application Web utilisée pour **_remplir des formulaires_** afin d'éventuellement générer des indicateurs environnementaux.

## Le test

Vous devrez construire le frontend pour cette application. Voici les exigences:

- Nous voulons visualiser la liste des formulaires, ainsi que le nombre d'entrées de données dans chaque formulaire.
- Nous voulons créer, modifier et supprimer des formulaires.
- Nous voulons visualiser les entrées de données d'un formulaire spécifique. Cette liste doit pouvoir être triée par date ou par valeur.
- Nous voulons créer et modifier les entrées de données d'un formulaire sur la base du schéma du formulaire. Par exemple, chaque tag peut être affichée sous la forme d'une liste déroulante afin de limiter les choix possibles.
- Nous voulons supprimer des entrées de données d'un formulaire.
- Nous voulons que l'application soit réactive (c'est-à-dire qu'elle s'adapte aux ordinateurs de bureau et aux téléphones portables).

### Évaluation

Le test sera évalué selon les critères suivants :

- Qualité du code (simplicité, style, utilisation de Typescript, etc.)
- Compréhension et respect des exigences.
- L'aspect visuel (UI/UX). Le choix d'une bibliothèque de composants React (par exemple MUI) est laissé à votre discretion.

## Configuration

Vous devrez créer une application React (avec [TypeScript](https://www.typescriptlang.org/)). **_Vous pouvez utiliser le framework de votre choix._**

Voici un exemple avec [Create React App](https://create-react-app.dev/docs/getting-started):

```
npx create-react-app metrio-lite --template typescript
cd metrio-lite
npm start
```

### Démarrer l'API

Copier la base de données `db.json` à la racine de `metrio-lite`.

Démarrer le serveur d'API:

```
npx json-server --watch db.json --port 3001
```

## Fonctionnalités existantes

Nous utilisons [json-server](https://github.com/typicode/json-server) pour servir l'API basé sur le fichier `db.json`. L'API est:

```
# Formulaires

GET /forms         Obtenir les formulaires
GET /forms/:id     Obtenir un formulaire
POST /forms        Créer un formulaire
PUT /forms/:id     Mettre à jour un formulaire
DELETE /forms/:id  Supprimer un formulaire

# Données

GET /data?formId=:formId   Obtenir les données d'un formulaire
GET /data/:id              Obtenir une donnée spécifique
POST /data                 Créer une donnée dans un formulaire
PUT /data/:id              Mettre à jour une donnée
DELETE /data/:id           Supprimer une donnée
```

Par exemple, avec `curl`, voici quelques opérations possibles:

```
# Créer un formulaire:

curl \
  -X POST "http://localhost:3001/forms" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"name\": \"Mon formulaire\", \
    \"tags\": [{ \"name\": \"Mon tag\", \"choices\": [\"A\", \"B\", \"C\"] }] \
  }"

# Créer une donnée dans un formulaire:

curl \
  -X POST "http://localhost:3001/data/" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d "{ \
    \"formId\": 1, \
    \"date\": \"2024-01-01\", \
    \"note\": \"Ma donnée\", \
    \"tags\": { \"Mon tag\": \"A\" }, \
    \"value\": 1 \
  }"
```

Le reste de la documentation API peut être déduite de la documentation de [json-server](https://github.com/typicode/json-server).
