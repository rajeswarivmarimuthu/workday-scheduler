
// Global Variables declared here!!
var todayEl = document.getElementById("currentDay")
var plannerTab = document.getElementById('myTable');
var today = moment().format('dddd, MMMM Do');
var currentTimeHH = moment().format('H')
var currentTime = moment().format('h');
var startTime = 9;  // must be in 24 hours format!!
var workingHours = 10; // 
todayEl.innerText = today;


// Build Time blocks and fetching value from localstorage
for (i=0;i<workingHours;i++){
    addTimeBlocks(i, startTime);
}
retrieveEventDetails();

// Save event details to localstorage when the values button is clicked
plannerTab.addEventListener ('click', function(e){
    e.preventDefault;
    console.log(e);
    var arrEvent = []; 
    let eventDesc;
    var tdElement;

    if (e.target.id == 'iconSave') {
        var iconParent = e.target.parentElement;
        tdElement = iconParent.parentElement;
    } else if (e.target.id == 'button') {
        tdElement = e.target.parentElement;
    }

    if (tdElement){
        var trElement = tdElement.parentElement;
        var rowID = trElement.id;
        var cellValue = trElement.children[1].innerText;
        console.log(cellValue);
            if (cellValue) {
                var localStorageString = JSON.parse(localStorage.getItem("eventDesc"));
                if (localStorageString) {
                    arrEvent = localStorageString;
                }
                eventDesc = {
                    "row" : rowID,
                    "eventValue" : cellValue
                }
                arrEvent.push(eventDesc); 
                localStorage.setItem("eventDesc", JSON.stringify(arrEvent));
            }
    }

    return;
});


///function to add time blocks
function  addTimeBlocks(rowCnt,startTime) {
    //define some attributes for table, table row and cells 

    const timeAttributes = {
        type: 'text',
        width: '10%',
        class: 'border-right border-bottom p-1 hour text-right'
    }
   
    const pastDescAtrributes = {
        width: '85%',
        class: 'border-right border-bottom p-1 table-secondary description  text-left',
        id: 'event',
        contenteditable: 'false'
    }

    const presentDescAtrributes = {
        width: '85%',
        class: 'border-right border-bottom p-1 table-danger description text-left',
        id: 'event',
        contenteditable: "true"
    }

    const futureDescAtrributes = {
        width: '85%',
        class: 'border-right border-bottom p-1 table-success description text-left',
        id: 'event',
        contenteditable: "true"
    }

    const actionAttributes = {
        width: "5%",
        class: "p-1 border-bottom-0"
    }     
    
    const buttonAttributes = {
        type: 'button',
        class: 'saveBtn p-1',
        id: 'button',
    }

    const iconAttributes = {
        class: 'fas fa-save',
        id: 'iconSave'
    }

    // Inserting rows based on number of working hours
    var tr = plannerTab.insertRow(rowCnt);  
    tr = plannerTab.insertRow(rowCnt);
    trID = 'tr' + rowCnt; 
    tr.setAttribute("id", trID); 

    // formatting the time to be displayed in the table for the current day 
    displayTime = startTime + rowCnt; 
    if (displayTime >= 24) {
       return;
    } 

    if (displayTime > 0 && displayTime < 12) {
        displayHour = displayTime + " AM";
    } else if (displayTime < 24 && displayTime > 12) {
        displayHour = (displayTime - 12) + " PM";
    } else if (displayTime == 24) {
        displayHour = (displayTime - 12) + " AM";
    } else if (displayTime == 12) {
        displayHour = displayTime + " PM";
    } else { 
        console.log ('invalid display time')
        return;
    };
    

    // Inserting the cells to the table and applying the aattributes as mandated
    for (var c = 0; c < 3; c++) {
        var td = document.createElement('td');         
        td = tr.insertCell(c);

        switch(c) {
            case 0 :    
                setAttributes(td,timeAttributes)  // Table data
                td.innerText = displayHour;
                break;
            case 1 :
                if (currentTimeHH > displayTime) {
                    setAttributes(td, pastDescAtrributes);
                } else if (currentTimeHH < displayTime) {
                    setAttributes(td, futureDescAtrributes);
                } else {
                    setAttributes(td, presentDescAtrributes);
                }
                break;
            case 2 :
                setAttributes(td, actionAttributes)
                var button = document.createElement('button');
                var buttonIcon = document.createElement("i");
                setAttributes(buttonIcon,iconAttributes);
                setAttributes(button,buttonAttributes);
                td.appendChild(button);
                button.appendChild(buttonIcon);
                break;
        }
    }
    return;
}


//function to apply the styling attributes 
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
      element.setAttribute(attr, attributes[attr]);
    });
  }

//Logic to retrieve event details from local storage
function retrieveEventDetails () {
    var localStorageString = JSON.parse(localStorage.getItem("eventDesc"));
    var tableRowEl;
    var arrEvent = []; 
    if (localStorageString) {
        arrEvent = localStorageString;
        console.log(arrEvent);
        for (let i =0 ; i <= arrEvent.length - 1; i++ ) {
            tableRowEl = document.getElementById(arrEvent[i].row);
            console.log (tableRowEl);
            tableRowEl.children[1].innerText = arrEvent[i].eventValue;
        }
    }
    
}