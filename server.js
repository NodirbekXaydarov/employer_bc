// app.js (YANGILANGAN)

const express = require('express');
const cors = require('cors'); // <-- 1. QO'SHING
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mainRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors()); // <-- 2. BARCHA MARSHRUTLARDAN OLDIN QO'SHING
app.use(express.json());

// Swagger sozlamalari
const swaggerOptions = {
    // ... sizning swagger sozlamalaringiz
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Jobs and Employers API',
            version: '1.0.0',
            description: 'Kasblar va ish beruvchilarni boshqarish uchun API hujjatlari',
        },
        servers: [
            {
                // BU YERNI HAM RENDER MANZILIGA O'ZGARTIRISHNI UNUTMANG
                url: process.env.NODE_ENV === 'production' 
                    ? 'https://employer-bc.onrender.com/api' 
                    : `http://localhost:${process.env.PORT || 3000}/api`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Mahalliy server'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Asosiy Marshrut
app.use('/api', mainRouter);

// Markazlashgan xatolik ishlovchisi
app.use(errorHandler);

// Eslatma: Sizning portingiz 10000 ekanligini hisobga oldim
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda`);
});