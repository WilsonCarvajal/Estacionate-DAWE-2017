///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService} from '../services/usuario.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [UsuarioService]
})
export class SignupComponent implements OnInit {
    usuario: Usuario; // Contiene los datos del usuario que se rellenan en el formulario de registro
    submitted = false; // True si el formulario ha sido enviado. Falso en caso contrario
    mensajeResultado; // String que reemplaza al formulario indicando si se realizó exitosamente el envío
                               // o si hubo un error.
    constructor() {
    }

    // Obtiene el objeto usuario y retorna sus datos como json
    get json() {
        return JSON.stringify(this.usuario);
    }
    // Inicialización del usuario vacío
    ngOnInit() {
        this.usuario = new Usuario();
    }

    processForm() {
        if (this.validarInputs() === true) {
            console.log(this.usuario);
            this.submitted = true;
            this.mensajeResultado = 'Cuenta creada exitosamente ☺';
            // Enviar datos al backend
        } else {
            this.mensajeResultado = '';
            // Desplegar errores en los campos correspondientes
        }
    }
    // Funcion que valida cada campo ingresado en el formulario de registro
    validarInputs(): boolean {
        // Validar e-mail

        return true;

    }

}
