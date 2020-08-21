process.env.PORT = process.env.PORT || 3000
process.env.HOST = process.env.HOST || "0.0.0.0"
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
if (process.env.NODE_ENV === 'dev')
    process.env.MONGODB = "mongodb://localhost:27017/cafe"
else
    process.env.MONGODB = process.env.MONGO_URI
    //Caducidad en minutos: 15 minutos
process.env.CADUCIDAD_TOKEN = 15
    //SEED
process.env.SEED = process.env.SEED || 'esto-esta-en-dev'
    //Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID