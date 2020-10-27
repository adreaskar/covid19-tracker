
export function yesterdayStats(obj1,obj2) {

    var casesDiff = Math.abs(obj1.todayCases - obj2.todayCases);
    var percentCases = 0;
    if (obj1.todayCases > obj2.todayCases) {
        percentCases = ((casesDiff / obj2.todayCases) * 100).toFixed(1);
        console.log(percentCases);
    }
}