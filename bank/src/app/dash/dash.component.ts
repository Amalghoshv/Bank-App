import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  //username 
  user:String="";
  acno:any
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    
  })
  withdrawForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    
  })
  constructor(private fb:FormBuilder,private router:Router,private api:ApiService){}

  ngOnInit(): void {
    if(localStorage.getItem("username")){
      this.user=localStorage.getItem("username") || ''
    }
    if(!localStorage.getItem("token")){
      alert("Please login First!")
       //redirect to login page
      this.router.navigateByUrl("")

    }
  }
  deposit(){
    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if(this.depositForm.valid){
      // //asynchronous
      this.api.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
        
      },
      // //if client error -4xx
      (result:any)=>{
        alert(result.error.message)

      }
      )
    }
    else{
      alert('Invalid Form!')
    }

  }
  withdraw(){
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount

    if(this.withdrawForm.valid){
      // //asynchronous
      this.api.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>{
        alert(result.message)
        
      },
      // //if client error -4xx
      (result:any)=>{
        alert(result.error.message)

      }
      )
    }
    else{
      alert('Invalid Form!')
    }

  }
  //logout
  logout(){
    //remove existing account details from localstorage
    localStorage.removeItem("username")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("token")

    //redirect to login page
    this.router.navigateByUrl("")

  }
  //delete - to display delete confirmation
  delete(){
    this.acno =localStorage.getItem("currentAcno")
  }
  cancel(){
    this.acno=""
  }
  onDelete(event:any){
    // alert('from parent : '+event)
    //make a call to service to delete perticular acno
    this.api.deleteAcc(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout()
    },
    result=>{
      alert(result.error.message)
    
    })
  }

}
