var restler = require("restler-bluebird");
var co = require('co')

var res = {
    render: function(content) {
        console.dir(content);
    }
};


/*@RestController
public class TTT {
    @Autowoire UserServiceImpl  userService;

    @ReqeustMapping()
    puadsfaf getUser() {

    }
}*/

function* getBaidu(res) {
    "use strict";
   // var content = yield restler.get('http://localhost:8888/user/13800000001');
    res.render(content);
}

co(getBaidu(res));
