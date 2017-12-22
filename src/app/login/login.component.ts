import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {UsuarioService} from "../services/usuario.service";
import {Usuario} from "../models/Usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  test: Date = new Date();
  public usuario: Usuario;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
  }

}
