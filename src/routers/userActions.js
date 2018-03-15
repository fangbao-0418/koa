import Router from 'koa-router'
import UserActionController from '../controllers/UserActionController'
import DemoController from '../controllers/Demo'
import MysqlController from '../controllers/Mysql'
const router = new Router()

const userActionController = new UserActionController()
const mysql = new MysqlController()
const demo = new DemoController()
const middleware = async function (ctx, next) {
  ctx.redirect('/')
  return next()
}
// router.use('/demo2', middleware)

router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hi there. ' +  process.env.npm_package_version}
})
router.get('/demo2/:type', async (ctx, next) => {
  ctx.body = ctx.params.type
})
router.get('/demo/token', async (ctx, next) => {
  await demo.tokens(ctx)
})

router.get('/demo/session', async (ctx, next) => {
  await demo.session(ctx)
})

router.get('/demo/session2', async (ctx, next) => {
  await demo.session2(ctx)
})

router.get('/demo/setcookie', async (ctx, next) => {
  await demo.setcookie(ctx)
})

router.get('/demo/getcookie', async (ctx, next) => {
  await demo.getcookie(ctx)
})

router.get('/demo/mysql', async (ctx, next) => {
  await mysql.demo1(ctx, next)
  // ctx.body = 'mysql'
})

// router.get('/demo/:id', async (ctx, next) => {
//   ctx.body = ctx.params.id
// })

router.get('/demo/template', async (ctx, next) => {
  await demo.template(ctx)
})
router.post('/api/v1/user/authenticate/', async (ctx, next) => {
  await userActionController.authenticate(ctx)
})
export default router
