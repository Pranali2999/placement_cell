const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection Successful!!");
    } catch (error) {
        console.error("Connection not successful:", error);
    }
}

main();
