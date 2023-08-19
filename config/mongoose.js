const mongoose = require('mongoose');
const config = require('./environment'); // Update the path

async function main() {
    console.log(config.MONGO_URL);
    await mongoose.connect(config.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connection Successful!!");
}

main().catch(error => console.error("Connection not successful:", error));

module.exports = mongoose;

