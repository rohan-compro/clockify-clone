const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const port = 3300;
const userData = require('./routes/user')
require('./db/index')
app.use(express.static(__dirname + '../dist/clockify-angular'))
app.use(cors({
  origin:"*"
}))
app.use(express.urlencoded());
app.use(express.json());
app.use('/user', userData);
app.listen(port, () => {
  console.log(__dirname);

  console.log(`server started at port ${port}`);
})