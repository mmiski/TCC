import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVeiculoComponent } from './grid-veiculo.component';

describe('GridVeiculoComponent', () => {
  let component: GridVeiculoComponent;
  let fixture: ComponentFixture<GridVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
