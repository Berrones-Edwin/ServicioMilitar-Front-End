import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCompanyComponent } from './dashboard-company/dashboard-company.component';
import { DetailsCompanyComponent } from './details-company/details-company.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardCompanyComponent,
    children: [
      { path: 'details/:id', component: DetailsCompanyComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
