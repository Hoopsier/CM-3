require('dotenv').config()
const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel.js');
const VehicleRental = require('../models/vehicleRentalModel.js');
const mongoose = require('mongoose')

describe('Authentication & Authorization', () => {
  let authToken;
  let rentalId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST)
  })
  beforeEach(async () => {
    await User.deleteMany({});
    await VehicleRental.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  })

  describe('User Signup', () => {
    it('should successfully create a new user account', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'asdASD123!@#',
        })
      authToken = res.token

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('email', 'test@example.com');
    });

    it('should reject signup with invalid email', async () => {
      const res = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'invalid-email',
          password: 'asdASD123!@#',
        });

      expect(res.status).toBe(400);
    });

    it('should reject signup with duplicate email', async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'asdASD123!@#',
        });

      const res = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'asdASD123!@#',
        });

      expect(res.status).toBe(400);
    });
  });

  describe('User Login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@example.com',
          password: 'asdASD123!@#',
        });
    });

    it('should successfully login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'asdASD123!@#'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      authToken = res.body.token;
    });

    it('should reject login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'test@example.com',
          password: 'WrongasdASD123!@#'
        });

      expect(res.status).toBe(400);
    });

    it('should reject login with non-existent email', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'asdASD123!@#'
        });

      expect(res.status).toBe(400);
    });
  });

  describe('Vehicle Rental API Authorization', () => {
    beforeEach(async () => {
      const signupRes = await request(app)
        .post('/api/users/signup')
        .send({
          email: 'rental@example.com',
          password: 'asdASD123!@#',
        });
      authToken = signupRes.body.token;
    });

    it('should allow access with valid token', async () => {
      const res = await request(app)
        .get('/api/vehicleRentals')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
    });

    it('should create vehicle rental with valid token', async () => {
      const res = await request(app)
        .post('/api/vehicleRentals')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          vehicleModel: "Tesla Model 3",
          category: "Electric",
          description: "A high-performance electric sedan.",
          dailyPrice: 150,
          insurancePolicy: "Full Coverage",
          location: { city: "Helsinki", state: "Uusimaa" },
          agency: { name: "Bob's Rentals", contactEmail: "bob@example.com" }
        });

      expect(res.status).toBe(201);
      rentalId = res.body._id;
    });

    it('should deny rental update without token', async () => {
      const res = await request(app)
        .put(`/api/vehicleRentals/${rentalId}`)
        .send({ status: 'cancelled' });

      expect(res.status).toBe(401);
    });
  });
});
