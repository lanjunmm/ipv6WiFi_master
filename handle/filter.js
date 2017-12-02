"use strict";
const type = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Date'];
const isType = {};
type.forEach(function (key) {
  isType[key] = function (obj) {
      return Object.prototype.toString.call(obj) === '[object ' + key + ']';
    };
});

function checkType(keys, props, obj) {
  let len = keys.length;
  while(len>0) {
    --len;
    let key = keys[len];
    if (isType[props[key].type]) {
      if (!isType[props[key].type](obj[key])) {
        return false
      }
    } else {
      if (typeof props[key] === 'string' && isType[props[key]]) {
        if (obj[key] && !isType[props[key]](obj[key])) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkRequired(keys, props, obj) {
  if (!Array.isArray(keys)) {
    throw new TypeError("type error: the keys is not correct");
  }
  if (!obj) {
    throw new Error("argument error: the argument can not null or undefined!");
  }
  for(let e of keys) {
    if (props[e].required && !obj[e] && obj[e] !== 0) {
      return false;
    }
  }
  return true;
}

function check(props, obj) {
  let keys = Object.keys(props);
  if (!checkType(keys, props, obj)) {
    console.log('type inspection did not pass!');
    return false;
  }
  if (!checkRequired(keys, props, obj)) {
    console.log('Required inspection did not pass!');
    return false;
  }
  return true;
}

function dataInitial(props, target, obj) {
  if (!(target && obj)) {
    throw new TypeError("referenceType error: target and obj!");
  }
  let keys = Object.keys(props);
  keys.forEach(function (key) {
    if (obj[key] !== undefined) {
      target[key] = obj[key];
    }
  });
  return true;
}

module.exports = {
  check,
  dataInitial,
};
