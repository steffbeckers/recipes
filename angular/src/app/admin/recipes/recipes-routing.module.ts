import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    { path: '', component: RecipesComponent },
    { path: 'create', component: RecipeCreateComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
