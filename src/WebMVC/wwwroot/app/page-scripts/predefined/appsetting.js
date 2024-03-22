const AppSettingPage = {
    Init: function () {
        AppSettingPage.Variables.FormName = "AppSetting";
        AppSettingPage.Variables.TableName = "#" + AppSettingPage.Variables.FormName + "Table";
        AppSettingPage.Variables.GetMethod = "Predefined/Get/" + AppSettingPage.Variables.FormName;
        AppSettingPage.Variables.SaveMethod = "Predefined/Save" + AppSettingPage.Variables.FormName;
        AppSettingPage.Variables.DeleteMethod = "Predefined/Delete/" + AppSettingPage.Variables.FormName;
        AppSettingPage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + AppSettingPage.Variables.FormName;
        AppSettingPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", AppSettingPage.Helpers.Save);
        $("table"+AppSettingPage.Variables.TableName).on("click", "button[data-role='delete']", AppSettingPage.Helpers.Delete);
        $("table"+AppSettingPage.Variables.TableName).on("click", "button[data-role='edit']", AppSettingPage.Helpers.OpenMdl);
        $("div" +AppSettingPage.Variables.TableName+"_wrapper").on("click", "button[name='create']", AppSettingPage.Helpers.OpenMdl);
    },
    Component:  function () {
        IT.DataTable(AppSettingPage.Variables.TableName, AppSettingPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", AppSettingPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl:  function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, AppSettingPage.Variables.FormName, AppSettingPage.Variables.GetMethod);
        },
        Save:  function () {
            iTech.Generated.Save(AppSettingPage.Variables.FormName, AppSettingPage.Variables.SaveMethod);
        },
        Delete:  function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, AppSettingPage.Variables.FormName, AppSettingPage.Variables.DeleteMethod);
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
$(AppSettingPage.Init);
