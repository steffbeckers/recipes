import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
    declarations: [CategoriesComponent, CategoryCreateComponent, CategoryDetailComponent],
    imports: [SharedModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
