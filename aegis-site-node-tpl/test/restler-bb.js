var restler = require("restler-bluebird");
var co = require('co')

var res = {
    render: function(content) {
        console.dir(content);
    }
};

function* getBaidu(res) {
    "use strict";
    var content = yield restler.get('http://www.baidu.com');
    res.render(content);
}

co(getBaidu(res));
