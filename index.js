// Your code here
const createEmployeeRecord = (array)=> {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = (array)=> {
    return array.map(createEmployeeRecord)
}

const createTimeInEvent = (employeeRecord, dateTime)=> {
    let [date, time] = dateTime.split(" ")
     employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateTime)=> {
    let [date, time] = dateTime.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour:parseInt(time),
        date: date
    })

    return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, date)=> {
    let timeInEvents = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutEvents = employeeRecord.timeOutEvents.find(event => event.date === date)

    if(timeInEvents && timeOutEvents) {
        let hoursWorked = (timeOutEvents.hour - timeInEvents.hour) /100
        return hoursWorked
    }
}

const wagesEarnedOnDate = (employeeRecord, date)=> {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let payRate = employeeRecord.payPerHour
    let wagesEarned = hoursWorked*payRate
    return wagesEarned
}

const allWagesFor = (employeeRecord)=> {
    let fullDates = employeeRecord.timeInEvents.map(event => event.date)
    
    let allWages = fullDates.reduce((acc, date) => acc + wagesEarnedOnDate(employeeRecord, date), 0);
    return allWages;
}

const calculatePayroll= (employeeRecords)=> {
    let totalPayroll = employeeRecords.reduce((acc, employeeRecord)=>acc + allWagesFor(employeeRecord), 0);
    return totalPayroll;
 }