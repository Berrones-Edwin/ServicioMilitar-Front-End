import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllCompanies() {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.get(`${environment.url}company`, {
      headers: header
    });
  }
  getDetailCompany(id: string) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.get(`${environment.url}company/${id}`, {
      headers: header
    });
  }

  saveCompany(company: { number: string, mainActivity: string }) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post(`${environment.url}company`, company, { headers: header });
  }

  updateCompany(id: string, company: { number: string, mainActivity: string }) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.put(`${environment.url}company/${id}`, company, { headers: header });
  }

  deleteCompany(id: number) {
    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.delete(`${environment.url}company/${id}`, {
      headers: header
    });
  }
}
