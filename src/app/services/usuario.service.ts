import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(public _http: Http) { }

  getUsuario(id) {
    return this._http.get('http://localhost:8000/api/buscar-facebook/'+id).map(res => res.json());
  }

  // iniciarSesionFacebook(){
  //   return this._http.get('http://localhost:8000/api/registrar-facebook',{headers: headers}).map(res => res.json());
  // }
}
