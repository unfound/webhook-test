'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const deploy = require('./deploy');
const records = require('./records');

const CMD = 'sh ./deploy.sh';

// 数组转成字符串
function arrToStr (arr) {
  let str = '';
  arr.forEach(item => {
    str += JSON.stringify(item) + '\n';
  })
  return str;
}
// 验证是否为空对象
function isEmpty (obj) {
  if (obj && JSON.stringify(obj) !== '{}') return true;
  return false; 
}

var app = new Koa();
var router = new Router({
  prefix: '/webhook'
});

router.use(bodyParser());
router.get('/', ctx => {
  let body = records.getData();
  ctx.response.set('Content-Type', 'text/plain;charset=utf-8');
  ctx.body = arrToStr(body);
});
router.get('/:num', ctx => {
  let body = records.getData();
  if (ctx.params.num) {
    const num = ctx.params.num > body.length ? body.length : ctx.params.num;
    body.reverse().splice(0, num);
  }
  ctx.response.set('Content-Type', 'text/plain;charset=utf-8');
  ctx.body = arrToStr(body);
});
router.post('/', ctx => {
  const body = ctx.request.body;
  if (!isEmpty(body) || !body.repository || body.repository.url.indexOf('github.com') === -1) return;
  const currentBranch = body.ref.split('/')[2];
  const masterBranch = body.repository.master_branch;
  if (currentBranch !== masterBranch) return;
  const repName = body.repository.name;
  console.log(repName + '更新啦！');
  records.setData(body);
  deploy(CMD, () => { console.log('------CMD ERROR !------') });
  ctx.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => { console.log('Webhook service is listening at 3000 port !') });
