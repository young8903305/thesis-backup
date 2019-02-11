import { TestBed } from '@angular/core/testing';

import { AngularTreeService } from './angular-tree.service';

describe('AngularTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularTreeService = TestBed.get(AngularTreeService);
    expect(service).toBeTruthy();
  });
});
