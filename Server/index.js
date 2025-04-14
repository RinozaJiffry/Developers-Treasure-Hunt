const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const teamRoutes = require('./routes/team');
const gameRoutes = require('./routes/game');

app.use('/api/teams', teamRoutes);
app.use('/api/game', gameRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
