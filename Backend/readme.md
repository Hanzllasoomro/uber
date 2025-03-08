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

# /users/profile Endpoint Documentation

## Description
Fetches the profile of the logged-in user. The endpoint requires authentication.

## Endpoint
**GET /users/profile**

## Responses

### Success (200)
- Returns the user profile object.

**Example:**
```json
{
  "user": { /* user data */ }
}
```

### Error (401)
- Returns an error if the user is not authenticated.

**Example:**
```json
{
  "msg": "Unauthorized"
}
```

# /users/logout Endpoint Documentation

## Description
Logs out the authenticated user by clearing the authentication token. The endpoint requires authentication.

## Endpoint
**GET /users/logout**

## Responses

### Success (200)
- Returns a message indicating successful logout.

**Example:**
```json
{
  "message": "Logout successfully"
}
```

### Error (401)
- Returns an error if the user is not authenticated.

**Example:**
```json
{
  "msg": "Unauthorized"
}
```

# /captains/register Endpoint Documentation

## Description
Registers a new captain with vehicle details. The endpoint accepts a JSON body, hashes the provided password, stores the captain information, and returns a JWT token.

## Endpoint
**POST /captains/register**

## Request Body
- **email**: Captain's email (string, valid format)
- **password**: Captain's password (string, minimum 5 characters)
- **fullname**: Object containing:
    - **firstname**: Captain's first name (string, required, minimum 3 characters)
    - **lastname**: Captain's last name (string, optional)
- **vehicle**: Object containing:
    - **color**: Vehicle color (string, minimum 3 characters)
    - **plate**: Vehicle plate number (string, minimum 3 characters)
    - **vehicleType**: Type of vehicle (string, must be one of: 'motorcycle', 'car', 'rakshaw')
    - **capacity**: Vehicle passenger capacity (integer, minimum 1)

**Example:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.driver@example.com",
  "password": "secret123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-123",
    "vehicleType": "car",
    "capacity": 4
  }
}
```

## Responses

### Success (201)
- Returns the created captain object and a JWT token.

**Example:**
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-123",
      "vehicleType": "car",
      "capacity": 4
    }
  },
  "token": "eyJhbGciOi..."
}
```

### Error (400)
- Returns validation errors if any required field is missing or invalid.

**Example:**
```json
{
  "error": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

### Error (400) - Duplicate Captain
- Returns an error if the email is already registered.

**Example:**
```json
{
  "message": "Captain already exist"
}
```
