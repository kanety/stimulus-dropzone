# stimulus-dropzone

A stimulus controller for simple drop zone.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-dropzone --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import DropzoneController from '@kanety/stimulus-dropzone';

const application = Application.start();
application.register('dropzone', DropzoneController);
```

Import css:

```css
@import '@kanety/stimulus-dropzone';
```

Build html as follows:

```html
<div data-controller="dropzone">
  <input type="file">
  <p>Drop here</p>
</div>
```

Dropped files will be set in the input tag:

### options

#### grow-width, grow-heigth

Grow drop zone size while dragging:

```html
<div data-controller="dropzone"
     data-dropzone-grow-width-value="200px"
     data-dropzone-grow-height-value="300px">
  <input type="file">
  <p>Drop here</p>
</div>
```

### Callbacks

Run callbacks when files are dropped:

```javascript
let element = document.querySelector('[data-controller="dropzone"]');
element.addEventListener('dropzone:dropped', e => {
  // e.detail.files are dropped files
  console.log("dropped " + e.detail.files);
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
