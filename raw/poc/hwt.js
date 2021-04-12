let url = "https://www.espncricinfo.com/series/england-tour-of-india-2020-21-1243364/india-vs-england-2nd-t20i-1243389/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        
        extractHtml(html);
    }
}
function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let bowlerstable = selectorTool(".table.bowler");
    
    for (let i = 0; i < bowlerstable.length; i++) {
        let singleInningBol = selectorTool(bowlerstable[i]).find("tbody tr");
        for (let j = 0; j < singleInningBol.length; j++) {
            let singleAllCol = selectorTool(singleInningBol[j]).find("td");
            let name = selectorTool(singleAllCol[0]).text();
            let wickets = selectorTool(singleAllCol[4]).text();
            console.log("Name->",name,"wickets->",wickets);
        }
        console.log("```````````````````````````````");
    }
}
console.log("after");   