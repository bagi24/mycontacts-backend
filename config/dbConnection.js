const moongose = require('mongoose');

const connectDb = async () => {
  try {
    const connect = await moongose.connect(process.env.CONNECTION_STRING);
    console.log('MongoDB Connected...', connect.connection.host, connect.connection.name);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
