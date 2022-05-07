
var tokens = []

var tokentype = {
    //不正なトークン,終端
    ILLEGAL:"ILLEGAL",
    EOF:"EOF",
    //識別子
    IDENT:"IDENT",
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
    NOT_EQ:"NOT_EQ",
    //デリミタ
    COMMA:"COMMA",
    SEMICOLON:"SEMICOLON",

    //括弧
    LPAREN:"LPAREN",
    RPAREN:"RPAREN",
    LBRACE:"LBRACE",
    RBRACE:"RBRACE",

    // キーワード
    FUNCTION:"FUNCTION",
    LET:"LET",
    IF:"IF",
    ELSE:"ELSE",
    RETURN:"RETURN",
    TRUE:"TRUE",
    FALSE:"FALSE",

}

class Token{
    constructor(){

    }

    findIdent(input_token){
        //予約語を検索してtokenにする関数
        const tokens_dictionaly =[
            {type:tokentype.LET,literal:"let"},
            {type:tokentype.FUNCTION,literal:"fn"},
            {type:tokentype.IF,literal:"if"},
            {type:tokentype.ELSE,literal:"else"},
            {type:tokentype.RETURN,literal:"return"},
            {type:tokentype.TRUE,literal:"true"},
            {type:tokentype.FALSE,literal:"false"},
        ]

        for(var i = 0;i < tokens_dictionaly.length;i++){
            if(input_token == tokens_dictionaly[i].literal){
                return tokens_dictionaly[i]
            }
        }

        return {type:tokentype.IDENT,literal:input_token}
    }
}

class Lexer{
    
    constructor(input_code){
        this.code = input_code

        console.log("debug\n------code------\n"+this.code)
    }

    returnToken(){
        var tokencls = new Token()

        var token = {}

        if(1 < this.code.length){
            var NextChar = this.code[1]
        }else{
            var NextChar = 0
        }

        this.DelWhitespace()

        switch(this.code[0]){
            case "=":
                if(NextChar == "="){
                    token = this.MakeToken(tokentype.EQ,"==")
                }else{
                    token = this.MakeToken(tokentype.EQ,this.code[0])
                }
                break;
            case "+":
                token = this.MakeToken(tokentype.PLUS,this.code[0])
                break;
            case "-":
                token = this.MakeToken(tokentype.MINUS,this.code[0])
                break;
            case "*":
                token = this.MakeToken(tokentype.ASTERISK,this.code[0])
                break;
            case "/":
                token = this.MakeToken(tokentype.SLASH,this.code[0])
                break;
            case "!":
                if(NextChar == "="){
                    token = this.MakeToken(tokentype.NOT_EQ,"!=")
                }else{
                    token = this.MakeToken(tokentype.BANG,this.code[0])
                }
                break;
            case ">":
                token = this.MakeToken(tokentype.GT,this.code[0])
                break;
            case "<":
                token = this.MakeToken(tokentype.LT,this.code[0])
                break;
            case ",":
                token = this.MakeToken(tokentype.COMMA,this.code[0])
                break;
            case ";":
                token = this.MakeToken(tokentype.SEMICOLON,this.code[0])
                break;
            case "(":
                token = this.MakeToken(tokentype.LPAREN,this.code[0])
                break;
            case ")":
                token = this.MakeToken(tokentype.RPAREN,this.code[0])
                break;
            case "{":
                token = this.MakeToken(tokentype.LBRACE,this.code[0])
                break;
            case "}":
                token = this.MakeToken(tokentype.RBRACE,this.code[0])
                break;

            default:
                //識別子候補


                if(this.IsAlphabet(this.code[0])){  //予約語

                    var identifier = this.ReadIdent()
                    token = tokencls.findIdent(identifier)

                }else if(!isNaN(this.code[0])){//数字リテラル

                    var number = this.ReadNumber()
                    token = this.MakeTokenNotDel(tokentype.INT,number)

                }
                break;
        }

        return token
    }

    ReadNumber(){
        var number = ""

        while(!isNaN(this.code[0])){
            //数字なら追加
            number += this.code[0]
            this.ReadNext()
        }

        return number
    }

    ReadIdent(){
        //予約語を読む

        var ident = ""

        while(this.IsAlphabet(this.code[0])){

            ident += this.code[0]
            this.code = this.code.slice(1)
        }

        this.DelWhitespace()

        return ident

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

    IsAlphabet(c){
        //アルファベットかそうじゃないか
        //return
        //alphabet : true
        //not : false

        var cn = c.charCodeAt(0)

        if("a".charCodeAt(0) <= cn && cn <= "z".charCodeAt(0)){
            return true
        }else if("A".charCodeAt(0) <= cn && cn <= "Z".charCodeAt(0)){
            return true
        }else{
            return false
        }

    }

    MakeToken(type,value){
        //一文字進む
        this.ReadNext()
        return {type:type,literal:value}
    }
    MakeTokenNotDel(type,value){
        //一文字進まないやつ
        return {type:type,literal:value}
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