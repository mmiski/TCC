import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageiroMensalidadeComponent } from './passageiro-mensalidade.component';

describe('PassageiroMensalidadeComponent', () => {
  let component: PassageiroMensalidadeComponent;
  let fixture: ComponentFixture<PassageiroMensalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageiroMensalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageiroMensalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
