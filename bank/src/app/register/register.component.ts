import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    
  })
  constructor(private fb:FormBuilder,private api:ApiService,private router:Router){}
  ngOnInit(): void {
    
  }
  register(){
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd
    var uname = this.registerForm.value.uname

    if(this.registerForm.valid){
      //asynchronous
      this.api.register(acno,pswd,uname)
      .subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl("")
      },
      //if client error -4xx
      (result:any)=>{
        alert(result.error.message)

      }
      )
    }
    else{
      alert('Invalid Form!')
    }

  }


}
