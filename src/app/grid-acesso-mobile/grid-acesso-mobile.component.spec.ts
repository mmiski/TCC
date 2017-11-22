import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAcessoMobileComponent } from './grid-acesso-mobile.component';

describe('GridAcessoMobileComponent', () => {
  let component: GridAcessoMobileComponent;
  let fixture: ComponentFixture<GridAcessoMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridAcessoMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAcessoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
