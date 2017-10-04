import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPlanoMensalidadeComponent } from './grid-plano-mensalidade.component';

describe('GridPlanoMensalidadeComponent', () => {
  let component: GridPlanoMensalidadeComponent;
  let fixture: ComponentFixture<GridPlanoMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPlanoMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPlanoMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
