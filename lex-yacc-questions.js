// Lex and Yacc Programs - Practice Questions

const lexYaccQuestions = [
    // Lex Pattern Matching Programs
    {
        category: "Lex - Pattern Matching",
        title: "Valid Email (Gmail)",
        description: "Write a Lex program to validate Gmail email addresses. The email should start with letters, followed by letters/numbers, and end with @gmail.com",
        hint: "Use pattern matching with [a-zA-Z]+ for initial, [a-zA-Z0-9]* for rest, and literal @gmail.com",
        answer: `%option noyywrap
%{
#include <stdio.h>
%}
initial [a-zA-Z]+
num [a-zA-z0-9]*
gmailadd {initial}{num}@gmail.com
%%
{gmailadd} {printf("Correct gmail.");}
.* {printf("Incorrect gmail.");}
%%
int main(){
    yylex();
    return 0;
}`
    },
    {
        category: "Lex - Pattern Matching",
        title: "Valid Phone Number",
        description: "Write a Lex program to validate Indian mobile numbers (10 digits starting with 6-9).",
        hint: "Use [6-9] for first digit, [0-9] for remaining 9 digits",
        answer: `%option noyywrap
%{
#include <stdio.h>
%}
num [0-9]
mobile [6-9]{num}{9}
%%
{mobile} {printf("Correct Valid mobile number.\\n");}
.* {printf("Incorrect mobile number.");}
%%
int main(){
    yylex();
    return 0;
}`
    },
    {
        category: "Lex - Pattern Matching",
        title: "Valid URL",
        description: "Write a Lex program to validate website URLs ending with .com or .ac.in",
        hint: "Use [a-zA-Z]+ for website name, match .com and .ac.in separately",
        answer: `%option noyywrap
%{
#include <stdio.h>
%}
website [a-zA-Z]+
%%
{website}.com {printf("Correct website url.\\n");}
{website}.ac.in {printf("Correct website url.\\n");}
.* {printf("Incorrect website url.");}
%%
int main(){
    yylex();
    return 0;
}`
    },
    {
        category: "Lex - Text Processing",
        title: "Count Characters, Words, Lines",
        description: "Write a Lex program to count the number of characters, words, and lines in input.",
        hint: "Use global counters, \\n for lines, [ \\t]+ for whitespace, [^ \\t\\n]+ for words",
        answer: `%{
#include <stdio.h>
int char_count = 0;
int word_count = 0;
int line_count = 0;
%}
%%
\\n { line_count++; char_count++; }
[ \\t]+ { /* Ignore whitespace */ }
[^ \\t\\n]+ { word_count++; char_count += yyleng; }
. { char_count++; }
%%
int yywrap(void) {
    return 1;
}
int main(int argc, char *argv[]) {
    if (argc > 1) {
        FILE *file = fopen(argv[1], "r");
        if (!file) {
            perror("Error opening file");
            return 1;
        }
        yyin = file;
    }
    yylex();
    printf("Number of lines: %d\\n", line_count);
    printf("Number of words: %d\\n", word_count);
    printf("Number of characters: %d\\n", char_count);
    if (argc > 1) {
        fclose(yyin);
    }
    return 0;
}`
    },
    {
        category: "Lex - Text Processing",
        title: "Replace Tabs with Spaces",
        description: "Write a Lex program to replace all tab characters (\\t) with 4 spaces.",
        hint: "Match \\t and printf 4 spaces, use ECHO for other characters",
        answer: `%{
#include <stdio.h>
%}
%%
\\t { printf("    "); }
. { ECHO; }
\\n { ECHO; }
%%
int yywrap(void) {
    return 1;
}
int main(void) {
    yylex();
    return 0;
}`
    },
    {
        category: "Lex - Text Processing",
        title: "Count Words Length 5-10",
        description: "Write a Lex program to count words with length between 5 and 10 characters.",
        hint: "Match [a-zA-Z0-9]+, use yyleng to get length, check if 5 <= len <= 10",
        answer: `%{
#include <stdio.h>
int word_count = 0;
%}
%%
[a-zA-Z0-9]+ {
    int len = yyleng;
    if (len >= 5 && len <= 10) {
        word_count++;
    }
}
.|\\n { /* Ignore all other characters */ }
%%
int yywrap(void) {
    return 1;
}
int main(int argc, char *argv[]) {
    if (argc > 1) {
        FILE *file = fopen(argv[1], "r");
        if (!file) {
            perror("Error opening file");
            return 1;
        }
        yyin = file;
    }
    yylex();
    printf("Total words with length between 5 and 10: %d\\n", word_count);
    if (argc > 1) {
        fclose(yyin);
    }
    return 0;
}`
    },
    {
        category: "Lex - Comment Detection",
        title: "Count Comments (Single & Multi-line)",
        description: "Write a Lex program to count single-line (//) and multi-line (/* */) comments in C/C++ code.",
        hint: "Use //.* for single-line, complex regex for multi-line /* */",
        answer: `%{
#include <stdio.h>
int multi_line = 0;
int single_line = 0;
%}
%%
[ \\t\\n]+ ;
"//".* { single_line++; }
"/*"([^*]|\\*+[^*/])*\\*+"/" { multi_line++; }
. ;
%%
int main(int argc, char **argv){
    if(argc > 1){
        FILE *file = fopen(argv[1], "r");
        if (!file) {
            perror("Error opening file");
            return 1;
        }
        yyin = file;
    }
    yylex();
    printf("Total number of single line comments: %d\\n", single_line);
    printf("Total number of multi line comments: %d\\n", multi_line);
    return 0;
}
int yywrap(void) {
    return 1;
}`
    },
    {
        category: "Lex - Lexical Analyzer",
        title: "Lexical Analyzer for C Subset",
        description: "Write a Lex program to identify and categorize tokens: keywords, identifiers, operators, numbers, and separators.",
        hint: "Create isKeyword function, match numbers, identifiers, operators, and separators separately",
        answer: `%{
#include <stdio.h>
#include <string.h>
int isKeyword(char *word) {
    const char *keywords[] = {
        "int", "float", "return", "if", "else",
        "while", "for", "char", "double", "void"
    };
    int n = sizeof(keywords) / sizeof(keywords[0]);
    for (int i = 0; i < n; i++) {
        if (strcmp(word, keywords[i]) == 0)
            return 1;
    }
    return 0;
}
%}
%option noyywrap
%%
[ \\t\\n]+ ;
"//".* ;
"/*"([^*]|\\*+[^*/])*\\*+"/" ;
[0-9]+(\\.[0-9]+)? {
    printf("<NUMBER: %s>\\n", yytext);
}
[a-zA-Z_][a-zA-Z0-9_]* {
    if (isKeyword(yytext))
        printf("<KEYWORD: %s>\\n", yytext);
    else
        printf("<IDENTIFIER: %s>\\n", yytext);
}
"=="|"!="|"<="|">="|"="|"<"|">" {
    printf("<OPERATOR: %s>\\n", yytext);
}
"+"|"-"|"*"|"/" {
    printf("<OPERATOR: %s>\\n", yytext);
}
";"|","|"("|")"|"{"|"}" {
    printf("<SEPARATOR: %s>\\n", yytext);
}
. {
    printf("<UNKNOWN: %s>\\n", yytext);
}
%%
int main() {
    yylex();
    return 0;
}`
    },

    // Yacc Parser Programs
    {
        category: "Yacc - Expression Evaluation",
        title: "Arithmetic Expression Evaluator (Lex File)",
        description: "Write the Lex file (expr.l) for an arithmetic expression evaluator. Match numbers, operators (+, -, *, /), and parentheses.",
        hint: "Return NUMBER token for digits, return operator characters directly",
        answer: `%{
#include "expr.tab.h"
%}
%%
[0-9]+ { yylval = atoi(yytext); return NUMBER; }
[ \\t] ;
\\n { return '\\n'; }
"+" { return '+'; }
"-" { return '-'; }
"*" { return '*'; }
"/" { return '/'; }
"(" { return '('; }
")" { return ')'; }
. { return yytext[0]; }
%%
int yywrap() {
    return 1;
}`
    },
    {
        category: "Yacc - Expression Evaluation",
        title: "Arithmetic Expression Evaluator (Yacc File)",
        description: "Write the Yacc file (expr.y) for evaluating arithmetic expressions with proper precedence and division by zero handling.",
        hint: "Use %left for precedence, handle division by zero in expr/expr rule",
        answer: `%{
#include <stdio.h>
#include <stdlib.h>
int yylex(void);
void yyerror(const char *s);
%}
%token NUMBER
%left '+' '-'
%left '*' '/'
%right UMINUS
%%
input:
    /* empty */
    | input line
    ;
line:
    '\\n'
    | expr '\\n' { printf("Result = %d\\n", $1); }
    ;
expr:
    expr '+' expr { $$ = $1 + $3; }
    | expr '-' expr { $$ = $1 - $3; }
    | expr '*' expr { $$ = $1 * $3; }
    | expr '/' expr {
        if ($3 == 0) {
            printf("Error: Division by zero\\n");
            exit(1);
        }
        $$ = $1 / $3;
    }
    | '(' expr ')' { $$ = $2; }
    | '-' expr %prec UMINUS { $$ = -$2; }
    | NUMBER { $$ = $1; }
    ;
%%
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\\n", s);
}
int main() {
    printf("Enter expressions:\\n");
    yyparse();
    return 0;
}`
    },
    {
        category: "Yacc - Expression Evaluation",
        title: "Postfix Expression Evaluator (Lex File)",
        description: "Write the Lex file (postfix.l) for a postfix expression evaluator.",
        hint: "Match numbers and return NUMBER token, return operators as characters",
        answer: `%{
#include "y.tab.h"
#include <stdlib.h>
%}
%%
[0-9]+ { yylval = atoi(yytext); return NUMBER; }
[ \\t] ;
\\n return '\\n';
. return yytext[0];
%%
int yywrap(void) {
    return 1;
}`
    },
    {
        category: "Yacc - Expression Evaluation",
        title: "Postfix Expression Evaluator (Yacc File)",
        description: "Write the Yacc file (postfix.y) to evaluate postfix (RPN) expressions like '5 3 +' = 8.",
        hint: "Use expr expr '+' pattern for postfix, stack-based evaluation",
        answer: `%{
#include <stdio.h>
#include <ctype.h>
void yyerror(char *s);
int yylex(void);
%}
%token NUMBER
%%
program:
    | program line
    ;
line:
    '\\n'
    | expr '\\n' { printf("Result: %d\\n", $1); }
    ;
expr:
    NUMBER
    | expr expr '+' { $$ = $1 + $2; }
    | expr expr '-' { $$ = $1 - $2; }
    | expr expr '*' { $$ = $1 * $2; }
    | expr expr '/' {
        if ($2 == 0) {
            yyerror("Division by zero");
            $$ = 0;
        } else {
            $$ = $1 / $2;
        }
    }
    ;
%%
int main(void) {
    printf("Enter postfix expressions (one per line):\\n");
    yyparse();
    return 0;
}
void yyerror(char *s) {
    fprintf(stderr, "Error: %s\\n", s);
}`
    },
    {
        category: "Yacc - Keyword Checker",
        title: "Keyword Checker (Lex File)",
        description: "Write the Lex file (keyword.l) to identify C keywords (if, else, while, return, int, float, char) vs identifiers.",
        hint: "Match exact keywords with | operator, return KEYWORD or IDENTIFIER tokens",
        answer: `%{
#include "keyword.tab.h"
#include <string.h>
%}
%%
if|else|while|return|int|float|char { return KEYWORD; }
[a-zA-Z_][a-zA-Z0-9_]* { return IDENTIFIER; }
[ \\t]+ ;
\\n { return '\\n'; }
. { return 0; }
%%
int yywrap() {
    return 1;
}`
    },
    {
        category: "Yacc - Keyword Checker",
        title: "Keyword Checker (Yacc File)",
        description: "Write the Yacc file (keyword.y) to check if input is a keyword or not.",
        hint: "Create rules for KEYWORD and IDENTIFIER, print appropriate message",
        answer: `%{
#include <stdio.h>
#include <string.h>
void yyerror(const char *s);
int yylex(void);
%}
%token KEYWORD IDENTIFIER
%%
input:
    /* empty */
    | input line
    ;
line:
    KEYWORD '\\n' { printf("Keyword found\\n"); }
    | IDENTIFIER '\\n' { printf("Not a keyword\\n"); }
    | '\\n' { /* ignore empty lines */ }
    ;
%%
void yyerror(const char *s) {
    printf("Error: %s\\n", s);
}
int main() {
    printf("Enter strings (Ctrl+C to exit):\\n");
    yyparse();
    return 0;
}`
    },
    {
        category: "Yacc - Palindrome Checker",
        title: "Palindrome Checker (Lex File)",
        description: "Write the Lex file (palindrome.l) to recognize individual characters for palindrome checking.",
        hint: "Match [a-zA-Z0-9] and return CHAR token with character value",
        answer: `%{
#include "y.tab.h"
%}
%%
[a-zA-Z0-9] { yylval.cval = yytext[0]; return CHAR; }
\\n { return EOL; }
. { /* Ignore other characters */ }
%%
int yywrap() {
    return 1;
}`
    },
    {
        category: "Yacc - Palindrome Checker",
        title: "Palindrome Checker (Yacc File)",
        description: "Write the Yacc file (palindrome.y) to check if a string is a palindrome by comparing characters from both ends.",
        hint: "Build string in array, compare first and last characters iteratively",
        answer: `%{
#include <stdio.h>
#include <string.h>
void yyerror(const char *s);
int yylex(void);
char input_string[100];
int char_count = 0;
%}
%union {
    char cval;
}
%token <cval> CHAR
%token EOL
%%
start:
    string EOL {
        int len = strlen(input_string);
        int is_palindrome = 1;
        for (int i = 0; i < len / 2; i++) {
            if (input_string[i] != input_string[len - i - 1]) {
                is_palindrome = 0;
                break;
            }
        }
        if (is_palindrome) {
            printf("The string \\"%s\\" is a palindrome.\\n", input_string);
        } else {
            printf("The string \\"%s\\" is not a palindrome.\\n", input_string);
        }
    }
    ;
string:
    /* empty */
    | string CHAR {
        input_string[char_count++] = $2;
        input_string[char_count] = '\\0';
    }
    ;
%%
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\\n", s);
}
int main() {
    printf("Enter a string to check if it's a palindrome: ");
    yyparse();
    return 0;
}`
    },
    {
        category: "Yacc - Control Structures",
        title: "Nested If Statements (Lex File)",
        description: "Write the Lex file (nested_if.l) to tokenize if-else statements, identifiers, numbers, and relational operators.",
        hint: "Return IF, ELSE, ID, NUMBER, RELOP tokens appropriately",
        answer: `%{
#include "y.tab.h"
%}
%%
"if" return IF;
"else" return ELSE;
[a-zA-Z]+ { return ID; }
[0-9]+ { return NUMBER; }
"=="|"!="|"<"|">"|"<="|">=" { return RELOP; }
[ \\t\\n] ;
. return yytext[0];
%%
int yywrap(void) {
    return 1;
}`
    },
    {
        category: "Yacc - Control Structures",
        title: "Nested If Statements (Yacc File)",
        description: "Write the Yacc file (nested_if.y) to parse nested if-else statements with proper precedence to avoid dangling else.",
        hint: "Use %prec to handle if-then-else ambiguity, print when statements are parsed",
        answer: `%{
#include <stdio.h>
#include <stdlib.h>
void yyerror(char *s);
int yylex(void);
%}
%token IF ELSE ID NUMBER RELOP
%right "then"
%right ELSE
%%
statement:
    IF '(' condition ')' statement %prec "then" { printf("Parsed an if statement.\\n"); }
    | IF '(' condition ')' statement ELSE statement { printf("Parsed an if-else statement.\\n"); }
    | ID '=' NUMBER ';' { printf("Parsed an assignment.\\n"); }
    ;
condition:
    ID RELOP ID
    | ID
    | NUMBER
    ;
%%
int main(void) {
    printf("Enter a statement with nested if:\\n");
    yyparse();
    return 0;
}
void yyerror(char *s) {
    fprintf(stderr, "Error: %s\\n", s);
}`
    }
];
