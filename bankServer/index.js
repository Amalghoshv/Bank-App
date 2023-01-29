//import express to index.js
const express=require('express')
//import cors
const cors = require('cors')
//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import dataService
const dataService = require('./services/dataservice')
//Create server app using express
const app = express();
//to define origin using cors
app.use(cors({
    origin:'http://localhost:4200'
}))
//Set up port for server app
app.listen(3000,()=>{
    console.log('server started at 3000');
})
//Application Specific Middleware
const appMiddleware = (req,res,next)=>{
    console.log("Application Specific Middleware");
    next()
}
//to use middleware in entire app
app.use(appMiddleware)
//To resolve request from client
app.get('/',(req,res)=>{
    res.send("GET REQUEST")
})
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})
app.put('/',(req,res)=>{
    res.send("PUT REQUEST")
})
app.patch('/',(req,res)=>{
    res.send("PATCH REQUEST")
})
app.delete('/',(req,res)=>{
    res.send("DELETE REQUEST")
})
//to parse json
app.use(express.json());

//bank server api - request resolving
//jwt token verification middleware
const jwtMiddleware = (req,res,next)=>{
    console.log("Router specific Middleware");
    //1.get token from request header in access-token
    const token = req.headers['access-token']
    //2.verify token using verify method in jsonwebtoken
    try{
        const data = jwt.verify(token,"Secret")
        //assigning login user acno to currentAcno in req
        req.currentAcno = data.currentAcno
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            status:false,
            message:"Please Login first"
        })
    }
}
//login resolving
app.post('/login',(req,res)=>{
    console.log(req.body);
    //asynchronous
    dataService.login(req.body.acno,req.body.pswd)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
//register API - resolve register call
app.post('/register',(req,res)=>{
    console.log(req.body);
    //asynchronous
    dataService.register(req.body.acno,req.body.pswd,req.body.uname)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })

})
//deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    //asynchronous
    dataService.deposit(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    //asynchronous
    dataService.withdraw(req,req.body.acno,req.body.pswd,req.body.amount)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//transaction API - resolve
app.get('/transaction/:acno',jwtMiddleware,(req,res)=>{
    console.log(req.params);
    //asynchronous
    dataService.transaction(req.params.acno)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//deleteAccount API
app.delete('/deleteAcc/:acno',jwtMiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
