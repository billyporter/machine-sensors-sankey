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
const width = 890 - margin.left - margin.right; //890;
const height = 740 - margin.top - margin.bottom; //740;
const legendWidth = 600;
const legendHeight = 900;

/* Sets up svg */
const svg = d3.select("#canvas")
    .attr("width", width + margin.left + 50 + margin.right + 500)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(50, 30)");