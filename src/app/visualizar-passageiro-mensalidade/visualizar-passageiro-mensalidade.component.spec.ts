import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPassageiroMensalidadeComponent } from './visualizar-passageiro-mensalidade.component';

describe('VisualizarPassageiroMensalidadeComponent', () => {
  let component: VisualizarPassageiroMensalidadeComponent;
  let fixture: ComponentFixture<VisualizarPassageiroMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarPassageiroMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarPassageiroMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
