const CurrencyDefinitionPage = {
    Init: function () {
        CurrencyDefinitionPage.Variables.FormName = "CurrencyDefinition";
        CurrencyDefinitionPage.Variables.TableName = "#" + CurrencyDefinitionPage.Variables.FormName + "Table";
        CurrencyDefinitionPage.Variables.GetMethod = "Predefined/Get/" + CurrencyDefinitionPage.Variables.FormName;
        CurrencyDefinitionPage.Variables.SaveMethod = "Predefined/Save" + CurrencyDefinitionPage.Variables.FormName;
        CurrencyDefinitionPage.Variables.DeleteMethod = "Predefined/Delete/" + CurrencyDefinitionPage.Variables.FormName;
        CurrencyDefinitionPage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + CurrencyDefinitionPage.Variables.FormName;
        CurrencyDefinitionPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", CurrencyDefinitionPage.Helpers.Save);
        $("table"+CurrencyDefinitionPage.Variables.TableName).on("click", "button[data-role='delete']", CurrencyDefinitionPage.Helpers.Delete);
        $("table"+CurrencyDefinitionPage.Variables.TableName).on("click", "button[data-role='edit']", CurrencyDefinitionPage.Helpers.OpenMdl);
        $("div" + CurrencyDefinitionPage.Variables.TableName+"_wrapper").on("click", "button[name='create']", CurrencyDefinitionPage.Helpers.OpenMdl);
    },
    Component:  function () {
        IT.DataTable(CurrencyDefinitionPage.Variables.TableName, CurrencyDefinitionPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", CurrencyDefinitionPage.AddEventHandlers);
        })
    },
    Helpers: {
        OpenMdl:  function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, CurrencyDefinitionPage.Variables.FormName, CurrencyDefinitionPage.Variables.GetMethod);
        },
        Save:  function () {
            iTech.Generated.Save(CurrencyDefinitionPage.Variables.FormName, CurrencyDefinitionPage.Variables.SaveMethod);
        },
        Delete:  function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, CurrencyDefinitionPage.Variables.FormName, CurrencyDefinitionPage.Variables.DeleteMethod);
        }
    },
    Variables: {
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null
    }
}
$(CurrencyDefinitionPage.Init);
