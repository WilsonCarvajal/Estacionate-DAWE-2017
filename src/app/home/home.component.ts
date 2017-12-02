import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../services/usuario.service";
import {Usuario} from "../models/Usuario";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    public idFacebook: string;
    public usuario: Usuario;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this.idFacebook = id;
            this.usuarioService.getUsuario(id).subscribe(
                response => {
                    if(response.code == 200){
                        alert('200')
                        this.usuario = response;
                    }else{
                        alert('error')
                        this._router.navigate(['ERROR']);
                    }
                },
                error => {
                    alert(error)
                    console.log(<any>error);
                }
            );

        });
    }
}
