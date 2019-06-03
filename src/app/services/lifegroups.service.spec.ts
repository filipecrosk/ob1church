import { TestBed } from '@angular/core/testing';

import { LifegroupsService } from './lifegroups.service';

describe('LifegroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LifegroupsService = TestBed.get(LifegroupsService);
    expect(service).toBeTruthy();
  });
});
