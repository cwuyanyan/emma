"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path = require("path");
const chalk = require("chalk");
const stringWidth = require("string-width");
const modules_1 = require("../modules");
exports.ICON_ELLIPSIS = '…';
exports.ICON_SUCCESS = '✔';
exports.ICON_FAILURE = '✖';
exports.SPINNER_FRAMES = process.platform === 'win32' ?
    ['-', '\\', '|', '/'] :
    ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
function prettyPath(p) {
    p = path.resolve(p);
    const cwd = process.cwd();
    const d = path.dirname(p);
    const h = os.homedir();
    const distanceFromCwd = Math.abs(d.split(path.sep).length - cwd.split(path.sep).length);
    if (cwd === d) {
        return '.' + path.sep + path.basename(p);
    }
    else if (d.startsWith(cwd)) {
        return '.' + path.sep + p.substring(cwd.length + 1);
    }
    else if (distanceFromCwd <= 2) {
        const rel = path.relative(cwd, p);
        return rel ? rel : '.';
    }
    else if (p === h) {
        return '~';
    }
    else if (p.indexOf(h) === 0) {
        return '~' + path.sep + p.substring(h.length + 1);
    }
    return p;
}
exports.prettyPath = prettyPath;
function indent(n = 4) {
    return new Array(n).fill(' ').join('');
}
exports.indent = indent;
function generateFillSpaceStringList(list, optimalLength = 1, fillCharacter = ' ') {
    const sliceAnsi = modules_1.load('slice-ansi');
    const longestItem = Math.max(...list.map((item) => stringWidth(item)));
    const fullLength = longestItem > optimalLength ? longestItem + 1 : optimalLength;
    const fullLengthString = Array(fullLength).fill(fillCharacter).join('');
    return list.map(item => sliceAnsi(fullLengthString, 0, fullLength - stringWidth(item)));
}
exports.generateFillSpaceStringList = generateFillSpaceStringList;
function columnar(rows, { hsep = chalk.dim('-'), vsep = chalk.dim('|'), columnHeaders } = {}) {
    const includeHeaders = columnHeaders ? true : false;
    if (!rows[0]) {
        return '';
    }
    const columnCount = columnHeaders ? columnHeaders.length : rows[0].length;
    const columns = columnHeaders ?
        columnHeaders.map(header => [chalk.bold(header)]) :
        new Array(columnCount).fill([]).map(() => []);
    for (let row of rows) {
        for (let i in row) {
            if (columns[i]) {
                columns[i].push(row[i]);
            }
        }
    }
    const paddedColumns = columns.map((col, i) => {
        if (i < columnCount - 1) {
            const spaceCol = generateFillSpaceStringList(col);
            return col.map((cell, i) => `${cell}${spaceCol[i]}${vsep} `);
        }
        else {
            return col;
        }
    });
    let longestRowLength = 0;
    const singleColumn = paddedColumns.reduce((a, b) => {
        return a.map((_, i) => {
            const r = a[i] + b[i];
            longestRowLength = Math.max(longestRowLength, stringWidth(r));
            return r;
        });
    });
    if (includeHeaders) {
        singleColumn.splice(1, 0, hsep.repeat(longestRowLength));
    }
    return singleColumn.join('\n');
}
exports.columnar = columnar;
