import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AgmCoreModule} from "@agm/core";
import { AppRoutingModule } from './app.routing';
import { HttpModule} from "@angular/http";
import { CommonModule} from "@angular/common";

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './services/usuario.service';
import {GoogleMapsApiService} from "./services/google-maps-api.service";
import {BuscarEstacionamientoComponent} from "./components/buscar-estacionamiento/buscar-estacionamiento.component";
import {DaweGoogleMapsComponent} from "./components/dawe-google-maps/dawe-google-maps.component";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    BuscarEstacionamientoComponent,
    DaweGoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCowZ2DOJ2TZf2iZ3Xj_Pu1_T8QbJLnzIc'
    })
  ],
  providers: [GoogleMapsApiService, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
