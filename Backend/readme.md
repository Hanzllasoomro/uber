# /users/register Endpoint Documentation

## Description
Registers a new user. The endpoint accepts a JSON body, hashes the provided password, stores the user, and returns a JWT token.

## Endpoint
**POST /users/register**

## Request Body
- **email**: User's email (string, valid format, minimum 5 characters).
- **fullname**: Object containing:
    - **firstname**: User's first name (string, required, minimum 3 characters).
    - **lastname**: User's last name (string, optional, minimum 3 characters if provided).
- **password**: User's password (string, required, minimum 5 characters).

**Example:**
```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}
```

## Responses

### Success (201)
- Returns the created user object and a JWT token.

**Example:**
```json
{
  "user": { /* user data */ },
  "token": "eyJhbGciOi..."
}
```

### Error (400)
- Returns validation errors if any required field is missing or invalid.

**Example:**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

# /users/login Endpoint Documentation

## Description
Logs in an existing user. The endpoint accepts a JSON body, verifies the provided credentials, and returns a JWT token.

## Endpoint
**POST /users/login**

## Request Body
- **email**: User's email (string, valid format).
- **password**: User's password (string, required, minimum 5 characters).

**Example:**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

## Responses

### Success (200)
- Returns the logged-in user object and a JWT token.

**Example:**
```json
{
  "user": { /* user data */ },
  "token": "eyJhbGciOi..."
}
```

### Error (400)
- Returns validation errors if any required field is missing or invalid.

**Example:**
```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

### Error (401)
- Returns an error if the credentials are incorrect.

**Example:**
```json
{
  "msg": "Invalid credentials"
}
```
