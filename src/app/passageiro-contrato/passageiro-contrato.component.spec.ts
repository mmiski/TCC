import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageiroContratoComponent } from './passageiro-contrato.component';

describe('PassageiroContratoComponent', () => {
  let component: PassageiroContratoComponent;
  let fixture: ComponentFixture<PassageiroContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageiroContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageiroContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
