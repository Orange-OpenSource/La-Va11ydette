/* 

# Software Name: La Va11ydette
# SPDX-FileCopyrightText: Copyright (c) 2021 Orange
# SPDX-License-Identifier: MIT License
#
# This software is distributed under the MIT licens

*/

/*$('#docs-navbar').navbar({sticky: true, hideSupra: true});
$('.o-nav-local').prioritynav('Autres pages');*/

/**
 * Global vars
 * @param {object} dataVallydette - Global main object, that contains all tests and result of the selected checklist.
 * @param {object} langVallydette - language object.
 * @param {object} checklistVallydette - checklists parameters (ex : url list param).
 * @param {object} issuesVallydette - issues object.
 * @param {string} globalLang - current selected language.
 * @param {string} globalTemplate - actually 2 templates are available, wcag for conformity audit et audit for test audit.
 * @param {number} globalVersion - Contains the last checklist version
 * @param {object} dataWCAG - Object related to matrice-wcag-ease.json, that contains the link between WCAG rules and conformity checklist tests.
 * @param {number} currentPage - Current page index, updated each time user move to another page.
 * @param {string} statutClass - Default class used by the html element displaying a test result.
 * @param {array} arrayFilterNameAndValue - Initialization of filter labels and values.
 * @param {array} arrayFilterActivated - Array that contains all the activated filters from the frontend component menu.
 * @param {array} arrayProfileActivated - Array that contains all the activated profiles from the frontend filter menu (from audit mode).
 * @param {array} arrayTypeActivated - Array that contains all the activated types from the frontend filter menu (from audit mode).
 * @param {string} currentCriteriaListName - Selected checklist json file name.
 * @param {object} htmlContextualMenuContent - Contextual page menu (edit page name, delete a page).
 * @param {object} htmlFilterContent - Test filter menu.
 * @param {object} htmlMainContent - Main content.
 */
var dataVallydette;
var langVallydette;
var checklistVallydette;
var issuesVallydette={};

var globalLang;
var globalTemplate;
var globalVersion;

var dataWCAG;

var	currentPage = 0;
var statutClass = "bg-light";

var arrayFilterNameAndValue = [];
var arrayFilterActivated = [];

var arrayProfileActivated = [];
var arrayTypeActivated = [];

var currentCriteriaListName;

var htmlContextualMenuContent;
var htmlFilterContent;
var htmlMainContent;

var htmlIcon = {
	add: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 { fill-rule: evenodd;}</style></defs><path class="cls-1" d="M850,400H600V150a50,50,0,0,0-50-50H450a50,50,0,0,0-50,50V400H150a50,50,0,0,0-50,50V550a50,50,0,0,0,50,50H400V850a50,50,0,0,0,50,50H550a50,50,0,0,0,50-50V600H850a50,50,0,0,0,50-50V450A50,50,0,0,0,850,400Z"/></svg>',
	addMore: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path id="Forme_1" data-name="Forme 1" class="cls-1" d="M500,75C265.829,75,75,265,75,500S265.829,925,500,925,925,735,925,500,734.169,75,500,75ZM775,550a25,25,0,0,1-25,25H575V750a25,25,0,0,1-25,25H450a25,25,0,0,1-25-25V575H250a25,25,0,0,1-25-25V450a25,25,0,0,1,25-25H425V250a25,25,0,0,1,25-25H550a25,25,0,0,1,25,25V425H750a25,25,0,0,1,25,25V550Z"/></svg>',
	arrowDown: '<svg aria-hidden="true" focusable="false" fill="currentColor" class="icon-arrow-down" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs> <style>.cls-1 { fill-rule: evenodd; }</style> </defs><path class="cls-1" d="M900,275L500,750,100,275H900Z"/></svg>',
	edit: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M876.2,238.316l-51.077-51.108-63.846-63.884a81.085,81.085,0,0,0-68.3-23.078c-0.712.095-1.421,0.2-2.131,0.32-2.332.375-4.65,0.843-6.948,1.422-2.315.583-4.611,1.26-6.877,2.049-0.03.011-.061,0.019-0.091,0.03a80.92,80.92,0,0,0-30.578,19.257L186.663,583.292,133.137,759.716h0l-13.253,43.678L101.2,864.984c-0.185.61-.344,1.22-0.485,1.827-0.045.192-.078,0.383-0.119,0.575-0.087.415-.17,0.83-0.238,1.242-0.037.227-.066,0.453-0.1,0.68-0.052.378-.1,0.755-0.135,1.131-0.022.235-.04,0.468-0.057,0.7-0.025.369-.043,0.736-0.053,1.1-0.006.23-.012,0.46-0.013,0.689,0,0.376.01,0.75,0.025,1.123,0.008,0.211.013,0.422,0.027,0.632,0.027,0.425.069,0.847,0.116,1.267,0.018,0.152.028,0.305,0.048,0.456q0.111,0.855.276,1.693c0.021,0.108.05,0.214,0.072,0.322,0.095,0.448.2,0.894,0.313,1.334,0.051,0.191.11,0.379,0.165,0.568,0.1,0.354.207,0.705,0.323,1.053,0.07,0.207.145,0.412,0.219,0.617,0.118,0.326.24,0.649,0.37,0.969,0.084,0.207.171,0.412,0.259,0.617q0.207,0.473.431,0.935c0.095,0.2.188,0.393,0.288,0.587,0.164,0.322.339,0.638,0.516,0.952,0.095,0.171.188,0.343,0.287,0.511,0.227,0.385.467,0.761,0.713,1.134,0.059,0.09.114,0.183,0.175,0.273q0.464,0.685.969,1.341c0.1,0.127.2,0.248,0.3,0.373,0.246,0.308.493,0.614,0.752,0.911,0.135,0.156.277,0.307,0.415,0.46,0.234,0.257.47,0.512,0.713,0.76,0.155,0.158.313,0.312,0.472,0.467,0.241,0.234.486,0.465,0.736,0.69,0.165,0.15.33,0.3,0.5,0.443,0.259,0.224.524,0.441,0.792,0.655,0.167,0.132.331,0.266,0.5,0.395,0.3,0.228.6,0.445,0.912,0.66,0.147,0.1.29,0.21,0.438,0.309,0.459,0.308.926,0.605,1.405,0.885,0.021,0.013.043,0.024,0.065,0.036q0.687,0.4,1.4.759c0.162,0.082.329,0.156,0.494,0.235,0.337,0.163.677,0.323,1.022,0.472,0.2,0.084.395,0.162,0.592,0.241,0.324,0.131.65,0.257,0.979,0.375,0.209,0.075.419,0.146,0.631,0.216q0.493,0.162.995,0.306c0.212,0.061.424,0.122,0.638,0.177,0.352,0.092.706,0.172,1.062,0.249,0.2,0.044.4,0.091,0.6,0.129,0.415,0.08.835,0.145,1.256,0.206,0.147,0.021.291,0.048,0.438,0.067q0.856,0.106,1.726.159c0.117,0.007.236,0.006,0.353,0.011,0.4,0.019.8,0.037,1.208,0.037,0.056,0,.113-0.006.169-0.006,0.358,0,.719-0.023,1.08-0.04,0.283-.013.565-0.019,0.85-0.041,0.377-.03.758-0.081,1.137-0.127,0.272-.033.542-0.056,0.814-0.1,0.421-.064.845-0.153,1.269-0.237,0.233-.047.466-0.082,0.7-0.135q0.963-.219,1.93-0.51c0.017,0,.034-0.008.051-0.014l21.618-6.566,83.587-25.391h0l176.317-53.56h0l262.68-262.838L876.2,353.308a80.927,80.927,0,0,0,22.163-41.279q0.136-.669.26-1.338,0.611-3.294.95-6.62c0.026-.248.053-0.5,0.076-0.744q0.342-3.7.35-7.422c0-.031,0-0.062,0-0.093A81.083,81.083,0,0,0,876.2,238.316ZM359.047,755.779l37.419,37.442L220.148,846.78l-66.969-67.01,53.527-176.424,37.419,37.441L703.815,180.82l19.154,19.165L263.278,659.953l76.615,76.661L799.584,276.646l19.154,19.166Z"/></svg>',
	excel : '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M669.445,275H825L625,75V225C625,252.616,644.9,275,669.445,275ZM675,325A100,100,0,0,1,575,225V75H175V874.774h0.006c0,0.076-.006.15-0.006,0.226a50,50,0,0,0,50,50H825V325H675ZM400,800H300V750H400v50Zm150,0H450V750H550v50Zm-7.322-282.322L472.856,587.5l69.822,69.822h0a25,25,0,0,1-35.356,35.356h0L437.5,622.856l-69.822,69.822h0a25,25,0,0,1-35.356-35.356h0L402.144,587.5l-69.822-69.822h0a25,25,0,0,1,35.356-35.356h0L437.5,552.145l69.822-69.823h0a25,25,0,0,1,35.356,35.356h0ZM700,800H600V750H700v50Zm0-100H600V650H700v50Zm0-100H600V550H700v50Zm0-100H600V450H700v50Z"/></svg>',
	link: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M587.422,132.923L412.634,307.711A248.078,248.078,0,0,1,537.9,322.28L657.342,202.842A98.881,98.881,0,0,1,797.181,342.681l-174.8,174.8a98.881,98.881,0,0,1-139.838,0,49.441,49.441,0,1,0-69.92,69.919h0c77.231,77.231,202.447,77.231,279.678,0L867.1,412.6c77.231-77.231,77.231-202.447,0-279.678h0C789.869,55.692,664.653,55.692,587.422,132.923Zm-174.8,734.154L587.413,692.288a248.056,248.056,0,0,1-125.27-14.569L342.7,797.158A98.881,98.881,0,0,1,202.865,657.319l174.8-174.8a98.883,98.883,0,0,1,139.839,0A49.44,49.44,0,1,0,587.422,412.6h0c-77.23-77.23-202.446-77.23-279.677,0l-174.8,174.8c-77.231,77.231-77.231,202.447,0,279.678h0C210.177,944.308,335.393,944.308,412.624,867.077Z"/></svg>',
	link_external:'<svg aria-hidden="true" focusable="false" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path id="External_Link" data-name="External Link" class="cls-1" d="M725,756.25A43.879,43.879,0,0,1,681.25,800H243.75A43.879,43.879,0,0,1,200,756.25V318.75A43.879,43.879,0,0,1,243.75,275H512.868l75-75H215c-49.5,0-90,40.5-90,90V785c0,49.5,40.5,90,90,90H710c49.5,0,90-40.5,90-90V412.132l-75,75V756.25ZM820.36,125H574.479L656.5,207.021,491.152,372.369a55.157,55.157,0,0,0,0,77.988l58.491,58.491a55.157,55.157,0,0,0,77.988,0L792.979,343.5,875,425.521V179.64A54.64,54.64,0,0,0,820.36,125Z"/></svg>',
	syncronise: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 { fill-rule: evenodd;  }</style></defs><path class="cls-1" d="M782.843,217.174A398.736,398.736,0,0,0,500,100c-195.291,0-357.892,139.936-393,325H261.391a250.117,250.117,0,0,1,415.4-101.776L575.005,425H825.02a50,50,0,0,0,50-50V125ZM738.609,575a250.117,250.117,0,0,1-415.4,101.777L425,575H174.98a50,50,0,0,0-50,50V875l92.18-92.174A398.736,398.736,0,0,0,500,900c195.291,0,357.892-139.936,393-325H738.609Z"/></svg>',
	trash: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M750,149.959H625V125a50,50,0,0,0-50-50H425a50,50,0,0,0-50,50v24.959H250a75,75,0,0,0-75,75V275H825V224.959A75,75,0,0,0,750,149.959ZM425,125H575v24.959H425V125ZM225,299.959V925H775V299.959H225ZM375,400V824.865h0c0,0.045,0,.09,0,0.135a25,25,0,0,1-50,0c0-.045,0-0.09,0-0.135h0V400h0c0-.014,0-0.027,0-0.041a25,25,0,0,1,50,0c0,0.014,0,.027,0,0.041h0Zm150,0V824.864h0c0,0.046,0,.09,0,0.136a25,25,0,0,1-50,0c0-.046,0-0.09,0-0.136h0V400h0c0-.014,0-0.028,0-0.041a25,25,0,0,1,50,0c0,0.013,0,.027,0,0.041h0Zm150,0V824.865h0c0,0.045,0,.09,0,0.135a25,25,0,0,1-50,0c0-.045,0-0.09,0-0.135h0V400h0c0-.014,0-0.027,0-0.041a25,25,0,0,1,50,0c0,0.014,0,.027,0,0.041h0Z"/></svg>'
}

	
/**
 * Vallydette object
 */
 
/**
 * Update global var currentCriteriaListName with the selected checklist json file name.
 * Init the localization.
 * Run the dataVallydette object completion
 * @param {string} criteriaListName - Selected checklist json file name.
 * @param {string} lang - Language can be defined in function params.
 */
function initVallydetteApp (criteriaListName, lang) {
	
	initGlobalLang(lang);

	var langRequest = new XMLHttpRequest();
	langRequest.open("GET", "json/lang/"+globalLang+".json", true);
	langRequest.onreadystatechange = function () {
	  if(langRequest.readyState === 4 && langRequest.status === 200) {
		langVallydette = JSON.parse(langRequest.responseText);
		initGlobalCriteriaListName(criteriaListName);
	  } 
	};
	langRequest.send();

}

/**
 * Init the requested checklist from url params, or default configuration.
 * Then load the config json
 * @param {string} criteriaListName - Selected checklist json file name.
 */
function initGlobalCriteriaListName(criteriaListName) {
	
	const paramString = window.location.search;
	const urlParams = new URLSearchParams(paramString);
	if (urlParams.has('list')) {
		currentCriteriaListName = urlParams.get('list');
	} else if (criteriaListName) {
		currentCriteriaListName = criteriaListName;
	} 
	

	var checklistRequest = new XMLHttpRequest();
	checklistRequest.open("GET", "json/config-checklist.json", true);
	checklistRequest.onreadystatechange = function () {
		
	  if(checklistRequest.readyState === 4 && checklistRequest.status === 200) {
		checklistVallydette = JSON.parse(checklistRequest.responseText);

		if (currentCriteriaListName) {
			initAuditPage();
			createObjectAndRunVallydette();
			
		} else {
			initHomePage();
		}

		initMainMenu();
		localizeHTML();
		loadIssue();
		
		
	  } 
	};
	
	checklistRequest.send();
	
	
		
	
	initLangMenu();

}										 


/**
 * Init the dataVallydette object and download the selected checklist json file
 */
function createObjectAndRunVallydette() {
		
		
		if (checklistVallydette[currentCriteriaListName]) {
			initGlobalTemplate(checklistVallydette[currentCriteriaListName].template);
			globalVersion = checklistVallydette[currentCriteriaListName].version;
		} else {
			utils.reqError();
		}
		
		dataVallydette = {
		"checklist": {
			"name": "",
			"referentiel": currentCriteriaListName,
			"version": globalVersion,
			"template": globalTemplate,
			"timestamp": Date.now(),
			"page": [{
					"IDPage": "pageID-0",
					"name": langVallydette.pageName,
					"items": [],
					"autoCheckIDs": []
					}]
			}
		}


		var jsonCriteria;
		jsonCriteria = 'json/' + checklistVallydette[currentCriteriaListName].filename + '-' + globalLang + '.json';

		//init about link href attribute from configuration input
		document.getElementById("link-about").setAttribute('href', checklistVallydette[currentCriteriaListName]["about-" + globalLang]);

		var criteriaRequest = new XMLHttpRequest();
		
		criteriaRequest.open("GET", jsonCriteria, true);
		criteriaRequest.onreadystatechange = function () {
		  if(criteriaRequest.readyState === 4 && criteriaRequest.status === 200) {
			criteriaVallydette = JSON.parse(criteriaRequest.responseText);
		  
			if (currentCriteriaListName==="RGAA") {
				//return reqListener(responseFirst, responseSecond, referentiel);
			} else {
				return importCriteriaToVallydetteObj(criteriaVallydette);
			}
		  } else if (criteriaRequest.status === 404) {
				utils.reqError();
			
			}
		};
		
		criteriaRequest.send();

}

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

