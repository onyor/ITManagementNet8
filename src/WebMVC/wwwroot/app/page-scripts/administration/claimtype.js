const ClaimTypePage = {
    Init: function () {
        ClaimTypePage.Variables.FormName = "ClaimType";
        ClaimTypePage.Variables.TableName = "#" + ClaimTypePage.Variables.FormName + "Table";
        ClaimTypePage.Variables.GetMethod = "Identity/Get/" + ClaimTypePage.Variables.FormName;
        ClaimTypePage.Variables.SaveMethod = "Identity/Save" + ClaimTypePage.Variables.FormName;
        ClaimTypePage.Variables.DeleteMethod = "Identity/Delete/" + ClaimTypePage.Variables.FormName;
        ClaimTypePage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + ClaimTypePage.Variables.FormName;
        ClaimTypePage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", ClaimTypePage.Helpers.Save);
        $("table"+ClaimTypePage.Variables.TableName).on("click", "button[data-role='delete']", ClaimTypePage.Helpers.Delete);
        $("table"+ClaimTypePage.Variables.TableName).on("click", "button[data-role='edit']", ClaimTypePage.Helpers.OpenMdl);
        $("div" +ClaimTypePage.Variables.TableName+"_wrapper").on("click", "button[name='create']", ClaimTypePage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(ClaimTypePage.Variables.TableName, ClaimTypePage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", ClaimTypePage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, ClaimTypePage.Variables.FormName, ClaimTypePage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(ClaimTypePage.Variables.FormName, ClaimTypePage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, ClaimTypePage.Variables.FormName, ClaimTypePage.Variables.DeleteMethod);
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
$(ClaimTypePage.Init);
