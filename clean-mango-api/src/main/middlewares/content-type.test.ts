import request from 'supertest'
import app from '../config/app'

describe('Content Type', () => {
  test('Should return default content-type as JSON', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send({})
    })
    const response = await request(app).get('/test_content_type')
    expect(response.headers['content-type']).toMatch(/json/)
  })
})
