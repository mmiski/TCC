import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModeloContratoComponent } from './grid-modelo-contrato.component';

describe('GridModeloContratoComponent', () => {
  let component: GridModeloContratoComponent;
  let fixture: ComponentFixture<GridModeloContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridModeloContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridModeloContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
