let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        //console.log(html);
        extractData(html);
    }
}
function extractData(html)
{
   let selTool = cheerio.load(html);
   let linksArr=[];
   let anchorArr= selTool("a[data-hover='scorecard']");
   for(let i=0;i< anchorArr.length;i++)
   {
       let link = selTool(anchorArr[i]).attr("href");
       let fulllink ="https://www.espncricinfo.com" + link;
       linksArr.push(fulllink);
     }
     extractPlayerNameSerially(linksArr, 0);
 } 
 function extractPlayerNameSerially(linksArr, n)
 {
     if(n == linksArr.length)
     {
         return;
     }
 request(linksArr[n], cb);
 function cb(err,request, html)
 {
     if(err)
     {
         console.log(err);
     }
     else
     {
         printPlayerName(html);
         extractPlayerNameSerially(linksArr, n+1);
     }
 }
}
function printPlayerName(html){
    let selTool =cheerio.load(html);
    let PlayerName = selTool(".best-payer-name");
    console.log(PlayerName.text());
}
   