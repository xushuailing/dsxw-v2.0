// 带时间的本地存储获取
/* eslint-disable */
class Storage {
  constructor() {
    this.storage = window.localStorage;
    this.prefix = 'dsxw_';
  }

  set(key, value, fun) {
    let data = '';
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(value);
      } catch (e) {}
    }
    this.storage.setItem(this.prefix + key, data);
    typeof fun === 'function' && fun();
  }

  get(key, fun) {
    let value = this.storage.getItem(this.prefix + key);
    try {
      value = JSON.parse(value);
      if (value === null) value = null;
    } catch (e) {
      value = null;
    }
    return typeof fun === 'function' ? fun.call(this, value) : value;
  }
  setTime(key, value, fun) {
    let data = value;
    data.time = new Date().getTime();
    if (typeof value !== 'string') {
      try {
        data = JSON.stringify(data);
      } catch (e) {}
    }
    this.storage.setItem(this.prefix + key, data);
    typeof fun === 'function' && fun();
  }
  getTime(key, time, fun) {
    let value = null;
    let data = null;
    try {
      data = this.storage.getItem(this.prefix + key) || null; // 获取储存
      value = data ? JSON.parse(data) : {};
      if (!value.time) {
        console.error('获取的存储没有time字段!');
        return;
      }
      const now = new Date().getTime(); // 当前时间
      const H = time ? Number(time) * 3600000 : 24 * 3600000;

      if (Number(value.time) < now - H) {
        this.storage.removeItem(this.prefix + key);
        value = null;
      }
    } catch (e) {
      value = {};
    }
    return typeof fun === 'function' ? fun.call(this, value) : value;
  }
  remove(key) {
    this.storage.removeItem(this.prefix + key);
  }
}
// 获取url指定参数
const _GetUrlParam = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  return r ? decodeURIComponent(r[2]) : null;
};
const _LvType = function(num) {
  switch (Number(num)) {
    case 1:
      return '坚韧黑铁';
    case 2:
      return '顽强青铜';
    case 3:
      return '傲气白银';
    case 4:
      return '无暇钻石';
    case 5:
      return '倔匠王者';
    default:
      return '倔匠王者';
      break;
  }
};
const _arrEmpty = function(param, type) {
  var Arr = [];
  function isType(type) {
    var t = Object.prototype.toString.call(type);
    return t;
  }
  function empty(arr) {
    var r = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        r.push(arr[i]);
      }
    }
    return r;
  }
  if (param && isType(param) == '[object String]') {
    var str = param.split(type);
    Arr = empty(str);
  } else if (param && isType(param) == '[object Array]') {
    Arr = empty(param);
  }
  return Arr;
};
const _UpdateUserInfo = function(vue, id) {
  vue.$http
    .get(vue.$api.userInfo, {
      userid: id,
    })
    .then(res => {
      if (res.data.status === 1) {
        vue.$utils._Storage.set('userInfo', res.data);
      } else {
        vue.$vux.toast.show({
          text: res.data.msg,
          type: 'warn',
        });
      }
    })
    .catch(err => {
      vue.$vux.toast.show({
        text: `err__${err}`,
        type: 'warn',
      });
    });
};
export default {
  _Storage: new Storage(),
  _GetUrlParam,
  _arrEmpty,
  _LvType,
  _UpdateUserInfo,
};
