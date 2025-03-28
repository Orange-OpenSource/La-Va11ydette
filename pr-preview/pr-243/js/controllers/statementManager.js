/**
 * Statement manager to generate declaration
 * @param {array} statementObjectProperties - list all the statement object properties
 * @param {array} statementProperties - list of the properties updated from popin form
 * @param {array} statementInputs - list of the input type properties
 * @param {object} langStatement - traductions keys (needed if statement lang is diffrent from global lang)
 */
const statementObjectProperties = ["name", "app", "lang", "status", "date", "dateUpdate", "nonCompliant", "results", "plan", "userNumber", "userBlockingPoints", "userTestDescription", "approval", "contact", "compliantStateComment", "derogation", "exemption", "nonCompliantComment", "technology", "tests", "environments"];
const statementProperties = ["name", "type", "version", "content", "email", "checked", "environment"];
const statementInputs = ["name", "app", "lang", "date", "dateUpdate", "userNumber", "userBlockingPoints", "userTestDescription", "plan", "compliantStateComment", "derogation", "exemption", "nonCompliantComment"];
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
            if (langRequest.readyState === 4 && langRequest.status === 200) {
                langStatementRequest = JSON.parse(langRequest.responseText);

                langStatement = langStatementRequest;

            }
        };
        langRequest.send();

    } else {

        langStatement = langVallydette;

    }

    statementObjectProperties.forEach(function (p) {
        if (!dataVallydette.statement.hasOwnProperty(p)) {
            if (p === "name") {
                dataVallydette.statement.name = "";
            }
            if (p === "app") {
                dataVallydette.statement.app = "";
            }
            if (p === "status") {
                dataVallydette.statement.status = "WIP";
            }
            if (p === "date") {
                dataVallydette.statement.date = "";
            }
            if (p === "dateUpdate") {
                dataVallydette.statement.dateUpdate = "";
            }
            if (p === "nonCompliant") {
                dataVallydette.statement.nonCompliant = false;
            }
            if (p === "plan") {
                dataVallydette.statement.plan = langVallydette.accessibilityPlanText;
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
                    "content": "",
                    "checked": "true"
                }, {
                    "name": langStatement.internalService,
                    "content": "",
                    "checked": "false"
                }
                ];
            }
            if (p === "contact") {
                dataVallydette.statement.contact = [{
                    "name": "Orange France",
                    "content": langStatement.textService,
                    "checked": "true"
                },
                    {
                        "name": langStatement.orangeGroup,
                        "content": langStatement.textService,
                        "checked": "false"
                    }
                ];
            }
            if (p === "compliantStateComment") {
                dataVallydette.statement.compliantStateComment = "";
            }
            if (p === "derogation") {
                dataVallydette.statement.derogation = "";
            }
            if (p === "exemption") {
                dataVallydette.statement.exemption = "";
            }
            if (p === "nonCompliantComment") {
                dataVallydette.statement.nonCompliantComment = "";
            }
            if (p === "userTestDescription") {
                dataVallydette.statement.userTestDescription = langStatement.userTestingContent;

            }
            if (p === "technology") {
                if (dataVallydette.checklist.referentiel === "wcag-web") {
                    dataVallydette.statement.technology = [{
                        "name": "HTML",
                        "version": ""
                    }, {
                        "name": "CSS",
                        "version": ""
                    }, {
                        "name": "JavaScript",
                        "version": ""
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-android") {
                    dataVallydette.statement.technology = [{
                        "name": "Java",
                        "version": ""
                    }, {
                        "name": "Kotlin",
                        "version": ""
                    }, {
                        "name": "XML",
                        "version": ""
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-ios") {
                    dataVallydette.statement.technology = [{
                        "name": "Swift",
                        "version": ""
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-pdf") {
                    dataVallydette.statement.technology = [{
                        "name": "PDF",
                        "version": ""
                    }];
                }
            }
            if (p === "tests") {
                if (dataVallydette.checklist.referentiel === "wcag-web") {
                    dataVallydette.statement.tests = [{
                        "type": "auto",
                        "name": "aXe",
                        "version": "4.7.2"
                    },
                        {
                            "type": "auto",
                            "name": "Wave",
                            "version": "3.2.4"
                        },
                        {
                            "type": "functional",
                            "name": "NVDA",
                            "version": "2023.3"
                        },
                        {
                            "type": "functional",
                            "name": langStatement.keyboardNavigation,
                            "version": ""
                        }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-android") {
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
                            "name": "Switch Access",
                            "version": ""
                        }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-ios") {
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
                if (dataVallydette.checklist.referentiel === "wcag-pdf") {
                    dataVallydette.statement.tests = [
                        {
                            "type": "functional",
                            "name": "NVDA",
                            "version": "2023.3"
                        },
                        {
                            "type": "functional",
                            "name": "Acrobat",
                            "version": ""
                        },
                        {
                            "type": "functional",
                            "name": "PAC",
                            "version": ""
                        },
                        {
                            "type": "functional",
                            "name": langStatement.keyboardNavigation,
                            "version": ""
                        }];
                }
            }
            if (p === "environments") {
                if (dataVallydette.checklist.referentiel === "wcag-web") {
                    dataVallydette.statement.environments = [{
                        "environment": langStatement.environmentEx1
                    }, {
                        "environment": langStatement.environmentEx2
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-android") {
                    dataVallydette.statement.environments = [{
                        "environment": langStatement.environmentEx3
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-ios") {
                    dataVallydette.statement.environments = [{
                        "environment": langStatement.environmentEx4
                    }];
                }
                if (dataVallydette.checklist.referentiel === "wcag-pdf") {
                    dataVallydette.statement.environments = [{
                        "environment": langStatement.environmentEx1
                    }, {
                        "environment": langStatement.environmentEx2
                    }];
                }
            }
        }
    });

    setTimeout(() => {
        showStatementWizard();
        initAnchorMenu();
    }, "100")


}

/**
 * Init the statement page
 *
 */
function showStatementWizard() {

    setPageName(langVallydette.statementExport);
    utils.setPageTitle(langVallydette.statementTxt1);
    removeContextualMenu();
    removeFilterSection();
    utils.columnDisplay(2);

    var btnStatementXmlExport = document.createElement('a');
    btnStatementXmlExport.innerHTML = "XML";
    btnStatementXmlExport.setAttribute('id', "btnStatementXmlExport");
    btnStatementXmlExport.setAttribute('title', langVallydette.xmlBtn);
    btnStatementXmlExport.setAttribute('aria-label', langVallydette.xmlBtn);
    btnStatementXmlExport.classList.add("btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none");
    document.getElementById("contextualMenu").appendChild(btnStatementXmlExport);

    var btnStatementHtmlExport = document.createElement('a');
    btnStatementHtmlExport.innerHTML = "HTML";
    btnStatementHtmlExport.setAttribute('id', "btnStatementHtmlExport");
    btnStatementHtmlExport.setAttribute('title', langVallydette.htmlBtn);
    btnStatementHtmlExport.setAttribute('aria-label', langVallydette.htmlBtn);
    btnStatementHtmlExport.classList.add("btn", "btn-secondary", "btn-icon", "ms-2", "d-print-none");
    document.getElementById("contextualMenu").appendChild(btnStatementHtmlExport);


    var statementResult = runComputationWcag(true);
    if (dataWCAG.complete === true) {
        dataVallydette.statement["nonCompliant"] = false;
    }
    if ((dataWCAG.complete === true && dataVallydette.statement.status === "DONE") || (dataVallydette.statement["nonCompliant"] === true && dataVallydette.statement.status === "DONE")) {

        initStatementExports(statementResult);

    } else {

        btnStatementXmlExport.classList.add("disabled");
        btnStatementHtmlExport.classList.add("disabled");
    }


    var now = new Date(2013, 11, 31);
    var dateFormat = now.toLocaleDateString();
    dateFormat = dateFormat.replace("31", "dd");
    if (navigator.language == "fr") {
        dateFormat = dateFormat.replace("dd", "jj");
    }

    dateFormat = dateFormat.replace("12", "mm");
    dateFormat = dateFormat.replace("2013", "yyyy");

    let statementWizardContent = '';

    statementWizardContent += '<h2 class="pt-4 pb-3">' + langVallydette.statementTxt1 + '</h2>';

    statementWizardContent += '<div id="alertContainer">';
    if (dataWCAG.complete === false) {
        statementWizardContent += '<div class="alert alert-info alert-dismissible fade show" role="alert"> <span class="alert-icon"><span class="visually-hidden">Info</span></span><p>' + langVallydette.statementTxt2 + '</p>';
        statementWizardContent += '<button type="button" class="btn-close" data-bs-dismiss="alert"><span class="visually-hidden">' + langVallydette.closeAlert + '</span></button>';
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
    statementWizardContent += '                    <div class="input-group">';
    statementWizardContent += '                        <button class="btn btn-secondary my-2" type="button" id="importStatementData">' + langVallydette.template.btnImportTxt + '</button>';
    statementWizardContent += '                    </div>';
    statementWizardContent += '                </div>';
    statementWizardContent += '            </div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="border-top border-light my-3"></div>';

    statementWizardContent += '<form id="statementForm">';

    statementWizardContent += '<h3>2. ' + langVallydette.manualDataEntry + '</h3>';
    statementWizardContent += '<p>' + langVallydette.manualDataEntryDesc + '</p>';
    statementWizardContent += '<p class="text-muted">' + langVallydette.fieldRequired + '</p>';

    if (dataVallydette.checklist.page.length > 1 && dataWCAG.complete == false) {
        statementWizardContent += '<div class="row">';
        statementWizardContent += '<div class="col-lg-12">';
        statementWizardContent += '<div class="form-check mb-3">';
        statementWizardContent += '<input class="form-check-input" type="checkbox" value="" id="checkbox-noncompliant" aria-describedby="checkboxHelpBlock" ' + (dataVallydette.statement["nonCompliant"] === true ? 'checked' : '') + '>';
        statementWizardContent += '<label class="form-check-label" for="checkbox-noncompliant">' + langVallydette.noncompliantInput + '</label>';
        statementWizardContent += '<div id="checkboxHelpBlock" class="form-text">' + langVallydette.noncompliantDesc + '</div>'
        statementWizardContent += '</div>';
        statementWizardContent += '</div>';
        statementWizardContent += '</div>';
    }


    statementWizardContent += '<div class="row">';
    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-name" id="input-nameLabel" class="form-label">' + langVallydette.projectName + ' <span class="text-danger">*</span></label>';
    statementWizardContent += '<input type="text" class="form-control" id="input-name" aria-labelledby="input-nameLabel" style="scroll-margin-top: 10.35em;" value="' + utils.escape_html(dataVallydette.statement.name) + '" required aria-invalid="false">';
    statementWizardContent += '<div id="input-nameError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.projectNameError + ' </p></div>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';


    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-app" id="input-appLabel" class="form-label">' + langVallydette.projectSiteName + ' <span class="text-danger">*</span></label>';
    statementWizardContent += '<input type="text" class="form-control" id="input-app" aria-labelledby="input-appLabel" style="scroll-margin-top: 10.35em;" value="' + utils.escape_html(dataVallydette.statement.app) + '" required aria-invalid="false">';
    statementWizardContent += '<div id="input-appError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.projectSiteNameError + ' </p></div>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';


    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-lang" id="input-langLabel" class="form-label">' + langVallydette.lang + ' <span class="text-danger">*</span></label>';
    statementWizardContent += '<select class="form-select" id="input-lang" aria-labelledby="input-langLabel"  style="scroll-margin-top: 10.35em;"  required aria-invalid="false">';
    statementWizardContent += '<option value="" label="' + langVallydette.select + '"></option>';
    statementWizardContent += '<option value="fr" ' + (dataVallydette.statement.lang === "fr" ? "selected" : "") + '>' + langVallydette.french + '</option>';
    statementWizardContent += '<option value="en" ' + (dataVallydette.statement.lang === "en" ? "selected" : "") + '>' + langVallydette.english + '</option>';
    statementWizardContent += '</select>';
    statementWizardContent += '<div id="input-langError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.langError + ' </p></div>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-6">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-date" id="input-dateLabel" class="form-label">' + langVallydette.date + ' <span class="text-danger">*</span></label>';
    statementWizardContent += '<input type="date" class="form-control" id="input-date" aria-labelledby="input-dateLabel" style="scroll-margin-top: 10.35em;" value="' + dataVallydette.statement.date + '" required aria-invalid="false">';
    statementWizardContent += '<div id="input-dateError" class="alert alert-danger alert-sm d-none"><span class="alert-icon" aria-hidden="true"></span><p>' + langVallydette.dateError + ' ' + dateFormat + '</p></div>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-6">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-dateUpdate" class="form-label">' + langVallydette.dateUpdate + '</label>';
    statementWizardContent += '<input type="date" class="form-control" id="input-dateUpdate" style="scroll-margin-top: 10.35em;" value="' + dataVallydette.statement.dateUpdate + '">';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '</div>';

    statementWizardContent += '<div class="border-top border-light my-3"></div>';

    statementWizardContent += '<div class="row">';
    statementWizardContent += '<div class="col-lg-3" role="group" aria-labelledby="approvalListHeading">';
    statementWizardContent += '<h4 class="text-break" id="approvalListHeading">' + langVallydette.approval + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditApprovalList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.approvalEdit + '" title="' + langVallydette.approvalEdit + '">' + htmlIcon.edit + '</span></button></h4>';
    statementWizardContent += '<div class="mb-3" id="approvalList">';

    dataVallydette.statement.approval.forEach(function (a, index) {
        statementWizardContent += '<div class="form-check">';
        statementWizardContent += '<input type="radio" id="approval' + index + '" name="approvalRadio" class="form-check-input" onClick="radioIsChecked(\'approval\', ' + index + ')" ' + (a.checked === "true" ? " checked " : "") + ' >';
        statementWizardContent += '<label class="form-check-label" for="approval' + index + '">' + utils.escape_html(a.name) + '</label>';
        statementWizardContent += '</div>';
    })

    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-3" role="group" aria-labelledby="contactListHeading">';
    statementWizardContent += '<h4 class="text-break" id="contactListHeading">' + langVallydette.contact + '  <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditContactList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.contactEdit + '" title="' + langVallydette.contactEdit + '">' + htmlIcon.edit + '</span></button></h4>';
    statementWizardContent += '<div class="mb-3" id="contactList">';

    dataVallydette.statement.contact.forEach(function (c, index) {
        statementWizardContent += '<div class="form-check">';
        statementWizardContent += '<input type="radio" id="contact' + index + '" name="contactRadio" class="form-check-input" onClick="radioIsChecked(\'contact\', ' + index + ')" ' + (c.checked === "true" ? " checked " : "") + ' >';
        statementWizardContent += '<label class="form-check-label" for="contact' + index + '">' + utils.escape_html(c.name) + '</label>';
        statementWizardContent += '</div>';
    })

    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-6">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label for="input-plan" class="form-label">' + langVallydette.accessibilityPlan + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-plan" rows="8" aria-describedby="planDesc">' + dataVallydette.statement.plan + '</textarea>';
    statementWizardContent += '<small id="planDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="border-top border-light my-3"></div>';

    statementWizardContent += '<div class="row">';
    statementWizardContent += '<div class="col-lg-3">';
    statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="technologyLegend">';
    statementWizardContent += '<h4 class="text-break" id="technologyLegend">' + langVallydette.technology + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditTechList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.technologyEdit + '" title="' + langVallydette.technologyEdit + '">' + htmlIcon.edit + '</span></button></h4>';
    statementWizardContent += '<ul id="technologyList">';

    dataVallydette.statement.technology.forEach(function (listItem, index) {
        statementWizardContent += '<li>' + utils.escape_html(listItem.name) + ' ' + utils.escape_html(listItem.version) + '</li>';
    })

    statementWizardContent += '</ul>';

    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-3">';
    statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="testLegend">';
    statementWizardContent += '<h4 class="text-break" id="testLegend">' + langVallydette.tests + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditTestList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.testsEdit + '" title="' + langVallydette.testsEdit + '">' + htmlIcon.edit + '</span></button></h4>';

    statementWizardContent += '<ul id="testsList">';

    dataVallydette.statement.tests.forEach(function (listItem, index) {
        statementWizardContent += '<li>' + utils.escape_html(listItem.name) + ' ' + utils.escape_html(listItem.version) + '</li>';
    })

    statementWizardContent += '</ul>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';


    statementWizardContent += '<div class="col-lg-3">';
    statementWizardContent += '<div class="mb-3" role="group" aria-labelledby="environmentLegend">';
    statementWizardContent += '<h4 class="text-break" id="environmentLegend">' + langVallydette.environments + ' <button class="btn btn-secondary btn-icon btn-sm d-print-none" id="btnEditEnvironmentList" data-bs-toggle="modal" data-bs-target="#modalStatement" aria-label="' + langVallydette.environmentsEdit + '" title="' + langVallydette.environmentsEdit + '">' + htmlIcon.edit + '</span></button></h4>';

    statementWizardContent += '<ul id="environmentsList">';

    dataVallydette.statement.environments.forEach(function (listItem, index) {
        statementWizardContent += '<li>' + utils.escape_html(listItem.environment) + '</li>';
    })

    statementWizardContent += '</ul>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';


    statementWizardContent += '<div class="col-lg-3" role="group" aria-labelledby="usersTestsHeading">';
    statementWizardContent += '<h4 class="text-break" id="usersTestsHeading">' + langVallydette.userTesting + '</h4>';
    statementWizardContent += '<div class="mb-3 input-group-sm">';
    statementWizardContent += '<label class="form-label" for="input-userNumber" >' + langVallydette.userNumber + '</label>';
    statementWizardContent += '<input type="number" class="form-control" id="input-userNumber" value="' + dataVallydette.statement.userNumber + '" min="0" max="100">';
    statementWizardContent += '</div>';
    statementWizardContent += '<div class="mb-3 input-group-sm">';
    statementWizardContent += '<label class="form-label" for="input-userBlockingPoints" >' + langVallydette.blockingNumber + '</label>';
    statementWizardContent += '<input type="number" class="form-control" id="input-userBlockingPoints" value="' + dataVallydette.statement.userBlockingPoints + '" min="0" max="100">';
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
    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label class="form-label" for="input-compliantStateComment">' + langVallydette.compliantStateComment + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-compliantStateComment" rows="5" aria-describedby="compliantStateCommentDesc">' + dataVallydette.statement.compliantStateComment + '</textarea>';
    statementWizardContent += '<small id="compliantStateCommentDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label class="form-label" for="input-derogation">' + langVallydette.derogations + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-derogation" rows="5" aria-describedby="derogationDesc">' + dataVallydette.statement.derogation + '</textarea>';
    statementWizardContent += '<small id="derogationDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label class="form-label" for="input-exemption">' + langVallydette.exemptions + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-exemption" rows="5" aria-describedby="exemptionDesc">' + dataVallydette.statement.exemption + '</textarea>';
    statementWizardContent += '<small id="exemptionDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
    statementWizardContent += '</div>';
    statementWizardContent += '</div>';

    statementWizardContent += '<div class="col-lg-4">';
    statementWizardContent += '<div class="mb-3">';
    statementWizardContent += '<label class="form-label" for="input-nonCompliantComment">' + langVallydette.nonCompliantComment + '</label>';
    statementWizardContent += '<textarea class="form-control" id="input-nonCompliantComment" rows="5" aria-describedby="nonCompliantCommentDesc">' + dataVallydette.statement.nonCompliantComment + '</textarea>';
    statementWizardContent += '<small id="nonCompliantCommentDesc" class="form-text text-muted">' + langVallydette.markdownDesc + '</small>';
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

    document.getElementById("btnEditContactList").addEventListener('click', function () {
        event.preventDefault();
        editStatementProperty("contact");
    });
    document.getElementById("btnEditApprovalList").addEventListener('click', function () {
        event.preventDefault();
        editStatementProperty("approval");
    });

    document.getElementById("btnEditTechList").addEventListener('click', function () {
        event.preventDefault();
        editStatementProperty("technology");
    });
    document.getElementById("btnEditTestList").addEventListener('click', function () {
        event.preventDefault();
        editStatementProperty("tests");
    });
    document.getElementById("btnEditEnvironmentList").addEventListener('click', function () {
        event.preventDefault();
        editStatementProperty("environments");
    });

    document.getElementById('importStatementData').onclick = function () {
        var files = document.getElementById('selectFilesStatement').files;
        var fr = new FileReader();

        fr.onload = function (e) {
            dataVallydette.statement = JSON.parse(e.target.result);
            if (dataVallydette.statement.lang !== globalLang) {

                var langRequest = new XMLHttpRequest();
                langRequest.open("GET", "json/lang/" + dataVallydette.statement.lang + ".json", true);
                langRequest.onreadystatechange = function () {
                    if (langRequest.readyState === 4 && langRequest.status === 200) {
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

    statementSaveAndDownloadBtn

    var statementSaveBtn = document.getElementById("statementSaveBtn");

    statementSaveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        checkFormState("statementSaveBtn")
    })

    var statementSaveAndDownloadBtn = document.getElementById("statementSaveAndDownloadBtn");

    statementSaveAndDownloadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        checkFormState("statementSaveAndDownloadBtn")
    })


    document.getElementById("statementForm").addEventListener('focusin', function (e) {
        if (document.getElementById('StatementFormInfo')) {
            document.getElementById('StatementFormInfo').remove();
        }
    });

    document.getElementById("checkbox-noncompliant").addEventListener('change', function (e) {
        if (this.checked) {
            dataVallydette.statement.compliantStateComment = langVallydette.nonFinishedAudit;
            document.getElementById("input-compliantStateComment").value = dataVallydette.statement.compliantStateComment;
        }
    });

}

/**
 * Used to check form statement and what button sumbit
 */
checkFormState = function (buttonSubmitter) {
    var error = 0;

    var propertyDate = document.getElementById("input-date");
    if (propertyDate.value !== "") {
        validField(document.getElementById('input-dateError'), propertyDate, "input-dateLabel")
    } else {
        invalidField(document.getElementById('input-dateError'), propertyDate, "input-dateLabel", "input-dateError");
        error++;
    }


    var propertyLang = document.getElementById("input-lang");
    if (propertyLang.value !== "") {
        validField(document.getElementById('input-langError'), propertyLang, "input-langLabel")
    } else {
        invalidField(document.getElementById('input-langError'), propertyLang, "input-langLabel", "input-langError");
        error++;
    }

    var propertyApp = document.getElementById("input-app");
    if (propertyApp.value !== "") {
        validField(document.getElementById('input-appError'), propertyApp, "input-appLabel")
    } else {
        invalidField(document.getElementById('input-appError'), propertyApp, "input-appLabel", "input-appError");
        error++;
    }

    var propertyName = document.getElementById("input-name");
    if (propertyName.value !== "") {
        validField(document.getElementById('input-nameError'), propertyName, "input-nameLabel")
    } else {
        invalidField(document.getElementById('input-nameError'), propertyName, "input-nameLabel", "input-nameError");
        error++;
    }
    if (error == 0) {
        saveStatement(document.getElementById("statementForm"), buttonSubmitter);
    }
}

/**
 * Used to update statement properties state
 */
radioIsChecked = function (statementProperty, propertyIndex) {

    dataVallydette.statement[statementProperty].forEach(function (listItem, index) {

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

    dataVallydette.statement[statementProperty].forEach(function (listItem, index) {

        htmlModal += '<li>';


        htmlModal += '<span role="group" aria-labelledby="itemLegend-' + index + '">';
        htmlModal += '<h6 class="d-inline"><span id="itemLegend-' + index + '" class="font-weight-bold">' + langVallydette[statementProperty] + ' ' + (index + 1) + '</span></h6>';


        statementProperties.forEach(function (p) {

            if (listItem[p] !== undefined && p === 'type') {
                htmlModal += '<div class="m-2">';
                htmlModal += '<label for="type-' + index + '" class="form-label">' + langVallydette.type + ' ' + (index + 1) + '</label>'
                htmlModal += '<select id="type-' + index + '" class="form-select mb-1" title="' + langVallydette.type + '" >';
                htmlModal += '<option value="auto" ' + (listItem[p] === "auto" ? "selected" : "") + ' >' + langVallydette.auto + '</option>';
                htmlModal += '<option value="functional" ' + (listItem[p] === "functional" ? "selected" : "") + ' >' + langVallydette.functional + '</option>';
                htmlModal += '<option value="manual" ' + (listItem[p] === "manual" ? "selected" : "") + ' >' + langVallydette.manual + '</option>';
                htmlModal += '<option value="user" ' + (listItem[p] === "user" ? "selected" : "") + ' >' + langVallydette.user + '</option>';
                htmlModal += '</select>';
                htmlModal += '</div>';

            } else if (listItem[p] !== undefined && p === 'content') {
                htmlModal += '<div class="m-2">';
                htmlModal += '<label for="' + p + '-' + index + '" class="form-label">' + langVallydette.content + ' ' + (index + 1) + '</label>'
                htmlModal += '<textarea rows="2" cols="20" id="' + p + '-' + index + '" class="form-control mb-1" title="' + langVallydette.content + '" >' + listItem.content + '</textarea>';
                htmlModal += '</div>';
            } else if (listItem[p] !== undefined && p === 'checked') {
                htmlModal += '<input type="hidden" id="checked-' + index + '" class="form-control mb-1" value="' + listItem.checked + '" aria-label="' + langVallydette.checked + '" title="' + langVallydette.checked + '" />';

            } else if (listItem[p] !== undefined) {

                htmlModal += '<div class="m-2">';
                htmlModal += '<label for="' + p + '-' + index + '" class="form-label">' + langVallydette[p] + ' ' + (index + 1) + '</label>';
                htmlModal += '<input type="text" id="' + p + '-' + index + '" class="form-control mb-1" value="' + utils.escape_html(listItem[p]) + '" title="' + langVallydette[p] + '" aria-describedby="itemDesc" placeholder="' + langVallydette[p] + '" />';
                htmlModal += '</div>';

            }

        })

        htmlModal += '</span>';
        htmlModal += '</li>';

    })
    htmlModal += '</ul>';


    htmlModal += '<p id="itemDesc" class="form-text text-muted">' + langVallydette.statementTxt3 + '</p>';

    htmlModal += '<button type="button" id="addElement" class="btn btn-secondary btn-sm">' + langVallydette.addElement + '</button>';
    htmlModal += '</form>';
    htmlModal += '</div>';
    htmlModal += '<div class="modal-footer">';
    htmlModal += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">' + langVallydette.cancel + '</button>';
    htmlModal += '<button type="button" id="editionSaveBtn" data-bs-dismiss="modal" class="btn btn-primary">' + langVallydette.save + '</button>';
    htmlModal += '</div></div></div>';

    let elModal = document.getElementById('modalStatement');
    elModal.innerHTML = htmlModal;

    document.getElementById("addElement").addEventListener('click', function () {
        addListElement(statementProperty);
    });
    document.getElementById("editionSaveBtn").addEventListener('click', function () {
        saveListElement(document.getElementById("listToEdit"), statementProperty);
    });
}

/**
 * Save an item list (list of properties)
 * @param {string} listToEdit - a list ID (html element ID)
 * @param {string} statementProperty - statement property to edit
 */
saveListElement = function (listToEdit, statementProperty) {

    dataVallydette.statement[statementProperty] = [];
    let listMarkup = '';
    let index = 0;

    //vérifier les value
    for (let listItem of listToEdit.children) {
        let name = document.getElementById("name-" + index);
        let environment = document.getElementById("environment-" + index);

        if ((name !== null && name.value !== "") || (environment !== null && environment.value !== "")) {

            itemObj = {};

            statementProperties.forEach(function (p) {
                if (document.getElementById(p + "-" + index)) {
                    itemObj[p] = document.getElementById(p + "-" + index).value;
                }
            })

            dataVallydette.statement[statementProperty].push(itemObj);

            if (statementProperty === 'technology' || statementProperty === 'tests') {

                listMarkup += '<li>';
                listMarkup += itemObj.name ? utils.escape_html(itemObj.name) + ' ' : '';
                listMarkup += itemObj.version ? utils.escape_html(itemObj.version) + ' ' : '';
                listMarkup += '</li>';

            }

            if (statementProperty === 'contact' || statementProperty === 'approval') {

                listMarkup += '<div class="form-check">';
                listMarkup += '<input type="radio" id="' + statementProperty + index + '" name="' + statementProperty + 'Radio" class="form-check-input" onClick="radioIsChecked(\'' + statementProperty + '\', ' + index + ')" ';
                listMarkup += itemObj.checked === "true" ? "checked" : "";
                listMarkup += '>';
                listMarkup += '<label class="form-check-label" for="' + statementProperty + index + '">' + utils.escape_html(itemObj.name) + '</label>';
                listMarkup += '</div>';
            }

            if (statementProperty === 'environments') {

                listMarkup += '<li>';
                listMarkup += itemObj.environment ? utils.escape_html(itemObj.environment) + ' ' : '';
                listMarkup += '</li>';

            }

        }
        index++;

    }

    document.getElementById(statementProperty + "List").innerHTML = listMarkup;

}

/**
 * Add a new item to a given list (list of properties)
 * @param {string} statementProperty - statement property to edit
 */
addListElement = function (statementProperty) {

    var listItem = document.createElement("li");
    var listToEdit = document.getElementById("listToEdit");
    var listIndex = listToEdit.querySelectorAll("li").length;

    let htmlItem = '';
    htmlItem += '';

    if (statementProperty === 'approval' || statementProperty === 'contact') {
        htmlItem += '<span role="group" aria-labelledby="itemLegend-' + listIndex + '">';
        htmlItem += '<h6 class="d-inline"><span id="itemLegend-' + listIndex + '" class="font-weight-bold">' + langVallydette[statementProperty] + ' ' + (listIndex + 1) + '</span></h6>';
    } else {
        htmlItem += '<span role="group" aria-labelledby="itemLegend-' + listIndex + '">';
        htmlItem += '<h6 class="d-inline"><span id="itemLegend-' + listIndex + '" class="font-weight-bold">' + langVallydette[statementProperty] + ' ' + (listIndex + 1) + '</span></h6>';
    }

    statementProperties.forEach(function (p) {

        if (p === 'checked') {
            return;
        }

        if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p) && p === 'type') {

            htmlItem += '<div class="m-2">';
            htmlItem += '<label for="' + p + '-' + listIndex + '" class="form-label">' + langVallydette[p] + ' ' + (listIndex + 1) + '</label>'
            htmlItem += '<select id="type-' + listIndex + '" class="form-select mb-1" title="' + langVallydette.type + '" >';
            htmlItem += '<option value="auto" ' + (listItem[p] === "auto" ? "selected" : "") + ' >' + langVallydette.auto + '</option>';
            htmlItem += '<option value="functional" ' + (listItem[p] === "functional" ? "selected" : "") + ' >' + langVallydette.functional + '</option>';
            htmlItem += '<option value="manual" ' + (listItem[p] === "manual" ? "selected" : "") + ' >' + langVallydette.manual + '</option>';
            htmlItem += '<option value="user" ' + (listItem[p] === "user" ? "selected" : "") + ' >' + langVallydette.user + '</option>';
            htmlItem += '</select>';
            htmlItem += "</div>";

        } else if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p) && p === 'content') {
            htmlItem += '<div class="m-2">';
            htmlItem += '<label for="' + p + '-' + listIndex + '" class="form-label">' + langVallydette.content + ' ' + (listIndex + 1) + '</label>'
            htmlItem += '<textarea  rows="4" cols="50" id="' + p + '-' + listIndex + '" class="form-control mb-1" aria-labelledby="itemLegend-' + listIndex + ' ' + p + '-' + listIndex + '" title="' + langVallydette.content + '" ></textarea>';
            htmlItem += "</div>";
        } else if (dataVallydette.statement[statementProperty][0].hasOwnProperty(p)) {
            htmlItem += '<div class="m-2">';
            htmlItem += '<label for="' + p + '-' + listIndex + '" class="form-label">' + langVallydette[p] + ' ' + (listIndex + 1) + '</label>'
            htmlItem += '<input type="text" id="' + p + '-' + listIndex + '" class="form-control mb-1" value="" title="' + langVallydette[p] + '" aria-describedby="itemDesc" placeholder="' + langVallydette[p] + '" />';
            htmlItem += "</div>";
        }

    })

    htmlItem += '</span>';

    listItem.innerHTML = htmlItem;
    listToEdit.appendChild(listItem);

    if (document.getElementById("name-" + listIndex) !== null) {
        document.getElementById("name-" + listIndex).focus();
    } else {
        document.getElementById("environment-" + listIndex).focus();
    }
}

/**
 * Save the statement form
 * @param {object} statementForm - the statement form object
 * @param {string} submitterBtn - the submit button ID (html element ID)
 */
saveStatement = function (statementForm, submitterBtn) {

    var statementResult = runComputationWcag(true);

    statementInputs.forEach(function (input) {
        dataVallydette.statement[input] = statementForm.elements["input-" + input].value;
    });

    dataVallydette.statement["nonCompliant"] = (statementForm.elements["checkbox-noncompliant"] !== undefined ? statementForm.elements["checkbox-noncompliant"].checked : false);

    if (dataWCAG.complete || dataVallydette.statement["nonCompliant"]) {

        dataVallydette.statement.status = "DONE";

        if (dataVallydette.statement.lang !== globalLang) {
            var langRequest = new XMLHttpRequest();
            langRequest.open("GET", "json/lang/" + dataVallydette.statement.lang + ".json", true);
            langRequest.onreadystatechange = function () {
                if (langRequest.readyState === 4 && langRequest.status === 200) {
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
function initStatementExports(statementResult) {
    exportStatementHTML(statementResult);
    exportStatementXML(statementResult);
}

/**
 * XML statement export
 * @param {object} statementResult - Contains all wcag results by pages (pagesResults).
 * @param {object} langStatement - traductions keys (needed if statement lang is diffrent from global lang)
 */
exportStatementXML = function (statementResult) {
    adaptPlan();

    var md = window.markdownit();

    var xmlStatement = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlStatement += '<declaration>\n';

    xmlStatement += '<!-- from la va11ydette with love -->\n\n';

    xmlStatement += '<!--\n ';
    xmlStatement += 'TITLE\n ';
    xmlStatement += 'This is the name for the site, or page, or section of a site that was audited\n ';
    xmlStatement += '-->\n ';

    xmlStatement += '<title><![CDATA[' + dataVallydette.statement.app + ']]></title>\n\n';

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
    dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => xmlStatement += '	<name>' + a.name + '</name>\n	<content>\n<![CDATA[' + md.render(a.content) + ']]>\n</content>\n');
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
    xmlStatement += 'AUDIT UPDATE DATE\n';
    xmlStatement += 'Format: YYYY-MM-DD\n';
    xmlStatement += '-->\n';
    xmlStatement += '<audit_updatedate>' + dataVallydette.statement.dateUpdate + '</audit_updatedate>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'DIGITAL ACCESSIBILITY PLAN\n';
    xmlStatement += 'Plan: Paragraph for the digital accessibility plan. This is CDATA-protected, please add properly formatted HTML. \n';
    xmlStatement += '-->\n';
    xmlStatement += '<plan>\n<![CDATA[' + md.render(dataVallydette.statement.plan) + ']]>\n</plan>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'REFERENTIAL USED\n';
    xmlStatement += '-->\n';

    xmlStatement += '<referential>\n';
    xmlStatement += '	<name>WCAG</name><!-- if it\'s an abbreviation, the document template must translate it to plain text -->\n';
    xmlStatement += '	<version>2.2</version>\n';
    xmlStatement += '	<level>AA</level>\n';
    xmlStatement += '	<url>https://www.w3.org/Translations/WCAG22-fr/</url>\n';
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
    xmlStatement += 'Comment of non-compliance\n';
    xmlStatement += 'Comment of non-compliance. This is CDATA-protected, please add properly formatted HTML. \n';
    xmlStatement += '-->\n';
    xmlStatement += '<nonComplianceComment>\n<![CDATA[';
    xmlStatement += md.render(dataVallydette.statement.nonCompliantComment);
    xmlStatement += ']]>\n</nonComplianceComment>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'USERS\n';
    xmlStatement += 'Number of real users that tested the pages\n';
    xmlStatement += 'and blocking points they found (if 0, the document will have to say “with no blocking points from a user\'s point of view”\n';
    xmlStatement += '-->\n';
    xmlStatement += '<users>' + dataVallydette.statement.userNumber + '</users>\n';
    xmlStatement += '<blocking_points>' + dataVallydette.statement.userBlockingPoints + '</blocking_points>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'RESULTS DETAILS\n';
    xmlStatement += '-->\n';
    xmlStatement += '<results>\n';
    xmlStatement += '	<result type="a">\n';
    xmlStatement += '		<criteria>' + dataWCAG.totalA + '</criteria>\n';
    xmlStatement += '		<ok>' + dataWCAG.conformeA + '</ok><!-- valid -->\n';
    xmlStatement += '		<nok>' + dataWCAG.nonconformeA + '</nok><!-- not valid -->\n';
    xmlStatement += '		<na>' + dataWCAG.naA + '</na><!-- not applicable -->\n';
    xmlStatement += '		<conformity>' + dataWCAG.resultA + '</conformity><!-- percentage, expressed as a number with no “%” sign -->\n';
    xmlStatement += '	</result>\n\n';

    xmlStatement += '	<result type="aa">\n';
    xmlStatement += '		<criteria>' + dataWCAG.totalAA + '</criteria>\n';
    xmlStatement += '		<ok>' + dataWCAG.conformeAA + '</ok><!-- valid -->\n';
    xmlStatement += '		<nok>' + dataWCAG.nonconformeAA + '</nok><!-- not valid -->\n';
    xmlStatement += '		<na>' + dataWCAG.naAA + '</na><!-- not applicable -->\n';
    xmlStatement += '		<conformity>' + dataWCAG.resultAA + '</conformity><!-- percentage, expressed as a number with no “%” sign -->\n';
    xmlStatement += '	</result>\n\n';

    xmlStatement += '	<result type="total">\n';
    xmlStatement += '		<criteria>' + (dataWCAG.totalA + dataWCAG.totalAA) + '</criteria>\n';
    xmlStatement += '		<ok>' + dataWCAG.nbTrueWcag + '</ok><!-- valid -->\n';
    xmlStatement += '		<nok>' + dataWCAG.nbFalseWcag + '</nok><!-- not valid -->\n';
    xmlStatement += '		<na>' + dataWCAG.nbNaWcag + '</na><!-- not applicable -->\n';
    xmlStatement += '		<conformity>' + dataWCAG.result + '</conformity><!-- percentage, expressed as a number with no “%” sign -->\n';
    xmlStatement += '	</result>\n';
    xmlStatement += '</results>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'Pages results details\n';
    xmlStatement += '-->\n';
    xmlStatement += '<pages_results conformity="' + dataWCAG.globalPagesResult + '">\n';
    statementResult.forEach(item => xmlStatement += '	<page name="' + utils.escape_html(item.name) + '">\n		<ok type="a">' + item.conformeA + '</ok><!-- valid -->\n		<ok type="aa">' + item.conformeAA + '</ok><!-- valid -->\n		<nok type="a">' + item.nonconformeA + '</nok> <!-- not valid -->\n		<nok type="aa">' + item.nonconformeAA + '</nok> <!-- not valid -->\n		<na type="a">' + item.naA + '</na><!-- not applicable -->\n		<na type="aa">' + item.naAA + '</na><!-- not applicable -->\n		<conformity>' + item.result + '</conformity><!-- percentage, expressed as a number with no “%” sign -->\n</page>\n');
    ;
    xmlStatement += '</pages_results>\n\n';

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
    xmlStatement += 'COMPLIANT STATE Comment\n';
    xmlStatement += 'Compliant state comment. This is CDATA-protected, please add properly formatted HTML. \n';
    xmlStatement += '-->\n';
    xmlStatement += '<compliantStateComment>\n<![CDATA[';
    xmlStatement += md.render(dataVallydette.statement.compliantStateComment);
    xmlStatement += ']]>\n</compliantStateComment>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'DEROGATIONS\n';
    xmlStatement += 'Derogations list. This is CDATA-protected, please add properly formatted HTML. \n';
    xmlStatement += '-->\n';
    xmlStatement += '<derogations>\n<![CDATA[';
    xmlStatement += md.render(dataVallydette.statement.derogation);
    xmlStatement += ']]>\n</derogations>\n\n';

    xmlStatement += '<!--\n';
    xmlStatement += 'EXEMPTIONS\n';
    xmlStatement += 'Exemptions list. This is CDATA-protected, please add properly formatted HTML. \n';
    xmlStatement += '-->\n';
    xmlStatement += '<exemptions>\n<![CDATA[';
    xmlStatement += md.render(dataVallydette.statement.exemption);
    xmlStatement += ']]>\n</exemptions>';

    xmlStatement += '\n\n</declaration>';

    if (dataVallydette.statement.status === "DONE") {

        var bb = new Blob([xmlStatement], {type: 'application/octet-stream'});
        var statementFileName = utils.slugify(dataVallydette.statement.app) + '.xml';

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
exportStatementHTML = function (statementResult) {

    const arrayTypeTest = ["auto", "manual", "functional", "user"];
    const listNonConformity = dataWCAG.items.filter(dataWcagResult => dataWcagResult.resultat === false);
    var statementDate = new Date(dataVallydette.statement.date);
    var statementDateUpdate = new Date(dataVallydette.statement.dateUpdate);
    var localeStatementDate = statementDate.toLocaleDateString(dataVallydette.statement.lang);
    var localeStatementDateUpdate = statementDateUpdate.toLocaleDateString(dataVallydette.statement.lang);
    adaptPlan();
    var md = window.markdownit();

    var conformity = "";


    if (dataWCAG.result < 50 || dataVallydette.statement.nonCompliant == true) {
        conformity = langStatement.statementTemplate.noCompliant;
    } else if (dataWCAG.result == 100) {
        conformity = langStatement.statementTemplate.totalyCompliant;
    } else if (dataWCAG.result >= 50) {
        conformity = langStatement.statementTemplate.partialyCompliant;
    }

    htmlStatement = "";
    htmlStatement = `<!DOCTYPE html>
<html lang="${dataVallydette.statement.lang}">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="boosted-grid.min.css">
  <link rel="stylesheet" href="pie.css">

  <title>${langStatement.statementTemplate.title} - ${dataVallydette.statement.app}</title>

</head>

<body>
    <main class="container-md content">
        <h1>${langStatement.statementTemplate.title} : ${utils.escape_html(dataVallydette.statement.app)}</h1>

        <div class="summary">

            <div class="row">



                <div class="col-lg-12">

					<h2 class="h4 mt-4">${langStatement.statementTemplate.contextHeading}</h2>
					${md.render(dataVallydette.statement.plan)}

            	</div>

            </div>

        </div>

		<div class="row">
			<div class="col-lg">

				<h2 class="h4 mt-4">${langStatement.statementTemplate.state}</h2>
				<p>"${utils.escape_html(dataVallydette.statement.app)}" ${langStatement.is} ${conformity} ${langStatement.statementTemplate.compliantContent2}.</p>
				${dataVallydette.statement.compliantStateComment !== "" ? `${md.render(dataVallydette.statement.compliantStateComment)}` : ""}
                <p>${dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => utils.escape_html(a.name)).join('')} ${langStatement.statementTemplate.linkRGAAWCAG}</p>
				<p>${langStatement.statementTemplate.method}</p>

				<h3>${langStatement.statementTemplate.resultsHeading}</h3>`;

                if(dataVallydette.statement.nonCompliant === false){

        htmlStatement += `<div class="row summary">
						<div class="col-lg-auto text-center d-flex flex-column-reverse align-items-center">
                            <h4 class="lead">${langStatement.auditTxt1}</h4>
							<p class="pie" data-value="${dataWCAG.result}">
								<span class="visually-hidden">${langStatement.auditTxt1} </span>
								<span class="pie-val">${dataWCAG.result}%</span>
							</p>
						</div>
						<div class="col-lg-auto text-center d-flex flex-column-reverse align-items-center">
                            <h4 class="lead">${langStatement.auditTxt13}</h4>
							<p class="pie" data-value="${dataWCAG.globalPagesResult}">
								<span class="visually-hidden">${langStatement.auditTxt13} </span>
								<span class="pie-val">${dataWCAG.globalPagesResult}%</span>
							</p>
						</div>
					</div>`;

        htmlStatement += `<p>${langStatement.statementTemplate.resultsContent1} ${dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => utils.escape_html(a.name)).join('')} ${langStatement.statementTemplate.resultsContent1bis}</p>
					<ul>
						<li>${dataWCAG.result}${langStatement.statementTemplate.resultsContent2}</li>
						<li>${langStatement.statementTemplate.resultsContent2bis} ${dataWCAG.globalPagesResult}%.</li>
					</ul>
					<div class="table-responsive">
					<table class="table table-striped"><caption>${langStatement.auditTxt15}</caption>
						<thead><tr>
							<th scope="row">${langStatement.auditTxt10}</th>
							<th scope="col" class="text-center">A</th>
							<th scope="col" class="text-center">AA</th>
							<th scope="col" class="text-center">Total</th>
							</tr>
						</thead>
						<tbody>

							<tr>
								<th scope="row" class="font-weight-bold">${langStatement.criteriaNumber}</th>
								<td class="text-center">${dataWCAG.totalA}</td>
								<td class="text-center">${dataWCAG.totalAA}</td>
								<td class="text-center">${(dataWCAG.totalA + dataWCAG.totalAA)}</td>
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
								<td class="text-center">${(dataWCAG.naA + dataWCAG.naAA)}</td>
							</tr>

							<tr>
								<th scope="row" class="font-weight-bold bg-light">${langStatement.auditTxt16}</th>
								<td class="text-center bg-light">
									${(!isNaN(dataWCAG.resultA) && dataWCAG.result !== "NA") ? `${dataWCAG.resultA}% ` : ``}
								</td>
								<td class="text-center bg-light">
									${(!isNaN(dataWCAG.resultAA) && dataWCAG.result !== "NA") ? `${dataWCAG.resultAA}% ` : ``}
								</td>
								<td class="text-center bg-light">
									${(!isNaN(dataWCAG.result) && dataWCAG.result !== "NA") ? `${dataWCAG.result}% ` : ``}
								</td>
							</tr>

						</tbody>
					</table>
					</div>

					<div class="table-responsive">
					<table class="table table-striped">
					<caption>${langStatement.auditTxt4}</caption>
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
							<th scope="row"><span class="visually-hidden">Page : </span>${utils.escape_html(r.name)}</th>
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
					</div>

				</div>
			</div>`;

        }
        else{
            htmlStatement += `<div class="row summary">
            					<div class="col-lg-auto text-center">
            						<h4 class="pie" data-value="50">
            							<span class="visually-hidden">${langStatement.auditTxt1} </span>
            							<span class="pie-noncompliant-val pie-noncompliant">${langStatement.template.status2}</span>
            						</h4>
            						<p class="lead">${langStatement.auditTxt1}</p>
            				</div>
            			</div>`;

            htmlStatement += `<p>${langStatement.statementTemplate.resultsContent1} ${dataVallydette.statement.approval.filter(a => a.checked === "true").map(a => a.name).join('')} ${langStatement.statementTemplate.resultsContent1bis}</p>
            				<ul>
            					<li>${langStatement.statementTemplate.resultsContentnonCompliant}${langStatement.statementTemplate.resultsContent2}</li>
            				</ul>
                        </div>
            		</div>`;
        }

    htmlStatement += `<div class="row">

            <div class="col-lg">

				<h2 class="h4 mt-4">${langStatement.statementTemplate.noncompliancesHeading1}</h2>

				<p>${langStatement.statementTemplate.noncompliancestext}</p>

                <h3 class="h6 mt-4">${langStatement.statementTemplate.noncompliancesHeading2}</h3>`;

    if (dataVallydette.statement.nonCompliantComment !== "") {
        htmlStatement += `${md.render(dataVallydette.statement.nonCompliantComment)}`;

    }

    if (listNonConformity.length > 0) {
        htmlStatement += `
					<p>${langStatement.statementTemplate.wcagNonCompliant}</p>
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
        </div>

        <div class="row">

			<div class="col-lg">
				<h2 class="h4 mt-4">${langStatement.statementTemplate.environmentStatement}</h2>
				<p>${langStatement.statementTemplate.auditDate} ${localeStatementDate}. ${dataVallydette.statement.dateUpdate === "" ? "" : langStatement.statementTemplate.auditUpdateDate + " " + localeStatementDateUpdate + "."}</p>
			</div>
		</div>
		<div class="row">
				<div class="col-lg">


					<h3>${langStatement.statementTemplate.technologyHeading}</h3>
					<ul>
						${dataVallydette.statement.technology.map(e => `<li>${utils.escape_html(e.name)}${e.version.length > 0 ? ` ${utils.escape_html(e.version)}` : ``}</li>`).join('\n						')}
					</ul>


					<h3>${langStatement.statementTemplate.environmentHeading}</h3>
					<p>${langStatement.statementTemplate.environmentContent}</p>
					<ul>
						${dataVallydette.statement.environments.map(e => `<li>${utils.escape_html(e.environment)}</li>`).join('\n						')}
					</ul>

					<h3>${langStatement.statementTemplate.methodsHeading}</h3>
					<ul>
					`;

    arrayTypeTest.forEach(function (t) {

        let arrayTypeResult = dataVallydette.statement.tests.filter(e => e.type === t);
        let separator = ', '

        arrayTypeResult.length > 0 ? htmlStatement += `	<li><strong>${langStatement[t + "Test"]}:</strong> ${arrayTypeResult.map(e => `${utils.escape_html(e.name)}${e.version.length > 0 ? ` ${utils.escape_html(e.version)}` : ``}`).join(separator)}</li>\n					` : '';

    });

    if (dataVallydette.statement.userNumber > 0 && dataVallydette.statement.userTestDescription !== '') {
        htmlStatement += `<li><strong>${langStatement.userTest}:</strong> ${utils.escape_html(dataVallydette.statement.userTestDescription)}</li>`
    }

    htmlStatement += `</ul>

			</div>
		</div>

		<div class="row">
				<div class="col-lg">
					<h3>${langStatement.statementTemplate.pagesHeading}</h3>
					<p>${langStatement.statementTemplate.pagesContent}</p>

					<ol>
						${dataVallydette.checklist.page.map(item => `<li><strong>${utils.escape_html(item.name)} : </strong>${utils.escape_html(item.url)}</li>`).join('\n					')}
					</ol>
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
				<p>${langStatement.statementTemplate.contactsText}</p>

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
        var statementFileName = utils.slugify(dataVallydette.statement.app) + '.html';

        var btnStatementHtmlExport = document.getElementById("btnStatementHtmlExport");
        btnStatementHtmlExport.classList.remove('disabled');
        btnStatementHtmlExport.setAttribute('href', window.URL.createObjectURL(bb));
        btnStatementHtmlExport.setAttribute('download', statementFileName);


    }
}

/**
 * update plan with variable
 */
adaptPlan = function () {
    dataVallydette.statement.plan = dataVallydette.statement.plan.replace(langVallydette.accessibilityPlanTextReplace, dataVallydette.statement.name);
    dataVallydette.statement.plan = dataVallydette.statement.plan.replace(langVallydette.accessibilityPlanTextReplace2, dataVallydette.statement.app);
}
