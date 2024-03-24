const WizardPage = {
    Init: async function () {
        $("div#itech-loader").remove();
        WizardPage.Variables.RequestTypeId = iTech.Helpers.GetUrlParameter("requestTypeId",true);
        WizardPage.Variables.WizardLastStep = iTech.Helpers.GetUrlParameter("wizardLastStep",true);
        WizardPage.Helpers.GetRequest();
        WizardPage.AddEventHandlers();
        WizardPage.Components.RequestType();
        //WizardPage.Components.OnePageSurveys();
        var ALLSurveyStepsResult = await WizardPage.Components.ALLSurveySteps();
        if (ALLSurveyStepsResult.success) {
             WizardPage.Wizard.WizardInitialization();
            if (WizardPage.Variables.WizardLastStep) {
                setTimeout(() => {
                    $('#smartwizard').smartWizard("goToStep", 1, true);
                }, 1500);
            }
        }
        //var firstStep = await WizardPage.Components.PHQSurvey();
        //var secondStep = await WizardPage.Components.TwoStageSurveys();
        //var thirdStep = await WizardPage.Components.ThreeStageSurveys();

        //iTech.Forms.Helpers.FillComboManuel("#RequestReason", {}, "AdminManagement/GetAll/RequestReasonClient/" + WizardPage.Variables.UrlParam);

    },
    AddEventHandlers: function () {
    },
    Components: {
        BlockComponent: function (el) {
            $(el).block({
                message: `<div class="spinner-border" role="status" style="z-index: 9999;position: absolute;top: 50%;left: 50%;color: black;"></div>`,
                css: { border: '0' }
            });
        },
        ALLSurveySteps: async function () {
            WizardPage.Components.BlockComponent("html");
            var wizardLastStep = WizardPage.Variables.WizardLastStep == "1" ? false : true;
            var requestTypeId = parseInt(WizardPage.Variables.RequestTypeId);
            var firstStep = true;
            const GetSurveyQuestionListResult = await iTech.Services.AjaxPromise(FormMethod.Post, `SurveyManagement/GetSurveyQuestionList/${requestTypeId}/${wizardLastStep}`, ContentTypes.FromBody);
            if (GetSurveyQuestionListResult.isSuccess && GetSurveyQuestionListResult.value) {
                //var stepCount = wizardLastStep == false ? 1 : 2;
                var stepCount = 2;
                for (const bounds of GetSurveyQuestionListResult.value) {
                    var amnesisOrderArr = [bounds[0], bounds[1], requestTypeId];
                    const requestBody = {
                        AmnesisOrderArr: amnesisOrderArr,
                        WizardLastStep: wizardLastStep
                    };
                    try {
                        const res = await iTech.Services.AjaxPromise(FormMethod.Post, `SurveyManagement/GetSurveyQuestion`, requestBody, ContentTypes.FromForm);
                        if (res.isSuccess && res.value) {
                            if (!wizardLastStep) {
                                $(".step1").addClass("d-none");
                                $("#step-1").addClass("d-none");
                                $(".moduleDiv").remove();
                               
                            };

                            $(".appendListSteps").append(`<li class="nav-item step${stepCount}">
                                                             <a class="nav-link default" href="#step-${stepCount}">
                                                               <span class="num">${stepCount - 1}</span>
                                                               Aşama
                                                             </a>
                                                         </li>`);

                            $(".formSteps").append(`<div id="step-${stepCount}" class="tab-pane" role="tabpanel" aria-labelledby="step-${stepCount}">
                                                     <form id="form-${stepCount - 1}" name="${stepCount}StepForm" class="needs-validation" autocomplete="off"></form>
                                                   </div>`);

                            for (const item of res.value) {
                                const surveyAnswerId = await WizardPage.Helpers.CreateSurveyAnswer(item.surveyDefinitionId);
                                if (!WizardPage.Variables.SurveyAnswerIds[stepCount - 1]) {
                                    WizardPage.Variables.SurveyAnswerIds[stepCount - 1] = [];
                                }
                                WizardPage.Variables.SurveyAnswerIds[stepCount - 1].push(surveyAnswerId);
                                var client = `#step-${stepCount} #form-${stepCount - 1}`;
                                await SurveyInit(item.surveyDetail, item.questions, item.choiceDatas, $(client), surveyAnswerId,
                                    item.isHorizontal ? Direction.Horizontal : Direction.Vertical, item.isClient, true);
                            }

                            stepCount++;
                            $(".formSteps").attr("CurrentStepIdx", (stepCount - 2));
                            firstStep = false;
                        }
                    } catch (res) {
                        setTimeout(() => {
                            $("html").unblock();
                        }, 1000);
                        if (res.message.responseText)
                            iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                        else
                            iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                    }
                }
            }

            if (firstStep) { // Eğer hiç adım oluşturulmamışsa
                setTimeout(() => {
                    $(".formSteps").attr("CurrentStepIdx", (0));
                    $(".sw-btn-next").addClass("d-none");
                    $(".btnFinish").removeClass("d-none");
                }, 500);
            };
            setTimeout(() => {
                $("html").unblock();
            }, 1000);
            return { success: true };
        },
        RequestType: function () {
            iTech.Services.AjaxPromise(FormMethod.Get, "AdminManagement/Get/RequestType/" + WizardPage.Variables.RequestTypeId)
                .then((res) => {
                    if (res.isSuccess) {
                        var cardContent = "";
                        cardContent = `<div class="module-card">
                            <div style="text-align: center;">
                                <p class="nameClass" style="color: #000; font-weight: bolder; font-size: 1.4rem; white-space: normal;">${res.value.name}</p>
                                <p class="descClass" style="color: #000; font-weight: normal; font-size: 0.8rem; white-space: normal;">${res.value.description}</p>
                            </div>
                        </div>`;
                        $(".module").append(cardContent);
                    }
                }).catch(res => {
                    console.log("error:", res);
                    iTech.ShowMessage("Hatalı Parametre", "Hatalı Parametre!<br> Anasayfa'ya Yönlendiriliyorsunuz...", "error");
                    setTimeout(() => {
                        window.location.href = 'Request';
                    }, 1500);
                });
        },
    },
    Helpers: {
        FinishModal: async function () {
            var isSuccess = true;
            currentStepIdx = $(".formSteps").attr("currentstepidx");
            var validateResult = await  WizardPage.Wizard.WizardValidation(isSuccess, currentStepIdx);
            if (!validateResult) {
                //iTech.ShowMessage("Eksik Cevap!", "Tamamlanmamış sorular mevcut.<br>Lütfen tüm sorulara cevap veriniz.", "error");
                return false;
            }

            if (WizardPage.Variables.FromAdvisor) {
                iTech.ShowMessage("Başarılı", "İşlem Başarılı. Anasayfa'ya Yönlendiriliyorsunuz...", "success");
                setTimeout(() => {
                    window.location.href = 'Request';
                }, 3000);
            } else {
                iTech.ShowMessage("Başarılı", "Tamamlandı.", "success");
                setTimeout(() => {
                    if (WizardPage.Variables.WizardLastStep) {
                        iTech.Helpers.SetUrlParameter("Request", { 'p': 10 });
                    } else {
                        iTech.Helpers.SetUrlParameter("Appointment", { 'requestTypeId': WizardPage.Variables.RequestTypeId });
                    }

                    //window.location.href = WizardPage.Variables.WizardLastStep == "1" ?
                    //    'Request?p=10' :
                    //    `Appointment?requestTypeId=${WizardPage.Variables.RequestTypeId}`;
                }, 500);
            }
        },
        CreateSurveyAnswer: async function (surveyDefinitionId) {
            var dto = {
                "Id": 0,
                "ClientId": iTech.lclStr.get("ITManagement.UserInfo").clientId,
                "RequestDefinitionId": WizardPage.Variables.RequestDefinitionId,
                "SurveyDefinitionId": surveyDefinitionId,
                "TotalPoint": 0
            };

            const res = await iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "SurveyManagement/SaveSurveyAnswer",
                $requestData = dto,
                $contentType = ContentTypes.FromForm
            )

            return res.data.id;
        },
        GatherSurveyResults: function () {
            const results = [];
            const questions = document.querySelectorAll('.question'); // Her bir soru için bir div sınıfı kullandığımızı varsayarak

            questions.forEach((questionDiv, index) => {
                const questionId = index + 1; // 0'dan başlayan indeksi 1'den başlayan soru numarasına çevirir
                const selectedOption = questionDiv.querySelector(`input[name="question-${questionId}"]:checked`);

                if (selectedOption) {
                    results.push({
                        questionId: questionId,
                        point: parseInt(selectedOption.value, 10),
                        choiceDataId: parseInt(selectedOption.choiceDataId, 10)
                    });
                } else {
                    results.push({
                        questionId: questionId,
                        point: null,
                        choiceDataId: null
                    });
                }
            });

            return results;
        },
        GetRequest: async function () {
            var data = {
                clientId: iTech.lclStr.get("ITManagement.UserInfo").clientId,
                requestTypeId: WizardPage.Variables.RequestTypeId
            };
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "AdviseManagement/GetRequestDefinitionByClientId",
                $requestData = data,
                $contentType = ContentTypes.FromForm
            ).then(res => {
                if (res.isSuccess) {
                    WizardPage.Variables.RequestDefinitionId = res.value.id;
                    WizardPage.Variables.FromAdvisor = res.value.fromAdvisor;
                    WizardPage.Helpers.RequestDefinationChange(firstChange = true, requestReasonId = res.value.requestReasonId);
                    WizardPage.Helpers.OtherRequestReasonChange(firstChange = true, otherRequestReason = res.value.otherRequestReason);
                }
                else
                    return "";
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        RequestDefinationChange: async function (firstChange, requestReasonId) {
            if (firstChange) {
                $("#RequestReason").val(requestReasonId).trigger("change");
                firstChange = false;
            }

            if ($("#RequestReason").select2("data")[0]?.text == 'Diğer') {
                $(".otherRequestReasonArea").show();
            }

            $("#RequestReason").on("change", () => {
                if ($("#RequestReason").select2("data")[0]?.text == 'Diğer') {
                    $(".otherRequestReasonArea").show();
                    $("#OtherRequestReason").attr("required", true);

                } else {
                    $(".otherRequestReasonArea").hide();
                    $("#OtherRequestReason").attr("required", false);
                }

                if (!firstChange) {
                    if ($("#RequestReason").val() != '') {
                        var dto = {
                            "ClientId": iTech.lclStr.get("ITManagement.UserInfo").clientId,
                            "RequestDefinitionId": WizardPage.Variables.RequestDefinitionId,
                            "RequestReasonId": $("#RequestReason").val()
                        };

                        iTech.Services.AjaxPromise(FormMethod.Post, `AdviseManagement/UpdateRequestDefinitionForRequestReasonId`, dto)
                            .then((res) => {
                                if (res.isSuccess) {
                                    console.log("ChangeRequestReasonId", res.value);
                                }
                            }).catch(res => {
                                console.log("error:", res)
                            });
                    }
                }
            });
        },
        OtherRequestReasonChange: async function (firstChange, otherRequestReason) {
            if (firstChange) {
                $("#OtherRequestReason").val(otherRequestReason).trigger("change");
                firstChange = false;
            }

            $("#OtherRequestReason").on("change", () => {
                if (!firstChange) {
                    if ($("#OtherRequestReason").val() != '') {
                        var dto = {
                            "ClientId": iTech.lclStr.get("ITManagement.UserInfo").clientId,
                            "RequestDefinitionId": WizardPage.Variables.RequestDefinitionId,
                            "OtherRequestReason": $("#OtherRequestReason").val()
                        };

                        iTech.Services.AjaxPromise(FormMethod.Post, `AdviseManagement/UpdateRequestDefinitionForOtherRequestReason`, dto)
                            .then((res) => {
                                if (res.isSuccess) {
                                    console.log("ChangeOtherRequestReason", res);
                                }
                            }).catch(error => {
                                console.log("error:", error)
                            });
                    }
                }
            });
        },
    },
    Wizard: {
        WizardInitialization: async function () {
            var htmlEl = $('#smartwizard');
            htmlEl.smartWizard({
                selected: 0,
                autoAdjustHeight: false,
                theme: 'arrows', // basic, arrows, square, round, dots
                enableUrlHash: false,
                transition: {
                    animation: 'fade', // none|fade|slideHorizontal|slideVertical|slideSwing|css
                    speed: '1000'
                },
                toolbar: {
                    showNextButton: true, // show/hide a Next button
                    showPreviousButton: true, // show/hide a Previous button
                    position: 'bottom', // none/ top/ both/ bottom
                    extraHtml: `<button class="btn btn-success d-none btnFinish text-white" id="btnFinish" onclick="WizardPage.Helpers.FinishModal()">Tamamla</button>`
                },
                anchorSettings: {
                    markDoneStep: true, // add done css
                    markAllPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
                    removeDoneStepOnNavigateBack: true, // While navigate back done step after active step will be cleared
                    enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation
                },
                lang: {  // Language variables
                    next: 'İleri',
                    previous: 'Geri'
                },
                keyboard: {
                    keyNavigation: false, // Enable/Disable keyboard navigation(left and right keys are used if enabled)
                    keyLeft: [37], // Left key code
                    keyRight: [39] // Right key code
                },
            });
            await WizardPage.Wizard.WizardShowStep(htmlEl);
            await WizardPage.Wizard.WizardLeaveStep(htmlEl);
        },
        WizardShowStep: async function (htmlEl) {
            htmlEl.on("leaveStep", function (e, anchorObject, currentStepIdx, nextStepIdx, stepDirection) {
                if (stepDirection == 'backward') {
                    $(".wizardResult").find(".step-" + nextStepIdx).remove();

                    if ($(".wizardResult > div").length == 0)
                        $(".resultArea").hide();

                    if (currentStepIdx == 0) {

                    } else if (currentStepIdx == 1) {

                    } else if (currentStepIdx == 2) {
                        $(".checkInfo").remove();
                    }
                }

                if (stepDirection == 'forward') {
                    var isSuccess = true;
                    if (currentStepIdx == 0) {
                        //if ($("#RequestReason").val() != '') {
                        //}
                    } else if (currentStepIdx == 1) {
                        //işaretleri kaldırmak için
                        const tableRows = document.querySelectorAll('.stepTwoTable .question');
                        tableRows.forEach(row => {
                            const iconCell = row.querySelector('.icon-cell');
                            if (iconCell) {
                                iconCell.remove();
                            }
                        });

                        //WizardPage.Helpers.GatherSurveyResults();
                    }

                    var validateResult = WizardPage.Wizard.WizardValidation(isSuccess, currentStepIdx);

                    //if (!iTech.Forms.Helpers.IsDeployment()) // Deployment mod da değil ise çalışır!
                    if (!validateResult) // Bir hata var(false) ise çalışır.
                        return false;

                }
            });
        },
        WizardValidation: function (isSuccess, currentStepIdx) {
            //wizard form validate
            let form = document.getElementById('form-' + (currentStepIdx));
            if (form) {
                let select2Elements = form.querySelectorAll('.select2-hidden-accessible');
                let select2Valid = true;

                select2Elements.forEach((select2Element) => {
                    let select2Container = $(select2Element).next('.select2-container');
                    if (!select2Element.checkValidity()) {
                        select2Valid = false;
                        if (select2Element.value === '')
                            select2Container.find('.select2-selection').css("border", "1px solid red");
                        else
                            select2Container.find('.select2-selection').css("border", "1px solid #627ca0");
                    }
                    else {
                        select2Container.find('.select2-selection').css("border", "1px solid #67B4AC");
                    }
                });

                if (!form.checkValidity() || !select2Valid) {
                    form.classList.add('was-validated');

                    const table = document.querySelector('.stepTwoTable');
                    if (currentStepIdx == 1 && table) {
                        const tableRows = table.querySelectorAll('.question');
                        if (!WizardPage.Variables.IsTitleCellAdded) {
                            const th = document.createElement('th');
                            th.classList.add('checkInfo');
                            var test = table.querySelector('thead tr').firstChild;
                            table.querySelector('thead tr').insertBefore(th, table.querySelector('thead tr').firstChild);
                            WizardPage.Variables.IsTitleCellAdded = true;
                        }

                        tableRows.forEach(row => {
                            const radioInputs = row.querySelectorAll('input[type="radio"]');
                            const iconCell = row.querySelector('.icon-cell');

                            if (iconCell) {
                                iconCell.remove();
                            }

                            const newIconCell = document.createElement('td');
                            newIconCell.className = 'icon-cell';

                            let checkedFound = false;

                            radioInputs.forEach(input => {
                                if (input.checked) {
                                    newIconCell.textContent = '✔️';
                                    checkedFound = true;
                                }
                            });

                            if (!checkedFound) {
                                newIconCell.textContent = '❌';
                            }

                            row.insertBefore(newIconCell, row.firstChild);
                        });
                    }

                    $('#smartwizard').smartWizard("setState", [currentStepIdx], 'error');
                    $("#smartwizard").smartWizard('fixHeight');
                    iTech.ShowMessage("Eksik Cevap!", "Tamamlanmamış sorular mevcut.<br>Lütfen tüm sorulara cevap veriniz.", "error");

                    isSuccess = false;
                }
                if (!isSuccess) {
                    return false;
                } else {
                    if (WizardPage.Variables.WizardLastStep && currentStepIdx > 0) {
                        var SurveyAnswerIds = WizardPage.Variables.SurveyAnswerIds[currentStepIdx];

                        if (SurveyAnswerIds && SurveyAnswerIds.length > 0) {
                            Promise.all(SurveyAnswerIds.map(async function (surveyAnswerId) {
                                return iTech.Services.AjaxPromise(
                                    FormMethod.Get,
                                    "SurveyManagement/SurveyAnswerCompleted/" + surveyAnswerId
                                ).then(async res => {
                                    if (res) {
                                        console.log("İşlem başarılı: ", surveyAnswerId);
                                    }
                                }).catch(res => {
                                    if (res.message.responseText)
                                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                                    else
                                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                                });
                            })).then(() => {
                                $('#smartwizard').smartWizard("unsetState", [currentStepIdx], 'error');
                                return true;
                            }).catch(err => {
                                console.error(err);
                                return false;
                            });
                        }
                    }


                    $('#smartwizard').smartWizard("unsetState", [currentStepIdx], 'error');
                    return true;
                }
            }

        },
        WizardLeaveStep: async function (htmlEl) {
            htmlEl.on("showStep", function (e, anchorObject, stepIndex, stepDirection, stepPosition) {
                if (WizardPage.Variables.WizardLastStep) {
                    if (stepIndex == 1) 
                        $(".sw-btn-prev").addClass("d-none");
                     else 
                        $(".sw-btn-prev").removeClass("d-none");
                }
                $("#prev-btn").removeClass('disabled').prop('disabled', false);
                $("#next-btn").removeClass('disabled').prop('disabled', false);
                if (stepPosition === 'first') {
                    $(".moduleDiv").fadeIn();
                    $("#prev-btn").addClass('disabled').prop('disabled', true);
                    //if ($('#checkApprove').is(':checked')) {
                    //    $(".btn.sw-btn-next.sw-btn").prop("disabled", false);
                    //}
                } else if (stepPosition === 'last') {
                    $("#next-btn").addClass('disabled').prop('disabled', true);
                } else {
                    $(".moduleDiv").fadeOut();
                    $("#prev-btn").removeClass('disabled').prop('disabled', false);
                    $("#next-btn").removeClass('disabled').prop('disabled', false);
                }

                // Get step info from Smart Wizard
                let stepInfo = $('#smartwizard').smartWizard("getStepInfo");
                $("#sw-current-step").text(stepInfo.currentStep + 1);
                //iTech.ShowMessage("Şuan ki aşama:", (stepInfo.currentStep + 1).toString(), "warning");
                $("#sw-total-step").text(stepInfo.totalSteps);

                if (stepPosition == 'last') {
                    //OrderOperationPage.Helpers.ShowConfirm();
                    $(".sw-btn-next").addClass("d-none");
                    $(".btnFinish").removeClass("d-none");
                } else {
                    $(".sw-btn-next").removeClass("d-none");
                    $(".btnFinish").addClass("d-none");
                }
            });
        }
    },
    Variables: {
        CustomerDefinitionId: null,
        PageStatus: null,
        RequestTypeId: null,
        WizardLastStep: null,
        IsTitleCellAdded: false,
        RequestDefinitionId: null,
        FromAdvisor: false,
        CurrentStepIdx: 0,
        SurveyAnswerIds: []
    }
};
$(WizardPage.Init);
