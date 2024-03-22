const RolePage = {
    Init: function () {
        RolePage.Variables.FormName = "Role";
        RolePage.Variables.TableName = "#" + RolePage.Variables.FormName + "Table";
        RolePage.Variables.GetMethod = "Identity/Get/" + RolePage.Variables.FormName;
        RolePage.Variables.SaveMethod = "Identity/Save" + RolePage.Variables.FormName;
        RolePage.Variables.DeleteMethod = "Identity/Delete/" + RolePage.Variables.FormName;
        RolePage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + RolePage.Variables.FormName;
        RolePage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", RolePage.Helpers.Save);
        $("table#RoleTable").on("click", "button[data-role='delete']", RolePage.Helpers.Delete);
        $("table#RoleTable").on("click", "button[data-role='edit']", RolePage.Helpers.OpenMdl);
        $("div#RoleTable_wrapper").on("click", "button[name='create']", RolePage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(RolePage.Variables.TableName, RolePage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", RolePage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, RolePage.Variables.FormName, RolePage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(RolePage.Variables.FormName, RolePage.Variables.SaveMethod);
        },
        Delete: async function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, RolePage.Variables.FormName, RolePage.Variables.DeleteMethod);
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
$(RolePage.Init);