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
    let files = [{ name: 'file1.txt', type: 'text/plain', size: 1 }];
    document.dispatchEvent(createTransferEvent('dragenter', files));
    document.dispatchEvent(createTransferEvent('dragover', files));
    $('div').dispatchEvent(createTransferEvent('dragenter', files));
    $('div').dispatchEvent(createTransferEvent('dragover', files));
    expect($('div').matches('.st-dropzone--dragin')).toEqual(true);
    expect($('div').matches('.st-dropzone--dragover')).toEqual(true);

    $('div').dispatchEvent(createTransferEvent('dragleave', files));
    document.dispatchEvent(createTransferEvent('dragleave', files));
    jest.runAllTimers();
    expect($('div').matches('.st-dropzone--dragin')).toEqual(false);
    expect($('div').matches('.st-dropzone--dragover')).toEqual(false);
  });
});
