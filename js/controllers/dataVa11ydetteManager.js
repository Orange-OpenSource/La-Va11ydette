/**
 *  update the dataVallydette object with the selected checklist object
 */
 function importCriteriaToVallydetteObj (criteriaVallydette) {
 
	/* @TODO virer partie audit */
	if (checklistVallydette[currentCriteriaListName].template === 'audit'){
		criteriaVallydette.forEach(function (criteria, key) {
			 criteria.resultatTest = "nt";
			 
		 })
	}

	dataVallydette.checklist.name = checklistVallydette[currentCriteriaListName]['name-' + globalLang];
	dataVallydette.checklist.page[0].groups = {};
    dataVallydette.checklist.page[0].items = dataVallydette.checklist.page[0].items.concat(criteriaVallydette);

	dataVallydette.checklist.page[0].items.forEach(function (test) {
		test.issues = [];

		if(test.group) {
			if(dataVallydette.checklist.page[0].groups[test.group]){
				dataVallydette.checklist.page[0].groups[test.group].idTests.push(test.IDorigin);
			} else {
				dataVallydette.checklist.page[0].groups[test.group] = {};
				dataVallydette.checklist.page[0].groups[test.group].idTests = [];
				dataVallydette.checklist.page[0].groups[test.group].checked = true;
				dataVallydette.checklist.page[0].groups[test.group].idTests.push(test.IDorigin);
			}
			
		}
		
	}); 
	
	dataVallydette.checklist.lang = globalLang;
	dataVallydette.checklist.version = globalVersion;
	dataVallydette.checklist.template = globalTemplate;
	
	utils.setPageTitle();
	
	//eventHandler();
	
	runVallydetteApp();
}

/**
 *  Initialization of events for import button, and checklist name edition button.
 */
 function eventHandler() {

	var btnImport = document.getElementById('import');
	
	btnImport.onclick = function () {
		var files = document.getElementById('selectFiles').files;
		let alert = document.getElementById('import-alert');
		alert.classList.add('d-none');

		if(files.length==0){
			alert.classList.remove('d-none');
			alert.innerHTML='<span class="alert-icon"></span><p>'+ langVallydette.importErrorEmpty +'</p>';
		}
		else{
			var fr = new FileReader();

			fr.onload = function (e) {
				let dataFile = JSON.parse(e.target.result);
				if (dataFile.hasOwnProperty('checklist')) {
					dataVallydette = managementDeprecatedComment(dataFile);
						
					//fix obsolete referentiel name (from 1.4 checklist version)
					if (dataVallydette.checklist.referentiel === "wcagEase") {
						dataVallydette.checklist.referentiel = "wcag-web";
					}
					
					currentCriteriaListName = dataVallydette.checklist.referentiel;
					initAuditPage();
					initGlobalLang(dataVallydette.checklist.lang, true);
					initGlobalTemplate(dataVallydette.checklist.template);
					checkTheVersion(dataVallydette.checklist.version);
					loadIssue();
					document.getElementById("btnImport").click();
					utils.putTheFocus(document.getElementById("checklistName"));
					runLangRequest();
					setTimeout(function(){ jsonUpdate(); }, 500);
				}
				else{
					alert.classList.remove('d-none');
					alert.innerHTML='<span class="alert-icon"></span><p>'+ langVallydette.importError +'</p>';
				}
			}
			fr.readAsText(files.item(0));	
		}
		
	};
	
	var inputSelectFile = document.getElementById("selectFiles");
	inputSelectFile.addEventListener('change', function () {
		document.getElementById("selectFilesLabel").innerText = inputSelectFile.files[0].name;
	}, false);
	
}

/**
 *  Initialization of events for name audit button, and local Storage button.
 */

 function AuditEventHandler(){
	var btnChecklist = document.getElementById("btnChecklistName");


	btnChecklist.addEventListener('click', function () {
		setValue(btnChecklist.dataset.element, btnChecklist.dataset.property);
	}, false);

	var btnLocalStorage = document.getElementById("btnLocalStorage");
	btnLocalStorage.addEventListener('click', function () {
		runLocalStorage();
	}, false);

	if(Object.keys(getAllStorage()).length === 0){
		btnLocalStorage.disabled=true;
		btnLocalStorage.classList.add("disabled");
	}
	btnActionPageEventHandler();

}

