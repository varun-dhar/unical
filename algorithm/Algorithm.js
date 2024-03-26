//import { Time, MeetingTime } from "./modules/Times"

class Time {

    constructor(hour, minute) {
        this.hour = hour
        this.minute = minute
    }

    getDuration(that) {
        return (Math.abs(this.hour - that.hour) * 60) + (Math.abs(this.minute - that.minute))
    }
}

class MeetingTime {
    start
    end
    duration

    constructor(start, end) {
        this.start = start
        this.end = end
        this.duration = this.end.getDuration(this.start);
    }

    sameTime(that) {
        return ((this.start.hour <= that.start.hour) && (this.end.hour >= that.end.hour)
        || (this.start.hour >= that.start.hour) && (this.end.hour <= that.end.hour)
        || (this.start.hour <= that.start.hour) && (this.end.hour >= that.end.hour))
    }
}


function sameDays(days1, days2) {
    for (day in days1) {
        for (da in days2) {
            if (day === da) {
                return true
            }
        }
    }
    return false
}


function convertToNormalTime(shit) {
    
    var hr = Math.floor(shit / 3600)
    var min = Math.floor((shit.start - (startHour * 3600)) / 60)
    
    return new Time(hr, min)
    
}

function convertToNormalMeatTIme(start, end) {
    return new MeetingTime(convertToNormalTime(start), convertToNormalTime(end))
}


function filter(res, prefTime) {
    var filtered = []
    var maybes = []
    
    for (course in res) {
        if (course.meetTime.sameTime(prefTime)) {
            if (course.seats != 0) {
                maybes.push(course)
            }
        } else {
            filtered.push(course)
        }
    }

    return {
        "Optimal": organizeAndSort(filtered),
        "Potential" : organizeAndSort(maybes)
    }
}

function sortByRate(list) {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

function merge(left, right) {
    let sortedArr = [] // the sorted items will go here
    while (left.length && right.length) {
      // Insert the smallest item into sortedArr
      if (left[0].rate < right[0].rate) {
        sortedArr.push(left.shift())
      } else {
        sortedArr.push(right.shift())
      }
    }
}

function genSchedule(courses, classes) {
   var iterate = []
   for (const [key, value] of Object.entries(courses)) {
    iterate.push(sortByRate(value))
   }

   var schedule = []
   var branches = []

   schecude[0] = iterate[0][0]

   

}