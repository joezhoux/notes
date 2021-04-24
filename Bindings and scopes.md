## Bindings and scopes

`let`和`const`实际上在声明它们的***块中是局部的***，因此，如果您在循环内部创建了其中之一，则循环之前和之后的代码将无法“看到”它。在2015年前的JavaScript中，只有函数创建了新的作用域，因此使用`var`关键字创建的旧式绑定在它们出现的整个函数中（如果不在函数中）在整个作用域中都是可见的。

```javascript
let x = 10;
if (true) {
  let y = 20;// y在if(){y}中
  var z = 30;// z因var声明变量提升，全局可见
  console.log(x + y + z);
  // → 60
}
// y is not visible here
console.log(x + z);
// → 40
```

每个范围都可以“观察”周围的范围，因此`x`在示例中的块内可见。唯一的例外是多个绑定具有相同的名称-在这种情况下，代码只能看到最里面的一个。例如，当`halve`函数中的代码引用时`n`，它看到的是***自己的*** `n`，而不是全局的`n`

```javascript
const halve = function(n) {
  return n / 2;
};
let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
```

## Exercises

### Minimum

编写一个`min`接受两个参数并返回其最小值的函数。

```javascript
const min=(a,b)=>{
	if(a<b) return a;
  	else return b;
};
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
```

### Recursion

定义`isEven`与此描述相对应的递归函数。该函数应接受单个参数（正整数）并返回布尔值。

在50和75上对其进行测试。在-1上查看其行为。为什么？您能想到解决此问题的方法吗？

```javascript
const isEven = nums => {
  if (nums == 0) {
    return true;
  } else if (nums == 1) {
    return false;
  } else {
    nums = nums - 2;
    return nums < 0 ? "??" : isEven(nums);
  }
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ??
```

### Bean counting

编写一个函数`countBs`，该函数将字符串作为唯一参数，并返回一个数字，该数字指示字符串中有多少个大写的“ B”字符。

```javascript
const countBs = str => {
  let nums = 0
  for (let i = 0; i < str.length; i++) {
    str[i] == "B" ? nums += 1 : nums += 0;
  }
  return nums;
};
console.log(countBs("BBC"));
// → 2
```

接下来，编写一个`countChar`行为类似于的函数`countBs`，只是它需要第二个参数来指示要计数的字符（而不是仅计数大写的“ B”字符）。重写`countBs`以使用此新功能

```javascript
const countChar = (str, target) => {
  let nums = 0
  for (let i = 0; i < str.length; i++) {
    str[i] == target ? nums += 1 : nums += 0;
  }
  return nums;
};
console.log(countChar("kakkerlak", "k"));
// → 4
```

