import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
@Input() post:any[];
@Input() i;
@Input() isInput;

@Output() togChange= new EventEmitter();
@Output() nameChange= new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  togg(){
    this.togChange.emit();
  }

  editt(){
    this.nameChange.emit();
  }

}