import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RecipesEffects } from './recipes.effects';

describe('RecipesEffects', () => {
  let actions$: Observable<any>;
  let effects: RecipesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RecipesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
