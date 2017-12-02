import { Component, OnInit } from '@angular/core';
// import {UsuarioService} from "../services/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  constructor() { }

  ngOnInit() {
  }

  // registrarFacebook(){
  //   this.usuarioService.addUsuario().subscribe(
  //       response => {
  //         if (response.code === 200) {
  //           this._router.navigate(['/']);
  //         } else {
  //           console.log(response);
  //         }
  //       },
  //       error => {
  //         console.log(<any>error);
  //       }
  //   );
  // }
}
