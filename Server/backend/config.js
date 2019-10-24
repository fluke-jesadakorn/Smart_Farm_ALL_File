require('dotenv').config()

const YOUR_DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/SmartFarm'  // MongoDB Only
const YOUR_NB_PORT = process.env.NB_PORT || 5003 // Insert Here ex. 3003
const YOUR_SOCKET_PORT = process.env.SOCKET_PORT || 5001
module.exports = {
    NB_PORT : YOUR_NB_PORT,
    SOCKET_PORT :  YOUR_SOCKET_PORT,
    DATABASE_URL : YOUR_DATABASE_URL
}
