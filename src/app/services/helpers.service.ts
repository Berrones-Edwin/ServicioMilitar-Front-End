import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  createAlert(_icon: SweetAlertIcon, _title: string, _text: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: _icon,
      title: _title,
      text: _text
    })
  }

  showAlertResponse(data: boolean): Promise<SweetAlertResult> {
    console.log(data)
    let alert: any = null;
    if (data)
      alert = this.createAlert("success", 'Correcto!!', 'La nueva compañia se guardo correctamente')
    else
      alert = this.createAlert('error', 'Upps!!', 'Algo salio mal. Intentalo más tarde.')

    return alert;
  }
}
