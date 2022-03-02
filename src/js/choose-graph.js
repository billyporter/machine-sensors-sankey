breakdownJS();
// treeJS();
// hierJS();
var graphChoices = ["Breakdown", "Color", "Tree", "Hierarchy"];

/* Select graph */
document.graphChoice[0].addEventListener('change', function () {
    d3.selectAll("svg > *").remove();
    breakdownJS();
});

document.graphChoice[1].addEventListener('change', function () {
    d3.selectAll("svg > *").remove();
    colorJS();
});

document.graphChoice[2].addEventListener('change', function () {
    d3.selectAll("svg > *").remove();
    treeJS();
});

document.graphChoice[3].addEventListener('change', function () {
    d3.selectAll("svg > *").remove();
    hierJS();
});

/* Select label toggle */
// var showNodeLabels = false;
// var showLinkLabels = false;
// document.labelChoice[0].addEventListener('change', function () {
//     showNodeLabels = !showNodeLabels;
// });

// document.labelChoice[1].addEventListener('change', function () {
//     showLinkLabels = !showLinkLabels;
// });