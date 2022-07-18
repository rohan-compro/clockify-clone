const TimeEntry = require('../models/timeEntry')

exports.getTimeEntries = async(req, res) => {
  try {
    let entries = await TimeEntry.find();

    // successful
    res.status(200).json(entries);
  }
  catch (err) {

    //server error
    res.status(500).json({
      message: err.message
    })
    
  }
}

exports.setTimeEntry = async(req,res)=>{
  let data = req.body;
  let entry = new TimeEntry(data);
  
  try {
    entry.save();

    // created successful
    res.status(201).json(entry);
  }
  catch (err) {
    
    //client error
    res.status(400).json({
      message: err.message
    });
  }

}