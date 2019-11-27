import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';


import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { DetailsCompanyComponent } from './details-company/details-company.component';
import { FormCompanyComponent } from './form-company/form-company.component';
import { SharedModule } from '../shared/shared.module';
import { ListCompaniesComponent } from './list-companies/list-companies.component';



@NgModule({
  declarations: [
    DashboardCompanyComponent,
    DetailsCompanyComponent,
    FormCompanyComponent,
    ListCompaniesComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }
