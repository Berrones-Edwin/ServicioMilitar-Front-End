import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { DetailsCompanyComponent } from './details-company/details-company.component';
import { ListCompaniesComponent } from './list-companies/list-companies.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardCompanyComponent,
    children: [
      { path: 'list', component: ListCompaniesComponent },
      { path: 'details/:id', component: DetailsCompanyComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
