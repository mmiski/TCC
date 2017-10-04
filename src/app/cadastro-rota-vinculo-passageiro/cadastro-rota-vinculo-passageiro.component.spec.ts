import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRotaVinculoPassageiroComponent } from './cadastro-rota-vinculo-passageiro.component';

describe('CadastroRotaVinculoPassageiroComponent', () => {
  let component: CadastroRotaVinculoPassageiroComponent;
  let fixture: ComponentFixture<CadastroRotaVinculoPassageiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRotaVinculoPassageiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRotaVinculoPassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
