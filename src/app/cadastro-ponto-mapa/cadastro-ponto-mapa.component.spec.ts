import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPontoMapaComponent } from './cadastro-ponto-mapa.component';

describe('CadastroPontoMapaComponent', () => {
  let component: CadastroPontoMapaComponent;
  let fixture: ComponentFixture<CadastroPontoMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPontoMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPontoMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
