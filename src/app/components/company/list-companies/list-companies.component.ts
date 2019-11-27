import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css']
})
export class ListCompaniesComponent implements OnInit {

  companies: any[] = [];
  constructor(
    private _companyService: CompanyService
  ) { }

  ngOnInit() {
     this.getAllCompanies().then((data:any[])=>{
      this.companies = data['data'];
    }).catch((err)=>console.log(err));
  }

  getAllCompanies() {
    return new Promise((resolve, reject) => {
      this._companyService.getAllCompanies()
        .subscribe((data) => {
          if (data)
            resolve(data)
          else
            reject()
        }, err => reject(err))
    })
  }

}
