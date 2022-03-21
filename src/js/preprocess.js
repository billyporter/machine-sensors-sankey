

/*************************************
     * 
     * 
     * 
     *              PreProcess
     * 
     * 
     ************************************** 
     */


function formatPath(path) {
    return path.slice(1, -1).split(',');
}

function convertToGradeFormat(coordinate) {

    let gradeMap = new Map();
    gradeMap.set('A', 90);
    gradeMap.set('B', 80);
    gradeMap.set('C', 70);
    gradeMap.set('H', 60);
    gradeMap.set('J', 50);
    gradeMap.set('K', 40);

    let letter = coordinate[0];
    let number = parseInt(coordinate.slice(3, coordinate.length));
    return parseInt(gradeMap.get(letter)) + number;
}

function convertToGrades(rawData1) {
    let processedData = {};
    let temp_array = ["Exam 1", "Exam 2", "Exam 3", " Final Exam"];

    // Get exam count
    let numExams = 1;
    for (const entry of Object.entries(rawData1)) {
        let currLength = formatPath(entry[1].path).length
        if (currLength > numExams) {
            numExams = currLength;
        }
    }

    // Build Object
    let uniqueID = 0;
    for (const entry of Object.entries(rawData1)) {
        let baseObject = {
            "Exam 1": "",
            "Exam 2": "",
            "Exam 3": "",
            " Final Exam": ""
        }

        let currPath = formatPath(entry[1].path)
        // let count = entry[1].count;
        let count = entry[1].path_max;
        for (let i = 0; i < currPath.length; i++) {
            let currNode = currPath[i].trim();
            let currExam = temp_array[i];
            let number = convertToGradeFormat(currNode);
            baseObject[currExam] = number.toString();
        }

        for (let i = 0; i < count; i++) {
            processedData[uniqueID] = baseObject;
            uniqueID++;
        }
        uniqueID++;
    }
    return processedData;
}

let rawData = convertToGrades(rawData1);


function gradeScaleLocal(score) {
    if (!score) {
        return "";
    }
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else if (score >= 50) {
        return "E";
    } else {
        return "F";
    }
}

/** Returns specific letter */
function specificLetterScaleLocal(letter, number) {
    const secondDigit = parseInt(number.toString()[number.toString().length - 1]);
    if (secondDigit >= 7) {
        return letter.concat("+");
    }
    else if (secondDigit >= 4) {
        return letter.concat("def")
    }
    else {
        return letter.concat("-");
    }
}

/** Returns specific tree */
function specificLetterScaleTree(letter, number) {
    const secondDigit = parseInt(number.toString()[number.toString().length - 1]);
    if (secondDigit >= 7) {
        return letter.concat("+");
    }
    else if (secondDigit >= 4) {
        return letter.concat("#")
    }
    else {
        return letter.concat("-");
    }
}

let gradeCoordinatesMap = new Map([
    ['A', 'A'],
    ['B', 'B'],
    ['C', 'C'],
    ['D', 'H'],
    ['E', 'J'],
    ['F', 'K'],
    ['A+', 'Ax'],
    ['Adef', 'Ay'],
    ['A-', 'Az'],
    ['B+', 'Bx'],
    ['Bdef', 'By'],
    ['B-', 'Bz'],
    ['C+', 'Cx'],
    ['Cdef', 'Cy'],
    ['C-', 'Cz'],
    ['D+', 'Hx'],
    ['Ddef', 'Hy'],
    ['D-', 'Hz'],
    ['E+', 'Jx'],
    ['Edef', 'Jy'],
    ['E-', 'Jz'],
    ['F+', 'Kx'],
    ['Fdef', 'Ky'],
    ['F-', 'Kz'],
]);

let gradeCoordinatesMap1 = new Map([
    ['A', 'A'],
    ['B', 'B'],
    ['C', 'C'],
    ['D', 'H'],
    ['E', 'J'],
    ['F', 'K'],
    ['A+', 'x'],
    ['A#', 'y'],
    ['A-', 'z'],
    ['B+', 'x'],
    ['B#', 'y'],
    ['B-', 'z'],
    ['C+', 'x'],
    ['C#', 'y'],
    ['C-', 'z'],
    ['D+', 'x'],
    ['D#', 'y'],
    ['D-', 'z'],
    ['E+', 'x'],
    ['E#', 'y'],
    ['E-', 'z'],
    ['F+', 'x'],
    ['F#', 'y'],
    ['F-', 'z'],
]);

