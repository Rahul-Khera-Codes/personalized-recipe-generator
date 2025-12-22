import request from 'supertest';
import app from '../src/app'; // Adjust the path to your app
import mongoose from 'mongoose';
import User from '../src/models/User'; // Adjust the path to your User model
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'password123' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.username).toBe('testuser');
  });

  it('should return 400 for missing username', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ password: 'password123' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username is required');
  });

  it('should return 400 for missing password', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'testuser' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Password is required');
  });

  it('should fetch all users', async () => {
    await User.create({ username: 'testuser1', password: 'password123' });
    await User.create({ username: 'testuser2', password: 'password123' });

    const res = await request(app).get('/api/users');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should return 404 for non-existing user', async () => {
    const res = await request(app).get('/api/users/nonexistinguser');
    
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});