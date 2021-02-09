const exec = require('child_process').exec;
var appList = process.argv.slice(3);
var command = process.argv[2];

const publishInLoop = (apps) => {
  for (let app of apps) {
    exec(
      `ng build ${app} --prod && cd dist/${app} && npm publish`,
      (err, stdout, stderr) => {
        if (stdout) {
          console.log('library published successfully', stdout);
        }
        if (err) {
          console.log('Library publish failed', err);
        }
        if (stderr) {
          console.log('errors:', stderr);
        }
      }
    );
  }
};

const publishApps = () => {
  if (appList.length) {
    publishInLoop(appList);
  } else {
    const angularJson = require('./angular.json');
    const libraries = Object.keys(angularJson.projects).filter(
      (key) => angularJson.projects[key].projectType === 'library'
    );
    publishInLoop(libraries);
  }
};

const unpublishApps = () => {
  exec(`npm unpublish @test21-core/${appList[0]}`, (err, stdout, stderr) => {
    if (stdout) {
      console.log('library unpublished successfully', stdout);
    }
    if (err) {
      console.log('Library unpublish failed', err);
    }
    if (stderr) {
      console.log('errors:', stderr);
    }
  });
};

const init = () => {
  switch (command) {
    case 'publish':
      publishApps();
      break;
    case 'unpublish':
      unpublishApps();
      break;
  }
};

init();
