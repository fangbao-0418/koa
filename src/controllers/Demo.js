export default class {
  constructor () {
    console.log('constructor')
  }
  tokens (ctx) {
    // ctx.body = 'authenticate'
    var jwt = require('jsonwebtoken');
    var cert = 'shhhhh'
    var token = jwt.sign({ foo: '22bar' }, cert);
    var obj = jwt.verify(token, cert)
    ctx.body = token + '/' + JSON.stringify(obj)
    // console.log(ctx, 'token')
  }
  session (ctx) {
    ctx.session.view = ctx.session.view || 0
    ctx.session.view += 1
    if (!ctx.ss) {
      ctx.ss = {
        a: 0
      }
    }
    ctx.ss.a = ctx.ss.a || 0
    ctx.ss.a += 1
    ctx.body = ctx.session.view + ' ' + ctx.ss.a
    console.log(ctx)
  }
  session2 (ctx) {
    ctx.body = ctx.session.view || 0
  }
  setcookie (ctx) {
    ctx.cookies.set('name', 'fangbao')
    // ctx.body = 'set cookie'
    ctx.throw(403, 'name required');
  }
  getcookie (ctx) {
    ctx.body = ctx.cookies.get('a') || 'no cookie'
  }
  async template (ctx) {
    console.log(ctx.render)
    // await ctx.body = 'ccc'
    await ctx.render('index', {a: 3, b: 3})
  }
}