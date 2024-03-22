const StudentPage = {
    Init: function () {
        StudentPage.Variables.FormName = "Student";
        StudentPage.Variables.TableName = "#" + StudentPage.Variables.FormName + "Table";
        StudentPage.Variables.GetMethod = "Test/Get/" + StudentPage.Variables.FormName;
        StudentPage.Variables.SaveMethod = "Test/Save" + StudentPage.Variables.FormName;
        StudentPage.Variables.DeleteMethod = "Test/Delete/" + StudentPage.Variables.FormName;
        StudentPage.Variables.LoadTableMethod = "Test/LoadDataTable/" + StudentPage.Variables.FormName;
        StudentPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", StudentPage.Helpers.Save);
        $("table"+StudentPage.Variables.TableName).on("click", "button[data-role='delete']", StudentPage.Helpers.Delete);
        $("table"+StudentPage.Variables.TableName).on("click", "button[data-role='edit']", StudentPage.Helpers.OpenMdl);
        $("div" +StudentPage.Variables.TableName+"_wrapper").on("click", "button[name='create']", StudentPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(StudentPage.Variables.TableName, StudentPage.Variables.LoadTableMethod).then((table) => {
            StudentPage.Variables.TableApi=table;
            table.one("draw.dt", StudentPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, StudentPage.Variables.FormName, StudentPage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(StudentPage.Variables.FormName, StudentPage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, StudentPage.Variables.FormName, StudentPage.Variables.DeleteMethod);
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
$(StudentPage.Init);
