

var todayEl = document.getElementById("currentDay")
var plannerTab = document.getElementById('myTable');
var today = moment().format('dddd, MMMM Do');
var currentTimeHH = moment().format('H')
var currentTime = moment().format('h');
var startTime = 9;  // must be in 24 hours format!!
todayEl.innerText = today;


// Build Time blocks and fetching value from localstorage
for (i=0;i<8;i++){
    addTimeBlocks(i, startTime);
}
retrieveEventDetails();

///function to add time blocks
function  addTimeBlocks(rowCnt,startTime) {

    var tr = plannerTab.insertRow(rowCnt); // table row.
    tr = plannerTab.insertRow(rowCnt);
    trID = 'tr' + rowCnt; 
    tr.setAttribute("id", trID); 

    const timeAttributes = {
        type: 'text',
        width: '10%',
        class: 'border-right border-bottom p-1 hour'
    }
   
    const pastDescAtrributes = {
        type: 'label',
        width: '75%',
        class: 'border-right border-bottom p-1 table-secondary ',
        id: 'event',
        contenteditable: 'false'
    }

    const presentDescAtrributes = {
        type: 'label',
        width: '75%',
        class: 'border-right border-bottom p-1 table-danger',
        id: 'event',
        contenteditable: "true"
    }

    const futureDescAtrributes = {
        type: 'label',
        width: '75%',
        class: 'border-right border-bottom p-1 table-success',
        id: 'event',
        contenteditable: "true"
    }

    const actionAttributes = {
        type: "label",
        width: "5%",
        class: "border-bottom border-right p-1"
    }     
    
    const buttonAttributes = {
        type: 'button',
        class: 'saveBtn p-1',
        id: 'button',
        value: 'Save',
        width: '100%'
    }

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
    };
    
   

    for (var c = 0; c < 3; c++) {
        var td = document.createElement('td');         
        td = tr.insertCell(c);

        switch(c) {
            case 0 :    
                setAttributes(td,timeAttributes)  // Table data
                td.innerText = displayHour;
                break;
            case 1 :
                console.log (currentTimeHH, displayTime);
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
                var button = document.createElement('input');
                setAttributes(button,buttonAttributes);
                td.appendChild(button);
                break;
        }
    }
    return;
    function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(attr => {
          element.setAttribute(attr, attributes[attr]);
        });
      }
}

// Save event details to localstorage when the values button is clicked
plannerTab.addEventListener ('click', function(e){
    e.preventDefault;
    console.log(e.target.id);
    if (e.target.id == 'button') {
        var tdElement = e.target.parentElement;
        var trElement = tdElement.parentElement;
        var rowID = trElement.id;
        var arrEvent = []; 
        let eventDesc;
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

});

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