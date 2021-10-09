import { Application } from '@hotwired/stimulus';
import DropzoneController from 'index';

const application = Application.start();
application.register('dropzone', DropzoneController);

jest.useFakeTimers();

describe('drag', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone">
        <p>Drop here</p>
      </div>
    `;
  });

  it('drag', () => {
    document.dispatchEvent(new CustomEvent('dragenter', { bubbles: true }));
    document.dispatchEvent(new CustomEvent('dragover', { bubbles: true }));
    $('div').dispatchEvent(new CustomEvent('dragenter', { bubbles: true }));
    $('div').dispatchEvent(new CustomEvent('dragover', { bubbles: true }));
    expect($('div').matches('.st-dropzone--dragin')).toEqual(true);
    expect($('div').matches('.st-dropzone--dragover')).toEqual(true);

    $('div').dispatchEvent(new CustomEvent('dragleave', { bubbles: true }));
    document.dispatchEvent(new CustomEvent('dragleave', { bubbles: true }));
    jest.runAllTimers();
    expect($('div').matches('.st-dropzone--dragin')).toEqual(false);
    expect($('div').matches('.st-dropzone--dragover')).toEqual(false);
  });
});
