import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { HelpersService } from 'src/app/services/helpers.service';

// Interfaces
import { Company } from 'src/app/interfaces/company.interface';
import { NewCompanyResponse } from 'src/app/interfaces/newCompanyResponse.interface';
import { newCompanySaved } from 'src/app/interfaces/newCompanySaved.interface';
import { DeleteCompanyResponse } from 'src/app/interfaces/deleteCompanyResponse.interface';

// import * as $ from 'jquery';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject<void>();
  companies: any[] = [];
  loading: boolean = true;
  @ViewChild('closeButton', { static: false }) closeButton: ElementRef;

  constructor(
    private _companyService: CompanyService,
    private _helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.showAllCompanies();
  }

  private showAllCompanies() {
    this._getAllCompanies().then((data: any[]) => {
      if (data)
        this.loading = false;
      this.companies = data['data'];
    }).catch((err) => console.log(err));
  }

  saveNewCompany(event: newCompanySaved) {
    console.log(event);
    this._saveCompany(event).then((data: NewCompanyResponse) => {

      this._helpersService.showAlertResponse(data.success)
        .then(() => this.showAllCompanies())
        .then(() => this.closeButton.nativeElement.click())

    }).catch((err) => {
      this._helpersService
        .createAlert('error', 'Upps!!', 'Algo salio mal. Intentalo más tarde.')
    })

  }

  deleteCompany(id: number) {
    console.log(id);
    this._deleteCompany(id).then((data: DeleteCompanyResponse) => {

      this._helpersService.showAlertResponse(data.success)
        .then(() => this.showAllCompanies())

    }).catch(() => {

      this._helpersService
        .createAlert('error', 'Upps!!', 'Algo salio mal. Intentalo más tarde.')
    })

  }

  editCompany(c: Company) {
  }

  //----------------------------------------------
  //------------SERVICIOS-------------------------
  //----------------------------------------------

  _getAllCompanies() {
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
  _saveCompany(newcompany: newCompanySaved) {
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
  _deleteCompany(id: number) {
    return new Promise((resolve, reject) => {
      this._companyService.deleteCompany(id)
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
