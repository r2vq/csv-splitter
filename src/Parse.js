export function parse(file, onParse, maxLines) {
    csvToArray(file, (lines) => {
        let arrays = arrayToArrays(lines, maxLines);
        let files = arraysToFiles(arrays);
        onParse(files);
    })
};

const arrayToArrays = (array, maxLines) => {
    let arrays = [];
    if (array.length === 0) {
        return arrays;
    }

    let headers = array[0];
    let lineCount = 0;
    let current;
    for (let i = 1; i < array.length; i++) {
        if (lineCount === 0) {
            current = [headers];
            arrays.push(current);
        }

        current.push(array[i]);

        lineCount += 1;
        if (lineCount >= maxLines) {
            lineCount = 0;
        }
    }
    return arrays;
};

const arraysToFiles = (arrays,) => {
    let files = [];
    for (let i = 0; i < arrays.length; i++) {
        let arrayRow = arrays[i];
        let body = "";
        for (let j = 0; j < arrayRow.length; j++) {
            body += `${arrayRow[j]}\n`;
        }
        let file = new Blob([body], { type: "text/plain" });
        files.push(file);
    }
    return files;
};

const csvToArray = (file, onLoad) => {
    let reader = new FileReader();
    reader.onload = e => onLoad(e.target.result.split("\n").filter(line => line.length > 0));
    reader.readAsText(file);
};