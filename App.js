(function(){
    document.addEventListener('DOMContentLoaded', function(){
        var model = new Model();
        var view = new View(model);
        var controller = new Controller(model, view);
    })
})();