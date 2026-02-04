import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import FileScanner from './file-scanner.js';
import './index.scss';

export default class extends Controller {
  static values = {
    growWidth: String,
    growHeight: String,
    allowDirs: Boolean
  }
  static actions = [
    ['element', 'dragenter->enter'],
    ['element', 'dragleave->leave'],
    ['element', 'drop->drop'],
    ['element', 'dragover@document->overDoc'],
    ['element', 'dragleave@document->leaveDoc'],
    ['element', 'drop@document->dropDoc']
  ];

  get input() {
    return this.scope.findElement('input[type=file]');
  }

  connect() {
    this.counter = 0;
  }

  enter(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.counter++;
    this.toggleClass(e.dataTransfer, true);
  }

  leave(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.counter--;
    if (this.counter === 0) this.toggleClass(e.dataTransfer, false);
  }

  async drop(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    const scanner = new FileScanner({ allowDirs: this.allowDirsValue });
    const files = await scanner.scan(e.dataTransfer.items);
    if (!this.isInputtable(files)) return;

    this.counter = 0;
    this.toggleClass(e.dataTransfer, false);

    const input = this.input;
    if (input) {
      const dt = this.createDataTransfer(files)
      input.files = dt.files;
      input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    }
    this.dispatch('dropped', { detail: { files: files } });
  }

  toggleClass(dataTransfer, dragover) {
    if (dragover && this.isDroppable(dataTransfer)) {
      this.element.classList.add('st-dropzone--dragover');
    } else {
      this.element.classList.remove('st-dropzone--dragover');
    }
  }

  overDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = true;
    this.dragin()
  }

  leaveDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = false;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!this.dragging) this.dragout();
    } , 200);
  }

  dropDoc(e) {
    e.preventDefault();
    if (!this.isDroppable(e.dataTransfer)) return;

    this.dragging = false;
    this.dragout();
  }

  dragin() {
    this.element.classList.add('st-dropzone--dragin');
    if (this.growWidthValue) {
      this.element.style.minWidth = this.growWidthValue;
    }
    if (this.growHeightValue) {
      this.element.style.minHeight = this.growHeightValue;
    }
  }

  dragout() {
    this.element.classList.remove('st-dropzone--dragin');
    if (this.growWidthValue) {
      this.element.style.minWidth = '';
    }
    if (this.growHeightValue) {
      this.element.style.minHeight = '';
    }
  }

  isDroppable(dataTransfer) {
    return dataTransfer.items.length && this.isInputtable(dataTransfer.items);
  }

  isInputtable(items) {
    const input = this.input;
    return !input || (!input.disabled && (input.hasAttribute('multiple') || items.length === 1));
  }

  createDataTransfer(files) {
    const dt = new DataTransfer();
    files.forEach(file => dt.items.add(file));
    return dt;
  }
}
