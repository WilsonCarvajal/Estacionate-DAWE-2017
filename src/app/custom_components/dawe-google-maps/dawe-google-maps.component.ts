import {Component, Input, OnInit} from '@angular/core';
import {Local} from "../../models/local";
import { GoogleMapsApiService } from "../../services/google-maps-api.service";

@Component({
  selector: 'app-dawe-google-maps',
  templateUrl: './dawe-google-maps.component.html',
  styleUrls: ['./dawe-google-maps.component.css']
})
export class DaweGoogleMapsComponent implements OnInit {

    title: string = 'AGM Map';
    @Input() mapOrigin = {lat: 0,lng: 0};
    @Input() marks;
    @Input() locales = [];
    @Input() mapZoom = 15;

    constructor(private GoogleMapsApiService: GoogleMapsApiService) {
        console.log(this.locales);
    }

    ngOnInit() {
      this.getParkings();
    }


    getParkings(){
        let coordenadas = {latitude: this.mapOrigin.lat, longitude: this.mapOrigin.lng};
        this.GoogleMapsApiService.getParkings(coordenadas).subscribe( response=>{
            //console.log(response);
            response.forEach((object) => {
                //console.log(object);
                let local = new Local();
                local.latitud = object['x'];
                local.longitud = object['y'];
                local.direccion = object['direccion'];
                local.nombre = object['nombre'];
                local.cantidadDisponible = object['cantidadDisponible'];
                this.locales.push(local);
                //console.log(this.parking_lots);
            });
        });
    }
}
