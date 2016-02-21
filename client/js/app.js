
/*Create an app instance*/
var app = new Booklet('app');

/*Generate a view instance*/
var bobsQuest = app.createView('bobsQuest');

/*Register a module for the view*/
bobsQuest.register('foundersList', function (bobsQuest) {
  return {
    init : function () {
      console.log('bobsQuest:init invoked.');
      this.bindEvents();
    },
    bindEvents : function () {
      console.log('bindEvents invoked.');
    }
  }
});
