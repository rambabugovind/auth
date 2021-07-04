import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import router from './router.js';

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('combined', { immediate: {} }));

router(app);

try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ram-dev.chnvg.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log('DB connxn successful!');
} catch (err) {
  console.log('Error while trying to connect to MongoDB using mongoose...');
}

// const { MongoClient } = require('mongodb');
// const uri =
//   'mongodb+srv://<username>:<password>@ram-dev.chnvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
