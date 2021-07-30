# Regular Expressions

## Creating a regular expression

```js
let re1 = new RegExp("abc");

//简写形式 规则写在 / /里面
let re2 = /abc/;
```

## Sets of characters

| `\d` | 表示所有数字                |
| :--- | --------------------------- |
| `\w` | 表示所有数字和字母          |
| `\s` | 表示空格、Tab空格、\n换行   |
| `\D` | 表示非数字                  |
| `\W` | 表示非数字和字母            |
| `\S` | 表示非空格、Tab空格、\n换行 |
| `.`  | 表示非\n换行                |

## Repeating parts of a pattern

要反转一组字符

```javascript
//在组[]里使用^表示取反，而不是以什么开始
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true

/'\d+'/ +表示一次或多次
/'\d*'/ *表示0次或多次
？表示0次或1次
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
console.log(neighbor.test("neighbouur"));
// → false

//{}表示范围{1,2} 1个或2个 {2} 只能使2个
// 只要匹配上了就输出true 
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("fdfrgrr343432341-30-2003 8:45"));
// → true
//因为满足匹配要求，确实存在1~2个数字，即范围匹配对于开头和结尾存在超出的部分不做检验
```

## Grouping subexpressions

使用多个*或者+需要使用 ( ) ，i代表字母不区分大小写。

```javascript
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```

## Matches and groups

```javascript
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

//当 /\d+/g 或者 /\d+/y，exec匹配返回的是有状态的对象，
//记录上次匹配成功后的位置，再次调用从上次位置lastIndex开始匹配.

//正则表达式对象具有属性。其中一个属性是 source，它包含创建表达式的字符串。另一个属性是 lastIndex，它在某些有限的情况下控制下一场比赛的开始位置。
//这些情况是正则表达式必须启用全局 (g) 或粘性 (y) 选项，并且匹配必须通过 exec 方法发生
let match = /\d+/g;
let a = match.exec("one two 100 fsfs 11");
let b = match.exec("one two 100 fsfs 11");
console.log(a);
// → ["100"]
console.log(b);
// → ["11"]

//整个匹配输出一次，括号 ( ) 里面输出一次，
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

let quotedText = /'(\w+)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

//当存在？时配上输出结果，为匹配上输出undefined
//+ 匹配完成后输出结果的最后一个位
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]

console.log(/bad(ly)?/.exec("badly"));
// → ["badly", "ly"]
console.log(/(\d)+/.exec("12345"));
// → ["12345", "5"]
```

## The Date class

JavaScript 使用一种约定，其中月份编号从零开始（因此十二月是 11），而日期编号从 1 开始。这是令人困惑和愚蠢的。小心。

```js
//年 月（11代表12月，月从0~11计算）日 时 分 秒 毫秒 
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

//时间从1970年开始计算的毫秒值
console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000

//使用负数可以输出1970年以前的年份
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

//解构赋值变量
function getDate(string) {
  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
```

## Word and string boundaries

```js
let animalCount = /^\d+ (pig|cow|chicken)s?$/;
console.log(animalCount.test("15 pigs"));
//  /d边界 等价与 ^以什么开头 $以什么结尾  |选择匹配 x|y|z 选其一

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
```

## The replace method

```js
//输出用变量$1~$9 代替第一个~第9个括号的匹配值，全局使用 $&
console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler


//接收函数
let stock = "1 lemon, 2 cabbages, and 101 eggs";
//match 为匹配的整个段，amount 为第一个匹配组，unit 为第二个匹配组
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit + " " + "|" + match + "|";
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon |1 lemon|, 1 cabbage |2 cabbages|, and 100 eggs |101 eggs|
```

## Greed

```javascript
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;

//[^]* (+,*,?,{})贪婪匹配/* a */+/* b */整个匹配项被替换成"" ,加号也被替换掉
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

//[^]*? (+?,*?,??,{}?)非贪婪匹配/* a */    /* b */
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1 + 1
```

## The lastIndex property

global 和sticky 选项的区别在于，启用sticky 时，只有直接从lastIndex 开始匹配才会成功，而使用global 时，它将提前搜索可以开始匹配的位置

```js
let global = /abc/g;
console.log(global.exec("xyz abc"));
// → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc"));
// → null

let sticky = /abc/y;
sticky.lastIndex = 4;
console.log(sticky.exec("xyz abc"));
// → ["abc"]
```

```javascript
非捕获分组
(?:匹配规则)  输出的数组里忽略?:所匹配上的数组子项
具名分组
(?<名字>)  给匹配上的数组子项添加命名
/xxx(xxx)xxx/ 输出数组 首项为全部匹配项，子项即1号下标放括号匹配的结果

零宽断言
正预测先行断言(?=foo)右边匹配foo
负预测先行断言(?!foo)右边不能匹配foo
正回顾后发断言(?<=foo)左边是foo
负回顾后发断言(?<!foo)左侧不能是foo

(?<=foo)(?=bar) 匹配左边是foo右边是bar

https://regex101.com/

  需要注意的是，零宽断言的匹配必须发生在断言位置的旁边，紧挨着断言位置
  多个断言可以连续断言同一个位置，即要求同一个位置满足多个不同的条件
  (?<!.) 等价于多行情况下的 ^, 匹配每行的开头：左边不能遇到除回车以外的任意符号
  (?<![^]) 等价于单行情况下的 ^，匹配字符串的开头：左边不能遇到任意符号
  (?!.) 等价于多行情况下的 $, 匹配每行的开头：右边不能遇到除回车以外的任意符号
  (?![^]) 等价于单行情况下的 $，匹配字符串的开头：右边不能遇到任意符号
  (?<=\w)(?!\w)|(?<!\w)(?=\w) 等价于 \b
```



## Exercises

### RegExp golf



