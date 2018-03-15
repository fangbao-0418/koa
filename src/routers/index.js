import userActionsRouter from './userActions'

export default async (ctx, next) => {
  const app = ctx.app
  await app.use(userActionsRouter.routes())
  await app.use(userActionsRouter.allowedMethods())
  await next()
}