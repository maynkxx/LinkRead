const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user.router')
const authRoutes = require('./routes/auth.router')

dotenv.config();

mongoose.connect(process.env.MONGO).then(
  console.log("Databse connected successfully")
).catch((err)=>{console.log(err)});


app.use(express.json())

app.use('/backend/user',userRoutes);

app.use('/backend/auth',authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
