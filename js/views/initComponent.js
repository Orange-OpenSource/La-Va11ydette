/**
 *  init the anchor menu
 */
 function initAnchorMenu() {
	let AnchorMenuHTML='';

	

	 let allThematiques=[];
	 document.querySelectorAll("h3.sticky-top").forEach( h2Them =>{
		allThematiques.push(h2Them.firstChild.textContent);
	 });
	 
	 if(allThematiques.length >0){
		document.getElementById("title-nav-anchor").textContent=langVallydette.template.navAnchor;
		document.getElementById("title-nav-anchor").classList.remove('d-none');

		AnchorMenuHTML+='<ul class="nav flex-column">';
		allThematiques.forEach(theme=>{
		let formattedHeadingTheme = utils.formatHeading(theme);
			AnchorMenuHTML+=' <li class="nav-item p-1">';
			AnchorMenuHTML+=' <a class="nav-link" href="#anchor-'+formattedHeadingTheme+'">'+theme+'</a>'
			AnchorMenuHTML+=' </li>';
		})
	 	AnchorMenuHTML+='</ul>';
	 }
	 else{
		document.getElementById("title-nav-anchor").textContent="";
		document.getElementById("title-nav-anchor").classList.add('d-none');
	 }
	document.getElementById("tableOfContents").innerHTML=AnchorMenuHTML;
 }

/**  
*	Initialization of page contextual menu, each time the user move to a new page.
*	@param {number} currentPageIndex - page index into dataVallydette. 
*	@param {number} currentPageID - page ID into dataVallydette. 
*/
initContextualMenu = function (currentPageIndex, currentPageID) {
	var htmlMenu = '';
	htmlMenu += '<button class="btn btn-secondary btn-icon" id="btnPageName" aria-label="' + langVallydette.editPageName + '" title="' + langVallydette.editPageName + '" data-element="pageName" data-secondary-element="' + currentPageID + '" data-property="checklist.page.' + currentPageIndex + '.name" data-bs-toggle="modal" data-bs-target="#modalEdit">'+htmlIcon.edit+'</span></button>';
	if( getPropertyValue("checklist.page." + currentPageIndex + ".url") === '' ){
		htmlMenu += '<a role="link" id="btnOpenUrl" class="btn btn-secondary btn-icon ms-2 disabled" aria-label="' + langVallydette.openPageUrl + '" title="' + langVallydette.openPageUrl + '" target="_blank" aria-disabled="true">'+htmlIcon.link_external+'</a>';
	}
	else{
		htmlMenu += '<a role="link" id="btnOpenUrl" class="btn btn-secondary btn-icon ms-2" aria-label="' + langVallydette.openPageUrl + '" title="' + langVallydette.openPageUrl + '" href="'+ getPropertyValue("checklist.page." + currentPageIndex + ".url") +'" target="_blank" aria-disabled="false">'+htmlIcon.link_external+'</a>';
	}

	if (currentPage === 0) {
		htmlMenu += '<button id="btnDelPage" class="btn btn-secondary btn-icon ms-2" aria-label="' + langVallydette.deletePageName + '" title="' + langVallydette.deletePageName + '" data-element="pageName" data-property="" data-bs-toggle="modal" data-bs-target="#modalDelete" data-pagination="' + currentPageID + '" disabled>'+htmlIcon.trash+'</button>';
	} else {
		htmlMenu += '<button id="btnDelPage" class="btn btn-secondary btn-icon ms-2" aria-label="' + langVallydette.deletePageName + '" title="' + langVallydette.deletePageName + '" data-element="pageName" data-property="checklist.page.' + currentPageIndex + '" data-bs-toggle="modal" data-bs-target="#modalDelete" data-pagination="' + currentPageID + '">'+htmlIcon.trash+'</button>';
	}
	htmlContextualMenuContent.innerHTML = htmlMenu;
	
	btnActionPageEventHandler();
}

/** Remove the page contextual menu (needed for audit results page). */
removeContextualMenu = function () {
	htmlContextualMenuContent.innerHTML = "";
}

