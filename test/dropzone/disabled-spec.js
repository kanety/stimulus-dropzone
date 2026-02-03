describe('disabled', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone">
        <input type="file" multiple disabled>
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
      { name: 'file1.txt', type: 'text/plain' }
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual([]);
  });
});
