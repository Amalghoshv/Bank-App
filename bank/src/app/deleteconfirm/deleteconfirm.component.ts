import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-deleteconfirm',
  templateUrl: './deleteconfirm.component.html',
  styleUrls: ['./deleteconfirm.component.css']
})
export class DeleteconfirmComponent  implements OnInit{
  @Input() item:undefined

  @Output() onCancel =new EventEmitter()
  @Output() onDelete = new EventEmitter()
  constructor(){}

  ngOnInit(): void {
   
    
  }
  cancel(){
    this.onCancel.emit()
 }
 delete(){
  this.onDelete.emit(this.item)
 }
}
