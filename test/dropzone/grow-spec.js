jest.useFakeTimers();

describe('grow', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="dropzone"
           data-dropzone-grow-width-value="500px"
           data-dropzone-grow-height-value="1000px">
      <p>Drop here</p>
      </div>
    `;
  });

  it('grows zone', () => {
    let files = [{ name: 'file1.txt', type: 'text/plain', size: 1 }];
    document.dispatchEvent(createTransferEvent('dragenter', files));
    document.dispatchEvent(createTransferEvent('dragover', files));
    expect($('div').style.minWidth).toEqual('500px');
    expect($('div').style.minHeight).toEqual('1000px');

    document.dispatchEvent(createTransferEvent('dragleave', files));
    jest.runAllTimers();
    expect($('div').style.minWidth).toEqual('');
    expect($('div').style.minHeight).toEqual('');
  });
});
