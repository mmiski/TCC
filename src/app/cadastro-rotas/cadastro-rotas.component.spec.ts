import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRotasComponent } from './cadastro-rotas.component';

describe('CadastroRotasComponent', () => {
  let component: CadastroRotasComponent;
  let fixture: ComponentFixture<CadastroRotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
