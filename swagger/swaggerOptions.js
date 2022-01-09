module.exports =  {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Boncho server API',
      version: '1.0.0',
      description: 'Test description'
    },
    servers: [
      {
        url: 'http://localhost:5050'
      }
    ]
  },
  apis: ['./swaggerSchemas/*.js']
}