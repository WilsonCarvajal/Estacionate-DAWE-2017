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
    mark = {lat : -23.6509279, lng : -70.39750219999999};

  constructor( private GoogleMapsApiService: GoogleMapsApiService) {

  }

  ngOnInit() {
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
          console.log(lat);
          console.log(lng);
          this.origin.lat = lat;
          this.origin.lng = lng;
      });
  }

}
