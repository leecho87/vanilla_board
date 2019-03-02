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
        var randomKey = Math.round(Math.random() * 1000);
        this.data[randomKey] = {
            title: data.title,
            contents: data.contents,
            name: data.name
        };
    },
    updateData: function (key, data) {
        this.data[key] = {
            title: data.title,
            contents: data.contents,
            name: data.name
        };
    },
    deleteData: function (key) {
        delete this.data[key];
    },
    getData: function () {
        return this.data;
    }
};