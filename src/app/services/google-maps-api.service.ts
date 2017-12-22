import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable} from "rxjs/Observable";

@Injectable()
export class GoogleMapsApiService {

  protected key = 'AIzaSyB6i3d65AgHPzp7vQklUaR6EIv6xBeHLtM';

  constructor(
      private http: Http
  ) { }

  getCoordinates(address: string) {
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
      let request = url+'address='+address+'&key='+this.key+'&sensor=false';
      //console.log(request)
      return this.http.get(request)
          .map(response => response.json());
  }

  private getHeaders(){
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      return headers;
  }

  getParkings(coordenadas){
      const url ='http://localhost:8000/buscar_local';
      let data = JSON.stringify(coordenadas);
      console.log(data);
      let headers = new Headers({'Content-Type': 'application/json'});
      let response = this.http.post(url, data, {headers: headers}).
      map(res => res.json());
      //console.log(res);
      return response;
  }

}
