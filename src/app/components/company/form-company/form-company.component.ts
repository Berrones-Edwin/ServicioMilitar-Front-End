import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName, AbstractControl } from "@angular/forms";
import { CompanyService } from 'src/app/services/company.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-company',
  templateUrl: './form-company.component.html',
  styleUrls: ['./form-company.component.css']
})
export class FormCompanyComponent implements OnInit,OnDestroy {
 

  forma: FormGroup;
  number: AbstractControl;
  mainActivity: AbstractControl;
  private unsubscribe$ = new Subject<void>();

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
    console.log(this.forma.value);
    this.saveCompany().then((data) => {

    }).catch((err) => {

    })


  }

  saveCompany() {
    return new Promise((resolve, reject) => {
      this._companyService.saveCompany(this.forma.value)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((data) => {
          if (data) resolve(data)
          else reject()
        }, err => reject(err))
    })
  }

  ngOnDestroy(): void {
   this.unsubscribe$.next();
   this.unsubscribe$.complete();
  }

}
