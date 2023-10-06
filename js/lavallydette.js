/* 

Software Name: La Va11ydette
SPDX-FileCopyrightText: Copyright (c) 2016-2023 Orange
SPDX-License-Identifier: MIT License

This software is distributed under the MIT licens

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
 * @param {object} dataRGAA - Object, that contains the criteres RGAA.
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
var checklistVallydette={};
var issuesVallydette={};

var globalLang;
var globalTemplate;
var globalVersion;

var dataWCAG;
var dataRGAA;

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
	history: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"> <defs> <style> .cls-1 { fill-rule: evenodd; } </style> </defs> <path id="History" class="cls-1" d="M492.08,450.63c0.86-.14,1.72-0.26,2.59-0.34C493.8,450.38,492.94,450.49,492.08,450.63ZM550,300a50,50,0,0,0-100,0V500c0,1.41.06,2.82,0.18,4.22,0.1,1.14.23,2.27,0.4,3.39,0.03,0.15.05,0.29,0.07,0.44,0.14,0.86.31,1.73,0.49,2.58s0.39,1.67.61,2.5a1.209,1.209,0,0,1,.05.18c0.12,0.41.23,0.82,0.36,1.23,0.11,0.38.23,0.76,0.35,1.13,0.17,0.51.35,1.01,0.53,1.52,0.3,0.81.62,1.62,0.96,2.42a46.731,46.731,0,0,0,2.04,4.22c0.19,0.35.39,0.7,0.59,1.05s0.4,0.7.61,1.04c0.63,1.02,1.28,2.02,1.97,3l0.02,0.02c0.69,0.98,1.43,1.94,2.19,2.86,0.26,0.31.52,0.61,0.78,0.92,0.78,0.9,1.6,1.78,2.45,2.63,0.28,0.28.57,0.56,0.86,0.84s0.58,0.55.88,0.82,0.59,0.53.89,0.79c0.23,0.21.47,0.41,0.71,0.61l0.21,0.17,119.79,99.83a50,50,0,0,0,64.02-76.82L550,476.58m-98.72,12.13c0.26-1.14.57-2.28,0.92-3.42C451.86,486.41,451.55,487.55,451.28,488.71Zm40.8-38.08c0.86-.14,1.72-0.26,2.59-0.34C493.8,450.38,492.94,450.49,492.08,450.63Zm19.26,0.66c1.14,0.27,2.26.57,3.36,0.91C513.59,451.86,512.47,451.56,511.34,451.29Zm-60.06,37.42c0.26-1.14.57-2.28,0.92-3.42C451.86,486.41,451.55,487.55,451.28,488.71Zm5.96,37.21c0.63,1.02,1.28,2.02,1.97,3C458.51,527.94,457.86,526.94,457.24,525.92Zm4.18,5.88c-0.77-.93-1.51-1.88-2.19-2.86C459.92,529.92,460.66,530.88,461.42,531.8Zm3.23,3.55c-0.87-.85-1.68-1.73-2.45-2.63C462.98,533.62,463.8,534.5,464.65,535.35ZM500,75c-136.475,0-257.923,64.329-335.683,164.317L75,150V344.444h0.314A50.507,50.507,0,0,0,75,350a49.955,49.955,0,0,0,55.556,49.685V400H325l-89.253-89.253A326.775,326.775,0,0,1,373.526,200.5,325.465,325.465,0,1,1,175,500h0V475h0a25,25,0,0,0-25-25H100a25,25,0,0,0-25,25h0v25h0c0,234.721,190.279,425,425,425S925,734.721,925,500,734.721,75,500,75Z"/> </svg>',
	link: '<svg aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path class="cls-1" d="M587.422,132.923L412.634,307.711A248.078,248.078,0,0,1,537.9,322.28L657.342,202.842A98.881,98.881,0,0,1,797.181,342.681l-174.8,174.8a98.881,98.881,0,0,1-139.838,0,49.441,49.441,0,1,0-69.92,69.919h0c77.231,77.231,202.447,77.231,279.678,0L867.1,412.6c77.231-77.231,77.231-202.447,0-279.678h0C789.869,55.692,664.653,55.692,587.422,132.923Zm-174.8,734.154L587.413,692.288a248.056,248.056,0,0,1-125.27-14.569L342.7,797.158A98.881,98.881,0,0,1,202.865,657.319l174.8-174.8a98.883,98.883,0,0,1,139.839,0A49.44,49.44,0,1,0,587.422,412.6h0c-77.23-77.23-202.446-77.23-279.677,0l-174.8,174.8c-77.231,77.231-77.231,202.447,0,279.678h0C210.177,944.308,335.393,944.308,412.624,867.077Z"/></svg>',
	link_external:'<svg aria-hidden="true" focusable="false" fill="currentColor" width="20" height="20" xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000"><defs><style>.cls-1 {fill-rule: evenodd;}</style></defs><path id="External_Link" data-name="External Link" class="cls-1" d="M725,756.25A43.879,43.879,0,0,1,681.25,800H243.75A43.879,43.879,0,0,1,200,756.25V318.75A43.879,43.879,0,0,1,243.75,275H512.868l75-75H215c-49.5,0-90,40.5-90,90V785c0,49.5,40.5,90,90,90H710c49.5,0,90-40.5,90-90V412.132l-75,75V756.25ZM820.36,125H574.479L656.5,207.021,491.152,372.369a55.157,55.157,0,0,0,0,77.988l58.491,58.491a55.157,55.157,0,0,0,77.988,0L792.979,343.5,875,425.521V179.64A54.64,54.64,0,0,0,820.36,125Z"/></svg>',
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
		objChecklist=JSON.parse(checklistRequest.responseText);
		for(const[key, value] of Object.entries(objChecklist)){
			if(objChecklist[key]["name-" + globalLang] ===""){
				delete objChecklist[key];
			}
		}
		checklistVallydette = objChecklist;

		if (currentCriteriaListName) {
			initAuditPage();
			createObjectAndRunVallydette();
			loadIssue();
			
		} else {
			if(window.location.pathname.indexOf('user-guide')==-1){
				initHomePage();
			}
				
		}

		initMainMenu();
		localizeHTML();
		
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
			"goodPractice": (localStorage.getItem('goodPractice') === null ? true : JSON.parse(localStorage.getItem('goodPractice')) ),
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
			return importCriteriaToVallydetteObj(criteriaVallydette);

		  } else if (criteriaRequest.status === 404) {
				utils.reqError();
			
			}
		};
		
		criteriaRequest.send();

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
 *  Once the vallydette object is ready, the vallydette app can be run :
	Initialization of some string var and run multiple init functions.
 */
