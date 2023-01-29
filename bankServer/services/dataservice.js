
//import db
const db = require('./db')
//import jsonwebtoken
const jwt = require('jsonwebtoken')


//login definition
const login =(acno,password)=>{
    //Search acno,passwoed in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        console.log(result);
        if(result){
            //generate token
            const token = jwt.sign({
                currentAcno:acno
            },"Secret")
            //sent to client
            return {
                message:'Login Successful',
                status:true,
                statusCode:200,
                username:result.username,
                token,
                currentAcno:acno
            }
        }
        else{
            return{
                message:'Invalid Credentials',
                status:false,
                statusCode:404

            }
        }
    })
}
//register
const register = (acno,pswd,uname)=>{
    //1.search account num in db,if yes
    return db.User.findOne({
        acno
    }).then((result)=>{
        //2. if yes respose: already exist
        if(result){
            return {
                message:'Already existing User!!',
                status:false,
                statusCode:404
            }
        }
        //3. new user : store all data into db
        else{
           let newUser =new db.User({
            acno,
            username:uname,
            password:pswd,
            balance:0,
            transaction:[]
           })
           newUser.save()
           return{
            message:'New User Registered Successfully',
                status:true,
                statusCode:200

           }
        }
    })
}
const deposit =(req,acno,password,amount)=>{
    var amt =Number(amount)
    //Search acno,passwoed in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        if(acno!=req.currentAcno){
            return{
                message:"Permission Denied!",
                status:false,
                statusCode:404
            }
        }
        console.log(result);
        if(result){
            result.balance +=amt
            result.transaction.push({
                amount,
                type:'CREDIT'
            })
            result.save()
            return {
                message:`${amt} deposited successfully and current balance is ${result.balance}`,
                status:true,
                statusCode:200
            }
        }
        else{
            return{
                message:'Invalid Credentials',
                status:false,
                statusCode:404

            }
        }
    })
}

const withdraw =(req,acno,password,amount)=>{
    var amt =Number(amount)
    //Search acno,passwoed in mongodb - findOne()
    return db.User.findOne({
        acno,
        password
    }).then((result)=>{
        if(acno!=req.currentAcno){
            return{
                message:"Permission Denied!",
                status:false,
                statusCode:404
            }
        }
        console.log(result);
        if(result.balance>amt){
            result.balance -=amt
            result.transaction.push({
                amount,
                type:'DEBIT'
            })
            result.save()
            return {
                message:`${amt} withdraw successfully and current balance is ${result.balance}`,
                status:true,
                statusCode:200
            }
        }
        else{
            return{
                message:'Insufficient Amount!',
                status:false,
                statusCode:404

            }
        }
    })
}
//transaction function
const transaction = (acno)=>{
    return db.User.findOne({
        acno
    }).then(result=>{
        if(result){
        return{
            status:true,
            statusCode:200,
            transaction:result.transaction
        }
    }
    else{
        return{
            message:"Invalid Account Number",
            status:false,
            statusCode:404
        }
    }
    })
}
//to delete acno from db
const deleteAcc =  (acno)=>{
    return db.User.deleteOne({
        acno
    }).then(result=>{
        if(result){
        return{
            status:true,
            statusCode:200,
            message:`Account ${acno} is deleted successfully...!`
        }
    }
    else{
        return{
            message:"Invalid Account Number",
            status:false,
            statusCode:404
        }
    }
    })

}
module.exports={
    login,
    register,
    deposit,
    withdraw,
    transaction,
    deleteAcc
}