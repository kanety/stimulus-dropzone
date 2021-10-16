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
    document.dispatchEvent(new CustomEvent('dragenter', { bubbles: true }));
    document.dispatchEvent(new CustomEvent('dragover', { bubbles: true }));
    expect($('div').style.minWidth).toEqual('500px');
    expect($('div').style.minHeight).toEqual('1000px');

    document.dispatchEvent(new CustomEvent('dragleave', { bubbles: true }));
    jest.runAllTimers();
    expect($('div').style.minWidth).toEqual('');
    expect($('div').style.minHeight).toEqual('');
  });
});
