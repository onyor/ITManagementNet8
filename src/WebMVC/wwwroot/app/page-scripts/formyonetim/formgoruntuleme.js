const FormGoruntulemePage = {
    Init: function () {
        FormGoruntulemePage.Component();
        FormGoruntulemePage.AddEventHandlers();
    },
    AddEventHandlers() { },
    Component: function () {
        var formTanimId = $("#hdnDataFormTanimId").val();
        var htmlString = "<h1>Form Viewer</h1><br>";

        iTech.Services.AjaxPromise(
            $type = FormMethod.Get,
            $url = "Forms/GetAllFormAlan/" + formTanimId,
            $requestData = data
        ).then(res => {
            if (res.isSuccess) {
                var data = res.value;
                var satirSira = 0;
                for (var i = 0; i < data.length; i++) {
                    var divRow = "";

                    var oItem = data[i];
                    var className = "";
                    if (satirSira != oItem.satirSira && satirSira > 0)
                        divRow += "</div>";

                    if (satirSira != oItem.satirSira)
                        divRow += "<div class='row form-group mb-0'>";

                    divRow += "<div class='col-md-" + oItem.sutunGenislik + "'>";
                    divRow += IT.CustomFormManagement.AddLabel(oItem);
                    if (oItem.veriTip == 40)
                        divRow += IT.CustomFormManagement.AddText(oItem, className);
                    else if (oItem.veriTip == 50)
                        divRow += IT.CustomFormManagement.AddCombo(oItem);
                    else if (oItem.veriTip == 20)
                        divRow += IT.CustomFormManagement.AddDate(oItem);
                    else if (oItem.veriTip == 10)
                        divRow += IT.CustomFormManagement.AddNumber(oItem);
                    else if (oItem.veriTip == 30)
                        divRow += IT.CustomFormManagement.AddCheck(oItem);
                    else if (oItem.veriTip == 60)
                        divRow += IT.CustomFormManagement.GetData(oItem);
                    else if (oItem.veriTip == 70)
                        divRow += IT.CustomFormManagement.GetChildData(oItem);
                    divRow += "</div>";

                    satirSira = oItem.satirSira;
                    htmlString += divRow;
                }
                htmlString += "</div>";
                $("#formReplacer").html(htmlString);
            }
        }).catch(res => {
            if (res.message.responseText)
                iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
            else
                iTech.ShowMessage("Hatalı İşlem", res.message, "error");
        });
    },
    Helpers: {}
}

$(function () {
    FormGoruntulemePage.Init();
});
