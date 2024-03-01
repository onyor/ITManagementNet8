const FormTanimPage = {
    Init: function () {
        FormTanimPage.Variables.FormName = "FormTanim";
        FormTanimPage.Variables.TableName = "#" + FormTanimPage.Variables.FormName + "Table";
        FormTanimPage.Variables.GetMethod = "Forms/Get/" + FormTanimPage.Variables.FormName;
        FormTanimPage.Variables.SaveMethod = "Forms/Save" + FormTanimPage.Variables.FormName;
        FormTanimPage.Variables.DeleteMethod = "Forms/Delete/" + FormTanimPage.Variables.FormName;
        FormTanimPage.Variables.LoadTableMethod = "Forms/LoadDataTable/" + FormTanimPage.Variables.FormName;
        FormTanimPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", FormTanimPage.Helpers.Save);
        $("table" + FormTanimPage.Variables.TableName).on("click", "button[data-role='delete']", FormTanimPage.Helpers.Delete);
        $("table" + FormTanimPage.Variables.TableName).on("click", "button[data-role='edit']", FormTanimPage.Helpers.OpenMdl);
        $("table" + FormTanimPage.Variables.TableName).on("click", "button[data-role='settings']", FormTanimPage.Helpers.OpenSettings);
        $("div" + FormTanimPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", FormTanimPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(FormTanimPage.Variables.TableName, FormTanimPage.Variables.LoadTableMethod).then((table) => {
            FormTanimPage.Variables.TableApi = table;
            table.one("draw.dt", FormTanimPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenSettings: function () {
            const id = $(this).data("id");
            window.location.href = `AlanList?formTanimId=${id}`;
        },
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, FormTanimPage.Variables.FormName, FormTanimPage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(FormTanimPage.Variables.FormName, FormTanimPage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, FormTanimPage.Variables.FormName, FormTanimPage.Variables.DeleteMethod);
        }
    },
    Variables: {
        TableApi: null,
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null
    }
}
$(FormTanimPage.Init);
