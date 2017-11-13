import { TestBed, inject } from '@angular/core/testing';

import { PassageiroContratoService } from './passageiro-contrato.service';

describe('PassageiroContratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassageiroContratoService]
    });
  });

  it('should be created', inject([PassageiroContratoService], (service: PassageiroContratoService) => {
    expect(service).toBeTruthy();
  }));
});
