const path = require('path');

module.exports = {
    entry : {
        app : ['./src/Model.js','./src/View.js','./src/Controller.js','./src/App.js']
        // app : ['./src/*.js']
    },
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    }
}