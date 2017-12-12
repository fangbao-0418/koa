// require('babel-register');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const koaBody = require('koa-body');
const auth = require('koa-basic-auth');
// x-response-time


app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(koaBody());
// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});
router.get('/detail/:id', detail)

app.use(router.routes());

async function detail(ctx) {
  console.log(ctx.params.id)
  ctx.body = 'detail' + ctx.params.id;
}

// response


app.use(async function(ctx, next) {
  console.log(next)
  try {
    await next();
  } catch (err) {
    console.log(err)
    if (err.status === 401) {
      ctx.status = 401;
      ctx.set('WWW-Authenticate', 'Basic');
      ctx.body = 'cant haz that';
    } else {
      throw err;
    }
  }
});
app.use(auth({ name: 'tj', pass: '123' }));
app.use(async function(ctx) {
  ctx.body = 'secret';
});

app.listen(3000);
