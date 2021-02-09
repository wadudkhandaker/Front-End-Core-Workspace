# Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Commands

1. npm login --scope=test21-core and enter credentials
2. npm run publish [library names]to publish the library
   a) if you give the library name explicitely, the specified library will be published. Be careful about the version number. Because existing version will not be published again.
   Example: npm run publish photo-uploader video-uploader
   b) if you don't give the library name, it will try to publish all the libraries in the libs/ecap-core folder
   Command: npm run publish
3. npm run unpublish [library name] to unpublish the library
   a) if you downgrade the library, use @version-name. Ex: npm run unpublish photo-uploader@1.0.3
   b) if you want to remove library from npm registry use -f. Ex: npm run unpublish photo-uploader -f
4. npm run generate to create a library. It will prompt to take two input: library name and type. library name is the name of the library and type can take one of the two things: app, component.
   Ex: npm run generate
   library name: video-uploader
   type(app, component): app

## Folder Structure

core-components - only components, no http call
core-apps - data source, number of combination of core-components
business-apps
core-services
