const RequestLogPage = {
    Init: function () {
        iTech.FlatPicker.Init($("#CreatedAt1"), new Date(new Date().setMonth(new Date().getMonth() - 1)));
        RequestLogPage.AddEventHandlers.OnPageLoad();
    },
    AddEventHandlers: {
        OnPageLoad: function () {
            $("#btnSearch").on("click", RequestLogPage.Component);
        },
        OnTableLoad: function () {
            $("div#RequestLogTable_wrapper").on("click", "[data-role='detail']", RequestLogPage.Helpers.OpenMdl);
        },
    },
    Component: function () {
        var formElements = $("form[name='LogSorgulamaForm']").find("input,select,textarea");
        var requestData = iTech.Helpers.ConvertToSearchParameter(formElements);

        IT.DataTable("#RequestLogTable", "Log/RequestLoad", FormMethod.Post, null, requestData, 0, 0).then((table) => {
            table.one("draw.dt", RequestLogPage.AddEventHandlers.OnTableLoad);
        });
    },
    Helpers: {
        OpenMdl: function () {
            let iconCheck = '<i id="true" class="fa fa-check text-success"></i>';
            let iconTimes = '<i id="true" class="fa fa-times text-danger"></i>';
            $("#IsSystem").find("i").remove();

            const id = $(this).data("id");
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Log/Get/Request/" + id
            ).then(res => {
                if (res.isSuccess) {
                    iTech.Helpers.Map("RequestLogForm", res.value);
                    (res.value.isSystem) ?
                        $("#IsSystem").append(iconCheck) : $("#IsSystem").append(iconTimes);

                    if (res.value.createdAt !== null) {
                        var CreatedAt = moment(res.value.createdAt, 'YYYY-MM-DD HH:mm').format("DD.MM.YYYY").toString();
                        $("#CreatedAt").text(CreatedAt);
                    }

                    $("#RequestLogModal").modal("show");
                }
                else
                    return false;
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
    }
}
$(RequestLogPage.Init);