function runVallydetteApp() {
  
	currentPage = 0;
	
	/** @todo to be replaced by a localization object */
	textContent = {
        title1: "Procédures",
		title2: "À vérifier",
		title3: "Résultats",
		title4: "Justification",
		statut1: "conforme",
		statut2: "non-conforme",
		statut3: "non-applicable",
		statut4: "non-testé"
     };

	
	arrayFilterNameAndValue = [[langVallydette.template.status1, "ok"], [langVallydette.template.status2, "ko"], [langVallydette.template.status3, "na"], [langVallydette.template.status4, "nt"]];
	

	// @todo à supprimer dans le futur 08/08/2022
	if (globalTemplate==="audit") {
		arrayProfileNameAndValue = uniqueEntry(dataVallydette.checklist.page[0].items,"profils");
		arrayTypeNameAndValue = uniqueEntry(dataVallydette.checklist.page[0].items, "type");
	}

	
	var HeadingChecklistName = document.getElementById("checklistName");
	HeadingChecklistName.innerText = dataVallydette.checklist.name;
	

	switch(globalTemplate){
		case "wcag":
			initComputationWcag();
			break;
			case "audit":
				initComputationWcag();
				break;
			case "rgaa":
				initComputationRGAA();
				break;
	}
	
    initPagination(dataVallydette.checklist);
	initFilters();
  
	
    updateCounter(false, dataVallydette.checklist.page[currentPage].items.length);
	utils.setPageTitle( dataVallydette.checklist.page[currentPage].name);
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
 * Run each time an updated is made to the vallydette object, in order to update the export informations.
 */
jsonUpdate = function () {

	dataVallydette.checklist.timestamp = Date.now();
	let dataStr = JSON.stringify(dataVallydette);

	linkElement = document.getElementById("export");
	linkElement.classList.remove("disabled");
	linkElement.removeAttribute('disabled');
	linkElement.setAttribute('aria-disabled', false);

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
 * Some utilities funtions.
 */
const utils = {
  reqError: function (err) {
	//let htmlMainContent = document.getElementById('mainContent');
	
    htmlMainContent.innerHTML = '<div id="alertMsg" class="alert alert-danger mt-2"> <span class="alert-icon"><span class="visually-hidden" lang="en">Warning</span></span>' + langVallydette.errorJson + '</div>';
  },
  formatHeading: function (str) {
    return str.toLowerCase()
		.replace(/é|è|ê/g, "e")
		.replace(/ /g, "-")
		.replace(/'/g, "")
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
	document.title = e + " — " + ((dataVallydette) ? dataVallydette.checklist.name + " — " : '') + langVallydette.va11ydette + " Orange";
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

