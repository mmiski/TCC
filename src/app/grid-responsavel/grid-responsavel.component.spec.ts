import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridResponsavelComponent } from './grid-responsavel.component';

describe('GridResponsavelComponent', () => {
  let component: GridResponsavelComponent;
  let fixture: ComponentFixture<GridResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
