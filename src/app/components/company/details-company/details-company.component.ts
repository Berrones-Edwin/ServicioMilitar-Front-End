import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-details-company',
  templateUrl: './details-company.component.html',
  styleUrls: ['./details-company.component.css']
})
export class DetailsCompanyComponent implements OnInit, OnDestroy {


  private unsuscribe$ = new Subject<void>();
  id: string = "";
  constructor(
    private _companyService: CompanyService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this._activatedRoute.snapshot.params['id'];
    if(this.id === undefined || this.id === null)
      return;
      
    this.getDetailsCompany(this.id)
      .then((data)=>{})
      .catch((err)=>{})
      

  }

  getDetailsCompany(id: string) {
    return new Promise((resolve, reject) => {
      this._companyService.getDetailCompany(id)
        .pipe(
          takeUntil(this.unsuscribe$)
        )
        .subscribe((data) => {
          if (data) resolve(data)
          else reject()
        },err=>reject(err))
    })
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }




}
