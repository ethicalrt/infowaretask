# Node API
### Tasks: Build Node.js Endpoints


### Note

```bash
  To use all API's except add account & login need to create an account first because all rest of the API's need JWT Auth token.
```

  
## API Routes

- For Website Owner
  - To Add Account ``` /admin/addAccount ```

  - To Add Products ``` /admin/addProduct ```

  - To View Orders ``` /admin/viewOrders ```

- For End User (Customers)
    - To Add account ``` /user/createAccount ```

    - To Login ``` /user/login ```

    - To Browse Products ``` /user/browseProducts ```

    - To Order Products (No Payment Integration) ``` /user/orderProduct ```

    - To View Orders ``` /user/viewOrders ```



  
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
  yarn 
  
```
To Start Server
```bash
 npm start
    or
 yarn start
```
