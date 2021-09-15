# Recipes

This is a startup project based on the ABP framework. For more information, visit <a href="https://abp.io/" target="_blank">abp.io</a>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Ran commands for NgRx

`npm install --save-dev @ngrx/schematics`
`npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools`
`ng generate @ngrx/schematics:store State --root --statePath store --module app.module.ts`
`ng generate @ngrx/schematics:effect store/App --root --module app.module.ts --group`
`ng generate @ngrx/schematics:feature public/store/Public --module public/public.module.ts --group`
`ng generate @ngrx/schematics:feature admin/store/Admin --module admin/admin.module.ts --group`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
