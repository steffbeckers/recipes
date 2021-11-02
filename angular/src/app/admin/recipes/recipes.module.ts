import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryLookupModule } from '../categories/category-lookup/category-lookup.module';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
    declarations: [RecipesComponent, RecipeCreateComponent, RecipeDetailComponent],
    imports: [SharedModule, RecipesRoutingModule, CategoryLookupModule],
})
export class RecipesModule {}
