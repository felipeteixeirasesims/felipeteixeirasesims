import swaggerAutogen from 'swagger-autogen';
const outputFile = './src/shared/documentation.json';
const endpointsFiles = ['./src/shared/app.ts'];

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'CoTeachAi API Documentation',
    description: 'This is an API REST',
    version: "1.0.0",
    contact: {
      email: "isi.tics@sistemafiepe.org.br"
    }
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: "header",
      bearerFormat: 'JWT'
    }
  },
  basePath: '',
  host: 'localhost:3333',
  schemes: ['http'],
  components: {
    '@schemas': {
      User: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          id: {
            type: "string",
            format: "uuid",
            description: "The auto generate uuid of the User"
          },
          name: {
            type: "sting",
            description: "The name of the User"
          },
          email: {
            type: "string",
            description: "The email of the User"
          },
          role: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid",
                description: "The auto generate uuid of the Role"
              },
              name: {
                type: "string",
                description: "The name of the Role"
              },
              created_at: {
                type: "string",
                format: "date-time",
                description: "The creation date of the Role"
              },
              updated_at: {
                type: "string",
                format: "date-time",
                description: "The update date of the Role"
              }
            }
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "The creation date of the User"
          },
          updated_at: {
            type: "string",
            format: "date-time",
            description: "The update date of the User"
          }
        }
      },
      someParameter: {
        type: 'object',
        properties: {
          property1: {
            type: 'integer',
            format: 'int32',
            description: 'With no swagger-autogen render...'
          }
        }
      }
    }
  }
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
