import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelErrorComponent } from './label-error.component';

describe('LabelErrorComponent', () => {
  let component: LabelErrorComponent;
  let fixture: ComponentFixture<LabelErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
