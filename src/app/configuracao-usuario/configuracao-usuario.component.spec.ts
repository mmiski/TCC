import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoUsuarioComponent } from './configuracao-usuario.component';

describe('ConfiguracaoUsuarioComponent', () => {
  let component: ConfiguracaoUsuarioComponent;
  let fixture: ComponentFixture<ConfiguracaoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracaoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
