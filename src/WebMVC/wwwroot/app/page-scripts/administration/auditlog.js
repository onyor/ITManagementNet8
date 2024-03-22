const AuditLogPage = {
    Init: function () {
        iTech.FlatPicker.Init($("#CreatedAt1"), new Date(new Date().setMonth(new Date().getMonth() - 1)));
        AuditLogPage.AddEventHandlers.OnPageLoad();
    },
    AddEventHandlers: {
        OnPageLoad: function () {
            $("#btnSearch").on("click", AuditLogPage.Component);
            $("#btnClear").on("click", () => {
                $("#PrimaryKey,#UserId,#Type").val(null).trigger("change");
            });
        },
        OnTableLoad: function () {
            /*$("div#AuditLogTable_wrapper").off().on("click", "[data-role='detail']", LogDetailPage.Helpers.GetAuditTable);*/
        },
    },
    Component: function () {
        $("#TablePanel").show();
        var formElements = $("form[name='LogSorgulamaForm']").find("input,select,textarea");

        var requestData = iTech.Helpers.ConvertToSearchParameter(formElements);

        if ($("#PrimaryKey").val()) {
            var SearchParameterDto = {};
            SearchParameterDto.aranacakDeger = $("#PrimaryKey").val();
            SearchParameterDto.kolonAd = "PrimaryKey";
            SearchParameterDto.veriTipi = "string";
            SearchParameterDto.aramaTipi = 10;
            requestData["aramaKriter"].push(SearchParameterDto);
        };

        IT.DataTable("#AuditLogTable", "Log/LoadDataTable", FormMethod.Post, null, requestData, 0, 0).then((table) => {
            table.one("draw.dt", AuditLogPage.AddEventHandlers.OnTableLoad);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Log/Get/Audit" + id
            ).then(res => {
                if (res.isSuccess) {
                    iTech.Helpers.Map("AuditLogForm", res.value);
                    $("#AuditLogModal").modal("show");
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
    }
}
$(AuditLogPage.Init);
