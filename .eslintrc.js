module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "import/extensions": 0,
        "react/jsx-filename-extension": 0,
        "import/no-unresolved": 0,
        "import/no-extraneous-dependencies": 0,
        "jsx-a11y/no-static-element-interactions":0,
        "jsx-a11y/click-events-have-key-events":0,
        "react/prop-types": 1,
        "no-param-reassign": 1,
        "no-underscore-dangle": 1,
        "global-require": 1
    },
    "globals":{
    },
    "env":{
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
    }
};