# Grand Comics Database - Node.js REST API

I created this project to replace the [Comic Vine API](http://comicvine.gamespot.com/api/) in a mobile app I was developing called [Longboxit](http://longboxit.com). The core of the server is using [Node.js](https://nodejs.org), [Express.js](http://expressjs.com/), and [Bookshelf.js](http://bookshelfjs.org/).

I wrote a series of blog posts explaining how I initially set everything up and started building out endpoints. You can check it out at [harrybaldwin.com](http://harrybaldwin.com).

## Project Overview

The project uses 2 databases. The main MySQL database holds the Grand Comics Database and MongoDB holds the OAuth information. I did not want to try to add new tablse and data into the MySQL since I was going to have to update the data every month or so.

All requests require [OAuth 2 client credentials grant type](https://tools.ietf.org/html/rfc6749#section-1.3.4). The Making Requests section will have more information on using OAuth.

## Getting started

You will of course need Node.js installed. For initial development I used Node **v4.4.4**.

**Note:** The Gulp file will probably not work on Windows machines.

1. `git clone repo`
2. `npm install`
3. Install MongoDB locally
4. Next you will need to seed MongoDB with OAuth client data. Open mongo shell and run `use comicsapi-dev` and then run `db.clients.insertOne({clientId:'somerandomclientid', clientSecret: 'somerandomclientsecret', name: 'client name'});`.
5. Install MySQL locally
6. [Download the latest Grand Comics DB dump](http://www.comics.org/download/) and import into local MySQL.
7. `npm install gulp -g`
8. `gulp`
9. ctrl+c to stop server. To make sure all processes are stopped you can run `gulp stop` also.

## Making Requests

1. Base64 encode clientid:clientsecret
2. Use the base64 value in a POST request to /oauth/token
3. `curl -X POST -H "Authorization: Basic generatedbase64value" -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=client_credentials' "http://localhost:8080/oauth/token"`
4. This request will return an `access_token` which you will now be able to use for any request to /api/*
5. `curl -X GET -H "Authorization: Bearer access_token" "http://localhost:8080/api/series/1571/"`

## Endpoints

### Series

**GET /series**

Parameters | Required | Description
-----------|----------|------------
name | No | Search by Series name
limit | No | Limits results. Defaults to 10
page | No | Page number that should be returned. Defaults to 1

**GET /series/:id**

**GET /series:id/details**

**GET /series:id/brands**

**GET /series:id/indicia_publishers**

### Issues

**GET /issues**

Parameters | Required | Description
-----------|----------|------------
series_id | No | Get Issues by `series_id`
barcode | No | Get Issues by `barcode`
limit | No | Limits results. Defaults to 10
page | No | Page number that should be returned. Defaults to 1

**GET /issues:id**

## Running Tests

`gulp test`
