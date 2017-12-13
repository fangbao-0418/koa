import Koa from 'koa';
import logger from './logs/log'
import userActionsRouter from './routers/userActions'
import error from 'koa-json-error'

const app = new Koa();

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

// 路由
app.use(userActionsRouter.routes())
app.use(userActionsRouter.allowedMethods())

export default app;
