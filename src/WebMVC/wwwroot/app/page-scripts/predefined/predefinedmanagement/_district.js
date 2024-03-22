var DistrictPage = {
    Init: function () {
        DistrictPage.Variables.FormName = "District";
        DistrictPage.Variables.TableName = "#" + DistrictPage.Variables.FormName + "Table";
        DistrictPage.Variables.GetMethod = "Predefined/Get/" + DistrictPage.Variables.FormName;
        DistrictPage.Variables.SaveMethod = "Predefined/Save" + DistrictPage.Variables.FormName;
        DistrictPage.Variables.DeleteMethod = "Predefined/Delete/" + DistrictPage.Variables.FormName;
        DistrictPage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + DistrictPage.Variables.FormName;
        DistrictPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", DistrictPage.Helpers.Save);
        $("table" + DistrictPage.Variables.TableName).off().on("click", "button[data-role='delete']", DistrictPage.Helpers.Delete);
        $("table" + DistrictPage.Variables.TableName).on("click", "button[data-role='edit']", DistrictPage.Helpers.OpenMdl);
        $("div" + DistrictPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", DistrictPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(DistrictPage.Variables.TableName, DistrictPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", DistrictPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, DistrictPage.Variables.FormName, DistrictPage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(DistrictPage.Variables.FormName, DistrictPage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, DistrictPage.Variables.FormName, DistrictPage.Variables.DeleteMethod);
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
$(DistrictPage.Init);
