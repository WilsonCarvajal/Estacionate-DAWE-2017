import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarLocalesComponent } from './administrar-locales.component';

describe('AdministrarLocalesComponent', () => {
  let component: AdministrarLocalesComponent;
  let fixture: ComponentFixture<AdministrarLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
