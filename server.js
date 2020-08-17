const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const cron = require('cron').CronJob;

const app = express();
app.use(bodyParser.json());
const schema = require('./Schema/Schema');
const rootValue = require('./RootValue/RootValue');
const PORT = process.env.PORT || 5000;
const isAuth = require('./auth/auth');
const getFriendsDateofBirth = require('./helper/send_message_helper');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

var job = new cron(
  `* 01 01 * * *`,
  // sendMessage(senderPhone, receiverPhone, body), The Sender phone has to be my new number and also the body has to be chosen by the user
  () => {
    // console.log('AM I running nowwww');
    getFriendsDateofBirth(
      '+12512554174',
      '+61410171700',
      'This is a birthday test'
    );
  }
  // null,
  // true,
  // 'Australia/Sydney'
);
job.start();

app.use(isAuth);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);
//Connects to Mongoose Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database is successfully connected');
    app.listen(PORT, () => {
      console.log(`Server is listening to PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// +12512554174;
