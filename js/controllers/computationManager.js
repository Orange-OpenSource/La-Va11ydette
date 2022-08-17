/**
 * Computation manager
 * Conformity computation functions
*/

/**  
*	Initialization properties, needed for computation.
*	@param {object} item - items (rules) 
*/
initProperties = function (item) {
	item.resultat = 'nt';
	item.comment = [];
	item.page = [];
}

/**
 * Computation initialization. The dataWcag object is downloaded.
 * 
 * Load data wcag
 * 
*/
function initComputationWcag() {

	var matriceRequest = new XMLHttpRequest();
    method = "GET",
	matriceVallydette = 'json/wcag-' + globalLang+ '.json';

	matriceRequest.open(method, matriceVallydette, true);
	matriceRequest.onreadystatechange = function () {
	  if(matriceRequest.readyState === 4 && matriceRequest.status === 200) {
			dataWCAG = JSON.parse(matriceRequest.responseText);
			
			dataWCAG.items.forEach(initRulesAndTests);

            var btnShowResult = document.getElementById("btnShowResult");
            btnShowResult.addEventListener('click', function () {
				runComputationWcag();
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
 * Computation initialization. The dataWcag object is downloaded.
 * 
 * Load data wcag
 * 
*/
function initComputationRGAA(){

	dataRGAA ={
		items:[]
	}

	dataVallydette.checklist.page[0].items.forEach(element =>{
		testObj={};
		testObj.name = element.title;
		testObj.comment = [];
		testObj.page = [];
		testObj.resultat = "nt";
		dataRGAA.items.push(testObj)

	})


	var btnShowResult = document.getElementById("btnShowResult");
            btnShowResult.addEventListener('click', function () {
				runComputationRgaa();
				utils.setPageTitle(langVallydette.auditResult);
				utils.resetActive(document.getElementById("pageManager"));
				utils.putTheFocus(document.getElementById("pageName"));
				initAnchorMenu()
				/*runComputationWcag();
				utils.setPageTitle(langVallydette.auditResult);
				utils.resetActive(document.getElementById("pageManager"));
				utils.putTheFocus(document.getElementById("pageName"));
				initAnchorMenu()
				*/
            }, false);
	runTestListMarkup(dataVallydette.checklist.page[currentPage].items);
		if(window.location.hash !== ""){
			document.getElementById(window.location.hash.substring(1)).scrollIntoView();
		}
	
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
 * Pass through dataVallydette to build the pageResults array, which contains the Rgaa results for each pages.
 * @return {array} pagesResults - Contains all Rgaa results by pages.
*/
function runComputationRgaa(){
	
	/**
	* @param {array} pagesResults - Contains all wcag results by pages.
	*/
    pagesResults = [];

	dataRGAA.items.forEach(initProperties);

	for (let i in dataVallydette.checklist.page) {
		pagesResults[i] = [];
        pagesResults[i].items = [];
        pagesResults[i].name = dataVallydette.checklist.page[i].name;
		pagesResults[i].url = dataVallydette.checklist.page[i].url;


			

			for (let j in dataVallydette.checklist.page[i].items) {
				pagesResults[i].items[j] = {};
			   
				pagesResults[i].items[j].complete = true;
				pagesResults[i].items[j].name = dataRGAA.items[j].name;
				pagesResults[i].items[j].resultat = "nt";
						
				testObj = {};
				testObj.title = dataVallydette.checklist.page[i].items[j].title;
				testObj.result = dataVallydette.checklist.page[i].items[j].resultatTest;
				
				if (dataVallydette.checklist.page[i].items[j].resultatTest === "nt") {
					pagesResults[i].items[j].complete = false;
				}

				if (dataVallydette.checklist.page[i].items[j].resultatTest === "ko") {

					dataRGAA.items[j].resultat = false;
					if(dataVallydette.checklist.page[i].items[j].issues.length >0){
						dataVallydette.checklist.page[i].items[j].issues.forEach(issue => {
							dataRGAA.items[j].comment.push(issue.issueTitle);
							dataRGAA.items[j].page.push(pagesResults[i].name);
						});
					}
					}

				if (pagesResults[i].items[j].resultat) {
					if (dataVallydette.checklist.page[i].items[j].resultatTest === "ok") {
						
						pagesResults[i].items[j].resultat = true;
						if (dataRGAA.items[j].resultat !== false) {

							dataRGAA.items[j].resultat = true;
						}

						
					} else if (dataVallydette.checklist.page[i].items[j].resultatTest === "ko") {
						pagesResults[i].items[j].resultat = false;

						
						
					} else if ((dataVallydette.checklist.page[i].items[j].resultatTest === "na") && (pagesResults[i].items[j].resultat === "nt")) {
						pagesResults[i].items[j].resultat = "na";
						
						if (dataRGAA.items[j].resultat !== false && dataRGAA.items[j].resultat !== true ) {
							dataRGAA.items[j].resultat = "na";
						}

						
					} 

				}	
			}
	}

	pagesResults = pagesResultsComputationRGAA(pagesResults);
	dataRGAAComputation();

	
	
		
	return runFinalComputationRGAA(pagesResults);

}

/**
 * Pass through both dataVallydette et dataWCAG to build the pageResults array, which contains the wcag results for each pages.
 * @param {boolean} obj - if true, function returns only the full pagesResults object (with test title) whitout running the final computation
 * @return {array} pagesResults - Contains all wcag results by pages.
*/
function runComputationWcag(obj) {

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
				}
			
        }
    }
	
	pagesResults = pagesResultsComputationWcag(pagesResults);
	dataWCAGComputation();

	
	
	if (obj) {
		return pagesResults;
	} else {		
		return runFinalComputationWcag(pagesResults);
	}

}

   /**
 * Run all the computation per pages, from the results collected into pagesResults array
 * @param {array} pagesResultsArray - Contains all wcag results by pages.
 * @return {array} pagesResultsArray - Contains all wcag results by pages, and the diffrents results
*/
function pagesResultsComputationWcag(pagesResultsArray) {
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
 * Run all the computation per pages, from the results collected into pagesResults array
 * @param {array} pagesResultsArray - Contains all rgaa results by pages.
 * @return {array} pagesResultsArray - Contains all rgaa results by pages, and the diffrents results
*/
function pagesResultsComputationRGAA(pagesResultsArray) {
	var finalTotal = 0;
    var finalResult = 0;
    var nbPage = 0;
	for (let i in pagesResultsArray) {
        var nbTrue = 0;
        var nbFalse = 0;
        var nbNA = 0;
        var nbTotal = 0;

		/**
		 * 	Gets the number of true, false, non-applicable and non-tested by pages.
		 *  If one result is non-tested, then the property 'complete' is passed false, and the final result is not displayed (only the number of non-tested items).
		*/
		for (let j in pagesResultsArray[i].items) {
			if (pagesResultsArray[i].items[j].resultat === true) {
				nbTrue++;
				nbTotal++;

			} else if (pagesResultsArray[i].items[j].resultat === false) {
				nbFalse++;
				nbTotal++;
			} else if (pagesResultsArray[i].items[j].resultat === 'na') {
				nbNA++;

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


		pagesResultsArray[i].totalconforme = nbTrue;
		pagesResultsArray[i].totalnonconforme = nbFalse;
		pagesResultsArray[i].totalnA = nbNA;
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
	dataRGAA.globalPagesResult = finalResult;
	
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
	
		dataWCAG.nbTotalWcag = dataWCAG.items.filter(item => (item.resultat === true || item.resultat === false) && item.level!=="AAA").length;
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
	*  Get the number of true, false, non-applicable and non-tested by wcag level only.
	*  If one result is non-tested, then the property 'complete' is passed false, and the final result is not displayed (only the number of non-tested items).
*/
function dataRGAAComputation() {
	

	dataRGAA.complete = true;


	dataRGAA.nbTotalRGAA = dataRGAA.items.filter(item => (item.resultat === true || item.resultat === false) && item.level!=="AAA").length;
	dataRGAA.nbTrueRGAA = dataRGAA.items.filter(item => item.resultat === true).length;
	dataRGAA.nbFalseRGAA = dataRGAA.items.filter(item => item.resultat === false).length;
	dataRGAA.nbNaRGAA = dataRGAA.items.filter(item => item.resultat === "na").length;

	/**
	* 	If all the wcag are non-applicables (hypothetical but tested)
	*/ 
	if (dataRGAA.nbTotalWcag===0 && dataRGAA.nbNaWcag>0) {
		dataRGAA.result = "NA";
	} else {
		dataRGAA.result = Math.round((dataRGAA.nbTrueRGAA / dataRGAA.nbTotalRGAA) * 100);
	}
	
}
