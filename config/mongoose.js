const mongoose = require('mongoose');
async function main(){
    //await mongoose.connect('mongodb+srv://Pranali:ucsAdLmhDjhdgu22@cluster0.lqn3xio.mongodb.net/');
    await mongoose.connect('mongodb+srv://Pranali:ucsAdLmhDjhdgu22@cluster0.lqn3xio.mongodb.net/?retryWrites=true&w=majority');
    console.log("connection Successfull !! ");
}
main().catch(error =>console.log("connection not successfull !!"));

module.exports = mongoose;
