import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import * as fromCategories from './store';
import { CategoriesEffects } from './store/effects/categories.effects';

@NgModule({
    declarations: [CategoriesComponent, CategoryCreateComponent],
    imports: [
        SharedModule,
        CategoriesRoutingModule,
        StoreModule.forFeature(fromCategories.categoriesFeatureKey, fromCategories.reducer),
        EffectsModule.forFeature([CategoriesEffects]),
    ],
})
export class CategoriesModule {}
