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

