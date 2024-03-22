const LessonPage = {
    Init: function () {
        LessonPage.Variables.FormName = "Lesson";
        LessonPage.Variables.TableName = "#" + LessonPage.Variables.FormName + "Table";
        LessonPage.Variables.GetMethod = "Test/Get/" + LessonPage.Variables.FormName;
        LessonPage.Variables.SaveMethod = "Test/Save" + LessonPage.Variables.FormName;
        LessonPage.Variables.DeleteMethod = "Test/Delete/" + LessonPage.Variables.FormName;
        LessonPage.Variables.LoadTableMethod = "Test/LoadDataTable/" + LessonPage.Variables.FormName;
        LessonPage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", LessonPage.Helpers.Save);
        $("table"+LessonPage.Variables.TableName).on("click", "button[data-role='delete']", LessonPage.Helpers.Delete);
        $("table"+LessonPage.Variables.TableName).on("click", "button[data-role='edit']", LessonPage.Helpers.OpenMdl);
        $("div" +LessonPage.Variables.TableName+"_wrapper").on("click", "button[name='create']", LessonPage.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable(LessonPage.Variables.TableName, LessonPage.Variables.LoadTableMethod).then((table) => {
            LessonPage.Variables.TableApi=table;
            table.one("draw.dt", LessonPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, LessonPage.Variables.FormName, LessonPage.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save(LessonPage.Variables.FormName, LessonPage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, LessonPage.Variables.FormName, LessonPage.Variables.DeleteMethod);
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
$(LessonPage.Init);
