# Node API
### Tasks: Build Node.js Endpoints


### Note

```bash
  To use all APIs except add account & login need to create an account first because all rest of the APIs need JWT Auth token.
  In the Following Format
  1) Set headers
    "Authorization": "Bearer JWT TOKEN"
```

  
## API Routes

- For Website Owner
  - To Add Account ``` /admin/addAccount ```
    ```
    {
      "name": string,
      "mobile": number,
      "email": string,
      "userType": "A",
      "password": password,
      "gender": string
    }

  - To Add Products ``` /admin/addProduct ```

    ```
    {
      "product_name" : string,
      "product_desc" : string,
      "product_price" : number,
      "created_by" : number(user id)
    }
    ```

  - To View Orders ``` /admin/viewOrders ```
  
- For End User (Customers)
    - To Add account ``` /user/createAccount ```

      ```
      {
        "name": string,
        "mobile": number,
        "email": string,
        "userType": "U",
        "password": password,
        "gender": string
      }
      ```

    - To Login ``` /user/login ```

      ```
      {
        "email": email registered with,
        "password": password
      }
      ```

    - To Browse Products ``` /user/browseProducts ```

    - To Order Products (No Payment Integration) ``` /user/orderProduct ```

      ```
      {
        "ordered_product_name" : string,
        "ordered_product_desc" : string,
        "ordered_product_price" : number,
        "ordered_product_id" : number,
        "status" : number(from 0 to 4),
        "placed_by" : number(user id)
      }
      ```

    - To View Orders ``` /user/viewOrders ```

      ```
        {
        "userId" : number
        } 
      ```



  
## Database Config

```
After cloning the repo Change database configuration in config.json file located in config directory according to your database server.
```

  
## Run Project

Open Terminal or CMD and use Following Command

To Install Dependancies

```bash
  cd api
  
  npm install
      or
  yarn install
  
```
To Start Server
```bash
 npm start
    or
 yarn start
```
