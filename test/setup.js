import { Application } from '@hotwired/stimulus';
import DropzoneController from 'index';

const application = Application.start();
application.register('dropzone', DropzoneController);

global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

global.DataTransfer = class {
  _items = [];

  get items() {
    return {
      length: this._items.length,
      add: (item) => {
        this._items.push(item);
      }
    };
  }

  get files() {
    return this._items.map(item => item);
  }
};

global.createTransferEvent = function(type, files) {
  const event = new CustomEvent(type, { bubbles: true });
  event.dataTransfer = {
    files: files,
    items: files.map(file => {
      return {
        kind: file.kind,
        type: file.type,
        getAsFile: function() {
          return file;
        }
      };
    })
  };
  return event;
}

global.createModernTransferEvent = function(type, files) {
  const event = new CustomEvent(type, { bubbles: true });
  event.dataTransfer = {
    files: files,
    items: files.map(file => {
      return {
        kind: file.kind,
        type: file.type,
        getAsFile: function() {
          return file;
        },
        webkitGetAsEntry: function() {
          return webkitGetAsEntry(file);
        }
      }
    })
  };
  return event;
}

function webkitGetAsEntry(file) {
  if (file.type === '') {
    return {
      name: file.name,
      isDirectory: true,
      createReader: function() {
        return {
          readEntries: function(callback) {
            return callback(file.entries.map(file => webkitGetAsEntry(file)));
          }
        };
      }
    };
  } else {
    return {
      name: file.name,
      isFile: true,
      file: function(callback) {
        callback(file)
      }
    };
  }
}
