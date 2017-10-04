import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPassageiroComponent } from './grid-passageiro.component';

describe('GridPassageiroComponent', () => {
  let component: GridPassageiroComponent;
  let fixture: ComponentFixture<GridPassageiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPassageiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
