import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

// Services
import { CompanyService } from 'src/app/services/company.service';
import { newCompanySaved } from 'src/app/interfaces/newCompanySaved.interface';
import { Company } from 'src/app/interfaces/company.interface';
// Interfaces


@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {

  @Output() respuesta = new EventEmitter<newCompanySaved>();
  @Input() company:Company 

  forma: FormGroup;
  number: AbstractControl;
  mainActivity: AbstractControl;
  newCompany: newCompanySaved = {
    number: '',
    mainActivity: ''
  }

  constructor(
    private _companyService: CompanyService
  ) {
    console.log(this.company)
    
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

  GuardarCambios() {
    this.newCompany = this.forma.value;
    this.respuesta.emit(this.newCompany);

  }



}
