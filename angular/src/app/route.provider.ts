import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
    { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
    return () => {
        routesService.add([
            {
                path: '/admin/recipes',
                name: '::Menu:Recipes',
                order: 1,
                layout: eLayoutType.application,
            },
            {
                path: '/admin/categories',
                name: '::Menu:Categories',
                order: 2,
                layout: eLayoutType.application,
            },
        ]);

        // Update admin routes config
        routesService.patch('AbpIdentity::Roles', {
            path: '/admin/identity/roles',
        });
        routesService.patch('AbpIdentity::Users', {
            path: '/admin/identity/users',
        });
        routesService.patch('AbpTenantManagement::Tenants', {
            path: '/admin/tenant-management/tenants',
        });
        routesService.patch('AbpSettingManagement::Settings', {
            path: '/admin/setting-management',
        });
    };
}
