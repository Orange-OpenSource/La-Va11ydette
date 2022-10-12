/**
 * Filter manager
 */

/**
 * Filter initialization, filters HTML elements are build here from the global var arrayFilterNameAndValue.
 */
 initFilters = function () {


    globalFilter();
    
    // @todo à supprimer dans le futur 08/08/2022
    if (globalTemplate==="audit") {
        PropertyFilterMarkup("arrayProfileActivated", "arrayProfileNameAndValue", "profile");
        PropertyFilterMarkup("arrayTypeActivated", "arrayTypeNameAndValue", "type");
    }

    if(globalTemplate==="audit" || globalTemplate==="wcag"){

        if(globalTemplate==="wcag"){
            goodPracticeFilter();
        }

        let htmlWcagDisplay = '<div class="border-top border-light my-3"></div>';
        htmlWcagDisplay += '<div class="form-check form-switch"><label class="form-check-label pb-1 d-print-none" id="labelWcagDisplay"><input type="checkbox" class="form-check-input" id="typeWcagDisplay" value=""><span class="form-check-label" id="displayWcag">' + langVallydette.wcagView + '</span></label></div>';
        let wcagDisplayItem = document.createElement("div");
        wcagDisplayItem.innerHTML = htmlWcagDisplay;
        htmlFilterContent.appendChild(wcagDisplayItem);
        
        var typeWcagDisplayInput = document.getElementById("typeWcagDisplay");
        typeWcagDisplayInput.addEventListener('click', function () {
                wcagDisplayMode(this);
            }, false);
    }
    
}

/**
* Global filter for all checklist
* Expand/colapse test and compliant, noncompliant... switch
*/
function globalFilter(){

    htmlFilterContent.innerHTML = '';

    /* Display part */
    let htmlDisplayHeading = document.createElement('h3');
    htmlDisplayHeading.textContent = langVallydette.display;
    htmlDisplayHeading.className = "h4";
    htmlFilterContent.appendChild(htmlDisplayHeading);

    let htmlDisplayButtonExpand = document.createElement("button");
    htmlDisplayButtonExpand.classList.add("btn", "btn-secondary", "btn-sm","m-2");
    htmlDisplayButtonExpand.id="btnPageExpanded";
    htmlDisplayButtonExpand.textContent=langVallydette.expandedAll;
    htmlFilterContent.appendChild(htmlDisplayButtonExpand);


    let htmlDisplayButtonCollapse = document.createElement("button");
    htmlDisplayButtonCollapse.classList.add("btn", "btn-secondary", "btn-sm","m-2");
    htmlDisplayButtonCollapse.id="btnPageCollapsed";
    htmlDisplayButtonCollapse.textContent=langVallydette.expandedAllFalse;
    htmlFilterContent.appendChild(htmlDisplayButtonCollapse);

    let htmlBorderSeparate = document.createElement("div");
    htmlBorderSeparate.innerHTML = '<div class="border-top border-light my-3"></div>';
    htmlFilterContent.appendChild(htmlBorderSeparate);

    document.getElementById('btnPageExpanded').addEventListener('click', function (e) {
        document.querySelectorAll("button.btn-expanded").forEach( element =>{
                if (element.attributes['aria-expanded'].value==="false"){
                    element.click();
                }
        })
    });

    document.getElementById('btnPageCollapsed').addEventListener('click', function (e) {
        document.querySelectorAll("button.btn-expanded").forEach( element =>{
                if (element.attributes['aria-expanded'].value==="true"){
                    element.click();
                }
        })
    });
    
   


    /* Filter part */
    let htmlFilterHeading = document.createElement('h3');
    htmlFilterHeading.textContent = langVallydette.template.filters;
    htmlFilterHeading.className = "h4";
    htmlFilterContent.appendChild(htmlFilterHeading);

    let htmlFilterFeedback = document.createElement('div');
    htmlFilterFeedback.setAttribute("id", "feedback"); 
    htmlFilterFeedback.setAttribute("role", "alert"); 
    htmlFilterContent.appendChild(htmlFilterFeedback);

    let htmlFilterList = document.createElement('ul');
    htmlFilterList.classList.add("list-unstyled");
    
    for (let i in arrayFilterNameAndValue) {
        var isChecked = "";
        arrayFilterActivated.forEach(element => {element === arrayFilterNameAndValue[i][1] ? isChecked = "checked" : ''});
        htmlTypes = '<div class="form-check form-switch"><label class="form-check-label pb-1" id="labelType' + i + '"><input type="checkbox" class="form-check-input" id="result' + i + '" value="' + arrayFilterNameAndValue[i][1] + '" '+ isChecked+ '><span class="form-check-label" id="status' + i+1 + '">' + arrayFilterNameAndValue[i][0] + '</span></label></div>';
        
        var listItem = document.createElement("li");
        listItem.innerHTML = htmlTypes;
        htmlFilterList.appendChild(listItem);
        htmlFilterContent.appendChild(htmlFilterList);

        /** Filters event handler. */
        var inputItem = document.getElementById("result" + i);
        inputItem.addEventListener('click', function () {
            updateArrayFilter(this)
        }, false);

    }
}

