import '../CSS/Calendar.css';
import React, { Component } from 'react';
import styles from '../CSS/Calendar.css'

let hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', 
'2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
export default class Calendar extends Component {
    constructor() {
      super();
  
      this.weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      this.hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', 
                     '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    }
    
    render() {
        return (
            <div className="calendar">
                <div className="calendar-header"></div>
              
                <div className="calendar-body">
                    <div className="table-header">
                        {
                            this.weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                            })
                            
                        }  
                    </div>
                    <div className="central">
                        <table className="boxes">  
                            {
                                boxer()
                            }
                        </table>
                    </div>
              </div>
            </div>
          )
          
        }
      
}


function sections(boxes){
    let row = []
    for(let i = 0; i < boxes; i++) {
        row.push(<td></td>)
    }
    return row
}

function boxer(){
    let tabler = []
    for(let i = 0; i < 12; i++){
        let row = sections(7)
        tabler.push(<tr><p className="hours">{hours[i]}</p>{row}</tr>)
    }
    return tabler
}


