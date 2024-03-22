const CityPage = {
    Init: function () {
        CityPage.Variables.FormName = "City";
        CityPage.Variables.TableName = "#" + CityPage.Variables.FormName + "Table";
        CityPage.Variables.GetMethod = "Predefined/Get/" + CityPage.Variables.FormName;
        CityPage.Variables.SaveMethod = "Predefined/Save" + CityPage.Variables.FormName;
        CityPage.Variables.DeleteMethod = "Predefined/Delete/" + CityPage.Variables.FormName;
        CityPage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + CityPage.Variables.FormName;
        CityPage.Component();
    }, 
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", CityPage.Helpers.Save);
        $("table" + CityPage.Variables.TableName).on("click", "button[data-role='delete']", CityPage.Helpers.Delete);
        $("table" + CityPage.Variables.TableName).on("click", "button[data-role='edit']", CityPage.Helpers.OpenMdl);
        $("div" + CityPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", CityPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(CityPage.Variables.TableName, CityPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", CityPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, CityPage.Variables.FormName, CityPage.Variables.GetMethod);
        },
        Save: async function () {
          await iTech.Generated.Save(CityPage.Variables.FormName, CityPage.Variables.SaveMethod);
        },
        Delete:  function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, CityPage.Variables.FormName, CityPage.Variables.DeleteMethod);
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
$(CityPage.Init);