/**
 * Issue popin initialization.
 * @param {string} targetId - current test ID.
 * @param {string} title - current test title.
*/
displayIssue = function (targetId, title) {
	let titleModal = title;

	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg" role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalEditIssueTitle">' + langVallydette.issueTxt2 + titleModal + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<div class="">';
	htmlModal += '<div id="issueList" class="accordion">';
	
	for (let i in dataVallydette.checklist.page[currentPage].items) {
		
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId && dataVallydette.checklist.page[currentPage].items[i].issues.length > 0 ) {
			let auditNumber = 0;
			for (let j in dataVallydette.checklist.page[currentPage].items[i].issues) {
				auditNumber++;
				htmlModal += '<div class="accordion-item" id="cardIssue'+targetId+'-'+ j +'">';
				
				htmlModal += ' <div class="accordion-header" id="issue'+targetId+'-'+ j +'">';
				htmlModal += ' <h5 class="mb-0">';
				htmlModal += ' <button id="btnIssue'+targetId+'-'+ j +'" class="accordion-button collapsed w-100 m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+targetId+'-'+j+'" aria-expanded="false" aria-controls="#collapse'+targetId+'-'+j+'">';
				htmlModal += '#' + auditNumber + ' ' + utils.escape_html(dataVallydette.checklist.page[currentPage].items[i].issues[j].issueTitle);
				htmlModal += ' </button>';
				htmlModal += '</h5>';
				htmlModal += ' </div>';

				htmlModal += ' <div id="collapse'+ targetId +'-'+ j +'" data-bs-parent="#issueList" class="accordion-collapse collapse" aria-labelledby="issue'+targetId+'-'+ j +'" >';

				htmlModal += ' <div class="accordion-body">';
				htmlModal += '   <div id="issue-body-'+ targetId +'-'+ j +'" class="px-3">';
				htmlModal +=  		utils.escape_html(dataVallydette.checklist.page[currentPage].items[i].issues[j].issueDetail);
			
				htmlModal += '  </div>';
				htmlModal += ' <button id="editIssueBtn-'+ targetId +'-'+ j +'" class="btn btn-secondary btn-sm" onClick="editIssue(\''+ targetId +'\','+ j +')">' + langVallydette.edit + '</button>';
				htmlModal += ' <button id="deleteIssueBtn-'+ targetId +'-'+ j +'" class="btn btn-secondary btn-sm" onClick="deleteConfirmationIssue(\''+ targetId +'\','+ j +')">' + langVallydette.delete + '</button>';
				
				htmlModal += '  </div>';
				htmlModal += ' </div>';
				
				htmlModal += ' </div>';
			}
		}
	}
	
	htmlModal += '</div>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">' + langVallydette.close + '</button>';
	htmlModal += '</div></div></div>';

	/**  html modal container */
	let elModal = document.getElementById('modalEditIssue');
	elModal.innerHTML = htmlModal;
	
}

 /**
 *  Open the localStorage dialog modal, and running the localStorage get function if acceptance
 */
