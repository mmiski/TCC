import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroModeloContratoComponent } from './cadastro-modelo-contrato.component';

describe('CadastroModeloContratoComponent', () => {
  let component: CadastroModeloContratoComponent;
  let fixture: ComponentFixture<CadastroModeloContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroModeloContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroModeloContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
