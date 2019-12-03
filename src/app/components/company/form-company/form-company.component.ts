import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

// Services
import { CompanyService } from 'src/app/services/company.service';
// Interfaces
import { newCompany } from 'src/app/interfaces/newCompany.interface';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit {


  forma: FormGroup;
  number: AbstractControl;
  mainActivity: AbstractControl;
  @Output() respuesta = new EventEmitter<newCompany>();
  newCompany: newCompany = {
    number: '',
    mainActivity: ''
  }

  constructor(
    private _companyService: CompanyService
  ) {
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
