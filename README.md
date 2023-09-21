# Student CRUD App
Simple basic CURD based node js application

## Topics
- [Requriments](#requriments)
- [Installing](#installing)
- [Setup Firebase](#setup-firebase)
- [Running](#running)
- [Reference](#reference)

## Requriments
   - nodejs 18.16.1(prefferd)
   - mongodb server
   - firebase account

## Installing
1. Clone the this project or download it as zip and extract.
2. Now open project in Vscode or any IDE and open terminal and run `npm i`
3. Rename `.env.example` to `.env` and change the DB & other things if required.

## Setup Firebase
1. Create a simple project in Firebase use this article [How to create firbase project]( https://derrickotte.medium.com/creating-your-first-firebase-project-a-step-by-step-guide-4198a97cef9a)
2. Now go to Project settings in firebase and go to Service Account. Click on Generate new private key. It will download a file, rename it to `serviceAccountKey.json` and copy into our project.
3. Now open same project in google cloud and get the project api key use https://console.cloud.google.com/apis/credentials , from this link you can get your firebase project API key put it in `.env` file in project.

## Running
1. Open terminal in you project and run `npm start` - this will start the server
2. Now open http://localhost:5000/ - to test server is running
3. Now open http://localhost:5000/api-docs to se api documentation. 
4. Click on the `/student/init` API and try out and excute - this will create a sample user for starting in DB whose `email: test@email.com , password: test`
5. Now you can test different api and run them. 


## Reference

Google Cloud: https://firebase.google.com/docs/projects/api-keys
Medium Article: https://derrickotte.medium.com/creating-your-first-firebase-project-a-step-by-step-guide-4198a97cef9a


## If any issue is faced please raise a issue in github