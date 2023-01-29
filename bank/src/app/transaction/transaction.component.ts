import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  acno:Number=0

  transactions:any =[]
  constructor(private apiService:ApiService){}
  ngOnInit(): void {
    if(localStorage.getItem("currentAcno")){
      this.acno = Number(localStorage.getItem("currentAcno"))
      console.log(this.acno);
      
    }
    this.apiService.transaction(this.acno)
    .subscribe((result:any)=>{
      this.transactions=result.transaction
      console.log(result);
      
    })
  }

}
