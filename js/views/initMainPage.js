/**
 *  init the main menu
 */
 function initMainMenu() {
	
	var htmlMainMenu = "";
	
	htmlMainMenu += '<div class="nav-item dropdown">';
	htmlMainMenu += '<a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
	htmlMainMenu += langVallydette.selectAchecklist;
	htmlMainMenu += '</a>';
	htmlMainMenu += '<div class="dropdown-menu dropdown-menu-right">';
	
	Object.keys(checklistVallydette).forEach(c => htmlMainMenu += ' <a class="dropdown-item' + (c === currentCriteriaListName ? ' active' : '') + '" href="./?list=' + c + '&lang=' + globalLang + '" ' + (c === currentCriteriaListName ? ' aria-current="page"' : '') + '>' + checklistVallydette[c]['name-' + globalLang] + '</a>');
	
	htmlMainMenu += '</div>';
	htmlMainMenu += '</div>';
	
	document.getElementById("checklist").innerHTML = htmlMainMenu;
	
}

/* Init page audit*/
function initAuditPage() {
	
	document.getElementById("main").innerHTML = "";
	
	var htmlAuditPage = '';
	htmlAuditPage = `
	<div class="container d-flex flex-column d-sm-flex flex-sm-row align-items-center mb-3" id="auditInfoManager">
                <h2 id="checklistName" class="mb-0 h1"></h2>
                <button class="btn btn-secondary btn-icon ms-auto d-print-none" id="btnChecklistName"
                        aria-label="" title=""
                        data-element="checklistName" data-property="checklist.name"
                        data-bs-toggle="modal" data-bs-target="#modalEdit">
						`+ htmlIcon.edit+`
                </button>
				<button class="btn btn-secondary btn-icon ms-2 d-print-none" id="btnLocalStorage"
                        aria-label="" title=""
                        data-element="checklistName" data-property="checklist.name"
                        data-bs-toggle="modal" data-bs-target="#modalLocalStorage">
                    `+htmlIcon.history+`
                </button>
                <button class="btn btn-secondary ms-2 d-print-none" type="button"
                        id="btnShowResult">
                </button>
              
            </div>

            <div class="o-nav-local bg-white navbar-light my-3 d-print-none" id="pageManager"></div>

            <div class="container">
                <div class="row align-items-start position-relative">
                    <div class="col-md-2 sticky-md-top pt-4 pe-0 col-print-12" id="currentPageManager">
                        <h3 id="pageName" class="mb-0"></h3>
                        <div class="border-top border-light my-3"></div>
                        <div id="contextualMenu" class="d-flex align-content-stretch flex-wrap w-100 d-print-none">
                            <button class="btn btn-secondary btn-icon" id="btnPageName"
                                    aria-label="" title=""
                                    data-element="pageName" data-secondary-element="pageID-0"
                                    data-property="checklist.page.0.name" data-bs-toggle="modal" data-bs-target="#modalEdit">
									`+htmlIcon.edit+`
                            </button>
                            <button id="btnDelPage" class="btn btn-secondary btn-icon ms-2"
                                    aria-label="" title=""
                                    data-element="pageName" data-property="checklist.page.0"
                                    data-bs-toggle="modal" data-bs-target="#modalDelete" disabled>
									`+htmlIcon.trash+`
                            </button>
							
                        </div>
						<div class="border-top border-light my-3 w-100"></div>
						<div id="anchornav">
							<h4 id="title-nav-anchor" class="d-block my-2 pb-2 border-bottom border-light border-1"></h2>
							<div class="bd-toc">
							<nav id="tableOfContents" aria-labelledby="title-nav-anchor" style="min-height: 4rem;">	
							</nav>
							</div>
						</div>
                    </div>
                    <div class="col-md-8 bg-white border border-light col-print-12" id="currentPageContent">
                        <span id="count" class="alert-danger"></span>
                        <section id="mainContent"></section>
                    </div>
                    <aside id="filter" class="col-md-2 sticky-md-top pt-4 col-print-12 overflow-auto">
                        
                    </aside>
                </div>
            </div>
	`
	
	document.getElementById("main").innerHTML = htmlAuditPage;
	
	htmlFilterContent = document.getElementById('filter');
	htmlContextualMenuContent = document.getElementById('contextualMenu');
	htmlMainContent = document.getElementById('mainContent');
	
	eventHandler();
	AuditEventHandler();
	
}

