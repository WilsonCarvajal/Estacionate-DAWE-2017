import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaweGoogleMapsComponent } from './dawe-google-maps.component';

describe('DaweGoogleMapsComponent', () => {
  let component: DaweGoogleMapsComponent;
  let fixture: ComponentFixture<DaweGoogleMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaweGoogleMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaweGoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
