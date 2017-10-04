import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaVinculoPassageiroComponent } from './rota-vinculo-passageiro.component';

describe('RotaVinculoPassageiroComponent', () => {
  let component: RotaVinculoPassageiroComponent;
  let fixture: ComponentFixture<RotaVinculoPassageiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaVinculoPassageiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaVinculoPassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
