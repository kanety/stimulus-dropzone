import { Application } from '@hotwired/stimulus';
import DropzoneController from 'index';

const application = Application.start();
application.register('dropzone', DropzoneController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

global.createTransferEvent = function(type, files) {
  let event = new CustomEvent(type, { bubbles: true });
  event.dataTransfer = {
    files: files,
    types: ['Files'],
    items: files.map(f => {
      return { kind: 'file', type: f.type }
    })
  };
  return event;
}
