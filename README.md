# Expense Tracker Backend

> Daily expense tracker application backend using nodeJS and mongoDB.

## Features

- Add / Edit and Delete expense any day of month
- Report all expenses information (daily, weekly, monthly and yearly)
- Allow google signin

## Usage

### Get Credentials

- Go to [Google developer console](https://console.cloud.google.com) and get OAuth 2.0 credentials (Client ID + Client Secret).
- Either [download mongodb locally](https://www.mongodb.com/try/download/community) or use [mongo atlas](https://www.mongodb.com/cloud/atlas) for database. If local, Create a folder called database in a place you like and use `mongod --port 4500 --dbpath <your-full-folder-path>` command to start mongodb server. If you're using atlas, it provides the full path itself. No setup required.
-

### Env Variables

Create a .env file in then root directory and add the following

```
NODE_ENV = development
PORT = 5000
JWT_SECRET = <jwt-secret>
MONGO_URI = <remote-mongoDB-uri>
MONGO_LOCAL = <local-mongoDB-uri>
CLIENT_ID = <google-oauth-clientID>
```

### Install Dependencies (frontend & backend)

```
yarn install
```

### Run

```
yarn start
```

### Consuming the API

- Install REST client from vscode extention marketplace
- Navigate to request.http and test the api

## Usage in React
