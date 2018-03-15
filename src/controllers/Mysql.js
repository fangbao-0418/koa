export default class {
  queryAll (db) {
    return new Promise((resolve, reject) => {
      db.query('select * from shop2', (err, res) => {
        if (err) {
          reject(err)
        } else {
          // console.log(JSON.stringify(res))
          resolve(JSON.stringify(res))
          // resolve('xxx')
        }
      })
    })
  }
  async demo1 (ctx, next) {
    let s = {}
    try {
      s = await this.queryAll(ctx.db)
    } catch(e) {
      console.log(e, 'e')
      s = e
    }
    
    // console.log(s, 's')
    ctx.body = s
  }
}