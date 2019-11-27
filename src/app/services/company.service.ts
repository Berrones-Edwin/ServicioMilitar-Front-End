import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllCompanies() {
    const header:HttpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json'
    });
    return this._http.get(`${environment.url}company`,{
      headers : header
    });
  }
}