/**
 *  Initialization of events for page name edit button and page delete button.
	This function is running each time the user move to a new page 
 */
    function btnActionPageEventHandler () {
	
        var currentBtnPageName = document.getElementById('btnPageName');
        var currentBtnDelPage = document.getElementById('btnDelPage');
        
        currentBtnPageName.addEventListener('click', function () {
            setValue(currentBtnPageName.dataset.element, currentBtnPageName.dataset.property, currentBtnPageName.dataset.secondaryElement)
        }, false);
    
        currentBtnDelPage.addEventListener('click', function () {
            setDeletePage(currentBtnPageName.dataset.property)
        }, false);
    
    }

/**
 *  Get the localstorage object
 * @param {string} auditName - Audit name in locale storage
 */
 function getLocalStorage(auditName) {
	
	let objLocalStorage = localStorage.getItem(auditName);
	dataVallydette = managementDeprecatedComment(JSON.parse(objLocalStorage));
	
	initGlobalLang(dataVallydette.checklist.lang, true);
	initGlobalTemplate(dataVallydette.checklist.template);
	
	checkTheVersion(dataVallydette.checklist.version);	
	loadIssue();

	runLangRequest();						
}

/**
 * Get all local storage va11ydette audit
 * 
 * @returns 
 */
 function getAllStorage() {

    var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
		if( keys[i].indexOf('lavallydette')>=0 ){
        	archive[ keys[i] ] = localStorage.getItem( keys[i] );
		}
    }


    return archive;
}

/**
 * Add or remove a test from the autocheckIDs array (depending if the checkbox is checked or not)
 * @param {object} e - autocheck input checkbox
 * @param {string} testIDorigin - test ID property from dataVa11ydette
 * @param {string} testID - current test ID property from dataVa11ydette
 */
 function setAutoCheckID(e, testIDorigin, testID) {
	
	if (e.checked) {
		if (!dataVallydette.checklist.page[currentPage].autoCheckIDs) {
			dataVallydette.checklist.page[currentPage].autoCheckIDs = [];
		}
		dataVallydette.checklist.page[currentPage].autoCheckIDs.push(testIDorigin);
		
		if(document.getElementById('link-' + testID) !== null){
			document.getElementById('link-' + testID).remove();
		}
		
		const iconHtml = '<span class="icon icon-Link mx-1 badge bg-warning" id="link-' + testID + '" title="' + langVallydette.autocheckTxt3 + '">'+htmlIcon.link+'<span class="visually-hidden">' + langVallydette.autocheckTxt3 + '</span>';
		const iconNode = new DOMParser().parseFromString(iconHtml, 'text/html').body.firstElementChild;
		let headingNode = document.getElementById('heading' + testID);
		headingNode.insertBefore(iconNode, headingNode.children[1]);

		if((currentPage != dataVallydette.checklist.page.length -1)){
			//dataVallydette.checklist.page[(currentPage+1)].autoCheckIDs.push(testIDorigin);
			nextPage = dataVallydette.checklist.page[(currentPage+1)].items.find(e => e.IDorigin == testIDorigin );
			currentPageTab = dataVallydette.checklist.page[currentPage].items.find(e => e.IDorigin == testIDorigin );
			nextPage.resultatTest = currentPageTab.resultatTest;
		}

	} else {
		if((currentPage != dataVallydette.checklist.page.length -1)){
			if (dataVallydette.checklist.page[currentPage].autoCheckIDs.length > 0) {
				let critereLink=true;
				let pageNumber = currentPage;
				while (critereLink){
					if(dataVallydette.checklist.page[pageNumber].autoCheckIDs.indexOf(testIDorigin)==-1){
						critereLink =false;
					}

					if(pageNumber==dataVallydette.checklist.page.length-1){
						critereLink = false;
					}

					dataVallydette.checklist.page[pageNumber].autoCheckIDs = dataVallydette.checklist.page[pageNumber].autoCheckIDs.filter(item => item !== testIDorigin);
					pageNumber++;
				}
			}
		}else{
			dataVallydette.checklist.page[currentPage].autoCheckIDs = dataVallydette.checklist.page[currentPage].autoCheckIDs.filter(item => item !== testIDorigin);
		}
		if(currentPage == 0){
			document.getElementById('link-' + testID).remove();
		}
		
		
	}

}

