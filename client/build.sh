#!/usr/bin/env bash
webpack
uglifyjs app.js -o app.min.js
