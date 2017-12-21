import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Usuario} from '../models/usuario';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
    public url: string;
    // public _http: Http;
    constructor(private _http: Http) {
        this.url = '';
    }

    // getUsuario() {
    //     return this._http.get(this.url).map(res => res.json());
    // }

    addUsuario(usuario: Usuario) {
        this.url = 'http://localhost:8000/api/registro';
        const json = JSON.stringify(usuario);
        const asd =  this._http.post(this.url, json )
            .map(
                res => res.json());
        console.log(asd);
        return asd;
    }

    findUsuario(usuario: Usuario) {
        this.url = 'http://localhost:8000/api/buscar';
        const json = JSON.stringify(usuario);
        const asd =  this._http.get(this.url, json )
            .map(
                res => res.json());
        console.log(JSON.stringify(asd));
        return asd;
    }

}
