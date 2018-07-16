process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// Base de datos

if ( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGODB_URL;
}

// ================
// JWT -- Tokens 
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
process.env.TOKENSEED = process.env.TOKENSEED || 'seedDesarrollo';

process.env.URLDB = urlDB;
