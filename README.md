# book-manager

## Introduction
This repository contains a RESTful API created using Node.js and MongoDB for managing books. This repository documentation contains the following:
 - [Repository Structure](#repository-structure)
 - [API Endpoints and their usage](#api-endpoints-and-their-usage)
 - [Setup to run the API locally](#setup-to-run-the-api-locally)
 - [Deployment](#deployment)

## Repository Structure
This repository contains the following main files
- **index.js:** This is the entry point to the Node.js application. It creates the Express application and sets it up to listen on a specific port.
- **mongoose.js:** This file sets up the connection to the MongoDB database. The MongoDB URL is saved as an environment variable named MONGO_URL. This URL can be either a MongoDB instance on a local server / virtual machine or a Cloud Solution like MongoDB Atlas.
- **bookModel.js:** This file contains a Mongoose Schema of the Book Model that is being used to store all the data on the database.
- **router.js:** This file contains all the REST API routes that can be utilised.

## API Endpoints and their usage
The REST API contains the following 5 endpoints:
- **POST Route /add** This route adds a book to the database. The details of the book should be added to the request body. The fields allowed are title, author and summary, out of which, title and author are mandatory fields. If any other field apart from these three is specified, they are simply ignored by the route. **It has been assumed that multiple copies of the same book can be present in the database, hence this route doesn't check for any duplicates.** This route returns the following status codes:
  - *400:* If either title, author, or both are missing from the body of the request.
  - *201:* If the body of the request has been specified correctly and the application successfully adds the book.
  - *500:* If some internal server error happens while processing.
- **GET Route /viewAll** This route returns the details of all the books. The details include the id, title, author and summary (if present) of the book. This route returns the following status codes:
  - *200:* If the application successfully fetches and returns the details of all the books.
  - *500:* If some internal server error happens while processing.
- **GET Route /view/:id** This route returns the details of a single book specified by the ID. The details include the id, title, author and summary (if present) of the book. This route returns the following status codes:
  - *400:* If the ID provided doesn't exist. 
  - *200:* If the ID provided is correct and the application successfully fetches and returns the details of the books.
  - *500:* If some internal server error happens while processing.
- **PATCH Route /update/:id** This route updates the details of a book specified by the ID. The details that can be updated include the id, title, author and summary of the book. If any other field is specified, the route throws an error. This route returns the following status codes:
  - *400:* If the ID provided doesn't exist or the updates specified are other than id, title or summary.
  - *200:* If the ID and details provided are correct and the application successfully updates the details of the books.
  - *500:* If some internal server error happens while processing.
- **DELETE Route /delete/:id** This route deletes a book specified by the ID. This route returns the following status codes:
  - *400:* If the ID provided doesn't exist.
  - *200:* If the ID provided is correct and the application successfully deletes the book.
  - *500:* If some internal server error happens while processing.
 
## Setup to run the API locally
### Prerequisites
- The system must have NodeJS installed.
- To test if the application is running properly, you must have Postman and MongoDB Compass (or any other tool that can connect to the MongoDB instance and show the documents).
- The URL of a running MongoDB instance on any server.

### Steps
- Clone the repository using the command ```git clone https://github.com/shubhamraj23/book-manager.git```.
- Inside the repository, install all the dependencies using ```npm install```.
- Create a file named .env and add the following environment variables.
  ```
  NODE_ENV=dev
  MONGOURL=insert_the_url_of_your_mongodb_instance_here.
  ```
  Make sure that you correctly insert the URL of your MongoDB instance.
- Run the application using the command ```npm run dev```
- You can now test the different routes using Postman and check the changes using MongoDB Compass.

## Deployment
The REST API has been deployed on an online server through the Railway App. The base URL of the deployed REST API is [https://book-manager-production.up.railway.app/](https://book-manager-production.up.railway.app/), and the endpoints are the same as described in the above documentation. The process of deployment has been described below.
- Go to [Railway](https://railway.app/) on your browser and sign up using GitHub.
- Click on Deploy from GitHub, and then configure GitHub to add the repository that contains the code which needs to be deployed.
- Set the environment variables.
- Go to settings and click on generate domain to generate the URL to access the application.
- The REST API has been successfully deployed and you can test it using Postman.