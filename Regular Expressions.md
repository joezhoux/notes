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

## The mechanics of matching

