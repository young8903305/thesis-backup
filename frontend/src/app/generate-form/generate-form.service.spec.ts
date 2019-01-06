import { TestBed } from '@angular/core/testing';

import { GenerateFormService } from './generate-form.service';

describe('GenerateFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateFormService = TestBed.get(GenerateFormService);
    expect(service).toBeTruthy();
  });
});
