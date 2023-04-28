import { TestBed } from '@angular/core/testing';

import { AlaeldinShopServiceService } from './alaeldin-shop-service.service';

describe('AlaeldinShopServiceService', () => {
  let service: AlaeldinShopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlaeldinShopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
