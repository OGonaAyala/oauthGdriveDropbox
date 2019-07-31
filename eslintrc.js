'use strict';

const off = 'off';
const warn = 'warn';
const warnedError = 'warn';
const error = 'error';

const _warnedError = 'off';
const __warnedError = 'off';

module.exports = {
    parser: 'babel-eslint',

    extends: ['prettier', 'prettier/react'],

    env: {
        browser: true,
        node: true,
        mocha: true,
        es6: true,
    },

    parserOptions: {
        // ecmaVersion: 6,
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: false,
            experimentalObjectRestSpread: true,
            objectLiteralDuplicateProperties: false,
        },
    },

    plugins: ['prettier', 'react', 'import', 'jsx-a11y'],

    settings: {
        'import/resolver': {
            node: {
                paths: '/usr/local/www/mashups',
                extensions: ['.js', '.jsx', '.json'],
            },
        },
        'import/extensions': ['.js', '.jsx'],
        'import/core-modules': [],
        'import/ignore': [
            'node_modules',
            '\\.(coffee|scss|css|less|hbs|svg|json)$',
        ],
    },

    globals: {
        _build_: false,
        _env_: false,
        _libs_: false,
        _config_: false,
        _config_env_: false,
        _config_libs_: false,
        _PROD_: false,
        _DEV_: false,
        _DEV_SERVER_: false,
        _SERVER_: false,
        _CLIENT_: false,
        _INITIAL_STATE_: false,
        _RESOLVER_PAYLOAD_: false,
        _REDUX_DEVTOOLS_EXTENSION_COMPOSE_: false,
        _LOGS_: false,
        _DEBUG_: false,
        load: false,
        cachedFetch: false,
        chk: false,
        anonymousID: false,
    },

    rules: {
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                trailingComma: 'all',
            },
        ],

        // babel inserts `'use strict';` for us
        strict: [warnedError, 'never'],

        //  _               _                          _   _
        // | |_   __  _| |_   _ _  _ _ _ _  _| |() __ _  _
        // | '_ \ / _ \/ _| _| | '_ \| '_/ _` |/ _| _| |/ _/ _ \/ __|
        // | |) |  _/\__ \ |_  | |) | | | (| | (_| || | (|  _/\__ \
        // |./ \_||_/\| | ./||  \_,|\__|\||\__\_||__/
        //                       |_|

        // enforces getter/setter pairs in objects
        'accessor-pairs': off,

        // enforces return statements in callbacks of array's methods
        // http://eslint.org/docs/rules/array-callback-return
        'array-callback-return': _warnedError,

        // treat var statements as if they were block scoped
        'block-scoped-var': warnedError,

        // specify the maximum cyclomatic complexity allowed in a program
        complexity: [off, 11],

        // require return statements to either always or never specify values
        'consistent-return': warnedError,

        // specify curly brace conventions for all control statements
        curly: [warnedError, 'multi-line'],

        // require default case in switch statements
        'default-case': [warnedError, { commentPattern: '^no default$' }],

        // encourages use of dot notation whenever possible
        'dot-notation': [
            warnedError,
            { allowKeywords: true, allowPattern: '^[_A-Z]' },
        ],

        // enforces consistent newlines before or after dots
        // http://eslint.org/docs/rules/dot-location
        'dot-location': [warnedError, 'property'],

        // require the use of === and !==
        // http://eslint.org/docs/rules/eqeqeq
        eqeqeq: [warnedError, 'allow-null'],

        // make sure for-in loops have an if statement
        'guard-for-in': warnedError,

        // disallow the use of alert, confirm, and prompt
        'no-alert': warn,

        // disallow use of arguments.caller or arguments.callee
        'no-caller': warnedError,

        // disallow lexical declarations in case/default clauses
        // http://eslint.org/docs/rules/no-case-declarations.html
        'no-case-declarations': warnedError,

        // disallow division operators explicitly at beginning of regular expression
        // http://eslint.org/docs/rules/no-div-regex
        'no-div-regex': off,

        // disallow else after a return in an if
        'no-else-return': warnedError,

        // disallow empty functions, except for standalone funcs/arrows
        // http://eslint.org/docs/rules/no-empty-function
        'no-empty-function': [
            warnedError,
            {
                allow: ['arrowFunctions', 'functions', 'methods'],
            },
        ],

        // disallow empty destructuring patterns
        // http://eslint.org/docs/rules/no-empty-pattern
        'no-empty-pattern': warnedError,

        // disallow comparisons to null without a type-checking operator
        'no-eq-null': off,

        // disallow use of eval()
        'no-eval': error,

        // disallow adding to native types
        'no-extend-native': warnedError,

        // disallow unnecessary function binding
        'no-extra-bind': warnedError,

        // disallow Unnecessary Labels
        // http://eslint.org/docs/rules/no-extra-label
        'no-extra-label': warnedError,

        // disallow fallthrough of case statements
        'no-fallthrough': warnedError,

        // disallow the use of leading or trailing decimal points in numeric literals
        'no-floating-decimal': warnedError,

        // disallow reassignments of native objects or read-only globals
        // http://eslint.org/docs/rules/no-global-assign
        'no-global-assign': [warnedError, { exceptions: [] }],
        // deprecated in favor of no-global-assign
        'no-native-reassign': off,

        // disallow implicit type conversions
        // http://eslint.org/docs/rules/no-implicit-coercion
        'no-implicit-coercion': [
            off,
            {
                boolean: false,
                number: true,
                string: true,
                allow: [],
            },
        ],

        // disallow var and named functions in global scope
        // http://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': off,

        // disallow use of eval()-like methods
        'no-implied-eval': warnedError,

        // disallow this keywords outside of classes or class-like objects
        'no-invalid-this': off,

        // disallow usage of _iterator_ property
        'no-iterator': warnedError,

        // disallow use of labels for anything other then loops and switches
        'no-labels': [warnedError, { allowLoop: false, allowSwitch: false }],

        // disallow unnecessary nested blocks
        'no-lone-blocks': warnedError,

        // disallow creation of functions within loops
        'no-loop-func': warnedError,

        // disallow magic numbers
        // http://eslint.org/docs/rules/no-magic-numbers
        'no-magic-numbers': [
            off,
            {
                ignore: [],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false,
            },
        ],

        // disallow use of multiple spaces
        'no-multi-spaces': warnedError,

        // disallow use of multiline strings
        'no-multi-str': warnedError,

        // disallow use of new operator when not part of the assignment or comparison
        'no-new': warnedError,

        // disallow use of new operator for Function object
        'no-new-func': warnedError,

        // disallows creating new instances of String, Number, and Boolean
        'no-new-wrappers': warnedError,

        // disallow use of (old style) octal literals
        'no-octal': warnedError,

        // disallow use of octal escape sequences in string literals, such as
        // var foo = 'Copyright \251';
        'no-octal-escape': warnedError,

        // disallow reassignment of function parameters
        // disallow parameter object manipulation
        // rule: http://eslint.org/docs/rules/no-param-reassign.html
        'no-param-reassign': [_warnedError, { props: true }],

        // disallow usage of _proto_ property
        'no-proto': warnedError,

        // disallow declaring the same variable more then once
        'no-redeclare': error,

        // disallow certain object properties
        // http://eslint.org/docs/rules/no-restricted-properties
        'no-restricted-properties': [
            warnedError,
            {
                object: 'arguments',
                property: 'callee',
                message: 'arguments.callee is deprecated',
            },
            {
                property: '_defineGetter_',
                message: 'Please use Object.defineProperty instead.',
            },
            {
                property: '_defineSetter_',
                message: 'Please use Object.defineProperty instead.',
            },
            {
                object: 'Math',
                property: 'pow',
                message: 'Use the exponentiation operator (**) instead.',
            },
        ],

        // disallow use of assignment in return statement
        'no-return-assign': warnedError,

        // disallow redundant `return await`
        'no-return-await': warnedError,

        // disallow use of `javascript:` urls.
        'no-script-url': __warnedError,

        // disallow self assignment
        // http://eslint.org/docs/rules/no-self-assign
        'no-self-assign': warnedError,

        // disallow comparisons where both sides are exactly the same
        'no-self-compare': warnedError,

        // disallow use of comma operator
        'no-sequences': warnedError,

        // restrict what can be thrown as an exception
        'no-throw-literal': warnedError,

        // disallow unmodified conditions of loops
        // http://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unmodified-loop-condition': off,

        // disallow usage of expressions in statement position
        'no-unused-expressions': [
            warnedError,
            {
                allowShortCircuit: false,
                allowTernary: false,
            },
        ],

        // disallow unused labels
        // http://eslint.org/docs/rules/no-unused-labels
        'no-unused-labels': warnedError,

        // disallow unnecessary .call() and .apply()
        'no-useless-call': off,

        // disallow useless string concatenation
        // http://eslint.org/docs/rules/no-useless-concat
        'no-useless-concat': warnedError,

        // disallow unnecessary string escaping
        // http://eslint.org/docs/rules/no-useless-escape
        'no-useless-escape': warnedError,

        // disallow redundant return; keywords
        // http://eslint.org/docs/rules/no-useless-return
        'no-useless-return': warnedError,

        // disallow use of void operator
        // http://eslint.org/docs/rules/no-void
        'no-void': warnedError,

        // disallow usage of configurable warning terms in comments: e.g. todo
        'no-warning-comments': [
            off,
            { terms: ['todo', 'fixme', 'xxx'], location: 'start' },
        ],

        // disallow use of the with statement
        'no-with': warnedError,

        // require use of the second argument for parseInt()
        radix: warnedError,

        // require `await` in `async function` (note: this is a horrible rule that should never be used)
        // http://eslint.org/docs/rules/require-await
        'require-await': off,

        // requires to declare all vars on top of their containing scope
        'vars-on-top': warnedError,

        // require immediate function invocation to be wrapped in parentheses
        // http://eslint.org/docs/rules/wrap-iife.html
        'wrap-iife': [
            warnedError,
            'outside',
            { functionPrototypeMethods: false },
        ],

        // require or disallow Yoda conditions
        yoda: warnedError,

        //   _ _ _ _ _ _  _ _ __
        //  / _ \ '_| '/ _ \| '/ _|
        // |  _/ |  | | | () | |  \__ \
        //  \__||  ||  \_/||  |_/

        // require trailing commas in multiline object literals
        'comma-dangle': [
            warnedError,
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],

        // Disallow await inside of loops
        // http://eslint.org/docs/rules/no-await-in-loop
        'no-await-in-loop': warnedError,

        // disallow assignment in conditional expressions
        'no-cond-assign': [warnedError, 'always'],

        // disallow use of console
        'no-console': off, // FIXME: should be warn

        // disallow use of constant expressions in conditions
        'no-constant-condition': warn,

        // disallow control characters in regular expressions
        'no-control-regex': warnedError,

        // disallow use of debugger
        'no-debugger': warnedError,

        // disallow duplicate arguments in functions
        'no-dupe-args': warnedError,

        // disallow duplicate keys when creating object literals
        'no-dupe-keys': warnedError,

        // disallow a duplicate case label.
        'no-duplicate-case': warnedError,

        // disallow empty statements
        'no-empty': warnedError,

        // disallow the use of empty character classes in regular expressions
        'no-empty-character-class': warnedError,

        // disallow assigning to the exception in a catch block
        'no-ex-assign': warnedError,

        // disallow double-negation boolean casts in a boolean context
        // http://eslint.org/docs/rules/no-extra-boolean-cast
        'no-extra-boolean-cast': warnedError,

        // disallow unnecessary parentheses
        // http://eslint.org/docs/rules/no-extra-parens
        'no-extra-parens': [
            off,
            'all',
            {
                conditionalAssign: true,
                nestedBinaryExpressions: false,
                returnAssign: false,
            },
        ],

        // disallow unnecessary semicolons
        'no-extra-semi': warnedError,

        // disallow overwriting functions written as function declarations
        'no-func-assign': warnedError,

        // disallow function or variable declarations in nested blocks
        'no-inner-declarations': warnedError,

        // disallow invalid regular expression strings in the RegExp constructor
        'no-invalid-regexp': warnedError,

        // disallow irregular whitespace outside of strings and comments
        'no-irregular-whitespace': warnedError,

        // disallow the use of object properties of the global object (Math and JSON) as functions
        'no-obj-calls': warnedError,

        // disallow use of Object.prototypes builtins directly
        // http://eslint.org/docs/rules/no-prototype-builtins
        'no-prototype-builtins': warnedError,

        // disallow multiple spaces in a regular expression literal
        'no-regex-spaces': warnedError,

        // disallow sparse arrays
        'no-sparse-arrays': warnedError,

        // Disallow template literal placeholder syntax in regular strings
        // http://eslint.org/docs/rules/no-template-curly-in-string
        'no-template-curly-in-string': error,

        // Avoid code that looks like two expressions but is actually one
        // http://eslint.org/docs/rules/no-unexpected-multiline
        'no-unexpected-multiline': warnedError,

        // disallow unreachable statements after a return, throw, continue, or break statement
        'no-unreachable': error,

        // disallow return/throw/break/continue inside finally blocks
        // http://eslint.org/docs/rules/no-unsafe-finally
        'no-unsafe-finally': warnedError,

        // disallow negating the left operand of relational operators
        // http://eslint.org/docs/rules/no-unsafe-negation
        'no-unsafe-negation': warnedError,
        // disallow negation of the left operand of an in expression
        // deprecated in favor of no-unsafe-negation
        'no-negated-in-lhs': off,

        // disallow comparisons with the value NaN
        'use-isnan': warnedError,

        // ensure JSDoc comments are valid
        // http://eslint.org/docs/rules/valid-jsdoc
        'valid-jsdoc': off,

        // ensure that the results of typeof are compared against a valid string
        // http://eslint.org/docs/rules/valid-typeof
        'valid-typeof': [error, { requireStringLiterals: true }],

        //                  _
        //  _ _   __   _| | __
        // | '_ \ / _ \ / _` |/ _ \
        // | | | | () | (| |  __/
        // || ||\__/ \,|\___|

        // enforce return after a callback
        'callback-return': off,

        // require all requires be top-level
        // http://eslint.org/docs/rules/global-require
        'global-require': error,

        // enforces error handling in callbacks (node environment)
        'handle-callback-err': off,

        // disallow mixing regular variable and require declarations
        'no-mixed-requires': [off, false],

        // disallow use of new operator with the require function
        'no-new-require': warnedError,

        // disallow string concatenation with __dirname and __filename
        // http://eslint.org/docs/rules/no-path-concat
        'no-path-concat': warnedError,

        // disallow use of process.env
        'no-process-env': off,

        // disallow process.exit()
        'no-process-exit': off,

        // restrict usage of specified node modules
        'no-restricted-modules': off,

        // disallow use of synchronous methods (off by default)
        'no-sync': off,

        //      _         _
        //  _| |_ _   | | __
        // / _| _| | | | |/ _ \
        // \__ \ || || | |  __/
        // |_/\_|\, ||\___|
        //          |_/

        // enforce spacing inside array brackets
        'array-bracket-spacing': [warnedError, 'never'],

        // enforce spacing inside single-line blocks
        // http://eslint.org/docs/rules/block-spacing
        'block-spacing': [warnedError, 'always'],

        // enforce one true brace style
        'brace-style': [warnedError, '1tbs', { allowSingleLine: true }],

        // require camel case names
        camelcase: [_warnedError, { properties: 'never' }],

        // enforce or disallow capitalization of the first letter of a comment
        // http://eslint.org/docs/rules/capitalized-comments
        'capitalized-comments': [
            off,
            'never',
            {
                line: {
                    ignorePattern: '.*',
                    ignoreInlineComments: true,
                    ignoreConsecutiveComments: true,
                },
                block: {
                    ignorePattern: '.*',
                    ignoreInlineComments: true,
                    ignoreConsecutiveComments: true,
                },
            },
        ],

        // enforce spacing before and after comma
        'comma-spacing': [warnedError, { before: false, after: true }],

        // enforce one true comma style
        'comma-style': [warnedError, 'last'],

        // enforce padding inside computed properties
        'computed-property-spacing': [warnedError, 'never'],

        // enforces consistent naming when capturing the current execution context
        'consistent-this': off,

        // enforce newline at the end of file, with no multiple empty lines
        'eol-last': [warnedError, 'always'],

        // enforce spacing between functions and their invocations
        // http://eslint.org/docs/rules/func-call-spacing
        'func-call-spacing': warnedError,

        // requires function names to match the name of the variable or property to which they are
        // assigned
        // http://eslint.org/docs/rules/func-name-matching
        'func-name-matching': [
            off,
            'always',
            {
                includeCommonJSModuleExports: false,
            },
        ],

        // require function expressions to have a name
        // http://eslint.org/docs/rules/func-names
        'func-names': warn,

        // enforces use of function declarations or expressions
        // http://eslint.org/docs/rules/func-style
        // TODO: enable
        'func-style': [off, 'expression'],

        // Blacklist certain identifiers to prevent them being used
        // http://eslint.org/docs/rules/id-blacklist
        'id-blacklist': off,

        // this option enforces minimum and maximum identifier lengths
        // (variable names, property names etc.)
        'id-length': off,

        // require identifiers to match the provided regular expression
        'id-match': off,

        // enforces spacing between keys and values in object literal properties
        'key-spacing': [warnedError, { beforeColon: false, afterColon: true }],

        // require a space before & after certain keywords
        'keyword-spacing': [
            warnedError,
            {
                before: true,
                after: true,
                overrides: {
                    return: { after: true },
                    throw: { after: true },
                    case: { after: true },
                },
            },
        ],

        // enforce position of line comments
        // http://eslint.org/docs/rules/line-comment-position
        // TODO: enable?
        'line-comment-position': [
            off,
            {
                position: 'above',
                ignorePattern: '',
                applyDefaultPatterns: true,
            },
        ],

        // disallow mixed 'LF' and 'CRLF' as linebreaks
        // http://eslint.org/docs/rules/linebreak-style
        'linebreak-style': ['error', 'windows'],

        // enforces empty lines around comments
        'lines-around-comment': off,

        // require or disallow newlines around directives
        // http://eslint.org/docs/rules/lines-around-directive
        'lines-around-directive': [
            warnedError,
            {
                before: 'always',
                after: 'always',
            },
        ],

        // specify the maximum depth that blocks can be nested
        'max-depth': [off, 4],

        // specify the maximum length of a line in your program
        // http://eslint.org/docs/rules/max-len
        'max-len': [
            _warnedError,
            200,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],

        // specify the max number of lines in a file
        // http://eslint.org/docs/rules/max-lines
        'max-lines': [
            off,
            {
                max: 300,
                skipBlankLines: true,
                skipComments: true,
            },
        ],

        // specify the maximum depth callbacks can be nested
        'max-nested-callbacks': off,

        // limits the number of parameters that can be used in the function declaration.
        'max-params': [off, 3],

        // specify the maximum number of statement allowed in a function
        'max-statements': [off, 10],

        // restrict the number of statements per line
        // http://eslint.org/docs/rules/max-statements-per-line
        'max-statements-per-line': [off, { max: 1 }],

        // require multiline ternary
        // http://eslint.org/docs/rules/multiline-ternary
        // TODO: enable?
        'multiline-ternary': [off, 'never'],

        // require a capital letter for constructors
        'new-cap': [
            warnedError,
            {
                newIsCap: true,
                newIsCapExceptions: [],
                capIsNew: false,
                capIsNewExceptions: [
                    'Immutable.List',
                    'Immutable.Map',
                    'Immutable.OrderedMap',
                    'Immutable.Set',
                    'Immutable.OrderedSet',
                    'Immutable.Stack',
                ],
            },
        ],

        // disallow the omission of parentheses when invoking a constructor with no arguments
        // http://eslint.org/docs/rules/new-parens
        'new-parens': warnedError,

        // allow/disallow an empty newline after var statement
        'newline-after-var': off,

        // http://eslint.org/docs/rules/newline-before-return
        'newline-before-return': off,

        // enforces new line after each method call in the chain to make it
        // more readable and easy to maintain
        // http://eslint.org/docs/rules/newline-per-chained-call
        'newline-per-chained-call': [warnedError, { ignoreChainWithDepth: 4 }],

        // disallow use of the Array constructor
        'no-array-constructor': warnedError,

        // disallow use of bitwise operators
        // http://eslint.org/docs/rules/no-bitwise
        'no-bitwise': warnedError,

        // disallow use of the continue statement
        // http://eslint.org/docs/rules/no-continue
        'no-continue': warnedError,

        // disallow comments inline after code
        'no-inline-comments': off,

        // disallow if as the only statement in an else block
        // http://eslint.org/docs/rules/no-lonely-if
        'no-lonely-if': warnedError,

        // disallow un-paren'd mixes of different operators
        // http://eslint.org/docs/rules/no-mixed-operators
        'no-mixed-operators': [
            off,
            {
                groups: [
                    ['+', '-', '', '/', '%', '*'],
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: false,
            },
        ],

        // disallow mixed spaces and tabs for indentation
        'no-mixed-spaces-and-tabs': [warnedError, 'smart-tabs'],

        // disallow multiple empty lines and only one newline at the end
        'no-multiple-empty-lines': [
            warnedError,
            { max: 2, maxBOF: 0, maxEOF: 1 },
        ],

        // disallow negated conditions
        // http://eslint.org/docs/rules/no-negated-condition
        'no-negated-condition': off,

        // disallow nested ternary expressions
        'no-nested-ternary': warnedError,

        // disallow use of the Object constructor
        'no-new-object': warnedError,

        // disallow use of unary operators, ++ and --
        // http://eslint.org/docs/rules/no-plusplus
        'no-plusplus': warnedError,

        // disallow certain syntax forms
        // http://eslint.org/docs/rules/no-restricted-syntax
        'no-restricted-syntax': [
            warnedError,
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],

        // disallow space between function identifier and application
        'no-spaced-func': warnedError,

        // disallow tab characters entirely
        'no-tabs': off,

        // disallow the use of ternary operators
        'no-ternary': off,

        // disallow trailing whitespace at the end of lines
        'no-trailing-spaces': warnedError,

        // disallow dangling underscores in identifiers
        'no-underscore-dangle': [
            warnedError,
            {
                allowAfterThis: false,
                allow: [
                    '_build_',
                    '_env_',
                    '_libs_',
                    '_config_',
                    '_config_env_',
                    '_config_libs_',
                    '_PROD_',
                    '_DEV_',
                    '_DEV_SERVER_',
                    '_SERVER_',
                    '_CLIENT_',
                    '_INITIAL_STATE_',
                    '_RESOLVER_PAYLOAD_',
                    '_REDUX_DEVTOOLS_EXTENSION_COMPOSE_',
                    '_LOGS_',
                    '_DEBUG_',
                ],
            },
        ],

        // disallow the use of Boolean literals in conditional expressions
        // also, prefer `a || b` over `a ? a : b`
        // http://eslint.org/docs/rules/no-unneeded-ternary
        'no-unneeded-ternary': [warnedError, { defaultAssignment: false }],

        // disallow whitespace before properties
        // http://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': warnedError,

        // require padding inside curly braces
        'object-curly-spacing': [warnedError, 'always'],

        // enforce line breaks between braces
        // http://eslint.org/docs/rules/object-curly-newline
        // TODO: enable once https://github.com/eslint/eslint/issues/6488 is resolved
        'object-curly-newline': [
            off,
            {
                ObjectExpression: { minProperties: 0, multiline: true },
                ObjectPattern: { minProperties: 0, multiline: true },
            },
        ],

        // enforce "same line" or "multiple line" on object properties.
        // http://eslint.org/docs/rules/object-property-newline
        'object-property-newline': [
            warnedError,
            {
                allowMultiplePropertiesPerLine: true,
            },
        ],

        // allow just one var statement per function
        'one-var': [off, 'always'],

        // require a newline around variable declaration
        // http://eslint.org/docs/rules/one-var-declaration-per-line
        'one-var-declaration-per-line': [warnedError, 'initializations'],

        // require assignment operator shorthand where possible or prohibit it entirely
        // http://eslint.org/docs/rules/operator-assignment
        'operator-assignment': [warnedError, 'always'],

        // enforce operators to be placed before or after line breaks
        'operator-linebreak': off,

        // enforce padding within blocks
        'padded-blocks': [warnedError, 'never'],

        // require quotes around object literal property names
        // http://eslint.org/docs/rules/quote-props.html
        'quote-props': [
            warnedError,
            'as-needed',
            { keywords: false, unnecessary: true, numbers: false },
        ],

        // specify whether double or single quotes should be used
        quotes: [off, 'single', { avoidEscape: true }],

        // do not require jsdoc
        // http://eslint.org/docs/rules/require-jsdoc
        'require-jsdoc': off,

        // require or disallow use of semicolons instead of ASI
        semi: [warnedError, 'always'],

        // enforce spacing before and after semicolons
        'semi-spacing': [warnedError, { before: false, after: true }],

        // requires object keys to be sorted
        'sort-keys': [off, 'asc', { caseSensitive: false, natural: true }],

        // sort variables within the same declaration block
        'sort-vars': off,

        // require or disallow space before blocks
        'space-before-blocks': [
            warnedError,
            {
                functions: 'always',
                keywords: 'always',
                classes: 'always',
            },
        ],

        // require or disallow space before function opening parenthesis
        // http://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': [
            warnedError,
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],

        // require or disallow spaces inside parentheses
        'space-in-parens': warnedError,

        // require spaces around operators
        'space-infix-ops': warnedError,

        // Require or disallow spaces before/after unary operators
        // http://eslint.org/docs/rules/space-unary-ops
        'space-unary-ops': [
            warnedError,
            {
                words: true,
                nonwords: false,
                overrides: {},
            },
        ],

        // require or disallow a space immediately following the // or /* in a comment
        // http://eslint.org/docs/rules/spaced-comment
        'spaced-comment': [
            warnedError,
            'always',
            {
                line: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!'], // space here to support sprockets directives
                },
                block: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!'], // space here to support sprockets directives
                    balanced: false,
                },
            },
        ],

        // require or disallow the Unicode Byte Order Mark
        // http://eslint.org/docs/rules/unicode-bom
        'unicode-bom': [warnedError, 'never'],

        // require regex literals to be wrapped in parentheses
        'wrap-regex': off,

        //                  _       _     _
        // _   __ _ _ _() _ | |_ | | _  _
        // \ \ / / ` | '| |/ _` | ' \| |/ _ \/ __|
        //  \ V / (| | |  | | (| | |) | |  _/\__ \
        //   \_/ \_,||  ||\_,|./||\__||__/

        // enforce or disallow variable initializations at definition
        'init-declarations': off,

        // disallow the catch clause parameter name being the same as a variable in the outer scope
        'no-catch-shadow': off,

        // disallow deletion of variables
        'no-delete-var': warnedError,

        // disallow labels that share a name with a variable
        // http://eslint.org/docs/rules/no-label-var
        'no-label-var': warnedError,

        // disallow specific globals
        'no-restricted-globals': off,

        // disallow declaration of variables already declared in the outer scope
        'no-shadow': warnedError,

        // disallow shadowing of names such as arguments
        'no-shadow-restricted-names': warnedError,

        // disallow use of undeclared variables unless mentioned in a /*global */ block
        'no-undef': error,

        // disallow use of undefined when initializing variables
        'no-undef-init': warnedError,

        // disallow use of undefined variable
        // http://eslint.org/docs/rules/no-undefined
        'no-undefined': warn,

        // disallow declaration of variables that are not used in the code
        'no-unused-vars': [warnedError, { vars: 'local', args: 'after-used' }],

        // disallow use of variables before they are defined
        'no-use-before-define': error,

        //             __
        //   _  _ / /_
        //  / _ \/ _| ' \
        // |  _/\_ \ (_) |
        //  \__||_/\__/

        // enforces no braces where they can be omitted
        // http://eslint.org/docs/rules/arrow-body-style
        // TODO: enable requireReturnForObjectLiteral?
        'arrow-body-style': [
            warnedError,
            'as-needed',
            {
                requireReturnForObjectLiteral: false,
            },
        ],

        // require parens in arrow function arguments
        // http://eslint.org/docs/rules/arrow-parens
        'arrow-parens': [warnedError, 'as-needed'],

        // require space before/after arrow function's arrow
        // http://eslint.org/docs/rules/arrow-spacing
        'arrow-spacing': [warnedError, { before: true, after: true }],

        // verify super() callings in constructors
        'constructor-super': warnedError,

        // enforce the spacing around the * in generator functions
        // http://eslint.org/docs/rules/generator-star-spacing
        'generator-star-spacing': [warnedError, { before: false, after: true }],

        // disallow modifying variables of class declarations
        // http://eslint.org/docs/rules/no-class-assign
        'no-class-assign': warnedError,

        // disallow arrow functions where they could be confused with comparisons
        // http://eslint.org/docs/rules/no-confusing-arrow
        'no-confusing-arrow': [
            off,
            {
                allowParens: true,
            },
        ],

        // disallow modifying variables that are declared using const
        'no-const-assign': error,

        // disallow duplicate class members
        // http://eslint.org/docs/rules/no-dupe-class-members
        'no-dupe-class-members': warnedError,

        // disallow importing from the same path more than once
        // http://eslint.org/docs/rules/no-duplicate-imports
        // replaced by https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
        'no-duplicate-imports': off,

        // disallow symbol constructor
        // http://eslint.org/docs/rules/no-new-symbol
        'no-new-symbol': warnedError,

        // disallow specific imports
        // http://eslint.org/docs/rules/no-restricted-imports
        'no-restricted-imports': off,

        // disallow to use this/super before super() calling in constructors.
        // http://eslint.org/docs/rules/no-this-before-super
        'no-this-before-super': warnedError,

        // disallow useless computed property keys
        // http://eslint.org/docs/rules/no-useless-computed-key
        'no-useless-computed-key': warnedError,

        // disallow unnecessary constructor
        // http://eslint.org/docs/rules/no-useless-constructor
        'no-useless-constructor': warnedError,

        // disallow renaming import, export, and destructured assignments to the same name
        // http://eslint.org/docs/rules/no-useless-rename
        'no-useless-rename': [
            warnedError,
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],

        // require let or const instead of var
        'no-var': warnedError,

        // require method and property shorthand syntax for object literals
        // http://eslint.org/docs/rules/object-shorthand
        'object-shorthand': [
            warnedError,
            'always',
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],

        // suggest using arrow functions as callbacks
        'prefer-arrow-callback': [
            warnedError,
            {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            },
        ],

        // suggest using of const declaration for variables that are never modified after declared
        'prefer-const': [
            warnedError,
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: true,
            },
        ],

        // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        // http://eslint.org/docs/rules/prefer-numeric-literals
        'prefer-numeric-literals': warnedError,

        // suggest using Reflect methods where applicable
        // http://eslint.org/docs/rules/prefer-reflect
        // TODO: enable?
        'prefer-reflect': off,

        // use rest parameters instead of arguments
        // http://eslint.org/docs/rules/prefer-rest-params
        'prefer-rest-params': warnedError,

        // suggest using the spread operator instead of .apply()
        // http://eslint.org/docs/rules/prefer-spread
        'prefer-spread': warnedError,

        // suggest using template literals instead of string concatenation
        // http://eslint.org/docs/rules/prefer-template
        'prefer-template': warnedError,

        // disallow generator functions that do not have yield
        // http://eslint.org/docs/rules/require-yield
        'require-yield': warnedError,

        // enforce spacing between object rest-spread
        // http://eslint.org/docs/rules/rest-spread-spacing
        'rest-spread-spacing': [warnedError, 'never'],

        // import sorting
        // http://eslint.org/docs/rules/sort-imports
        'sort-imports': [
            off,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],

        // require a Symbol description
        // http://eslint.org/docs/rules/symbol-description
        'symbol-description': warnedError,

        // enforce usage of spacing in template strings
        // http://eslint.org/docs/rules/template-curly-spacing
        'template-curly-spacing': [warnedError, 'never'],

        // enforce spacing around the * in yield* expressions
        // http://eslint.org/docs/rules/yield-star-spacing
        'yield-star-spacing': [warnedError, 'after'],

        //  _                            _
        // () _ __  _ _   __  _ _| |
        // | | '_ ` _ \| '_ \ / _ \| '_| _|
        // | | | | | | | |) | () | |  | |_
        // ||| || || ._/ \_/||   \__|
        //             |_|

        // Static analysis:

        // ensure imports point to files/modules that can be resolved
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
        'import/no-unresolved': [
            warnedError,
            { commonjs: true, amd: true, caseSensitive: true },
        ],

        // ensure named imports coupled with named exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
        'import/named': error,

        // ensure default import coupled with default export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/default.md#when-not-to-use-it
        'import/default': error,

        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md
        'import/namespace': error,

        // Helpful warnings:

        // disallow invalid exports, e.g. multiple defaults
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
        'import/export': warnedError,

        // do not allow a default import name to match a named export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
        'import/no-named-as-default': __warnedError,

        // warn on accessing default export property names that are also named exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
        'import/no-named-as-default-member': warnedError,

        // disallow use of jsdoc-marked-deprecated imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
        'import/no-deprecated': off,

        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        // paths are treated both as absolute paths, and relative to process.cwd()
        'import/no-extraneous-dependencies': [
            _warnedError,
            {
                devDependencies: [
                    'test/**', // tape, common npm pattern
                    'tests/**', // also common npm pattern
                    'spec/**', // mocha, rspec-like pattern
                    '*/_tests_/*', // jest pattern
                    'test.js', // repos with a single test file
                    'test-*.js', // repos with multiple top-level test files
                    '*/.test.js', // tests where the extension denotes that it is a test
                    '**/webpack.config.js', // webpack config
                    '*/webpack.config..js', // webpack config
                    '**/rollup.config.js', // rollup config
                    '**/gulpfile.js', // gulp config
                    '**/Gruntfile', // grunt config
                ],
                optionalDependencies: false,
            },
        ],

        // Forbid mutable exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
        'import/no-mutable-exports': warnedError,

        // Module systems:

        // disallow require()
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
        'import/no-commonjs': off,

        // disallow AMD require/define
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
        'import/no-amd': warnedError,

        // No Node.js builtin modules
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
        // TODO: enable?
        'import/no-nodejs-modules': off,

        // Style guide:

        // disallow non-import statements appearing before import statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
        'import/first': [warnedError, 'absolute-first'],

        // disallow non-import statements appearing before import statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/imports-first.md
        // deprecated: use `import/first`
        'import/imports-first': off,

        // disallow duplicate imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
        'import/no-duplicates': warnedError,

        // disallow namespace imports
        // TODO: enable?
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
        'import/no-namespace': off,

        // Ensure consistent use of file extension within the import path
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': [
            warnedError,
            'always',
            {
                js: 'never',
                jsx: 'never',
            },
        ],

        // Enforce a convention in module import order
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
        // TODO: enable?
        'import/order': [
            off,
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'never',
            },
        ],

        // Require a newline after the last import/require in a group
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
        'import/newline-after-import': warnedError,

        // Require modules with a single export to use a default export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
        'import/prefer-default-export': __warnedError,

        // Restrict which files can be imported in a given folder
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
        'import/no-restricted-paths': off,

        // Forbid modules to have too many dependencies
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
        'import/max-dependencies': [off, { max: 10 }],

        // Forbid import of modules using absolute paths
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
        'import/no-absolute-path': warnedError,

        // Forbid require() calls with expressions
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
        'import/no-dynamic-require': off,

        // prevent importing the submodules of other modules
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
        'import/no-internal-modules': [
            off,
            {
                allow: [],
            },
        ],

        // Warn if a module could be mistakenly parsed as a script by a consumer
        // leveraging Unambiguous JavaScript Grammar
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
        // this should not be enabled until this proposal has at least been presented to TC39.
        // At the moment, it's not a thing.
        'import/unambiguous': off,

        // Forbid Webpack loader syntax in imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
        'import/no-webpack-loader-syntax': warnedError,

        // Prevent unassigned imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md
        // importing for side effects is perfectly acceptable, if you need side effects.
        'import/no-unassigned-import': off,

        // Prevent importing the default as if it were named
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
        'import/no-named-default': warnedError,

        //                      _
        //  _ _ __  _ _  _| |
        // | '_/ _ \/ _` |/ _| __|
        // | | |  _/ (| | (_| |
        // ||  \_|\,|\__|\_|
        //
        // View link below for react rules documentation
        // https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules

        // Specify whether double or single quotes should be used in JSX attributes
        // http://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': [_warnedError, 'prefer-double'],

        // enforce that class methods use "this"
        // http://eslint.org/docs/rules/class-methods-use-this
        'class-methods-use-this': [
            warnedError,
            {
                exceptMethods: [
                    'render',
                    'getInitialState',
                    'getDefaultProps',
                    'getChildContext',
                    'componentWillMount',
                    'componentDidMount',
                    'componentWillReceiveProps',
                    'shouldComponentUpdate',
                    'componentWillUpdate',
                    'componentDidUpdate',
                    'componentWillUnmount',
                ],
            },
        ],

        // Prevent missing displayName in a React component definition
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
        'react/display-name': [off, { ignoreTranspilerName: false }],

        // Forbid certain propTypes (any, array, object)
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
        'react/forbid-prop-types': [
            warnedError,
            { forbid: ['any', 'array', 'object'] },
        ],

        // Enforce boolean attributes notation in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-boolean-value': [warnedError, 'never'],

        // Validate closing bracket location in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': [warnedError, 'line-aligned'],

        // Enforce or disallow spaces inside of curly braces in JSX attributes
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-curly-spacing': [
            warnedError,
            'never',
            { allowMultiline: true },
        ],

        // Enforce event handler naming conventions in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': [
            off,
            {
                eventHandlerPrefix: 'handle',
                eventHandlerPropPrefix: 'on',
            },
        ],

        // Validate props indentation in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': [warnedError, 2],

        // Validate JSX has key prop when in array or iterator
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-key': off,

        // Limit maximum of props on a single line in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        'react/jsx-max-props-per-line': [off, { maximum: 1 }],

        // Prevent usage of .bind() in JSX props
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-bind': [
            warnedError,
            {
                ignoreRefs: true,
                allowArrowFunctions: true,
                allowBind: false,
            },
        ],

        // Prevent duplicate props in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        'react/jsx-no-duplicate-props': [warnedError, { ignoreCase: true }],

        // Prevent usage of unwrapped JSX strings
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
        'react/jsx-no-literals': off,

        // Disallow undeclared variables in JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        'react/jsx-no-undef': error,

        // Enforce PascalCase for user-defined JSX components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': [
            warnedError,
            {
                allowAllCaps: true,
                ignore: [],
            },
        ],

        // Enforce propTypes declarations alphabetical sorting
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
        'react/sort-prop-types': [
            off,
            {
                ignoreCase: true,
                callbacksLast: false,
                requiredFirst: false,
            },
        ],

        // Deprecated in favor of react/jsx-sort-props
        'react/jsx-sort-prop-types': off,

        // Enforce props alphabetical sorting
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/jsx-sort-props': [
            off,
            {
                ignoreCase: true,
                callbacksLast: false,
                shorthandFirst: false,
                shorthandLast: false,
            },
        ],

        // Prevent React to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': warnedError,

        // Prevent variables used in JSX to be incorrectly marked as unused
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-uses-vars': error,

        // Prevent usage of dangerous JSX properties
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': warn,

        // Prevent usage of deprecated methods
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': [warnedError],

        // Prevent usage of setState in componentDidMount
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        'react/no-did-mount-set-state': [warnedError],

        // Prevent usage of setState in componentDidUpdate
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        'react/no-did-update-set-state': [warnedError],

        // Prevent direct mutation of this.state
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': off,

        // Prevent usage of isMounted
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-is-mounted': warnedError,

        // Prevent multiple component definition per file
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
        'react/no-multi-comp': [__warnedError, { ignoreStateless: true }],

        // Prevent usage of setState
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
        'react/no-set-state': off,

        // Prevent using string references
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': __warnedError,

        // Prevent usage of unknown DOM property
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': warnedError,

        // Require ES6 class declarations over React.createClass
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': [warnedError, 'always'],

        // Require stateless functions when not using lifecycle methods, setState or ref
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': warnedError,

        // Prevent missing props validation in a React component definition
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': [
            _warnedError,
            { ignore: [], customValidators: [] },
        ],

        // Prevent missing React when using JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': error,

        // Restrict file extensions that may be required
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-extension.md
        // deprecated in favor of import/extensions
        'react/require-extension': [off, { extensions: ['.jsx', '.js'] }],

        // Require render() methods to return something
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/require-render-return': warnedError,

        // Prevent extra closing tags for components without children
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/self-closing-comp': _warnedError,

        // Enforce spaces before the closing bracket of self-closing JSX elements
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': [
            warnedError,
            {
                beforeSelfClosing: 'always',
            },
        ],

        // Enforce component methods order
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': [
            warnedError,
            {
                order: [
                    'static-methods',
                    'lifecycle',
                    '/^on.+$/',
                    '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                    'everything-else',
                    '/^render.+$/',
                    'render',
                ],
            },
        ],

        // Prevent missing parentheses around multilines JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': [
            off,
            {
                declaration: true,
                assignment: true,
                return: true,
            },
        ],
        'react/wrap-multilines': off, // deprecated version

        // Require that the first prop in a JSX element be on a new line when the element is multiline
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': [warnedError, 'multiline'],

        // Enforce spacing around jsx equals signs
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': [warnedError, 'never'],

        // Disallow target="_blank" on links
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-target-blank': _warnedError,

        // only .jsx files may have JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': [
            __warnedError,
            { extensions: ['.jsx'] },
        ],

        // prevent accidental JS comments from being injected into JSX as text
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
        'react/jsx-no-comment-textnodes': warnedError,
        'react/no-comment-textnodes': off, // deprecated version

        // disallow using React.render/ReactDOM.render's return value
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-render-return-value': warnedError,

        // require a shouldComponentUpdate method, or PureRenderMixin
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
        'react/require-optimization': [off, { allowDecorators: [] }],

        // warn against using findDOMNode()
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': warnedError,

        // Forbid certain props on Components
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
        'react/forbid-component-props': [off, { forbid: [] }],

        // Prevent problem with children and props.dangerouslySetInnerHTML
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-danger-with-children': warnedError,

        // Prevent unused propType definitions
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': [
            warnedError,
            {
                customValidators: [],
                skipShapeProps: true,
            },
        ],

        // Require style prop value be an object or var
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/style-prop-object': warnedError,

        // Prevent invalid characters from appearing in markup
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': _warnedError,

        // Prevent passing of children as props
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
        'react/no-children-prop': warnedError,

        // Validate whitespace in and around the JSX opening and closing brackets
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': [
            warnedError,
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
            },
        ],

        // Prevent usage of Array index in keys
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': warnedError,

        // Enforce a defaultProps definition for every prop that is not a required prop
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': warnedError,

        //    _                     _ _
        //   ()__  _      _ | | |   _
        //   | / _\ \/ /_ / _` | | | | | |
        //   | \__ \>  <__| (| | | | |_| |
        //  / |_//\_\     \_,|||\__, |
        // |_/                         |__/

        // Enforce that anchors have content
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md
        'jsx-a11y/anchor-has-content': [warnedError, { components: [''] }],

        // Require ARIA roles to be valid and non-abstract
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
        'jsx-a11y/aria-role': warnedError,

        // Enforce all aria-* props are valid.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
        'jsx-a11y/aria-props': warnedError,

        // Enforce ARIA state and property values are valid.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
        'jsx-a11y/aria-proptypes': warnedError,

        // Enforce that elements that do not support ARIA roles, states, and
        // properties do not have those attributes.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md
        'jsx-a11y/aria-unsupported-elements': warnedError,

        // disallow href "#"
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': [__warnedError, { components: ['Link'] }],

        // Require <img> to have a non-empty `alt` prop, or role="presentation"
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-has-alt.md
        'jsx-a11y/alt-text': warnedError,

        // Prevent img alt text from containing redundant words like "image", "picture", or "photo"
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md
        'jsx-a11y/img-redundant-alt': warnedError,

        // require that JSX labels use "htmlFor"
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': [warnedError, { 
          components: ['Label'],
          "required": {
                "every": [ "nesting", "id" ]
            },
            "allowChildren": false
        }],

        // require that mouseover/out come with focus/blur, for keyboard-only users
        // TODO: evaluate
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        'jsx-a11y/mouse-events-have-key-events': off,

        // Prevent use of `accessKey`
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
        'jsx-a11y/no-access-key': warnedError,

        // require onBlur instead of onChange
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-onchange.md
        'jsx-a11y/no-onchange': off,

        // Enforce that elements with onClick handlers must be focusable.
        // TODO: evaluate
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
        'jsx-a11y/interactive-supports-focus': off,

        // require things with onClick to have an aria role
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
        'jsx-a11y/no-static-element-interactions': off,

        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
        'jsx-a11y/no-noninteractive-element-interactions': off,

        // Enforce that elements with ARIA roles must have all required attributes
        // for that role.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
        'jsx-a11y/role-has-required-aria-props': warnedError,

        // Enforce that elements with explicit or implicit roles defined contain
        // only aria-* properties supported by that role.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
        'jsx-a11y/role-supports-aria-props': warnedError,

        // Enforce tabIndex value is not greater than zero.
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
        'jsx-a11y/tabindex-no-positive': warnedError,

        // ensure <hX> tags have content and are not aria-hidden
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md
        'jsx-a11y/heading-has-content': [warnedError, { components: [''] }],

        // require HTML elements to have a "lang" prop
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md
        'jsx-a11y/html-has-lang': warnedError,

        // require HTML element's lang prop to be valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
        'jsx-a11y/lang': warnedError,

        // prevent distracting elements
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md
        'jsx-a11y/no-distracting-elements': [
            warnedError,
            { elements: ['marquee', 'blink'] },
        ],

        // only allow <th> to have the "scope" attr
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
        'jsx-a11y/scope': warnedError,

        // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
        // TODO: enable?
        'jsx-a11y/click-events-have-key-events': off,

        // Enforce that DOM elements without semantic behavior not have interaction handlers
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
        'jsx-a11y/no-static-element-interactions': __warnedError,
    },
};