/**
* Filter good practice to wcag checklist
* display good practice or not
*/
function goodPracticeFilter(){
    let htmlFilterList = document.getElementsByClassName('list-unstyled');
    var isChecked = ( dataVallydette.checklist.goodPractice===true ? "checked" :"" );

    htmlTypes = '<div class="form-check form-switch"><label class="form-check-label pb-1" id="labelTypeGoodPractice"><input type="checkbox" class="form-check-input" id="resultGoodPractice" '+ isChecked+ '><span class="form-check-label" id="statusGoodPractice">' + langVallydette.goodPracticeSwitch + '</span></label></div>';
    var listItem = document.createElement("li");
    listItem.innerHTML = htmlTypes;
    htmlFilterList[0].appendChild(listItem);

    var inputItem = document.getElementById("resultGoodPractice");
        inputItem.addEventListener('click', function (e) {
            if(e.target.checked){
               
                let goodPracticeElements= document.getElementsByClassName("good-practice");
                for (let item of goodPracticeElements) {
                    item.classList.remove('d-none')
                    
                }
                dataVallydette.checklist.goodPractice=true;
                localStorage.setItem('goodPractice',true)
            }
            else{
                let goodPracticeElements= document.getElementsByClassName("good-practice");
                for (let item of goodPracticeElements) {
                    item.classList.add('d-none')
                }
                dataVallydette.checklist.goodPractice=false;
                localStorage.setItem('goodPractice',false)
            }

            runFilter();
        }, false);

}

function getNbGoodPractice(){

    goodPracticeArray = [];
    filteredTest = dataVallydette.checklist.page[currentPage].items;

    if(dataVallydette.checklist.goodPractice == false ){
    
        goodPracticeArray = filteredTest.filter(o => {
            if( o.goodPractice){
                return o;
            }
        });
    
    } 

    return goodPracticeArray.length;
    
}

