var express = require('express');
var router = express.Router();
var multer = require('multer');
var {
    connect,
    insert,
    find,
    ObjectId,
    update,
    del
} = require("../libs/mongo.js");
var token = require("../libs/token.js");
//登录
router.post('/login', async(req, res, next) => {
    // console.log(req.body);
    let {
        inputEmail,
        inputPassword
    } = req.body
    let data = await find(`login`, {
        email: inputEmail
    })
    console.log(data)
    try {
        if (data[0].password === inputPassword) {
            // res.send("success");
            res.send({
                status: "success",
                token: token.createToken({
                        inputEmail,
                        inputPassword
                    }, 120) //过期时间秒
            })
        } else {
            res.send({
                status: "fail"
            });
        }
    } catch {
        res.send("no-here");
    }
});
//自动登录
router.post('/autologin', async(req, res, next) => {

    res.send({
        status: token.checkToken(req.headers.token)
    })
})

//增删改查
router.post('/findMore', async(req, res, next) => {
    let {
        name,
        age,
        city
    } = req.body

    console.log(req.body)
    var item = "";
    for (var i in req.body) {
        item = i
    }
    if (item == "age") {
        let data = await find(`student`, {
            age
        });
        console.log(data)
        res.send(data);
    } else if (item == "name") {
        let data = await find(`student`, {
            name
        });
        console.log(data)
        res.send(data);
    } else if (item == "city") {
        let data = await find(`student`, {
            city
        });
        console.log(data)
        res.send(data);
    };

});
router.post('/findUser', async(req, res, next) => {
    let {
        name,
    } = req.body
    console.log(req.body)
    let data = await find(`student`, name ? {
        name
    } : {})
    console.log(data)
    res.send(data);
    // let data = await find(`student`, [
    //     name
    // ])
    // console.log(data)
    // res.send(data);
});
router.post('/insert', async(req, res, next) => {
    let {
        name,
        age,
        price,
        city
    } = req.body
    let ins = await insert(`student`, [{
        name,
        age,
        price,
        city
    }])

    res.send(ins);
});

router.post('/up', async(req, res, next) => {
    let {
        name,
        age,
        price,
        city
    } = req.body
    console.log(req.body)
    let ss = await update("student", {
        name
    }, {
        age,
        name,
        price,
        city
    });
    console.log(ss.toString())
    res.send(ss);
    // res.send(66666);
});




router.post('/del', async(req, res, next) => {
    let {

        name,
        city
    } = req.body
    console.log(req.body)
    for (var i in req.body) {
        item = i
    }
    if (item == "name") {
        let data = await del(`student`, {
            name
        });
        console.log(data)
        res.send(data);
    } else if (item == "city") {
        let data = await del(`student`, {
            city
        });
        console.log(data)
        res.send(data);
    }
    // let delt = await del("student", {
    //     name

    // });
    // console.log(delt)
    console.log(delt.toString())
    res.send(delt);
});
///
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function(req, file, cb) {
        console.log(1)
        cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function(req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
var upload = multer({
    storage: storage
});
/* GET users listing. */

router.post('/upload', upload.single('abc'), function(req, res, next) {
    console.log(req)
    res.json({
        status: "success",
        file: req.file
    });
});
module.exports = router;