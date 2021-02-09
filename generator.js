const exec = require('child_process').exec;
const { readFileSync, writeFileSync, unlinkSync } = require('fs');
const readline = require('readline');

const toPascalCase = (text) => {
  return text.replace(/(^\w|-\w)/g, (text) =>
    text.replace(/-/, '').toUpperCase()
  );
};

// update necessary settings in files and delete unnecessary files
const fileOperations = (app, path) => {
  const angularFile = JSON.parse(readFileSync('angular.json'));
  const lib = angularFile.projects[app];
  // remove tests in angular.json
  delete lib.architect.test;

  // update lint in angular.json
  const lint = {
    builder: '@angular-eslint/builder:lint',
    options: {
      lintFilePatterns: [
        `${path}/${app}/src/**/*.ts`,
        `${path}/${app}/src/**/*.html`
      ]
    }
  };
  lib.architect.lint = lint;
  writeFileSync('angular.json', JSON.stringify(angularFile, null, 2));

  // update package name in package.json in library
  const packageFile = JSON.parse(readFileSync(`${path}/${app}/package.json`));
  packageFile.name = `@test21-core/${app}`;
  writeFileSync(
    `${path}/${app}/package.json`,
    JSON.stringify(packageFile, null, 2)
  );

  // remove karma.conf.js and tslint.json from library
  unlinkSync(`${path}/${app}/tslint.json`);
  unlinkSync(`${path}/${app}/karma.conf.js`);

  // create index.ts file in library
  writeFileSync(`${path}/${app}/index.ts`, "export * from './src/public-api'");

  // generate html, scss files for the library
  writeFileSync(
    `${path}/${app}/src/lib/${app}.component.html`,
    `<p>${app} works!</p>`
  );
  writeFileSync(`${path}/${app}/src/lib/${app}.component.scss`, '');

  // generate ts file for the library
  const tsText = `import { Component, OnInit } from '@angular/core';
 
 @Component({
  selector: 'ecap-${app}',
  templateUrl: './${app}.component.html',
  styleUrls: ['./${app}.component.scss']
 })
 
 export class ${toPascalCase(app)}Component implements OnInit {
  title: string
  constructor() { }
 
  ngOnInit(): void {
    this.title = '${app}';
  }
 }
 `;
  writeFileSync(`${path}/${app}/src/lib/${app}.component.ts`, tsText);
  console.log(`${app} created successfully`);
};

// set angular.json newProjectRoot based on library types
const settingRootPath = (type) => {
  let path;
  if (type === 'app') {
    path = 'libs/core-apps';
  } else if (type === 'component') {
    path = 'libs/core-components';
  }
  const angular = JSON.parse(readFileSync('angular.json'));
  angular.newProjectRoot = path;

  writeFileSync('angular.json', JSON.stringify(angular, null, 2));
  return path;
};

// call angular cli to generate library
const callLibraryGenerateCommand = (app, path) => {
  exec(
    `ng g library ${app} --prefix=ecap --skip-ts-config=true`,
    (err, stdout, stderr) => {
      if (stdout) {
        console.log(stdout);
      }
      if (err) {
        console.log(err);
      }
      if (stderr) {
        console.log(stderr);
        fileOperations(app, path);
      }
    }
  );
};

// generate the library
const generateLibrary = (app, type) => {
  const path = settingRootPath(type);
  callLibraryGenerateCommand(app, path);
};

const inputFromUser = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('library name: ', (name) => {
      rl.question('type (app, component): ', (type) => {
        rl.close();
        resolve({ name, type });
      });
    });
  });
};

//  take necessary inputs and generate library
const init = async () => {
  const { name, type } = await inputFromUser();
  generateLibrary(name, type);
};

init();
