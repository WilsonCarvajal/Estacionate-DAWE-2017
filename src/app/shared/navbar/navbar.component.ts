import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/Usuario";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public usuario: Usuario;

    constructor(public location: Location, private element : ElementRef,private _router: Router,
                private _route: ActivatedRoute,
                private usuarioService: UsuarioService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (localStorage.getItem('usuario') != null){
            this.usuarioService.getUsuario(localStorage.getItem('usuario')).subscribe(
                response => {
                    if(response){
                        this.usuario = response;
                        this._router.navigate(['/'])
                    }else{
                        this._router.navigate(['ERROR']);
                    }
                },
                error => {
                    alert(error)
                    console.log(<any>error);
                }
            );
        }
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isLogin() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/login' ) {
            return true;
        }
        else {
            return false;
        }
    }

    salir(){
        this.usuario = null;
        this._router.navigate(['/'])
        localStorage.clear();
    }




}
