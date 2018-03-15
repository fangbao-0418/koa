import Koa from 'koa'
import path from 'path'
import logger from './logs/log'
import router from './routers'
import error from 'koa-json-error'
import db from './db'
import views from 'koa-views'
import stylus from 'koa-stylus'
import serve from 'koa-static'
const app = new Koa();
app.keys = ['some secret hurr']
var session = require('koa-session')
const CONFIG = {
    key: 'koa:sess',
    maxAge: 5000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
}
app.use(session(CONFIG, app))
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))
// 日志
app.use(async (ctx, next) => {
  try {
    await next();
    logger.info(
      ctx.method + ' ' + ctx.url + ' RESPONSE: ' +  ctx.response.status
    )
  } catch (error) {}
})

// error
// app.on('error', (err, ctx) => {
//   console.log('xxx')
//   logger.info(err)
// });
let errorOptions = {
    postFormat: (e, obj) => {
        //Here's where we'll stick our error logger.
        logger.info(obj)
        if (process.env.NODE_ENV !== 'production') {
            return obj
        } else {
            delete obj.stack
            delete obj.name
            return obj
        }
    },
}
app.use(error(errorOptions))
app.use(router)
app.use(serve(path.join(__dirname, '../assets/dest')))
app.context.db = db
export default app;
