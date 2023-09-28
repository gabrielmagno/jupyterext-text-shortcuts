import { isEqual, pick } from "lodash/fp";
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import { CodeEditor } from '@jupyterlab/codeeditor';

const getPaddingText = (
    pos1: CodeEditor.IPosition,
    pos2: CodeEditor.IPosition,
    lastPos: CodeEditor.IPosition,
    ch: string
): string => {
    const pickPos = pick(["line", "column"]);

    // End of line
    if (isEqual(pickPos(pos2), pickPos(lastPos))) return " ";

    // Nothing selected
    if (isEqual(pickPos(pos1), pickPos(pos2))) return "";

    // Already padded
    if (ch === " ") return "";

    // Not yet padded
    return " ";
};

export const getPaddedTextToInsert = (
    editor: CodeMirrorEditor,
    textToInsert: string
): string => {

    const lastLineIndex = editor.lastLine();
    const lastLine = editor.getLine(lastLineIndex);
    const lastLineSize = lastLine ? lastLine.length : 0;
    const lastPos: CodeEditor.IPosition = {
        line: lastLineIndex,
        column: lastLineSize,
    };
    const firstPos: CodeEditor.IPosition = {
        line: 0,
        column: 0,
    };

    const selection = editor.getSelection();
    const from = selection.start;
    const to = selection.end;

    let extFrom = from;
    if (from.line != firstPos.line || from.column != firstPos.column) {
        extFrom = {line: from.line, column: from.column - 1};
    }

    let extTo = to
    if (to.line != lastPos.line || to.column != lastPos.column) {
        extTo = {line: from.line, column: from.column + 1};
    }

    const extSelectedText = editor.getRange(
        {line: extFrom.line, ch: extFrom.column},
        {line: extTo.line, ch: extTo.column},
    );

    const leftCh = getPaddingText(
        from,
        extFrom,
        lastPos,
        extSelectedText.slice(0, 1)
    );
    const rightCh = getPaddingText(
        to,
        extTo,
        lastPos,
        extSelectedText.slice(-1)
    );
    const paddedTextToInsert = `${leftCh}${textToInsert}${rightCh}`;

    return paddedTextToInsert;
};
