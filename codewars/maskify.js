// 通常当你买东西时，你会被问到你的信用卡号码、电话号码或你最隐秘的问题的答案是否仍然正确。
// 但是，由于有人可以从您的肩膀上查看，您不希望它显示在您的屏幕上。相反，我们掩盖了它。
// 您的任务是编写一个函数maskify，该函数将除最后四个字符之外的所有字符更改为'#'.
// maskify("4556364607935616") == "############5616"
// maskify(     "64607935616") ==      "#######5616"
// maskify(               "1") ==                "1"
// maskify(                "") ==                 ""
// maskify("Skippy")                                   == "##ippy"
// maskify("Nananananananananananananananana Batman!") == "####################################man!"

function maskify(cc) {
  return cc.replace(/.(?=....)/g, '#') 
}
