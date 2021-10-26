import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { RecipesEffects } from './store/effects/recipes.effects';
import * as fromRecipes from './store/reducers/recipes.reducer';

@NgModule({
    declarations: [RecipesComponent, RecipeCreateComponent],
    imports: [
        SharedModule,
        RecipesRoutingModule,
        StoreModule.forFeature(fromRecipes.recipesFeatureKey, fromRecipes.reducer),
        EffectsModule.forFeature([RecipesEffects]),
    ],
})
export class RecipesModule {}
