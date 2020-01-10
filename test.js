function delLast1 (str, target) {
  var arr = str.split('')
  arr.splice(str.lastIndexOf(target), 1)
  return arr.join('')
}

// console.log(delLast1('abcdaec', 'a'))

function delLast2 (str, target) {
  let reg = new RegExp(`${target}(?=([^${target}]*)$)`)
  return str.replace(reg, '')
}
// console.log(delLast2('abcdaec', 'a'))

function delLast3 (str, target) {
  var index = str.lastIndexOf(target);
  return str.substring(0, index) + str.substring(index + 1, str.length);
}
// console.log(delLast3('abcdaec', 'a'))

function delLast4 (str, target) {
  return str.split('').reverse().join('').replace(target, '').split('').reverse().join('')
}
// console.log(delLast4('abcdaec', 'a'))
var list = [
  { id: '1', parentId: '0' },
  { id: '2', parentId: '1' },
  { id: '3', parentId: '1' },
  { id: '4', parentId: '2' },
  { id: '5', parentId: '0' }
]
function transformData (list) {
  var temp = {}
  var treeArr = [], treeObj = {};
  for (var i in list) {
    temp[list[i].id] = list[i]
  }
  for (var i in temp) {
    if (temp[i].parentId !== '0') {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = []
      }
      temp[temp[i].parentId].children.push(temp[i])
    } else {
      treeObj[temp[i].id] = temp[i]
    }
  }
  for (var i in treeObj) {
    treeArr.push(treeObj[i])
  }
  return {
    treeArr: treeArr,
    treeObj: treeObj,
    mapList: temp
  }
}

var treeData = transformData(list)
// console.log(JSON.stringify(treeData))

function transCamle1 (str) {
  var arr = str.split('_')
  return arr
    .map((item, i) => {
      return i == 0 ? item : item[0].toUpperCase() + item.substr(1)
    })
    .join('')
}
var data = transCamle1('hello_world_js')//helloWorldJs
// console.log(data)

function transCamle2 (str) {
  while (str.match(/\w_\w/)) {
    str = str.replace(/(\w)(_)(\w)/, (match, $1, $2, $3) => `${$1}${$3.toUpperCase()}`);
  }
  return str;
}
var data = transCamle2('hello_world_js')//helloWorldJs
// console.log(data)


function transCase1 (str) {
  return str.replace(/([a-z]*)([A-Z]*)/g, function (match, $1, $2) {
    return `${$1.toUpperCase()}${$2.toLowerCase()}`
  })
}
var data = transCase1('helloWorld')//HELLOwORLD
// console.log(data)

function transCase2 (str) {
  var arr = str.split('')
  return arr.map(item => {
    if (item.toLowerCase() == item) {
      item.toUpperCase();
    }
    if (item.toUpperCase() == item) {
      item.toLowerCase();
    }
    return item
  })
}
var data = transCase1('helloWorld')
// console.log(data)

// var str = `af
// adfa
// afdas
//   dfg`;
// var str = "af\tv";
// console.log(str.replace(/[\t\v\n]/g, ''))

function sumChat (str, target) {

}
var data = sumChat('abcdwe', 'a')
console.log(data)

