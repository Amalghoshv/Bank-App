import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component'
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  //login
  {
    path:'',component:LogInComponent
   
  },
  //register
  {
    path:'register',component:RegisterComponent
  },
  //dashboard
  {
   path:'dash',component:DashComponent
  },
  //transaction
  {
    path:'transaction',component:TransactionComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