let gradeCoordinatesMap2 = new Map([
    ['A', 'A'],
    ['B', 'B'],
    ['C', 'C'],
    ['D', 'H'],
    ['E', 'J'],
    ['F', 'K'],
    ['A+', 'Ax'],
    ['A#', 'Ay'],
    ['A-', 'Az'],
    ['B+', 'Bx'],
    ['B#', 'By'],
    ['B-', 'Bz'],
    ['C+', 'Cx'],
    ['C#', 'Cy'],
    ['C-', 'Cz'],
    ['D+', 'Hx'],
    ['D#', 'Hy'],
    ['D-', 'Hz'],
    ['E+', 'Jx'],
    ['E#', 'Jy'],
    ['E-', 'Jz'],
    ['F+', 'Kx'],
    ['F#', 'Ky'],
    ['F-', 'Kz'],
]);


function gradeCoordinateHelper(name, assessment, gradeMap, flag, treeFlag) {
    const allLetters = new Set(["A", "B", "C", "D", "F", "E"]);
    if (allLetters.has(name)) {
        let stringToInput = assessment;
        if (assessment.localeCompare('Final Exam') === 0) {
            if (!flag) {
                stringToInput = ' '.concat(assessment);
            }
        }
        currLevel = gradeMap[stringToInput][name]["level"];
        if (currLevel > 0) {
            if (treeFlag) {
                return name + "#";
            }
            return name + "def";
        }
        else {
            return name;
        }
    }
    else {
        return name;
    }
}

function gradeCoordinatesMapFunction(grade) {
    if (isNaN(grade)) {
        return gradeCoordinatesMap.get(grade);
    }
    else {
        let letter = gradeScaleLocal(grade);
        let specLetter = specificLetterScaleLocal(letter, grade);
        let gradeMap = gradeCoordinatesMap.get(specLetter);
        return gradeMap + '0' + grade.toString()[1];
    }
}

function gradeCoordinatesMapFunction1(grade) {
    if (isNaN(grade)) {
        return gradeCoordinatesMap1.get(grade);
    }
    else {
        return '0' + grade.toString()[1];
    }
}

function gradeCoordinatesMapFunction2(grade) {
    if (isNaN(grade)) {
        return gradeCoordinatesMap2.get(grade);
    }
    else {
        let letter = gradeScaleLocal(grade);
        console.log(letter)
        let specLetter = specificLetterScaleTree(letter, grade);
        console.log(specLetter)
        let gradeMap = gradeCoordinatesMap2.get(specLetter);
        console.log(gradeMap)
        return gradeMap + '0' + grade.toString()[1];
    }
}

// TODO: Update sort function to order nodes according to peeter
let nodeRanking = new Map([
    ['A', 6],
    ['B', 3],
    ['C', 5],
    ['H', 2],
    ['J', 1],
    ['K', 4],
]);

function sortSensorNodes(a, b) {

    // Step 1: Convert names to sensor representation
    // Done
    let aSensor = a.sensorName;
    let bSensor = b.sensorName;

    // Step 2: Rank
    // Compare Level 1
    let aRank1 = nodeRanking.get(aSensor[0]);
    let bRank1 = nodeRanking.get(bSensor[0]);
    if (aRank1 > bRank1) {
        return 1;
    }
    else if (bRank1 > aRank1) {
        return -1;
    }
    else {
        /* As of now this works, but may need to compare further levels */
        return aSensor > bSensor;
    }
}

function inflowSensorSort(a, b) {
    // Step 1: Convert names to sensor representation
    // Done
    let aSensor = a.name;
    let bSensor = b.name;

    // Compare Level 1
    let aRank1 = nodeRanking.get(gradeCoordinatesMap.get(aSensor[0]));
    let bRank1 = nodeRanking.get(gradeCoordinatesMap.get(bSensor[0]));
    if (aRank1 > bRank1) {
        return 1;
    }
    else if (bRank1 > aRank1) {
        return -1;
    }
    else {
        /* As of now this works, but may need to compare further levels */
        let aRank2 = nodeRanking.get(gradeCoordinatesMap.get(aSensor[1]));
        let bRank2 = nodeRanking.get(gradeCoordinatesMap.get(bSensor[1]));
        if (aRank2 > bRank2) {
            return 1;
        }
        else if (bRank2 > aRank2) {
            return -1;
        }
        return aSensor > bSensor;
    }


    return a.name > b.name;
};


function normalizeNum(num) {
    console.log(num)
    num = parseInt(num)
    if (num < 4) {
        return num.toString()
    }
    if (num < 7) {
        return num.toString() - 4
    }
    return num.toString() - 7;
}