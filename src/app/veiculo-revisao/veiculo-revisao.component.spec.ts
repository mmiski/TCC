import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoRevisaoComponent } from './veiculo-revisao.component';

describe('VeiculoRevisaoComponent', () => {
  let component: VeiculoRevisaoComponent;
  let fixture: ComponentFixture<VeiculoRevisaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiculoRevisaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiculoRevisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
