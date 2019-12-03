import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-company',
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.css']
})
export class DashboardCompanyComponent implements OnInit {

  public url: string = "";
  constructor(
    private _router:Router
  ) { 
   
  }

  ngOnInit() {
    // this._router.events.subscribe((data)=>console.log(data))
    // console.log(this._router.url)
    // this.url = this._router.url;
    // console.log(this.url === '/companies/list')
  }

}
