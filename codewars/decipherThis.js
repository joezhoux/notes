// 您将收到一条需要破译的秘密信息。以下是你需要知道的事情来破译它：
// 对于每个单词：
// 第二个和最后一个字母被切换（例如Hello变成Holle）
// 第一个字母被它的字符代码替换（例如H变成72）
// 注意：没有使用特殊字符，只有字母和空格
// 例子
// decipherThis('72olle 103doo 100ya');  'Hello good day'
// decipherThis('82yade 115te 103o');  'Ready set go'
// decipherThis('72eva 97 103o 97t 116sih 97dn 115ee 104wo 121uo 100o')
// 'Have a go at this and see how you do'

function decipherThis(str) {
  return str.replace(/(\d+)([a-z]*)/g, f) 
}

function f(_, nums, char) {
  let n = String.fromCharCode(Number(nums))
  if (char && char.length > 1) {
    char = char.replace(/\b([a-z])(.*)([a-z])\b/g, "$3$2$1")
  }
  return n + char
}
