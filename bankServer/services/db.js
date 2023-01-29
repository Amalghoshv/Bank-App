//MONGODB Connection
//1. import Mongoose
const { mongoose } = require('mongoose')
const Mongoose =require('mongoose')
//2.Define Connection string
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('MongoDB connected Succesfully!!')
})
//3. Create a model to store data of bank
const User =mongoose.model('User',{    //to connect exact database in  mongodb to corrections in database we muse use collection name in singular form and first letter must be Capital letter
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})
//4. to use User in other files- we have to export it
module.exports={
    User
}