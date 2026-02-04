describe('allow-dirs', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone"
           data-dropzone-allow-dirs-value="true">
        <input type="file" multiple>
        <p>Drop here</p>
      </div>
    `;
  });

  let files = [];
  beforeEach(() => {
    Object.defineProperty($('input'), 'files', {
      set: (newFiles) => { files = newFiles; }
    });
    $('div').dispatchEvent(createModernTransferEvent('drop', [
      { kind: 'file', name: 'file1.txt', type: 'text/plain' },
      { kind: 'file', name: 'directory', type: '', entries: [
          { kind: 'file', name: 'file2.txt', type: 'text/plain' },
          { kind: 'file', name: 'file3.txt', type: 'text/plain' }
      ] },
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
    expect(files.map(file => file.path)).toEqual(['file1.txt', 'directory/file2.txt', 'directory/file3.txt']);
  });
});
