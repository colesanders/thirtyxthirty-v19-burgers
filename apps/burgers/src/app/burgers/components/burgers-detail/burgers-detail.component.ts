import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Burger } from '@thirty/api-interfaces';


@Component({
  selector: 'thirty-burgers-detail',
  templateUrl: './burgers-detail.component.html',
  styleUrls: ['./burgers-detail.component.scss']
})
export class BurgersDetailComponent implements OnInit, OnChanges{
  @Input() burger: Burger;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  burgerForm: FormGroup;

  pattyTypes = [
    {value: 'angus', display: 'Angus'},
    {value: 'vegan substitute', display: 'Vegan Substitute'},
    {value: 'chicken', display: 'Chicken'},
  ];

  cheeseTypes = [
    {value: 'pepper jack', display: 'Pepper Jack'},
    {value: 'cheddar', display: 'Cheddar'},
    {value: 'swiss', display: 'Swiss'},
    {value: 'none', display: 'None'}
  ];

  bunTypes = [
    {value: 'white', display: 'White'},
    {value: 'wheat', display: 'Wheat'},
    {value: 'lettuce', display: 'Lettuce'},
    {value: 'none', display: 'None'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.burgerForm && this.burger){
      this.burgerForm.patchValue(this.burger)
    } else if(this.burgerForm){
      this.cancel();
    }
  }

  cancel(){
    this.burgerForm.reset();
    this.burgerForm.value.toppings = ['Pickles', 'Ketchup'];
  }

  createFormGroup(){
    this.burgerForm = this.formBuilder.group({
      id: [],
      patty: new FormControl('', [
        Validators.required,
      ]),
      bun: new FormControl('', [
        Validators.required,
      ]),
      cheese: new FormControl('', [
        Validators.required,
      ]),
      toppings: new FormControl(['Pickles', 'Ketchup'], [
        
      ])
    })
  }
}