/**
* Create the filters markup (lists of filters)
*/
function PropertyFilterMarkup(arrayActivatedFilter, arrayNameAndValue, inputName) {

if (window[arrayNameAndValue]) {
    
    let htmlPropertyList = document.createElement('ul');
    htmlPropertyList.classList.add("list-unstyled");
    
    let separator = document.createElement("hr");
    separator.classList.add("border-light");
    htmlFilterContent.appendChild(separator);
    
        for (let i in window[arrayNameAndValue]) {
            var isChecked = "";
            
            window[arrayActivatedFilter].forEach(element => {element === window[arrayNameAndValue][i] ? isChecked = "checked" : ''});
            htmlProperty = '<label class="form-check pb-1" id="label' + inputName + i + '"><input type="radio" name="' + inputName + '" class="form-check-input" id="' + inputName + i + '" value="' + window[arrayNameAndValue][i] + '" '+ isChecked+ '><span class="form-check-label">' + window[arrayNameAndValue][i] + '</span></label>';
            
            var listPropertyItem = document.createElement("li");
            listPropertyItem.innerHTML = htmlProperty;
            htmlPropertyList.appendChild(listPropertyItem);
            htmlFilterContent.appendChild(htmlPropertyList);

            
            var inputItem = document.getElementById(inputName + i);
            
            inputItem.addEventListener('click', function () {
                updateRadioFilterArray(this, arrayActivatedFilter)
            }, false);

        }
    
    listPropertyItem = document.createElement("li");
    let buttonReset = document.createElement("button");
    buttonReset.classList.add("btn", "btn-secondary", "btn-sm");
    buttonReset.innerHTML = langVallydette.reset;
    buttonReset.addEventListener('click', function () {
        updateRadioFilterArray(false, arrayActivatedFilter)
    }, false);
    listPropertyItem.appendChild(buttonReset);
    htmlPropertyList.appendChild(listPropertyItem);
    htmlFilterContent.appendChild(htmlPropertyList);
    
}
}

/**
* Create the wcag view (cheklist tests and results displayed by wcag)
*/
function wcagDisplayMode(wcagDisplayModeInput) {

if (wcagDisplayModeInput.checked) {
    
     let wcagDisplayObj = runComputationWcag(true);

        let wcagDisplayContent = '';
        
        wcagDisplayContent += '<h3 class="sticky-md-top d-flex bg-white pt-4 pb-2">' + langVallydette.wcagView + '</h3>';
        
        for (let i in wcagDisplayObj[currentPage].items) {
            
            if ((globalTemplate==="wcag" && wcagDisplayObj[currentPage].items[i].level!="AAA") || globalTemplate!="wcag") {
                wcagDisplayContent += '<h4 class="sticky-md-top d-flex bg-white pt-4 pb-3 border-bottom">'+ wcagDisplayObj[currentPage].items[i].wcag + ' ' + wcagDisplayObj[currentPage].items[i].name +' ' + wcagDisplayObj[currentPage].items[i].level + '</h4>';

                wcagDisplayContent += '<table class="table table-striped"><caption class="visually-hidden">' + langVallydette.wcagView + '</caption>';
                wcagDisplayContent += '<thead><tr>';
                wcagDisplayContent += '<th scope="col">Tests</th>';
                wcagDisplayContent += '<th scope="col">' + langVallydette.resultHeading + '</th>';
                wcagDisplayContent += '</tr></thead>';
                wcagDisplayContent += '<tbody>';
                for (let j in wcagDisplayObj[currentPage].items[i].test) {
                    wcagDisplayContent += '<tr>';
                    wcagDisplayContent += '<td class="w-100">'+ wcagDisplayObj[currentPage].items[i].test[j].title +'</td>';
                    wcagDisplayContent += '<td><span class="ms-auto badge ' + getStatutClass(wcagDisplayObj[currentPage].items[i].test[j].result) + '">' + setStatutText(wcagDisplayObj[currentPage].items[i].test[j].result) + '</span></td>';
                    wcagDisplayContent += '</tr>';
                }
                wcagDisplayContent += '<tr class="bg-light2">';
                wcagDisplayContent += '<th class="font-weight-bold" scope="row">' + langVallydette.result + '</th>';
                wcagDisplayContent += '<td><span class="ms-auto badge ' + getStatutClass(wcagDisplayObj[currentPage].items[i].resultat) + '">' + setStatutText(wcagDisplayObj[currentPage].items[i].resultat) + '</span></td>';
                wcagDisplayContent += '</tr>';
                wcagDisplayContent += '</tbody></table>';
            }
            
        }
        
        htmlMainContent.innerHTML = wcagDisplayContent;
        
        
        initAnchorMenu();
} else {
    showPage(dataVallydette.checklist.page[currentPage].IDPage);
}

}