function runLocalStorage() {
	
	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg" role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalLocalStorageTitle">' + langVallydette.recoverTitle + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-body" id="modalLocalStorageForm">';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" id="localStorageCancelBtn" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
	htmlModal += '<button type="button" id="localStorageSaveBtn" data-bs-dismiss="modal" class="btn btn-primary">' + langVallydette.recoverAction + '</button>';
	htmlModal += '<button type="button" id="localStorageDeleteBtn" class="btn btn-danger">' + langVallydette.deleteAction + '</button>'
	htmlModal += '</div></div></div>';
	
	let elModal = document.getElementById('modalLocalStorage');
	elModal.innerHTML = htmlModal;
	createFormLocalStorage();

	var localStorageSaveBtn = document.getElementById("localStorageSaveBtn");
	localStorageSaveBtn.addEventListener('click', function () {
		valueSelect = document.querySelector('input[name="auditRadioRestore"]:checked').value;
		getLocalStorage(valueSelect);
	});

	var localStorageDeleteBtn = document.getElementById("localStorageDeleteBtn");
	localStorageDeleteBtn.addEventListener('click', function () {
		valueSelect = document.querySelector('input[name="auditRadioRestore"]:checked').value;
		let selectChecklist = window.localStorage.getItem(valueSelect);
		selectChecklist = JSON.parse(selectChecklist);
		let HtmlDivDelete ='';
		HtmlDivDelete += '<p>'+ langVallydette.deleteAsk +' '+ selectChecklist.checklist.name +' ?</p>';
		HtmlDivDelete += '<button type="button" id="localStorageDeleteYesBtn" class="btn btn-primary">' + langVallydette.yes + '</button>';
		HtmlDivDelete += '<button type="button" id="localStorageDeleteNoBtn" class="btn btn-danger ms-2">' + langVallydette.no + '</button>'
		let elDivDelete = document.getElementById('localStorageValidDelete');
		elDivDelete.innerHTML = HtmlDivDelete;
		elDivDelete.focus();

		var localStorageDeleteYesBtn = document.getElementById("localStorageDeleteYesBtn");
		localStorageDeleteYesBtn.addEventListener('click', function () {
			valueSelect = document.querySelector('input[name="auditRadioRestore"]:checked').value;
			window.localStorage.removeItem(valueSelect);
			createFormLocalStorage();
			if(Object.keys(getAllStorage()).length === 0){
				document.getElementById("localStorageCancelBtn").click();
				document.getElementById('btnExcelExport').focus();
				let btnLocalStorage = document.getElementById("btnLocalStorage");
				btnLocalStorage.disabled=true;
				btnLocalStorage.classList.add("disabled");
			}
			else{
				document.getElementById(document.querySelector('input[name="auditRadioRestore"]:checked').id).focus();
			}	
		});

		var localStorageDeleteNoBtn = document.getElementById("localStorageDeleteNoBtn");
		localStorageDeleteNoBtn.addEventListener('click', function () {
			createFormLocalStorage();
			document.getElementById(document.querySelector('input[name="auditRadioRestore"]:checked').id).focus();
		});
	});

	

}

/**
 * Create Radio button localstorage
 */
function createFormLocalStorage(){
	let allLocalStorage;
	allLocalStorage = getAllStorage();
	let checked = true;

	let htmlModal = '';
	
	htmlModal += '<div tabindex="-1" id="localStorageValidDelete" class="pb-3"></div>';
	htmlModal += '<fieldset>';
	htmlModal += '<legend>' + langVallydette.recoverMessage +'</legend>';
	for (const [key, value] of Object.entries(allLocalStorage)) {
		let auditStorage = JSON.parse(value);
		htmlModal += '<div class="form-check">';
		htmlModal += '<input class="form-check-input" type="radio" name="auditRadioRestore" value="'+key+'" id="'+utils.formatHeading(key)+'"'+ (checked ? 'checked' : '')+'>';
		htmlModal += '<label class="form-check-label" for="'+ utils.formatHeading(key)+'" '+ ( globalLang!== auditStorage.checklist.lang ? 'lang="'+auditStorage.checklist.lang+'"' : '')+'>';
		htmlModal += auditStorage.checklist.name;
		htmlModal += '</label>';
		htmlModal += '</div>';
		checked = false;
	}
	htmlModal += '</fieldset>';

	let elModal = document.getElementById('modalLocalStorageForm');
	elModal.innerHTML = htmlModal;

}

