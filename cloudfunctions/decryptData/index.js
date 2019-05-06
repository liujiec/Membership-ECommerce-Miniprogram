// 云函数入口文件
// 部署：在 cloud-functions/decryptData 文件夹右击选择 “上传并部署”
const cloud = require('wx-server-sdk')
const WXBizDataCrypt = require('./WXBizDataCrypt')
const requestSync = require('./requestSync')

// 初始化 cloud
cloud.init();

// 云函数入口函数
/**
 * 解密微信小程序敏感数据
 * 需要用npm安装crypto和request
 * @param {data} 需要解密的数据
 * {
 *    data:{
 *      js_code,
 *      encryptedData,
 *      iv
 *    }
 *  }
 * @return {object} 解密后的数据
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const code = event.js_code;
  const appid = wxContext.APPID;
  const encryptedData = event.encryptedData;
  const iv = event.iv;
  const secret = '299329509386e42c2502987ee98d4f36'

  const url = {
    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'
  }
  const req = await requestSync(url);
  const session = JSON.parse(req);
  const sessionKey = session.session_key;

  console.log("sessionKey-->" + sessionKey + "\r\n")
  console.log("appid-->" + appid + "\r\n")
  console.log("encryptedData-->" + encryptedData + "\r\n")
  console.log("iv-->" + iv + "\r\n")


  const pc = new WXBizDataCrypt(appid, sessionKey);
  const data = pc.decryptData(encryptedData, iv);
  return data;
}