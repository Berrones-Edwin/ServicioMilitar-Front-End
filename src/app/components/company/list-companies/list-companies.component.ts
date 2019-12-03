import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { newCompany } from 'src/app/interfaces/newCompany.interface';
import { NewCompanyResponse } from 'src/app/interfaces/newCompanyResponse.interface';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject<void>();
  companies: any[] = [];
  loading: boolean = true;
  @ViewChild('modal', { static: false }) modal;

  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getAllCompanies().then((data: any[]) => {
      if (data) this.loading = false;
      this.companies = data['data'];
    }).catch((err) => console.log(err));
  }
  saveNewCompany(event: newCompany) {
    console.log(event);
    this.saveCompany(event).then((data: NewCompanyResponse) => {
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Incorrecto',
          text: 'No se pudo agregar.Intentalo más tarde',
        })
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Se agrego correctamente.',

      }).then(() => {
        this.getAllCompanies().then((data: any[]) => {
          if (data) this.loading = false;
          this.companies = data['data'];
          // this.modal.nativeElement.
        }).catch((err) => console.log(err));
      })
    }).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Incorrecto',
        text: 'No se pudo agregar.Intentalo más tarde',

      })
    })

  }

  getAllCompanies() {
    return new Promise((resolve, reject) => {
      this._companyService.getAllCompanies()
        .pipe(
          // map((data) => data['results']),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((data) => {
          if (data)
            resolve(data)
          else
            reject()
        }, err => reject(err))
    })
  }
  saveCompany(newcompany: newCompany) {
    return new Promise((resolve, reject) => {
      this._companyService.saveCompany(newcompany)
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
