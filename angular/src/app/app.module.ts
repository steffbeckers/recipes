import { AccountConfigModule } from '@abp/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale, storeLocaleData } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp/ng.identity/config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp/ng.theme.basic';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';
import { metaReducers, reducers } from './store';
import { AppEffects } from './store/effects/app.effects';

import(
    /* webpackChunkName: "_locale-nl-js"*/
    /* webpackMode: "eager" */
    '@angular/common/locales/nl.js'
).then(m => storeLocaleData(m.default, 'nl'));

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule.forRoot({
            environment,
            registerLocaleFn: registerLocale(),
        }),
        ThemeSharedModule.forRoot(),
        AccountConfigModule.forRoot(),
        IdentityConfigModule.forRoot(),
        TenantManagementConfigModule.forRoot(),
        SettingManagementConfigModule.forRoot(),
        NgxsModule.forRoot(),
        ThemeBasicModule.forRoot(),
        StoreModule.forRoot(reducers, { metaReducers }),
        // !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreDevtoolsModule.instrument(),
        EffectsModule.forRoot([AppEffects]),
        StoreRouterConnectingModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [APP_ROUTE_PROVIDER],
    bootstrap: [AppComponent],
})
export class AppModule {}
