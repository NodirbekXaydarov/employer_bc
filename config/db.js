// config/db.js (YANGI VERSIYA)
const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Production (Render) uchun DATABASE_URL'ni, aks holda .env faylidagi ma'lumotlarni ishlatamiz.
const connectionString = isProduction 
    ? process.env.DATABASE_URL 
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
    connectionString: connectionString,
    // Production muhitida SSL ulanishini majburiy yoqish
    ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = pool;

