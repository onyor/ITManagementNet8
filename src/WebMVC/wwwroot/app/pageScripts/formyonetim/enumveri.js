const EnumVeriPage = {
    Init: function () {
        EnumVeriPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", EnumVeriPage.Helpers.Save);
        $("table#EnumVeriTable").on("click", "button[data-role='delete']", EnumVeriPage.Helpers.Delete);
        $("table#EnumVeriTable").on("click", "button[data-role='edit']", EnumVeriPage.Helpers.OpenMdl);
        $("div#EnumVeriTable_wrapper").on("click", "button[name='create']", EnumVeriPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable("#EnumVeriTable", "Forms/LoadDataTable/EnumVeri").then((table) => {
            table.one("draw.dt", EnumVeriPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: async function () {
            const id = $(this).data("id");
            iTech.Helpers.ClearForm($("form[name='EnumVeriForm']"));
            $("#EnumVeriModal").modal("show");
            $("form[name='EnumVeriForm']").find("input,select,textarea").val("");
            $("form[name='EnumVeriForm']").find("p").html("");
            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                await iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = "Forms/Get/EnumVeri/" + id,
                ).then(res => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map("EnumVeriForm", res.value);
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            } else {
                $("#hdnDataId").val("0");
            }

        },
        Save: function () {
            if (!iTech.Helpers.ValidateForm("EnumVeriForm"))
                return false;

            let data = $("form[name='EnumVeriForm']").serializeArray();
            data = iTech.Convert.ToObj(data);

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Forms/SaveEnumVeri",
                $requestData = data,
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage("İşlem Sonucu", "EnumVeri Ekle/Güncelle İşlemi Başarısız.");
                    iTech.DataTable.Refresh.Tables("#EnumVeriTable");
                    $("#EnumVeriModal").modal("hide");
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

            const res = iTech.Services.Ajax(FormMethod.Delete, "Forms/Delete/EnumVeri/" + dataId);

            if (res.isSuccess) {
                iTech.ShowMessage("İşlem Sonucu", "Silme İşlemi Başarılı");
                iTech.DataTable.Refresh.Tables("#EnumVeriTable");
            } else
                iTech.ShowMessage("İşlem Sonucu", "Silme İşlemi Sırasında Hata Meydana Geldi!", "error");
        }
    },
    Variables: {

    }
}
$(EnumVeriPage.Init);
