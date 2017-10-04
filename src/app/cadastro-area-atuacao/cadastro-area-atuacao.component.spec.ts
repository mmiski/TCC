import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAreaAtuacaoComponent } from './cadastro-area-atuacao.component';

describe('CadastroAreaAtuacaoComponent', () => {
  let component: CadastroAreaAtuacaoComponent;
  let fixture: ComponentFixture<CadastroAreaAtuacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAreaAtuacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAreaAtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
