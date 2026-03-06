require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const config = require('../utils/config');

describe.skip('Vehicle Rental API Testing', () => {

  beforeAll(async () => {
    const url = config.MONGODB_URI || process.env.MONGODB_URI;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let rentalId;

  // 1. GET ALL
  test('GET /api/vehicleRentals should return a list', async () => {
    const response = await request(app).get('/api/vehicleRentals');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // 2. POST (CREATE)
  test('POST /api/vehicleRentals should create a new record', async () => {
    const newRental = {
      vehicleModel: "Tesla Model 3",
      category: "Electric",
      description: "A high-performance electric sedan.",
      dailyPrice: 150,
      insurancePolicy: "Full Coverage",
      location: { city: "Helsinki", state: "Uusimaa" },
      agency: { name: "Bob's Rentals", contactEmail: "bob@example.com" }
    };

    const response = await request(app)
      .post('/api/vehicleRentals')
      .send(newRental);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    rentalId = response.body._id;
  });

  // 3. GET BY ID
  test('GET /api/vehicleRentals/:id should return the specific rental', async () => {
    const response = await request(app).get(`/api/vehicleRentals/${rentalId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.vehicleModel).toBe("Tesla Model 3");
  });

  // 4. PUT (UPDATE)
  test('PUT /api/vehicleRentals/:id should update the daily price', async () => {
    const updatedData = { dailyPrice: 200 };
    const response = await request(app)
      .put(`/api/vehicleRentals/${rentalId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.dailyPrice).toBe(200);
  });

  // 5. DELETE
  test('DELETE /api/vehicleRentals/:id should remove the record', async () => {
    const response = await request(app).delete(`/api/vehicleRentals/${rentalId}`);
    expect([200, 204]).toContain(response.statusCode);

    const checkExist = await request(app).get(`/api/vehicleRentals/${rentalId}`);
    expect(checkExist.statusCode).toBe(404);
  });
});
