import { AuthGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'recipes',
                loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
            },
            {
                path: 'categories',
                loadChildren: () =>
                    import('./categories/categories.module').then(m => m.CategoriesModule),
            },
            {
                path: 'identity',
                loadChildren: () =>
                    import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
            },
            {
                path: 'tenant-management',
                loadChildren: () =>
                    import('@abp/ng.tenant-management').then(m =>
                        m.TenantManagementModule.forLazy()
                    ),
            },
            {
                path: 'setting-management',
                loadChildren: () =>
                    import('@abp/ng.setting-management').then(m =>
                        m.SettingManagementModule.forLazy()
                    ),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'recipes',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
