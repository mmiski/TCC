import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaAcessoComponent } from './visualiza-acesso.component';

describe('VisualizaAcessoComponent', () => {
  let component: VisualizaAcessoComponent;
  let fixture: ComponentFixture<VisualizaAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizaAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
