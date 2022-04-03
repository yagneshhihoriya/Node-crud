const mongoose = require("mongoose");
const dbConfig = require('./config').dbConfig;

mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.db}`).then(result => {
    console.log('db is connected');
}).catch(err => {
    console.log(`db err:${err}`);
    process.exit(1)
})

module.exports = mongoose