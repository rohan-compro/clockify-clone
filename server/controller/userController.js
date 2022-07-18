const TimeEntry = require('../models/timeEntry')

exports.getTimeEntries = async(req, res) => {
  try {
    let entries = await TimeEntry.find();
    // Successful
    res.status(200).json(entries);
  }
  catch (err) {
    //Server Error - Service Unavailable
    res.status(503).json({
      message: err.message
    })
  }
}
exports.setTimeEntry = async(req,res)=>{
  let data = req.body;
  let entry = new TimeEntry(data);
  try {
    entry.save();
    // Created Successful
    res.status(201).json(entry);
  }
  catch (err) {
    //Client Error - Forbidden as request is recieved but unable to process
    res.status(403).json({
      message: err.message
    });
  }
}