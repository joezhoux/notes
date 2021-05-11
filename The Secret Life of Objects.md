# The Secret Life of Objects

## Methods

通常，方法需要对调用它的对象做一些事情。当一个函数被称为方法时-被视为一个属性并立即被调用，例如`object.method()`-`this`在其主体中被调用的绑定会自动指向被调用的对象。

`this`可视为以其他方式传递的额外参数。如果要显式传递它，则可以使用函数的`call`方法，该方法将`this`值作为第一个参数，并将其他参数视为普通参数。

```javascript
function speak(line) {
  console.log(`The ${this.type} rabbit says "${line}"`);
};
let whiteRabbit = {
  type: "white",
  speak
};
let hungryRabbit = {
  type: "hungry",
  speak
};
//this 自动指向调用speak的对象whiteRabbit
whiteRabbit.speak("This is whiteRabbit");
//this 显示传递，即hungryRabbit
speak.call(hungryRabbit, "This is hungryRabbit");
```

**apply call bind**

`apply`与`call`只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

`apply`(`thisArg`,`argsArray`)，`argsArray`**一个数组或者类数组对象并将其中的数组元素将作为单独的参数传给 `func` 函数**。**立即使用**。

`call`(`thisArg`,`arg1`,`arg2`,...)。**立即使用。**

`bind`先创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，**供调用时使用**。

------

由于每个函数都有自己的`this`绑定，其值取决于调用方式，因此您不能在使用`function`关键字定义的常规函数中引用包装范围的`this`。

箭头函数是不同的-它们不绑定自己的`this`，但是可以看到它们周围范围的`this`绑定。因此，您可以执行类似以下代码的操作，该代码从本地函数内部进行引用：

```javascript
function normalize() {
  //箭头函数this指向外部this(this.coords)
  console.log(this.coords.map(n => n / this.length));
}
function normalize() {
  console.log(this.coords.map(function (n) {
    //this指向function，严格模式下this为undefined，非严格模式下在浏览器中this为window
    return n / this.length;
  }));
};
normalize.call({
  coords: [0, 2, 3],
  length: 5
});
```

## Prototypes

空值对象 `{}.__proto__ == Object.getPrototypeOf({})`原型为`Object.prototype`,

`Object.prototype`原型为`null`。

<img src="E:\notes\images\1620542625(1).jpg"  />

空数组`[].__proto__`原型为 `Array.prototype` ==>`Object.prototype`==>`null`。

函数`function(){}`原型为`Function.prototype` ==>`Object.prototype`==>`null`。

## Classes

为了和其他语言继承形态一致，JS提供了`class` 关键词用于模拟传统的`class` ，但底层实现机制依然是原型继承。

`class` 只是语法糖为了让类的声明与继承更加简洁清晰。

```javascript
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");
console.log(Object.getPrototypeOf(killerRabbit) == Rabbit.prototype);
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
```

## Maps

Map是一组键值对的结构，用于解决以往不能用对象做为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键或值

### 遍历数据

使用 `Object.keys()/values()/entries()` 都可以返回可遍历的迭代对象。

```js
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false
```

## Polymorphism

##### 多态与继承

**继承** 当对象中没使用的属性时，JS会从原型上获取这就是继承在JavaScript中的实现。

**多态** 根据多种不同的形态产生不同的结果，下而会根据不同形态的对象得到了不同的结果。

```js
class Rabbit {
  constructor() {}
  show() {
    console.log(this.description());
  }
}

class WhiteRabbit extends Rabbit {
  constructor() {
    //调用父类构造函数
    super()
  }
  description() {
    return "This is whiteRabbit";
  }
}

class BlackRabbit extends Rabbit {
  constructor() {
    //调用父类构造函数
    super()
  }
  description() {
    return "This is blackRabbit";;
  }
}
for (const obj of [new WhiteRabbit(), new BlackRabbit()]) {
  obj.show();
};
```

## Symbols

`Symbol`用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。

`Symbol `的值是唯一的，独一无二的不会重复的。

`Symbol` 声明和访问使用 `[]`（变量）形式操作。

```js
let symbol = Symbol("rabbit");
let obj = {
  [symbol]: "This is rabbit"
};
console.log(obj[symbol]);
```

## Getters, setters, and statics

- 使用访问器可以管控属性，有效的防止属性随意修改。
- 访问器就是在函数前加上 `get/set`修饰，操作属性时不需要加函数的扩号，直接用函数名。
- 一般来讲方法不需要对象属性参与计算就可以定义为静态方法，指通过类访问不能使用对象访问的方法。

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    //增加了访问器的管控属性if，有效防止无效输入  
    if (value == "xa") throw new Error("value no a number");
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
//实例对象可直接调用函数名，无需加()
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
//static方法对象实例temp不能直接访问
temp = Temperature.fromFahrenheit(86);
console.log(temp);
//由于设置了管控属性，则抛出异常信息
temp.fahrenheit = "xa";
```

## Exercises

### A vector type

写一个`Vec`代表二维空间中向量的类。它带有`x`和`y`参数（数字），应将其保存到相同名称的属性中。

给`Vec`原型提供两个方法，`plus`和`minus`，它们将另一个向量作为参数，并返回一个新向量，该向量具有两个向量（`this`和参数）的*x*和*y*值之和或差。

`length`在原型中添加一个getter属性，该属性可计算向量的长度，即点（*x*，*y*）与原点（0，0）的距离。

```javascript
class Vec {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  plus(obj){
    return new Vec(this.x+obj.x,this.y+obj.y);
  }
  minus(obj){
    return new Vec(this.x-obj.x,this.y-obj.y);
  }
  get length(){
    return Math.sqrt(this.x**2+this.y**2);
  }
};
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
```

### Groups

编写一个名为`Group`（因为`Set`已经采取了）的类。象`Set`，它有`add`，`delete`和`has`方法。它的构造函数创建一个空组，`add`向该组添加一个值（但仅当它还不是成员时），`delete`从该组中删除其参数（如果它是一个成员），并`has`返回一个布尔值，指示其参数是否为该组的成员。

使用`===`运算符或诸如之类的等效项`indexOf`来确定两个值是否相同。

为该类提供一个静态`from`方法，该方法采用一个可迭代的对象作为参数，并创建一个包含通过迭代产生的所有值的组。

```javascript
class Group {
  constructor() {
    this.arr = [];
  }
  add(val) {
    this.arr.push(val);
  }
  delete(val) {
    this.arr = this.arr.filter(el => el != val);
  }
  has(val) {
    return this.arr.includes(val);
  }
  static from(arr) {
    let group = new Group();
    for (let key of arr) {
      group.add(key);
    }
    return group;
  }
}
let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
```

### Iterable groups

使`Group`变得可迭代。

```javascript
class GroupIterator {
  constructor(group) {
    this.group = group;
    this.flag = 0;
  }
  next() {
    if (this.flag >= this.group.arr.length) return {
      done: true
    };
    let value = {
      value: this.group.arr[this.flag],
      done: false
    };
    this.flag++;
    return value;
  }
}
class Group {
  constructor() {
    this.arr = [];
  }
  add(val) {
    this.arr.push(val);
  }
  delete(val) {
    this.arr = this.arr.filter(el => el != val);
  }
  has(val) {
    return this.arr.includes(val);
  }
  static from(arr) {
    let group = new Group();
    for (let key of arr) {
      group.add(key);
    }
    return group;
  }
}
Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
}
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
```

### Borrowing a method

想一种方法来调用`hasOwnProperty`具有该名称自己的属性的对象。

```javascript
let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
console.log(Object.prototype.hasOwnProperty.call(map, "one");
// → true
```

