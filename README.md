# pantry-clone

## Getting Started

- Clone this git repository to your local machine.
- Run `npm install` inside the project directory.
- Run `node index.js` to run the Node.js server.

The APIs are now ready to be used.

## Postman Collection

The sample Postman collection for the executed APIs is linked [here](https://www.postman.com/spaceflight-geoscientist-21820644/workspace/pantry-clone/collection/19676415-25f589a3-dc30-4baa-9620-519e2fda2653).

## APIs

- **SYSTEM**  
   -- Get Active Users (GET)
- **PANTRY**  
   -- Create New Pantry (POST)  
   -- Get Pantry Details (GET)
- **BASKET**  
   -- Create New Basket (POST)  
   -- Get Basket Details (GET)  
   -- Update Basket (PUT)  
   -- Delete Basket (DELETE)

## SYSTEM

- **Get Active Users (GET)**

  - Get the total number of registered active users.
  - Send a GET request to `http://localhost:3000/system/status`

## PANTRY

- **Create New Pantry (POST)**

  - Given your email address (CONTACT_EMAIL) and your desired pantry name (PANTRY_NAME), create a new pantry.
  - The request body looks something like this:

    ```
    {
    	name: PANTRY_NAME,
    	contactEmail: CONTACT_EMAIL,
    }
    ```

  - Send a POST request to `http://localhost:3000/pantry/create` with the above body.

- **Get Pantry Details (GET)**

  - Given a PANTRY_ID, return the details of the pantry, including a list of baskets currently stored inside it.
  - Send a GET request to `http://localhost:3000/pantry/PANTRY_ID`.

## BASKET

- **Create New Basket (POST)**

  - Create a new basket for your existing pantry to store data.
  - Your request body should look something like this:
    ```
    {
    	data: YOUR_JSON_DATA_TO_BE_STORED
    }
    ```
  - Send a POST request to `http://localhost:3000/pantry/PANTRY_ID/basket/BASKET_NAME`, with the above mentioned body.

- **Get Basket Details (GET)**

  - Provided your PantryID and BasketName, get data stored in that basket.
  - Send a GET request to `http://localhost:3000/pantry/PANTRY_ID/basket/BASKET_NAME`

- **Update Basket (PUT)**

  - To update the data stored in a particular basket.
  - Your request body should look something like this:
    ```
    {
    	data: UPDATED_JSON_DATA_TO_BE_STORED
    }
    ```
  - Send a PUT request to `http://localhost:3000/pantry/PANTRY_ID/basket/BASKET_NAME`, with the above mentioned body.

- **Delete Basket (DELETE)**

  - To delete any existing basket.
  - Send a DELETE request to `http://localhost:3000/pantry/PANTRY_ID/basket/BASKET_NAME`
