import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPassageiroContratoComponent } from './cadastro-passageiro-contrato.component';

describe('CadastroPassageiroContratoComponent', () => {
  let component: CadastroPassageiroContratoComponent;
  let fixture: ComponentFixture<CadastroPassageiroContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPassageiroContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPassageiroContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
