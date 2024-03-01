const FormAlanPage = {
    Init: function () {
        FormAlanPage.Component();
    },
    AddEventHandlers() {
        $(".modal-footer").off().on("click", "button[data-role='save']", FormAlanPage.Helpers.Save);
        $("table#FormAlanTable").off().on("click", "button[data-role='delete']", FormAlanPage.Helpers.Delete);
        $("table#FormAlanTable").on("click", "button[data-role='edit']", FormAlanPage.Helpers.OpenMdl);
        $("div#FormAlanTable_wrapper").on("click", "button[name='create']", FormAlanPage.Helpers.OpenMdl);
    },
    Component: function () {
        const formTanimId = iTech.Helpers.GetUrlParameter("formTanimId");
        IT.DataTable("#FormAlanTable", "Forms/LoadDataTable/FormAlan/" + formTanimId).then((table) => {
            FormAlanPage.Variables.TableApi = table;
            table.one("draw.dt", FormAlanPage.AddEventHandlers);
        });
    },
    Helpers: {
        GetFormTanimList: async function (id, formTanimId) {
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Forms/GetAll/FormAlan/" + formTanimId,
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    if (res.value.length > 0) {
                        iTech.Select2.Select("ustId", res.value, "id", null, id, "ad");
                    } else
                        iTech.ShowMessage(ShowMessages.ListeBaslik, ShowMessages.ListeMesaj, "error");
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        OpenMdl: function () {
            iTech.Helpers.ClearForm($("form[name='FormAlanForm']"));
            const formTanimId = iTech.Helpers.GetUrlParameter("formTanimId");
            const id = $(this).data("id");
            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = "Forms/Get/FormAlan/" + id
                ).then(res => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map("FormAlanForm", res.value);
                        FormAlanPage.Helpers.GetFormTanimList(res.value.ustId, formTanimId);
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            } else {
                // Create
                $("#hdnFormAlanId").val("0");
            }

            $("#FormAlanModal").modal("show");
        },
        Save: function () {
            if (!iTech.Helpers.ValidateForm("FormAlanForm"))
                return false;
            let data = $("form[name='FormAlanForm']").find("input,textarea,select").serializeArray();
            data = iTech.Convert.ToObj(data);

            const formTanimId = iTech.Helpers.GetUrlParameter("formTanimId");
            data.formTanimId = formTanimId;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Forms/SaveFormAlan",
                $requestData = data,
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                    iTech.DataTable.Refresh.Tables("#FormAlanTable");
                    $("#FormAlanModal").modal("hide");
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        Delete: async function () {
            const dataId = $(this).data("id");
            const deleteConfirmed = await iTech.UI.AskConfirmation();
            if (!deleteConfirmed)
                return false;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Delete,
                $url = "Forms/Delete/FormAlan/" + dataId,
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage(ShowMessages.SilBaslik, ShowMessages.SilMesaj);
                    iTech.DataTable.Refresh.Tables("#FormAlanTable");
                } else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        }
    },
    Variables: {
        TableApi: null
    }
}

$(function () {
    FormAlanPage.Init();
});