/**
 *  init the anchor menu
 */
 function initAnchorMenu() {
	let AnchorMenuHTML='';

	

	 let allThematiques=[];
	 document.querySelectorAll("h2.sticky-top").forEach( h2Them =>{
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
 *  init the homepage
 */
function initHomePage() {
	
	localizeHTML();
	
	utils.setPageTitle(langVallydette.homepage);
		
	document.getElementById("main").innerHTML = "";
	
	var htmlHomePage = "";
	
	htmlHomePage += '<div class="container">';
	htmlHomePage += '<h1 class="display-2">' + langVallydette.va11ydetteOrange +  '</h1>';
	htmlHomePage += '<p>' + langVallydette.homepageDescription +  '</p>';
	
	htmlHomePage += '<div class="row mb-5">';
	
	Object.keys(checklistVallydette).forEach(function(c){
		
		htmlHomePage += '<div class="col-sm-6 col-md-4 col-xl-3 mb-3">';
		htmlHomePage += '<div class="card h-100 border-0">';
		htmlHomePage += '<div class="card-body">';
        htmlHomePage += '  <h2 class="card-title bg-transparent">' + checklistVallydette[c]['name-' + globalLang] + '</h2>';
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

function initAuditPage() {
	
	document.getElementById("main").innerHTML = "";
	
	var htmlAuditPage = '';
	htmlAuditPage = `
	<div class="container d-flex flex-column d-sm-flex flex-sm-row align-items-center mb-3" id="auditInfoManager">
                <h1 id="checklistName" class="mb-0"></h1>
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
                    `+htmlIcon.syncronise+`
                </button>
                <button class="btn btn-secondary ms-2 d-print-none" type="button"
                        id="btnShowResult">
                </button>
              
            </div>

            <div class="o-nav-local bg-white navbar-light my-3 d-print-none" id="pageManager"></div>

            <div class="container">
                <div class="row align-items-start position-relative">
                    <div class="col-md-2 sticky-md-top pt-4 pe-0 col-print-12" id="currentPageManager">
                        <h1 id="pageName" class="mb-0"></h1>
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
							<div class="border-top border-light my-3 w-100"></div>
                        </div>
						<div id="anchornav">
							<h2 id="title-nav-anchor" class="d-block my-2 pb-2 border-bottom border-light border-1"></h2>
							<nav id="tableOfContents" aria-labelledby="title-nav-anchor">	
							</nav>
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
 *  update the dataVallydette object with the selected checklist object
 */
function importCriteriaToVallydetteObj (criteriaVallydette) {
 
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
 *  update the dataVallydette object with the selected checklist object.
	Run some specific processing to fit the rgaa object to the vallydette object.
 */
function importRGAA(dataRGAA) {
    dataVallydette.checklist.name = "Audit RGAA 4";
    dataVallydette.checklist.referentiel = "RGAA";

    dataRGAA.topics.forEach(function (topics) {
        topics.criteria.forEach(function (criteria) {
            for (let test of Object.keys(criteria.criterium.tests)) {
                var testContent = criteria.criterium.tests[test];

                let vallydetteTest = {};


                vallydetteTest.ID = "testID-" + topics.number + "-" + criteria.criterium.number + "-" + test;
                vallydetteTest.resultatTest = "";


                vallydetteTest.themes = topics.topic;
                vallydetteTest.criterium = criteria.criterium.title;

                if (Array.isArray(criteria.criterium.tests[test])) {
                    vallydetteTest.title = criteria.criterium.tests[test][0];
                    vallydetteTest.verifier = [];

                    for (let verify in criteria.criterium.tests[test]) {

                        if (verify != 0) {
                            vallydetteTest.verifier.push(criteria.criterium.tests[test][verify]);
                        }
                    }
                } else {
                    vallydetteTest.title = criteria.criterium.tests[test];
                }

                vallydetteTest.technicalNote = [];
                for (let note in criteria.criterium.technicalNote) {
                    vallydetteTest.technicalNote.push(criteria.criterium.technicalNote[note]);
                }

                vallydetteTest.wcag = [];
                for (let rules in criteria.criterium.references[0].wcag) {
                    vallydetteTest.wcag.push(criteria.criterium.references[0].wcag[rules]);
                }

                dataVallydette.checklist.page[0].items.push(vallydetteTest);
            }
        });
    });

    runVallydetteApp();
}

/**
 *  Init the global template var. Currently 2 diffrents templates are available : "wcag" for wcag conformity checklist, and "audit" for evaluation audit checklist.
 * 	The frontEnd view depend on wich template is called.
 *	@param {string} templateValue - Selected checklist json file name.
 */
function initGlobalTemplate (templateValue) {
	
	if(templateValue) {
		globalTemplate = templateValue;
	} else {
		globalTemplate = "wcag";
	}
	
}

/**
 *  Once the vallydette object is ready, the vallydette app can be run :
	Initialization of some string var and run multiple init functions.
 */
function runVallydetteApp() {
  
	currentPage = 0;
	
	/** @todo to be replaced by a localization object */
	textContent = {
        title1: "Proc??dures",
		title2: "?? v??rifier",
		title3: "R??sultats",
		title4: "Justification",
		statut1: "conforme",
		statut2: "non-conforme",
		statut3: "non-applicable",
		statut4: "non-test??"
     };

	
	arrayFilterNameAndValue = [[langVallydette.template.status1, "ok"], [langVallydette.template.status2, "ko"], [langVallydette.template.status3, "na"], [langVallydette.template.status4, "nt"]];
	
	if (globalTemplate==="audit") {
		arrayProfileNameAndValue = uniqueEntry(dataVallydette.checklist.page[0].items,"profils");
		arrayTypeNameAndValue = uniqueEntry(dataVallydette.checklist.page[0].items, "type");
	}

	
	var HeadingChecklistName = document.getElementById("checklistName");
	HeadingChecklistName.innerText = dataVallydette.checklist.name;
	
	initComputation();
    initPagination(dataVallydette.checklist);
	initFilters();
  
	
    updateCounter(false, dataVallydette.checklist.page[currentPage].items.length);
	utils.setPageTitle( dataVallydette.checklist.page[currentPage].name);
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
 *  LocalStorage
 */

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
 *  Initialization of events for name audit button, and local Storage button.
 */

function AuditEventHandler(){
	var btnChecklist = document.getElementById("btnChecklistName");

	/*var myModalEl = document.getElementById('modalEdit')
		myModalEl.addEventListener('show.bs.modal', function (event) {
			setValue(btnChecklist.dataset.element, btnChecklist.dataset.property);
  // do something...
	})*/


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
 *  Run the HTML marker for the tests list.
  * @param {object} currentRefTests - Dynamic version of the vallydette object. Which means that it can be dynamically updated by the filters options.
 */
runTestListMarkup = function (currentRefTests) {

	//let htmlMainContent = document.getElementById('mainContent');
	let htmlrefTests = '';
	let headingTheme = '';
	let headingCriterium = '';
	let nextIndex = 1;

	if (document.getElementById('btnExcelExport') === null) {
		
			var btnExcelExport = utils.addElement('button', 'btnExcelExport', langVallydette.title.btnExcelExport, htmlIcon.excel, true, ["btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none"], langVallydette.title.btnExcelExport);
		
			let auditInfoNode = document.getElementById("auditInfoManager");
			auditInfoNode.insertBefore(btnExcelExport, auditInfoNode.children[3]);
			btnExcelExport.addEventListener('click', function () {
				excelExport(globalTemplate);
			});
			
	}

	/** 'wcag' value correspond to the conformity checklist */
	if (globalTemplate === 'wcag') {

		setPageName(dataVallydette.checklist.page[currentPage].name);
		
		/** Modify column number */ 
		utils.columnDisplay(3);
	
		if(document.getElementById('btnShowStatement') === null) {
			var btnStatement = utils.addElement('button', 'btnShowStatement', langVallydette.statement, false, false, ["btn", "btn-secondary", "ms-2", "d-print-none"], langVallydette.statementTitle);
			document.getElementById("auditInfoManager").appendChild(btnStatement);
			document.getElementById("btnShowStatement").addEventListener('click',  function () {initStatementObject(); initAnchorMenu();});
		}
		
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
				htmlrefTests += '<h2 class="sticky-top d-flex bg-white pt-4 pb-3 border-bottom" id="test-' + formattedHeadingTheme + '">' + currentRefTests[i].themes + '<button class="btn btn-secondary btn-icon ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + formattedHeadingTheme + '" aria-expanded="true" aria-controls="collapse-' + formattedHeadingTheme + '" aria-label="' + langVallydette.expanded + '">'+htmlIcon.arrowDown+'</span></button></h2>';
				htmlrefTests += '<div class="collapse show px-2" id="collapse-' + formattedHeadingTheme + '">';
			}

			htmlrefTests += '<article class="card mb-3" id="' + currentTest + '"><div class="card-header border-light"><h3 class="card-title h5 d-flex align-items-center mb-0" id="heading' + currentTest + '" style="scroll-margin-top: 10.35em;"><span class="w-75 me-auto">' + currentRefTests[i].title + ' <a class="header-anchor"  href="#heading' + currentTest + '" aria-label="' + langVallydette.anchorLink + '">#</a></span>' + ((getIfAutoCheck(currentRefTests[i].IDorigin,currentPage-1)) ? '<span class="icon icon-Link ms-1 badge bg-warning" id="link-' + currentRefTests[i].ID + '" title="' + ((0 == currentPage)? langVallydette.autocheckTxt3 : langVallydette.autocheckTxt1) + '" >'+ htmlIcon.link+'<span class="visually-hidden">' + ((0 == currentPage)? langVallydette.autocheckTxt3 : langVallydette.autocheckTxt1) + '</span></span>' : '') + '<span id="resultID-' + currentTest + '" class="ms-1 badge ' + getStatutClass(currentRefTests[i].resultatTest) + '">' + setStatutText(currentRefTests[i].resultatTest) + '</span></h3></div>';
			
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
			htmlrefTests += '<button class="btn btn-secondary btn-icon d-print-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + currentTest + '" aria-expanded="false" aria-controls="collapse-' + currentTest + '">'+htmlIcon.arrowDown+'<span class="visually-hidden">' + langVallydette.informations + '</span></button></div>';
			
			htmlrefTests +='<div id="alert-' + currentTest + '" class="alert alert-danger d-none" role="alert"><span class="alert-icon"></span><p></p></div>';
			
			htmlrefTests += '<div class="collapse ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + ' border-light pt-3 mx-3 d-print-block" id="collapse-' + currentTest + '">';

			
			htmlrefTests += '<div class="form-check">';
			htmlrefTests += '	<input type="checkbox" class="form-check-input" id="autoCheck-' + currentTest + '" aria-labelledby="heading' + currentTest + ' autoCheckLabel-' + currentTest + '" ' + ((getIfAutoCheck(currentRefTests[i].IDorigin,currentPage)) ? "checked" : "" )  + '>';
			htmlrefTests += '	<label class="form-check-label" for="autoCheck-' + currentTest + '" id="autoCheckLabel-' + currentTest + '">' + langVallydette.autocheckTxt2 + '</label>';
			htmlrefTests += '</div>';

			htmlrefTests += '<div class="border-top border-light my-3 w-100"></div>';
			
			if (currentRefTests[i].verifier) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.toCheckHeading + '</h4>';
				htmlrefTests += currentRefTests[i].verifier;
			}
			
			if (currentRefTests[i].complement) {
				htmlrefTests += currentRefTests[i].complement;
			}

			if (currentRefTests[i].exception) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.exceptionHeading + '</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p>';
			}
			
			if (currentRefTests[i].moreInfo) {
				htmlrefTests += '<a href="' + currentRefTests[i].moreInfo + '" id="mi-' + currentTest + '" aria-labelledby="heading' + currentTest + ' mi-' + currentTest + '" class="btn btn-secondary btn-sm" title="' + langVallydette.moreInfo + ' (' + langVallydette.newWindow +')" target="_blank">' + langVallydette.moreInfo + '</a>';
			}
			
			htmlrefTests += '<div class="py-2 ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + 'border-light"><p class="text-muted mb-0"><abbr title="Web Content Accessibility Guidelines" aria-label="Web Content Accessibility Guidelines" lang="en">WCAG</abbr>&nbsp;:&nbsp;';
			for (let j in currentRefTests[i].wcag) {
				htmlrefTests += currentRefTests[i].wcag[j];
				j != ((currentRefTests[i].wcag).length - 1) ? htmlrefTests += ',  ' : '';
			}
			htmlrefTests += ' / Identifiant : ' + currentTest;
			htmlrefTests += '</p></div></div>';

			htmlrefTests += '</article>';
		}
	 /** 'audit' value correspond to the conformity checklist */
	} else if (globalTemplate === 'audit') {
		
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
				htmlrefTests += '<h2 class="sticky-top d-flex bg-white pt-4 pb-3 border-bottom" id="test-' + formattedHeadingTheme + '">' + currentRefTests[i].themes + '<button class="btn btn-secondary btn-icon ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + formattedHeadingTheme + '" aria-expanded="true" aria-controls="collapse-' + formattedHeadingTheme + '" aria-label="' + langVallydette.expanded + '">'+htmlIcon.arrowDown+'</button></h2>';
				htmlrefTests += '<div class="collapse show px-2" id="collapse-' + formattedHeadingTheme + '">';
			}

			htmlrefTests += '<article class="card mb-3" id="' + currentTest + '"><div class="card-header border-light"><h3 class="card-title h5 d-flex align-items-center mb-0" id="heading' + currentTest + '" style="scroll-margin-top: 10.35em;"><span class="w-75">' + currentRefTests[i].title + ' <a class="header-anchor"  href="#heading' + currentTest + '" aria-label="' + langVallydette.anchorLink + '">#</a></span>'
			
			hasGoodPractice = false;
			if ((currentRefTests[i].wcag === undefined || currentRefTests[i].wcag[0] === "")) {
				hasGoodPractice = true;
				htmlrefTests += '<span class="ms-auto me-1 badge bg-warning">'+langVallydette.goodPractice+'</span>';
			}
			
			if (currentRefTests[i].wcag) {
				hasAAA = false;
				currentRefTests[i].wcag.forEach(function (currentWcag) {
					
					if(getAAA(currentWcag)) {
						hasAAA = true;
						htmlrefTests += '<span class="ms-auto me-1 badge bg-warning">AAA</span>';
					}
					
				});
			}
			
			htmlrefTests += '<span id="resultID-' + currentTest + '" class="' + ((!hasAAA && !hasGoodPractice) ? 'ms-auto ' : '') + 'badge ' + getStatutClass(currentRefTests[i].resultatTest) + '">' + setStatutText(currentRefTests[i].resultatTest) + '</span></h3></div>';
			
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
				
			htmlrefTests += '<button class="btn btn-secondary btn-icon d-print-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + currentTest + '" aria-expanded="false" aria-controls="collapse-' + currentTest + '">'+htmlIcon.arrowDown+'<span class="visually-hidden">' + langVallydette.informations + '</span></button></div>';
			
			htmlrefTests +='<div id="alert-' + currentTest + '" class="alert alert-danger d-none" role="alert"><span class="alert-icon"></span><p></p></div>';

			htmlrefTests += '<div class="collapse ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + ' border-light pt-3 mx-3 d-print-block" id="collapse-' + currentTest + '">';

			if (currentRefTests[i].tests) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.processHeading + '</h4>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].tests);
			}
			
			if (currentRefTests[i].verifier) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.toCheckHeading + '</h4>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].verifier);
			}
			
			if (currentRefTests[i].resultat) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.resultHeading + '</h4>';
				htmlrefTests += utils.listOrParagraph(currentRefTests[i].resultat);
			}
			
			if (currentRefTests[i].exception) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.exceptionHeading + '</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p>';
			}
			
			if (currentRefTests[i].raccourcis) {
				htmlrefTests += '<h4 class="h5">' + langVallydette.informations + '</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].raccourcis+ '</p>';
			}

			if (currentRefTests[i].moreInfo) {
				htmlrefTests += '<a href="' + currentRefTests[i].moreInfo + '" id="mi-' + currentTest + '" aria-labelledby="heading' + currentTest + ' mi-' + currentTest + '" class="btn btn-secondary btn-sm" title="' + langVallydette.moreInfo + ' (' + langVallydette.newWindow +')" target="_blank">' + langVallydette.moreInfo + '</a>';
			}
			
			htmlrefTests += '<div class="py-2 ' + ((currentRefTests[i].verifier || currentRefTests[i].exception) ? 'border-top' : '' ) + 'border-light"><p class="text-muted mb-0"><abbr title="Web Content Accessibility Guidelines" aria-label="Web Content Accessibility Guidelines" lang="en">WCAG</abbr>&nbsp;:&nbsp;';
			for (let j in currentRefTests[i].wcag) {
				htmlrefTests += currentRefTests[i].wcag[j];
				j != ((currentRefTests[i].wcag).length - 1) ? htmlrefTests += ',  ' : '';
			}
			htmlrefTests += ' / Identifiant : ' + currentTest;
			htmlrefTests += '</p></div></div>';

			htmlrefTests += '</article>';
			

		}
	
	/** 'rgaa' value correspond to the RGGA4 checklist */
	} else if (currentCriteriaListName === 'RGAA') {
		/** marked library is used to render md from RGAA json */
		const renderer = new marked.Renderer();
		marked.setOptions({
			renderer: renderer
		});

		/** Override function link(string href, string title, string text) */
		renderer.link = function (href, title, text) {
			return text;
		};
		renderer.paragraph = function (text) {
			return text;
		};
		/** end of marked configuration */

		/** pass through the tests object to display each of them */
		for (let i in currentRefTests) {
			if (headingTheme != currentRefTests[i].themes) {
				headingTheme = currentRefTests[i].themes;
				htmlrefTests += '<h2 id="test-' + utils.formatHeading(currentRefTests[i].themes) + '">' + currentRefTests[i].themes + '</h2>';
			}

			if (headingCriterium != currentRefTests[i].criterium) {
				headingCriterium = currentRefTests[i].criterium;

				htmlrefTests += '<article class="" id="' + currentRefTests[i].ID + '"><div class="card-header" id="heading' + i + '"><h3 class="card-title"><a class="" role="button" data-bs-toggle="collapse" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '"><span class="accordion-title">' + currentRefTests[i].title + '</span><span id="resultID-' + currentRefTests[i].ID + '" class="badge bg-pill ' + getStatutClass(currentRefTests[i].resultatTest) + ' float-lg-start">' + setStatutText(currentRefTests[i].resultatTest) + '</span></a></h3>';
			
				if (currentRefTests[i].resultatTest === "") {
					currentRefTests[i].resultatTest = "nt";
					dataVallydette.checklist.items[i].resultatTest = "nt";
				}

				htmlrefTests += '<div class="testForm"><label for="conforme' + i + '">Conforme</label><input type="radio" id="conforme' + i + '" name="test' + i + '" value="ok" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[0][1]) ? "checked" : "") + '/> <label for="non-conforme' + i + '">Non conforme</label><input type="radio" id="non-conforme' + i + '" name="test' + i + '" id="radio' + i + '" value="ko" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[1][1]) ? "checked" : "") + '/>  <label for="na' + i + '">N/A</label><input type="radio" id="na' + i + '" name="test' + i + '" value="na" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[2][1]) ? "checked" : "") + '/>  <label for="nt' + i + '">Non test??</label><input type="radio" id="nt' + i + '" name="test' + i + '" value="nt" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[3][1]) ? "checked" : "") + '/>';
				htmlrefTests += '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">';
				htmlrefTests += '<div class="card-block"><div class="row">';
				htmlrefTests += '<div class="col-lg-6"><h4>' + textContent.title1 + '</h4><ol>';
				for (let j in currentRefTests[i].tests) {
					htmlrefTests += '<li>' + currentRefTests[i].tests[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '<div class="col-lg-6"><h4>' + textContent.title2 + '</h4><ol>';
				for (let j in currentRefTests[i].verifier) {
					htmlrefTests += '<li>' + currentRefTests[i].verifier[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '</div>';
				htmlrefTests += '<div class="row">';
				htmlrefTests += '<div class="col-lg-12"><h4>' + ((currentRefTests[i].profils[0] === 'Concepteur') ? textContent.title4 : textContent.title3) + '</h4><ol>';
				for (let j in currentRefTests[i].resultat) {
					htmlrefTests += '<li>' + currentRefTests[i].resultat[j] + '</li> ';
				}
				htmlrefTests += '</ol></div>';
				htmlrefTests += '</div>';
				if (currentRefTests[i].exception) {
					htmlrefTests += '<div class="row"><div class="col-lg-12" ><h4>Exceptions</h4>';
					htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';

					htmlrefTests += '<div class="card-header"><h3><a class="collapsed" role="button" data-bs-toggle="collapse" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '">' + marked(currentRefTests[i].criterium) + '</a></h3></div>';
					htmlrefTests += '<div id="collapse' + i + '" class="collapse">';
				}

				htmlrefTests += '<article class="mb-1" id="' + currentRefTests[i].ID + '"><div class="card-header" id="heading' + i + '"><span class="accordion-title">' + marked(currentRefTests[i].title) + '</span><span id="resultID-' + currentRefTests[i].ID + '" class="badge bg-pill ' + getStatutClass(currentRefTests[i].resultatTest) + ' float-lg-start">' + setStatutText(currentRefTests[i].resultatTest) + '</span>';

				htmlrefTests += '<div class="testForm"><label for="conforme' + i + '">Conforme</label><input type="radio" id="conforme' + i + '" name="test' + i + '" value="ok" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[0][1]) ? "checked" : "") + '/> <label for="non-conforme' + i + '">Non conforme</label><input type="radio" id="non-conforme' + i + '" name="test' + i + '" id="radio' + i + '" value="ko" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[1][1]) ? "checked" : "") + '/>  <label for="na' + i + '">N/A</label><input type="radio" id="na' + i + '" name="test' + i + '" value="na" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[2][1]) ? "checked" : "") + '/>  <label for="nt' + i + '">Non test??</label><input type="radio" id="nt' + i + '" name="test' + i + '" value="nt" ' + (((currentRefTests[i].resultatTest === arrayFilterNameAndValue[3][1]) || (currentRefTests[i].resultatTest === '')) ? "checked" : "") + '/>';

				htmlrefTests += '</div></article>';

				if ((currentRefTests[nextIndex] != undefined) && (headingCriterium != currentRefTests[nextIndex].criterium)) {
					htmlrefTests += '</div>';
				}

				nextIndex = nextIndex + 1;
			}
		}
	} else {
		/** 
			*	default template, was used with the vallydette first version.
			*	@todo Need to be uptaded or removed.
		*/
		for (let i in currentRefTests) {
			if (headingTheme != currentRefTests[i].themes) {
				headingTheme = currentRefTests[i].themes;
				htmlrefTests += '<h2 id="test-' + utils.formatHeading(currentRefTests[i].themes) + '">' + currentRefTests[i].themes + '</h2>';
			}
			htmlrefTests += '<article class="" id="' + currentRefTests[i].ID + '"><div class="card-header" id="heading' + i + '"><h3 class="card-title"><a class="" role="button" data-bs-toggle="collapse" href="#collapse' + i + '" aria-expanded="false" aria-controls="collapse' + i + '"><span class="accordion-title">' + currentRefTests[i].title + '</span><span id="resultID-' + currentRefTests[i].ID + '" class="badge bg-pill ' + getStatutClass(currentRefTests[i].resultatTest) + ' float-lg-start">' + setStatutText(currentRefTests[i].resultatTest) + '</span></a></h3>';

			htmlrefTests += '<div class="testForm"><label for="conforme' + i + '">Conforme</label><input type="radio" id="conforme' + i + '" name="test' + i + '" value="ok" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[0][1]) ? "checked" : "") + '/> <label for="non-conforme' + i + '">Non conforme</label><input type="radio" id="non-conforme' + i + '" name="test' + i + '" id="radio' + i + '" value="ko" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[1][1]) ? "checked" : "") + '/>  <label for="na' + i + '">N/A</label><input type="radio" id="na' + i + '" name="test' + i + '" value="na" ' + ((currentRefTests[i].resultatTest === arrayFilterNameAndValue[2][1]) ? "checked" : "") + '/>  <label for="nt' + i + '">Non test??</label><input type="radio" id="nt' + i + '" name="test' + i + '" value="nt" ' + (((currentRefTests[i].resultatTest === arrayFilterNameAndValue[3][1]) || (currentRefTests[i].resultatTest === '')) ? "checked" : "") + '/>';
			htmlrefTests += '<div id="collapse' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + i + '">';
			htmlrefTests += '<div class="card-block"><div class="row">';
			htmlrefTests += '<div class="col-lg-6"><h4>' + textContent.title1 + '</h4><ol>';
			for (let j in currentRefTests[i].tests) {
				htmlrefTests += '<li>' + currentRefTests[i].tests[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '<div class="col-lg-6"><h4>' + textContent.title2 + '</h4><ol>';
			for (let j in currentRefTests[i].verifier) {
				htmlrefTests += '<li>' + currentRefTests[i].verifier[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			htmlrefTests += '<div class="row">';
			htmlrefTests += '<div class="col-lg-12"><h4>' + ((currentRefTests[i].profils[0] === 'Concepteur') ? textContent.title4 : textContent.title3) + '</h4><ol>';
			for (let j in currentRefTests[i].resultat) {
				htmlrefTests += '<li>' + currentRefTests[i].resultat[j] + '</li> ';
			}
			htmlrefTests += '</ol></div>';
			htmlrefTests += '</div>';
			if (currentRefTests[i].exception) {
				htmlrefTests += '<div class="row"><div class="col-lg-12" ><h4>Exceptions</h4>';
				htmlrefTests += '<p>' + currentRefTests[i].exception + '</p> ';
				htmlrefTests += '</div>';
				htmlrefTests += '</div>';
			}
			htmlrefTests += '</div><div class="card-footer text-muted"><b>Profils : </b>';
			for (let j in currentRefTests[i].profils) {
				htmlrefTests += currentRefTests[i].profils[j];
				j != ((currentRefTests[i].profils).length - 1) ? htmlrefTests += ',  ' : '';
			}
			htmlrefTests += '<br />' + ((currentRefTests[i].type).length > 0 ? '<b>Outils : </b>' : '');
			for (let j in currentRefTests[i].type) {
				htmlrefTests += '<i class="fa fa-tag" aria-hidden="true"></i> ' + currentRefTests[i].type[j] + ' ';
			}
			htmlrefTests += '</div>';
			htmlrefTests += '</div></article>';
		}
	}

	currentRefTests.length === 0 ? htmlMainContent.innerHTML = '<div class="alert alert-warning">' + langVallydette.warningNoResult + '</div>' : htmlMainContent.innerHTML = htmlrefTests;

	/** event handler */
	for (let i in currentRefTests) {
	
		var radios = document.getElementsByName("test-" + currentRefTests[i].ID);
		var nodeArray = [];
		for (var j = 0; j < radios.length; ++j) {
			radios[j].addEventListener('click', function () {
				setStatusAndResults(this, currentRefTests[i].ID, currentRefTests[i].IDorigin);
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
 * Auto Check manager
 */

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
		
		const iconHtml = '<span class="icon icon-Link ms-1 badge bg-warning" id="link-' + testID + '" title="' + langVallydette.autocheckTxt3 + '">'+htmlIcon.link+'<span class="visually-hidden">' + langVallydette.autocheckTxt3 + '</span>';
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

function getTestResult(pageId, testIDorigin) {
	
	const result = dataVallydette.checklist.page[pageId].items.filter(item => item.IDorigin === testIDorigin).map(item => item.resultatTest);
	return result[0];

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
 * Localisation
 */

/**
 * Update global var globalLang width the selected languages.
 * Language ca be defined by a function parameter, or by a get parameter.
 * @param {string} lang - Language can be defined in function params.
 */
function initGlobalLang(lang, fromImport) {
	
	const paramString = window.location.search;
	const urlParams = new URLSearchParams(paramString);

	if (fromImport) {
		if (lang) {
			globalLang = lang;
		} else {
			globalLang = 'fr';
		}
	} else {
		if (urlParams.has('lang')) {
		globalLang = urlParams.get('lang');
		} else if (lang) {
			globalLang = lang;
		} else {
			globalLang = 'fr';
		}
	}
	
	document.documentElement.setAttribute('lang', globalLang);
	
	var selectFilesLang = document.getElementById("selectFiles");
	selectFilesLang.setAttribute('lang', globalLang);
	
	initLangMenu()

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
 *  Useful for import and localstorage. Will load the interface localisation json depending on new object loaded, and run the vallydette app.
 */
function runLangRequest () {

	var langRequest = new XMLHttpRequest();
				langRequest.open("GET", "json/lang/"+globalLang+".json", true);
				langRequest.onreadystatechange = function () {
				  if(langRequest.readyState === 4 && langRequest.status === 200) {
					langVallydette = JSON.parse(langRequest.responseText);
					localizeHTML();
					runVallydetteApp();
			  } 
			};
	langRequest.send();
	
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
 * Groups manager
 * Actually 'groups' are : captcha, form, multimedia, mobile
 * Each group own multiple tests.
 * If a group is disabled by the user, then all of his tests are passed to N/A.
 */
 
 
 /**
 * Initialization of group markup.
 */
function initGroups() {
	
	if (Object.keys(dataVallydette.checklist.page[currentPage].groups).length !== 0) {
		htmlgroups = '';
		htmlgroups = '<h6>' + langVallydette.groupHeading + '</h6>';
		htmlgroups += '<ul class="list-inline m-0">';
		for (var themeItem in dataVallydette.checklist.page[currentPage].groups)  {
			htmlgroups += '<li class="form-check form-check-inline mb-0"><input type="checkbox"  class="form-check-input"  id="' + themeItem + '" value="' + themeItem + '" name="' + themeItem + '" ' + (dataVallydette.checklist.page[currentPage].groups[themeItem].checked ? "checked" : "") + '/><label for="' + themeItem + '" class="form-check-label">' + themeItem + '</label></li>';
		};
		htmlgroups += '</ul>';
		
		htlmgroupsMarker = document.getElementById("themeManager");
		htlmgroupsMarker.innerHTML = htmlgroups;
   	}
}

 /**
	* Get the groups checkboxes value from a page edition form, to determine if a group has been updated or not.
	* If true, then applyGroups is launched.
 */
function getGroups() {
	
	themeIsUpdated = false;
	
	for (var themeItem in dataVallydette.checklist.page[currentPage].groups) {
		
		if (document.getElementById(themeItem).checked !== dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {
			themeIsUpdated = true;
			dataVallydette.checklist.page[currentPage].groups[themeItem].checked = document.getElementById(themeItem).checked;
		
		}
	}
	
	if (themeIsUpdated) {
		applyGroups();
	}
	
}

 /**
	* Update the tests value from current groups selection
 */
function applyGroups() {
	
	var radioToUpdate;
	var testValue;
	
	for (var themeItem in dataVallydette.checklist.page[currentPage].groups) {
		
		dataVallydette.checklist.page[currentPage].groups[themeItem].idTests.map(function(themeIdTest) {
			
			dataVallydette.checklist.page[currentPage].items.map(function(itemTest, index) {
	
				if (themeIdTest === itemTest.IDorigin) {
						
					const radioButtons = document.getElementsByName("test-"+itemTest.ID);
					
					if (dataVallydette.checklist.page[currentPage].items[index].resultatTest === "nt" || dataVallydette.checklist.page[currentPage].items[index].resultatTest === "na") {
					
						if (dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {
			
							testValue = "nt";
							
							radioButtons.forEach(function(button) {
								button.disabled=false;
								button.classList.remove("disabled");
							});
						
						} else {
						
							testValue = "na";
		
							radioButtons.forEach(function(button) {
								button.disabled=true;
								button.classList.add("disabled");
							});
													
						}
							
						 /** testing if not null in case of an activated filter */
						radioToUpdate = document.getElementById(testValue+"-"+itemTest.ID);
					
					
						if (radioToUpdate!==null) {
							radioToUpdate.checked = true;
							setStatusAndResults(radioToUpdate, itemTest.ID, itemTest.IDorigin);
						} else {
							dataVallydette.checklist.page[currentPage].items[index].resultatTest = testValue;
						}
					
					}

				}
			
			}); 	
			
		}); 
		
	}	
	
}


 /**
	* If a theme is unchecked then we applied a disabled style to the entire tests on the frontend component
 */
function applyDisabledGroups() {
		
	for (var themeItem in dataVallydette.checklist.page[currentPage].groups) {
		
		if (!dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {
	
			dataVallydette.checklist.page[currentPage].groups[themeItem].idTests.map(function(themeIdTest) {
			
				dataVallydette.checklist.page[currentPage].items.map(function(itemTest, index) {
					
					if (themeIdTest === itemTest.IDorigin) {
						
						const radioButtons = document.getElementsByName("test-"+itemTest.ID);
						
						if (!dataVallydette.checklist.page[currentPage].groups[themeItem].checked) {

							radioButtons.forEach(function(button) {
								button.disabled=true;
								button.classList.add("disabled");
							});
													
						}
						
						return true;
				
					}
					
					return false;
					
				});
			
			});
									
		}
		
	}
	
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
 * Computation manager
 * Conformity computation functions
*/

/**
 * Computation initialization. The dataWcag object is downloaded.
*/
function initComputation() {

	var matriceRequest = new XMLHttpRequest();
	var matriceWcag;
    method = "GET",
	matriceVallydette = 'json/wcag-' + globalLang+ '.json';

	matriceRequest.open(method, matriceVallydette, true);
	matriceRequest.onreadystatechange = function () {
	  if(matriceRequest.readyState === 4 && matriceRequest.status === 200) {
			dataWCAG = JSON.parse(matriceRequest.responseText);
			
			dataWCAG.items.forEach(initRulesAndTests);

            var btnShowResult = document.getElementById("btnShowResult");
            btnShowResult.addEventListener('click', function () {
				runComputation();
				utils.setPageTitle(langVallydette.auditResult);
				utils.resetActive(document.getElementById("pageManager"));
				utils.putTheFocus(document.getElementById("pageName"));
				initAnchorMenu()
            }, false);
		
	    runTestListMarkup(dataVallydette.checklist.page[currentPage].items);
		if(window.location.hash !== ""){
			document.getElementById(window.location.hash.substring(1)).scrollIntoView();
		}
		

	  }
	};
	matriceRequest.send();
	
}

/**
 * Updates each wcag with necessary tests from the checklist
 * @param {object} rules - object that contains all the wcags
*/
function initRulesAndTests (rules) {
	
	 for (let i in dataVallydette.checklist.page[0].items) {
		 for (let j in dataVallydette.checklist.page[0].items[i].wcag) {
			
			var testWCAG = dataVallydette.checklist.page[0].items[i].wcag[j].split(" ");
			if (testWCAG[0] === rules.wcag) {
				
				rules.tests.push(dataVallydette.checklist.page[0].items[i].IDorigin);
				rules.resultat = "nt";
			}
			
		}
	
	}
	
}

/**
 * Pass through both dataVallydette et dataWCAG to build the pageResults array, which contains the wcag results for each pages.
 * @param {boolean} obj - if true, function returns only the full pagesResults object (with test title) whitout running the final computation
 * @return {array} pagesResults - Contains all wcag results by pages.
*/
function runComputation(obj) {

	/**
	* @param {array} pagesResults - Contains all wcag results by pages.
	*/
    pagesResults = [];
	
	/**
	* Initilization of the dataWCAG results, to be sure that the results are correctly re-computed each time the audit results are displayed.
	*/
	dataWCAG.items.forEach(initProperties);
	
    for (let i in dataVallydette.checklist.page) {
        pagesResults[i] = [];
        pagesResults[i].items = [];
        pagesResults[i].name = dataVallydette.checklist.page[i].name;
		pagesResults[i].url = dataVallydette.checklist.page[i].url;
		
        for (let k in dataWCAG.items) {

				pagesResults[i].items[k] = {};
				pagesResults[i].items[k].wcag = dataWCAG.items[k].wcag;
				pagesResults[i].items[k].level = dataWCAG.items[k].level;
			   
				if (dataWCAG.items[k].tests.length > 0) {
					pagesResults[i].items[k].resultat = "nt";
				} else {
					pagesResults[i].items[k].resultat = "na";
				}
				
				pagesResults[i].items[k].complete = true;
				pagesResults[i].items[k].test = [];
				pagesResults[i].items[k].name = dataWCAG.items[k].name;
				
				/**
				* Pass through each test of a wcag.
				*/
				for (let l in dataWCAG.items[k].tests) {
					/**
					* Gets each test value, and updates the current wcag rules, basing on computation rules.
					*/

					for (let j in dataVallydette.checklist.page[i].items) {
						
						if (dataWCAG.items[k].tests[l] === dataVallydette.checklist.page[i].items[j].IDorigin) {
							
							testObj = {};
							testObj.title = dataVallydette.checklist.page[i].items[j].title;
							testObj.result = dataVallydette.checklist.page[i].items[j].resultatTest;
							pagesResults[i].items[k].test.push(testObj);
							
							if (dataVallydette.checklist.page[i].items[j].resultatTest === "nt") {
								pagesResults[i].items[k].complete = false;
							}

							if (dataVallydette.checklist.page[i].items[j].resultatTest === "ko") {

								dataWCAG.items[k].resultat = false;
								if(dataVallydette.checklist.page[i].items[j].issues.length >0){
									dataVallydette.checklist.page[i].items[j].issues.forEach(issue => {
										dataWCAG.items[k].comment.push(issue.issueTitle);
										dataWCAG.items[k].page.push(pagesResults[i].name);
									});
								}
							 }

							if (pagesResults[i].items[k].resultat) {
								
								if (dataVallydette.checklist.page[i].items[j].resultatTest === "ok") {
									pagesResults[i].items[k].resultat = true;
									
									if (dataWCAG.items[k].resultat !== false) {

										dataWCAG.items[k].resultat = true;
									}
									
									break;	
									
								} else if (dataVallydette.checklist.page[i].items[j].resultatTest === "ko") {
									pagesResults[i].items[k].resultat = false;
									break;	
									
									
								} else if ((dataVallydette.checklist.page[i].items[j].resultatTest === "na") && (pagesResults[i].items[k].resultat === "nt")) {
									pagesResults[i].items[k].resultat = "na";
									
									if (dataWCAG.items[k].resultat !== false && dataWCAG.items[k].resultat !== true ) {
										dataWCAG.items[k].resultat = "na";
									}
									
									break;	
								} 

							}	
						}
					}

					//if (pagesResults[i].items[k].complete === false) {
						// pagesResults[i].items[k].resultat = "nt";
					//}
				}
			
        }
    }
	
	pagesResults = pagesResultsComputation(pagesResults);
	dataWCAGComputation();

	
	
	if (obj) {
		return pagesResults;
	} else {		
		return runFinalComputation(pagesResults);
	}

}


/**
 * Run all the computation per pages, from the results collected into pagesResults array
 * @param {array} pagesResultsArray - Contains all wcag results by pages.
 * @return {array} pagesResultsArray - Contains all wcag results by pages, and the diffrents results
*/
function pagesResultsComputation(pagesResultsArray) {
	var finalTotal = 0;
    var finalResult = 0;
    var nbPage = 0;
	
	for (let i in pagesResultsArray) {
        var nbTrue = 0;
        var nbFalse = 0;
        var nbNA = 0;
        var nbTotal = 0;
		var nbTrueA = 0;
		var nbFalseA = 0;
		var nbNaA = 0;
		var nbTrueAA = 0;
		var nbFalseAA = 0;
		var nbNaAA = 0;
		var nbTotalA = 0;
		var nbTotalAA = 0;


		/**
		 * 	Deletes the AAA wcag rules. Computation is made only on A and AA level rules.
		*/
		var indexItem = 0;
		for (let j in pagesResultsArray[i].items) {
			if (pagesResultsArray[i].items[indexItem].level === 'AAA') {
				pagesResultsArray[i].items.splice(indexItem,1);
			} else {
				indexItem = indexItem+1;
			}
		}

		/**
		 * 	Gets the number of true, false, non-applicable and non-tested by wcag level and by pages.
		 *  If one result is non-tested, then the property 'complete' is passed false, and the final result is not displayed (only the number of non-tested items).
		*/
		for (let j in pagesResultsArray[i].items) {

			if (pagesResultsArray[i].items[j].resultat === true) {
				nbTrue++;
				nbTotal++;

				pagesResultsArray[i].items[j].level === 'A' ? nbTrueA++ : nbTrueAA++;
				pagesResultsArray[i].items[j].level === 'A' ? nbTotalA++ : nbTotalAA++;
			} else if (pagesResultsArray[i].items[j].resultat === false) {
				nbFalse++;
				nbTotal++;

				pagesResultsArray[i].items[j].level === 'A' ? nbFalseA++ : nbFalseAA++;
				pagesResultsArray[i].items[j].level === 'A' ? nbTotalA++ : nbTotalAA++;
			} else if (pagesResultsArray[i].items[j].resultat === 'na') {
				nbNA++;

				pagesResultsArray[i].items[j].level === 'A' ? nbNaA++ :nbNaAA++;
				pagesResultsArray[i].items[j].level === 'A' ? nbTotalA++ : nbTotalAA++;
			} else if (pagesResultsArray[i].items[j].resultat === 'nt') {
				pagesResultsArray[i].complete = false;
			}
		}

		/**
		 * 	If all the tests of a page are non-applicables (hypothetical but tested)
		*/  
		if (nbTotal===0 && nbNA>0) {
			pagesResultsArray[i].result = "NA";
		} else {
			pagesResultsArray[i].result = Math.round((nbTrue / nbTotal) * 100);
		}


		/** Adds the result to the pages result array. */  
		pagesResultsArray[i].conformeA = nbTrueA;
		pagesResultsArray[i].conformeAA = nbTrueAA;
		pagesResultsArray[i].nonconformeA = nbFalseA;
		pagesResultsArray[i].nonconformeAA = nbFalseAA;
		pagesResultsArray[i].naA = nbNaA;
		pagesResultsArray[i].naAA = nbNaAA;
		pagesResultsArray[i].totalconforme = nbTrueA + nbTrueAA;
		pagesResultsArray[i].totalnonconforme = nbFalseA + nbFalseAA;
	}

	/** Final global pages result computation. */  
    for (let i in pagesResultsArray) {
        if (pagesResultsArray[i].result != "NA") {
            finalTotal = finalTotal + pagesResultsArray[i].result;
            nbPage = nbPage + 1;
        }
    }
	
	/** Final conformity rate. */ 
    finalResult = Math.round((finalTotal / nbPage));
	dataWCAG.globalPagesResult = finalResult;
	
	return pagesResultsArray;
}


/**
	*  Get the number of true, false, non-applicable and non-tested by wcag level only.
	*  If one result is non-tested, then the property 'complete' is passed false, and the final result is not displayed (only the number of non-tested items).
*/
function dataWCAGComputation() {
	

	dataWCAG.complete = true;

	/**
	 * 	Deletes the AAA wcag rules. Computation is made only on A and AA level rules.
	*/
	
		for (let i in dataWCAG.items) {
			if (dataWCAG.items[i].resultat === 'AAA' && dataWCAG.items[i].resultat === 'nt') {
				dataWCAG.complete = false;
			}
		}
		
		/** Adds the results to the WCAG object. */  
		dataWCAG.conformeA = dataWCAG.items.filter(item => item.level ==="A" && item.resultat === true).length;
		dataWCAG.conformeAA = dataWCAG.items.filter(item => item.level ==="AA" && item.resultat === true).length;
		dataWCAG.nonconformeA = dataWCAG.items.filter(item => item.level ==="A" && item.resultat === false).length;
		dataWCAG.nonconformeAA = dataWCAG.items.filter(item => item.level ==="AA" && item.resultat === false).length;
		dataWCAG.naA = dataWCAG.items.filter(item => item.level ==="A" && item.resultat === "na").length;
		dataWCAG.naAA = dataWCAG.items.filter(item => item.level ==="AA" && item.resultat === "na").length;
		dataWCAG.totalconforme = dataWCAG.conformeA + dataWCAG.conformeAA;
		dataWCAG.totalnonconforme = dataWCAG.nonconformeA + dataWCAG.nonconformeAA;

		dataWCAG.totalA = dataWCAG.items.filter(function(item){return item.level==="A"}).length;
		dataWCAG.totalAA = dataWCAG.items.filter(function(item){return item.level==="AA"}).length;
	
		dataWCAG.nbTotalWcag = dataWCAG.items.filter(item => item.resultat === true || item.resultat === false).length;
		dataWCAG.nbTrueWcag = dataWCAG.items.filter(item => item.resultat === true).length;
		dataWCAG.nbFalseWcag = dataWCAG.items.filter(item => item.resultat === false).length;
		dataWCAG.nbNaWcag = dataWCAG.items.filter(item => item.resultat === "na").length;

		/**
		* 	If all the wcag are non-applicables (hypothetical but tested)
		*/ 
		if (dataWCAG.nbTotalWcag===0 && dataWCAG.nbNaWcag>0) {
			dataWCAG.result = "NA";
		} else {
			dataWCAG.result = Math.round((dataWCAG.nbTrueWcag / dataWCAG.nbTotalWcag) * 100);
			dataWCAG.resultA = Math.round((dataWCAG.conformeA / (dataWCAG.conformeA+dataWCAG.nonconformeA)) * 100);
			dataWCAG.resultAA = Math.round((dataWCAG.conformeAA / (dataWCAG.conformeAA+dataWCAG.nonconformeAA)) * 100);
		}
	
}

/**
	*  Get if a test rely on AAA wcag rules
*/
function getAAA(currentWcag) {
	
	let level = false;
	
	if (currentWcag) {
		dataWCAG.items.forEach(function(current){
			
			if (current.wcag === currentWcag) {
				
				if (current.level === 'AAA') {
					level = true;
				} 
			} 
		
		});
		
	}
	return level;
	
}

/**
 * 	Computes the conformity rate by pages and the final audit conformity rate (average rate).
 *	Computes the wcag summary table (conformity, non-conformity and non-applicable tests by wcag levels).
 *	Builds the non-conformity list
 *	Builds the audit result markup.
 *  @param {array} pagesResultsArray - Contains all wcag results by pages.
*/
function runFinalComputation(pagesResultsArray) {

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
 * Get the number of non-tested items per pages.
 * @return {object} nbNTArray - number of non-tested items per pages.
*/
function getNbNotTested() {
	nbNTArray = {};
    var nbNTtests = 0;
    var nbNTtestsPage = 0;

    for (let k in dataVallydette.checklist.page) {
        for (let l in dataVallydette.checklist.page[k].items) {
            if (dataVallydette.checklist.page[k].items[l].resultatTest == "nt") {
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
 * Multipage manager
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

		newBtnPage.innerHTML = allPages[i].name;
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

	
	
	initNewThemes(indexPage);
	
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

/**  Initialization of themes */
initNewThemes = function () {
	for (var themeItem in dataVallydette.checklist.page[indexPage].themes)  {
		dataVallydette.checklist.page[indexPage].themes[themeItem].checked = true;
	};
}

/**  
*	Initialization dataWCAG properties, needed for computation.
*	@param {object} item - dataWCAG items (rules) 
*/
initProperties = function (item) {
	item.resultat = 'nt';
	item.comment = [];
	item.page = [];
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

	htmlMenu += '<div class="border-top border-light my-3 w-100"></div>';
	htmlContextualMenuContent.innerHTML = htmlMenu;
	
	btnActionPageEventHandler();
}


/** Remove the page contextual menu (needed for audit results page). */
removeContextualMenu = function () {
	htmlContextualMenuContent.innerHTML = "";
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
	currentPageName.innerHTML = value;
	
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
				console.log(document.getElementById('link-' + targetId))
				if(document.getElementById('link-' + targetId) !== null){
					document.getElementById('link-' + targetId).remove();
				}
			}
			let alertAutocheck = document.getElementById('alert-'+targetId);
			alertAutocheck.innerHTML = '<span class="alert-icon"></span><p>'+langVallydette.autocheckTxtError+'</p>'
			alertAutocheck.classList.remove('d-none')
		}
	}
	

	
	jsonUpdate();
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
 * Check if the url is correct, and correct it accordingly
 * @param {string} url - url link.
*/
validateUrl = function( url ){
	if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1) {
       url =  "http://" + url;
    }
	return url;

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

/**
 * Comment manager
 */

/**
 * Management of deprecated comments that no longer exist 
 * @param {array} data - data valydette
 */
managementDeprecatedComment = function (data){
	data.checklist.page.forEach( 
			page => {
				page.items.forEach( item =>{
					if(typeof item.issues === 'undefined'){
						item.issues = [];
					}
					if( typeof item.commentaire !== 'undefined'){
						if(item.commentaire!==""){
							newIssue = {
								issueTitle : item.commentaire,
								issueDetail : "",
								issueSolution : "",
								issueTechnicalSolution:""
							};
							item.issues.push(newIssue);
						}
						delete item.commentaire	
					}
				})
			}
		 );
	return data;
}

/**
 * Issue manager
 */

/**
 * Load issue
*/
loadIssue = function (){
	var issuesRequest = new XMLHttpRequest();
	issuesRequest.open("GET", "json/"+ checklistVallydette[dataVallydette.checklist.referentiel].filename+"-issues-" + globalLang + ".json", true);
	issuesRequest.onreadystatechange = function () {
		if(issuesRequest.readyState === 4 && issuesRequest.status === 200) {
			issuesVallydette = JSON.parse(issuesRequest.responseText);
		}	 
	};
	
	issuesRequest.send();
}

/**
 * Issue popin initialization.
 * @param {string} targetId - current test ID.
 * @param {string} title - current test title.
*/
setIssue = function (targetId, title, targetIdOrigin) {
	let titleModal = title;

	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg " role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalAddIssueTitle">' + langVallydette.issueTxt1 + titleModal + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<form id="editIssueForm">';
	htmlModal += '<div class="modal-body">';
	htmlModal += (issuesVallydette[targetIdOrigin]) ? getPredefinedIssues(targetIdOrigin) : "";
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="is-required form-label" for="issueNameValue">' + langVallydette.summary + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlModal += '<input type="text" class="form-control" id="issueNameValue" value="" required>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label class="is-required mt-2 form-label" for="issueDetailValue">' + langVallydette.description + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span> </label>';
	htmlModal += '<textarea class="form-control" id="issueDetailValue" rows="8" required></textarea>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label for="issueSolutionValue" class="mt-2 form-label">' + langVallydette.solution + ' </label>';
	htmlModal += '<textarea class="form-control" id="issueSolutionValue"></textarea>';
	htmlModal += '</div>';
	htmlModal += '<div class="mb-3">';
	htmlModal += '<label for="issueTechnicalSolutionValue" class="mt-2 form-label">' + langVallydette.technical_solution + ' </label>';
	htmlModal += '<textarea class="form-control" id="issueTechnicalSolutionValue"></textarea>';
	htmlModal += '</div>';
	htmlModal += '</div>';

	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" id="closeIssueBtnBtn" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
	htmlModal += '<button type="submit" id="saveIssueBtnBtn" class="btn btn-primary">' + langVallydette.save + '</button>';
	htmlModal += '</div>';
	htmlModal += '</form>';
	htmlModal += '</div></div>';

	
	let elModal = document.getElementById('modalAddIssue');
	elModal.innerHTML = htmlModal;

	let currentEditForm = document.getElementById('editIssueForm');
 
	currentEditForm.addEventListener('submit', function () {
		event.preventDefault();
		
		addIssue(targetId, issueNameValue.value, issueDetailValue.value, issueSolutionValue.value, issueTechnicalSolutionValue.value);
		document.getElementById('closeIssueBtnBtn').click();
		

	});
	
	
	if (document.getElementById('btnValidatePredefined')) {
		
			document.getElementById('btnValidatePredefined').addEventListener('click', function () {
			event.preventDefault();
			
			issueNameValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].title;
			issueDetailValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].detail;
			issueSolutionValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].solution;
			issueTechnicalSolutionValue.value = issuesVallydette[targetIdOrigin][issuePredefined.value].technicalSolution;
			
			issueNameValue.focus();
		
		});
		
	}
	
	var issueNameValueInput = document.getElementById('issueNameValue');
	var modal = document.getElementsByClassName('modal');
	
	modal[0].addEventListener('shown.bs.modal', function () {
		issueNameValueInput.focus()
	  })
}

/**
 * Add the issue to the vallydette object.
 * @param {string} targetId - current test ID.
 * @param {string} issueTitle.
 * @param {string} issueDetail.
*/
addIssue = function (targetId, issueTitle, issueDetail, issueSolution, issueTechnicalSolution) {
	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
			
			newIssue = {};
			newIssue['issueTitle'] = issueTitle;
			newIssue['issueDetail'] = issueDetail;
			newIssue['issueSolution'] = issueSolution;
			newIssue['issueTechnicalSolution'] = issueTechnicalSolution;
			
			dataVallydette.checklist.page[currentPage].items[i].issues.push(newIssue);
			
			document.getElementById("issueDisplayBtn"+ targetId).removeAttribute("disabled");
			
		}
	}

	jsonUpdate();
}


/**
 * Get the predefined issues if exists, and update the select menu
 * @param {string} targetId - current test ID
 * @return {string} htmlPredefinedIssue - html of the updated select menu
*/
getPredefinedIssues = function(targetId) {
	
	let htmlPredefinedIssues = '';
	

	htmlPredefinedIssues += '<div class="mb-3 row">';
	htmlPredefinedIssues += '<div class="col-sm-10">';
	
	htmlPredefinedIssues += '<select class="form-select" id="issuePredefined" aria-label="' + langVallydette.selectIssue + ' ">';
	htmlPredefinedIssues += '<option selected>' + langVallydette.selectIssue + '</option>';
	issuesVallydette[targetId].forEach(function (issue, index) {htmlPredefinedIssues +='<option value="' + index + '">' + issue.title + '</option>'});
	htmlPredefinedIssues += '</select>';
	htmlPredefinedIssues += '</div>';
	htmlPredefinedIssues += '<div class="col-sm-2">';
	htmlPredefinedIssues += '<button id="btnValidatePredefined" class="btn btn-secondary">' + langVallydette.import + '</button>';
	htmlPredefinedIssues += '</div>';
	htmlPredefinedIssues += '</div>';
		
	return htmlPredefinedIssues;
	
}

/**
 * Get an issue property
 * @param {string} targetId - current test ID
 * @param {string} issueProperty - property name
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @return {string} currentIssue[issueProperty] - issue property value
*/
getIssue = function (targetId, issueProperty, issueIndex) {
	let currentIssue;

	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
			currentIssue = dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex];
		}
	}

	return currentIssue[issueProperty];
}

/**
 * Edit an issue
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
*/
editIssue = function (targetId, issueIndex) {
	
	let htmlEditIssue = '';
	
	htmlEditIssue += '<form id="editIssueForm-'+ targetId +'-'+ issueIndex+'">';
	htmlEditIssue += '<label class="is-required form-label" for="issueNameValue-' + issueIndex + '"> ' + langVallydette.summary + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlEditIssue += '<input type="text" class="form-control" id="issueNameValue-' + issueIndex + '" value="' + utils.escape_html(getIssue(targetId, 'issueTitle', issueIndex)) + '" required >';
	htmlEditIssue += '<label class="is-required mt-2 form-label" for="issueDetailValue-' + issueIndex + '">' + langVallydette.description + ' <span class="visually-hidden"> (' + langVallydette.required + ')</span></label>';
	htmlEditIssue += '<textarea class="form-control" id="issueDetailValue-' + issueIndex + '" rows="8" required>' + getIssue(targetId, 'issueDetail', issueIndex) + '</textarea>';
	htmlEditIssue += '<label for="issueSolutionValue-' + issueIndex + '" class="mt-2 form-label">' + langVallydette.solution + '</label>';
	htmlEditIssue += '<textarea class="form-control" id="issueSolutionValue-' + issueIndex + '">' + getIssue(targetId, 'issueSolution', issueIndex) + '</textarea>';
	htmlEditIssue += '<label for="issueTechnicalSolutionValue-' + issueIndex + '" class="mt-2 v">' + langVallydette.technical_solution + '</label>';
	htmlEditIssue += '<textarea class="form-control" id="issueTechnicalSolutionValue-' + issueIndex + '">' + getIssue(targetId, 'issueTechnicalSolution', issueIndex) + '</textarea>';
	htmlEditIssue += '<button type="button" id="cancelIssueBtn-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm mt-1 me-1 mb-1">' + langVallydette.cancel + '</button>';
	htmlEditIssue += '<button type="submit" id="saveIssueBtn-'+ targetId +'-'+ issueIndex +'" class="btn btn-primary btn-sm mt-1 mb-1">' + langVallydette.save + '</button>';
	htmlEditIssue += '<div class="border-top border-light my-3"></div>';
	htmlEditIssue += '</form>';
	
	let elIssueCard = document.getElementById('issue-body-'+ targetId +'-'+ issueIndex);
	elIssueCard.innerHTML = htmlEditIssue;
	
	let elTitle = document.getElementById('issueNameValue-' + issueIndex);
	elTitle.focus();

	let issueForm = document.getElementById('editIssueForm-'+ targetId +'-'+ issueIndex);
	issueForm.addEventListener('submit', function (event) {
		event.preventDefault();
		
		saveIssue(targetId, issueIndex, this);
		
	});
	
	document.getElementById('editIssueBtn-' + targetId + '-'+ issueIndex).style.display = "none";
	document.getElementById('deleteIssueBtn-' + targetId + '-'+ issueIndex).style.display = "none";
	
	document.getElementById('cancelIssueBtn-' + targetId + '-' + issueIndex).addEventListener('click', function () {
		cancelIssue(targetId, issueIndex, getIssue(targetId, 'issueTitle', issueIndex), getIssue(targetId, 'issueDetail', issueIndex));	
	});
	
}

/**
 * Save an issue
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {object} issueEditForm - issue edit form object
*/
saveIssue = function (targetId, issueIndex, issueEditForm) {

	for (let i in dataVallydette.checklist.page[currentPage].items) {
		if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {

			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueTitle'] = issueEditForm.elements["issueNameValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueDetail'] = issueEditForm.elements["issueDetailValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueSolution'] = issueEditForm.elements["issueSolutionValue-" + issueIndex].value;
			dataVallydette.checklist.page[currentPage].items[i].issues[issueIndex]['issueTechnicalSolution'] = issueEditForm.elements["issueTechnicalSolutionValue-" + issueIndex].value;
			
		}
	}

	cancelIssue(targetId, issueIndex, utils.escape_html(issueEditForm.elements["issueNameValue-" + issueIndex].value), utils.escape_html(issueEditForm.elements["issueDetailValue-" + issueIndex].value));
	
	jsonUpdate();	
	
}


/**
 * Cancel the issue edition form
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {string} issueTitle - issue title property
 * @param {string} issueDetail - issue detail property
*/
cancelIssue = function (targetId, issueIndex, issueTitle, issueDetail) {

	let htmlEditIssue = '';
	htmlEditIssue += issueDetail;
	

	let elIssueCard = document.getElementById('issue-body-' + targetId + '-' + issueIndex);
	elIssueCard.innerHTML = htmlEditIssue;
	let elIssueCardHeader = document.getElementById('btnIssue' + targetId + '-' + issueIndex);
	elIssueCardHeader.innerHTML = issueTitle;
	
	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";
	document.getElementById('deleteIssueBtn-' + targetId + '-' + issueIndex).style.display = "inline-flex";

	document.getElementById('editIssueBtn-' + targetId + '-' + issueIndex).focus();
	
}


/**
 * Delete confirmation feedback
 * @param {string} targetId - current test ID
 * @param {string} issueIndex - index of the issue to remove into an issue array
*/
deleteConfirmationIssue = function (targetId, issueIndex) {
	
	let htmlIssueFeedback = '<div id="deleteIssueBtn-'+ targetId +'-'+ issueIndex +'-feedback">';
	htmlIssueFeedback += '<span id="deleteIssueMessage-'+ targetId +'-'+ issueIndex +'">' + langVallydette.issueTxt3 + '</span>';
	htmlIssueFeedback += '<button type="button" id="btnDeleteIssueNo-'+ targetId +'-'+ issueIndex +'" aria-labelledby="deleteIssueMessage-'+ targetId +'-'+ issueIndex +' btnDeleteIssueNo-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm" onClick="deleteIssue(\''+ targetId +'\','+ issueIndex +', false)">' + langVallydette.no + '</button>';
	htmlIssueFeedback += '<button type="button" id="btnDeleteIssueYes-'+ targetId +'-'+ issueIndex +'" class="btn btn-secondary btn-sm"  aria-labelledby="deleteIssueMessage-'+ targetId +'-'+ issueIndex +' btnDeleteIssueYes-'+ targetId +'-'+ issueIndex +'"  onClick="deleteIssue(\''+ targetId +'\','+ issueIndex +', true)">' + langVallydette.yes + '</button>';
	htmlIssueFeedback += '</div>';
	
	let elButton = document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex);
	elButton.insertAdjacentHTML("afterend", htmlIssueFeedback); 
	
	document.getElementById("btnDeleteIssueNo-"+ targetId +"-"+ issueIndex).focus();
	
}

/**
 * Delete an issue from the vallydette object.
 * @param {string} targetId - current test ID.
 * @param {string} issueIndex - index of the issue to remove into an issue array
 * @param {boolean} issueValidation - if true => run the deletion, if false => come back to the issues list
*/
deleteIssue = function (targetId, issueIndex, issueValidation) {

	if (issueValidation) {
		
		for (let i in dataVallydette.checklist.page[currentPage].items) {
			if (dataVallydette.checklist.page[currentPage].items[i].ID === targetId) {
				dataVallydette.checklist.page[currentPage].items[i].issues.splice(issueIndex, 1);
				if (dataVallydette.checklist.page[currentPage].items[i].issues.length === 0) {
					document.getElementById("issueDisplayBtn"+ targetId).setAttribute("disabled", true);
				}
			}
		}
	
		utils.removeElement(document.getElementById("cardIssue"+targetId+"-"+ issueIndex));
		utils.putTheFocus(document.getElementById("modal" + targetId + "Title"));
		jsonUpdate();
		
	} else {
		
		utils.removeElement(document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex +"-feedback"));
		document.getElementById("deleteIssueBtn-"+ targetId +"-"+ issueIndex).focus();

	}

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
 * Filter manager
 */

/**
 * Filter initialization, filters HTML elements are build here from the global var arrayFilterNameAndValue.
 */
initFilters = function () {
    
		htmlFilterContent.innerHTML = '';
	   
		let htmlFilterHeading = document.createElement('h2');
		htmlFilterHeading.textContent = langVallydette.template.filters;
		htmlFilterContent.appendChild(htmlFilterHeading);
   
		let htmlFilterFeedback = document.createElement('div');
		htmlFilterFeedback.setAttribute("id", "feedback"); 
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
		
		if (globalTemplate==="audit") {
			PropertyFilterMarkup("arrayProfileActivated", "arrayProfileNameAndValue", "profile");
			PropertyFilterMarkup("arrayTypeActivated", "arrayTypeNameAndValue", "type");
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
		
		 let wcagDisplayObj = runComputation(true);

			let wcagDisplayContent = '';
			
			wcagDisplayContent += '<h2 class="sticky-md-top d-flex bg-white pt-4 pb-2">' + langVallydette.wcagView + '</h2>';
			
			for (let i in wcagDisplayObj[currentPage].items) {
				
				if ((globalTemplate==="wcag" && wcagDisplayObj[currentPage].items[i].level!="AAA") || globalTemplate!="wcag") {
					wcagDisplayContent += '<h3 class="sticky-md-top d-flex bg-white pt-4 pb-3 border-bottom">'+ wcagDisplayObj[currentPage].items[i].wcag + ' ' + wcagDisplayObj[currentPage].items[i].name +' ' + wcagDisplayObj[currentPage].items[i].level + '</h3>';

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
	if (activeFilter) {
		htmlFeedback = '<p><span><b>' + nbTests + '</b> ' + langVallydette.filterFeedback2 + '</span></p>';
		elFeedback.innerHTML = htmlFeedback;
	} else {
		htmlFeedback = '<p><b>' + nbTests + '</b> ' + langVallydette.filterFeedback1 + '</p>';
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
	//initComputation();
	if((arrayFilterActivated && arrayFilterActivated.length > 0) || (arrayProfileActivated && arrayProfileActivated.length > 0) || (arrayTypeActivated && arrayTypeActivated.length > 0)){
		runFilter();
	} else {
		runTestListMarkup(dataVallydette.checklist.page[currentPage].items);
		updateCounter(false, dataVallydette.checklist.page[currentPage].items.length);
	}
}

/**
 * Run each time an updated is made to the vallydette object, in order to update the export informations.
 */
jsonUpdate = function () {

	let exportFileName = utils.fileName('json');
	dataVallydette.checklist.timestamp = Date.now();
	let dataStr = JSON.stringify(dataVallydette);
	let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

	linkElement = document.getElementById("export");
	linkElement.classList.remove("disabled");
	linkElement.removeAttribute('disabled');
	linkElement.setAttribute('aria-disabled', false);
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileName);

	let allLocalStorage = getAllStorage();

	if( Object.keys(allLocalStorage).length >8 ){
	
		let deleteitem = '';
		let timestamp = 0;
		for (const [key, value] of Object.entries(allLocalStorage)) {
			let storage_audit=JSON.parse(value);
			if( timestamp === 0 || timestamp > storage_audit.checklist.timestamp){
				deleteitem = key;
				timestamp = storage_audit.checklist.timestamp;
			}
		  }
		  window.localStorage.removeItem(deleteitem);
	}
	window.localStorage.setItem('lavallydette__'+dataVallydette.checklist.name, dataStr);
	btnLocalStorage.disabled=false;
	btnLocalStorage.classList.remove("disabled");
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
 * Run the excel export
 * @param {string} type - checklist type (wcag, audit, etc...)
 * 
*/
excelExport = function (type) {

var excel = $JExcel.new();   
const formatHeader = excel.addStyle ( {border: "none,none,none,thin #333333",font: "Calibri 11 #000000 B", fill: "#FFCC00"});
const formatHeaderProject = excel.addStyle ( {border: "none,none,none,thin #333333",font: "Calibri 11 #000000 B", fill: "#C5D9F1"});
const formatRow = excel.addStyle ( {border: "none,none,none,thin #333333",font: "Calibri 11 #000000"}); 
const formatWarning = excel.addStyle ( {font: "Calibri 11 #ff0000 B"});
const formatHyperlink = excel.addStyle ( {font: "Calibri Light 12 #0563C1 U"}); 
const pageHeaders = [langVallydette.name, 'URL'];
const dataHeaders = ['ID', 'test', langVallydette.guidelines, langVallydette.summary, langVallydette.description, langVallydette.solution, langVallydette.technical_solution, langVallydette.priorityIssue, langVallydette.reviewIssue, langVallydette.stateIssue];


excel.set( {sheet:0,value:"Informations"} );
excel.set(0,0,0,"Audit",formatHeader);
excel.set(0,0,1,dataVallydette.checklist.name);
excel.set(0,0,2,"");


for (var j=0; j < pageHeaders.length; j++){    
		
	excel.set(0,j,3,pageHeaders[j], formatHeader);    
						
}	

let rowPages = 4;

for (let i in dataVallydette.checklist.page) {

	excel.set(0,0,rowPages, dataVallydette.checklist.page[i].name);
	if (dataVallydette.checklist.page[i].url) {
		excel.set(0,1,rowPages, '=HYPERLINK("' + utils.escapeExcel(dataVallydette.checklist.page[i].url) + '","' + utils.escapeExcel(dataVallydette.checklist.page[i].url) + '")', formatHyperlink);
	}

	rowPages++;
}

rowPages++;

excel.set(0,0,rowPages, langVallydette.auditWarning, formatWarning);
	
let setIndex = 1;

for (let i in dataVallydette.checklist.page) {
	
		excel.addSheet(utils.escape_html(dataVallydette.checklist.page[i].name.slice(0, 31)));
	
		for (var j=0;j<dataHeaders.length;j++){    
		
			if(j===9){
				excel.set(setIndex,j,0,dataHeaders[j], formatHeaderProject); 
			} else {
				excel.set(setIndex,j,0,dataHeaders[j], formatHeader);	
			}

			excel.set(setIndex,j,undefined, "auto"); 
		}	 
		
		let rowIssues = 0;
		
		const listNonConformity = dataVallydette.checklist.page[i].items.filter(item => item.resultatTest === "ko").map(function(item) {
			let priority="";
			if(item.priority!== undefined ){
				priority=item.priority
			}
				
			if (item.issues.length > 0) {
				let urlanchor = utils.getUrlAnchor(item);
					
				item.issues.forEach(function (issue, key) {
					rowIssues++;
					excel.set(setIndex,0,rowIssues,  '=HYPERLINK("' + urlanchor + '","issue-' + i + '-' + rowIssues+ '")', formatHyperlink);
					//@ ajout url tests
					
					excel.set(setIndex,1,rowIssues, item.title);
					if (item.moreInfo) {
						excel.set(setIndex,2,rowIssues, '=HYPERLINK("' + item.moreInfo + '","' + langVallydette.moreInfo + '")', formatHyperlink);
					} else {
						excel.set(setIndex,2,rowIssues, '');
					}

					excel.set(setIndex,3,rowIssues, issue.issueTitle);
					excel.set(setIndex,4,rowIssues, issue.issueDetail);
					excel.set(setIndex,5,rowIssues, issue.issueSolution);
					excel.set(setIndex,6,rowIssues, issue.issueTechnicalSolution);
					excel.set(setIndex,7,rowIssues, priority);
		
				})
					
			}
			
		});
		
		setIndex++;
		
	} 

		let exportFileName = utils.fileName("xlsx");
		excel.generate(exportFileName);
	
}

	
/**
 * Statement manager
 * @param {array} statementObjectProperties - list all the statement object properties
 * @param {array} statementProperties - list of the properties updated from popin form
 * @param {array} statementInputs - list of the input type properties
 * @param {object} langStatement - traductions keys (needed if statement lang is diffrent from global lang)
*/
const statementObjectProperties = ["name", "lang", "status", "date", "results", "plan", "userNumber", "userBlockingPoints", "userTestDescription", "approval", "contact", "derogation", "exemption", "technology", "tests", "environments"];
const statementProperties = ["name", "type", "version", "content", "email", "checked", "environment"];
const statementInputs = ["name", "lang", "date", "userNumber", "userBlockingPoints", "userTestDescription", "plan", "derogation", "exemption"];
var langStatement = {};


/**
 * Init the statement object
 *
*/
function initStatementObject() {
	
	if (!dataVallydette.statement) {
		dataVallydette.statement = {};
	}
	
	if (!dataVallydette.statement.lang) {
		
		dataVallydette.statement.lang = globalLang;
		langStatement = langVallydette;
		
	} else if (dataVallydette.statement.lang !== globalLang) {
				
		var langRequest = new XMLHttpRequest();
		langRequest.open("GET", "json/lang/" + dataVallydette.statement.lang + ".json", true);
		langRequest.onreadystatechange = function () {
		  if(langRequest.readyState === 4 && langRequest.status === 200) {
			langStatementRequest = JSON.parse(langRequest.responseText);
			
			langStatement = langStatementRequest;
			
		  } 
		};
		langRequest.send();
		
	} else {
		
		langStatement = langVallydette;
				
	}
	
		statementObjectProperties.forEach(function(p){
			if (!dataVallydette.statement.hasOwnProperty(p)) {
				if (p === "name") {
					dataVallydette.statement.name = "";
				}
				if (p === "status") {
					dataVallydette.statement.status = "WIP";
				}
				if (p === "date") {
					dataVallydette.statement.date = "";
				}
				if (p === "results") {
					dataVallydette.statement.results = [{
							"type" : "pagesAverage",
							"checked" : "true"
						},
						{
							"type" : "criteriaPercentage",
						}
						
					];
				}
				if (p === "plan") {
					dataVallydette.statement.plan = "";
				}
				if (p === "userNumber") {
					dataVallydette.statement.userNumber = 0;
				}
				if (p === "userBlockingPoints") {
					dataVallydette.statement.userBlockingPoints = 0;
				}
				if (p === "userTestDescription") {
					dataVallydette.statement.userTestDescription = "";
				}
				if (p === "approval") {
					dataVallydette.statement.approval = [{
						"name": langStatement.customerService,
						"content": ""
					},{
						"name": langStatement.internalService,
						"content": "",
					}
					];
				}
				if (p === "contact") {
					dataVallydette.statement.contact = [{
						"name": "Orange France",
						"content": ""
					},
					{
						"name": langStatement.orangeGroup,
						"content": ""
					}
					];
				}
				if (p === "derogation") {
					dataVallydette.statement.derogation = "";
				}
				if (p === "exemption") {
					dataVallydette.statement.exemption = "";
				}
				if (p === "userTestDescription") {
					dataVallydette.statement.userTestDescription = langStatement.userTestingContent;
					
				}
				if (p === "technology") {
					if (currentCriteriaListName === "wcag-web") {
						dataVallydette.statement.technology = [{
							"name": "HTML",
							"version": ""
						},{
							"name": "CSS",
							"version": ""
						},{
							"name": "JavaScript",
							"version": ""
						}];
					}
					if (currentCriteriaListName === "wcag-android") {
						dataVallydette.statement.technology = [{
							"name": "Java",
							"version": ""
						},{
							"name": "Kotlin",
							"version": ""
						},{
							"name": "XML",
							"version": ""
						}];
					}
					if (currentCriteriaListName === "wcag-ios") {
						dataVallydette.statement.technology = [{
							"name": "Swift",
							"version": ""
						}];
					}
				}
				if (p === "tests") {
					if (currentCriteriaListName === "wcag-web") {
						dataVallydette.statement.tests = [{
						"type": "auto",
						"name": "aXe",
						"version": "4.9.3"
						},
						{
						"type": "auto",
						"name": "Wave",
						"version": "3.1.3"
						},
						{	
						"type": "functional",
						"name": "NVDA",
						"version": "2020.4"
						},
						{	
						"type": "functional",
						"name":  langStatement.keyboardNavigation,
						"version": ""
						}];
					}
					if (currentCriteriaListName === "wcag-android") {
						dataVallydette.statement.tests = [{
						"type": "auto",
						"name": "aXe",
						"version": "0.10.2"
						},
						{
						"type": "auto",
						"name": "Accessibility Scanner",
						"version": ""
						},
						{	
						"type": "functional",
						"name": "Talkback",
						"version": ""
						},
						{	
						"type": "functional",
						"name":  "Switch Access",
						"version": ""
						}];
					}
					if (currentCriteriaListName === "wcag-ios") {
						dataVallydette.statement.tests = [{
						"type": "auto",
						"name": "Accessibility Inspector",
						"version": ""
						},
						{	
						"type": "functional",
						"name": "Voice Over",
						"version": ""
						}];
					}
				}
				if (p === "environments") {
					if (currentCriteriaListName === "wcag-web") {
						dataVallydette.statement.environments = [{
							"environment": langStatement.environmentEx1
						},{
							"environment": langStatement.environmentEx2
						}];
					}
					if (currentCriteriaListName === "wcag-android") {
						dataVallydette.statement.environments = [{
							"environment": langStatement.environmentEx3
						}];
					}
					if (currentCriteriaListName === "wcag-ios") {
						dataVallydette.statement.environments = [{
							"environment": langStatement.environmentEx4
						}];
					}
				}
			}
		});
	
	
	showStatementWizard();
	
}

/**
 * Init the statement page
 *
*/
function showStatementWizard() {
	
	setPageName(langVallydette.statement);
	utils.setPageTitle(langVallydette.statementTxt1);
	removeContextualMenu();
	removeFilterSection();
	utils.columnDisplay(2);
	
	var btnStatementXmlExport = document.createElement('a');
	btnStatementXmlExport.innerHTML = "XML";
	btnStatementXmlExport.setAttribute('id', "btnStatementXmlExport");
	btnStatementXmlExport.setAttribute('title', langVallydette.xmlBtn);
	btnStatementXmlExport.classList.add("btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none");
	document.getElementById("contextualMenu").appendChild(btnStatementXmlExport);
	
	var btnStatementHtmlExport = document.createElement('a');
	btnStatementHtmlExport.innerHTML = "HTML";
	btnStatementHtmlExport.setAttribute('id', "btnStatementHtmlExport");
	btnStatementHtmlExport.setAttribute('title', langVallydette.htmlBtn);
	btnStatementHtmlExport.classList.add("btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none");
	document.getElementById("contextualMenu").appendChild(btnStatementHtmlExport);
	
	
	var statementResult = runComputation(true);

	if (dataWCAG.globalPagesResult !== undefined && !isNaN(dataWCAG.globalPagesResult) && dataVallydette.statement.status === "DONE") {
		
		initStatementExports(statementResult);
		
	} else {
		
		btnStatementXmlExport.classList.add("disabled");
		btnStatementHtmlExport.classList.add("disabled");
	}

	let statementWizardContent = '';
	
	statementWizardContent += '<h2 class="pt-4 pb-3">' + langVallydette.statementTxt1 + '</h2>';
	
	statementWizardContent += '<div id="alertContainer">';
	if (dataWCAG.globalPagesResult === undefined || isNaN(dataWCAG.globalPagesResult)) {
		statementWizardContent += '<div class="alert alert-info alert-dismissible fade show" role="alert"> <span class="alert-icon"><span class="visually-hidden">Info</span></span><p>' + langVallydette.statementTxt2 + '</p>';
		statementWizardContent += '<button type="button" class="btn-close" data-bs-dismiss="alert"><span class="visually-hidden">Close information message</span></button>';   
		statementWizardContent += '</div>';
	}
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-6">';
	statementWizardContent += '<h3>1. ' + langVallydette.formPrefill + '</h3>';
	statementWizardContent += '<p id="descStatementImport">' + langVallydette.formPrefillDesc + '</p>';
	statementWizardContent += '<div class="input-group">';
    statementWizardContent += '                    <div class="custom-file">';
    statementWizardContent += '                        <input class="custom-file-input" id="selectFilesStatement" type="file" aria-describedby="descStatementImport">';
    statementWizardContent += '                        <label class="custom-file-label" id="selectFilesLabelStatement" for="selectFilesStatement" aria-describedby="importStatementData" data-browse="' + langVallydette.dataBrowse + '">' + langVallydette.selectData + '</label>';
    statementWizardContent += '                    </div>';
    statementWizardContent += '                    <div class="input-group-append">';
    statementWizardContent += '                        <button class="btn btn-secondary" type="button" id="importStatementData">' + langVallydette.template.btnImportTxt + '</button>';
    statementWizardContent += '                    </div>';
    statementWizardContent += '                </div>';
    statementWizardContent += '            </div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="border-top border-light my-3"></div>';
		
	statementWizardContent += '<form id="statementForm">';

	statementWizardContent += '<h3>2. ' + langVallydette.manualDataEntry + '</h3>';
	statementWizardContent += '<p>' + langVallydette.manualDataEntryDesc + '</p>';

	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-name" class="is-required form-label">' + langVallydette.projectName + '</label>';
    statementWizardContent += '<input type="text" class="form-control" id="input-name" style="scroll-margin-top: 10.35em;" value="' + dataVallydette.statement.name + '" required >';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-lang" class="is-required">' + langVallydette.lang + '</label>';
    statementWizardContent += '<select class="form-select" id="input-lang"  style="scroll-margin-top: 10.35em;"  required>';
    statementWizardContent += '<option value="" label="' + langVallydette.select + '"></option>';
    statementWizardContent += '<option value="fr" ' + (dataVallydette.statement.lang === "fr" ? "selected" : "") + '>' + langVallydette.french + '</option>';
    statementWizardContent += '<option value="en" ' + (dataVallydette.statement.lang === "en" ? "selected" : "") + '>' + langVallydette.english + '</option>';
    statementWizardContent += '</select>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-date"  class="is-required form-label">' + langVallydette.date + '</label>';
    statementWizardContent += '<input type="date" class="form-control" id="input-date" style="scroll-margin-top: 10.35em;" value="' + dataVallydette.statement.date + '" required>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3" role="group">';
	statementWizardContent += '<span class="d-block"><strong>' + langVallydette.typeOfResult + '</strong></span>';
    statementWizardContent += '<label class="mt-1 font-weight-normal">';
    statementWizardContent += '<input id="input-pagesAverage"  name="input-pagesAverage" class="me-1" type="checkbox" autocomplete="off" ' + (dataVallydette.statement.results[0].checked === "true" ? " checked " : "") + '>';
    statementWizardContent += '<span>' + langVallydette.averageRate + '</span>';
    statementWizardContent += '</label>';
	statementWizardContent += '<label class="font-weight-normal">';
    statementWizardContent += '<input id="input-criteriaPercentage"  name="input-criteriaPercentage"  class="me-1" type="checkbox" autocomplete="off" '+ (dataVallydette.statement.results[1].checked === "true" ? " checked " : "") + '>';
    statementWizardContent += '<span>' + langVallydette.criteriaPercentage + '</span>';
    statementWizardContent += '</label>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="border-top border-light my-3"></div>';

	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<h4>' + langVallydette.approval + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditApprovalList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.approvalEdit + '" title="' + langVallydette.approvalEdit + '">'+htmlIcon.edit+'</span></button></h4>';
	statementWizardContent += '<div class="mb-3" id="approvalList">';
	
	dataVallydette.statement.approval.forEach(function(a, index){ 
		statementWizardContent += '<div class="form-check">';
		statementWizardContent += '<input type="radio" id="approval' +  index + '" name="approvalRadio" class="form-check-input" onClick="radioIsChecked(\'approval\', ' + index + ')" ' + (a.checked === "true" ? " checked " : "") + ' >';
		statementWizardContent += '<label class="form-check-label" for="approval' +  index + '">' + a.name + '</label>';
		statementWizardContent += '</div>';
	})
	
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<h4>' + langVallydette.contact + '  <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditContactList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.contactEdit + '" title="' + langVallydette.contactEdit + '">'+htmlIcon.edit+'</span></button></h4>';
	statementWizardContent += '<div class="mb-3" id="contactList">';
	
	dataVallydette.statement.contact.forEach(function(c, index){ 
		statementWizardContent += '<div class="form-check">';
		statementWizardContent += '<input type="radio" id="contact' +  index + '" name="contactRadio" class="form-check-input" onClick="radioIsChecked(\'contact\', ' + index + ')" ' + (c.checked === "true" ? " checked " : "") + ' >';
		statementWizardContent += '<label class="form-check-label" for="contact' +  index + '">' + c.name + '</label>';
		statementWizardContent += '</div>';
	})
	
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-6">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-plan" class="form-label">' + langVallydette.accessibilityPlan + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-plan" rows="5" aria-describedby="planDesc">' + dataVallydette.statement.plan + '</textarea>';
	statementWizardContent += '<small id="planDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="border-top border-light my-3"></div>';
	
	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="technologyLegend">';
	statementWizardContent += '<h4 id="technologyLegend">' + langVallydette.technologies + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditTechList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.technologiesEdit + '" title="' + langVallydette.technologiesEdit + '">'+htmlIcon.edit+'</span></button></h4>';
    statementWizardContent += '<ul id="technologyList">';	

	dataVallydette.statement.technology.forEach(function(listItem, index){
		statementWizardContent += '<li>'+listItem.name+' '+listItem.version+'</li>';
	})
	
	statementWizardContent += '</ul>';
 
	statementWizardContent += '</div>';	
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="testLegend">';
	statementWizardContent += '<h4 id="testLegend">' + langVallydette.tests + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditTestList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.testsEdit + '" title="' + langVallydette.testsEdit + '">'+htmlIcon.edit+'</span></button></h4>';

	statementWizardContent += '<ul id="testsList">';	
	
    dataVallydette.statement.tests.forEach(function(listItem, index){
		statementWizardContent += '<li>' +listItem.name + ' ' + listItem.version + '</li>';
	})
	
	statementWizardContent += '</ul>';
	statementWizardContent += '</div>';	
	statementWizardContent += '</div>';	
	
		
	statementWizardContent += '<div class="col-lg-3">';
	statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="environmentLegend">';
	statementWizardContent += '<h4 id="environmentLegend">' + langVallydette.environments + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditEnvironmentList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.environmentsEdit + '" title="' + langVallydette.environmentsEdit + '">'+htmlIcon.edit+'</span></button></h4>';

	statementWizardContent += '<ul id="environmentsList">';	
	
    dataVallydette.statement.environments.forEach(function(listItem, index){
		statementWizardContent += '<li>' + listItem.environment + '</li>';
	})
	
	statementWizardContent += '</ul>';
	statementWizardContent += '</div>';	
	statementWizardContent += '</div>';	
	
		
	statementWizardContent += '<div class="col-lg-3" role="group" aria-labelledby="usersTestsHeading">';
	statementWizardContent += '<h4 id="usersTestsHeading">' + langVallydette.userTesting + '</h4>';
	statementWizardContent += '<div class="mb-3 input-group-sm">';
	statementWizardContent += '<label class="form-label" for="input-userNumber" >' + langVallydette.userNumber + '</label>';
	statementWizardContent += '<input type="number" class="form-control" id="input-userNumber" value="' + dataVallydette.statement.userNumber +'" min="0" max="100">';
	statementWizardContent += '</div>';
	statementWizardContent += '<div class="mb-3 input-group-sm">';
	statementWizardContent += '<label class="form-label" for="input-userBlockingPoints" >' + langVallydette.blockingNumber + '</label>';
	statementWizardContent += '<input type="number" class="form-control" id="input-userBlockingPoints" value="' + dataVallydette.statement.userBlockingPoints +'" min="0" max="100">';
	statementWizardContent += '</div>';
	statementWizardContent += '<div class="mb-3 input-group-sm">';
	statementWizardContent += '<label class="form-label" for="input-userTestDescription" >' + langVallydette.userTestDescription + '</label>';
	statementWizardContent += '<textarea class="form-control" id="input-userTestDescription" rows="2" >' + dataVallydette.statement.userTestDescription 
	if (currentCriteriaListName === "wcag-web") {
		statementWizardContent += langVallydette.userTestingContentWeb;
	} else if (currentCriteriaListName === "wcag-android") {
		statementWizardContent += langVallydette.userTestingContentAndroid;
	} else if (currentCriteriaListName === "wcag-ios") {
		statementWizardContent += langVallydette.userTestingContentIOS;
	}
	statementWizardContent += '</textarea>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
			
	statementWizardContent += '</div>';

	statementWizardContent += '<div class="border-top border-light my-3"></div>';
	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-6">';
	
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="row">';
	statementWizardContent += '<div class="col-lg-6">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-derogation">' + langVallydette.derogations + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-derogation" rows="5" aria-describedby="derogationDesc">' + dataVallydette.statement.derogation + '</textarea>';
	statementWizardContent += '<small id="derogationDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="col-lg-6">';
	statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label class="form-label" for="input-exemption">' + langVallydette.exemptions + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-exemption" rows="5" aria-describedby="exemptionDesc">' + dataVallydette.statement.exemption + '</textarea>';
	statementWizardContent += '<small id="exemptionDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '<div class="row mb-2">';
	statementWizardContent += '<div class="col-lg-12">';
	statementWizardContent += '<button type="submit" id="statementSaveBtn" class="btn btn-primary ms-2">' + langVallydette.save + '</button>';
	statementWizardContent += '<button type="submit" id="statementSaveAndDownloadBtn" class="btn btn-secondary ms-2">' + langVallydette.saveDownloadJson + '</button>';
	statementWizardContent += '<a href="#" id="exportStatementData" class="btn btn-secondary" hidden>';      
	statementWizardContent += langVallydette.downloadJson;
	statementWizardContent += '</a>';
	statementWizardContent += '</div>';
	statementWizardContent += '</div>';
	
	statementWizardContent += '</form>';
	statementWizardContent += '</div>';	
	
    htmlMainContent.innerHTML = statementWizardContent;
	
	document.getElementById("btnEditContactList").addEventListener('click', function(){event.preventDefault(); editStatementProperty("contact");});
	document.getElementById("btnEditApprovalList").addEventListener('click', function(){event.preventDefault(); editStatementProperty("approval");});
	
	document.getElementById("btnEditTechList").addEventListener('click', function(){event.preventDefault(); editStatementProperty("technology");});
	document.getElementById("btnEditTestList").addEventListener('click', function(){event.preventDefault(); editStatementProperty("tests");});
	document.getElementById("btnEditEnvironmentList").addEventListener('click', function(){event.preventDefault(); editStatementProperty("environments");});
	
	document.getElementById('importStatementData').onclick = function () {
		var files = document.getElementById('selectFilesStatement').files;
		var fr = new FileReader();

		fr.onload = function (e) {
			dataVallydette.statement = JSON.parse(e.target.result);
			if (dataVallydette.statement.lang !== globalLang) {
				
				var langRequest = new XMLHttpRequest();
				langRequest.open("GET", "json/lang/" + dataVallydette.statement.lang + ".json", true);
				langRequest.onreadystatechange = function () {
				  if(langRequest.readyState === 4 && langRequest.status === 200) {
					langStatementRequest = JSON.parse(langRequest.responseText);
					
					langStatement = langStatementRequest;
					initStatementObject();
					
				  } 
				};
				langRequest.send();
				
			} else {
				
				langStatement = langVallydette;
				initStatementObject();
			}
			
			
		}

		fr.readAsText(files.item(0));
	};
	
	
	document.getElementById("selectFilesStatement").addEventListener('change', function () {
		document.getElementById("selectFilesLabelStatement").innerText = document.getElementById("selectFilesStatement").files[0].name;
	}, false);
	
	let dataStr = JSON.stringify(dataVallydette.statement);
	let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
	document.getElementById("exportStatementData").setAttribute('href', dataUri);
	let exportFileName = 'statementData.json';
	document.getElementById("exportStatementData").setAttribute('download', exportFileName);
	
	document.getElementById("statementForm").addEventListener('submit', function (e) {
		event.preventDefault();
		saveStatement(this, e.submitter.id);
	});
	
	document.getElementById("statementForm").addEventListener('focusin', function (e) {
		if (document.getElementById('StatementFormInfo')) {
			document.getElementById('StatementFormInfo').remove();
		}
	});
		
}

/**
 * Used to update statement properties state
*/
radioIsChecked = function (statementProperty, propertyIndex) {
	
	dataVallydette.statement[statementProperty].forEach(function(listItem, index){
		
		if (propertyIndex === index) {
			listItem.checked = "true";
		} else {
			listItem.checked = "false";
		}
	
	})
}

/**
 * Statement property edition
 * @param {string} statementProperty - statement property to edit
*/
editStatementProperty = function (statementProperty) {
	
	let htmlModal = '';
	htmlModal += '<div class="modal-dialog modal-lg" role="document">';
	htmlModal += '<div class="modal-content">';
	htmlModal += '<div class="modal-header">';
	htmlModal += '<h5 class="modal-title" id="modalStatementTitle">' + langVallydette.edition + '</h5>';
	htmlModal += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + langVallydette.close + '"></button>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-body">';
	htmlModal += '<form id="listEditForm">';
	htmlModal += '<ul id="listToEdit">';
	
	dataVallydette.statement[statementProperty].forEach(function(listItem, index){
	
		htmlModal += '<li>';
		
		if (statementProperty === 'approval' || statementProperty === 'contact' ) {
			htmlModal += '<span role="group" aria-labelledby="itemLegend-' + index + '">';
			htmlModal += '	<span id="itemLegend-'+index+'" class="font-weight-bold">' + langVallydette.item + ' ' + index + '</span>';
		} else {
			htmlModal += '<span class="input-group"  role="group"  aria-labelledby="itemLegend-' + index + '">';
			htmlModal += ' <span class="input-group-prepend">';
			htmlModal += '	<span class="input-group-text" id="itemLegend-'+index+'">' + langVallydette.item + ' ' + index + '</span>';
			htmlModal += '  </span>';	
		}

		statementProperties.forEach(function(p) {
			
			if (listItem[p] !== undefined && p === 'type') {
				
				htmlModal += '<select id="type-'+index+'" class="form-select mb-1" aria-label="' + langVallydette.type + '" title="' + langVallydette.type + '" >';
				htmlModal += '<option value="auto" ' + (listItem[p] === "auto" ? "selected" : "") + ' >' + langVallydette.auto + '</option>';
				htmlModal += '<option value="functional" ' + (listItem[p] === "functional" ? "selected" : "") + ' >' + langVallydette.functional + '</option>';
				htmlModal += '<option value="manual" ' + (listItem[p] === "manual" ? "selected" : "") + ' >' + langVallydette.manual + '</option>';
				htmlModal += '<option value="user" ' + (listItem[p] === "user" ? "selected" : "") + ' >' + langVallydette.user + '</option>';
				htmlModal += '</select>';
				
			} else if (listItem[p] !== undefined && p === 'content') {
				
				htmlModal += '<textarea rows="2" cols="20" id="' + p + '-' + index + '" class="form-control mb-1" aria-label="' + langVallydette.content + '" title="' + langVallydette.content + '" >' + listItem.content + '</textarea>';
				
			} else if (listItem[p] !== undefined && p === 'checked') {
				
				htmlModal += '<input type="hidden" id="checked-' + index + '" class="form-control mb-1" value="' + listItem.checked + '" aria-label="' + langVallydette.checked + '" title="' + langVallydette.checked + '" />';
				
			} else if (listItem[p] !== undefined) {
				
				htmlModal += '<input type="text" id="' + p + '-' + index + '" class="form-control mb-1" value="' + listItem[p] + '" aria-label="' + langVallydette[p] + '" title="' + langVallydette[p] + '" aria-describedby="itemDesc" placeholder="' + langVallydette[p] + '" />';
				
			}

		})
		
		htmlModal += '</span>';
		htmlModal += '</li>';	

	})
	htmlModal += '</ul>';

	if (statementProperty === "environments") {
		htmlModal += '<p id="itemDesc" class="form-text text-muted">' + langVallydette.statementTxt5 + '</p>';
	} else {
		htmlModal += '<p id="itemDesc" class="form-text text-muted">' + langVallydette.statementTxt3 + '</p>';
	}
	
	htmlModal += '<button type="button" id="addElement" class="btn btn-secondary btn-sm">' + langVallydette.addElement + '</button>';
	htmlModal += '</form>';
	htmlModal += '</div>';
	htmlModal += '<div class="modal-footer">';
	htmlModal += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
	htmlModal += '<button type="button" id="editionSaveBtn" data-bs-dismiss="modal" class="btn btn-primary">' + langVallydette.save + '</button>';
	htmlModal += '</div></div></div>';

	let elModal = document.getElementById('modalStatement');
	elModal.innerHTML = htmlModal;
	
	document.getElementById("addElement").addEventListener('click', function(){addListElement(statementProperty);});
	document.getElementById("editionSaveBtn").addEventListener('click', function(){saveListElement(document.getElementById("listToEdit"), statementProperty);});
} 

/**
 * Save an item list (list of properties)
 * @param {string} listToEdit - a list ID (html element ID)
 * @param {string} statementProperty - statement property to edit
*/
saveListElement = function(listToEdit, statementProperty) {

	dataVallydette.statement[statementProperty] = [];
	let listMarkup = '';
	let index = 0;
			
	//v??rifier les value
	for (let listItem of listToEdit.children) {
		
		
		if ((listItem.children[0].children["name-"+index] !== undefined && listItem.children[0].children["name-"+index].value !== "") || (listItem.children[0].children["environment-"+index] !== undefined && listItem.children[0].children["environment-"+index].value !== "")) {
			
			itemObj = {};
			
			statementProperties.forEach(function(p){
				if (listItem.children[0].children[p+"-"+index]) {
					itemObj[p] = listItem.children[0].children[p+"-"+index].value;
				}
			})
			
			dataVallydette.statement[statementProperty].push(itemObj);
			
			if (statementProperty === 'technology' || statementProperty === 'tests' ) {
				
				listMarkup += '<li>';
				listMarkup += itemObj.name ? itemObj.name + ' ' : '';	
				listMarkup += itemObj.version ? itemObj.version  + ' ' : '';
				listMarkup += '</li>';
				
			}
			
			if (statementProperty === 'contact' || statementProperty === 'approval' ) {
				
				listMarkup += '<div class="form-check">';
				listMarkup += '<input type="radio" id="' + statementProperty +  index + '" name="' + statementProperty + 'Radio" class="form-check-input" onClick="radioIsChecked(\'' + statementProperty + '\', ' + index + ')" ';
				listMarkup += itemObj.checked === "true" ? "checked" : "";
				listMarkup += '>';
				listMarkup += '<label class="form-check-label" for="' + statementProperty +  index + '">' + itemObj.name + '</label>';
				listMarkup += '</div>';
			}
			
			if (statementProperty === 'environments') {
				
				listMarkup += '<li>';
				listMarkup += itemObj.environment ? itemObj.environment + ' ' : '';	
				listMarkup += '</li>';
				
			}
			
		}
		index++;
		
	}
	
	document.getElementById(statementProperty+"List").innerHTML = listMarkup;

}

/**
 * Add a new item to a given list (list of properties)
 * @param {string} statementProperty - statement property to edit
*/
addListElement = function(statementProperty) {

	var listItem = document.createElement("li");
	var listToEdit = document.getElementById("listToEdit");
	var listIndex = listToEdit.querySelectorAll("li").length;

	let htmlItem = '';
	
		if (statementProperty === 'approval' || statementProperty === 'contact' ) {
			htmlItem += '<span>';
			htmlItem += '	<span id="itemLegend-' + listIndex + '" class="font-weight-bold">' + langVallydette.item + ' ' + listIndex + '</span>';
		} else {
			htmlItem += '<span class="input-group">';
			htmlItem += ' <span class="input-group-prepend">';
			htmlItem += '	<span class="input-group-text" id="itemLegend-' + listIndex + '">' + langVallydette.item + ' ' + listIndex + '</span>';
			htmlItem += '  </span>';	
		}

		statementProperties.forEach(function(p){
			
			if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p) && p === 'type') {
				
				htmlItem += '<select id="type-'+listIndex+'" class="form-select mb-1" aria-labelledby="itemLegend-' + listIndex + ' name-' + listIndex + '" aria-label="' + langVallydette.type + '" title="' + langVallydette.type + '" >';
				htmlItem += '<option value="auto" ' + (listItem[p] === "auto" ? "selected" : "") + ' >' + langVallydette.auto + '</option>';
				htmlItem += '<option value="functional" ' + (listItem[p] === "functional" ? "selected" : "") + ' >' + langVallydette.functional + '</option>';
				htmlItem += '<option value="manual" ' + (listItem[p] === "manual" ? "selected" : "") + ' >' + langVallydette.manual + '</option>';
				htmlItem += '<option value="user" ' + (listItem[p] === "user" ? "selected" : "") + ' >' + langVallydette.user + '</option>';
				htmlItem += '</select>';
				
			} else if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p) && p === 'content') {
				
				htmlItem += '<textarea  rows="4" cols="50" id="' + p + '-' + listIndex + '" class="form-control mb-1" aria-labelledby="itemLegend-' + listIndex + ' ' + p + '-' + listIndex + '" aria-label="' + langVallydette.content + '" title="' + langVallydette.content + '" ></textarea>';
				
			} else if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p)) {
				
				htmlItem += '<input type="text" id="' + p + '-' + listIndex + '" class="form-control mb-1" value="" aria-labelledby="itemLegend-' + listIndex + ' ' + p + '-' + listIndex +'" aria-label="' + langVallydette[p] + '" title="' + langVallydette[p] + '" aria-describedby="itemDesc" placeholder="' + langVallydette[p] + '" />';
				
			}

		})
			
		htmlItem += '</span>';	
	
	listItem.innerHTML = htmlItem;
	listToEdit.appendChild(listItem);
	
	document.getElementById("name-"+listIndex).focus();
}

/**
 * Save the statement form
 * @param {object} statementForm - the statement form object
 * @param {string} submitterBtn - the submit button ID (html element ID)
*/
saveStatement = function(statementForm, submitterBtn) {
	
	var statementResult = runComputation(true);

	statementInputs.forEach(function(input){
		dataVallydette.statement[input] = statementForm.elements["input-"+input].value;
	});
	
	if (statementForm.elements["input-pagesAverage"].checked) {
		dataVallydette.statement.results[0].checked = "true";
	} else {
		dataVallydette.statement.results[0].checked = "false";
	}
	
	if (statementForm.elements["input-criteriaPercentage"].checked) {
		dataVallydette.statement.results[1].checked = "true";
	} else {
		dataVallydette.statement.results[1].checked = "false";
	}
	
	if (dataWCAG.globalPagesResult) {
		
		dataVallydette.statement.status = "DONE";
		
		if (dataVallydette.statement.lang !== globalLang) {
			
			var langRequest = new XMLHttpRequest();
			langRequest.open("GET", "json/lang/" + dataVallydette.statement.lang + ".json", true);
			langRequest.onreadystatechange = function () {
			  if(langRequest.readyState === 4 && langRequest.status === 200) {
				langStatementRequest = JSON.parse(langRequest.responseText);
				
				langStatement = langStatementRequest;
				
				initStatementExports(statementResult);
	
			  } 
			};
			langRequest.send();
			
		} else {
			
			langStatement = langVallydette;
			
			initStatementExports(statementResult);
			
		}
	
	} else {
		
		dataVallydette.statement.status = "WIP";
		
	}

	alertMessage = '';
	alertMessage += '<div class="alert alert-success alert-dismissible fade show" id="StatementFormInfo" role="alert"> <span class="alert-icon"><span class="visually-hidden">Info</span></span><p>' + langVallydette.successFeedback + '</p>';
	alertMessage += '<button type="button" class="btn-close" data-bs-dismiss="alert"><span class="visually-hidden">' + langVallydette.closeInformations + '</span></button>';   
	alertMessage += '</div>';
	
	document.getElementById('alertContainer').innerHTML += (alertMessage);

	if (submitterBtn === "statementSaveAndDownloadBtn") {
		// dataStatement export update
		let dataStr = JSON.stringify(dataVallydette.statement);
		let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
		document.getElementById("exportStatementData").setAttribute('href', dataUri);
		document.getElementById("exportStatementData").click();
	}

	// dataVallydette export update
	jsonUpdate();

}

/**
 * Run the statement exports functions. Useful each time an update is made into the statement properties.
*/
function initStatementExports(statementResult){
	exportStatementHTML(statementResult);
	exportStatement(statementResult);
}

/**
 * XML statement export
 * @param {object} statementResult - Contains all wcag results by pages (pagesResults).
 * @param {object} langStatement - traductions keys (needed if statement lang is diffrent from global lang)
*/
exportStatement = function(statementResult) {

	var md = window.markdownit();

	var xmlStatement = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xmlStatement += '<declaration>\n';

	xmlStatement += '<!-- from la va11ydette with love -->\n\n';
	
	xmlStatement += '<!--\n ';
	xmlStatement += 'TITLE\n ';
	xmlStatement += 'This is the name for the site, or page, or section of a site that was audited\n ';
	xmlStatement += '-->\n ';

	xmlStatement += '<title><![CDATA[' + dataVallydette.statement.name + ']]></title>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'LANGUAGE\n';
	xmlStatement += 'This declaration was done in this language:\n';
	xmlStatement += '(please use proper HTML lang attribute)\n';
	xmlStatement += '-->\n';
	xmlStatement += '<lang>' + dataVallydette.statement.lang + '</lang>\n\n';

	xmlStatement += '<!-- \n';
	xmlStatement += 'STATUS\n';
	xmlStatement += 'Either being audited or having been audited\n';
	xmlStatement += 'So:\n';
	xmlStatement += '[WIP|DONE]\n';
	xmlStatement += '-->\n';

	xmlStatement += '<status>' + dataVallydette.statement.status + '</status>\n\n';
	xmlStatement += '<!--\n\n';
	xmlStatement += ' below this line will not be read if we\'re WIP, so don\'t bother filling it up\n';
	xmlStatement += '-->\n\n';

	xmlStatement += '<!--\n';
	xmlStatement += '******************************************************\n';
	xmlStatement += 'GENERAL DECLARATION INFORMATION\n';
	xmlStatement += '******************************************************\n';
	xmlStatement += '-->\n\n';

	xmlStatement += '<!--\n';
	xmlStatement += 'APPROVAL\n';
	xmlStatement += 'Name: approval name\n';
	xmlStatement += 'Content: usefull for additional information like a postal address for example. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';
	xmlStatement += '<approval>\n';
	dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => xmlStatement += '	<name>' + a.name + '</name>\n	<content>\n<![CDATA[' +  md.render(a.content) + ']]>\n</content>\n');
	xmlStatement += '</approval>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'CONTACT\n';
	xmlStatement += 'Name: contact name\n';
	xmlStatement += 'Content: full contact informations. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';
	xmlStatement += '<contact>\n';
	dataVallydette.statement.contact.filter(c => c.checked === "true").map(c => xmlStatement += '	<name>' + c.name + '</name>\n	<content>\n<![CDATA[' + md.render(c.content) + ']]>\n</content>\n');
	xmlStatement += '</contact>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'AUDIT DATE\n';
	xmlStatement += 'Format: YYYY-MM-DD\n';
	xmlStatement += '-->\n';
	xmlStatement += '<audit_date>' + dataVallydette.statement.date + '</audit_date>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'DIGITAL ACCESSIBILITY PLAN\n';
	xmlStatement += 'Plan: Paragraph for the digital accessibility plan. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';
	xmlStatement += '<plan>\n<![CDATA[' +  md.render(dataVallydette.statement.plan) + ']]>\n</plan>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'REFERENTIAL USED\n';
	xmlStatement += '-->\n';

	xmlStatement += '<referential>\n';
	xmlStatement += '	<name>WCAG</name><!-- if it\'s an abbreviation, the document template must translate it to plain text -->\n';
	xmlStatement += '	<version>2.1</version>\n';
	xmlStatement += '	<level>AA</level>\n';
	xmlStatement += '	<url>https://www.w3.org/Translations/WCAG20-fr/</url>\n';
	xmlStatement += '</referential>\n\n';

	xmlStatement += '<!--\n';
	xmlStatement += 'TECHNOLOGIES USED IN THE SITE\n';
	xmlStatement += '-->\n';

	xmlStatement += '<technologies>\n';
	dataVallydette.statement.technology.forEach(item => xmlStatement += '	<technology>' + item.name + ' ' + item.version + '</technology>\n');
	xmlStatement += '</technologies>\n\n';
		
	xmlStatement += '<!--\n';
	xmlStatement += 'TESTS PERFORMED TO EVALUATE ACCESSIBILITY\n';
	xmlStatement += 'a test can have the type [auto|manual|functional|user]:\n';
	xmlStatement += '* automatic testing\n';
	xmlStatement += '* manual testing\n';
	xmlStatement += '* functional testing\n';
	xmlStatement += '* test done by a real user\n';
	xmlStatement += '-->\n';

	xmlStatement += '<tests>\n';
	dataVallydette.statement.tests.forEach(item => xmlStatement += '	<test type="' + item.type + '">\n		<name>' + item.name + '</name>\n		<version>' + item.version + '</version>\n	</test>\n');
	
	if (dataVallydette.statement.userNumber > 0 && dataVallydette.statement.userTestDescription !== '') {
		xmlStatement += '	<test type="user">\n		<name>' + dataVallydette.statement.userTestDescription + '</name>\n		<version></version>\n	</test>\n'
	}
	
	xmlStatement += '</tests>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'ENVIRONMENTS USED TO EVALUATE ACCESSIBILITY\n';
	xmlStatement += 'Environment: an environment should indicate a user agent and an assistive technologie. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';

	xmlStatement += '<environments>\n';
	dataVallydette.statement.environments.forEach(item => xmlStatement += '	<environment><![CDATA[' + item.environment + ']]></environment>\n');
	xmlStatement += '</environments>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'URLS\n';
	xmlStatement += 'This is the list of URLs that were tested\n';
	xmlStatement += 'This is CDATA-protected, please add properly formatted HTML.\n';
	xmlStatement += '-->\n';
	xmlStatement += '<urls>\n';
	dataVallydette.checklist.page.forEach(item => xmlStatement += '	<url>\n		<name><![CDATA[' + item.name + ']]></name>\n		<location><![CDATA[' + item.url + ']]></location>\n	</url>\n');	
	xmlStatement += '</urls>\n';

	xmlStatement += '<!--\n';
	xmlStatement += '******************************************************\n';
	xmlStatement += 'END GENERAL DECLARATION INFORMATION\n';
	xmlStatement += '******************************************************\n';
	xmlStatement += 'START SPECIFIC CONFORMITY NUMBERS\n';
	xmlStatement += '******************************************************\n';
	xmlStatement += '-->\n';

	xmlStatement += '<!--\n';
	xmlStatement += 'USERS\n';
	xmlStatement += 'Number of real users that tested the pages\n';
	xmlStatement += 'and blocking points they found (if 0, the document will have to say ???with no blocking points from a user\'s point of view???\n';
	xmlStatement += '-->\n';
	xmlStatement += '<users>' + dataVallydette.statement.userNumber + '</users>\n';
	xmlStatement += '<blocking_points>' + dataVallydette.statement.userBlockingPoints + '</blocking_points>\n\n';

	if (dataVallydette.statement.results[1].checked === "true") {
		xmlStatement += '<!--\n';
		xmlStatement += 'RESULTS DETAILS\n';
		xmlStatement += '-->\n';
		xmlStatement += '<results>\n';
		xmlStatement += '	<result type="a">\n';
		xmlStatement += '		<criteria>' + dataWCAG.totalA + '</criteria>\n';
		xmlStatement += '		<ok>' + dataWCAG.conformeA + '</ok><!-- valid -->\n';
		xmlStatement += '		<nok>' + dataWCAG.nonconformeA + '</nok><!-- not valid -->\n';
		xmlStatement += '		<na>' + dataWCAG.naA + '</na><!-- not applicable -->\n';
		xmlStatement += '		<conformity>' + dataWCAG.resultA + '</conformity><!-- percentage, expressed as a number with no ???%??? sign -->\n';
		xmlStatement += '	</result>\n\n';

		xmlStatement += '	<result type="aa">\n';
		xmlStatement += '		<criteria>' + dataWCAG.totalAA + '</criteria>\n';
		xmlStatement += '		<ok>' + dataWCAG.conformeAA + '</ok><!-- valid -->\n';
		xmlStatement += '		<nok>' + dataWCAG.nonconformeAA + '</nok><!-- not valid -->\n';
		xmlStatement += '		<na>' + dataWCAG.naAA + '</na><!-- not applicable -->\n';
		xmlStatement += '		<conformity>' + dataWCAG.resultAA + '</conformity><!-- percentage, expressed as a number with no ???%??? sign -->\n';
		xmlStatement += '	</result>\n\n';

		xmlStatement += '	<result type="total">\n';
		xmlStatement += '		<criteria>' + (dataWCAG.totalA+dataWCAG.totalAA) + '</criteria>\n';
		xmlStatement += '		<ok>' + dataWCAG.nbTrueWcag + '</ok><!-- valid -->\n';
		xmlStatement += '		<nok>' + dataWCAG.nbFalseWcag + '</nok><!-- not valid -->\n';
		xmlStatement += '		<na>' + dataWCAG.nbNaWcag + '</na><!-- not applicable -->\n';
		xmlStatement += '		<conformity>' + dataWCAG.result + '</conformity><!-- percentage, expressed as a number with no ???%??? sign -->\n';
		xmlStatement += '	</result>\n';
		xmlStatement += '</results>\n\n';
	}
	
	if (dataVallydette.statement.results[0].checked === "true") {
		xmlStatement += '<!--\n';
		xmlStatement += 'Pages results details\n';
		xmlStatement += '-->\n';
		xmlStatement += '<pages_results conformity="' + dataWCAG.globalPagesResult + '">\n';
		statementResult.forEach(item => xmlStatement += '	<page name="' + utils.escape_html(item.name) + '">\n		<ok type="a">' + item.conformeA + '</ok><!-- valid -->\n		<ok type="aa">' + item.conformeAA + '</ok><!-- valid -->\n		<nok type="a">' + item.nonconformeA + '</nok> <!-- not valid -->\n		<nok type="aa">' + item.nonconformeAA + '</nok> <!-- not valid -->\n		<na type="a">' + item.naA + '</na><!-- not applicable -->\n		<na type="aa">' + item.naAA + '</na><!-- not applicable -->\n		<conformity>' + item.result + '</conformity><!-- percentage, expressed as a number with no ???%??? sign -->\n</page>\n');;
		xmlStatement += '</pages_results>\n\n';
	}
	
	xmlStatement += '<!--\n';
	xmlStatement += 'Non conformity details\n';
	xmlStatement += '-->\n';
	xmlStatement += '<details>\n';
	const listNonConformity = dataWCAG.items.filter(dataWcagResult => dataWcagResult.resultat === false);
			
			if (listNonConformity.length > 0) {
				
				for (let i in listNonConformity) {
				
					xmlStatement += '	<detail>\n';
					xmlStatement += '		<title>' + listNonConformity[i].wcag + ', ' + langStatement.wcag[listNonConformity[i].wcag] + ', ' + langVallydette.auditTxt10 + ' ' + listNonConformity[i].level + '</title>\n';
					xmlStatement += '		<description><![CDATA[';
					/** Remove undefined values */
					
					var last = 0;
					listNonConformity[i].comment = listNonConformity[i].comment.filter(x => x);
					
					if (listNonConformity[i].comment.length > 0) {
					
							for (let j in listNonConformity[i].comment) {
								last = last + 1;
								
								//xmlStatement += listNonConformity[i].comment[j] + (listNonConformity[i].comment.length !== last ? ' <br>' : '');
								
							}	
					} 
					
					xmlStatement += ']]></description>\n';
					xmlStatement += '	</detail>\n';
		
				}
				
			}
	xmlStatement += '</details>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'DEROGATIONS\n';
	xmlStatement += 'Derogations list. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';
	xmlStatement += '<derogations>\n<![CDATA[';
	xmlStatement += md.render(dataVallydette.statement.derogation);
	xmlStatement += ']]>\n</derogations>\n\n';
	
	xmlStatement += '<!--\n';
	xmlStatement += 'DEROGATIONS\n';
	xmlStatement += 'Exemptions list. This is CDATA-protected, please add properly formatted HTML. \n';
	xmlStatement += '-->\n';
	xmlStatement += '<exemptions>\n<![CDATA[';
	xmlStatement += md.render(dataVallydette.statement.exemption);
	xmlStatement += ']]>\n</exemptions>';
	
	xmlStatement += '\n\n</declaration>';

	if (dataVallydette.statement.status === "DONE") {
		
		var bb = new Blob([xmlStatement], {type: 'application/octet-stream'});
		var statementFileName = utils.slugify(dataVallydette.statement.name) + '.xml';
		
		var btnStatementXmlExport = document.getElementById("btnStatementXmlExport");
		btnStatementXmlExport.classList.remove('disabled');
		btnStatementXmlExport.setAttribute('href', window.URL.createObjectURL(bb));
		btnStatementXmlExport.setAttribute('download', statementFileName); 
		
	}

}

/**
 * HTML statement export
 * @param {object} statementResult - Contains all wcag results by pages (pagesResults).
 * @param {object} langStatement - traductions keys (needed if statement lang is diffrent from global lang)
*/
exportStatementHTML = function(statementResult) {
	
	const arrayTypeTest = ["auto", "manual", "functional", "user"];
	const listNonConformity = dataWCAG.items.filter(dataWcagResult => dataWcagResult.resultat === false);
	var statementDate = new Date(dataVallydette.statement.date);
	var localeStatementDate = statementDate.toLocaleDateString(dataVallydette.statement.lang);
	var md = window.markdownit();
	
	htmlStatement = "";
	htmlStatement = `<!DOCTYPE html>
<html lang="${dataVallydette.statement.lang}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="favicon.ico" />
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="boosted-grid.min.css">
  <link rel="stylesheet" href="pie.css">
  
  <title>${langStatement.statementTemplate.title} - ${dataVallydette.statement.name}</title>

</head>

<body>    
    <main class="container-md content">        
        <h1>${langStatement.statementTemplate.title} : ${dataVallydette.statement.name}</h1>
        
        <div class="summary">
        
            <div class="row">
        
                <div class="col-lg-3">
                        
                    <h2 class="pie" data-value="${dataWCAG.globalPagesResult}">
						<span class="visually-hidden">${langStatement.statementTemplate.state} </span> 
                        <span class="pie-val">${dataWCAG.globalPagesResult}%</span>
                    </h2>
                    
                    <p class="lead">${langStatement.statementTemplate.compliantContent1} ${dataWCAG.globalPagesResult}% ${langStatement.statementTemplate.compliantContent2}${dataVallydette.statement.userNumber > 0 ? `${langStatement.statementTemplate.resultsContent3} ${dataVallydette.statement.userBlockingPoints} ${langStatement.statementTemplate.blockingPoint1}` : `` }.
					</p>
				</div>
        
                <div class="col-lg-3">
                    
                    <h3>${langStatement.statementTemplate.auditDate}</h3>
                    <p>${localeStatementDate}</p>
                    
                    <h3>${langStatement.statementTemplate.approvalHeading}</h3>
					${dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => md.render(a.content)).join('')}
					
                    <h3>${langStatement.statementTemplate.standardHeading}</h3>
                    <p>
                       ${langStatement.statementTemplate.wcagVersion}
                    </p>
                    
                </div>
                
                <div class="col-lg-6">
                
                    <h3>${langStatement.statementTemplate.technologyHeading}</h3>
                    <ul>
						${dataVallydette.statement.technology.map(e => `<li>${e.name}${e.version.length > 0 ? ` ${e.version}` : ``}</li>`).join('\n						')}
                    </ul>
					
                    <h3>${langStatement.statementTemplate.environmentHeading}</h3>
					<p>${langStatement.statementTemplate.environmentContent}</p>
                    <ul>
						${dataVallydette.statement.environments.map(e => `<li>${e.environment}</li>`).join('\n						')}
                    </ul>
                    
                    <h3>${langStatement.statementTemplate.methodsHeading}</h3>
                    <ul>
					`;
						
					arrayTypeTest.forEach(function(t){
						
						let arrayTypeResult = dataVallydette.statement.tests.filter(e => e.type === t);
						let separator = ', '
						
						arrayTypeResult.length > 0 ? htmlStatement += `	<li><strong>${langStatement[t + "Test"]}:</strong> ${arrayTypeResult.map(e => `${e.name}${e.version.length > 0 ? ` ${e.version}` : ``}`).join(separator)}</li>\n					` : '';
						
					});
					
					if (dataVallydette.statement.userNumber > 0 && dataVallydette.statement.userTestDescription !== '') {
						htmlStatement += `<li><strong>${langStatement.userTest}:</strong> ${dataVallydette.statement.userTestDescription}</li>`
					}
	
	htmlStatement += `</ul>
                
                </div>
            
            </div>
            
        </div>
        
        <div class="row">
        
            <div class="col-md">
				
				<h2 class="h4 mt-4">${langStatement.statementTemplate.contextHeading}</h2>
				${md.render(dataVallydette.statement.plan)}
				
				<h2 class="h4 mt-4">${langStatement.statementTemplate.pagesHeading}</h2>
                
                <p>${langStatement.statementTemplate.pagesContent}</p>
				
                <ol>
					${dataVallydette.checklist.page.map(item => `<li><strong>${item.name} : </strong>${item.url}</li>`).join('\n					')}
				</ol>
                
						
            </div>
            
            <div class="col-md">
				<h2 class="h4 mt-4">${langStatement.statementTemplate.resultsHeading}</h2>`;
				
			if (dataVallydette.statement.results[0].checked === "true") {
               htmlStatement += ` <p>
				${langStatement.statementTemplate.resultsContent1}${dataWCAG.globalPagesResult}${langStatement.statementTemplate.resultsContent2}${dataVallydette.statement.userNumber > 0 ? `${langStatement.statementTemplate.resultsContent3}${dataVallydette.statement.userBlockingPoints}${langStatement.statementTemplate.resultsContent4}` : `` }).
				</p>
				<p id="table-description" aria-hidden="true">
				${langStatement.statementTemplate.resultsContent5}
				</p>
				
                <table class="table table-striped" aria-describedby="table-description">
				<caption class="visually-hidden">${langStatement.auditTxt4}</caption>
				  <tr>
					<th scope="row">${langStatement.auditTxt17} / ${langStatement.auditTxt10}</th>
					<th scope="col" class="text-center">${langStatement.compliant} / A</th>
					<th scope="col" class="text-center">${langStatement.compliant} / AA</th>
					<th scope="col"class="text-center">${langStatement.nonCompliant} / A</th>
					<th scope="col"class="text-center">${langStatement.nonCompliant} / AA</th>
					<th scope="col" class="text-center">${langStatement.notApplicable} / A</th>
					<th scope="col" class="text-center">${langStatement.notApplicable} / AA</th>
					<th scope="col" class="text-center bg-light">${langStatement.auditTxt8}</th>
				  </tr>
				 
				
				  ${statementResult.map(r => 
					`<tr>
						<th scope="row"><span class="visually-hidden">Page : </span>${r.name}</th>
						<td>${r.conformeA}</td>
						<td>${r.conformeAA}</td>
						<td>${r.nonconformeA}</td>
						<td>${r.nonconformeAA}</td>
						<td>${r.naA}</td>
						<td>${r.naAA}</td>
						<td style="background-color:#ddd !important;">${r.result} %</td>
					</tr>`
					  
					).join('')}
				  
				</table>
				
				<p><strong>${langStatement.statementTemplate.resultsContent6}</strong> ${dataWCAG.globalPagesResult}${langStatement.statementTemplate.resultsContent7}</p>
				`;
	
			}
			
			if (dataVallydette.statement.results[1].checked === "true") {
               htmlStatement += `
				<p>
				${langStatement.statementTemplate.resultsContent1}${dataWCAG.result}${langStatement.statementTemplate.resultsContent8}${dataVallydette.statement.userNumber > 0 ? `${langStatement.statementTemplate.resultsContent3}${dataVallydette.statement.userBlockingPoints}${langStatement.statementTemplate.resultsContent4}` : `` }).
				</p>	

				<table class="table table-striped"><caption class="visually-hidden">${langStatement.auditTxt15}</caption>
					<thead><tr>
						<th scope="row">${langStatement.auditTxt10}</th>
						<th scope="col" class="text-center">A</th>
						<th scope="col" class="text-center">AA</th>
						<th scope="col" class="text-center">Total</th>
					</tr></thead>
				<tbody>
				
				<tr>
					<th scope="row" class="font-weight-bold">${langStatement.criteriaNumber}</th>
					<td class="text-center">${dataWCAG.totalA}</td>
					<td class="text-center">${dataWCAG.totalAA}</td>
					<td class="text-center">${(dataWCAG.totalA+dataWCAG.totalAA)}</td>
				</tr>
				
				<tr>
					<th scope="row" class="font-weight-bold">${langStatement.compliant}</th>
					<td class="text-center">${dataWCAG.conformeA}</td>
					<td class="text-center">${dataWCAG.conformeAA}</td>
					<td class="text-center">${dataWCAG.totalconforme}</td>
				</tr>
				
				<tr>
					<th scope="row" class="font-weight-bold">${langStatement.nonCompliant}</th>
					<td class="text-center">${dataWCAG.nonconformeA}</td>
					<td class="text-center">${dataWCAG.nonconformeAA}</td>
					<td class="text-center">${dataWCAG.totalnonconforme}</td>
				</tr>
				
				<tr>
					<th scope="row" class="font-weight-bold">${langStatement.notApplicable}</th>
					<td class="text-center">${dataWCAG.naA}</td>
					<td class="text-center">${dataWCAG.naAA}</td>
					<td class="text-center">${(dataWCAG.naA+dataWCAG.naAA)}</td>
				</tr>
				
				<tr>
					<th scope="row" class="font-weight-bold bg-light">${langStatement.auditTxt16}</th>
					<td class="text-center bg-light">
						${(!isNaN(dataWCAG.resultA) && dataWCAG.result!=="NA") ? `${dataWCAG.resultA}% ` : ``}		
					</td>
					<td class="text-center bg-light">
						${(!isNaN(dataWCAG.resultAA) && dataWCAG.result!=="NA") ? `${dataWCAG.resultAA}% ` : ``}	
					</td>
					<td class="text-center bg-light">
						${(!isNaN(dataWCAG.result) && dataWCAG.result!=="NA") ? `${dataWCAG.result}% ` : ``}
					</td>
				</tr>
				
				</tbody>
				</table>`;
			}
			
		htmlStatement += `		
            </div>
        </div>
        
        <div class="row">
        
            <div class="col-lg">
                <h3 class="h6 mt-4">${langStatement.statementTemplate.noncompliancesHeading}</h3>`;
		
				if (listNonConformity.length > 0) {
					htmlStatement += `
					<ul>
					${listNonConformity.map(nc => 
						`	<li>
							${nc.wcag} ${langStatement.wcag[nc.wcag]}, ${langStatement.auditTxt10} ${nc.level}
						</li>`).join('\n					')}
					</ul>`;
	
				} else {
					htmlStatement += `<p>${langStatement.statementTemplate.noNonCompliance}</p>`;
				}
	
	
	
    htmlStatement += `
            </div>
        </div>`;
		
	if (dataVallydette.statement.derogation !== "") {
		htmlStatement += `<div class="row">
        
            <div class="col-lg">
        
                <h3 class="h6 mt-4">${langStatement.statementTemplate.derogationsHeading}</h3>
				
				${md.render(dataVallydette.statement.derogation)}

		</div>
		</div>`;
		
	}
	
	if (dataVallydette.statement.exemption !== "") {
		htmlStatement += `<div class="row">
        
            <div class="col-lg">
        
                <h3 class="h6 mt-4">${langStatement.statementTemplate.exemptionsHeading}</h3>
				
				${md.render(dataVallydette.statement.exemption)}

		</div>
		</div>`;
		
	}		
    htmlStatement += `    <div class="row">
        
            <div class="col-lg">
        
                <h2 class="h4 mt-4">${langStatement.statementTemplate.contactsHeading}</h2>
				
				${dataVallydette.statement.contact.filter(c => c.checked === "true").map(c => md.render(c.content)).join('')}

			</div>
        </div>
		<div class="row">
        
            <div class="col-lg">
        
                <h2 class="h4 mt-4">${langStatement.statementTemplate.legalHeading}</h2>
				<p>${langStatement.statementTemplate.legalContent}</p>
				<ul>
					<li>${langStatement.statementTemplate.legalList1}</li>
					<li>${langStatement.statementTemplate.legalList2}</li>
					<li>${langStatement.statementTemplate.legalList3}</li>
				</ul>

			</div>
        </div>
    </main>
</body>

</html>`;
	
	
	if (dataVallydette.statement.status === "DONE") {
		
		var bb = new Blob([htmlStatement], {type: 'application/octet-stream'});
		var statementFileName = utils.slugify(dataVallydette.statement.name) + '.html';
		
		var btnStatementHtmlExport = document.getElementById("btnStatementHtmlExport");
		btnStatementHtmlExport.classList.remove('disabled');
		btnStatementHtmlExport.setAttribute('href', window.URL.createObjectURL(bb));
		btnStatementHtmlExport.setAttribute('download', statementFileName); 
		
	
	}
}

 /**
 * Some utilities funtions.
 */
const utils = {
  reqError: function (err) {
	//let htmlMainContent = document.getElementById('mainContent');
	
    htmlMainContent.innerHTML = '<div id="alertMsg" class="alert alert-danger mt-2"> <span class="alert-icon"><span class="visually-hidden" lang="en">Warning</span></span>' + langVallydette.errorJson + '</div>';
  },
  formatHeading: function (str) {
    return str.toLowerCase()
		.replace(/??|??|??/g, "e")
		.replace(/ /g, "-")
		.replace(/\(|\)/g, "");
  },
  slugify: function (str) {
    return str.toString().toLowerCase()
        .replace(/(\w)\'/g, '$1')       
        .replace(/[^a-z0-9_\-]+/g, '-')
        .replace(/\-\-+/g, '-') 
        .replace(/^-+/, '')
        .replace(/-+$/, '');
  },
  escape_html: function (str) {
    var map = {
    '&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#039;'
	};

	return str.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
  },
  putTheFocus: function (e) {
	e.setAttribute("tabindex", "-1");
	e.focus();
  },
  resetActive: function (e) {
	var btnActive = e.querySelector(".active");
		if (btnActive != undefined) {
			btnActive.classList.remove("active");
			btnActive.removeAttribute("aria-current");
		}
  },
  setActive: function (e) {
	e.classList.add("active");
	e.setAttribute("aria-current", "true");
  },
  setPageTitle: function (e) {
	document.title = e + " ??? " + ((dataVallydette) ? dataVallydette.checklist.name + " ??? " : '') + langVallydette.va11ydette;
  },
  listOrParagraph: function (e) {
	let htmlMarker;
	if (e.length > 1) {
		htmlMarker = "<ol>";
		e.forEach(function(content){
			htmlMarker += "<li>"+content+"</li>";
		})
		htmlMarker += "</ol>";
	} else {
		htmlMarker = "<p>"+e+"</p>";
	}
	return htmlMarker;
  },
  removeElement: function (e) { 
	if(e){
		e.parentNode.removeChild(e); 
	}
       
  },
 fileName: function (ext) { 
	if(ext){
		let defaultName = document.getElementById("checklistName");
		defaultName = utils.slugify(defaultName.innerText);

		let todayDate = new Date();
		let date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();

		let todayHour = new Date();
		let time = todayHour.getHours() + "-" + todayHour.getMinutes() + "-" + todayHour.getSeconds();

		let exportFileDefaultName = defaultName + '-' + date + '-' + time + '.' + ext;
		
		return exportFileDefaultName;
	}
  },
 addElement: function (type,  id, innerText, icon, iconOnly, arrayClass, title) { 
	var e = document.createElement(type);
	
	if (icon) {
		e.innerHTML = icon;
	}
	
	if (!iconOnly) {
		e.innerHTML += innerText;
	} else {
		e.setAttribute('aria-label', innerText);
	}
	
	e.setAttribute('id', id);
	if (title) {
		e.setAttribute('title', title);
	}


	arrayClass.forEach(c => e.classList.add(c));
	
	return e;
	
  },
  columnDisplay: function (number) {
	
	let display;
	let remove;
	let add;
	
	if (number === 2) {
		  
		display = 'none';
		remove = 'col-md-8';
		add = 'col-md-10';
		
	} else if (number === 3) {
		  
		display = 'block';
		remove = 'col-md-10';
		add = 'col-md-8';
		
	} else {
		
		return
		
	}

	  
	document.getElementById('filter').style.display = display;
	document.getElementById('currentPageContent').classList.remove(remove);
	document.getElementById('currentPageContent').classList.add(add);
  },
  htmlEntities: function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  escapeExcel: function (url){
		return url.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			return '&#'+i.charCodeAt(0)+';';
		});
	},
  getUrlAnchor: function(item){
		let urlanchor = window.location.origin + window.location.pathname + window.location.search + '#heading' + item.ID;
		return utils.escapeExcel(urlanchor);
  }
	
}  

//default builder
initVallydetteApp('', 'fr');