function getIfAutoCheck(currentIDorigin,previewPage = 0) {

	let autoUpdateResult = false;
	if (previewPage < 0 ){
		previewPage = 0;
	}
	if (dataVallydette.checklist.page[previewPage].autoCheckIDs) {
		const autoUpdate = dataVallydette.checklist.page[previewPage].autoCheckIDs.filter(a => a === currentIDorigin);
			if (autoUpdate.length > 0) {
			autoUpdateResult = true;
		}
	} 
	return autoUpdateResult;
	
}

/**
 * Compares the current checklist version to the last version
 * @param {number} currentChecklistVersion
*/
function checkTheVersion(currentChecklistVersion) {

	if (dataVallydette.checklist.referentiel && checklistVallydette[dataVallydette.checklist.referentiel]) {
				
		if (checklistVallydette[dataVallydette.checklist.referentiel].version) {
			
			globalVersion = checklistVallydette[dataVallydette.checklist.referentiel].version;
			
		} else {
			globalVersion = checklistVallydette["wcag-web"].version;
		}			
		
	} else {
		globalVersion = checklistVallydette["wcag-web"].version;
	}
	
	if ((currentChecklistVersion !== globalVersion) || (!currentChecklistVersion)) {
		var versionHTML = '';
		
		versionHTML += '<div id="alertVersion" class="container d-flex align-items-center alert alert-info alert-dismissible fade show" role="alert">';
		versionHTML += ' <span class="alert-icon"><span class="visually-hidden">Information</span></span>';
		versionHTML += ' <p>' + langVallydette.versionAlert1 + ' <strong>' + globalVersion + '</strong>. ' + langVallydette.versionAlert2 + ' <strong>' + currentChecklistVersion +'</strong></p>';
		versionHTML += ' <button id="closeVersion" type="button" class="btn-close" data-bs-dismiss="alert">';
		versionHTML +=	'  <span class="visually-hidden">' + langVallydette.closeAlert + '</span>';
		versionHTML +=  '</button>';
		versionHTML +='</div>';
		
		var mainHTML = document.getElementById("main");
		mainHTML.insertAdjacentHTML("afterBegin", versionHTML);
		
		var btnCloseVersion = document.getElementById("closeVersion");
		btnCloseVersion.addEventListener('click', function(){ dismissVersionMsg = true;}, false);
	}
	
}

/**
 * Get the number of non-tested items per pages.
 * @return {object} nbNTArray - number of non-tested items per pages.
*/
function getNbNotTested() {
	nbNTArray = {};
    var nbNTtests = 0;
    var nbNTtestsPage = 0;

    for (let k in dataVallydette.checklist.page) {
        for (let l in dataVallydette.checklist.page[k].items) {
            if (dataVallydette.checklist.page[k].items[l].resultatTest == "nt" && dataVallydette.checklist.page[k].items[l].goodPractice =="false") {
                nbNTtests++;
                nbNTtestsPage++;
            }
        }

        nbNTArray["page" + k] = nbNTtestsPage;
        nbNTtestsPage = 0;
		
    }

    nbNTArray.total = nbNTtests;

    return nbNTArray;
}

/**
	*  Get if a test rely on AAA wcag rules
*/
function getAAA(currentWcag) {
	
	
	let level = false;
	
	if (currentWcag) {
		dataWCAG.items.forEach(function(current){
			if (current.wcag === currentWcag || current.wcag+ " AAA"===currentWcag) {
				
				if (current.level === 'AAA') {
					level = true;
				} 
			} 
		
		});
		
	}
	return level;
	
}

/**
 * Tests status manager
 * Updates both tests results into the object and components states on the frontend side
*/
    
/**
 * Gets the badge class from the badge element
 * @param {string} lastResult - current result of a test.
 * @return {string} statutClass - returns a badge class.
*/
getStatutClass = function (lastResult) {
	if (lastResult === arrayFilterNameAndValue[0][1] || lastResult === true) {
		statutClass = "bg-success";
	} else if (lastResult === arrayFilterNameAndValue[1][1] || lastResult === false) {
		statutClass = "bg-danger";
	} else if (lastResult === arrayFilterNameAndValue[2][1]) {
		statutClass = "bg-info";
	} else {
		statutClass = "bg-light";
	}
	return statutClass;
}

/**
 * Sets the badge innerText
 * @param {string} lastResult - current result of a test.
 * @return {string} statutText - returns the badge innerText.
*/
setStatutText = function (lastResult) {
	if (lastResult === arrayFilterNameAndValue[0][1] || lastResult === true) {
		statutText = langVallydette.template.status1;
	} else if (lastResult === arrayFilterNameAndValue[1][1] || lastResult === false) {
		statutText = langVallydette.template.status2;
	} else if (lastResult === arrayFilterNameAndValue[2][1]) {
		statutText = langVallydette.template.status3;
	} else {
		statutText = langVallydette.template.status4;
	}
	return statutText;
}


