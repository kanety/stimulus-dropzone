describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone">
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
    $('div').dispatchEvent(createTransferEvent('drop', [
      { name: 'file1.txt', type: 'text/plain', size: 1 },
      { name: 'file2.txt', type: 'text/plain', size: 1 }
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual(['file1.txt', 'file2.txt']);
  });
});
