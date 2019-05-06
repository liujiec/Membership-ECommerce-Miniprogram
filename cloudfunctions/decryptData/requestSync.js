/*
 *获取SessionKey 
 */
const request = require("request");

/*
 * 请求URL 
 * @param {url} 需要访问的URL
 * @return {object} 请求结果
 */
const requestSync = async (url) =>
  new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })
module.exports = requestSync