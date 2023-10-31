const { defineConfig } = require('cypress');
const path = require('path');
const decompress = require('decompress');
const { removeDirectory } = require('cypress-delete-downloads-folder');
const AdmZip = require('adm-zip');

function unzipFolder(downloadsFolder, filename) {
  const zip = new AdmZip(filename);
  zip.extractAllTo(/*target path*/ downloadsFolder + "/unzip/", /*overwrite*/ true)
  return true;
}

const unzip = ({ path, file }) => decompress(path + file, path + 'unzip/' + file.replace('.zip', ''))

function validateZipFile(filename) {
  const zip = new AdmZip(filename);
  const zipEntries = zip.getEntries();
  const names = zipEntries.map((entry) => entry.entryName).sort();
  return names;
}

module.exports = defineConfig({
  'retries': {
    // Configure retry attempts for `cypress run`
    // Default is 0
    'runMode': 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    'openMode': 0
  },
  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  experimentalStudio: true,
  defaultCommandTimeout: 25000,
  requestTimeout: 25000,
  responseTimeout: 25000,
  redirectionLimit: 50,
  e2e: {
    baseUrl: 'https://cypress:test@cypress-ci-test.dev.lxlabs.co.uk/',
    setupNodeEvents(on, config) {
      on('task', {
        removeDirectory,
        unzip,
        validateZipFile: (filename) => {
          const downloadsFolder = config.downloadsFolder
          return validateZipFile(path.join(downloadsFolder, filename))
        },
        unzipFolder: (filename) => {
          const downloadsFolder = config.downloadsFolder
          return unzipFolder(downloadsFolder, path.join(downloadsFolder, filename))
        },
      })
    },
  },
});
