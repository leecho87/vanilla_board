var View = function (model) {
    this.model = model;
    this.init();
}
View.prototype = {
    init: function () {
        this.container = document.querySelector('#app');
        return this;
    },
    writeRender: function () {
        var template = function () {
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
                        <!--<button type="button" id="write">작성</button>
                        <button type="button" id="list">목록</button>-->
                        <a href="#submit">글등록</a>
                        <a href="#list">목록보기</a>
                    </div>
                </form>
                </div>
            `
        };
        this.container.innerHTML = template();
    },
    createItem: function (data) {
        var item = ``;
        if (!(JSON.stringify(data) === '{}')) {
            for (var key in data) {
                item += `<tr>`
                item += `<td><a href="/" data-key="${key}">${data[key].title}</a></td>`
                item += `<td><a href="/" data-key="${key}">${data[key].contents}</a></td>`
                item += `<td>${data[key].name}</td>`
                item += `</tr>`
            }
        } else {
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
                        <!--<button id="regist">작성</button>-->
                        <a href="/#write">작성하기</a>
                    </div>
                </div>
            `
        }
        this.container.innerHTML = template(item);
    },
    detailRender: function (key, data) {
        var template = function () {
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
    modifyRender: function (key, data) {
        var template = function () {
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