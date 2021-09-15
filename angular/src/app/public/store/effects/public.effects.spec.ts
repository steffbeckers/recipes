import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PublicEffects } from './public.effects';

describe('PublicEffects', () => {
  let actions$: Observable<any>;
  let effects: PublicEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PublicEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
