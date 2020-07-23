import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Burger } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-burgers-list',
  templateUrl: './burgers-list.component.html',
  styleUrls: ['./burgers-list.component.scss']
})
export class BurgersListComponent implements OnInit {
  @Input() burgers: [Burger];
  @Output() selected = new EventEmitter<Burger>();
  @Output() deleted = new EventEmitter<Burger>();
  constructor() { }

  ngOnInit(): void {
  }

}