/**
 * Set the test result into the vallydette object.
 * Update the badge status
 * @param {object} ele - radio button checked from a test.
 * @return {string} targetId - test ID that has been checked.
 * @return {string} originID - test originID that has been checked.
*/
setStatusAndResults = function (ele, targetId, originID) {
	let isAutoChecked;
	var itemIndice;
	/** Update the test result into the object	*/
	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
			lastResult = getStatutClass(dataVallydette.checklist.page[currentPage].items[i].resultatTest);
			dataVallydette.checklist.page[currentPage].items[i].resultatTest = ele.value;
			
			//auto checked
			if (dataVallydette.checklist.page[currentPage].autoCheckIDs) {
				isAutoChecked = dataVallydette.checklist.page[currentPage].autoCheckIDs.filter(id => id === dataVallydette.checklist.page[currentPage].items[i].IDorigin);	
			}
			
			itemIndice = i;
		}
	}

	/** Update the status result into the badge element */
	testResult = document.getElementById("resultID-" + targetId + "");
	testResult.classList.remove(lastResult);
	statutClass = getStatutClass(ele.value);
	testResult.innerText = setStatutText(ele.value);
	testResult.classList.add(statutClass);


	if((currentPage != dataVallydette.checklist.page.length -1) && isAutoChecked.length > 0){
			if (dataVallydette.checklist.page[currentPage].autoCheckIDs.length > 0) {
			let critereLink=true;
			let pageNumber = currentPage;
			while (critereLink){
				pageNumber++;
				dataVallydette.checklist.page[pageNumber].items[itemIndice].resultatTest =ele.value;

				if(pageNumber==dataVallydette.checklist.page.length-1){
					critereLink = false;
				}

				if(dataVallydette.checklist.page[pageNumber].autoCheckIDs.indexOf(dataVallydette.checklist.page[pageNumber].items[itemIndice].IDorigin)==-1){
					critereLink =false;
				}
			}
		}
	}

	// check if test is linked to previouspage
	if( 0 < currentPage)
	{
		
		if(getIfAutoCheck(originID,currentPage-1)){

			const index = dataVallydette.checklist.page[currentPage-1].autoCheckIDs.indexOf(originID);
			if (index > -1) { 
				dataVallydette.checklist.page[currentPage-1].autoCheckIDs.splice(index, 1);
				if(document.getElementById('link-' + targetId) !== null){
					document.getElementById('link-' + targetId).remove();
				}
			}
			let alertAutocheck = document.getElementById('alert-'+targetId);
			alertAutocheck.innerHTML = '<span class="alert-icon"></span><p>'+langVallydette.autocheckTxtError+'</p>'
			alertAutocheck.classList.remove('d-none')
		}
	}
}

/**
 * Edition manager
 * Used to update audit and pages properties
 */
 