/**
 * Result for wcag audit
 * 
 * 	Computes the conformity rate by pages and the final audit conformity rate (average rate).
 *	Computes the wcag summary table (conformity, non-conformity and non-applicable tests by wcag levels).
 *	Builds the non-conformity list
 *	Builds the audit result markup.
 *  @param {array} pagesResultsArray - Contains all wcag results by pages.
*/
function runFinalComputationWcag(pagesResultsArray) {

	/**
	 * 	Gets the number of non-tested items.
	 @param {number} nbNT - number of non-tested items.
	*/  
    nbNTResultsArray = getNbNotTested();
	console.log('yoyo')

    var nbNT = nbNTResultsArray.total;

    /**Build the audit conformity markup. */ 
    
	let computationContent = '';

	setPageName(langVallydette.auditResult);
	removeContextualMenu();
	removeFilterSection();
	
	/** Modify column number */ 
	utils.columnDisplay(2);
	
	 computationContent += '<h2 class="pt-4 pb-3">' + langVallydette.auditTxt14 + '</h2>';
	 
    if (nbNT >= 1) {
        computationContent += '<p class="h3">' + langVallydette.auditTxt1 + ' : <span class="text-primary">' + langVallydette.auditTxt2 + '</span></p>';
		computationContent += '<p class="h3 pb-3">' + langVallydette.auditTxt13 + ' : <span class="text-primary">' + langVallydette.auditTxt2 + '</span></p>';
    } else if (nbNT === 0 && !isNaN(dataWCAG.globalPagesResult)) {
        computationContent += '<p class="h3">' + langVallydette.auditTxt1 + ' : <span class="text-primary">' + dataWCAG.globalPagesResult + '%</span></p>';
		computationContent += '<p class="h3 pb-3">' + langVallydette.auditTxt13 + ' : <span class="text-primary">' + Math.round(dataWCAG.result) + '%</span></p>';
	}	
	
		computationContent += '<ul class="nav nav-tabs" role="tablist">';
		computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link active" id="tabResultatPage" data-bs-toggle="tab" data-bs-target="#resultatPage" type="button" role="tab" aria-controls="resultatPage" aria-selected="true">' + langVallydette.auditTxt3 + '</button></li>';
		computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link" id="tabsynthesePages" data-bs-toggle="tab" data-bs-target="#synthesePages" type="button" role="tab" aria-controls="synthesePages" aria-selected="false">' + langVallydette.auditTxt18 + '</button></li>';	
		computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link" id="tabsyntheseNiveaux" data-bs-toggle="tab" data-bs-target="#syntheseNiveaux" type="button" role="tab" aria-controls="syntheseNiveaux" aria-selected="false">' + langVallydette.auditTxt15 + '</button></li>';	
		computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link" id="tabNonConformites" data-bs-toggle="tab" data-bs-target="#nonConformites" type="button" role="tab" aria-controls="nonConformites" aria-selected="false">' + langVallydette.auditTxt5 + '</button></li>';
		computationContent += '</ul>';
		
		computationContent += '<div class="tab-content border-0">';
		computationContent += '  <div class="tab-pane active" id="resultatPage" role="tabpanel" aria-labelledby="tabResultatPage">';
		
		
		for (let i in pagesResultsArray) {
			computationContent += '<h3>' + pagesResultsArray[i].name + ' : </h3>';
			
			computationContent += '<ul>';
			computationContent += '<li><strong>' + langVallydette.auditTxt12 + '</strong> ';
			computationContent += (!isNaN(pagesResultsArray[i].result) && pagesResultsArray[i].result!=="NA") ? pagesResultsArray[i].result + ' % ' : '';
			computationContent += (pagesResultsArray[i].complete === false) ?  '(' + langVallydette.auditTxt6 + ' / ' + nbNTResultsArray['page' + i] + ' ' + langVallydette.auditTxt7 +')' : '';
			computationContent += '</li>';
			computationContent += (pagesResultsArray[i].url!== undefined && pagesResultsArray[i].url!== '') ? '<li><strong> url : </strong>' + pagesResultsArray[i].url + '</li>': '';
			computationContent += '</ul>';
		}
		
		computationContent += '  </div>';
		
		computationContent += '  <div class="tab-pane" id="synthesePages" role="tabpanel" aria-labelledby="tabsynthesePages">';
		computationContent += '<div class="table-responsive">'
		computationContent += '<table class="table table-striped"><caption class="visually-hidden">' + langVallydette.auditTxt4 + '</caption>';
		computationContent += '<thead><tr>';
		computationContent += '<th scope="row">' + langVallydette.auditTxt17 + ' / ' + langVallydette.auditTxt10 + '</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.compliant + ' / A</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.compliant + ' / AA</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.nonCompliant + ' / A</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.nonCompliant + ' / AA</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.notApplicable + ' / A</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.notApplicable + ' / AA</th>';
		computationContent += '<th scope="col" class="text-center bg-light">' + langVallydette.auditTxt8 + '</th>';
		computationContent += '</tr></thead>';
		computationContent += '<tbody>';
	
		
		for (let i in pagesResultsArray) {
			
			computationContent += '<tr>';
			computationContent += '<th scope="row" class="font-weight-bold"> <span class="visually-hidden">Page : </span>' + pagesResultsArray[i].name + '</th>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].conformeA+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].conformeAA+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].nonconformeA+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].nonconformeAA+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].naA+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].naAA+ '</td>';
			computationContent += '<td class="text-center bg-light">';
			computationContent += (!isNaN(pagesResultsArray[i].result) && pagesResultsArray[i].result!=="NA") ? pagesResultsArray[i].result + ' % ' : '';
			computationContent += (pagesResultsArray[i].complete === false) ?  '(' + langVallydette.auditTxt6 + ')' : '';	
			computationContent += '</td>';
			computationContent += '</tr>';
			
		}
		computationContent += '</tbody>';
		computationContent += '</table>';
		computationContent += ' </div>';
		computationContent += ' </div>';
		
		computationContent += '<div class="tab-pane" id="syntheseNiveaux" role="tabpanel" tabindex="-1" aria-hidden="true" aria-labelledby="tabsyntheseNiveaux">';
		computationContent += '<div class="table-responsive">'
		computationContent += '<table class="table table-striped"><caption class="visually-hidden">' + langVallydette.auditTxt15 + '</caption>';
		computationContent += '<thead><tr>';
		computationContent += '<th scope="row">' + langVallydette.auditTxt10 + '</th>';
		computationContent += '<th scope="col" class="text-center">A</th>';
		computationContent += '<th scope="col" class="text-center">AA</th>';
		computationContent += '<th scope="col" class="text-center">Total</th>';
		computationContent += '</tr></thead>';
		computationContent += '<tbody>';
		
		computationContent += '<tr>';
		computationContent += '<th scope="row" class="font-weight-bold">' + langVallydette.criteriaNumber + '</th>';
		computationContent += '<td class="text-center">' + dataWCAG.totalA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.totalAA + '</td>';
		computationContent += '<td class="text-center">' + (dataWCAG.totalA+dataWCAG.totalAA) + '</td>';
		computationContent += '</tr>';
		
		computationContent += '<tr>';
		computationContent += '<th scope="row" class="font-weight-bold">' + langVallydette.compliant + '</th>';
		computationContent += '<td class="text-center">' + dataWCAG.conformeA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.conformeAA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.totalconforme + '</td>';
		computationContent += '</tr>';
		
		computationContent += '<tr>';
		computationContent += '<th scope="row" class="font-weight-bold">' + langVallydette.nonCompliant + '</th>';
		computationContent += '<td class="text-center">' + dataWCAG.nonconformeA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.nonconformeAA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.totalnonconforme + '</td>';
		computationContent += '</tr>';
		
		computationContent += '<tr>';
		computationContent += '<th scope="row" class="font-weight-bold">' + langVallydette.notApplicable + '</th>';
		computationContent += '<td class="text-center">' + dataWCAG.naA + '</td>';
		computationContent += '<td class="text-center">' + dataWCAG.naAA + '</td>';
		computationContent += '<td class="text-center">' + (dataWCAG.naA+dataWCAG.naAA) + '</td>';
		computationContent += '</tr>';
		
		computationContent += '<tr>';
		computationContent += '<th scope="row" class="font-weight-bold bg-light">' + langVallydette.auditTxt16 + '</th>';
		computationContent += '<td class="text-center bg-light">';
		computationContent += (!isNaN(dataWCAG.resultA) && dataWCAG.result!=="NA") ? dataWCAG.resultA + ' % ' : '';
		computationContent += (dataWCAG.complete === false) ?  '(' + langVallydette.auditTxt6 + ')' : '';	
		computationContent += '</td>';
		computationContent += '<td class="text-center bg-light">';
		computationContent += (!isNaN(dataWCAG.resultAA) && dataWCAG.result!=="NA") ? dataWCAG.resultAA + ' % ' : '';
		computationContent += (dataWCAG.complete === false) ?  '(' + langVallydette.auditTxt6 + ')' : '';	
		computationContent += '</td>';
		computationContent += '<td class="text-center bg-light">';
		computationContent += (!isNaN(dataWCAG.result) && dataWCAG.result!=="NA") ? dataWCAG.result + ' % ' : '';
		computationContent += (dataWCAG.complete === false) ?  '(' + langVallydette.auditTxt6 + ')' : '';	
		computationContent += '</td>';
		computationContent += '</tr>';
		
		computationContent += '</tbody>';
		computationContent += '</table>';
		computationContent += ' </div>';
		computationContent += ' </div>';
		
		computationContent += '<div class="tab-pane" id="nonConformites" role="tabpanel" tabindex="-1" aria-hidden="true" aria-labelledby="tabNonConformites">';
		
			/** 
				*	Display the non-conformity list.
				*	@param {object} listNonConformity - object of the falses wcag rules.
			*/ 	
			const listNonConformity = dataWCAG.items.filter(dataWcagResult => dataWcagResult.resultat === false);
			
			if (listNonConformity.length > 0) {
				
				for (let i in listNonConformity) {
				
					computationContent += '<ul>';
					computationContent += '<li><strong>' + langVallydette.auditTxt9 + ' ' + listNonConformity[i].wcag + ', ' + listNonConformity[i].name  + ', ' + langVallydette.level + ' ' + listNonConformity[i].level + '</strong>';
				
					/** Remove undefined values */
					listNonConformity[i].comment = listNonConformity[i].comment.filter(x => x);
					
					if (listNonConformity[i].comment.length > 0) {
					
							computationContent += '<ul>';
							for (let j in listNonConformity[i].comment) {
								computationContent += '<li>' + utils.htmlEntities(listNonConformity[i].comment[j]) + ' <span class="badge bg-light">' +  utils.htmlEntities(listNonConformity[i].page[j]) + '</span></li>';	
							}
							computationContent += '</ul>';	
					} 
					
					computationContent += '</li>';
					computationContent += '</ul>';
		
				}
				
			} else {
				
				computationContent += '<p>' + langVallydette.auditTxt11 + '</p>';
				
			}
			
			
		
		computationContent += '</div>';

    htmlMainContent.innerHTML = computationContent;

}


