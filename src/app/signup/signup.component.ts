///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { Usuario} from '../models/usuario';
import { UsuarioService} from '../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [UsuarioService]
})
export class SignupComponent implements OnInit {
    // Usuario creado al registrarse. Contiene los datos que se rellenan en el formulario de registros
    public usuario: Usuario;
    form;
    constructor() {
    }

    ngOnInit() {
        this.usuario = new Usuario()
        this.form = new FormGroup({

        })
    }


    submit(usuario: Usuario) {
        if (this.validarInputs() === true) {
            // Enviar datos al backend
        } else {
            // Desplegar errores en los campos correspondientes
        }
    }
    // Funcion que valida cada campo ingresado en el formulario de registro
    validarInputs(): boolean {
        // Validar e-mail

        return true;

    }

}
