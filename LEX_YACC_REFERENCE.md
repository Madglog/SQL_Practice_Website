# Lex and Yacc Programs - Complete Solutions

A comprehensive guide to Lex (Lexical Analyzer) and Yacc (Yet Another Compiler-Compiler) programs with 13 complete working examples.

---

## Table of Contents
1. [Valid Email (Gmail)](#1-valid-email-gmail)
2. [Valid Phone Number](#2-valid-phone-number)
3. [Valid URL](#3-valid-url)
4. [Count Characters, Words, Lines](#4-count-characters-words-lines)
5. [Replace Tabs with Spaces](#5-replace-tabs-with-spaces)
6. [Count Words Length 5-10](#6-count-words-length-5-10)
7. [Count Comments (Single & Multi-line)](#7-count-comments-single--multi-line)
8. [Lexical Analyzer for C Subset](#8-lexical-analyzer-for-c-subset)
9. [Yacc - Evaluate Arithmetic Expression](#9-yacc---evaluate-arithmetic-expression)
10. [Yacc - Postfix Expression](#10-yacc---postfix-expression)
11. [Yacc - Keyword Checker](#11-yacc---keyword-checker)
12. [Yacc - Palindrome Checker](#12-yacc---palindrome-checker)
13. [Yacc - Nested If Statements](#13-yacc---nested-if-statements)

---

## 1. Valid Email (Gmail)

**Purpose:** Validates Gmail email addresses using Lex.

**File: `gmail.l`**
```lex
%option noyywrap
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
}
```

**Compile and Run:**
```bash
lex gmail.l
gcc lex.yy.c -ll -o gmail
./gmail
```

**Test Input:**
```
user123@gmail.com     # Correct gmail.
test@yahoo.com        # Incorrect gmail.
```

---

## 2. Valid Phone Number

**Purpose:** Validates Indian mobile numbers (starting with 6-9, 10 digits).

**File: `phone.l`**
```lex
%option noyywrap
%{
#include <stdio.h>
%}
num [0-9]
mobile [6-9]{num}{9}
%%
{mobile} {printf("Correct Valid mobile number.\n");}
.* {printf("Incorrect mobile number.");}
%%
int main(){
    yylex();
    return 0;
}
```

**Compile and Run:**
```bash
lex phone.l
gcc lex.yy.c -ll -o phone
./phone
```

**Test Input:**
```
9876543210            # Correct Valid mobile number.
5123456789            # Incorrect mobile number.
```

---

## 3. Valid URL

**Purpose:** Validates website URLs ending with .com or .ac.in.

**File: `url.l`**
```lex
%option noyywrap
%{
#include <stdio.h>
%}
website [a-zA-Z]+
%%
{website}.com {printf("Correct website url.\n");}
{website}.ac.in {printf("Correct website url.\n");}
.* {printf("Incorrect website url.");}
%%
int main(){
    yylex();
    return 0;
}
```

**Compile and Run:**
```bash
lex url.l
gcc lex.yy.c -ll -o url
./url
```

**Test Input:**
```
google.com            # Correct website url.
university.ac.in      # Correct website url.
test.org              # Incorrect website url.
```

---

## 4. Count Characters, Words, Lines

**Purpose:** Counts the number of characters, words, and lines in a file or input.

**File: `count.l`**
```lex
%{
#include <stdio.h>
int char_count = 0;
int word_count = 0;
int line_count = 0;
%}
%%
\n { line_count++; char_count++; }
[ \t]+ { /* Ignore whitespace */ }
[^ \t\n]+ { word_count++; char_count += yyleng; }
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
    printf("Number of lines: %d\n", line_count);
    printf("Number of words: %d\n", word_count);
    printf("Number of characters: %d\n", char_count);
    if (argc > 1) {
        fclose(yyin);
    }
    return 0;
}
```

**Compile and Run:**
```bash
lex count.l
gcc lex.yy.c -ll -o count
./count test.txt
# Or use stdin:
echo "Hello World" | ./count
```

---

## 5. Replace Tabs with Spaces

**Purpose:** Replaces all tab characters with 4 spaces.

**File: `tabs.l`**
```lex
%{
#include <stdio.h>
%}
%%
\t { printf("    "); }
. { ECHO; }
\n { ECHO; }
%%
int yywrap(void) {
    return 1;
}
int main(void) {
    yylex();
    return 0;
}
```

**Compile and Run:**
```bash
lex tabs.l
gcc lex.yy.c -ll -o tabs
./tabs < input.txt > output.txt
```

---

## 6. Count Words Length 5-10

**Purpose:** Counts words with length between 5 and 10 characters.

**File: `wordlen.l`**
```lex
%{
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
.|\n { /* Ignore all other characters */ }
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
    printf("Total words with length between 5 and 10: %d\n", word_count);
    if (argc > 1) {
        fclose(yyin);
    }
    return 0;
}
```

**Compile and Run:**
```bash
lex wordlen.l
gcc lex.yy.c -ll -o wordlen
./wordlen test.txt
```

---

## 7. Count Comments (Single & Multi-line)

**Purpose:** Counts single-line (//) and multi-line (/* */) comments in C/C++ code.

**File: `comments.l`**
```lex
%{
#include <stdio.h>
int multi_line = 0;
int single_line = 0;
%}
%%
[ \t\n]+ ;
"//".* { single_line++; }
"/*"([^*]|\*+[^*/])*\*+"/" { multi_line++; }
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
    printf("Total number of single line comments: %d\n", single_line);
    printf("Total number of multi line comments: %d\n", multi_line);
    return 0;
}
int yywrap(void) {
    return 1;
}
```

**Compile and Run:**
```bash
lex comments.l
gcc lex.yy.c -ll -o comments
./comments program.c
```

---

## 8. Lexical Analyzer for C Subset

**Purpose:** Identifies and categorizes tokens in a C program (keywords, identifiers, operators, numbers).

**File: `lexer.l`**
```lex
%{
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
[ \t\n]+ ;
"//".* ;
"/*"([^*]|\*+[^*/])*\*+"/" ;
[0-9]+(\.[0-9]+)? {
    printf("<NUMBER: %s>\n", yytext);
}
[a-zA-Z_][a-zA-Z0-9_]* {
    if (isKeyword(yytext))
        printf("<KEYWORD: %s>\n", yytext);
    else
        printf("<IDENTIFIER: %s>\n", yytext);
}
"=="|"!="|"<="|">="|"="|"<"|">" {
    printf("<OPERATOR: %s>\n", yytext);
}
"+"|"-"|"*"|"/" {
    printf("<OPERATOR: %s>\n", yytext);
}
";"|","|"("|")"|"{"|"}" {
    printf("<SEPARATOR: %s>\n", yytext);
}
. {
    printf("<UNKNOWN: %s>\n", yytext);
}
%%
int main() {
    yylex();
    return 0;
}
```

**Compile and Run:**
```bash
lex lexer.l
gcc lex.yy.c -ll -o lexer
./lexer < program.c
```

---

## 9. Yacc - Evaluate Arithmetic Expression

**Purpose:** Parser for evaluating arithmetic expressions with +, -, *, /, and parentheses.

**Lex File: `expr.l`**
```lex
%{
#include "expr.tab.h"
%}
%%
[0-9]+ { yylval = atoi(yytext); return NUMBER; }
[ \t] ;
\n { return '\n'; }
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
}
```

**Yacc File: `expr.y`**
```yacc
%{
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
    '\n'
    | expr '\n' { printf("Result = %d\n", $1); }
    ;
expr:
    expr '+' expr { $$ = $1 + $3; }
    | expr '-' expr { $$ = $1 - $3; }
    | expr '*' expr { $$ = $1 * $3; }
    | expr '/' expr {
        if ($3 == 0) {
            printf("Error: Division by zero\n");
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
    fprintf(stderr, "Error: %s\n", s);
}
int main() {
    printf("Enter expressions:\n");
    yyparse();
    return 0;
}
```

**Compile and Run:**
```bash
yacc -d expr.y
lex expr.l
gcc y.tab.c lex.yy.c -ll -o calc
./calc
# Enter: 5 + 3 * 2
# Output: Result = 11
```

---

## 10. Yacc - Postfix Expression

**Purpose:** Evaluates postfix (Reverse Polish Notation) expressions.

**Lex File: `postfix.l`**
```lex
%{
#include "y.tab.h"
#include <stdlib.h>
%}
%%
[0-9]+ { yylval = atoi(yytext); return NUMBER; }
[ \t] ;
\n return '\n';
. return yytext[0];
%%
int yywrap(void) {
    return 1;
}
```

**Yacc File: `postfix.y`**
```yacc
%{
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
    '\n'
    | expr '\n' { printf("Result: %d\n", $1); }
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
    printf("Enter postfix expressions (one per line):\n");
    yyparse();
    return 0;
}
void yyerror(char *s) {
    fprintf(stderr, "Error: %s\n", s);
}
```

**Compile and Run:**
```bash
yacc -d postfix.y
lex postfix.l
gcc y.tab.c lex.yy.c -ll -o postfix
./postfix
# Enter: 5 3 +
# Output: Result: 8
```

---

## 11. Yacc - Keyword Checker

**Purpose:** Checks if input string is a C keyword.

**Lex File: `keyword.l`**
```lex
%{
#include "keyword.tab.h"
#include <string.h>
%}
%%
if|else|while|return|int|float|char { return KEYWORD; }
[a-zA-Z_][a-zA-Z0-9_]* { return IDENTIFIER; }
[ \t]+ ;
\n { return '\n'; }
. { return 0; }
%%
int yywrap() {
    return 1;
}
```

**Yacc File: `keyword.y`**
```yacc
%{
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
    KEYWORD '\n' { printf("Keyword found\n"); }
    | IDENTIFIER '\n' { printf("Not a keyword\n"); }
    | '\n' { /* ignore empty lines */ }
    ;
%%
void yyerror(const char *s) {
    printf("Error: %s\n", s);
}
int main() {
    printf("Enter strings (Ctrl+C to exit):\n");
    yyparse();
    return 0;
}
```

**Compile and Run:**
```bash
yacc -d keyword.y
lex keyword.l
gcc y.tab.c lex.yy.c -ll -o keyword
./keyword
```

---

## 12. Yacc - Palindrome Checker

**Purpose:** Checks if input string is a palindrome.

**Lex File: `palindrome.l`**
```lex
%{
#include "y.tab.h"
%}
%%
[a-zA-Z0-9] { yylval.cval = yytext[0]; return CHAR; }
\n { return EOL; }
. { /* Ignore other characters */ }
%%
int yywrap() {
    return 1;
}
```

**Yacc File: `palindrome.y`**
```yacc
%{
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
            printf("The string \"%s\" is a palindrome.\n", input_string);
        } else {
            printf("The string \"%s\" is not a palindrome.\n", input_string);
        }
    }
    ;
string:
    /* empty */
    | string CHAR {
        input_string[char_count++] = $2;
        input_string[char_count] = '\0';
    }
    ;
%%
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}
int main() {
    printf("Enter a string to check if it's a palindrome: ");
    yyparse();
    return 0;
}
```

**Compile and Run:**
```bash
yacc -d palindrome.y
lex palindrome.l
gcc y.tab.c lex.yy.c -ll -o palindrome
./palindrome
```

---

## 13. Yacc - Nested If Statements

**Purpose:** Parser for nested if-else statements.

**Lex File: `nested_if.l`**
```lex
%{
#include "y.tab.h"
%}
%%
"if" return IF;
"else" return ELSE;
[a-zA-Z]+ { return ID; }
[0-9]+ { return NUMBER; }
"=="|"!="|"<"|">"|"<="|">=" { return RELOP; }
[ \t\n] ;
. return yytext[0];
%%
int yywrap(void) {
    return 1;
}
```

**Yacc File: `nested_if.y`**
```yacc
%{
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
    IF '(' condition ')' statement %prec "then" { printf("Parsed an if statement.\n"); }
    | IF '(' condition ')' statement ELSE statement { printf("Parsed an if-else statement.\n"); }
    | ID '=' NUMBER ';' { printf("Parsed an assignment.\n"); }
    ;
condition:
    ID RELOP ID
    | ID
    | NUMBER
    ;
%%
int main(void) {
    printf("Enter a statement with nested if:\n");
    yyparse();
    return 0;
}
void yyerror(char *s) {
    fprintf(stderr, "Error: %s\n", s);
}
```

**Compile and Run:**
```bash
yacc -d nested_if.y
lex nested_if.l
gcc y.tab.c lex.yy.c -ll -o nested_if
./nested_if
```

---

## Summary

**Total Programs: 13**

**By Category:**
- **Lex Pattern Matching (8 programs):**
  - Email validation
  - Phone number validation
  - URL validation
  - Character/word/line counting
  - Tab replacement
  - Word length filtering
  - Comment counting
  - Lexical analyzer

- **Yacc Parsers (5 programs):**
  - Arithmetic expression evaluator
  - Postfix expression evaluator
  - Keyword checker
  - Palindrome checker
  - Nested if statement parser

**Compilation Steps:**
1. **For Lex only:** `lex file.l && gcc lex.yy.c -ll -o output`
2. **For Yacc:** `yacc -d file.y && lex file.l && gcc y.tab.c lex.yy.c -ll -o output`

**Common Flags:**
- `-d` in yacc: Generate header file
- `-ll` or `-lfl`: Link Lex library
- `%option noyywrap`: Disable yywrap function

---

*For interactive practice, visit the Lex & Yacc practice page*
