const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb+srv://msvenkat1990:224872@cluster0.y7fyoiu.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res)=>{
    console.log('DataBase connact susseccfully');
})
.catch((error)=>{
    console.log('DataBase connact not susseccfully');
})
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