/**
 * Initialization of the popin markup used to update audit or pages properties.
 * @param {string} targetElement - Element to edit (audit or page).
 * @param {string} targetProperty - Object property to edit.
 * @param {string} targetSecondaryElement - Secondary element to edit (useful for pages).
*/
setValue = function (targetElement, targetProperty, targetSecondaryElement) {

	arrayPropertyValue = [];

	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalChecklistTitle">' + langVallydette.edit + ' : ' + getPropertyValue(targetProperty) + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
		
	htmlModal += '<form id="editForm"><div class="modal-body">';
	htmlModal += '<div id="modal-alert"></div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="is-required form-label" for="nameValue">' + langVallydette.name + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlModal += '<input type="text" class="form-control" id="nameValue" aria-labelledby="modalChecklistTitle" value="' + getPropertyValue(targetProperty) + '" required >';
	htmlModal += '</div>';
	
	/** If it's a page properties edition, when add the URL input */
	if (targetElement === "pageName") {
		htmlModal += '<div class="mb-3">';
		htmlModal += '<label  class="form-label" for="urlValue">URL</label>';
		htmlModal += '<input type="text" class="form-control" id="urlValue" placeholder="URL" value="' + getPropertyValue("checklist.page." + currentPage + ".url") + '">';
		htmlModal += '</div>';
		htmlModal += '<div id="themeManager" class="mb-3">';
		htmlModal += '</div>';
	}
	htmlModal += '</div>';
	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.close + '</button>';
	htmlModal += '<button type="submit" id="saveValueBtn" class="btn btn-primary">' + langVallydette.save + '</button>';
	htmlModal += '</div></form></div></div>';
			
	
	let elModal = document.getElementById('modalEdit');
	elModal.innerHTML = htmlModal;

	/** If it's a page properties edition, when add the groups */
	if ((targetElement === "pageName")) {
		initGroups();
	}

    var currentEditForm = document.getElementById('editForm');
 
	currentEditForm.addEventListener('submit', function () {
		event.preventDefault();
		
		var propertyName = document.getElementById("nameValue");
		arrayPropertyValue[0] = propertyName.value;
		
		if (targetElement === "pageName") {
			var propertyUrl = document.getElementById("urlValue");
			arrayPropertyValue[1] = propertyUrl.value;
			
			getGroups();
			
		}
		
		updateProperty(arrayPropertyValue, targetElement, targetProperty, targetSecondaryElement);
		
	});
	
	/** set the focus into the first popin field
		* @todo jquery code from boosted 4.5.
		* So it should be necessary to replace this code as soon as the vallydette will be updated to v5.
	*/
	

	var myModal = document.getElementsByClassName('modal')
	var myInput = document.getElementById('nameValue')

	myModal[0].addEventListener('shown.bs.modal', function () {
		myInput.focus()
	  })
}

/**
 * Get the property value from vallydette object
 * @param {string} propertyPath - Object property to edit.
*/
getPropertyValue = function (propertyPath) {
	obj = dataVallydette;
	propertyPath = propertyPath.split('.');

	for (i = 0; i < propertyPath.length - 1; i++) {
		obj = obj[propertyPath[i]];
	}
	
	if(obj[propertyPath[i]])  {
		return obj[propertyPath[i]];
	} else {
		obj[propertyPath[i]] = "";
		return obj[propertyPath[i]];
	}
	
}


/**
 * Set the property value into vallydette object.
 * @param {string} propertyValue - new property value.
 * @param {string} propertyPath - Object property to edit.
*/
setPropertyValue = function (propertyValue, propertyPath) {
	obj = dataVallydette;
	propertyPath = propertyPath.split('.');

	for (i = 0; i < propertyPath.length - 1; i++) {
		obj = obj[propertyPath[i]];	
	}
	
	obj[propertyPath[i]] = propertyValue;
	
}	

/**
 * Run the set up of properties value, and display a feedback.
 * @param {array} arrayPropertyValue - Array of properties to update.
 * @param {string} targetElement - Element to edit (audit or page).
 * @param {string} targetProperty - Object property to edit.
 * @param {string} targetSecondaryElement - Secondary element to edit (useful for pages).
*/
updateProperty = function(arrayPropertyValue, targetElement, targetProperty, targetSecondaryElement) {

	setPropertyValue(arrayPropertyValue[0], targetProperty);
	if (arrayPropertyValue[1]) {
		setPropertyValue(validateUrl(arrayPropertyValue[1]), "checklist.page." + currentPage + ".url");

		/**  Enabled url button */
		var currentbtnOpenUrl = document.getElementById('btnOpenUrl');
		currentbtnOpenUrl.href = getPropertyValue("checklist.page." + currentPage + ".url");
		currentbtnOpenUrl.classList.remove('disabled');
		currentbtnOpenUrl.setAttribute('aria-disabled', 'false');
	}
	
	var currentTargetElement = document.getElementById(targetElement);
	currentTargetElement.innerText = arrayPropertyValue[0];

	if (targetSecondaryElement) {
		var currentTargetSecondaryElement = document.getElementById(targetSecondaryElement);
		currentTargetSecondaryElement.innerText = arrayPropertyValue[0];
	}
	
	var feedbackHtml;
	feedbackHtml = '<div class="alert alert-success alert-sm" role="alert">';
	feedbackHtml += '<span class="alert-icon"><span class="visually-hidden">' + langVallydette.success + '</span></span>';
	feedbackHtml += '<p>' + langVallydette.successFeedback + '</p>';
	feedbackHtml += '</div>';
	
	var feedbackMessage = document.getElementById('modal-alert');
	feedbackMessage.innerHTML = feedbackHtml;
	
	utils.setPageTitle(dataVallydette.checklist.page[currentPage].name);
	
	jsonUpdate();
}