# express-mongoose-zod E-commerce api

### To run locally
- Clone the repository
- Install dependencies from package.json using `npm i`
- Create a `.env` file with PORT and DB_URL variables.
- Set DB_URL value as mongodb connection link
- Development Run: `npm run start:dev`
- Production Run: `npm run start:prod`

### API details
#### Product Management
Sample Product:

```json
{
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
        {
            "type": "Color",
            "value": "Midnight Blue"
        },
        {
            "type": "Storage Capacity",
            "value": "256GB"
        }
    ],
    "inventory": {
        "quantity": 50,
        "inStock": true
    }
}
```
- Create a New Product: - **Endpoint**: **`/api/products`** **Method: `POST`**
- Retrieve a List of All Products: - **Endpoint**: **`/api/products`** **Method: `GET`**
- Retrieve Product by ID: - **Endpoint** **`/api/products/:productId`** **Method: `GET`**
- Update Product: - **Endpoint**: **`/api/products/:productId`** **Method: `PUT`**
- Delete a Product: - **Endpoint**: **`/api/products/:productId`** **Method: `DELETE`**
- Search a product: - **Endpoint: `/api/products?searchTerm=iphone`** **Method: `GET`**


#### Order Management 

Sample Order

 ```json
{
    "success": true,
    "message": "Order created successfully!",
    "data": {
        "email": "level2@programming-hero.com",
        "productId": "5fd67e890b60c903cd8544a3",
        "price": 999,
        "quantity": 1
    }
}
```
- Create a New Order: - **Endpoint: `/api/orders`** **Method: `POST`**
- Retrieve All Orders: - **Endpoint: `/api/orders`** **Method: `GET`**
- Retrieve Orders by User Email: - **Endpoint: `/api/orders?email=abc@test-hero.com`** **Method: `GET`**


### Live api link: https://express-mongoose-zod-ecommerce.vercel.app/
