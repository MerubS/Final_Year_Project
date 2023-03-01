const getEndDate = (startdate , limit , unit) => {
    let date = new Date (startdate);
    if (unit === 'hr        ') {
     return date.setHours(date.getHours() + limit);
    }
    else if (unit === 'min       ') {
    limit = limit * 60000;
    return new Date(date.getTime() + limit);
    }
    }


module.exports = {getEndDate}