/**
 *  init the homepage
 */
 function initHomePage() {
	
	localizeHTML();
	
	utils.setPageTitle(langVallydette.homepage);
		
	document.getElementById("main").innerHTML = "";
	
	var htmlHomePage = "";
	
	htmlHomePage += '<div class="container">';
	htmlHomePage += '<h2 class="display-2">' + langVallydette.va11ydetteOrange +  '</h2>';
	htmlHomePage += '<p>' + langVallydette.homepageDescription +  '</p>';
	
	htmlHomePage += '<div class="row mb-5">';
	
	Object.keys(checklistVallydette).forEach(function(c){
		
		htmlHomePage += '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">';
		htmlHomePage += '<div class="card h-100 border-0">';
		htmlHomePage += '<div class="card-body">';
        htmlHomePage += '  <h3 class="card-title bg-transparent">' + checklistVallydette[c]['name-' + globalLang] + '</h3>';
        htmlHomePage += ' <p class="card-subtitle">' + checklistVallydette[c]['description-' + globalLang] + '</p>';
		htmlHomePage += ' </div>';
        htmlHomePage += '<div class="card-footer py-3 border-0">';
        htmlHomePage += '  <a href="./?list=' + c + '&lang=' + globalLang + '" class="btn btn-info  stretched-link">';
        htmlHomePage +=  langVallydette.run;
        htmlHomePage += '   <span class="visually-hidden">' + checklistVallydette[c]['name-' + globalLang] + '</span>';
        htmlHomePage += '  </a>';
        htmlHomePage += '</div>';
		htmlHomePage += '</div>';
		htmlHomePage += '</div>';
	});
	
	htmlHomePage += '</div>';
	htmlHomePage += '</div>';
	
	document.getElementById("main").innerHTML = htmlHomePage;
	
	eventHandler();
	
}

/**
 * Run the HTML elements localisations depending on file loaded by runLangRequest function.
 */
 function localizeHTML() {
	Object.keys(langVallydette.template).forEach(function (key) {
		eleToLocalize = document.getElementById(key);
		if (eleToLocalize !== null) {
			eleToLocalize.innerHTML = langVallydette.template[key];
		}
	});
	
	Object.keys(langVallydette.title).forEach(function (key) {
		eleToLocalize = document.getElementById(key);
		if(eleToLocalize){
			eleToLocalize.setAttribute('title', langVallydette.title[key]);
			eleToLocalize.setAttribute('aria-label', langVallydette.title[key]);
		}
	});
	
	Object.keys(langVallydette.ariaLabelOnly).forEach(function (key) {
		eleToLocalize = document.getElementById(key);
		eleToLocalize.setAttribute('aria-label', langVallydette.ariaLabelOnly[key]);
	});

}

/**
 *  Init the current item in the menu lang
 */
 function initLangMenu() {
	
	var linkFr = document.getElementById("link-fr");
	var linkEn = document.getElementById("link-en");
	
	if (currentCriteriaListName) {
		linkFr.setAttribute('href', './?lang=fr&list=' + currentCriteriaListName);
		linkEn.setAttribute('href', './?lang=en&list=' + currentCriteriaListName);
	} else {
		linkFr.setAttribute('href', './?lang=fr');
		linkEn.setAttribute('href', './?lang=en');
	}
	
	if (globalLang === "fr") {
		linkFr.setAttribute('aria-current', true);	
		linkFr.classList.add("active");
		
		linkEn.removeAttribute('aria-current');
		linkEn.classList.remove("active");
		
	} else {
		linkEn.setAttribute('aria-current', true);
		linkEn.classList.add("active");
		
		linkFr.removeAttribute('aria-current');
		linkFr.classList.remove("active");
	}
}

