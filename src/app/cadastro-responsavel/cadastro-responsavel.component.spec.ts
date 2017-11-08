import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroResponsavelComponent } from './cadastro-responsavel.component';

describe('CadastroResponsavelComponent', () => {
  let component: CadastroResponsavelComponent;
  let fixture: ComponentFixture<CadastroResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
