import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dawe-google-maps',
  templateUrl: './dawe-google-maps.component.html',
  styleUrls: ['./dawe-google-maps.component.css']
})
export class DaweGoogleMapsComponent implements OnInit {

  title: string = 'AGM Map';
  @Input() mapOrigin = {lat: -23.6509279,lng: -70.39750219999999};
  @Input() marks;

  constructor() { }

  ngOnInit() {
  }

}
