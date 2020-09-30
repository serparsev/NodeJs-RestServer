 //=========
 // Puerto
 //=========

 process.env.PORT = process.env.PORT || 3000;


 //=========
 // Entorno
 //=========


 process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

 //=========
 // Base de datos
 //=========

 let urlDB;

 if (process.env.NODE_ENV == 'dev') {

     urlDB = 'mongodb://localhost:27017/cafe'

 } else {
     urlDB = process.env.MONGO_URI
 }

 process.env.URLDB = urlDB



 //=========
 // Vencimiento token
 //=========
 // 60s
 // 60min
 // 24h
 // 30 dias

 process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



 //=========
 // SEED de autentificacion
 //=========


 process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';


 //=========
 // Google Client ID
 //=========


 process.env.CLIENT_ID = process.env.CLIENT_ID || '132332399505-p8rlp37evg9g0djd8lurgk1esi5savg2.apps.googleusercontent.com';