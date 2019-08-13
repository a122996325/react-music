import { extend } from 'umi-request';

const request = extend({
  maxCache: 10, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个.
  prefix: 'https://api.ncm.guozhenshan.cn/', // prefix
  // suffix: '.json', // suffix
  errorHandler: (error: Error) => {
    // 集中处理错误
  },
  headers: {
    // 统一的headers
  },
  params: {
    // 每个请求都要带上的query参数
  }
});

// request拦截器, 改变url 或 options.
// request.interceptors.request.use((url:string, options:object|undefined) => {
//   return (
//     {
//       url: `${url}&interceptors=yes`,
//       options: { ...options, interceptors: true },
//     }
//   );
// });

// response拦截器, 处理response
// request.interceptors.response.use((response:Response, options: object|undefined) => {
//   response.headers.append('interceptors', 'yes yo');
//   return response;
// });

// 中间件，对请求前、响应后做处理
// request.use(async (ctx, next) => {
//   const { req } = ctx;
//   const { url, options } = req;
//   // 添加前缀、后缀
//   ctx.req.url = `/api/v1/${url}`;
//   ctx.req.options = {
//     ...options,
//     foo: 'foo'
//   };
//   await next();

//   const { res } = ctx;
//   const { success = false } = res;
//   if (!success) {
//     // Handle fail request here
//   }
// })

export default request;
