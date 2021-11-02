import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { effects } from './store/effects/admin.effects';
import { reducers } from './store/reducers/admin.reducer';
import { adminFeatureKey } from './store/selectors/admin.selectors';

@NgModule({
    declarations: [AdminComponent],
    imports: [
        SharedModule,
        AdminRoutingModule,
        StoreModule.forFeature(adminFeatureKey, reducers),
        EffectsModule.forFeature(effects),
    ],
})
export class AdminModule {}
