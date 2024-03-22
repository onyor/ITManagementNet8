const GeneralReportsPage = {
    Init: async () => {
        GeneralReportsPage.Variables.FormName = "GeneralReports";
        GeneralReportsPage.AddEventHandlers.PageHandler();
        GeneralReportsPage.Components.GeneralReportTable();
    },
    AddEventHandlers: {
        PageHandler: function () {
            $("[name='GeneralReportsSearchForm']").on("change", "#UlasimAracId, #GenderId, #CountryId, #CityId, #CurrencyDefinitionId, #RequestLogTypeCodeId", () => iTech.Helpers.SearchFilterForDatatable(GeneralReportsPage.Variables.FormName, GeneralReportsPage.Variables.ReportTable));
            iTech.FlatPicker.OnChange(["#DateMin", "#DateMax"], () => iTech.Helpers.SearchFilterForDatatable(GeneralReportsPage.Variables.FormName, GeneralReportsPage.Variables.ReportTable));
        },
    },
    Components: {
        GeneralReportTable: (aramaKriter) => {
            if (iTech.DataTable.IsDataTable("#GeneralReportTable")) {
                iTech.Helpers.SearchFilterForDatatable(GeneralReportPage.Variables.FormName, GeneralReportPage.Variables.ReportTable);
                return;
            }

            iTech.DataTable.Load.AjaxSourced("#GeneralReportTable", `Test/RequestReportViewModel`, FormMethod.Post, "All", aramaKriter).then((table) => {
                GeneralReportsPage.Variables.ReportTable = table;
            });
        },
    },
    Helpers: {

    },
    Variables: {
        FormName: null,
        ReportTable: null,
    }
}
$(GeneralReportsPage.Init);