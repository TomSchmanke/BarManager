# BarManager
The Bar Manager is a web application to manage all your drinks in your own homebar. If friends come over you can share your bar code with them. They can log in and order the drinks they want. You can manage all your available ingredients and create recipes for your drinks.

## Run locally
The application consists of a backend written in Kotlin (with Spring) and a frontend written in Typescript (with Angular). There also exists a MongoDB database to persist the application data.
Before you can start the backend and frontend you need to create a MongoDB and change the connection url [here](./backend/src/main/kotlin/de/fhswf/barmanager/backend/config/MongoDBConfig.kt). After that you can start the backend by executing `mvn clean install`. To start the frontend you need to execute `pnpm i` and after that run `ng serve`. The frontend is now available under [localhost:4200](http:\\localhost:4200) and you can use the BarManager.
