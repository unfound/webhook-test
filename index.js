'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const url = require('url');

// const reqUrl = 'github.com';
let msg = [];
// 数组转成字符串
function arrToStr (arr) {
  let str = ''
  arr.forEach(item => {
    str += item + '\n'
  })
  return str
}

var app = new Koa();
var router = new Router({
  prefix: '/webhook'
});

router.use(bodyParser());
router.all('/', ctx => {
  console.log(url.parse(ctx.url, true));
  const body = ctx.request.body
  console.log(body);
  if (body && JSON.stringify(body) != '{}') {
    msg.push(JSON.stringify(body));
  }
  ctx.response.set('Content-Type', 'text/plain;charset=utf-8')
  ctx.body = arrToStr(msg);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
