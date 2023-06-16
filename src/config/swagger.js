const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sit Project',
        version: '1.0.0',
        description:
            'This is the api documentation for the sit project.',
        license: {
            name: 'Licensed Under KARLMABS CORP',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Karlmabs',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes.js'],
};

module.exports = options;
