function appendElement(params, questionEl) {
    if (params.question.subScaleId != null) {
        $(params.elHtml).find(`.subScaleArea${params.question.subScaleOrder}`).append(questionEl);
    }
    else
        params.elHtml.append(questionEl);
}

function createNumberQuestion(params) {
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    let choiceEl = `<input 
                    type="number"
                    id="Number"
                    name="question-${params.question.id}" 
                    class="form-control form-control-xs survey-input"
                    riskSituation='${params.riskSituation ? params.riskSituation : ""}' 
                    data-point='${params.question.showPoint}' 
                    data-questionId='${params.question.id}' 
                    data-surveyAnswerId='${params.surveyAnswerId}' 
                    data-showPoint='${params.question.showPoint}'
                    ></div>`;
    questionEl += choiceEl;

    appendElement(params, questionEl);

    if (selectedAnswer) {
        $(`[name="question-${params.question.id}"]`).val(selectedAnswer.text);
    }
    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);
        $(`[name="question-${params.question.id}"]`).on('focusout', function (event) {
            SaveAnswerData.TextFocusout(event.target);
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

function createDateQuestion(params) {
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);

    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    let choiceEl = `<input 
                    type="date" 
                    name="question-${params.question.id}" 
                    class="form-control form-control-xs survey-input"
                    riskSituation='${params.riskSituation ? params.riskSituation : ""}'
                    data-questionId='${params.question.id}'
                    data-surveyAnswerId='${params.surveyAnswerId}' 
                    data-showPoint='${params.question.showPoint}'
                    ></div>`;

    questionEl += choiceEl;
    appendElement(params, questionEl);
    if (selectedAnswer) {
        $(`[name="question-${params.question.id}"]`).val(selectedAnswer.text);
    }
    if (params.elHtml[0].id != "previewArea") {

        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);

        $(`[name="question-${params.question.id}"]`).on('change', function (event) {
            SaveAnswerData.DateChange(event.target);
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

function createBoolQuestion(params) {
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    let isChecked = selectedAnswer?.point ? 'checked' : '';
    let checkboxText = isChecked ? params.choices[0].text : params.choices[1].text;

    let choiceEl = `<div class="row ml-3 align-items-center">
    <input
        type="checkbox"
        id="BoolCheckbox"
        name="question-${params.question.id}" 
        class="form-control form-control-xs survey-input"
        riskSituation='${params.riskSituation ? params.riskSituation : ""}' 
        data-point='${params.question.showPoint}' 
        data-questionId='${params.question.id}' 
        data-surveyAnswerId='${params.surveyAnswerId}' 
        data-showPoint='${params.question.showPoint}'
        ${isChecked} 
        style="width: 1.5rem; height: 1.5rem; margin: 0.4rem;">
    <span id="checkboxText-${params.question.id}">${checkboxText}</span>
    </div></div>`;

    questionEl += choiceEl;
    appendElement(params, questionEl);
    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);

        $(`[name="question-${params.question.id}"]`).on('click', function (event) {
            let checkbox = $(event.target);
            $(`#checkboxText-${params.question.id}`).text(checkbox.is(':checked') ? params.choices[0].text : params.choices[1].text);
            SaveAnswerData.BoolCheck(event.target);
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }

}

function createCheckListQuestion(params) {
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    let choiceEl = ``;
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);

    params.choices.sort((a, b) => a.order - b.order).forEach(choice => {

        const choiceId = choice.choiceDataId;

        const previouslySelectedChoice = (selectedAnswer?.text?.includes(choiceId + ","));

        choiceEl += `<div class="row ml-3 align-items-center">
            <input
                type="checkbox"
                name="question-${params.question.id}"
                class="form-control form-control-xs survey-input"
                riskSituation='${params.riskSituation ? params.riskSituation : ""}' 
                data-point=${choice.point} 
                data-choiceId='${choiceId}' 
                data-questionId='${params.question.id}'
                data-surveyAnswerId='${params.surveyAnswerId}' 
                data-showPoint='${params.question.showPoint}'
                ${previouslySelectedChoice ? 'checked' : ''}
                ${params.question.relatedSurveyQuestionId == null ? 'required' : ''} 
                style="width: 1.5rem; height: 1.5rem; margin: 0.4rem;">
                ${choice.text}
            </div>`;
    });

    questionEl += choiceEl;
    appendElement(params, questionEl);
    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);
        $(`[name="question-${params.question.id}"]`).on('click', function (event) {
            SaveAnswerData.CheckClick(event.target);
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

function createTextQuestion(params) {
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);
    let choiceEl = `<textarea 
                        id="Description"
                        name="question-${params.question.id}" 
                        class="form-control form-control-xs survey-input" style="" rows="3"
                        data-questionId='${params.question.id}' 
                        data-surveyAnswerId='${params.surveyAnswerId}' 
                        data-showPoint='${params.question.showPoint}'>
                        ${selectedAnswer ? selectedAnswer.text : ''}
                    </textarea>
                </div>`;
    questionEl += choiceEl;
    appendElement(params, questionEl);

    //if (params.question.relatedSurveyQuestionId !== null) {
    //    var relatedQuestion = $(`[name='question-${params.question.relatedSurveyQuestionId}']:checked`)
    //    if (relatedQuestion.length > 0)
    //        $.each(relatedQuestion, function (index, element) {
    //            if ($(element).val() == params.question.showPoint)
    //                $(`[data-questionid="${params.question.id}"]`).closest(".col").show();
    //            else
    //                if ($(`[data-questionid="${params.question.id}"]`).val().length > 0)
    //                    $(`[data-questionid="${params.question.id}"]`).val("");
    //        });

    //    $(`[name='question-${params.question.relatedSurveyQuestionId}']`).on("click", (e) => {
    //        const questionId = e.target.getAttribute("name").split("-")[1];
    //        var element = $(`[data-relatedsurveyquestionid="${questionId}"]`);

    //        if (e.target.value == $(element).attr("data-showpoint")) {
    //            $.each($(`[data-relatedsurveyquestionid="${questionId}"]`), function (index, element) {
    //                $(`[data-relatedsurveyquestionid="${questionId}"]`).closest(".col").show();
    //            });
    //        }
    //        else if ($(`[data-relatedsurveyquestionid="${questionId}"]`).closest(".col").css('display') !== 'none') {
    //            $(`[data-relatedsurveyquestionid="${questionId}"]`).val("").focusout().closest(".col").hide();
    //        }
    //    });
    //};

    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);
        $(`[name="question-${params.question.id}"]`).on('change', function (event) {
            SaveAnswerData.TextFocusout(event.target)
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

function createListQuestion(params) {
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}`;
    const selectedAnswer = params.answerDatas?.find(ad => ad.surveyQuestionId === params.question.id);
    let optionsEl = '<option value=""> --- </option>';
    params.choices.sort((a, b) => a.order - b.order).forEach(choice => {
        const isSelected = selectedAnswer ? selectedAnswer.choiceDataId == choice.choiceDataId : false;
        optionsEl += `<option value="${choice.choiceDataId}" opt-point='${choice.point}' ${isSelected ? 'selected' : ''}>${choice.text}</option>`;
    });

    let choiceEl = `
        <select
            tabindex="-1" aria-hidden="false" opt-sel2
            id="ComboboxId-${params.question.id}" 
            name="ComboboxId-${params.question.id}" 
            class="form-control form-control-xs survey-input"
            riskSituation='${params.riskSituation ? params.riskSituation : ""}' 
            data-questionId='${params.question.id}' 
            data-surveyAnswerId='${params.surveyAnswerId}' 
            data-showPoint='${params.question.showPoint}'
            >
            ${optionsEl}


        </select></div>`;

    questionEl += choiceEl;
    appendElement(params, questionEl);

    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);

        document.querySelector(`#ComboboxId-${params.question.id}`).addEventListener('change', function (event) {
            SaveAnswerData.ListChange(event.target);
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

function createRadioButtonQuestion(params) {
    let questionEl = `<div class='col' 
                          ${params.question.relatedSurveyQuestionId != null && "style='display:none;'"}
                          ${params.question.relatedSurveyQuestionId ? `data-relatedSurveyQuestionId='${params.question.relatedSurveyQuestionId}'` : ''}
                      >${'● ' + params.question.text}
                        <div class="form-check">`;
    let choiceEl = ``;
    params.choices.sort((a, b) => a.order - b.order).forEach(choice => {
        const choiceId = choice.choiceDataId;
        const previouslySelectedChoice = params.answerDatas?.find(cd => /* cd.point === choice.point && */ cd.choiceDataId === choice.choiceDataId && params.question.id == cd.surveyQuestionId);
        choiceEl += `<div class='row'>
            <label class="form-check-label custom-radio mt-1">
                <input type='radio' class="form-check-input survey-input"
                    riskSituation='${params.riskSituation ? params.riskSituation : ""}'
                    name='question-${params.question.id}'
                    value='${choice.point}'
                    choiceDataId='${choice.choiceDataId}'
                    ${params.question.id ? `data-questionId='${params.question.id}'` : ''}
                    ${choiceId ? `data-choiceId='${choiceId}'` : ''}
                    ${params.surveyAnswerId ? `data-surveyAnswerId='${params.surveyAnswerId}'` : ''}
                    data-showPoint='${params.question.showPoint}'
                    ${previouslySelectedChoice ? 'checked' : ''}
                /> 
                <span class='radio-circle mr-1'>
                    <i class='fas fa-check checkmark'></i>  
                </span>
                ${choice.text}
            </label>
        </div>`;
    });

    questionEl += `${choiceEl}</div></div>`;
    appendElement(params, questionEl);

    if (params.elHtml[0].id != "previewArea") {
        if (!params.isClient) params.elHtml.find('.survey-input').prop('disabled', true);
        $(`[name = "question-${params.question.id}"]`).on('change', function (event) {
            SaveAnswerData.RadioClick(event.target)
        });
    }
    else {
        params.elHtml.find('.survey-input').prop('disabled', true);
    }
}

//if (params.question.relatedSurveyQuestionId !== null) {
//    var relatedQuestion = $(`[name='question-${params.question.relatedSurveyQuestionId}']:checked`)
//    if (relatedQuestion.length > 0)
//        $.each(relatedQuestion, function (index, element) {
//            if ($(element).val() == params.question.showPoint)
//                $(`[data-questionid="${params.question.id}"]`).closest(".col").show();
//            else
//                if ($(`[data-questionid="${params.question.id}"]`).val().length > 0)
//                    $(`[data-questionid="${params.question.id}"]`).val("");
//        });

//    $(`[name='question-${params.question.relatedSurveyQuestionId}']`).on("click", (e) => {
//        const questionId = e.target.getAttribute("name").split("-")[1];
//        var element = $(`[data-relatedsurveyquestionid="${questionId}"]`);

//        if (e.target.value == $(element).attr("data-showpoint")) {
//            $.each($(`[data-relatedsurveyquestionid="${questionId}"]`), function (index, element) {
//                $(`[data-relatedsurveyquestionid="${questionId}"]`).closest(".col").show();
//            });
//        }
//        else if ($(`[data-relatedsurveyquestionid="${questionId}"]`).closest(".col").css('display') !== 'none') {
//            $(`[data-relatedsurveyquestionid="${questionId}"]`).val("").focusout().closest(".col").hide();
//        }
//    });
//};

function findDesiredElement($element) {
    var $firstChild = $element.children();

    if ($firstChild.is('input, textarea, select')) {
        return $firstChild;
    } else if ($firstChild.is('div, label')) {
        return findDesiredElement($firstChild);
    } else {
        return null;
    }
}

function handleQuestionDependencies(flag = "init") {
    var desiredElements = [];

    $('div.col[data-relatedsurveyquestionid]').each(function () {
        var $desiredElement = findDesiredElement($(this));
        if ($desiredElement) {
            desiredElements.push($desiredElement);
        }
    });

    $(desiredElements).each(function () {
        let $dependentQuestion = $(this); // Bağımlı soru
        const relatedQuestionId = $dependentQuestion.closest(".col").data("relatedsurveyquestionid");
        const showPoint = $dependentQuestion.attr("data-showpoint");
        const $relatedQuestion = $(`[name='question-${relatedQuestionId}']`);

        checkAndToggleQuestionVisibility($dependentQuestion, $(`[name='question-${relatedQuestionId}'][value='${showPoint}']`), showPoint, "result");

        $relatedQuestion.off("click").on("click", function (e) {
            var desiredElements = [];

            $('div.col[data-relatedsurveyquestionid]').each(function () {
                var $desiredElement = findDesiredElement($(this));
                if ($desiredElement) {
                    desiredElements.push($desiredElement);
                }
            });

            $(desiredElements).each(function () {
                $dependentQuestion = $(this);
                const value = e.target.getAttribute("value");
                const relatedQuestionId = $(`[name='question-${$(this).closest(".col").data("relatedsurveyquestionid")}'][value='${$(this).data("showpoint")}']`);
                checkAndToggleQuestionVisibility($dependentQuestion, $(relatedQuestionId), value);
            });
        });
    });
}

function checkAndToggleQuestionVisibility($dependentQuestion, $relatedQuestion, showPoint, flag) {
    let isToShow = false;
    if ($relatedQuestion.is(':checkbox, :radio')) {
        isToShow = $relatedQuestion.filter(':checked').val() == showPoint;
    }
    //else if ($relatedQuestion.is('select')) {
    //    isToShow = $relatedQuestion.find('option:selected').val() == showPoint;
    //} else { // input text, number, date etc.
    //    isToShow = $relatedQuestion.val() == showPoint;
    //}

    if (isToShow) {
        $dependentQuestion.closest(".col").show();
    } else {
        $dependentQuestion.closest(".col").hide();

        if (flag == "result")
            return;

        var elementType = $dependentQuestion.prop('tagName').toLowerCase();
        if (elementType === 'input') {
            var inputType = $dependentQuestion.attr('type').toLowerCase();
            if (inputType === 'text') {
                $dependentQuestion.val('');
            } else if (inputType === 'checkbox') {
                $dependentQuestion.prop("checked", false);
            } else if (inputType === 'radio') {

                $dependentQuestion.prop("checked", false);
            } else if (inputType === 'date') {
                $dependentQuestion.val('');
            } else if (inputType === 'number') {
                $dependentQuestion.val('');
            }
        } else if (elementType === 'select') {
            $dependentQuestion.val('');
        } else if (elementType === 'textarea') {
            $dependentQuestion.val('');
        }

        try {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "SurveyManagement/SaveAnswerData",
                $requestData = {
                    "Id": 0,
                    "SurveyAnswerId": $dependentQuestion.attr("data-surveyAnswerId"),
                    "SurveyQuestionId": $dependentQuestion.attr("data-questionId"),
                    "Point": 0,
                    "ElementType": 0
                },
                $contentType = ContentTypes.FromForm,
                true, false, true, false
            );
        } catch (error) {
            console.error("SaveAnswerData işlemi başarısız.", error);
        }
    }
}
