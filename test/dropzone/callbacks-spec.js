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
      { name: 'file1.txt', type: 'text/plain', size: 1 },
      { name: 'file2.txt', type: 'text/plain', size: 1 }
    ]));
  });

  it('drops files', () => {
    expect(messages).toEqual(['file1.txt', 'file2.txt']);
  });
});
