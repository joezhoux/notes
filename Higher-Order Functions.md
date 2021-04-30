# Higher-Order Functions

## Exercises

### Flattening

将该`reduce`方法与该`concat`方法结合使用，可以将数组的数组“展平”为具有原始数组的所有元素的单个数组。

```javascript
let arrays = [[1, 2, 3],[4, 5],[6]];

const flatten = (arr1, arr2) => arr1.concat(arr2);

console.log(arrays.reduce(flatten));
//→[1、2、3、4、5、6]
```

### Your own loop

编写一个`loop`提供类似于`for`循环语句的高阶函数。它需要一个值，一个测试函数，一个更新函数和一个主体函数。每次迭代时，它首先在当前循环值上运行测试函数，并在返回false时停止。然后，它调用body函数，并为其提供当前值。最后，它会调用update函数来创建一个新值，并从头开始。

定义函数时，可以使用常规循环进行实际的循环

```javascript
const loop = (val, test, updata, body) => {
  if(!test(val)) return false;
  body(val);
  return loop(updata(val), test, updata, body)
};

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
```

### Everything

实现`every`为以数组和谓词函数为参数的函数。编写两个版本，一个使用循环，一个使用`some`方法。

```javascript
const every = (array, test) => {
  for (let i = 0; i < array.length; i++) {
    if (!test(array[i])) {
      return false;
    }
  }
  return true;
};

const every = (array, test) => {
    //some() 取反！含有el>=10的数返回true，array取反！获取正确结果
  return !array.some(el => !test(el));
};

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
```

### Dominant writing direction

编写一个函数来计算文本字符串中的主要书写方向。请记住，每个脚本对象都有一个`direction`可以是`"ltr"`（从左到右），`"rtl"`（从右到左）或`"ttb"`（从上到下）的属性。

主导方向是具有与之相关联的脚本的大多数字符的方向。本章前面定义的`characterScript`和`countBy`函数在这里可能很有用。

[SCRIPTS]: https://eloquentjavascript.net/code/scripts.js	"数据源"

**characterScript**

```javascript
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}
//如果script中的ranges存在数组范围包含code的数组，则返回script
```

**countBy**

```javascript
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}
// [].name==undefined,counts=[{name:false,count:1}]
// 当name不一致时push新对象 counts=[{name:false,count:1},{name:true,count:1}]，一致count加1
// items为数据源，groupName为数据源的限制函数。函数返回符合限制的数据，每符合一次加一。
```

**dominantDirection**

```javascript
const dominantDirection = text => {
    //groupName获取script，重写后获取direction
  let counts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
      //判断每个char是否存在script
    return script ? script.direction : "none";
      //过滤值为"none"的script
  }).filter(({name}) => name != "none");
    
  if (counts.length == 0) return "no dominant direction"
    //返回次数最大的direction
  return counts.reduce((acc, cur) => acc.count > cur.count ? acc : cur).name;
};

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
```

