const VeriListPage = {
    Init: function () {
        VeriListPage.Component();
    },
    AddEventHandlers: {
        PageHandler: function () {
            $("select#formTanimList").on("select2:select", function () {
                VeriListPage.Helpers.RefreshTable();
            });
        },
        TableHandler: function () {
            $(".modal-footer").off().on("click", "button[data-role='save']", VeriListPage.Helpers.SaveFormData);
            $("table#VeriListTable").off().on("click", "button[data-role='delete']", VeriListPage.Helpers.Delete);
            $("table#VeriListTable").on("click", "button[data-role='edit']", VeriListPage.Helpers.OpenMdl);
            $("div#VeriListTable_wrapper").on("click", "button[name='create']", VeriListPage.Helpers.OpenMdl);
        },
    },
    Component: function () {
        VeriListPage.Helpers.GetParentForm();
        VeriListPage.AddEventHandlers.PageHandler();
        var id = iTech.Helpers.GetUrlParameter("param");

        if (id) {
            $("#formTanimList").val(id).trigger("change");
            VeriListPage.Helpers.RefreshTable();
        }
    },
    Helpers: {
        GetParentForm: function () {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Forms/GetAll/FormTanim",
            ).then(res => {
                if (res.isSuccess && res.value.length > 0)
                    iTech.Select2.Select("formTanimList", res.value, "id", null, null, "ad");
                else
                    iTech.ShowMessage(ShowMessages.ListeBaslik, ShowMessages.ListeMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        RefreshTable: async function () {
            $("#panel-1").removeClass("d-none");
            // Tablo çizilmiş ise 
            if (iTech.DataTable.IsDataTable("#VeriListTable")) {
                $("#VeriListTable").DataTable().destroy();
                $("#VeriListTable").find("thead,tbody").remove();
            }
            const frTnmId = $("#formTanimList").val();
            if (frTnmId) {
                const VeriListTable = await iTech.DataTable.Load.WithoutColumns("#VeriListTable", "Forms/LoadDataCol/" + frTnmId, "Forms/LoadDataTable/VeriList/" + frTnmId, true);

                if (typeof VeriListTable !== "undefined") {
                    VeriListTable.one("draw.dt", VeriListPage.AddEventHandlers.TableHandler);
                } else {
                    $("#VeriListTable").find("thead,tbody").remove();
                }
            }
        },
        OpenMdl: async function () {
            let id = $(this).data("id");
            let formTanimId = $("#formTanimList").val();
            $("#hdnDataFormTanimId").val(formTanimId);

            var formData = [];
            if (id != null && id !== "" && id > 0) {
                $("#hdnDataId").val(id);
                formData = await VeriListPage.Helpers.LoadFormData();
            } else {
                $("#hdnDataId").val(0);
            }
            VeriListPage.Helpers.LoadFormAlan(formData);
        },
        LoadFormData: async function () {
            let formTanimId = $("#formTanimList").val(  );
            var data = {
                Id: $("#hdnDataId").val(),
                FormTanimId: formTanimId,
                Success: false,
                Message: "",
                DataList: []
            }
            var response = [];
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Forms/GetFormData",
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    response = res.value.dataList;
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });

            return response;
        },
        FindItem: function (formData, id) {
            for (var i = 0; i < formData.length; i++) {
                if (formData[i].name == id)
                    return formData[i].value;
            }
            return "";
        },
        LoadFormAlan: function (formData) {
            var formTanimId = $("#hdnDataFormTanimId").val();
            var htmlString = "";

            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Forms/GetAll/FormAlan/" + formTanimId,
            ).then(res => {
                if (res.isSuccess) {
                    const data = res.value;
                    var satirSira = 0;
                    for (var i = 0; i < data.length; i++) {
                        var divRow = "";

                        var oItem = data[i];
                        if (satirSira != oItem.satirSira && satirSira > 0)
                            divRow += "</div>";

                        if (satirSira != oItem.satirSira)
                            divRow += "<div class='row form-group mb-0'>";

                        divRow += "<div class='col-md-" + oItem.sutunGenislik + "'>";
                        divRow += IT.CustomFormManagement.AddLabel(oItem);
                        var existValue = VeriListPage.Helpers.FindItem(formData, oItem.id);
                        if (oItem.veriTip == 40)
                            divRow += IT.CustomFormManagement.AddText(oItem, existValue);
                        else if (oItem.veriTip == 50)
                            divRow += IT.CustomFormManagement.AddCombo(oItem, existValue);
                        else if (oItem.veriTip == 20)
                            divRow += IT.CustomFormManagement.AddDate(oItem, existValue);
                        else if (oItem.veriTip == 10)
                            divRow += IT.CustomFormManagement.AddNumber(oItem, existValue);
                        else if (oItem.veriTip == 30)
                            divRow += IT.CustomFormManagement.AddCheck(oItem, existValue);
                        else if (oItem.veriTip == 60)
                            divRow += IT.CustomFormManagement.GetData(oItem, existValue);
                        else if (oItem.veriTip == 70)
                            divRow += IT.CustomFormManagement.GetChildData(oItem, existValue);
                        divRow += "</div>";

                        satirSira = oItem.satirSira;
                        htmlString += divRow;
                    }
                    htmlString += "</div>";
                    $("#formReplacer").html(htmlString);
                    $("#FormGoruntulemeModal").modal("show");
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        SaveFormData: function () {
            if (!iTech.Helpers.ValidateForm("FormGoruntulemeForm"))
                return false;
            let formValues = $("form[name='FormGoruntulemeForm']").serializeArray();
            const id = $("#hdnDataId").val();
            let formTanimId = $("#formTanimList").val();

            var data = {
                Id: id,
                FormTanimId: formTanimId,
                Success: false,
                Message: "",
                DataList: formValues
            }

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Forms/SaveFormData",
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    $("#hdnDataId").val(res.value.id);
                    VeriListPage.Helpers.RefreshTable();
                    $("#FormGoruntulemeModal").modal("hide");
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        Delete: async function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, "VeriList", "Forms/Delete/FormDeger");
        }
    },
    Variables: {
        FormTanimId: null,
    }
}

$(function () {
    VeriListPage.Init();
});
