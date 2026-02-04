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

    $('div').dispatchEvent(createTransferEvent('drop', [
      { kind: 'file', name: 'file1.txt', type: 'text/plain' },
      { kind: 'file', name: 'file2.txt', type: 'text/plain' }
    ]));
  });

  it('drops files', () => {
    expect(messages).toEqual(['file1.txt', 'file2.txt']);
  });
});
