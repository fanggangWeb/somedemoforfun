let checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    console.log(reg.test(value));
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
}
let checkaccount = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户名'));
  } else {
    const reg = /^[A-Za-z0-9]{4,40}$/
    console.log(reg.test(value));
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的用户名(由英文和数字组成)'));
    }
  }
}
let checkpassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'));
  } else {
    const reg = /^[A-Za-z0-9]{4,40}$/
    console.log(reg.test(value));
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的密码(由英文和数字组成)'));
    }
  }
}