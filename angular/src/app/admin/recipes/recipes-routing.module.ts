import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    { path: '', component: RecipesComponent },
    { path: 'create', component: RecipeCreateComponent },
    { path: ':id', component: RecipeDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
