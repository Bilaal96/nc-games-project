const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');

const testData = require('../db/data/test-data');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/categories', () => {
  it('200: returns an array of category objects', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then((response) => {
        const { categories } = response.body;
        expect(categories).toBeInstanceOf(Array);

        // length should match categoryData.length
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
