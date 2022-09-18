import { TestBed } from '@angular/core/testing';

import { FirebaseUploadsService } from './firebase-uploads.service';

describe('FirebaseUploadsService', () => {
  let service: FirebaseUploadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseUploadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
