# User API Spec

## Register User API

Endpoint: POST /api/users

Request Body :

```json
{
  "username": "users",
  "password": "rahasia",
  "name": "user@example.com"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "users",
    "name": "user@example.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Headers :

- Authorization : token

Request Body :

```json
{
  "username": "users",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "username or password is invalid"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers :

- Authorization : token

```json
{
  "name": "users new", // optional
  "password": "new password" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "name": "users new", // optional
    "password": "new password" // optional
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "data": {
    "username": "users",
    "name": "users@example.com",
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
    "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
