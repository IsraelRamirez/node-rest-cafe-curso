process.env.PORT = process.env.PORT || 3000
process.env.HOST = process.env.HOST || "0.0.0.0"
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

if (process.env.NODE_ENV === 'dev')
    process.env.MONGODB = "mongodb://localhost:27017/cafe"
else
    process.env.MONGODB = process.env.MONGO_URI