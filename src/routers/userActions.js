import Router from 'koa-router'
import UserActionController from '../controllers/UserActionController'

const router = new Router()
const userActionController = new UserActionController()


router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hi there. ' +  process.env.npm_package_version}
})

router.post('/api/v1/user/authenticate/', async (ctx, next) => {
  await userActionController.authenticate(ctx)
})
export default router
