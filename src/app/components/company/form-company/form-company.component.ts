import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  forma: FormGroup;
  number:AbstractControl;
  mainActivity:AbstractControl;
  constructor() {
    this.forma = new FormGroup({
      'number': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'mainActivity': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.number = this.forma.controls['number']
    this.mainActivity = this.forma.controls['mainActivity'];
  }

  ngOnInit() {
  }

  GuardarCambios(){
    console.log(this.forma.value);
    
  }

}
