/**
 * Page manager
*/

/**
 * Initialization of the pagination menu.
 @param {object} pages - pages from dataVallydette
*/

initPagination = function (pages) {
	var allPages = pages.page;

	var pageElement = document.getElementById("pageManager");
	pageElement.innerHTML = "<div class='container navbar-expand p-0'><ul class='nav navbar-nav'></ul></div>";

	let AddPage = document.createElement("li");
	AddPage.classList.add("nav-item");
	var btnAddPage = document.createElement("button");
	btnAddPage.innerHTML = langVallydette.addPage + "&nbsp;"+htmlIcon.addMore;
	btnAddPage.setAttribute('id', "btnAddPage");
	btnAddPage.classList.add("btn", "btn-link", "nav-link", "border-0");

	AddPage.appendChild(btnAddPage);
	pageElement.querySelector(".nav").appendChild(AddPage);

	btnAddPage.addEventListener('click', function () {
		addPage();
	}, false);

	initContextualMenu(0, "pageID-0");
	
	for (let i in allPages) {
		let newPage = document.createElement("li");
		newPage.classList.add("nav-item");

		let newBtnPage = document.createElement("button");

		newBtnPage.innerHTML = utils.escape_html(allPages[i].name);
		newBtnPage.setAttribute('id', allPages[i].IDPage);
		newBtnPage.classList.add("btn", "btn-link", "nav-link", "border-0");
		if (i == 0) {
			utils.setActive(newBtnPage);
		}
		newPage.appendChild(newBtnPage);
		pageElement.querySelector(".nav").appendChild(newPage);

		let thisNewBtn = document.getElementById(allPages[i].IDPage);
		thisNewBtn.addEventListener('click', function () {
			showPage(thisNewBtn.id)
		}, false);

		let btnDelPage = document.getElementById("btnDelPage");
		allPages.length > 1 ? btnDelPage.disabled = false : btnDelPage.disabled = true;
	}
}

/**  Adds a new page to the dataVallydette object and updates the page menu. */
addPage = function () {
	

	var pagenum = dataVallydette.checklist.page.length;
	/**  Duplicate the page object and push it to the dataVallydette as a new page. */
	var arr2 = JSON.parse(JSON.stringify(dataVallydette.checklist.page[pagenum-1]));
	
	dataVallydette.checklist.page.push(arr2);

	indexPage = dataVallydette.checklist.page.length - 1;
	
	var newIdPage = new Uint32Array(1);
	window.crypto.getRandomValues(newIdPage);
	newIdPage = "pageID-" + newIdPage;

	var btnFirstPage = document.getElementById(dataVallydette.checklist.page[0].IDPage);
	btnFirstPage.disabled = false;

	dataVallydette.checklist.page[indexPage].IDPage = newIdPage;
	dataVallydette.checklist.page[indexPage].name = langVallydette.pageName;
	dataVallydette.checklist.page[indexPage].url = "";
	dataVallydette.checklist.page[indexPage].items.forEach(initNewPage);
	
	jsonStr = JSON.stringify(dataVallydette);

	/**  Display the updated pagination */
	let newPage = document.createElement("li");
	newPage.classList.add("nav-item");
	var pageElement = document.getElementById("pageManager");
	var newBtnPage = document.createElement("button");

	newBtnPage.innerHTML = langVallydette.pageName;
	newBtnPage.setAttribute('id', newIdPage);
	newBtnPage.classList.add("btn", "btn-link", "nav-link", "border-0");
	newPage.appendChild(newBtnPage);
	pageElement.querySelector(".nav").appendChild(newPage);

	var thisNewBtn = document.getElementById(newIdPage);
	var currentIdPage = thisNewBtn.getAttribute('id');
	thisNewBtn.addEventListener('click', function () {
		showPage(currentIdPage)
	}, false);

	/**  Enabled delete button */
	var currentBtnDelPage = document.getElementById('btnDelPage');
	if( null != currentBtnDelPage ){
		currentBtnDelPage.disabled = false;
	}
	
	
	showPage(currentIdPage);
	document.getElementById('btnPageName').click();
	document.getElementById("nameValue").select();

}

/**  Initialization of some properties */
initNewPage = function (item) {
	item.ID = item.ID + '-p' + indexPage;
	
	/**  auto check */
	if (!getIfAutoCheck(item.IDorigin, indexPage-1)) {
		item.resultatTest = 'nt';
		if(item.issues) {
			item.issues.splice(0, item.issues.length);
		}
	}
	
	/**  Initialization of the groups */
	if(dataVallydette.checklist.page[indexPage].groups[item.group]){
		dataVallydette.checklist.page[indexPage].groups[item.group].idTests.push(item.IDorigin);
		dataVallydette.checklist.page[indexPage].groups[item.group].checked = true;
	} 
			
}

