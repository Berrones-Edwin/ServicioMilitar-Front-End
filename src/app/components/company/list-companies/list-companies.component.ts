import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit, OnDestroy {


  private unsubscribe$ = new Subject<void>();
  companies: any[] = [];
  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getAllCompanies().then((data: any[]) => {
      this.companies = data['data'];
    }).catch((err) => console.log(err));
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
