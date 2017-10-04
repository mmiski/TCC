import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMotoristaComponent } from './grid-motorista.component';

describe('GridMotoristaComponent', () => {
  let component: GridMotoristaComponent;
  let fixture: ComponentFixture<GridMotoristaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMotoristaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
