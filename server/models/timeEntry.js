const mongoose = require('mongoose')


const timeEntrySchema = new mongoose.Schema({
  date: {
    type: String,
    requird: true 
  },

  project: {
    project_name: {
      type: String,
      required: true
    },
  },

  timings: {
    start_time: {
      type: String,
      required: true
    },
  
    end_time: {
      type: String,
      required: true
    }
  },

  total_time: [{
    type: String,
    required: true
  }]

})

module.exports = mongoose.model('Entry', timeEntrySchema);