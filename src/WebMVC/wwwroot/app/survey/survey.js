const QuestionCreators = {
    Number: (params) => createNumberQuestion(params),
    Date: (params) => createDateQuestion(params),
    Bool: (params) => createBoolQuestion(params),
    CheckList: (params) => createCheckListQuestion(params),
    Text: (params) => createTextQuestion(params),
    List: (params) => createListQuestion(params),
    RadioButton: (params) => createRadioButtonQuestion(params),
    Undefined: () => { }
};

function SurveyCreate(questionType, ...args) {
    try {
        const params = {
            question: args[0],
            order: args[1],
            choices: args[2],
            elHtml: args[3],
            answerDatas: args[4],
            surveyAnswerId: args[5],
            isClient: args[6],
            riskSituation: args[7]
        };

        var tempChoices = params.choices;
        tempChoices = params.choices.filter(x => x.surveyQuestionId == params.question.id);
        if (tempChoices.length == 0)
            tempChoices = params.choices.filter(x => x.surveyQuestionId == null);

        params.choices = tempChoices;
        return QuestionCreators[questionType](params);
    } catch (e) {
        console.log(e);
    }
}

const GetAnswerData = async (surveyAnswerId) => {
    return await iTech.Services.AjaxPromise(
        $type = FormMethod.Get,
        $url = "SurveyManagement/GetAnswerDataBySurveyAnswerId",
        $requestData = { surveyAnswerId: surveyAnswerId },
        $contentType = ContentTypes.FromForm
    ).then(res => {
        if (res.isSuccess)
            return res.value;
        else
            return "";
    }).catch(res => {
        if (res.message.responseText)
            iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
        else
            iTech.ShowMessage("Hatalı İşlem", res.message, "error");
    });
}

const SubScaleInit = async (questions, area) => {
    var subScales = questions
        .map(function (x) {
            return { "SubScale": x.subScaleName, "SubScaleOrder": x.subScaleOrder };
        })
        .filter((function () {
            const seen = new Set();
            return function (element) {
                // Check if SubScale is empty or SubScaleOrder is 0
                if (element.SubScale.trim() === '' || element.SubScaleOrder === 0) {
                    return false;
                }
                const isDuplicate = seen.has(element.SubScale);
                seen.add(element.SubScale);
                return !isDuplicate;
            };
        })());

    if (subScales.length > 0) {
        subScales.forEach((element) => {
            var divEl = `<div class="subScale-container">
                    ${element.SubScale}
                    <div class='subScale subScaleArea${element.SubScaleOrder}'> </div>
                </div>`
            $(area).append(divEl);
        });
    }
}

