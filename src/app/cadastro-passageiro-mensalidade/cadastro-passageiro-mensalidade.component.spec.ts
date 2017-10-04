import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPassageiroMensalidadeComponent } from './cadastro-passageiro-mensalidade.component';

describe('CadastroPassageiroMensalidadeComponent', () => {
  let component: CadastroPassageiroMensalidadeComponent;
  let fixture: ComponentFixture<CadastroPassageiroMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPassageiroMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPassageiroMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
