import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Usuario} from '../models/usuario';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
    public url: string;
    constructor(public _http: Http) {
        this.url = 'localhost:8000/usuarios/registro';
    }

    // getUsuario() {
    //     return this._http.get(this.url).map(res => res.json());
    // }

    addUsuario(usuario: Usuario) {
        let json = JSON.stringify(usuario);
        return this._http.post(this.url, json )
            .map(
                res => res.json());
    }

}
