import { TestBed } from '@angular/core/testing';

import { GetCardsNameService } from './get-cards-name.service';

describe('GetCardsNameService', () => {
  let service: GetCardsNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCardsNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
