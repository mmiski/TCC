import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageiroResponsavelComponent } from './passageiro-responsavel.component';

describe('PassageiroResponsavelComponent', () => {
  let component: PassageiroResponsavelComponent;
  let fixture: ComponentFixture<PassageiroResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageiroResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageiroResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
