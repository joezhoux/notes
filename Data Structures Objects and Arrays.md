# Data Structures: Objects and Arrays

## Array loops

有一个像这样的循环：

[JOURNAL]: https://eloquentjavascript.net/code/journal.js

```javascript
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}
```

这种循环在经典JavaScript中很常见-一次遍历数组一个元素的情况很多，要做到这一点，您需要在数组的长度上运行一个计数器，然后依次选择每个元素。

有一种更简单的方法可以在现代JavaScript中编写此类循环：

```javascript
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```

**数组循环方式**

```text
for > for-of > forEach > map > for-in（不建议对数组使用）
```

- for 循环最简单，因为没有任何额外的函数调用栈和上下文；
- for...of只要具有Iterator接口的数据结构，都可以使用它迭代成员。它直接读取的是键值。
- forEach要复杂一些，它实际上是array.forEach(function(currentValue, index, arr), thisValue)它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；
- map() 最慢，返回值是一个等长的全新的数组，数组创建和赋值产生的性能开销很大。
- for...in需要穷举对象的所有属性，包括自定义的添加的属性也能遍历到。且for...in的key是String类型，有转换过程，开销比较大。

## Further arrayology

数组提供了一种`indexOf`方法。该方法从头到尾搜索整个数组，并返回找到所请求值的索引；`lastIndexOf`则是从尾到头搜索整个数组，如果未找到，则返回-1。

```javascript
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(4));
// → -1
```

`slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）=>[begin,end)。原始数组不会被改变。

```javascript
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```

------

**赋值** **浅拷贝** **深拷贝**

**JavaScript变量包含两种不同数据类型的值：基本类型和引用类型**

基本类型（值传递）（存栈（stack））：number、string、boolean、null、undefined、symbol

引用类型（地址传递）（存堆（heap））：object

**赋值与浅拷贝** 

```javascript
let obj1 = {
  'name': 'zhangsan',
  'age': '18',
  'language': [1, [2, 3],[4, 5]]
};
//赋值
let obj2 = obj1; 

let shallowCopy = obj => {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
//浅拷贝
let obj3 = shallowCopy(obj1);

obj2.name = "lisi";
obj3.age = "20";
obj2.language[1] = ["二", "三"];
obj3.language[2] = ["四", "五"];

console.log(obj1);  
// →  obj1 = {
// →    'name': 'lisi',
// →    'age': '18',
// →    'language': [1, ["二", "三"],["四", "五"]]
// → };

console.log(obj2);  // → 赋值obj2与obj1指向堆（heap）中的同一对象（内存地址）
 // → obj2 = {
 // →   'name': 'lisi',
 // →   'age': '18',
 // →   'language': [1, ["二", "三"],["四", "五"]]
 // → };

console.log(obj3);  // → obj3外层浅拷贝obj1，子组件'language'为对象（内存地址）
 // → bj3 = {
 // →   'name': 'zhangsan',
 // →   'age': '20',
 // →   'language': [1, ["二", "三"],["四", "五"]]
 // → };
```

**深拷贝**

```javascript
let obj1 = {
  'name': 'zhangsan',
  'age': '18',
  'language': [1, [2, 3],[4, 5]]
};

let deepCopy = obj => {
  let objArray = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objArray[key] = deepCopy(obj[key]);
        } else {
          objArray[key] = obj[key];
        }
      }
    }
  }
  return objArray;
}

let obj2 = deepCopy(obj1);
obj2.language[1] = ["二", "三"];

console.log(obj1);
 // →obj1 = {
 // → 'name': 'zhangsan',
 // →  'age': '18',
 // →  'language': [1, [2, 3],[4, 5]]
 // →};

console.log(obj2);
 // →obj2 = {
 // →  'name': 'zhangsan',
 // →  'age': '18',
 // → 'language': [1, ["二", "三"],[4, 5]]
 // →};
