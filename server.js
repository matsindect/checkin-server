const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(`Error name: ${err.name}, Error message ${err.message}`);
  process.exit(1);
});

const server = require('./app');
dotenv.config({ path: './config.env' });

const dbConnect = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(dbConnect)
  .then(() => {
    console.log('MongoDB connection successful');
  });
// START SERVER
const port = process.env.PORT || 3000;
const afroFarmServer = server.listen(port, () => {
  console.log(`Advent connect now running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(`Error name: ${err.name}, Error message ${err.message}`);
  afroFarmServer.close(() => {
    process.exit(1);
  });
});
