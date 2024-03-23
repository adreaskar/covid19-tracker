'use server';

export const calcStats = (data, yestData) => {
    let stats = {};

    // Calculate the percentage of cases difference
    let casesDiff = data.todayCases - yestData.todayCases;
    if (casesDiff === 0) {
        stats.percentCases = 0;
        stats.raise = false;
    } else if (casesDiff < 0) {
        stats.percentCases = ((casesDiff / data.todayCases) * 100).toFixed(1);
        stats.raise = false;
    } else {
        stats.percentCases = ((casesDiff / yestData.todayCases) * 100).toFixed(
            1,
        );
        stats.raise = true;
    }

    return stats;
};
