

//lexerとかparserとか読み込む
var lexer = require("./lexer.js")



//実行するコード
var run_code = "let a = 10+20-30*40/50"




var tokens = lexer.start_lexer(run_code)
