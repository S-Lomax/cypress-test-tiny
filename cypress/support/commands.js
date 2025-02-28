// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-wait-until';
import { BrowserMultiFormatReader } from '@zxing/browser';
require('cypress-delete-downloads-folder').addCustomCommand();

const chaiSorted = require('chai-sorted');
chai.use(chaiSorted)

const reader = new BrowserMultiFormatReader();

Cypress.Commands.add('readCode', { prevSubject: true }, (subject) => {
  const img = subject[0];
  const image = new Image();
  image.width = img.width;
  image.height = img.height;
  image.src = img.src;
  image.crossOrigin = 'Anonymous';
  return reader.decodeFromImageElement(image);
});

const decompress = require('decompress');
const unzip = ({ path, file }) => decompress(path + file, path + 'unzip/' + file.replace('.zip', ''))

module.exports = (on, config) => {
    on('task', {
        'unzipping': unzip,
    })
}