/**
 *  Run the HTML marker for the tests list.
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
 runTestListMarkup = function (currentRefTests) {
	//let htmlMainContent = document.getElementById('mainContent');
	let htmlrefTests = '';
	let headingTheme = '';

	if (document.getElementById('btnExcelExport') === null) {
		
			var btnExcelExport = utils.addElement('button', 'btnExcelExport', langVallydette.title.btnExcelExport, htmlIcon.excel, true, ["btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none"], langVallydette.title.btnExcelExport);
		
			let auditInfoNode = document.getElementById("auditInfoManager");
			auditInfoNode.insertBefore(btnExcelExport, auditInfoNode.children[3]);
			btnExcelExport.addEventListener('click', function () {
				excelExport(globalTemplate);
			});
			
	}

	switch (globalTemplate){
		case 'wcag':
			htmlrefTests = wcagView(currentRefTests);
			break;
		/** 'audit' value correspond to the conformity checklist 
	  	* @todo a supprimer au bout d'un moment 08/08/2022
	 	*/
		case 'audit':
			htmlrefTests = auditView(currentRefTests)
			break;
		case 'rgaa' :
			htmlrefTests = rgaaView(currentRefTests);

	}

	currentRefTests.length === 0 ? htmlMainContent.innerHTML = '<div class="alert alert-warning">' + langVallydette.warningNoResult + '</div>' : htmlMainContent.innerHTML = htmlrefTests;

	/** event handler */
	for (let i in currentRefTests) {
	
		var radios = document.getElementsByName("test-" + currentRefTests[i].ID);
		var nodeArray = [];
		for (var j = 0; j < radios.length; ++j) {
			radios[j].addEventListener('click', function () {
				setStatusAndResults(this, currentRefTests[i].ID, currentRefTests[i].IDorigin);
				jsonUpdate();
			}, false);
		}

		
		var issue = document.getElementById("issueBtn" + currentRefTests[i].ID);
		if (issue) {
			issue.addEventListener('click', function () {
				setIssue(currentRefTests[i].ID, currentRefTests[i].title, currentRefTests[i].IDorigin)
			}, false);
		}
		
		var issueDisplayBtn = document.getElementById("issueDisplayBtn" + currentRefTests[i].ID);
		if (issueDisplayBtn) {
			issueDisplayBtn.addEventListener('click', function () {
				displayIssue(currentRefTests[i].ID, currentRefTests[i].title)
			}, false);
		}
		
		var autoCheck = document.getElementById("autoCheck-" + currentRefTests[i].ID);
		if (autoCheck) {
			autoCheck.addEventListener('click', function () {
				setAutoCheckID(this, currentRefTests[i].IDorigin, currentRefTests[i].ID)
			}, false);
		}
	}

	applyDisabledGroups();
	initAnchorMenu();
}


