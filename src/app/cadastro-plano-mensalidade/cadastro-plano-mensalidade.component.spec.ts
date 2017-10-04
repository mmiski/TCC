import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPlanoMensalidadeComponent } from './cadastro-plano-mensalidade.component';

describe('CadastroPlanoMensalidadeComponent', () => {
  let component: CadastroPlanoMensalidadeComponent;
  let fixture: ComponentFixture<CadastroPlanoMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPlanoMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPlanoMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
