import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { StoreModule } from '@ngrx/store';
import * as fromPublic from './store/reducers/public.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PublicEffects } from './store/effects/public.effects';


@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    StoreModule.forFeature(fromPublic.publicFeatureKey, fromPublic.reducer),
    EffectsModule.forFeature([PublicEffects])
  ]
})
export class PublicModule { }
