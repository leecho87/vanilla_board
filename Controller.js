var Controller = function (model, view) {
    this.model = model;
    this.view = view;
    this.init();
}
Controller.prototype = {
    init: function () {
        this.writeHandler();
    },
    writeHandler: function () {
        this.view.writeRender();
        this.view.container.querySelector('#write').addEventListener('click', this.validator.bind(this));
        this.view.container.querySelector('#list').addEventListener('click', this.listHandler.bind(this));
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
            return;
        }
        if (!title.value) {
            alert('제목을 입력해주세요.');
            title.focus();
            return;
        }
        if (!contents.value) {
            alert('내용을 입력해주세요.');
            contents.focus();
            return;
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
        this.listHandler(this.model.data);
    },
    listHandler: function () {
        // 리스트만들기
        this.view.createItem(this.model.data);
        // 이벤트부여
        var detailButton = this.view.container.querySelectorAll('a');
        var writeButton = this.view.container.querySelector('button');
        for (var i = 0; i < detailButton.length; i++) {
            detailButton[i].addEventListener('click', this.detailHandler.bind(this));
        }
        writeButton.addEventListener('click', this.writeHandler.bind(this));
    },
    detailHandler: function (e) {
        e.preventDefault();
        // key값, 정보 넘기기
        this.view.detailRender(e.target.dataset.key, this.model.data);

        // 이벤트부여
        var modifyButton = this.view.container.querySelector('#modify');
        var listButton = this.view.container.querySelector('#cancel');
        var deleteButton = this.view.container.querySelector('#delete');
        modifyButton.addEventListener('click', this.modifyHandler.bind(this));
        listButton.addEventListener('click', this.listHandler.bind(this));
        deleteButton.addEventListener('click', this.deleteHandler.bind(this));
    },
    modifyHandler: function (e) {
        e.preventDefault();
        var useKey = this.view.container.querySelector('[name=dataKey]').value;
        var useData = this.model.data[useKey];
        this.view.modifyRender(useKey, useData);
        var updateButton = this.view.container.querySelector('#update');
        var listButton = this.view.container.querySelector('#cancel');
        updateButton.addEventListener('click', this.validator.bind(this));
        listButton.addEventListener('click', this.listHandler.bind(this));
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