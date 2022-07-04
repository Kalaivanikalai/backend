const path = require('path');
const express = require('express');
const colors = require('colors');
const mongoose = require("mongoose");
const { errorHandler } = require('./middleware/errorMiddleware');

require("dotenv").config();




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.get('/',(req,res)=>{
  res.send("API IS Running!");
})

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connetion Successfull");
})
.catch((err) => {
  console.log(err.message);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('server running at port', 8080)
})
