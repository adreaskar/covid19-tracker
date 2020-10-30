
export function yesterdayStats(obj1,obj2) {

    var data = {};

    var casesDiff = Math.abs(obj1.todayCases - obj2.todayCases);
    if (obj1.todayCases > obj2.todayCases) {
        data.percentCases = ((casesDiff / obj2.todayCases) * 100).toFixed(1);
        data.raise = true;
    } else {
        data.percentCases = ((casesDiff / obj1.todayCases) * 100).toFixed(1);
        data.raise = false;
    }

    let diff = obj1.tests - obj2.tests;
    if (diff > 0) {
        data.testsToday = diff;
        data.testsTodayGR = false;  
    } else {
        data.testsToday = "Not updated";
        data.testsTodayGR = true;
    }

    return data;
}