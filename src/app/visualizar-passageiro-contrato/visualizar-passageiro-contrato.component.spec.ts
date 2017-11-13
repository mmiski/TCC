import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPassageiroContratoComponent } from './visualizar-passageiro-contrato.component';

describe('VisualizarPassageiroContratoComponent', () => {
  let component: VisualizarPassageiroContratoComponent;
  let fixture: ComponentFixture<VisualizarPassageiroContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPassageiroContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPassageiroContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
