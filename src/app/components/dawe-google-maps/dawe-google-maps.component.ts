import {Component, Input, OnInit} from '@angular/core';
import {Local} from "../../models/local";

@Component({
  selector: 'app-dawe-google-maps',
  templateUrl: './dawe-google-maps.component.html',
  styleUrls: ['./dawe-google-maps.component.css']
})
export class DaweGoogleMapsComponent implements OnInit {

  title: string = 'AGM Map';
  @Input() mapOrigin = {lat: -23.6509279,lng: -70.39750219999999};
  @Input() marks;
  @Input() locales: Local[] = [];

  constructor() {
      let local = new Local();
      local.latitud = -22;
      local.longitud = -70;
      this.locales.push(local);
  }

  ngOnInit() {
      let local = new Local();
      local.latitud = -22;
      local.longitud = -70;
      this.locales.push(local);
  }

}