/**
 *  View HTMl to wcag checklist.
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
function defaultView(currentRefTests){
	let htmlrefTests = '';
	let headingTheme = '';
	
	setPageName(dataVallydette.checklist.page[currentPage].name);
		
	/** Modify column number */ 
	utils.columnDisplay(3);
	for (let i in currentRefTests) {
		var currentTest = currentRefTests[i].ID;
		if (headingTheme != currentRefTests[i].themes) {
			if (headingTheme !== '') {
				htmlrefTests += '</div>';
			}

			headingTheme = currentRefTests[i].themes;
			let formattedHeadingTheme = utils.formatHeading(headingTheme);
			htmlrefTests += '<a id="anchor-'+formattedHeadingTheme+'"></a>';
			htmlrefTests += '<h3 class="sticky-top d-flex bg-white pt-4 pb-3 border-bottom h2" id="test-' + formattedHeadingTheme + '">' + currentRefTests[i].themes + '<button class="btn btn-secondary btn-icon ms-auto btn-expanded" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + formattedHeadingTheme + '" aria-expanded="true" aria-controls="collapse-' + formattedHeadingTheme + '" aria-label="' + langVallydette.expanded + '">'+htmlIcon.arrowDown+'</span></button></h3>';
			htmlrefTests += '<div class="collapse show px-2" id="collapse-' + formattedHeadingTheme + '">';
		}

		let goodPracticeClass ="";
		if(currentRefTests[i].goodPractice == true){
			goodPracticeClass="good-practice";
			if(! dataVallydette.checklist.goodPractice){
				goodPracticeClass+=" d-none";
			}
		}

		htmlrefTests+='<article class="card mb-3 '+ goodPracticeClass +' " id="' + currentTest + '"><div class="card-header border-light"><h4 class="card-title h5 d-flex flex-column d-sm-flex flex-sm-row align-items-center mb-0" id="heading' + currentTest + '" style="scroll-margin-top: 10.35em;"><span class="w-75 me-auto">' + currentRefTests[i].title + ' <a class="header-anchor"  href="#heading' + currentTest + '" aria-label="' + langVallydette.anchorLink + '">#</a></span>' + ((getIfAutoCheck(currentRefTests[i].IDorigin,currentPage-1)) ? '<span class="icon icon-Link mx-1 badge bg-warning" id="link-' + currentRefTests[i].ID + '" title="' + langVallydette.autocheckTxt1 + '" >'+ htmlIcon.link+'<span class="visually-hidden">' + langVallydette.autocheckTxt1 + '</span></span>' : '') + '';

		hasGoodPractice = false;
		
		if(currentRefTests[i].goodPractice){
			
			if ((currentRefTests[i].wcag[0] === undefined || currentRefTests[i].wcag[0] === "")) {
				hasGoodPractice = true;
				htmlrefTests += '<span class="m-1 badge bg-warning">'+langVallydette.goodPractice+'</span>';
			}
			
			if (currentRefTests[i].wcag) {
				hasAAA = false;
				currentRefTests[i].wcag.forEach(function (currentWcag) {
					
					if(getAAA(currentWcag)) {
						hasAAA = true;
						htmlrefTests += '<span class="m-1 badge bg-warning">AAA</span>';
					}
					
				});
			}
		}

		htmlrefTests += '<span id="resultID-' + currentTest + '" class="m-1 badge ' + getStatutClass(currentRefTests[i].resultatTest) + '">' + setStatutText(currentRefTests[i].resultatTest) + '</span></h4></div>';
		
		htmlrefTests += '<div class="card-body py-2 d-flex align-items-center justify-content-between"><ul class="list-inline m-0">';
		htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="conforme-' + currentTest + '" name="test-' + currentTest + '" value="ok" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[0][1]) ? "checked" : "") + '/><label for="conforme-' + currentTest + '" class="form-check-label">' + langVallydette.template.status1 + '</label></li>';
		htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="non-conforme-' + currentTest + '" name="test-' + currentTest + '" value="ko" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[1][1]) ? "checked" : "") + '/><label for="non-conforme-' + currentTest + '" class="form-check-label">' + langVallydette.template.status2 + '</label></li>';
		htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="na-' + currentTest + '" name="test-' + currentTest + '" value="na" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[2][1]) ? "checked" : "") + '/><label for="na-' + currentTest + '" class="form-check-label">' + langVallydette.status5 + '</label></li>';
		htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="nt-' + currentTest + '" name="test-' + currentTest + '" value="nt" ' + (((currentRefTests[i].resultatTest === arrayFilterNameAndValue[3][1]) || (currentRefTests[i].resultatTest === '')) ? "checked" : "") + '/><label for="nt-' + currentTest + '" class="form-check-label">' + langVallydette.template.status4 + '</label></li>';
		htmlrefTests += '</ul>';

		htmlrefTests += '<div class="btn-group" role="group" aria-label="' + langVallydette.issueManagement + '">';
		htmlrefTests += '<ul class="list-inline m-0">';
		htmlrefTests += '<li class="list-inline-item" aria-hidden="true">' + langVallydette.issues + '</li>';
		htmlrefTests += '<li class="list-inline-item"><button type="button" id="issueDisplayBtn' + currentTest + '" class="btn btn-secondary btn-icon me-1 d-print-none" title="' + langVallydette.editIssue + '" data-bs-toggle="modal" data-bs-target="#modalEditIssue" ' + ((currentRefTests[i].issues.length === 0) ? "disabled" : "") + '>'+htmlIcon.edit+'</span><span class="visually-hidden">' + langVallydette.editIssue + '</span></button></li>';
		htmlrefTests += '<li class="list-inline-item"><button type="button" id="issueBtn' + currentTest + '" class="btn btn-secondary btn-icon d-print-none" title="' + langVallydette.addIssue + '" data-bs-toggle="modal" data-bs-target="#modalAddIssue">'+htmlIcon.add+'</span><span class="visually-hidden">' + langVallydette.addIssue + '</span></button></li>';
		htmlrefTests += '</ul>';
		htmlrefTests += '</div>';
		htmlrefTests += '<button class="btn btn-secondary btn-icon d-print-none btn-expanded" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + currentTest + '" aria-expanded="false" aria-controls="collapse-' + currentTest + '">'+htmlIcon.arrowDown+'<span class="visually-hidden">' + langVallydette.informations + '</span></button></div>';
		
		htmlrefTests +='<div id="alert-' + currentTest + '" class="alert alert-danger d-none" role="alert"><span class="alert-icon"></span><p></p></div>';
		
		htmlrefTests += '<div class="collapse ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + ' border-light pt-3 mx-3 d-print-block" id="collapse-' + currentTest + '">';

		
		htmlrefTests += '<div class="form-check">';
		htmlrefTests += '	<input type="checkbox" class="form-check-input" id="autoCheck-' + currentTest + '" aria-labelledby="heading' + currentTest + ' autoCheckLabel-' + currentTest + '" ' + ((getIfAutoCheck(currentRefTests[i].IDorigin,currentPage)) ? "checked" : "" )  + '>';
		htmlrefTests += '	<label class="form-check-label" for="autoCheck-' + currentTest + '" id="autoCheckLabel-' + currentTest + '">' + langVallydette.autocheckTxt2 + '</label>';
		htmlrefTests += '</div>';

		htmlrefTests += '<div class="border-top border-light my-3 w-100"></div>';
		
		if (currentRefTests[i].verifier) {
			htmlrefTests += '<h5>' + langVallydette.toCheckHeading + '</h5>';
			htmlrefTests += currentRefTests[i].verifier;
		}
		
		if (currentRefTests[i].complement) {
			htmlrefTests += currentRefTests[i].complement;
		}

		if (currentRefTests[i].exception) {
			htmlrefTests += '<h5>' + langVallydette.exceptionHeading + '</h5>';
			htmlrefTests += '<p>' + currentRefTests[i].exception + '</p>';
		}
		
		if (currentRefTests[i].moreInfo) {
			htmlrefTests += '<a href="' + currentRefTests[i].moreInfo + '" id="mi-' + currentTest + '" aria-labelledby="heading' + currentTest + ' mi-' + currentTest + '" class="btn btn-secondary btn-sm" title="' + langVallydette.moreInfo + ' (' + langVallydette.newWindow +')" target="_blank">' + langVallydette.moreInfo + '</a>';
		}
		
		htmlrefTests += '<div class="py-2 ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + 'border-light"><p class="text-muted mb-0"><abbr title="Web Content Accessibility Guidelines" lang="en">WCAG</abbr>&nbsp;:&nbsp;';
		for (let j in currentRefTests[i].wcag) {
			htmlrefTests += currentRefTests[i].wcag[j];
			j != ((currentRefTests[i].wcag).length - 1) ? htmlrefTests += ',  ' : '';
		}
		htmlrefTests += ' / Identifiant : ' + currentTest;
		htmlrefTests += '</p></div></div>';

		htmlrefTests += '</article>';
	}
	return htmlrefTests;
}


