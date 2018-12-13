const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

let msg = [];

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
  const body = ctx.request.body
  console.log(body);
  msg.push(JSON.stringify(body));
  ctx.body = arrToStr(msg);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
