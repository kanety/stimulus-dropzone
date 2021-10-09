import { Application } from '@hotwired/stimulus';
import DropzoneController from 'index';

const application = Application.start();
application.register('dropzone', DropzoneController);

describe('calbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone">
        <p>Drop here</p>
      </div>
    `;
  });

  let messages = [];
  beforeEach(() => {
    $('div').addEventListener('dropzone:dropped', e => {
      e.detail.files.forEach(file => messages.push(file.name));
    });

    let event = new CustomEvent('drop', { bubbles: true });
    event.dataTransfer = {
      files: [
        { name: 'file1.txt', type: 'text/plain', size: 1 },
        { name: 'file2.txt', type: 'text/plain', size: 1 }
      ]
    };
    $('div').dispatchEvent(event);
  });

  it('drops files', () => {
    expect(messages).toEqual(['file1.txt', 'file2.txt']);
  });
});
