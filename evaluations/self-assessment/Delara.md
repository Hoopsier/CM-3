# Self Assessment – Delara Nipa

## Code Quality and Functionality

The backend API was implemented using Node.js, Express, and MongoDB with Mongoose.  
The code is organized into controllers, models, and routes which improves readability and maintainability.

Main aspects of the code quality:

- Clear REST API structure
- Proper HTTP status codes
- Input validation for ObjectIds
- Error handling using try/catch blocks
- Separation of concerns between controllers, routes, and models

The API successfully performs CRUD operations for vehicle rentals.

## Challenges Faced

Several challenges occurred during development:

### 1. Mongoose validation errors
The schema required nested objects such as `agency` and `location`.  
Initially my request body did not match the schema structure. I corrected the JSON structure and updated the API requests.

## What I Learned

From this project I learned:

- How to design REST APIs using Express
- How to structure backend applications with controllers, models, and routes
- How to use MongoDB with Mongoose
- How to test APIs with Jest and Supertest
- How to debug backend errors effectively
- How to use Git branches and commits in a collaborative project

Overall, this project helped improve my backend development and debugging skills.