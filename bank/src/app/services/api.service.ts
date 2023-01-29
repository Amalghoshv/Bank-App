import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options ={
  headers:new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   //deposit API - Asynchronous
  deposit(acno:any,pswd:any,amount:any){
    const body={
      acno,
      pswd,
      amount
    }
    return this.api.post('http://localhost:3000/deposit',body,this.getToken())


  }
  withdraw(acno:any,pswd:any,amount:any){
    const body={
      acno,
      pswd,
      amount
    }
    return this.api.post('http://localhost:3000/withdraw',body,this.getToken())


  }
  
  //to insert token in a htttp header
  getToken(){
    //1.get token from localstorage
    const token = localStorage.getItem("token")
    //2. create http header
    let headers = new HttpHeaders
    //3.inside token inside header
    if(token){
      headers=headers.append("access-token",token)
      //to achieve function overloading
      options.headers=headers
    }
    return options
  }
    
  

  constructor( private api:HttpClient) { }
  //login API - Asynchronous
  login(acno:any,pswd:any){
    const body={
      acno,
      pswd
    }
    return this.api.post('http://localhost:3000/login',body)

  }

   //register API - Asynchronous
   register(acno:any,pswd:any,uname:any){
    const body={
      acno,
      pswd,
      uname
    }
    return this.api.post('http://localhost:3000/register',body)

  }
  //transaction API - Asynchronous
  transaction(acno:any){
   
    return this.api.get('http://localhost:3000/transaction/'+acno,this.getToken())

  }
  //Delete Account API- Asynchronous
  deleteAcc(acno:any){
    return this.api.delete('http://localhost:3000/deleteAcc/'+acno,this.getToken())


  }
  
}
