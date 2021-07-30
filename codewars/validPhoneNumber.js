// 编写一个函数，它接受一个字符串，如果它是电话号码的形式，则返回 true。
// 假设任何点中 0-9 的任何整数都将产生有效的电话号码。
// 只需担心以下格式：
// (123) 456-7890（不要忘记右括号后的空格）
// 示例：
// "(123) 456-7890"  => true
// "(1111)555 2345"  => false
// "(098) 123 4567"  => false

function validPhoneNumber(phoneNumber){
  let re = /^\([0-9]+\) [0-9]+\-[0-9]+$/
  return re.test(phoneNumber)
}