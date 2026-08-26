const Koa = require('koa');
const logger = require('./logger');

const app = new Koa();

// 中间件打印 path
app.use(async (ctx, next) => {
  const start = Date.now();
  // 打印请求路径
  logger.info('请求path: %s, 完整url: %s', ctx.path, ctx.url);
  try {
    await next();
  } catch (err) {
    logger.error('请求处理异常: %s', err.stack || err.message);
    ctx.status = err.status || 500;
    ctx.body = '服务器内部错误';
  }
  const duration = Date.now() - start;
  logger.info('请求完成 path=%s 状态=%d 耗时=%dms', ctx.path, ctx.status, duration);
});

// 路由
app.use(async ctx => {
  switch (ctx.path) {
    case '/':
      ctx.body = '首页';
      logger.info('访问首页');
      break;
    case '/user':
      ctx.body = '用户页 /user';
      logger.info('访问用户页');
      break;
    case '/about':
      ctx.body = '关于页 /about';
      logger.info('访问关于页');
      break;
    default:
      ctx.status = 404;
      ctx.body = '404 页面不存在';
      logger.warn('404 页面不存在: %s', ctx.path);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info('服务启动 http://127.0.0.1:%d', PORT);
});