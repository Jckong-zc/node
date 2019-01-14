const express = require('express');
const bodyParser = require('body-parser');

//创建一个http服务器
const app = express();

//静态资源服务器   当前目录 ('./'))
//中间件  express.static   
app.use(express.static('./'));
//req前端给我的东西,res我给前端的东西
//路由
app.get('/', (req, res) => {
    res.send('首页')
})
app.get('/shoppingcart', (req, res) => {
    let cartlist = [{ id: 1, name: 'iponeXs', price: 8998 }, { id: 2, name: 'hongmi', price: 998 }];
    res.send(cartlist);
})
app.post('/shoppingcart', (req, res) => {
        res.send('shoppingcart post');
    })
    //列表
app.get('/list', (req, res) => {
        //req.query 查询参数
        let category = req.query.category;

        let goodslist;
        switch (category) {
            case 'phone':
                goodslist = [{ id: 1, name: 'iponeXs', price: 8998 }, { id: 2, name: 'hongmi', price: 998 }]
                break;
            case 'computer':
                goodslist = [{ id: 1, name: 'lenovo', price: 7998 }, { id: 2, name: 'hp', price: 3998 }]
                break;
            default:
                goodslist = [];
        }
        res.send(goodslist);
    })
    //详情页
    //  动态路由： 地址为变量 

//搜索功能

//POST请求
//如何获取参数
app.post('/cart', (req, res) => {
    res.send('shopping car post')
})

app.post('/login', bodyParser.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body)
        // res.send('login');

    // let content = "";
    // req.on('data', (chunk) => {
    //     content += chunk;
    //     console.log(chunk)
    // });
    // req.on('end', () => {
    //     console.log(content);
    //     res.send(content)
    // })
})


//监听端口
app.listen(3008, () => {
    console.log('server is running on http://localhost:3008');
})