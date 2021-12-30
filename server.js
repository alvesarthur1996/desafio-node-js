const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv-safe').config();

app.use(express.json());
app.use(cors());

require('./src/routes/index')(app);

app.listen(process.env.PORT || 3333);