/**
 * Result for wcag audit
 * 
 * 	Computes the conformity rate by pages and the final audit conformity rate (average rate).
 *	Computes the rgaa summary table (conformity, non-conformity and non-applicable tests by wcag levels).
 *	Builds the non-conformity list
 *	Builds the audit result markup.
 *  @param {array} pagesResultsArray - Contains all rgaa results by pages.
*/
function runFinalComputationRGAA(pagesResultsArray){
	/**
	 * 	Gets the number of non-tested items.
	 @param {number} nbNT - number of non-tested items.
	*/  
    nbNTResultsArray = getNbNotTested();

    var nbNT = nbNTResultsArray.total;

	/**Build the audit conformity markup. */ 

	let computationContent = '';

	setPageName(langVallydette.auditResult);
	removeContextualMenu();
	removeFilterSection();
	
	/** Modify column number */ 
	utils.columnDisplay(2);
	
	computationContent += '<h2 class="pt-4 pb-3">' + langVallydette.auditTxt14 + '</h2>';
	
	if (nbNT >= 1) {
		computationContent += '<p class="h3">' + langVallydette.auditTxt1 + ' : <span class="text-primary">' + langVallydette.auditTxt2 + '</span></p>';
		computationContent += '<p class="h3 pb-3">' + langVallydette.auditTxt13 + ' : <span class="text-primary">' + langVallydette.auditTxt2 + '</span></p>';
	} else if (nbNT === 0 && !isNaN(dataRGAA.globalPagesResult)) {
		computationContent += '<p class="h3">' + langVallydette.auditTxt1 + ' : <span class="text-primary">' + dataRGAA.globalPagesResult + '%</span></p>';
		computationContent += '<p class="h3 pb-3">' + langVallydette.auditTxt13 + ' : <span class="text-primary">' + dataRGAA.result + '%</span></p>';
	}	

	computationContent += '<ul class="nav nav-tabs" role="tablist">';
	computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link active" id="tabResultatPage" data-bs-toggle="tab" data-bs-target="#resultatPage" type="button" role="tab" aria-controls="resultatPage" aria-selected="true">' + langVallydette.auditTxt3 + '</button></li>';
	computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link" id="tabsynthesePages" data-bs-toggle="tab" data-bs-target="#synthesePages" type="button" role="tab" aria-controls="synthesePages" aria-selected="false">' + langVallydette.auditTxt18 + '</button></li>';	
	computationContent += '	<li class="nav-item" role="presentation"><button class="nav-link" id="tabNonConformites" data-bs-toggle="tab" data-bs-target="#nonConformites" type="button" role="tab" aria-controls="nonConformites" aria-selected="false">' + langVallydette.auditTxt5 + '</button></li>';
	computationContent += '</ul>';

	computationContent += '<div class="tab-content border-0">';

	computationContent += '<div class="tab-pane active" id="resultatPage" role="tabpanel" aria-labelledby="tabResultatPage">';
	for (let i in pagesResultsArray) {
		computationContent += '<h3>' + pagesResultsArray[i].name + ' : </h3>';
		
		computationContent += '<ul>';
		computationContent += '<li><strong>' + langVallydette.auditTxt12 + '</strong> ';
		computationContent += (!isNaN(pagesResultsArray[i].result) && pagesResultsArray[i].result!=="NA") ? pagesResultsArray[i].result + ' % ' : '';
		computationContent += (pagesResultsArray[i].complete === false) ?  '(' + langVallydette.auditTxt6 + ' / ' + nbNTResultsArray['page' + i] + ' ' + langVallydette.auditTxt7 +')' : '';
		computationContent += '</li>';
		computationContent += (pagesResultsArray[i].url!== undefined && pagesResultsArray[i].url!== '') ? '<li><strong> url : </strong>' + pagesResultsArray[i].url + '</li>': '';
		computationContent += '</ul>';
	}
	computationContent += '</div>'

	computationContent += '  <div class="tab-pane" id="synthesePages" role="tabpanel" aria-labelledby="tabsynthesePages">';
	computationContent += '<div class="table-responsive">'
		computationContent += '<table class="table table-striped"><caption class="visually-hidden">' + langVallydette.auditTxt4 + '</caption>';
		computationContent += '<thead><tr>';
		computationContent += '<th scope="row">' + langVallydette.auditTxt17 +'</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.compliant + '</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.nonCompliant + '</th>';
		computationContent += '<th scope="col" class="text-center">' + langVallydette.notApplicable + '</th>';
		computationContent += '<th scope="col" class="text-center bg-light">' + langVallydette.auditTxt8 + '</th>';
		computationContent += '</tr></thead>';
		computationContent += '<tbody>';
	
		
		for (let i in pagesResultsArray) {
			
			computationContent += '<tr>';
			computationContent += '<th scope="row" class="font-weight-bold"> <span class="visually-hidden">Page : </span>' + pagesResultsArray[i].name + '</th>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].totalconforme+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].totalnonconforme+ '</td>';
			computationContent += '<td class="text-center">' + pagesResultsArray[i].totalnA+ '</td>';
			computationContent += '<td class="text-center bg-light">';
			computationContent += (!isNaN(pagesResultsArray[i].result) && pagesResultsArray[i].result!=="NA") ? pagesResultsArray[i].result + ' % ' : '';
			computationContent += (pagesResultsArray[i].complete === false) ?  '(' + langVallydette.auditTxt6 + ')' : '';	
			computationContent += '</td>';
			computationContent += '</tr>';
			
		}
		computationContent += '</tbody>';
		computationContent += '</table>';
		computationContent += ' </div>';
		computationContent += ' </div>';

	computationContent += ' <div class="tab-pane" id="nonConformites" role="tabpanel" aria-labelledby="tabNonConformites">';
	/** 
				*	Display the non-conformity list.
				*	@param {object} listNonConformity - object of the falses wcag rules.
			*/ 	
			const listNonConformity = dataRGAA.items.filter(dataRGAAResult => dataRGAAResult.resultat === false);
			
			if (listNonConformity.length > 0) {
				
				for (let i in listNonConformity) {
				
					computationContent += '<ul>';
					computationContent += '<li><strong>' + listNonConformity[i].name  + '</strong>';
				
					/** Remove undefined values */
					listNonConformity[i].comment = listNonConformity[i].comment.filter(x => x);
					
					if (listNonConformity[i].comment.length > 0) {
					
							computationContent += '<ul>';
							for (let j in listNonConformity[i].comment) {
								computationContent += '<li>' + utils.htmlEntities(listNonConformity[i].comment[j]) + ' <span class="badge bg-light">' +  utils.htmlEntities(listNonConformity[i].page[j]) + '</span></li>';	
							}
							computationContent += '</ul>';	
					} 
					
					computationContent += '</li>';
					computationContent += '</ul>';
		
				}
				
			} else {
				
				computationContent += '<p>' + langVallydette.auditTxt11 + '</p>';
				
			}
	computationContent += '</div>'

	
	computationContent += '</div>'


    htmlMainContent.innerHTML = computationContent;
}