/**
 *  View HTMl to wcag checklist.
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
function wcagView(currentRefTests){
	

	if(document.getElementById('btnShowStatement') === null) {
		var btnStatement = utils.addElement('button', 'btnShowStatement', langVallydette.statement, false, false, ["btn", "btn-secondary", "ms-2", "d-print-none"], langVallydette.statementTitle);
		document.getElementById("auditInfoManager").appendChild(btnStatement);
		document.getElementById("btnShowStatement").addEventListener('click',  function () {initStatementObject(); initAnchorMenu();});
	}

	return defaultView(currentRefTests);
}

/**
 *  View HTMl to rgaa checklist.
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
function rgaaView(currentRefTests){
	return defaultView(currentRefTests);
}

/**
 *  View HTMl to audit checklist.
 * @todo a supprimer 
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
 function auditView(currentRefTests){
	let htmlrefTests = '';
	let headingTheme = '';
	setPageName(dataVallydette.checklist.page[currentPage].name);
		utils.removeElement(document.getElementById('btnShowStatement'));

		/** pass through the tests object to display each of them */
		for (let i in currentRefTests) {
			var currentTest = currentRefTests[i].ID;
			if (headingTheme != currentRefTests[i].themes) {
				if (headingTheme !== '') {
					htmlrefTests += '</div>';
				}

				headingTheme = currentRefTests[i].themes;
				let formattedHeadingTheme = utils.formatHeading(headingTheme);
				htmlrefTests += '<a id="anchor-'+formattedHeadingTheme+'"></a>';
				htmlrefTests += '<h3 class="sticky-top d-flex bg-white pt-4 h2 pb-3 border-bottom" id="test-' + formattedHeadingTheme + '">' + currentRefTests[i].themes + '<button class="btn btn-secondary btn-icon ms-auto btn-expanded" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + formattedHeadingTheme + '" aria-expanded="true" aria-controls="collapse-' + formattedHeadingTheme + '" aria-label="' + langVallydette.expanded + '">'+htmlIcon.arrowDown+'</button></h3>';
				htmlrefTests += '<div class="collapse show px-2" id="collapse-' + formattedHeadingTheme + '">';
			}

			htmlrefTests += '<article class="card mb-3" id="' + currentTest + '"><div class="card-header border-light"><h4 class="card-title h5 d-flex flex-column d-sm-flex flex-sm-row align-items-center mb-0" id="heading' + currentTest + '" style="scroll-margin-top: 10.35em;"><span class="w-75">' + currentRefTests[i].title + ' <a class="header-anchor"  href="#heading' + currentTest + '" aria-label="' + langVallydette.anchorLink + '">#</a></span>'
			
			hasGoodPractice = false;
			if ((currentRefTests[i].wcag === undefined || currentRefTests[i].wcag[0] === "")) {
				hasGoodPractice = true;
				htmlrefTests += '<span class="ms-auto m-1 badge bg-warning">'+langVallydette.goodPractice+'</span>';
			}
			
			if (currentRefTests[i].wcag) {
				hasAAA = false;
				currentRefTests[i].wcag.forEach(function (currentWcag) {
					
					if(getAAA(currentWcag)) {
						hasAAA = true;
						htmlrefTests += '<span class="ms-auto m-1 badge bg-warning">AAA</span>';
					}
					
				});
			}
			
			htmlrefTests += '<span id="resultID-' + currentTest + '" class="' + ((!hasAAA && !hasGoodPractice) ? 'ms-auto ' : '') + 'badge ' + getStatutClass(currentRefTests[i].resultatTest) + '">' + setStatutText(currentRefTests[i].resultatTest) + '</span></h4></div>';
			
			htmlrefTests += '<div class="card-body py-2 d-flex align-items-center justify-content-between"><ul class="list-inline m-0">';
			htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="conforme-' + currentTest + '" name="test-' + currentTest + '" value="ok" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[0][1]) ? "checked" : "") + '/><label for="conforme-' + currentTest + '" class="form-check-label">' + langVallydette.template.status1 + '</label></li>';
			htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="non-conforme-' + currentTest + '" name="test-' + currentTest + '" value="ko" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[1][1]) ? "checked" : "") + '/><label for="non-conforme-' + currentTest + '" class="form-check-label">' + langVallydette.template.status2 + '</label></li>';
			htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="na-' + currentTest + '" name="test-' + currentTest + '" value="na" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[2][1]) ? "checked" : "") + '/><label for="na-' + currentTest + '" class="form-check-label">' + langVallydette.status5 + '</label></li>';
			htmlrefTests += '<li class="form-check form-check-inline mb-0"><input class="form-check-input" type="radio" id="nt-' + currentTest + '" name="test-' + currentTest + '" value="nt" ' + (((currentRefTests[i].resultatTest === arrayFilterNameAndValue[3][1]) || (currentRefTests[i].resultatTest === '')) ? "checked" : "") + '/><label for="nt-' + currentTest + '" class="form-check-label">' + langVallydette.template.status4 + '</label></li>';
			htmlrefTests += '</ul>';
			
			htmlrefTests += '<div class="btn-group" role="group" aria-label="' + langVallydette.issueManagement + '">';
			htmlrefTests += '<ul class="list-inline m-0">';
			htmlrefTests += '<li class="list-inline-item" aria-hidden="true">' + langVallydette.issues + '</li>';
			htmlrefTests += '<li class="list-inline-item"><button type="button" id="issueDisplayBtn' + currentTest + '" class="btn btn-secondary btn-icon me-1 d-print-none" title="' + langVallydette.editIssue + '" data-bs-toggle="modal" data-bs-target="#modalEditIssue" ' + ((currentRefTests[i].issues.length === 0) ? "disabled" : "") + '>'+htmlIcon.edit+'<span class="visually-hidden">' + langVallydette.editIssue + '</span></button></li>';
			htmlrefTests += '<li class="list-inline-item"><button type="button" id="issueBtn' + currentTest + '" class="btn btn-secondary btn-icon d-print-none" title="' + langVallydette.addIssue + '" data-bs-toggle="modal" data-bs-target="#modalAddIssue">'+htmlIcon.add+'</span><span class="visually-hidden">' + langVallydette.addIssue + '</span></button></li>';
			htmlrefTests += '</ul>';
			htmlrefTests += '</div>';
				
			htmlrefTests += '<button class="btn btn-secondary btn-icon d-print-none btn-expanded" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + currentTest + '" aria-expanded="false" aria-controls="collapse-' + currentTest + '">'+htmlIcon.arrowDown+'<span class="visually-hidden">' + langVallydette.informations + '</span></button></div>';
			
			htmlrefTests +='<div id="alert-' + currentTest + '" class="alert alert-danger d-none" role="alert"><span class="alert-icon"></span><p></p></div>';

			htmlrefTests += '<div class="collapse ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + ' border-light pt-3 mx-3 d-print-block" id="collapse-' + currentTest + '">';

			if (currentRefTests[i].tests) {
				htmlrefTests += '<h5>' + langVallydette.processHeading + '</h5>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].tests);
			}
			
			if (currentRefTests[i].verifier) {
				htmlrefTests += '<h5>' + langVallydette.toCheckHeading + '</h5>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].verifier);
			}
			
			if (currentRefTests[i].resultat) {
				htmlrefTests += '<h5>' + langVallydette.resultHeading + '</h5>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].resultat);
			}
			
			if (currentRefTests[i].exception) {
				htmlrefTests += '<h5>' + langVallydette.exceptionHeading + '</h5>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p>';
			}
			
			if (currentRefTests[i].raccourcis) {
				htmlrefTests += '<h5>' + langVallydette.informations + '</h5>';
				htmlrefTests += '<p>' + currentRefTests[i].raccourcis+ '</p>';
			}

			if (currentRefTests[i].moreInfo) {
				htmlrefTests += '<a href="' + currentRefTests[i].moreInfo + '" id="mi-' + currentTest + '" aria-labelledby="heading' + currentTest + ' mi-' + currentTest + '" class="btn btn-secondary btn-sm" title="' + langVallydette.moreInfo + ' (' + langVallydette.newWindow +')" target="_blank">' + langVallydette.moreInfo + '</a>';
			}
			
			htmlrefTests += '<div class="py-2 ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + 'border-light"><p class="text-muted mb-0"><abbr title="Web Content Accessibility Guidelines" lang="en">WCAG</abbr>&nbsp;:&nbsp;';
			for (let j in currentRefTests[i].wcag) {
				htmlrefTests += currentRefTests[i].wcag[j];
				j != ((currentRefTests[i].wcag).length - 1) ? htmlrefTests += ',  ' : '';
			}
			htmlrefTests += ' / Identifiant : ' + currentTest;
			htmlrefTests += '</p></div></div>';

			htmlrefTests += '</article>';
		}
		return htmlrefTests;
 }