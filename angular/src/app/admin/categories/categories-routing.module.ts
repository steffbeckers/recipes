import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
    },
    {
        path: 'create',
        component: CategoryCreateComponent,
    },
    {
        path: ':id',
        component: CategoryDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoriesRoutingModule {}
