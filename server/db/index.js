const mongoose = require('mongoose')

// mongoDB credentials here
const uri = ""
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("connection is successful");
}).catch((e) => {
  console.log("No connection")
  console.log(e);
})