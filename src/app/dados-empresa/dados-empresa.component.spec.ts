import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEmpresaComponent } from './dados-empresa.component';

describe('DadosEmpresaComponent', () => {
  let component: DadosEmpresaComponent;
  let fixture: ComponentFixture<DadosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
