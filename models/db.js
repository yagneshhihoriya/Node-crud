const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yagneshdhanani:r1gj0FzcTbu438Cf@userdetails.tsv9k.mongodb.net/file-uploads?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');