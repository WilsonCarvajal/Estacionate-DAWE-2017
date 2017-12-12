import { Component, OnInit } from '@angular/core';
import { GoogleMapsApiService } from "../../services/google-maps-api.service";
import { Local} from "../../models/local";

@Component({
  selector: 'app-buscar-estacionamiento',
  templateUrl: './buscar-estacionamiento.component.html',
  styleUrls: ['./buscar-estacionamiento.component.css']
})
export class BuscarEstacionamientoComponent implements OnInit {

    title: string = 'AGM Map';
    origin  = {lat : -23.6509279, lng : -70.39750219999999};
    parking_lots = [];

  constructor(private GoogleMapsApiService: GoogleMapsApiService) {

  }

  ngOnInit() {
      //this.getParkings();
  }

  getCoordinates(address){
      let replaced = address.replace(/\s/g, '+');
      console.log(replaced)
      let latLong = this.GoogleMapsApiService.getCoordinates(address).subscribe((response)=>{
          console.log(response);
      });

  }
  findParking(address){
      let replaced = address.replace(/\s/g, '+');
      //console.log(replaced)
      let latLong = this.GoogleMapsApiService.getCoordinates(address).subscribe((response)=>{
          let lat = response['results'][0]['geometry']['location']['lat'];
          let lng = response['results'][0]['geometry']['location']['lng'];
          //console.log(lat);
          //console.log(lng);
          this.origin.lat = lat;
          this.origin.lng = lng;
      });
  }

  getParkings(){
      let coordenadas = {latitude: this.origin.lat, longitude: this.origin.lng};
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
              this.parking_lots.push(local);
            //console.log(this.parking_lots);
          });
      });
  }

}