/** 
*	Shows a new page when using the pagination menu.
*	@param {number} id - ID of the page into the dataVallydette.
*/
showPage = function (id) {
	/** Gets the index from the ID. */
	var index = dataVallydette.checklist.page.findIndex(function (o) {
		return o.IDPage === id;
	})
	
	/** Update the global var currentPage with the index */
	currentPage = index;

	/** Load the page content */
	loadChecklistObject();

	/** Init the page contextual menu */
	if (!document.getElementById('btnPageName')) {
		
		initContextualMenu(currentPage, id);
		
	} else {
		
		var currentBtnPageName = document.getElementById('btnPageName'); 
		currentBtnPageName.dataset.property = "checklist.page." + currentPage + ".name";
		currentBtnPageName.dataset.secondaryElement = id;

		var currentBtnDelPage = document.getElementById('btnDelPage');
		
		if (currentPage === 0) {
			currentBtnDelPage.disabled = true;
			currentBtnDelPage.dataset.property = "";
			currentBtnDelPage.dataset.pagination = "";
		} else {
			currentBtnDelPage.disabled = false;
			currentBtnDelPage.dataset.property = "checklist.page." + currentPage;
			currentBtnDelPage.dataset.pagination = id;
		}

		var currentbtnOpenUrl = document.getElementById('btnOpenUrl');
		if( getPropertyValue("checklist.page." + currentPage + ".url") === '' ){
			currentbtnOpenUrl.classList.add('disabled');
			currentbtnOpenUrl.removeAttribute('href');
			currentbtnOpenUrl.setAttribute('aria-disabled', 'true');
		}
		else{
			currentbtnOpenUrl.classList.remove('disabled');
			currentbtnOpenUrl.href = getPropertyValue("checklist.page." + currentPage + ".url");
			currentbtnOpenUrl.setAttribute('aria-disabled', 'false');
		}
		
	}
	
	utils.setPageTitle(dataVallydette.checklist.page[currentPage].name);
	
	utils.resetActive(document.getElementById("pageManager"));

	utils.setActive(document.getElementById(dataVallydette.checklist.page[currentPage].IDPage));
	
	utils.putTheFocus(document.getElementById("pageName"));
	
}

/** 
*	Displays the delete popin confirmation
*	@param {string} targetElement - html id element that contains the current page name.
*/
setDeletePage = function (targetElement) {

	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg" role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5>' + langVallydette.delete + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-body">';
	htmlModal += '<p>' + langVallydette.deletePageName + ' <strong>' + getPropertyValue(targetElement) + '</strong> ?</p>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
	htmlModal += '<button type="button" id="deteleSaveBtn" data-bs-dismiss="modal" class="btn btn-primary">' + langVallydette.validate + '</button>';
	htmlModal += '</div></div></div>';

	/**  html modal container */
	let elModal = document.getElementById('modalDelete');
	elModal.innerHTML = htmlModal;

	/**  popin event handler */
	var deteleSaveBtn = document.getElementById("deteleSaveBtn");
	deteleSaveBtn.addEventListener('click', function () {
		deletePage(currentPage, targetElement)
	});
}

/** 
*	Deletes the current page, and item from the pagination menu
*	@param {number} currentPage - global var that contains the current page index.
*	@param {string} targetElement - html id element that contains the current page name.
*/
deletePage = function (currentPage, targetElement) {

	/** check linked next and previous page, if not delete link to previous page	 */
	let previouspage = dataVallydette.checklist.page[currentPage-1];

	let differenceAutoCheck = previouspage.autoCheckIDs.filter(x => !dataVallydette.checklist.page[currentPage].autoCheckIDs.includes(x));
	differenceAutoCheck.forEach(autoCheck=>{
		let index = previouspage.autoCheckIDs.indexOf(autoCheck);
		if(index > -1 ){
			previouspage.autoCheckIDs.splice(index,1);
		}

	});

	/** Removes page from dataVallydette. */
	dataVallydette.checklist.page.splice(currentPage, 1);

	/** If there is only one page left, then delete button is disabled. */
	var currentBtnDelPage = document.getElementById('btnDelPage');
	dataVallydette.checklist.page.length === 1 ? currentBtnDelPage.disabled = true : "";

	/** Removes page button from pagination menu. */
	var paginationBtnId = currentBtnDelPage.dataset.pagination;
	var paginationBtn = document.getElementById(paginationBtnId);
	paginationBtn.remove();

	/** Updates global var currentPage to load the previous page from pagination menu. */
	currentPage != 0 ? currentPage = currentPage - 1 : "";

	/** Shows the previous page from pagination menu */
	newPageId = dataVallydette.checklist.page[currentPage].IDPage;
	showPage(newPageId);

	/** Updates the json export */
	jsonUpdate();

}

/** 
*	Sets the current page name (main heading).
*	@param {string} value - page name.
*/
function setPageName(value) {
	
	var currentPageName = document.getElementById('pageName');
	currentPageName.innerHTML = utils.escape_html(value);
	
}