const CreateSurvey = async function (surveyQuestions, choiceData, elHtml, answerDatas, surveyAnswerId, isClient, riskSituation) {

    let table = document.createElement('table');
    table.className = 'survey-table stepTwoTable';
    surveyQuestions.sort(function (a, b) {
        return a.order - b.order;
    }).forEach((question, index) => {
        if (index == 0) {

            // Başlık (thead) oluşturalım
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            headerRow.appendChild(document.createElement('th')); // questionsın başlığı için boş bir hücre

            choiceData.sort(function (a, b) {
                return a.order - b.order;
            }).forEach(choice => {
                const th = document.createElement('th');
                th.textContent = choice.text;
                th.style = "width:fit-content !important;";
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);
        }

        const tr = document.createElement('tr');
        tr.className = 'question';

        // Soru numarasını ve metnini ekleyelim
        const questionCell = document.createElement('td');
        questionCell.className = 'question-cell';
        questionCell.textContent = (index + 1) + '. ' + question.text;
        questionCell.style.width = '30%';
        tr.appendChild(questionCell);
        choiceData.sort(function (a, b) {
            return a.order - b.order;
        }).forEach(choice => {
            const choiceCell = document.createElement('td');
            choiceCell.className = 'choice-cell';
            choiceCell.style.textAlign = 'center';
            choiceCell.style.width = '10%';

            const choiceLabel = document.createElement('label');
            choiceLabel.classList = "custom-radio";
            choiceLabel.style.display = 'flex';
            choiceLabel.style.justifyContent = 'center';
            choiceLabel.style.alignItems = 'center';
            const choiceInput = document.createElement('input');
            choiceInput.type = 'radio';
            choiceInput.name = 'question-' + question.id;
            choiceInput.value = choice.point;
            choiceInput.style.display = 'none';
            const choiceSpan = document.createElement('span');
            choiceSpan.classList = "radio-circle";
            const choiceCheck = document.createElement('i');
            choiceCheck.classList = "fas fa-check checkmark";
            choiceInput.setAttribute("choiceDataId", choice.choiceDataId);
            choiceInput.setAttribute("riskSituation", riskSituation);
            choiceInput.required = true;

            // Burada eklenen yeni özellikler
            isClient ? "" : choiceInput.setAttribute("disabled", "true");
            choiceInput.setAttribute("onclick", "SaveAnswerData.RadioClick(this)");
            choiceInput.setAttribute("data-questionId", question.id);
            choiceInput.setAttribute("data-choiceId", choice.choiceDataId); // Burada choice.id yerine doğru id değerini eklemeniz gerekebilir.
            choiceInput.setAttribute("data-surveyAnswerId", surveyAnswerId); // Burada surveyAnswerId'nin nasıl alındığını bilmiyorum. Bu değeri fonksiyonun içerisinden uygun bir şekilde atamanız gerekebilir.

            const previouslySelectedChoice = answerDatas?.find(cd => cd.surveyQuestionId === question.id && cd.choiceDataId === choice.choiceDataId);

            if (previouslySelectedChoice) {
                choiceInput.checked = true;
            }

            choiceLabel.appendChild(choiceInput);
            choiceLabel.appendChild(choiceSpan);
            choiceSpan.appendChild(choiceCheck);
            choiceCell.appendChild(choiceLabel);
            tr.appendChild(choiceCell);

            table.appendChild(tr);
        });
    });
    elHtml.append(table);
}

const SurveyInit = async (surveyDetail, questions, choices, area, surveyAnswerId, direction = Direction.Vertical, isClient, riskSituation = false) => {
    var answerDatas = await GetAnswerData(surveyAnswerId);
    if (answerDatas) {
        choices = choices.sort(function (a, b) {
            return a.order - b.order;
        })
        var UserInfoString = localStorage.getItem("ITManagement.UserInfo");
        var result = JSON.parse(UserInfoString);
        if (surveyDetail.startHtml) {
            $(area).before("<div style='padding:1rem;'>" + "Merhaba <strong>" + result.fullname + "</strong> " + surveyDetail.startHtml + "</div>");
        }

        switch (direction) {
            case Direction.Horizontal: // PHQ-9
                CreateSurvey(questions, choices, area, answerDatas, surveyAnswerId, isClient, riskSituation);
                break;

            case Direction.Vertical:
                SubScaleInit(questions, area);
                questions.sort((a, b) => a.order - b.order);
                questions.forEach((question, index) => {
                    var questionType = EnmQuestionTypeDisplayNames[question.questionTypeId];
                    SurveyCreate(questionType, question, index, choices, area, answerDatas, surveyAnswerId, isClient, riskSituation);
                });

                handleQuestionDependencies(); 

                break;
            default:
        }
    }
}

const SurveyResult = async (questions, choices, answerDatas, area, direction) => {
    choices = choices.sort(function (a, b) {
        return a.order - b.order;
    })

    switch (direction) {
        case Direction.Horizontal: // PHQ-9
            CreateSurvey(questions, choices, area, answerDatas);
            break;

        case Direction.Vertical:

            SubScaleInit(questions, area);
            questions.forEach((question, index) => {
                var questionType = EnmQuestionTypeDisplayNames[question.questionTypeId];
                SurveyCreate(questionType, question, index, choices, area, answerDatas);
            });

            handleQuestionDependencies("result"); 

            break;
        default:
    }
}

const SaveAnswerData = {
    async process(element, actionType) {
        const questionId = element.getAttribute('data-questionId');
        let choiceId = element.getAttribute('data-choiceId');
        const surveyAnswerId = element.getAttribute('data-surveyAnswerId');

        let value;
        let type = EnmQuestionType.Undefined;

        let dto = {
            "Id": 0,
            "SurveyAnswerId": surveyAnswerId,
            "SurveyQuestionId": questionId,
            "ElementType": type,
            "Point": value,
        };

        switch (actionType) {
            case 'CheckClick':
                var checkList = document.querySelectorAll(`[data-questionid='${questionId}']`);
                dto.Point = 0;
                dto.Text = "";
                $.each(checkList, (k, v) => {
                    if (v.checked) {
                        dto.Point += parseInt(v.getAttribute("data-point"));
                        dto.Text += v.getAttribute("data-choiceid") + ","
                    }
                });

                dto.ElementType = EnmQuestionType.CheckList;
                break;
            case 'BoolCheck':
                var checkbox = document.querySelector(`[data-questionid='${questionId}']`);
                dto.Point = checkbox.checked ? 1 : 0;
                dto.Text = checkbox.checked;
                dto.ElementType = EnmQuestionType.BoolCheck;
                break;
            case 'ListChange':
                var selectedOption = element.options[element.selectedIndex];
                dto.Point = parseInt(selectedOption.getAttribute("opt-point"));
                choiceId = element.value;
                dto.ElementType = EnmQuestionType.List;
                break;
            case 'RadioClick':
                if (!element.checked) return;
                dto.Point = element.getAttribute('value');
                dto.ElementType = EnmQuestionType.RadioButton;
                break;
            case 'ComboChange':
                dto.Point = element.value;
                if (!dto.Point) return;
                dto.ElementType = EnmQuestionType.List;
                break;
            case 'TextFocusout':
                dto.Text = element.value.trim();
                dto.Point = 0;
                dto.ElementType = EnmQuestionType.Text;
                break;
            case 'DateChange':
                dto.Text = element.value.trim();
                dto.Point = 0;
                dto.ElementType = EnmQuestionType.Date;
                break;
            default:
                return;
        }

        if (choiceId) dto["ChoiceDataId"] = choiceId;

        await this.sendData(dto);
    },

    async sendData(dto) {
        try {
            const response = await iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "SurveyManagement/SaveAnswerData",
                $requestData = dto,
                $contentType = ContentTypes.FromForm,
                true, false, true, false
            );
            // İhtiyaç duyarsanız bir sonraki işlem için 'response' kullanabilirsiniz.
        } catch (error) {
            console.error("SaveAnswerData işlemi başarısız.", error);
        }
    },

    ListChange: async function (dateInput) {
        this.process(dateInput, 'ListChange');
    },

    DateChange: async function (dateInput) {
        this.process(dateInput, 'DateChange');
    },

    CheckClick: async function (checkButton) {
        this.process(checkButton, 'CheckClick');
    },

    BoolCheck: async function (checkButton) {
        this.process(checkButton, 'BoolCheck');
    },

    RadioClick: async function (radioButton) {
        this.process(radioButton, 'RadioClick');
    },

    ComboChange: async function (combo) {
        this.process(combo, 'ComboChange');
    },

    TextFocusout: async function (textarea) {
        this.process(textarea, 'TextFocusout');
    }
}
