import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as PublicActions from '../store/actions/public.actions';
import { selectPublicState } from '../store/selectors/public.selectors';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
    publicState$ = this.store.select(selectPublicState);
    
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(PublicActions.loadRecipes({ input: { maxResultCount: 10 } }))
    }
}
