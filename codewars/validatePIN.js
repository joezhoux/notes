// ATM机允许4或6位密码和PIN码不能包含任何东西，但正是4位数字或精确6位数字。
// 如果函数传递了一个有效的 PIN 字符串，则返回true，否则返回false。
// "1234"   -->  true
// "12345"  -->  false
// "a234"   -->  false

function validatePIN (pin) {
  let re = /^(\d{4}|\d{6})$/
  return re.test(pin)
}