```

------

### 数组方法改变原数组

1. *`Array.prototype.pop()`*

2. *`Array.prototype.push()`*

3. *`Array.prototype.shift()`*

4. *`Array.prototype.reverse()`*

5. *`Array.prototype.sort()`*

6. *`Array.prototype.splice()`*

7. *`Array.prototype.unshift()`*

   ## Rest parameters

   函数接受任意数量的参数可能很有用。例如，`Math.max`计算给定的*所有*参数的最大值。

   要编写这样的函数，请在函数的最后一个参数之前放置三个点，如下所示

```javascript
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
```

方括号数组表示法类似地允许三点运算符将另一个数组散布到新数组中

```javascript
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```

## JSON

JavaScript为我们提供了功能，`JSON.stringify`并`JSON.parse`可以在这种格式之间来回转换数据。第一个采用JavaScript值并返回JSON编码的字符串。第二个接收这样的字符串，并将其转换为它编码的值。

```javascript
let string = JSON.stringify({squirrel: false,
                             events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```

## Exercises

### The sum of a range

编写一个`range`函数，该函数接受两个参数`start`和`end`，并返回一个数组，其中包含从`start`直到（包括）的所有数字`end`

```javascript
const range = (star, end) => {
  const arr = [];
  while (star <= end) {
    arr.push(star);
    star += 1;
  }
  return arr;
};

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

编写一个`sum`函数，该函数接受一个数字数组并返回这些数字的总和。运行示例程序，看看它是否确实返回55。

```javascript
const sum = (arr) => {
  let sums = 0;
  for (let val of arr) {
    sums = sums + val;
  }
  return sums;
}
console.log(sum(range(1, 10)));
// → 55
```

修改`range`函数以采用可选的第三个参数，该参数指示构建数组时使用的“ step”值。如果未给出任何步骤，则元素将以1的增量递增，这与旧的行为相对应。函数调用`range(1, 10, 2)`应返回`[1, 3, 5, 7, 9]`。确保它也可以负量递减，从而`range(5, 2, -1)`产生`[5, 4, 3, 2]`。

```javascript
const range = (star, end, step = 1) => {
  const arr = [];
  if (step >= 0) {
    while (star <= end) {
      arr.push(star);
      star += step;
    }
    return arr.length == 0 ? "When step>=0,please ensure star<end" : arr;
  } else {
    while (star >= end) {
      arr.push(star);
      star += step;
    }
    return arr.length == 0 ? "When step<0,please ensure star>end" : arr;
  }
};

console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
```

### Reversing an array

数组具有`reverse`通过反转其元素出现顺序来更改数组的方法。在本练习中，编写两个函数，`reverseArray`和`reverseArrayInPlace`。第一个`reverseArray`以数组为参数，并产生一个*新*数组，该数组具有相反的顺序相同的元素。第二个，，`reverseArrayInPlace`执行`reverse`方法的作用：它通过反转其元素来*修改*作为参数给出的数组。都不可以使用标准`reverse`方法。

```javascript
const reverseArray = arr => {
  const reArray = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reArray.push(arr[i]);
  }
  return reArray;
}

const reverseArrayInPlace = arr => {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      //ES6数组的解构赋值
    [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
  }
  return arr;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];

console.log(arrayValue);
// → [5, 4, 3, 2, 1]
```

### A list

1. 编写一个函数`arrayToList`，以建立一个列表结构，就像`[1, 2, 3]`作为参数给出时所示的那样。
2. 编写一个`listToArray`从列表生成数组的函数。
3. 添加一个辅助函数`prepend`，该函数接受一个元素和一个列表，并创建一个新列表，将该元素添加到输入列表的最前面。
4. 函数`nth`接受一个列表和一个数字，并在列表中的给定位置返回元素（零表示第一个元素）或`undefined`没有此类元素时。
5. 请编写的递归版本`nth`。

```javascript
const arrayToList = arr => {
  let toList = null;
  for(let i = arr.length-1;i >=0;i--){
    toList = {value:arr[i],rest:toList};
  }
  return toList;
} 

const listToArray = toList => {
  let arr = [];
  for (let node = toList; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
};

const prepend = (val, list) => {
  let toList = {
    value: val,
    rest: list
  };
  return toList;
};

const nth = (list, listNode) => {
  let arr = listToArray(list);
  for (let node = list; node; node = node.rest) {
    if (node.value === arr[listNode]) {
      return nums = node.value;
    }
  }
};

//递归版nth
const nth = (list, listNode) => {
  if (!list) {
    return undefind;
  } else if (listNode == 0) {
    return list.value;
  } else {
    return nth(list.rest, listNode - 1);
  }
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```

### Deep comparison

```javascript
const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if ((typeof obj1 == "object" && obj1 != null) && (typeof obj2 == "object" && obj2 != null)) {
    if (Object.keys(obj1).length != Object.keys(obj2).length) return false;
    for (let prop in obj1) {
      if (obj2.hasOwnProperty(prop)) {
        return deepEqual(obj1[prop], obj2[prop]) ? true : false;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
};

let obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
// → true

console.log(deepEqual(obj, {here: 1, object: 2}));
// → false

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
```

