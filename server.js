// app.js
const express = require('express');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mainRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(express.json());

// Swagger sozlamalari
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Jobs and Employers API',
            version: '1.0.0',
            description: 'Kasblar va ish beruvchilarni boshqarish uchun API hujjatlari',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api`,
                description: 'Mahalliy server'
            }
        ]
    },
    apis: ['./routes/*.js'] // Marshrut fayllariga yo'l
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Asosiy Marshrut
app.use('/api', mainRouter);

// Markazlashgan xatolik ishlovchisi (barcha marshrutlardan keyin chaqirilishi kerak)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});