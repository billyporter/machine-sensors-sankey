function treeJS() {
    /*************************************
    * 
    * 
    * 
    *              Header
    * 
    * 
    ************************************** 
    */

    const margin = { top: 50, right: 50, bottom: 10, left: 10 }
    const width = 960 - margin.left - margin.right; //890;
    const height = 740 - margin.top - margin.bottom; //740;
    const legendWidth = 600;
    const legendHeight = 900;

    /* Sets up svg */
    const svg = d3.select("#canvas")
        .attr("width", width + margin.left + 50 + margin.right + 500)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(50, 30)");
    /*************************************
     * 
     * 
     * 
     *              Util-Sankey
     * 
     * 
     ************************************** 
     */


    /* Constants */
    const assessments = ["Exam 1", "Exam 2", "Exam 3", " Final Exam"];
    const assessTrim = ["Exam 1", "Exam 2", "Exam 3", "Final Exam"];
    const grades = ["A", "B", "C", "D", "F", "E"];

    const letrs = new Set(["A", "B", "C", "D", "F", "E"]);
    const svgBackground = "#eff";
    const svgBorder = "1px solid #333";
    let padding = 45;
    const nodeWdt = 31;
    const deflineColor = "#90A4AE";
    let isActive = false;
    let activeLink = -1;
    const gradeCountDict = {};
    const sankeyColor = d3.scaleOrdinal()
        .domain(['A', 'B', 'C', 'D', 'F', 'E'])
        .range([d3.hsv(179, 1.0, 0.416), d3.hsv(27, 0.996, 0.937), d3.hsv(64, 0.748, 0.792), d3.hsv(0, 0.798, 0.776), d3.hsv(47, 0.749, 1), d3.hsv(328, .897, .533)]);
    const assessGradeLevelMap = {};
    const blacklist = new Set();

    /* converts from hex color code to rgb color code struct */
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /* converts from rgb color code struct to hex color code */
    function rgbToHex(rgb) {
        hex = rgb.r.toString(16);
        r = hex.length == 1 ? "0" + hex : hex;
        hex = rgb.g.toString(16);
        g = hex.length == 1 ? "0" + hex : hex;
        hex = rgb.b.toString(16);
        b = hex.length == 1 ? "0" + hex : hex;
        return "#" + r + g + b;
    }

    /* Gets color shade for + and - grades */
    function getShadePlusMinus(baseColor, sign) {
        color = d3.hsv(baseColor.h, baseColor.s, baseColor.v);
        if (sign == '-') {
            // 1/3 shade darker, maximum rgb value of 255
            color.s -= 0.25;
        } else if (sign == '+') {
            // 1/3 shade brighter
            color.s += 0.25;
        } else { // there is a bug if this case is reached
            return baseColor;
        }
        return color;
    }

    /* Gets color shade for number grades */
    function getShadeNumber(baseColor, name) {
        color = d3.hsv(baseColor.h, baseColor.s, baseColor.v);

        //special case for 100
        if (name == "100") {
            color.s += 0.5;
            return color;
        }

        n = parseInt(name[1]); //examine the 1's column of the node name to determine shade

        // special case for F
        if (isNaN(n))
            return color;

        color.s += 0.08 * (n - 5);

        return color;
    }

    /* Returns corresponding letter grade */
    function gradeScale(score) {
        if (!score) {
            return "";
        }
        if (!isNumber(score)) {
            return score;
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

    /**
     * Populates grade level map
     * i.e. 
     * 0: A
     * 1: A, A-
     * 2: 90, 91, ..., 100
     */
    function populateGradeLevelMap() {
        let id = 0;
        for ([index, assessment] of assessments.entries()) {
            assessGradeLevelMap[assessment.trim()] = {};
            for ([jndex, grade] of grades.entries()) {
                assessGradeLevelMap[assessment.trim()][grade] = { "level": 0, "+": 0, "-": 0, "def": 0 };
            }
        }
    }


    /** Object:
     *  [
     *      {0: {Exam 1: "A"}},
     *      {1: {Exam 1: "B"}},
     *      {2: {Exam 1: "C"}},
     *      ...
     *      {4: {Exam 1: "F"}},
     *      {5: {Exam 2: "A"}},
     *  ]
     * 
     * */
    function createIDS() {
        let id = 0;
        dict = {} // dict to hold ids
        hashSeen = new Set();
        for (const [index, assessment] of assessments.entries()) {
            for ([jndex, grade] of grades.entries()) {
                /* Curr level = level of breakdown (0 = no breakdown) */
                const currLevel = assessGradeLevelMap[assessment.trim()][grade]["level"];
                switch (currLevel) {
                    case 0:
                        dict[id++] = { [assessment.trim()]: grade };
                        break;
                    case 1:
                        if (grade !== 'FE') {
                            if (grade !== 'AE') {
                                dict[id++] = { [assessment.trim()]: grade.concat("+") };
                            }
                            dict[id++] = { [assessment.trim()]: grade };
                            blacklist.add(id);
                            dict[id++] = { [assessment.trim()]: grade.concat("#") };

                            dict[id++] = { [assessment.trim()]: grade.concat("-") };
                        }
                        else {
                            dict[id++] = { [assessment.trim()]: "0-59" };
                        }
                        break;
                    /* TODO: add case 2: (indiivual scores) */
                    case 2:
                        if (!hashSeen.has([assessment.trim(), grade].join())) {
                            dict[id++] = { [assessment.trim()]: grade };
                            hashSeen.add([assessment.trim(), grade].join());
                        }
                        /* Keep nodes that aren't level 2 */
                        for (const subgrade of ["+", "def", "-"]) {
                            const lev = assessGradeLevelMap[assessment.trim()][grade][subgrade]
                            if (lev) {
                                /* Seen set so don't have repeat nodes, also memoize */
                                const seen = new Set();

                                /* numbersArray stores nodes that are filtered right */
                                const numbersArray = []
                                for (const student of Object.entries(rawData)) {
                                    if (!student[1][assessment]) {
                                        continue;
                                    }
                                    const currGrade = student[1][assessment];
                                    if (seen.has(currGrade)) {
                                        continue;
                                    }
                                    seen.add(currGrade);
                                    currGradeLevel = specificLetterScale(gradeScale(currGrade), currGrade);
                                    let suffix = subgrade;
                                    if (suffix.localeCompare("def") === 0) {
                                        suffix = "";
                                    }
                                    if (currGradeLevel === grade.concat(suffix)) {
                                        numbersArray.push(currGrade);
                                    }
                                }
                                for (const num of numbersArray.sort(function (a, b) { return parseInt(b) - parseInt(a) })) {
                                    dict[id++] = { [assessment.trim()]: num };
                                }
                            } /* Proceed as normal if not in second level */
                            if (subgrade.localeCompare("+") === 0) {
                                if (grade !== 'AE' && grade !== 'FE') {
                                    dict[id++] = { [assessment.trim()]: grade.concat(subgrade) };
                                }
                                dict[id++] = { [assessment.trim()]: grade.concat("#") };
                            }
                            if (subgrade.localeCompare("-") === 0) {
                                if (grade !== 'FE') {
                                    dict[id++] = { [assessment.trim()]: grade.concat(subgrade) };
                                }
                            }
                        }

                        break;
                }
            }
        }
        return dict;
    }

    /**
     * [
     *      {source: current_index, target: target_index, value: 0}
     * ]
     * 
     * formatSankeyData updates values
     * 
     */
    function createLinks(newIds) {

        links = [];
        for (const [key, value] of Object.entries(newIds)) {
            for (const [key2, value2] of Object.entries(newIds)) {
                if (key === key2) {
                    continue;
                }
                const sourceGrade = Object.values(value)[0];
                const targetGrade = Object.values(value2)[0];
                const sourceExamIndex = assessTrim.indexOf(Object.keys(value)[0]);
                const targetExamIndex = assessTrim.indexOf(Object.keys(value2)[0]);
                const sourceLevel = assessGradeLevelMap[Object.keys(value)[0]][gradeScale(sourceGrade[0])]["level"];
                const targetLevel = assessGradeLevelMap[Object.keys(value2)[0]][gradeScale(targetGrade[0])]["level"];
                if (sourceLevel === 1) {
                    /* Check if base letter or specific */

                    /* Base case, check if target is broken down same letter */
                    if (sourceGrade.length === 1) {
                        if (targetLevel === 1
                            && sourceExamIndex === targetExamIndex
                            && sourceGrade[0] === targetGrade[0]) {
                            links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                        }
                    }
                    else if (sourceExamIndex !== assessTrim.length - 1 && targetExamIndex - sourceExamIndex === 1 && targetGrade.length === 1) {
                        links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                    }
                }
                else if (sourceLevel === 2) {
                    /* Base case, check if target is broken down same letter */
                    if (sourceGrade.length === 1) {
                        if (targetLevel === 2
                            && sourceExamIndex === targetExamIndex
                            && sourceGrade[0] === targetGrade[0]
                            && !isNumber(sourceGrade)) {
                            links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                        }
                    }
                    else {
                        if (!isNumber(sourceGrade)) {
                            let suffix = sourceGrade[1];
                            if (suffix.localeCompare('#') === 0) {
                                suffix = 'def';
                            }
                            const suffixLevel = assessGradeLevelMap[Object.keys(value)[0]][sourceGrade[0]][suffix];
                            if (suffixLevel) {
                                // TODO: CHECK IF THE NUMBER IS IN SPECIFIC BREAKDOWN
                                /*
                                1) Is it a number
                                2) Is it the same exam?
                                3) Is it the specific letter breakdown?
                                */
                                let sourceChanged = sourceGrade;
                                if (sourceGrade[1] == '#') {
                                    sourceChanged = sourceGrade[0];
                                }
                                if (isNumber(targetGrade)
                                    && targetExamIndex === sourceExamIndex
                                    && specificLetterScale(gradeScale(targetGrade), targetGrade) === sourceChanged) {
                                    links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                                }
                            }
                            else {
                                if (sourceExamIndex !== assessTrim.length - 1 && targetExamIndex - sourceExamIndex === 1 && targetGrade.length === 1) {
                                    links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                                }
                            }
                        }
                        /* It is a number */
                        else {
                            if (sourceExamIndex !== assessTrim.length - 1 && targetExamIndex - sourceExamIndex === 1 && targetGrade.length === 1) {
                                links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                            }
                        }
                    }
                }
                else if (targetGrade.length > 1) {
                    continue;
                }
                else if (sourceExamIndex !== assessTrim.length - 1 && targetExamIndex - sourceExamIndex === 1) {
                    links.push({ "source": parseInt(key), "target": parseInt(key2), "value": 0 });
                }
            }
        }
        return links;
    }


    /**
     * [ {id: 0}, {id: 1}, ...]
     */
    function createNodes(newIds) {
        nodes = []
        for (const [key, value] of Object.entries(newIds)) {
            let name = Object.values(value)[0];
            let assessment = Object.keys(value)[0];
            let stringToInput = gradeCoordinateHelper(name, assessment, assessGradeLevelMap, true, true);
            let nodeName = gradeCoordinatesMapFunction2(stringToInput);
            nodes.push({
                "id": parseInt(key),
                "name": Object.values(value)[0],
                "assessment": Object.keys(value)[0],
                'sensorName': nodeName,
                "value": 0,
                "vale": 0,
            });
        }
        return nodes
    }


    /**
     *  [
     *      {Exam 1: 
     *          {A: {id: 0, count: 756}}},
     *          {B: {id: 0, count: 555}}},
     *          ...
     *      {Exam 2: 
     *          {A: {id: 0, count: 756}}},
     *          {B: {id: 0, count: 555}}},
     *          ...
     *  ]
     * 
     * */
    function createGrades(newIds) {
        dict = {};
        for (const [key, value] of Object.entries(newIds)) {
            if (!dict[Object.keys(value)[0].trim()]) {
                dict[Object.keys(value)[0].trim()] = {}
            }
            const currExam = Object.keys(value)[0].trim()
            const currGrade = Object.values(value)[0]
            dict[currExam][currGrade] = {
                "id": parseInt(key),
                "count": 0
            }
        }
        return dict
    }

    /**
     * Function that updates values of the links
     * and combines each function into one ouput
     * object
     */
    function formatSankey() {
        newIds = createIDS();
        newLinks = createLinks(newIds);
        newNodes = createNodes(newIds);
        newGrades = createGrades(newIds);

        output = {
            "ids": newIds,
            "grades": newGrades,
            "nodes": newNodes,
            "links": newLinks
        }
        for (const student of Object.entries(rawData)) {
            for ([index, assessment] of assessments.entries()) {
                if (!student[1][assessment]) {
                    continue;
                }
                let grade = gradeScale(student[1][assessment]);
                let sourceNodeName = grade;
                let sourceLevel = assessGradeLevelMap[assessment.trim()][grade]["level"];
                if (sourceLevel === 1) {
                    let targetNodeName = specificLetterScale(grade, student[1][assessment]);
                    if (targetNodeName.length === 1) {
                        targetNodeName += '#';
                    }
                    let source1 = output["grades"][assessment.trim()][sourceNodeName]["id"];
                    let target1 = output["grades"][assessment.trim()][targetNodeName]["id"];

                    if (grade.localeCompare('FE') === 0) {
                        previousGrade = "0-59";
                    }
                    for (const [index, link] of output["links"].entries()) {
                        if (JSON.stringify(link["source"]) == source1 && JSON.stringify(link["target"]) == target1) {
                            output["links"][index]["value"]++;
                        }
                    }
                    sourceNodeName = targetNodeName;
                }
                else if (sourceLevel === 2) {

                    /* Handle case of B -> B+ / B# / B- */
                    let targetNodeName = specificLetterScale(grade, student[1][assessment]);
                    if (targetNodeName.length === 1) {
                        targetNodeName += '#';
                    }
                    let source1 = output["grades"][assessment.trim()][sourceNodeName]["id"];
                    let target1 = output["grades"][assessment.trim()][targetNodeName]["id"];
                    if (grade.localeCompare('FE') === 0) {
                        previousGrade = "0-59";
                    }
                    for (const [index, link] of output["links"].entries()) {
                        if (JSON.stringify(link["source"]) == source1 && JSON.stringify(link["target"]) == target1) {
                            output["links"][index]["value"]++;
                        }
                    }
                    sourceNodeName = targetNodeName;

                    /* Check to see if need to break into percentages */
                    let specSourceGrade = specificLetterScale(grade, student[1][assessment]);
                    let suffix = specSourceGrade[specSourceGrade.length - 1];
                    if (specSourceGrade.length === 1) {
                        suffix = 'def'
                    }
                    let specSourceLevel = assessGradeLevelMap[assessment.trim()][grade][suffix];

                    /* Handle case of B+ -> 89 / 88 / 87 */
                    if (specSourceLevel) {
                        if (specSourceGrade.length === 1) {
                            specSourceGrade += '#';
                        }
                        let source1 = output["grades"][assessment.trim()][specSourceGrade]["id"];
                        let target1 = output["grades"][assessment.trim()][student[1][assessment]]["id"];
                        for (const [index, link] of output["links"].entries()) {
                            if (JSON.stringify(link["source"]) == source1 && JSON.stringify(link["target"]) == target1) {
                                output["links"][index]["value"]++;
                            }
                        }
                        sourceNodeName = student[1][assessment];
                    }
                }
                output["grades"][assessment.trim()][sourceNodeName]["count"]++;
                let source = output["grades"][assessment.trim()][grade]["id"]; // prev grade id
                if (index === 0) {
                    output["nodes"][source]["vale"]++;
                }

                if (index < 3) {
                    let nextGrade = gradeScale(student[1][assessments[index + 1]]);
                    if (nextGrade == "") {
                        continue;
                    }
                    let targetNodeName = nextGrade
                    let source = output["grades"][assessment.trim()][sourceNodeName]["id"]; // prev grade id
                    let target = output["grades"][assessments[index + 1].trim()][targetNodeName]["id"]; // next grade id

                    for (const [index, link] of output["links"].entries()) {
                        // console.log(link["source"]);
                        if (JSON.stringify(link["source"]) == source && JSON.stringify(link["target"]) == target) {
                            output["links"][index]["value"]++;
                        }
                    }
                }
            }
        }
        return output;
    }


    /**
     * 
     * 
     * 
     * Legend
     * Exploratory Section
     * 
     * 
     * 
     */

    function setDefaults() {
        d3.selectAll(".link").each(function (d) {
            // console.log(d);
            d3.select(this).transition()
                .style('stroke-opacity', 0.4);
        });
        d3.selectAll(".node").each(function (d) {
            // console.log(d);
            d3.select(this).transition()
                .style('opacity', 1.0)
                .style('stroke-opacity', 0.8);
        });
    }

    /**
     * When hovering over bar, highlights appropriate lines
     */
    function highlightGroup(group) {
        group = group.split("\u2192");

        /* Populate nodes groups */
        const nodesGroups = {}
        for ([index, assessment] of assessments.entries()) {
            nodesGroups[assessment.trim()] = []
        }

        const newGroups = []
        const newGroupsMap = {};
        let examIndex = 0;
        let nodeCounter = 0
        /* Add Exam Annotation */
        for (let i = 0; i < group.length; i++) {
            let currSensor = group[i];
            let assessment = assessments[examIndex];

            if (currSensor.length === 1) {
                newGroupsMap[nodeCounter++] = assessment;
                newGroups.push(currSensor);
                nodesGroups[assessment.trim()].push(currSensor);
                examIndex += 1
            }
            else if (currSensor.length == 2) {
                let nextSensor = currSensor;
                currSensor = currSensor[0] + "y";
                newGroupsMap[nodeCounter++] = assessment;
                newGroupsMap[nodeCounter++] = assessment;
                newGroups.push(currSensor);
                newGroups.push(nextSensor);
                nodesGroups[assessment.trim()].push(currSensor);
                nodesGroups[assessment.trim()].push(nextSensor);
                examIndex += 1
            }
            else {
                let nextSensor = currSensor.slice(0, 2);
                let normalizedNum = currSensor.slice(-1);
                let rawNum = "0" + unNormalizeNum(currSensor[1], normalizedNum);
                let numSensor = nextSensor + rawNum;
                currSensor = currSensor[0] + "y";
                newGroupsMap[nodeCounter++] = assessment;
                newGroupsMap[nodeCounter++] = assessment;
                newGroupsMap[nodeCounter++] = assessment;
                newGroups.push(currSensor);
                newGroups.push(nextSensor);
                newGroups.push(numSensor);
                nodesGroups[assessment.trim()].push(currSensor);
                nodesGroups[assessment.trim()].push(nextSensor);
                nodesGroups[assessment.trim()].push(numSensor);
                examIndex += 1
            }
        }

        /* Construct White List */
        const groupLinks = {}
        for (let i = 0; i < newGroups.length - 1; i++) {
            let sourceNode = newGroups[i];
            let targetNode = newGroups[i + 1];
            let sourceExam = newGroupsMap[i];
            let targetExam = newGroupsMap[i + 1];
            let linkKey = sourceExam + targetExam.trim();
            let linkValue = sourceNode + targetNode;
            if (!(linkKey in groupLinks)) {
                groupLinks[linkKey] = [];
            }
            groupLinks[linkKey].push(linkValue)
        }


        /* Highlight Links */
        d3.selectAll(".link").each(function (d) {
            let sourceNode = d.source.sensorName;
            let targetNode = d.target.sensorName;
            let sourceExam = d.source.assessment;
            let targetExam = d.target.assessment;
            let linkKey = sourceExam + targetExam;
            let linkValue = sourceNode + targetNode;
            if (linkKey in groupLinks && groupLinks[linkKey].includes(linkValue)) {
                d3.select(this).transition()
                    .style('stroke-opacity', 0.8);
            }
            else {
                d3.select(this).transition()
                    .style('stroke-opacity', 0.2);
            }
        });

        /* Highlight Nodes */
        d3.selectAll(".node").each(function (d) {
            let nodeName = d.sensorName;
            let nodeExam = d.assessment;
            if (nodeExam in nodesGroups && nodesGroups[nodeExam].includes(nodeName)) {
                d3.select(this).transition()
                    .style('opacity', 1.0)
                    .style('stroke-opacity', 1.0);
            }
            else {
                d3.select(this).transition()
                    .style('opacity', 0.5)
                    .style('stroke-opacity', 0.5);
            }
        });
    }


    /**
     * Function to remove legend
     */
    function clearPrevLegend() {
        d3.selectAll(".bar").remove();
        d3.selectAll(".label").remove();
        d3.selectAll(".exam").remove();
        d3.selectAll(".legendYAxis").remove();
        d3.selectAll(".legendXAxis").remove();
        d3.selectAll(".legendTitle").remove();
        d3.selectAll(".legendYAxisLabel").remove();
        d3.selectAll(".legendXAxisLabel").remove();
    }

    /**
     * Returns of Form:
     * [ 
     *      {Exam: examConcat, Students: "count"}
     * ]
     */
    function buildBarGraphData(rankedArray, colorArray) {
        clearPrevLegend();
        barData = []
        let i = 0;
        for (let group of rankedArray) {
            barData.push({ "Exam": group[0], "Students": group[1] });
            i += 1;
            // if (i == 8) {
            //     break;
            // }
        }
        return barData;
    }

    /**
     * Returns dummy data inserted in the barGraph array to properly scale and style the y-axis 
     */
    function buildAxisData(barData) {
        const axisData = [{ "Exam": "0" }];
        // const axisData = [];
        for (let [i, exam] of barData.entries()) {
            axisData.push(exam);
            if (i < barData.length - 1) {
                axisData.push({ "Exam": "" + (1 + i) });
            }
        }

        axisData.push({ "Exam": "dummy" });

        return axisData;
    }

    function buildLegend(colorArray, rankedArray, nodeGrade, nodeExam) {
        const barData = buildBarGraphData(rankedArray, colorArray);
        const axisData = buildAxisData(barData);
        // const numBars = rankedArray.length < 8 ? rankedArray.length : 8;
        const numBars = rankedArray.length;
        const barHeight = 400;

        // 300 barHeightMax
        // after 6 bars, change padding and width
        // 6 * 

        // const barHeight = 300;
        let barPadding = 15;
        let barWidth = 60;

        if (rankedArray.length > 6) {
            barWidth = barWidth * 6 / rankedArray.length;
            barPadding = barPadding * 6 / rankedArray.length;
        }

        const startingX = 1000;
        const startingY = 335;
        const tickSize = 50;
        const graphWidth = 200;

        /* builds y axis */
        // var y = d3.scaleOrdinal()
        //     .domain(Object.keys(axisData).map(x => axisData[x].Exam))
        //     .range(Object.keys(axisData).map(x => x * 25));

        // var y = d3.scaleOrdinal()
        //     .domain(Object.keys(axisData).map(x => axisData[x].Exam))
        //     .range(Object.keys(axisData).map(x => x * 25));

        var y = d3.scaleOrdinal()
            .domain(Object.keys(axisData).map(x => axisData[x].Exam))
            .range(Object.keys(axisData).map(x => {

                /* Case where rankedArray <= 6 */
                if (rankedArray.length <= 6) {
                    return x * 25;
                }

                let newNum = Math.ceil((rankedArray.length * 3 / 2))
                let amount = 400 / (newNum - 1) / 2;
                return x * amount;
            }));


        var yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat(d => {
                if (isNaN(d) && d.localeCompare("dummy") !== 0) {
                    return d;
                }
            })
            .tickSizeOuter(0); // remove axis brackets

        svg.append("g")
            .attr("class", "legendYAxis")
            .attr("transform", "translate(" + (startingX - 10) + ", " + startingY + ")")
            .call(yAxis)
            .call(g => g.selectAll(".tick line")
                .filter(d => {
                    return d.localeCompare("dummy") === 0;
                })
                .attr("x2", barPadding + 2 * graphWidth) // extend the y=0 line to form a joined y and x axis
            )
            .call(g => g.selectAll(".tick")
                .filter(function (d) {
                    return !isNaN(d); // remove the dummy data (0, 1, 2, ...) to leave spaced out ticks in the middle of the data
                })
                .remove()
            )
            .style("font-size", "12px");


        /* builds x axis */
        // var x = d3.scaleLinear()
        //     .domain([0, Math.max(...Object.keys(barData).map(x => barData[x].Students))])
        //     .range([0, 2 * Math.max(...Object.keys(barData).map(x => barData[x].Students))]);
        var x = d3.scaleLinear()
            .domain([0, Math.max(...Object.keys(barData).map(x => barData[x].Students))])
            .range([0, 2 * graphWidth]);


        var xAxis = d3.axisBottom()
            .scale(x)
            .ticks(x.domain()[1] / tickSize);
        svg.append("g")
            .attr("class", "legendXAxis")
            .attr("transform", "translate(" + (startingX) + ", " + (startingY + (y(axisData[axisData.length - 1]['Exam']))) + ")")
            .call(xAxis)
            .call(g => g.select('.domain')
                .remove());
        /* Get padding for pathway label */
        let longestLength = 0;
        for (const currLabel of rankedArray) {
            if (currLabel[0].length > longestLength) {
                longestLength = currLabel[0].length
            }
        }
        let pathwayPadding = 3 * longestLength;

        /* y axis label */
        svg.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "legendYAxisLabel")
            .attr("transform", "translate(" + (startingX - 88 - pathwayPadding) + "," + (startingY + y(axisData[axisData.length - 1]['Exam']) / 2) + ") rotate(-90)")
            .style("text-anchor", "middle")
            .style("font-weight", "600")
            .style("font-size", "14px")
            .text("Pathway");

        /* x axis label */
        svg.append("text")
            .attr("x", startingX + graphWidth)
            .attr("y", startingY + 40 + 50 * numBars)
            .attr("class", "legendXAxisLabel")
            .style("text-anchor", "middle")
            .style("font-weight", "600")
            .style("font-size", "14px")
            .text("Count");

        /* title */
        svg.append("text")
            .attr("x", startingX + graphWidth)
            .attr("y", startingY - 35)
            .attr("class", "legendTitle")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "600")
            .text("Counts of Pathways Passing Through");

        svg.append("text")
            .attr("x", startingX + graphWidth)
            .attr("y", startingY - 15)
            .attr("class", "legendTitle")
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "600")
            .text(function (d) {
                let tempTitle = nodeExam
                if (nodeExam == "Final Exam") {
                    tempTitle = "Alert 4";
                }
                else {
                    tempTitle = nodeExam.replace(/Exam/g, "Alert");
                }

                title = "Sensor Reading " + nodeGrade + " on " + tempTitle;
                return title;
            });

        /* Build domain for graph */
        domainY = []
        let numMore = 9;
        if (rankedArray.length > 6) {
            numMore = rankedArray.length * 3 / 2;
        }
        for (let i = 0; i < numMore; i++) {
            domainY.push(i);
        }


        // for (let i = 0; i < rankedArray.length; i++) {
        //     domainY.push(i);
        // }

        var bar_y = d3.scalePoint()
            .range([0, barHeight])
            .domain(domainY);

        /* Draw Bars */
        const bars = svg.selectAll(".bar").data(barData);
        bars
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", function (d, i) {
                return bar_y(i) + startingY;
            })
            .attr("height", barWidth - barPadding)
            .attr("x", startingX)
            .attr("width", function (d) {
                return x(d.Students);
            })
            .style('fill', function (d, i) {
                return colorArray[i];
            })
            .on('mouseover', function (d, i) {
                highlightGroup(i['Exam']);
                d3.select(this).style('fill', "#ff79c6");
            })
            .on('mouseout', function (d, i) {
                setDefaults();
                d3.select(this).style('fill', colorArray[groupsList.indexOf(i.Exam)]);
            })

        /* Draw numeric labels to right of bar */
        const students = svg.selectAll(".label").data(barData);
        let fontSize = 16;
        if (rankedArray.length > 6) {
            fontSize = 6 / rankedArray.length * fontSize;
            if (fontSize < 10) {
                fontSize = 10;
            }
        }
        students
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("y", function (d, i) {
                return bar_y(i) + startingY + barWidth / 2;
            })
            .attr("x", function (d) {
                return startingX + 25 + x(d.Students);
            })
            .text(function (d) {
                return d.Students;
            })
            .style("fill", "black")
            .style("font-size", fontSize + "px");
    }

    function getGradeWithLevel(numberGrade, assessment) {
        if (!numberGrade) {
            return ""
        }

        let grade = gradeScale(numberGrade);
        let level = assessGradeLevelMap[assessment.trim()][grade]["level"];
        if (level === 1) {
            grade = specificLetterScale(grade, numberGrade);
        }
        if (level === 2) {
            let otherGrade = specificLetterScale(grade, numberGrade);
            if (otherGrade.length > 1) {
                level = assessGradeLevelMap[assessment.trim()][grade][otherGrade[1]];
            }
            else {
                level = assessGradeLevelMap[assessment.trim()][grade]["def"];
            }

            // Check level
            if (level == 2) {
                grade = numberGrade;
            }
            else {
                grade = otherGrade;
            }
        }
        let stringToInput = gradeCoordinateHelper(grade, assessment.trim(), assessGradeLevelMap, true, false);
        let nodeName = gradeCoordinatesMapFunction(stringToInput);
        let normalizedName = nodeName;
        // console.log(normalizedName)
        if (isNumber(normalizedName.slice(-1))) {
            normalizedName = nodeName.slice(0, -1) + normalizeNum(nodeName.slice(-1))
        }
        return normalizedName;
    }

    /**
     * Returns an object of the following form:
    * [
    *      { "id": id, "Exam 1": exam1_score, "Exam 2", exam2_score, 
    *      "Exam 3", exam3_score, "Final Exam": finalExam_score
    *       },
    *      ...,
    * ]
    */
    function formatParallelData(pcDataRaw) {
        result = [];
        Object.entries(pcDataRaw)
            .map(x => {
                // console.log(x[1]);
                result.push({
                    "Exam 1": getGradeWithLevel(x[1]["Exam 1"], "Exam 1"),
                    "Exam 2": getGradeWithLevel(x[1]["Exam 2"], "Exam 2"),
                    "Exam 3": getGradeWithLevel(x[1]["Exam 3"], "Exam 3"),
                    "Final Exam": getGradeWithLevel(x[1][" Final Exam"], " Final Exam")
                })
            }
            );
        return result;
    }


    function filterParallelData(nodeExam, nodeGrade) {
        let pcDataRaw = []
        let examToInput = nodeExam;
        if (examToInput === "Final Exam") {
            examToInput = ' '.concat(examToInput);;
        }
        for (const student of Object.entries(rawData)) {
            if (!student[1][examToInput]) {
                continue;
            }
            let grade = gradeScale(student[1][examToInput]);
            let level = assessGradeLevelMap[nodeExam][grade]["level"];
            if (level === 1) {
                grade = specificLetterScale(grade, student[1][examToInput]);
            }
            if (level === 2) {
                grade = specificLetterScale(grade, student[1][examToInput]);
                if (grade.length === 1 && assessGradeLevelMap[nodeExam.trim()][grade]["def"] === 2) {
                    grade = student[1][examToInput];
                }
                else if (assessGradeLevelMap[nodeExam.trim()][grade[0]][grade[grade.length - 1]] === 2) {
                    grade = student[1][examToInput];
                }
            }
            let stringToInput = gradeCoordinateHelper(grade, nodeExam, assessGradeLevelMap, true, false);
            let nodeName = gradeCoordinatesMapFunction(stringToInput);
            if (nodeName === nodeGrade) {
                pcDataRaw.push(student[1]);
            }
        }
        return pcDataRaw;
    }

    function generateLegendGroups(pcData) {
        /* Get groups and their sizes */
        let groupsMap = new Map();
        groupsList = [];
        for (let line of pcData) {
            // console.log('------');
            let allExams = ''
            allExams += line[assessments[0]];
            for (let assessment of assessments.slice(1)) {
                if (line[assessment.trim()]) {
                    allExams += "\u2192";
                    allExams += line[assessment.trim()];
                }
                else {
                    // this break may be a bad idea if somehow theres a reading later on
                    break
                }
            }
            line['concat'] = allExams;
            if (groupsMap.has(allExams)) {
                groupsMap.set(allExams, groupsMap.get(allExams) + 1);
            }
            else {
                groupsMap.set(allExams, 1);
            }
        }
        groupsList = [...groupsMap.keys()];

        /* Rank the groups */
        let rankedArray = [];
        for (let group of groupsMap) {
            rankedArray.push(group);
        }
        let sortedArray = rankedArray.sort((a, b) => {
            return (a[1] < b[1]) ? 1 : -1;
        })

        /* Put rank and group into Map */
        let rankedMap = new Map();
        let i = 0
        for (let [group] of sortedArray) {
            rankedMap.set(group, i)
            i += 1
        }

        /* Add in color field to data */
        for (let line of [pcData]) {
            line['group'] = rankedMap.get(line['concat']);
        }

        return [pcData, i, sortedArray];
    }

    function hoverBehavior(node, flag) {
        // Check if node is broken down....
        if (node.sourceLinks.length > 0 && node.sourceLinks[0].target.assessment === node.assessment) {
            return;
        }


        // let billy = formatParallelData();
        let pcDataRaw = filterParallelData(node.assessment, node.sensorName);
        let pcData = formatParallelData(pcDataRaw);
        const filteredReturn = generateLegendGroups(pcData);
        const filteredData = filteredReturn[0];
        const totalGroups = filteredReturn[1];
        const sortedArray = filteredReturn[2];

        /* Build colors */
        const colorArray = createColorMap(totalGroups);


        pcData = filteredReturn[0];
        if (true) {
            buildLegend(colorArray, sortedArray, node.sensorName, node.assessment);
        }
        return;
    }

    /**
    * Function to create color mapping based on size of input
    */
    function createColorMap(i) {
        const priority = ["#3c3c3c", "#525252", "#696969", "#8f8f8f", "#adadad", "#c7c7c7", "#d9d9d9", "#c7c7c7", "#adadad", "#8f8f8f", "#696969"]; //nice

        for (let j = priority.length; j <= i; j++) {
            // priority.push("#44475a");
            priority.push("#000000");
        }

        return priority
    }



    /**
     * 
     * 
     * 
     * History Node
     * Exploratory Section
     * 
     * 
     * 
     */


    /**
     * Routes from click behavior to create new data
     * and updates level of clicked node
     * flag = true = breakdown
     * flag = false = build up
     */
    function hierarchSankeyRouter(node, flag) {
        const oldGraph = formatSankey();

        /* Update Ids */
        const locAs = node['assessment'];
        let locGrade = node['name'];

        if (isNumber(locGrade)) {
            locGrade = specificLetterScale(gradeScale(locGrade), locGrade);
            if (locGrade.length === 1) {
                locGrade += '#';
            }
        }

        if (!flag && assessGradeLevelMap[locAs][locGrade[0]]["level"] === 1) {
            locGrade = locGrade[0];
        }

        if (flag && letrs.has(locGrade) && assessGradeLevelMap[locAs][locGrade]["level"] > 0) {
            return;
        }

        /* Need to add space if final exam */
        let stringToInput = locAs;

        /* Do nothing for F */
        if (locGrade.localeCompare('FE') === 0) {
            return;
        }

        if (letrs.has(locGrade[0])) {
            currLevel = assessGradeLevelMap[stringToInput][locGrade[0]]["level"]
            newLevel = currLevel


            if (flag || currLevel !== 2) {
                newLevel = currLevel + (flag ? 1 : -1 * currLevel);;
            }

            /* Keep new level in range 0-2 */
            newLevel = newLevel > 2 ? 2 : newLevel;

            assessGradeLevelMap[stringToInput][locGrade[0]]["level"] = newLevel;
            /* Expand to percentages if level of 2 */
            if (newLevel === 2) {
                if (flag) {
                    if (locGrade.length > 1 && locGrade[1] !== '#')
                        assessGradeLevelMap[stringToInput][locGrade[0]][locGrade[1]] = 2;
                    else
                        assessGradeLevelMap[stringToInput][locGrade[0]]["def"] = 2;
                }
                else if (!letrs.has(locGrade)) {
                    if (locGrade.length > 1 && locGrade[1] !== '#')
                        assessGradeLevelMap[stringToInput][locGrade[0]][locGrade[1]] = 0;
                    else
                        assessGradeLevelMap[stringToInput][locGrade[0]]["def"] = 0;

                    if (assessGradeLevelMap[stringToInput][locGrade[0]]["+"] === 0
                        && assessGradeLevelMap[stringToInput][locGrade[0]]["def"] === 0
                        && assessGradeLevelMap[stringToInput][locGrade[0]]["-"] === 0) {
                        newLevel = 1;
                    }
                }
                else {
                    newLevel = 0;
                    assessGradeLevelMap[stringToInput][locGrade[0]]["+"] = 0;
                    assessGradeLevelMap[stringToInput][locGrade[0]]["def"] = 0;
                    assessGradeLevelMap[stringToInput][locGrade[0]]["-"] = 0;
                }
            }
            else if (newLevel === 1) {
                assessGradeLevelMap[stringToInput][locGrade[0]]["+"] = 0;
                assessGradeLevelMap[stringToInput][locGrade[0]]["def"] = 0;
                assessGradeLevelMap[stringToInput][locGrade[0]]["-"] = 0;
            }
            else {
                let suffix = locGrade[1];
                if (locGrade[1] === '#') {
                    suffix = 'def'
                }
                assessGradeLevelMap[stringToInput][locGrade[0]]["+"] = 0;
                assessGradeLevelMap[stringToInput][locGrade[0]]["def"] = 0;
                assessGradeLevelMap[stringToInput][locGrade[0]]["-"] = 0;
            }
        }
        else if (!flag) {
            /* If number, clear */
            const specLetter = specificLetterScale(gradeScale(locGrade), locGrade);
            if (specLetter.length > 1)
                assessGradeLevelMap[stringToInput][specLetter[0]][specLetter[1]] = 0;
            else
                assessGradeLevelMap[stringToInput][specLetter[0]]["def"] = 0;
        }
        assessGradeLevelMap[stringToInput][locGrade[0]]["level"] = newLevel;
        const newSankey = formatSankey();
        removePlots();
        drawSankey(newSankey, false, flag, oldGraph, stringToInput, locGrade, newLevel);
    }


    /**
     * Function to remove svg
     */
    function removePlots() {
        d3.selectAll(".nodes").remove();
        d3.selectAll(".link").remove();
        d3.selectAll(".axis-label").remove();
    }


    /**
     * Function to return the color for a node
     * based on its name
     */
    function getNodeColor(nodeName) {
        /* case for whole letter grade nodes */
        if (letrs.has(nodeName))
            return sankeyColor(nodeName);
        /* case for + and - grade nodes */
        if (letrs.has(nodeName[0]))
            return getShadePlusMinus(sankeyColor(nodeName[0]), nodeName[1]);
        /* case for number grade nodes */
        return getShadeNumber(sankeyColor(gradeScale(nodeName)), nodeName);
    }


    /** Returns specific letter */
    function specificLetterScale(letter, number) {
        const secondDigit = parseInt(number.toString()[number.toString().length - 1]);
        if (secondDigit >= 7) {
            return letter.concat("+");
        }
        else if (secondDigit >= 4) {
            return letter
        }
        else {
            return letter.concat("-");
        }
    }

    /**
     * Checks to see if a node name is a number
     */
    function isNumber(name) {
        return parseInt(name) >= 0 && parseInt(name) <= 100
    }

    /**
     * Animation section
     * 
     * 
     * 
     * 
     * 
     * 
     */


    /**
     * Takes in a graph and puts all points into
     * object
     */
    function populatePointStorageObj(graph) {
        for (const node of graph.nodes) {
            if (!(node.assessment in oldGraphPoints)) {
                oldGraphPoints[node.assessment] = {}
            }
            oldGraphPoints[node.assessment][node.name] =
            {
                "x0": node.x0,
                "x1": node.x1,
                "y0": node.y0,
                "y1": node.y1,
                "rectHeight": node.rectHeight,
                "value": node.value
            }
        }
    }

    /**
     * Function to fill the old link storage
     * object with data
     */
    function populateLinkStorageObj(graph) {
        oldLinks = {};
        oldLinksMap = new Map();
        for (const link of graph.links) {
            const sourceA = link.source.assessment;
            const sourceG = link.source.name;
            const targetA = link.target.assessment;
            const targetG = link.target.name;

            if (!(sourceA in oldLinks))
                oldLinks[sourceA] = {}
            if (!(sourceG in oldLinks[sourceA]))
                oldLinks[sourceA][sourceG] = {}
            if (!(targetA in oldLinks[sourceA][sourceG]))
                oldLinks[sourceA][sourceG][targetA] = {}
            if (!(targetG in oldLinks[sourceA][sourceG][targetA]))
                oldLinks[sourceA][sourceG][targetA][targetG] = {}

            oldLinks[sourceA][sourceG][targetA][targetG] = {
                "y0": link.y0,
                "y1": link.y1,
                "width": link.width,
                "value": link.value
            }
            oldLinksMap.set([sourceA, sourceG, targetA, targetG].toString(), {
                "y0": link.y0,
                "y1": link.y1,
                "width": link.width,
                "value": link.value
            });

        }
    }

    /** 
     * Stores new links in a new links object
     */
    function storeNewLinks(graph) {
        newLinks = {};
        newLinksMap = new Map();
        for (const link of graph.links) {
            const sourceA = link.source.assessment;
            const sourceG = link.source.name;
            const targetA = link.target.assessment;
            const targetG = link.target.name;

            if (!(sourceA in newLinks))
                newLinks[sourceA] = {}
            if (!(sourceG in newLinks[sourceA]))
                newLinks[sourceA][sourceG] = {}
            if (!(targetA in newLinks[sourceA][sourceG]))
                newLinks[sourceA][sourceG][targetA] = {}
            if (!(targetG in newLinks[sourceA][sourceG][targetA]))
                newLinks[sourceA][sourceG][targetA][targetG] = {}

            newLinks[sourceA][sourceG][targetA][targetG] = {
                "y0": link.y0,
                "y1": link.y1,
                "width": link.width,
                "value": link.value
            }
            newLinksMap.set([sourceA, sourceG, targetA, targetG].toString(), {
                "y0": link.y0,
                "y1": link.y1,
                "width": link.width,
                "value": link.value
            });
        }
    }

    /**
     * Takes in a new graph and stores points
     * in objects
     */
    function storeNewPoints(graph) {
        newGraphPoints = {};
        for (const node of graph.nodes) {
            if (!(node.assessment in newGraphPoints)) {
                newGraphPoints[node.assessment] = {}
            }
            newGraphPoints[node.assessment][node.name] =
            {
                "x0": node.x0,
                "x1": node.x1,
                "y0": node.y0,
                "y1": node.y1,
                "rectHeight": node.y1 - node.y0,
                "value": node.value,
                "id": node.id
            }
        }
    }

    /**
     * Checks to see which nodes are in the new graph
     * but are not in the old graph
     */
    function newNotInOld(brokeExam, brokeGrade, isBreakdown) {
        newNodes = new Set();
        for (const [examName, examValue] of Object.entries(newGraphPoints)) {
            for (const [gradeName, node] of Object.entries(examValue)) {
                if (!(gradeName in oldGraphPoints[examName])) {
                    newNodes.add([examName, gradeName, node.value].toString());
                }
                else if (node.value !== oldGraphPoints[examName][gradeName]["value"]) {
                    newNodes.add([examName, gradeName, node.value].toString());
                }
                if (!isBreakdown) {
                    if (examName === brokeExam && gradeName === brokeGrade) {
                        newNodes.add([examName, gradeName, node.value].toString());
                    }
                }
            }
        }
        return newNodes
    }

    /**
     * Checks to see which nodes are in old graph but
     * not in new graph
     */
    function oldNotInNew(brokeExam, brokeGrade, isBreakdown) {
        oldNodes = new Set();
        for (const [examName, examValue] of Object.entries(oldGraphPoints)) {
            for (const [gradeName, node] of Object.entries(examValue)) {
                if (isBreakdown && examName === brokeExam && gradeName === brokeGrade) {
                    oldNodes.add([examName, gradeName, node.value].toString());
                }
                if (!isBreakdown && examName === brokeExam && (!(gradeName in newGraphPoints[examName]))) {
                    oldNodes.add([examName, gradeName, node.value].toString());
                }
            }
        }
        return oldNodes
    }

    /**
     * Checks to see which links are in old graph 
     * that are not in new graph
     * @param {*} brokeExam --> broken down exam
     * @param {*} brokeGrade --> broken down grade
     */
    function oldLinkNotinNewSet(brokeExam, brokeGrade, isBreakdown) {
        oldLinksSet = new Set();
        oldLinksObj = {};
        oldLinksObj['right'] = {}
        oldLinksObj['left'] = {}
        for (const key of oldLinksMap.keys()) {
            [first, firstG, sec, secG] = key.split(',');
            if (!newLinksMap.has(key)) {
                oldLinksSet.add(key);
                if (brokeExam.localeCompare(first) === 0) {
                    oldLinksObj['right'][secG] = oldLinks[first][firstG][sec][secG]
                }
                else {
                    oldLinksObj['left'][firstG] = oldLinks[first][firstG][sec][secG]
                }
            }
        }
        return [oldLinksSet, oldLinksObj];
    }

    /**
     * Checks to see which links are in new graph 
     * that are not in old graph
     * @param {*} brokeExam --> broken down exam
     * @param {*} brokeGrade --> broken down grade
     */
    function newLinkNotinOldSet(brokeExam, brokeGrade, isBreakdown) {
        newLinksSet = new Set();
        newLinksObj = {}
        newLinksObj['right'] = {}
        newLinksObj['left'] = {}
        for (const key of newLinksMap.keys()) {
            [first, firstG, sec, secG] = key.split(',');
            if (!oldLinksMap.has(key)) {
                newLinksSet.add(key);
                if (brokeExam.localeCompare(first) === 0) {
                    newLinksObj['right'][secG] = newLinks[first][firstG][sec][secG]
                }
                else {
                    newLinksObj['left'][firstG] = newLinks[first][firstG][sec][secG]
                }
            }
        }
        return [newLinksSet, newLinksObj];
    }

    function setNewWidth(sankeyData) {
        let widthAdder = 0;
        for (const [key, value] of Object.entries(assessGradeLevelMap)) {
            let temp = 0;
            for (const [key1, value1] of Object.entries(value)) {
                if (value1.level > temp) {
                    if (value1.level == 2) {
                        temp = 1.5;
                    }
                    else {
                        temp = value1.level;
                    }
                }
            }
            widthAdder += temp;
        }
        if (widthAdder > 2.0) {
            widthAdder = 2.0;
        }

        if (sankeyData.nodes.length > 20) {
            /* Sets up svg */
            sankey = d3.sankey()
                .size([width + widthAdder * 100 - 70, height])
                .nodeId(d => d.id)
                .nodeWidth(nodeWdt)
                .nodePadding(padding)
                .nodeAlign(d3.sankeyCenter)
                .nodeSort(sortSensorNodes);

        }


    }
    /*************************************
     * 
     * 
     * 
     *              Sankey
     * 
     * 
     ************************************** 
     */

    /**
     * 
     * Nodes Section
     * 
     */

    var oldGraphPoints = {};
    var newGraphPoints = {};
    var oldLinks = {}
    var newLinks = {}
    var oldLinksMap = new Map();
    var newLinksMap = new Map();
    var graph;
    var oldGraph;
    var transitionDuration = 400;

    /* Creates Sankey Object */
    let sankey = d3.sankey()
        .size([width, height])
        .nodeId(d => d.id)
        .nodeWidth(nodeWdt)
        .nodePadding(padding)
        .nodeAlign(d3.sankeyCenter)
        .nodeSort(null);

    /**
     * Top level Sankey drawing function
     */
    function drawSankey(sankeyData, isFirst, isBreakdown, oldData, brokeExam, brokeGrade, newLevel) {

        /* Check for padding issues */
        setNewWidth(sankeyData);

        /* Keep copy of old graph for animation purposes */
        if (oldData) {
            oldGraph = sankey(oldData);
        }


        graph = sankey(sankeyData);

        /* If on load, add all points */
        if (isFirst) {
            populatePointStorageObj(graph);
            populateLinkStorageObj(graph);
            drawLinks(graph);
            drawNodes(graph);
        }

        /* Store new points and new links*/
        storeNewPoints(graph);
        storeNewLinks(graph);

        /* Get necessary objects */
        newPointsNotInOldSet = newNotInOld(brokeExam, brokeGrade, isBreakdown);
        oldPointsNotInNewSet = oldNotInNew(brokeExam, brokeGrade, isBreakdown);
        [oldLinkSet, oldLinksObj] = oldLinkNotinNewSet(brokeExam, brokeGrade, isBreakdown);
        [newLinkSet, newLinksObj] = newLinkNotinOldSet(brokeExam, brokeGrade, isBreakdown);


        /* For case of breaking down */
        if (isBreakdown) {

            /* Set node values to old graph point to begin animation */
            for (const node of graph.nodes) {
                let visualNode;
                /* If node is a new node not in the old set, then it should be set to the value
                   of the only node that is in the old set but not the new set */
                if (newPointsNotInOldSet.has([node.assessment, node.name, node.value].toString())) {
                    const searchNode = oldPointsNotInNewSet.keys().next().value.split(',');
                    visualNode = oldGraphPoints[searchNode[0]][searchNode[1]];
                }
                else {
                    visualNode = oldGraphPoints[node.assessment][node.name];
                }
                node.x0 = visualNode.x0;
                node.x1 = visualNode.x1;
                node.y0 = visualNode.y0;
                node.y1 = visualNode.y1;
            }
            /* Set link value to old graph point to begin animation */
            for (const link of graph.links) {
                let visualLink;
                if (newLinkSet.has(
                    [link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                        .toString()
                )
                ) {
                    /* When breaking down, we want to set the multiple new links that form, 
                    * all to the point of the original
                    * node 
                    */
                    if (link.source.assessment === brokeExam && link.source.name === brokeGrade) {
                        const suffix = link.target.name[1];
                        if (suffix === '+' || ['9', '6', '3'].includes(suffix)) {
                            visualLink = oldLinksObj['right']['A'];
                        }
                        else if (suffix === '#' || ['8', '5', '2'].includes(suffix)) {
                            visualLink = oldLinksObj['right']['B'];
                        }
                        else if (suffix === '-' || ['7', '4', '1', '0'].includes(suffix)) {
                            visualLink = oldLinksObj['right']['C'];
                        }
                        else {
                            console.log('I AM BROKEN')
                        }
                        link.width = 0;
                    }
                    else {
                        const direction = link.target.assessment.localeCompare(brokeExam) ? "right" : "left";
                        const gradeToInput = direction.localeCompare("left") === 0 ? link.source.name : link.target.name;
                        visualLink = oldLinksObj[direction][gradeToInput];
                        link.width = visualLink.width;
                    }

                    if (link.source.assessment === 'Final Exam') {
                        visualLink = link;
                    }
                }
                else {
                    visualLink = oldLinks[link.source.assessment][link.source.name][link.target.assessment][link.target.name];
                    link.width = visualLink.width;
                }
                link.y0 = visualLink.y0;
                link.y1 = visualLink.y1;


            }
            /* First draw nodes and draw links according to these old values */
            drawLinks(graph);
            drawNodes(graph);

            /* Animate to the new values */
            transitionToNewBreakdown(sankeyData, newPointsNotInOldSet, oldPointsNotInNewSet, newLinkSet, brokeExam, brokeGrade);
        }
        else if (!isFirst) {
            /* Handles case of building up */
            drawLinks(oldGraph);
            drawNodes(oldGraph);
            transitionToNewBuildup(newPointsNotInOldSet, oldPointsNotInNewSet, oldLinkSet, newLinkSet, newLinksObj, sankeyData, brokeExam, newLevel, brokeGrade);
        }
        /* Store new points in old points */
        oldGraphPoints = JSON.parse(JSON.stringify(newGraphPoints));
        oldLinks = JSON.parse(JSON.stringify(newLinks));
        oldLinksMap = new Map(newLinksMap);
    }


    /**
     * 
     * Function to draw nodes of sankey
     */
    function drawNodes(graph) {

        function buildString(percentArray, value) {
            let maxIndex = percentArray.length;
            let outputString = '';
            for (const i in percentArray[0]) {
                nodeName = percentArray[0][i];
                totalCount = percentArray[1][i];
                outputString += parseFloat(value / totalCount * 100).toFixed(2) + "%";
                outputString += ` of parent node ${nodeName} </br>`;
            }
            return outputString;
        }

        function getAllStudents(exam, value) {
            let allCount = 0;
            for (const node of graph.nodes) {
                if (node.assessment === exam) {
                    allCount += node.value;
                }
            }
            return parseFloat(value / allCount * 100).toFixed(2) + "%";
        }

        function getParentPercentage(exam, grade, value) {
            const locAs = exam;
            const locGrade = grade;
            let stringToInput = locAs;
            if (locAs.localeCompare('Final Exam') === 0)
                stringToInput = ' '.concat(locAs);

            let parentNodeArray = [];
            let allowAll = true;

            /* Gen parent nodes */
            if (isNumber(grade)) {
                parentNodeArray.push(gradeScale(grade));
                parentNodeArray.push(specificLetterScale(gradeScale(grade), grade))
            }
            else {
                parentNodeArray.push(grade[0]);
            }

            countArray = []
            let jindex = 0
            for (const parNode of parentNodeArray) {
                let count = 0;
                let brother = 0;
                for (const student of Object.entries(rawData)) {
                    for ([index, assessment] of assessments.entries()) {
                        if (!student[1][assessment]) {
                            continue;
                        }
                        if (assessment.trim() !== exam.trim()) {
                            continue;
                        }
                        brother += 1;
                        let currGrade = gradeScale(student[1][assessment])
                        if (jindex === 1) {
                            currGrade = specificLetterScale(currGrade, student[1][assessment])
                        }
                        if (currGrade === parNode) {
                            count += 1
                        }
                    }
                }
                brother = 0;
                countArray.push(count);
                jindex += 1
            }
            const returnList = [parentNodeArray, countArray];
            return returnList
        }

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        var divbig = d3.select("body").append("div")
            .attr("class", "tooltipbig")
            .style("opacity", 0);

        setLabels(graph);
        /* Creates Node */
        var graphnode = svg
            .append("g")
            .classed("nodes", true)
            .selectAll("rect")
            .data(graph.nodes)
            .enter()

        /* Draws Node */
        graphnode.append("rect")
            .attr("class", "node")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("width", d => (d.x1 - d.x0))
            .attr("height", d => {
                d.rectHeight = d.y1 - d.y0;
                return (d.y1 - d.y0)
            })
            .style("fill", (d) => {
                return getNodeColor(d.name)
            })
            .attr("stroke", (d) => {
                return d3.rgb(getNodeColor(d.name)).darker(0.6);
            })
            .on("click", function (d, i) {
                if (d.shiftKey) {
                    // hierarchSankeyRouter(i, false);
                    hoverBehavior(i, true);
                }
                else {
                    hierarchSankeyRouter(i, true);
                }
            })
            .on("contextmenu", function (d, i) {
                d.preventDefault();
                hierarchSankeyRouter(i, false);
            });

        // resets on additional click
        document.addEventListener("click", function (d, i) {
            if (!d.shiftKey) {
                clearPrevLegend();
            }
        })

        /* Add in text */
        graphnode.append("text")
            .style("font-size", "16px")
            .attr("class", "nodeText")
            .attr("x", function (d) { return d.x0 - 30; })
            .attr("y", function (d) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .text(function (d) {
                if (d.value == 0) {
                    return "";
                }
                if (isNaN(d.name)) {
                    return gradeCoordinatesMap1.get(d.name);
                }
                else {
                    return '0' + normalizeNum(d.name.toString()[1]);
                }
                return gradeCoordinatesMapFunction1(d.name);
            });

    }



    /**
     * 
     * Links Section
     * 
     */

    /**
     * 
     * Function to draw Links of Sankey
     */
    var graphlink;
    function drawLinks(graph) {

        var div = d3.select("body").append("div")
            .attr("class", "tooltipLink")
            .style("opacity", 0);

        function buildString(percentArray, value) {
            let maxIndex = percentArray.length;
            let outputString = '';
            let index = 0;
            for (const i in percentArray[0]) {
                nodeName = percentArray[0][i];
                totalCount = percentArray[1][i];
                outputString += parseFloat(value / totalCount * 100).toFixed(2) + "%";
                if (index === 0) {
                    outputString += ` of source node ${nodeName} </br>`;
                }
                else {
                    outputString += ` of target node ${nodeName} </br>`;
                }
                index += 1;
            }
            return outputString;
        }

        function getAllStudents(exam, value) {
            let allCount = 0;
            for (const node of graph.nodes) {
                if (node.assessment === exam) {
                    allCount += node.value;
                }
            }
            return parseFloat(value / allCount * 100).toFixed(2) + "%";
        }

        function getParentPercentage(sourceIndex, sourceName, targetIndex, targetName) {

            sourceCount = 0;
            targetCount = 0;
            const parentNodeArray = [sourceName, targetName]
            for (const node of graph.nodes) {
                if (node.id === sourceIndex) {
                    sourceCount += node.value;
                }
                if (node.id === targetIndex) {
                    targetCount += node.value;
                }
            }
            const countArray = [sourceCount, targetCount];
            const returnList = [parentNodeArray, countArray];
            // console.log(returnList)
            return returnList
        }

        /* Creates Link */
        graphlink = svg
            .append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(graph.links)
            .enter()
            .append("path")

        /* Draws Link */
        graphlink
            .attr("class", "link")
            .attr("d", d3.sankeyLinkHorizontal())
            .attr("fill", "none")
            .style("stroke-width", d => d.width)
            .style("stroke", d => {
                return getNodeColor(d.source.name);
            });
    }

    /**
     * Function to animate the transition from breaking down a node
     * 
     * @param {*} sankeyData --> Sankey Data
     * @param {*} newPointsNotInOldSet --> New nodes not in old set (ex. A+)
     * @param {*} oldPointsNotInNewSet --> Old nodes not in new set (ex. A [when breaking down A -> A, A+])
     * @param {*} newLinkSet --> new links not in old link set (ex. A+-B)
     * @param {*} brokeExam --> The exam being broken down
     */
    function transitionToNewBreakdown(sankeyData, newPointsNotInOldSet, oldPointsNotInNewSet, newLinkSet, brokeExam, brokeGrade) {

        /**
         * Setup for nodes and links pre transition
         */

        /**
         * When we overlay multitple links on top of each other, it becomes a very dark link,
         * so we set opacity to 0 for all but one of the starting links (as when breaking a node down,
         * all the new links start on the old link)
         */
        const seen = {}
        seen['left'] = {}
        seen['right'] = {}
        graphlink
            .style("stroke-opacity", function (link) {
                if (newLinkSet.has(
                    [link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                        .toString()
                )
                ) {
                    const direction = link.source.assessment.localeCompare(brokeExam) ? "left" : "right";
                    const gradeToInput = direction.localeCompare("left") === 0 ? link.source.name : link.target.name;
                    if (gradeToInput in seen[direction]) {
                        return 0.0;
                    }
                    else {
                        seen[direction][gradeToInput] = true;
                    }
                }
                return 0.4;
            })
            /* Set the stroke color to the old link color*/
            .style("stroke", function (link) {
                if (newLinkSet.has([link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                    .toString()
                )) {
                    // const direction = link.source.assessment.localeCompare(brokeExam) ? "left" : "right";
                    const direction = link.target.assessment.localeCompare(brokeExam) ? "right" : "left";
                    const gradeToInput = direction.localeCompare("left") === 0 ? link.source.name : link.target.name;
                    if (direction.localeCompare('left') === 0) {
                        return getNodeColor(link.source.name);
                    }
                    if (isNumber(link.source.name)) {
                        return getNodeColor(specificLetterScale(gradeScale(link.source.name), link.source.name));
                    }
                    return getNodeColor(link.source.name[0])
                }
                return getNodeColor(link.source.name);
            });

        /* Set the new nodes to the original color */
        d3.selectAll('.node').each(function (d) {
            d3.select(this)
                .style('fill', function (node) {
                    if (newPointsNotInOldSet.has([node.assessment, node.name, node.value].toString())) {
                        const searchNode = oldPointsNotInNewSet.keys().next().value.split(',');
                        return getNodeColor(searchNode[1]);
                    }
                    return getNodeColor(node.name);
                }).style("stroke", function (node) {
                    if (newPointsNotInOldSet.has([node.assessment, node.name, node.value].toString())) {
                        const searchNode = oldPointsNotInNewSet.keys().next().value.split(',');
                        return d3.rgb(getNodeColor(searchNode[1])).darker(0.6);
                    }
                    return d3.rgb(getNodeColor(node.name)).darker(0.6);
                })
        });

        /**
         * Animate Nodes
         */
        d3.selectAll('.node').each(function (d) {
            d3.select(this)
                .transition().duration(transitionDuration)
                .attr('y', function (n) {
                    n.y0 = newGraphPoints[n.assessment][n.name]["y0"];
                    n.y1 = newGraphPoints[n.assessment][n.name]["y1"];
                    n.rectHeight = n.y1 - n.y0;
                    return n.y0;
                })
                .attr('x', function (n) {
                    n.x0 = newGraphPoints[n.assessment][n.name]["x0"];
                    n.x1 = newGraphPoints[n.assessment][n.name]["x1"];
                    return n.x0;
                })
                .attr('height', function (n) {
                    return n.rectHeight;
                })
                .style("fill", function (node) {
                    return getNodeColor(node.name);
                })
                .style("stroke", function (d) {
                    return d3.rgb(getNodeColor(d.name)).darker(0.6);
                })
        });
        d3.selectAll('.nodeText').each(function (d) {
            d3.select(this)
                .transition().duration(transitionDuration)
                .attr('y', function (n) {
                    return (n.y0 + n.y1) / 2;
                })
                .attr('x', function (n) {
                    return n.x0 - 30;
                });
        });

        /**
         * Animate links
         */

        /* Set new link location */
        for (const link of graph.links) {
            let visualNode = newLinks[link.source.assessment][link.source.name][link.target.assessment][link.target.name];
            link.y0 = visualNode.y0;
            link.y1 = visualNode.y1;
            link.width = visualNode.width;
        }


        /* sofar and total control when to draw the new graph */
        let soFar = 0;
        const total = graphlink["_groups"][0].length;

        /* Animate link */
        graphlink.transition().duration(transitionDuration).attr('d', d3.sankeyLinkHorizontal()).style("stroke-opacity", 0.4).style("stroke-width", function (n) {
            return n.width.toString() + "px";
        }).style("stroke", function (link) {
            return getNodeColor(link.source.name);
        }).on("end", function () {
            soFar += 1;
            if (soFar === total) {
                removePlots();
                drawLinks(graph);
                drawNodes(graph);
            }
        });



        // removePlots();
        // drawNodes(graph);
    }

    /**
     * Function that animates transition when building up a node
     * 
     * @param {*} newPointsNotInOldSet --> New Nodes not in old Graph (ex. build up A+/A/A-, new node is A)
     * @param {*} oldPointsNotInNewSet --> Old Nodes not in new graph (ex., old is A+/A/A-)
     * @param {*} oldLinkSet --> Same but for links
     * @param {*} newLinkSet --> Same but for links
     * @param {*} newLinksObj --> new link set but in a different structure
     * @param {*} sankeyData --> sankey data
     * @param {*} brokeExam 
     */
    function transitionToNewBuildup(newPointsNotInOldSet, oldPointsNotInNewSet, oldLinkSet, newLinkSet, newLinksObj, sankeyData, brokeExam, newLevel, brokeGrade) {
        /**
         * Animate nodes
         */
        d3.selectAll('.node').each(function (d) {
            d3.select(this)
                .transition().duration(transitionDuration)
                .attr('y', function (n) {
                    /* Set node to new point */
                    let visualNode;
                    if (oldPointsNotInNewSet.has([n.assessment, n.name, n.value].toString())) {
                        const searchNode = newPointsNotInOldSet.keys().next().value.split(',');
                        visualNode = newGraphPoints[searchNode[0]][searchNode[1]];
                    }
                    else {
                        visualNode = newGraphPoints[n.assessment][n.name]
                    }
                    n.y0 = visualNode.y0;
                    n.y1 = visualNode.y1;
                    n.rectHeight = n.y1 - n.y0;
                    return n.y0;
                })
                .attr('x', function (n) {
                    /* Set node to new point */
                    let visualNode;
                    if (oldPointsNotInNewSet.has([n.assessment, n.name, n.value].toString())) {
                        const searchNode = newPointsNotInOldSet.keys().next().value.split(',');
                        visualNode = newGraphPoints[searchNode[0]][searchNode[1]];
                    }
                    else {
                        visualNode = newGraphPoints[n.assessment][n.name]
                    }
                    n.x0 = visualNode.x0;
                    n.x1 = visualNode.x1;
                    return n.x0;
                })
                .attr('height', function (n) { // Node size
                    return n.rectHeight;
                })
                .style('fill', function (node) { // Node color
                    if (oldPointsNotInNewSet.has([node.assessment, node.name, node.value].toString())) {
                        const searchNode = newPointsNotInOldSet.keys().next().value.split(',');
                        return getNodeColor(searchNode[1]);
                    }
                    return getNodeColor(node.name);
                }).style("stroke", function (node) { // Node Stroke
                    if (oldPointsNotInNewSet.has([node.assessment, node.name, node.value].toString())) {
                        const searchNode = newPointsNotInOldSet.keys().next().value.split(',');
                        return d3.rgb(getNodeColor(searchNode[1])).darker(0.6);
                    }
                    return d3.rgb(getNodeColor(node.name)).darker(0.6);
                });
        });

        /* Animate node text */
        d3.selectAll('.nodeText').each(function (d) {
            d3.select(this)
                .transition().duration(transitionDuration)
                .attr('y', function (n) {
                    return (n.y0 + n.y1) / 2;
                })
                .attr('x', function (n) {
                    return n.x0 - 30;
                });
        });

        /* Set links to new position */
        for (const link of oldGraph.links) {
            let visualLink;
            if (oldLinkSet.has([link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                .toString()
            )
            ) {
                if (link.source.assessment === brokeExam && link.source.name === brokeGrade) {
                    const suffix = link.target.name[1];
                    if (suffix === '+' || ['9', '6', '3'].includes(suffix)) {
                        visualLink = newLinksObj['right']['A'];
                    }
                    else if (suffix === '#' || ['8', '5', '2'].includes(suffix)) {
                        visualLink = newLinksObj['right']['B'];
                    }
                    else if (suffix === '-' || ['7', '4', '1', '0'].includes(suffix)) {
                        visualLink = newLinksObj['right']['C'];
                    }
                    else {
                        console.error('I AM BROKEN')
                    }
                    link.width = 0;
                }
                else {
                    if (oldPointsNotInNewSet.has([link.target.assessment, link.target.name, link.target.value].toString())) {
                        const suffix = link.target.name[1];
                        if (suffix === '+' || ['9', '6', '3'].includes(suffix)) {
                            visualLink = newLinksObj['right']['A'];
                        }
                        else if (suffix === '#' || ['8', '5', '2'].includes(suffix)) {
                            visualLink = newLinksObj['right']['B'];
                        }
                        else if (suffix === '-' || ['7', '4', '1', '0'].includes(suffix)) {
                            visualLink = newLinksObj['right']['C'];
                        }
                        else {
                            console.log('I AM BROKEN')
                        }
                        link.width = 0;
                    }
                    else {
                        visualLink = newLinksObj['right'][link.target.name];
                        link.width = visualLink.width;
                    }
                }

                if (link.source.assessment === 'Final Exam') {
                    visualLink = link;
                }
            }
            else {
                visualLink = newLinks[link.source.assessment][link.source.name][link.target.assessment][link.target.name];
                link.width = visualLink.width;
            }
            link.y0 = visualLink.y0;
            link.y1 = visualLink.y1;
        }
        let soFar = 0;
        let total = graphlink["_groups"][0].length;
        const seen = {}
        seen['left'] = {}
        seen['right'] = {}
        graphlink.transition().duration(transitionDuration).attr('d', d3.sankeyLinkHorizontal()).style("stroke", function (link) {
            if (oldLinkSet.has([link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                .toString()
            )) {
                const direction = link.source.assessment.localeCompare(brokeExam) ? "left" : "right";
                const gradeToInput = direction.localeCompare("left") === 0 ? link.source.name : link.target.name;
                if (direction.localeCompare('left') === 0) {
                    return getNodeColor(link.source.name);
                }
                if (isNumber(link.source.name) && newLevel === 0) {
                    return getNodeColor(gradeScale(link.source.name));
                }
                if (isNumber(link.source.name)) {
                    return getNodeColor(specificLetterScale(gradeScale(link.source.name), link.source.name));
                }
                return getNodeColor(link.source.name[0])
            }
            return getNodeColor(link.source.name);
        }).style("stroke-width", function (n) {
            return n.width.toString() + "px";
        }).style("stroke-opacity", function (link) {
            if (oldLinkSet.has([link.source.assessment, link.source.name, link.target.assessment, link.target.name]
                .toString()
            )) {
                const direction = link.source.assessment.localeCompare(brokeExam) ? "left" : "right";
                const gradeToInput = direction.localeCompare("left") === 0 ? link.source.name : link.target.name;
                if (gradeToInput in seen[direction]) {
                    return 0.0;
                }
                else {
                    seen[direction][gradeToInput] = true;
                }
            }
            return 0.4;
        }).on("end", function () {
            soFar += 1;
            if (soFar === total) {
                removePlots();
                drawLinks(graph);
                drawNodes(graph);
            }
        });
    }
    /*************************************
     * 
     * 
     * 
     *              Graph
     * 
     * 
     ************************************** 
     */

    /* Creates title for the graph */
    svg.append("text")
        .attr("class", "title")
        .attr("x", width / 2)
        .attr("y", -15)
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "600")
        .text("Hierarchical Sankey Diagram");

    function setLabels(graph) {
        const examGraphLabel = [];
        let assessIndex = 0;
        for (const node of graph.nodes) {
            // console.log(node);
            if (node.assessment === assessments[assessIndex].trim()) {
                examGraphLabel.push((node.x0 + node.x1) / 2);
                assessIndex += 1;
            }
            if (assessIndex === assessments.length) {
                break;
            }
        }

        /* Adds x axis labels of pathway */
        svg.append("text")
            .attr("class", "axis-label")
            .attr("y", height + 25)
            .attr("x", examGraphLabel[0])
            .style("text-anchor", "middle")
            .text("Alert 1");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("y", height + 25)
            .attr("x", examGraphLabel[1])
            .style("text-anchor", "middle")
            .text("Alert 2");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("y", height + 25)
            .attr("x", examGraphLabel[2])
            .style("text-anchor", "middle")
            .text("Alert 3");

        svg.append("text")
            .attr("class", "axis-label")
            .attr("y", height + 25)
            .attr("x", examGraphLabel[3])
            .style("text-anchor", "middle")
            .text("Alert 4");
    }




    var button = svg.append("rect")
        .attr("x", width + 225)
        .attr("y", 0)
        .attr("width", 200)
        .attr("height", 50)
        .attr("class", "resetButton")
        .style("fill", "#DEDEDE")
        .style("stroke", "#000000")
        .style("stroke-width", "2")
        .style("fill-opacity", 0.7)
        .style("rx", "12px")
        .style("ry", "12px")
        .classed("button", true)
        .on("mouseover", function (d) {
            d3.select(this)
                .style("fill", "#a9a9a9")
                .style("fill-opacity", 0.7);
        })
        .on("mouseout", function (d) {
            d3.select(this)
                .style("fill", "#DEDEDE")
                .style("fill-opacity", 0.7);
        })
        .on("click", () => resetGraph());


    /* Adds reset button */
    svg.append("text")
        .attr("x", width + 300)
        .attr("y", 30)
        .classed("button", true)
        .text("Reset")
        .style("fill", "#000000")
        .style("font-weight", "bold")
        .style("opacity", 1.0)
        .on("mouseover", function (d) {
            d3.select(".resetButton")
                .style("fill", "#DEDEDE")
                .style("fill-opacity", 0.7);
        })
        .on("mouseout", function (d) {
            d3.select(".resetButton")
                .style("fill", "#000000")
                .style("fill-opacity", 0.0);
        })
        .on("click", () => resetGraph());


    /*************************************
     * 
     * 
     * 
     *              Driver
     * 
     * 
     ************************************** 
     */
    /** Driver Function */
    populateGradeLevelMap();
    const starterData = formatSankey()
    drawSankey(starterData, true);

    /* Reset Function */
    function resetGraph() {
        removePlots();
        populateGradeLevelMap();
        const starterData = formatSankey()
        drawSankey(starterData, true);
    }
}