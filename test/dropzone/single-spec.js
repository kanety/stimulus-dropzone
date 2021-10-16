describe('single', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone">
        <input type="file">
        <p>Drop here</p>
      </div>
    `;
  });

  let files = [];
  beforeEach(() => {
    Object.defineProperty($('input'), 'files', {
      set: (newFiles) => { files = newFiles; }
    });
    let event = new CustomEvent('drop', { bubbles: true });
    event.dataTransfer = {
      files: [
        { name: 'file1.txt', type: 'text/plain', size: 1 },
        { name: 'file2.txt', type: 'text/plain', size: 1 }
      ],
      items: [
        { kind: 'file', type: 'text/plain' },
        { kind: 'file', type: 'text/plain' }
      ]
    };
    $('div').dispatchEvent(event);
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual([]);
  });
});
