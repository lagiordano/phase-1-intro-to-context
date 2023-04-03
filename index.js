// Your code here


function createEmployeeRecord ([a, b, c, num]) {
    return {
        firstName: a,
        familyName: b,
        title: c, 
        payPerHour: num,
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords (employeesInfo) {
    let employeeRecords = employeesInfo.map(employee => createEmployeeRecord(employee));
    return employeeRecords;
       
};


function createTimeInEvent (employeeRecord, dateStamp) {
    employeeRecord.timeInEvents.push(
        {
            type: "TimeIn",
            date: dateStamp.slice(0, 10),
            hour: parseInt(dateStamp.slice(11, 15))
        }
    );
    return employeeRecord;
};


function createTimeOutEvent (employeeRecord, dateStamp) {
    employeeRecord.timeOutEvents.push(
        {
            type: "TimeOut",
            date: dateStamp.slice(0, 10),
            hour: parseInt(dateStamp.slice(11, 15))
        }
    );
    return employeeRecord;
};



function hoursWorkedOnDate (employeeRecord, dateSpecified) {
    let startWork = employeeRecord.timeInEvents.find(entry => entry.date === dateSpecified);
    let finishWork = employeeRecord.timeOutEvents.find(entry => entry.date === dateSpecified);
    return (finishWork.hour - startWork.hour) / 100;
};

function wagesEarnedOnDate (employeeRecord, dateSpecified) {
    return hoursWorkedOnDate(employeeRecord, dateSpecified) * employeeRecord.payPerHour;
};


function allWagesFor (employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(entry => entry.date);
    let wagesArr = [];
    datesWorked.forEach(item => wagesArr.push(wagesEarnedOnDate(employeeRecord, item)));
    return wagesArr.reduce( (accum, curr) => accum + curr, 0);
}


function calculatePayroll (employeeRecords) {
    let allEmployeesWagesArr = employeeRecords.map(employee => allWagesFor(employee));
    return allEmployeesWagesArr.reduce( (accum, curr) => accum + curr, 0);
}


