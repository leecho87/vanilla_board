(function () {
    'use strict';

    // M
    var Model = function () {
        this.data = {
            "1324": {
                title: '제목원',
                contents: '내용원',
                name: '이름원'
            }
        }
    }
    Model.prototype = {
        createData: function (data) {
            var randomKey = Math.round( Math.random()*1000 );
            this.data[randomKey] = {
                title : data.title,
                contents : data.contents,
                name : data.name
            };
        },
        updateData: function (key, data) {
            this.data[key] = {
                title : data.title,
                contents: data.contents,
                name : data.name
            };
        },
        deleteData: function (key) {
            delete this.data[key];
        },
        getData: function () {
            return this.data;
        }
    };

    var View = function (model) {
        this.model = model;
        this.init();
    }
    View.prototype = {
        init : function(){
            this.container = document.querySelector('#app');
            return this;
        },
        writeRender: function () {
            var template = function(){
                return `
                    <div class="container" id="PageWrite">
                    <form id="WriteForm">
                        <table>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                    <td><input type="text" name="name" placeholder="이름을 입력하세요" /></td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td><input type="text" name="title" placeholder="제목을 입력하세요" /></td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td><textarea name="contents" placeholder="내용을 입력하세요"></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="buttonBox">
                            <button type="button" id="write">작성</button>
                            <button type="button" id="list">목록</button>
                        </div>
                    </form>
                    </div>
                `
            };
            this.container.innerHTML = template();
        },
        createItem : function(data){
            var item = ``;
            if( !(JSON.stringify(data) === '{}') ){
                for(var key in data){
                    item += `<tr>`
                    item += `<td><a href="/" data-key="${key}">${data[key].title}</a></td>`
                    item += `<td><a href="/" data-key="${key}">${data[key].contents}</a></td>`
                    item += `<td>${data[key].name}</td>`
                    item += `</tr>`
                }
            }else{
                item += `<tr><td colspan="3">데이터가 없습니다.</td></tr>`;
            }
            return this.listRender(item);
        },
        listRender: function (item) {
            var template = function (item) {
                return `
                    <div class="container" id="PageList">
                        <table>
                            <colgroup>
                                <col width="auto">
                                <col width="auto">
                                <col width="15%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">제목</th>
                                    <th scope="col">내용</th>
                                    <th scope="col">이름</th>
                                </tr>
                            </thead>
                            <tbody id="ListRows">${item}</tbody>
                        </table>
                        <div class="buttonBox buttonBox--right">
                            <button id="regist">작성</button>
                        </div>
                    </div>
                `
            }
            this.container.innerHTML = template(item);
        },
        detailRender: function (key, data) {
            var template = function(){
                return `
                <form id="DetailForm">
                    <input type="hidden" name="dataKey" value="${key}"/>
                    <div class="container" id="PageDetail">
                        <table>
                            <colgroup>
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                                <col width="25%" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>제목</th>
                                    <td>${data[key].title}</td>
                                    <th>이름</th>
                                    <td>${data[key].name}</td>
                                </tr>
                                <tr>
                                    <th>내용</th>
                                    <td colspan="3">${data[key].contents}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="buttonBox">
                            <button type="button" id="modify">수정</button>
                            <button type="button" id="cancel">목록</button>
                            <button type="button" id="delete">삭제</button>
                        </div>
                    </div>
                </form>
                `
            }
            this.container.innerHTML = template();
        },
        modifyRender: function(key, data){
            var template = function(){
                return `
                <div class="container" id="PageUpdate">
                <form id="UpdateForm">
                    <input type="hidden" name="dataKey" value="${key}" />
                    <table>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td><input type="text" name="name" placeholder="이름을 입력하세요" value="${data.name}" /></td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td><input type="text" name="title" placeholder="제목을 입력하세요" value="${data.title}"/></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><textarea name="contents" placeholder="내용을 입력하세요">${data.contents}</textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="buttonBox">
                        <button type="button" id="update">업데이트</button>
                        <button type="button" id="cancel">취소</button>
                    </div>
                </form>
                </div>
                `
            }
            this.container.innerHTML = template();
        }
    }


    var Controller = function (model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }
    Controller.prototype = {
        init: function () {
            this.writeHandler();
        },
        writeHandler : function(){
            this.view.writeRender();
            this.view.container.querySelector('#write').addEventListener('click',this.validator.bind(this));
            this.view.container.querySelector('#list').addEventListener('click',this.listHandler.bind(this));
        },
        validator : function(e){
            e.preventDefault();
            var form = this.view.container.querySelector('form');
            var name = form.querySelector('[name=name]');
            var title = form.querySelector('[name=title]');
            var contents = form.querySelector('[name=contents]');
            var key = form.querySelector('[name=dataKey]');

            if(!name.value){
                alert('이름을 입력해주세요.');
                name.focus();
                return;
            }
            if(!title.value){
                alert('제목을 입력해주세요.');
                title.focus();
                return;
            }
            if(!contents.value){
                alert('내용을 입력해주세요.');
                contents.focus();
                return;
            }

            if(form.id === "WriteForm"){
                var data = {
                    title : title.value,
                    contents : contents.value,
                    name : name.value,
                };
                return this.createHandler(data);
            }else{
                var data = {
                    title : title.value,
                    contents : contents.value,
                    name : name.value
                }
                return this.updateHandler(key.value, data)
            }
        },
        createHandler : function(data){
            // 정보만들기
            this.model.createData(data);
            // 리스트 만드는 함수 호출
            this.listHandler(this.model.data);
        },
        listHandler : function(){
            // 리스트만들기
            this.view.createItem(this.model.data);
            // 이벤트부여
            var detailButton = this.view.container.querySelectorAll('a');
            var writeButton = this.view.container.querySelector('button');
            for(var i=0; i<detailButton.length; i++){
                detailButton[i].addEventListener('click', this.detailHandler.bind(this));
            }
            writeButton.addEventListener('click', this.writeHandler.bind(this));
        },
        detailHandler : function(e){
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
        modifyHandler : function(e){
            e.preventDefault();
            var useKey = this.view.container.querySelector('[name=dataKey]').value;
            var useData = this.model.data[useKey];
            this.view.modifyRender(useKey, useData);
            var updateButton = this.view.container.querySelector('#update');
            var listButton = this.view.container.querySelector('#cancel');
                updateButton.addEventListener('click', this.validator.bind(this));
                listButton.addEventListener('click', this.listHandler.bind(this));
        },
        updateHandler : function(key, data){
            this.model.updateData(key, data)
            this.listHandler();
        },
        deleteHandler : function(){
            var useKey = this.view.container.querySelector('[name=dataKey]').value;
            this.model.deleteData(useKey);
            this.listHandler();
        }
    }


    var model = new Model();
    var view = new View(model);
    var controller = new Controller(model, view);
})();