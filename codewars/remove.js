// 描述：
// 删除单词末尾的所有感叹号。单词在句子中用空格分隔。
// 例子
// remove("Hi!") === "Hi"
// remove("Hi!!!") === "Hi"
// remove("!Hi") === "!Hi"
// remove("!Hi!") === "!Hi"
// remove("Hi! Hi!") === "Hi Hi"
// remove("!!!Hi !!hi!!! !hi") === "!!!Hi !!hi !hi"

function remove(s){
  return s.replace(/(\!*)([a-z]+)(\!*)/gi, f)
}

function f(_, left, h, _right) {
  return left + h
}
