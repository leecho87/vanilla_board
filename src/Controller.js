var Controller = function (model, view) {
    this.model = model;
    this.view = view;
    this.router();
    window.addEventListener('hashchange', this.router.bind(this))
}
Controller.prototype = {
    router : function(){
        var regExpHash = /\#\w+/;
        var regExpKey = /\d+/;
        var hash = (location.hash.length <= 0) ? '' : regExpHash.exec(location.hash)[0].replace('#','');
        var key = (!location.hash.match(/\?key/)) ? '' : regExpKey.exec(location.hash)[0]

        switch(hash){
            case '' :
                this.listHandler();
                break;
            case 'list' :
                this.listHandler();
                break;
            case 'write' :
                this.writeHandler();
                break;
            case 'detail' :
                this.detailHandler(key);
                break;
            case 'modify' :
                this.modifyHandler(key);
                break;
            default :
                alert('페이지가 올바르지 않습니다.');
                this.listHandler();
        }
        // if(!hash || hash === 'list'){
        //     this.listHandler();
        // }else if(hash === 'write'){
        //     this.writeHandler();
        // }else if(hash === 'detail'){
        //     this.detailHandler(key);
        // }else if(hash === 'modify'){
        //     this.modifyHandler(key)
        // }
    },
    getKey : function(){
        var key = location.hash.match(/\d+/);
        return key;
    },
    writeHandler: function () {
        this.view.writeRender();
        this.view.container.querySelector('form').addEventListener('submit', this.validator.bind(this))
    },
    validator: function (e) {
        e.preventDefault();
        var form = this.view.container.querySelector('form');
        var name = form.querySelector('[name=name]');
        var title = form.querySelector('[name=title]');
        var contents = form.querySelector('[name=contents]');
        var key = form.querySelector('[name=dataKey]');

        if (!name.value) {
            alert('이름을 입력해주세요.');
            name.focus();
            return false;
        }
        if (!title.value) {
            alert('제목을 입력해주세요.');
            title.focus();
            return false;
        }
        if (!contents.value) {
            alert('내용을 입력해주세요.');
            contents.focus();
            return false;
        }

        if (form.id === "WriteForm") {
            var data = {
                title: title.value,
                contents: contents.value,
                name: name.value,
            };
            return this.createHandler(data);
        } else {
            var data = {
                title: title.value,
                contents: contents.value,
                name: name.value
            }
            return this.updateHandler(key.value, data)
        }
    },
    createHandler: function (data) {
        // 정보만들기
        this.model.createData(data);
        // 리스트 만드는 함수 호출
        this.listHandler();
    },
    listHandler: function () {
        // 리스트만들기
        this.view.createItem(this.model.data);
        location.hash = '#list';
    },
    detailHandler: function (key) {
        this.view.detailRender(key, this.model.data);
        this.view.container.querySelector('#delete').addEventListener('click', this.deleteHandler.bind(this));
    },
    modifyHandler: function (key) {
        this.view.modifyRender(key, this.model.data[key]);
        this.view.container.querySelector('#update').addEventListener('click', this.validator.bind(this));
    },
    updateHandler: function (key, data) {
        this.model.updateData(key, data)
        this.listHandler();
    },
    deleteHandler: function () {
        var useKey = this.view.container.querySelector('[name=dataKey]').value;
        this.model.deleteData(useKey);
        this.listHandler();
    }
}