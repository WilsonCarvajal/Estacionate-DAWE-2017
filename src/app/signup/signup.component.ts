///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Usuario} from '../models/usuario';
import {UsuarioService} from '../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [UsuarioService]
})
export class SignupComponent implements OnInit {
    public usuario: Usuario;

    constructor() {
    }

    ngOnInit() {
        this.usuario = new Usuario()
    }

    submit(usuario: Usuario, validacionPassword: String) {
        console.log(validacionPassword);
        if (usuario.contrasenia == validacionPassword) {
            console.log('Son iguales');
        } else {
            console.log('No son iguales');
        }
        console.log(usuario.email);
    }

}
