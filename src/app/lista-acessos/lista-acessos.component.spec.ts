import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAcessosComponent } from './lista-acessos.component';

describe('ListaAcessosComponent', () => {
  let component: ListaAcessosComponent;
  let fixture: ComponentFixture<ListaAcessosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAcessosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
