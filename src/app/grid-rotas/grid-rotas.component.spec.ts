import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRotasComponent } from './grid-rotas.component';

describe('GridRotasComponent', () => {
  let component: GridRotasComponent;
  let fixture: ComponentFixture<GridRotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
