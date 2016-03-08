
var fs = {
  data: {},

  read: function(path) {
    return this._fileInit(this._getFile(path)).data;
  },
  
  _fileInit: function(file) {
    if(file === undefined) 
      throw new Error('file not found');
    
    if(file.init) 
      return file;

    switch(file.type) {
      case 'text':
      case 'string':
        file.data = file.elem.innerHTML;
        break;
      case 'json':
        file.data = JSON.parse(file.elem.innerHTML);
        break;
      case 'html':
        var div = document.createElement('div');
        div.innerHTML = file.elem.innerHTML;
        file.data = div.childNodes;
        break;
      default:
        throw new Error('bad file type '+file.type);
    }
    
    file.init = true;
      
    return file;
  },
  _getFile: function(path) {
    if(this.data[path] === undefined)
      throw new Error('file '+path+' not found');
    
    return this.data[path];
  },
  loadData: function() {
    var elems = document.querySelectorAll('script[type="file"]');
    for(var i = 0; i < elems.length; i++) {
      var elem = elems[i];

      this.data[elem.dataset.path] = {init: false, elem: elem, data: null, type: elem.dataset.type};
    }
  }
  
};
(function() {
  fs.loadData();
});
