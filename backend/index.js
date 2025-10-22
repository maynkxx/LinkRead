const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

mongoose.connect(process.env.MONGO).then(
  console.log("Databse connected successfully")
).catch((err)=>{console.log(err)});



app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
