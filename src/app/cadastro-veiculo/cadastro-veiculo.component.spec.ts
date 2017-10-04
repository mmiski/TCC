import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVeiculoComponent } from './cadastro-veiculo.component';

describe('CadastroVeiculoComponent', () => {
  let component: CadastroVeiculoComponent;
  let fixture: ComponentFixture<CadastroVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
