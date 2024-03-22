const ScenarioPage = {
    Init: function () {
        ScenarioPage.Variables.FormName = "Scenario";
        ScenarioPage.Variables.TableName = "#" + ScenarioPage.Variables.FormName + "Table";
        ScenarioPage.Variables.GetMethod = "Test/Get/" + ScenarioPage.Variables.FormName;
        ScenarioPage.Variables.SaveMethod = "Test/Save" + ScenarioPage.Variables.FormName;
        ScenarioPage.Variables.DeleteMethod = "Test/Delete/" + ScenarioPage.Variables.FormName;
        ScenarioPage.Variables.LoadTableMethod = "Test/LoadDataTable/" + ScenarioPage.Variables.FormName;
        ScenarioPage.Component();

        $("#ComboRefreshCity").attr("data-param", 2);
        IT.ComboRefresh("#ComboRefreshCity");
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", ScenarioPage.Helpers.Save);
        $("table" + ScenarioPage.Variables.TableName).on("click", "button[data-role='delete']", ScenarioPage.Helpers.Delete);
        $("table" + ScenarioPage.Variables.TableName).on("click", "button[data-role='edit']", ScenarioPage.Helpers.OpenMdl);
        $("div" + ScenarioPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", ScenarioPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(ScenarioPage.Variables.TableName, ScenarioPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", ScenarioPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, ScenarioPage.Variables.FormName, ScenarioPage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(ScenarioPage.Variables.FormName, ScenarioPage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, ScenarioPage.Variables.FormName, ScenarioPage.Variables.DeleteMethod);
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
$(ScenarioPage.Init);
