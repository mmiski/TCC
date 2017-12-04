import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaMapaComponent } from './rota-mapa.component';

describe('RotaMapaComponent', () => {
  let component: RotaMapaComponent;
  let fixture: ComponentFixture<RotaMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