/**
* Update the filter counter each an new filter is applied or disabled.
* @param {boolean} activeFilter - if at least one filter is activated => true, if not => false.
* @param {number} nbTests - total number of test depending on filters.
*/
updateCounter = function (activeFilter, nbTests) {
let elFeedback = document.getElementById('feedback');
let htmlFeedback = '';

nbTests -=getNbGoodPractice();
if(nbTests<0){
    nbTests=0;
}

if (activeFilter) {
    htmlFeedback = '<p><span><b>' + nbTests + '</b> ' + langVallydette.filterFeedback2 + '</span></p>';
    elFeedback.innerHTML = htmlFeedback;
} else {
    htmlFeedback = '<p><b>' + nbTests  + '</b> ' + langVallydette.filterFeedback1 + '</p>';
    elFeedback.innerHTML = htmlFeedback;
}
};

/**
* Run when a filter switch button is activated. Update the array of enabled filters. 
* @param {object} elInput - switch button. 
*/
updateArrayFilter = function (elInput) {

if (elInput && elInput.checked) {
    
    arrayFilterActivated.push(elInput.value);
    
} else {
    
    arrayFilterActivated = arrayFilterActivated.filter(function(filterValue) {
        return filterValue !== elInput.value;
    });
    
}

loadChecklistObject();

}

/**
* Run when a filter radio button is activated. Update the array of enabled filters. 
* @param {object} elInput - radio button. 
*/
updateRadioFilterArray = function (elInput, arrayToUpdate) {

window[arrayToUpdate].splice(0, window[arrayToUpdate].length);

if (elInput && elInput.checked) {
    
    window[arrayToUpdate].push(elInput.value);
    
} 

loadChecklistObject();

}

/**
* Get the unique entry from an object property, in order to build a filter array
* @param {object} objectToParse
* @param {string} property - property from vallydette object. 
*/
function uniqueEntry(objectToParse, property) {
uniqueEntryArray = [];
objectToParse.forEach(function(item){
        item[property].forEach(function(entry){
            uniqueEntryArray.push(entry);
        });
    })
    
    return [...new Set(uniqueEntryArray)];
}


/**
* Apply the filters to the vallydette object, and run display function (runTestListMarkup) with the new filtered object
*/	
runFilter = function() {

function filtrerParID(prop, arrayFilters) {
    
    return function(obj) {
        var isOK;	
        obj[prop].forEach(function(current) {
            
            if(window[arrayFilters].includes(current)) {				
                isOK = true;	
            } 
                
        })
    
        return isOK;
    
    }
}

filteredTest = dataVallydette.checklist.page[currentPage].items;

if(arrayFilterActivated && arrayFilterActivated.length > 0){
    
    filteredTest = filteredTest.filter(o => arrayFilterActivated.includes(o.resultatTest));

} 

if(arrayProfileActivated && arrayProfileActivated.length > 0){
    
    filteredTest = filteredTest.filter(filtrerParID("profils", "arrayProfileActivated"));
    
} 

if(arrayTypeActivated && arrayTypeActivated.length > 0){
    
    filteredTest = filteredTest.filter(filtrerParID("type", "arrayTypeActivated"));

}

runTestListMarkup(filteredTest);
updateCounter(true, filteredTest.length);
}


/**
* Some pages (actually the audit result page) no need of the filter menu.
*/
removeFilterSection = function () {
htmlFilterContent.innerHTML = "";
}

/**
* Run when the checklist display must be updated (when a filter is applied for example)
*/		
loadChecklistObject = function () {
initFilters();
if((arrayFilterActivated && arrayFilterActivated.length > 0) || (arrayProfileActivated && arrayProfileActivated.length > 0) || (arrayTypeActivated && arrayTypeActivated.length > 0)){
    runFilter();
} else {
    runTestListMarkup(dataVallydette.checklist.page[currentPage].items);
    updateCounter(false, dataVallydette.checklist.page[currentPage].items.length);
}
}