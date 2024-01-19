## In Backend .ENV file should include:

### PORT
### MONGODB_URL
### SECRET
### CLIENT_URL

`PORT` refers to which port the backend should run. Is extremely mandatory to put properly cause all requests need it.
`MONGODB_URL` refers to the connection string of the MONGO DB database (ATLAS) with username and password
`SECRET` refers to the secret key used for encryption
`CLIENT_URL` refers to the url of the front-end that will request for this back-end

## In Frontend .ENV file should include:

### REACT_APP_URL

`REACT_APP_URL` refers to the URL of the front-end where it is deployed along with port number. Example `http://localhost:8000`