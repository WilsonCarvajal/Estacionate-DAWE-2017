///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
///<reference path="../services/usuario.service.ts"/>
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuarioService} from '../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [UsuarioService]
})
export class SignupComponent implements OnInit {
    private _route: ActivatedRoute;
    private _router: Router;
    usuario: Usuario;  // Contiene los datos del usuario que se rellenan en el formulario de registro
    submitted = false; // True si el formulario ha sido enviado. Falso en caso contrario
    mensajeResultado;  // String que reemplaza al formulario indicando si se realizó el envío exitosamente o no
    constructor(private usuarioService: UsuarioService) {
    }

    // Obtiene el objeto usuario y retorna sus datos como json
    get json() {
        return JSON.stringify(this.usuario);
    }

    // Obtiene el objeto usuario y retorna sus datos como json
    getjsonUsuario() {
        return JSON.stringify(this.usuario);
    }

    // Inicialización del usuario vacío
    ngOnInit() {
        this.usuario = new Usuario();
        this.usuario.rut = null;
    }
    // Validación de campos e interacción con el backend al presionar el botón "Registrar"
    processForm() {
        this.submitted = true;
        if (this.validarUsuario() === true) {
            this.usuarioService.addUsuario(this.usuario).subscribe(
                response => {
                    if (response.code === 200) {
                        this._router.navigate(['/']);
                    } else {
                        console.log('respuesta: ' + response);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
            this.mensajeResultado = 'Cuenta creada exitosamente :)';
            // Enviar datos al backend
        } else {
            this.mensajeResultado = 'Algo inesperado ocurrió... por favor inténtelo de nuevo';
            // Desplegar errores en los campos correspondientes
        }
    }
    // Funcion que verifica si el usuario puede ser ingresado, validando si ya existe o no
    validarUsuario(): boolean {
        let found = false;
        this.usuarioService.findUsuario(this.usuario).subscribe(
            result => {
                console.log(result);
                if (result.code === 200) {
                    // this._router.navigate(['/']);
                    console.log('found ');
                    found = true;
                } else {
                    console.log('not found ');
                    found = false;
                }
            }
        );
        if (found) { // Si encuentra al usuario...
            this.mensajeResultado = 'El email ingresado ya existe';
            console.log(this.getjsonUsuario());
            return false;
        } else {
            console.log(this.getjsonUsuario());
            return true;
        }
    }

}
