process.env.PORT = process.env.PORT || 3000;

// ================
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================
// Base de datos

if ( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb://barreraslzr:barreraslzradmin0@ds137611.mlab.com:37611/cafe_udemy'
}
process.env.URLDB = urlDB;
