
var tokens = []

var tokentype = {
    //不正なトークン,終端
    ILLEGAL:"ILLEGAL",
    EOF:"EOF",
    //リテラル
    INT:"INT",

    //演算
    ASSIGN:"ASSIGN",
    PLUS:"PLUS",
    MINUS:"MINUS",
    ASTERISK:"ASTERISK",
    SLASH:"SLASH",
    BANG:"BANG",
    LT:"LT",
    GT:"GT",
    EQ:"EQ",
    NOT_EQ:"NOT_EQ"


}

function make_token(type,value){
    return {type:type,literal:value}
}

class Lexer{
    
    constructor(input_code){
        this.code = input_code

        console.log("debug\n------code------\n"+this.code)
    }

    returnToken(){
        var token = {}

        this.DelWhitespace()

        switch(this.code[0]){
            case "=":
                break;
            case "+":
                token = make_token(tokentype.PLUS,"+")
                this.ReadNext()
                break;
            case "-":
                token = make_token(tokentype.MINUS,"-")
                this.ReadNext()
                break;
            case "*":
                token = make_token(tokentype.ASTERISK,"*")
                this.ReadNext()
                break;
            case "/":
                token = make_token(tokentype.SLASH,"/")
                this.ReadNext()
                break;
            default:

                if(!isNaN(this.code[0])){//数字リテラル
                    var number = this.ReadNumber()
                    token = make_token(tokentype.INT,number)
                }
                break;
        }

        return token
    }

    ReadNumber(input){
        var number = ""

        while(!isNaN(this.code[0])){
            //数字なら追加
            number += this.code[0]
            this.ReadNext()
        }

        return number
    }

    ReadNext(){
        //先頭を削除(一つ進む)
        this.code = this.code.slice(1)

        this.DelWhitespace()
    }

    DelWhitespace(){
        //空白を消す
        while(this.code[0] == ' ' || this.code[0] == '\t' || this.code[0] == '\r' || this.code[0] == '\n'){
            this.code = this.code.slice(1)
        }
    }
    
}


//lexer開始 start_lexer(code)
//start_lexer("10+20-30*40/50")

/**
 * @param input_code Qsuのコード
 */
//外部からlexerを呼び出すためexportsしている
 exports.start_lexer = function(input_code){
    const lexer_class = new Lexer(input_code)

    while(lexer_class.code != ""){
        token = lexer_class.returnToken()

        tokens.push(token)
    }

    //debug
    console.log("\n------tokens-------")
    for(var i = 0;i < tokens.length;i++){
        console.log(JSON.stringify(tokens[i]))
    }
    console.log("\n-------------------")
}