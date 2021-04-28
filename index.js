let createEmployeeRecord = function(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(nestedArray){
    return nestedArray.map(element => {
        return createEmployeeRecord(element)});
}

let createTimeInEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
}

let createTimeOutEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
}

let hoursWorkedOnDate = function (givenDate){
    let start = this.timeInEvents.find(t =>{
        return t.date === givenDate
    });
  
    let end = this.timeOutEvents.find(t =>{
        return t.date === givenDate
    });
    return (end.hour - start.hour) / 100;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 let wagesEarnedOnDate = function (dateSought){
    let totalPay = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour;
    return parseFloat(totalPay.toString());
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(init, value){
        return init + allWagesFor.call(value);
    }, 0)
}

let findEmployeeByFirstName = function (employeeArray, firstName) {
    return employeeArray.find(function(n){
      return n.firstName === firstName
    })
  }