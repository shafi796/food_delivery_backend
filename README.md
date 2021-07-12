# NodeJS - Food Delivery App (Backend)

Backend system for [**Food Delivery**](https://github.com/ameenfarook/food_delivery "React Native - Food Delivery App") mobile app.

## Dependencies

- [ExpressJS](https://expressjs.com "Popular Web Framework for NodeJS")
- [MongoDB](https://docs.mongodb.com/drivers/node/current "MongoDB Client for NodeJS")
- [JSONWebToken](https://github.com/auth0/node-jsonwebtoken "Library for generating and parsing JWT")

## Setup instructions

### 1. Clone Repository

```sh
# Clone the app
git clone https://github.com/ameenfarook/food_delivery_backend.git
```

### 2. Install all dependencies

```sh
# navigate to app directory
cd food_delivery_backend

npm install
```

### 3. Setup Instructions

- MongoDB Connection

```json
# open package.json and add connectionString inside [projectConfig.mongoConnectionUrl]

"projectConfig": {
    "mongoConnectionUrl": "<put the mongodb connection string here>"
  }
```

- Application IP Address and Port Number (Default 3000)

```json
# open package.json and add ip and port inside [projectConfig]

"projectConfig": {
	"serverIp": "<put the server ip address here (string)>",
    "serverPort": "<put the server port number here (integer)>"
  }
```

### 4. Database Setup (MongoDB)

##### Database

```
food_delivery_db
```

##### Collections

- ```sh
  users  #for user specific data (email and username are unique indexes)
  ```

###### collection structure

```json
{
  "_id": {
    "$oid": "Default ObjectID"
  },
  "email": "String (unique)",
  "username": "String (unqiue)",
  "password": "String"
}
```

- ```sh
  carts #for carts details
  ```

###### collection structure

```json
{
    "_id": {
        "$oid": "Default ObjectID"
    },
    "foodId": "String (food reference id)",
    "count": "Integer (count of food item added)"
}
```

- ```sh
	foods #for food details
  ```

###### collection structure

```json
{
    "_id": {
        "$oid": "Default ObjectID"
    },
    "id": "String (unique)",
    "restaurantId": "String (restaurant reference id)",
    "name": "String (name of the food)",
    "price": "Float (price of the food)",
    "image": "String (id of image stored in system)",
    "category": "String (category of food, unique for a restaurant)",
    "description": "String (description of food)",
    "ingredients": "String (ingrediants of food)"
}
```

