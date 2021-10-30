import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

@NgModule({
    declarations: [CategoriesComponent, CategoryCreateComponent],
    imports: [SharedModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
