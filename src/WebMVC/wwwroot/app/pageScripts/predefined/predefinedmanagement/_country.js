var CountryPage = {
    Init: function () {
        CountryPage.Variables.FormName = "Country";
        CountryPage.Variables.TableName = "#" + CountryPage.Variables.FormName + "Table";
        CountryPage.Variables.GetMethod = "Predefined/Get/" + CountryPage.Variables.FormName;
        CountryPage.Variables.SaveMethod = "Predefined/Save" + CountryPage.Variables.FormName;
        CountryPage.Variables.DeleteMethod = "Predefined/Delete/" + CountryPage.Variables.FormName;
        CountryPage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + CountryPage.Variables.FormName;
        CountryPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").off().on("click", "button[data-role='save']", CountryPage.Helpers.Save);
        $("table"+CountryPage.Variables.TableName).off().on("click", "button[data-role='delete']", CountryPage.Helpers.Delete);
        $("table"+CountryPage.Variables.TableName).on("click", "button[data-role='edit']", CountryPage.Helpers.OpenMdl);
        $("div" + CountryPage.Variables.TableName+"_wrapper").on("click", "button[name='create']", CountryPage.Helpers.OpenMdl);
    },
    Component:  function () {
        IT.DataTable(CountryPage.Variables.TableName, CountryPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", CountryPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl:  function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, CountryPage.Variables.FormName, CountryPage.Variables.GetMethod);
        },
        Save:  function () {
            iTech.Generated.Save(CountryPage.Variables.FormName, CountryPage.Variables.SaveMethod);
        },
        Delete:  function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, CountryPage.Variables.FormName, CountryPage.Variables.DeleteMethod);
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
$(CountryPage.Init);
