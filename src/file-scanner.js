export default class {
  constructor(options = {}) {
    this.options = options;
  }

  async scan(items) {
    const files = [];

    await Promise.all(
      Array.from(items).map(async item => {
        files.push(...await this.scanItem(item));
      })
    );

    return files;
  }

  async scanItem(item) {
    const files = [];

    if (item.kind === 'file') {
      if (item.webkitGetAsEntry) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          files.push(...await this.traverse(entry));
        }
      } else {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }

    return files;
  }

  async traverse(entry, path = '') {
    const files = [];
    if (entry.isFile) {
      const file = await this.getFile(entry);
      file.path = `${path}${file.name}`;
      files.push(file);
    } else if (entry.isDirectory && this.options.allowDirs) {
      const children = await this.readEntries(entry);
      for (const child of children) {
        files.push(...await this.traverse(child, `${path}${entry.name}/`));
      }
    }
    return files;
  }

  getFile(entry) {
    return new Promise((resolve, reject) => {
      entry.file(resolve, reject);
    });
  }

  readEntries(entry) {
    return new Promise((resolve, reject) => {
      const reader = entry.createReader();
      reader.readEntries(resolve, reject);
    });
  }
}
