const AnnouncePage = {
    Init: function () {
        AnnouncePage.Variables.FormName = "Announce";
        AnnouncePage.Variables.TableName = "#" + AnnouncePage.Variables.FormName + "Table";
        AnnouncePage.Variables.GetMethod = "Predefined/Get/" + AnnouncePage.Variables.FormName;
        AnnouncePage.Variables.SaveMethod = "Predefined/Save" + AnnouncePage.Variables.FormName;
        AnnouncePage.Variables.DeleteMethod = "Predefined/Delete/" + AnnouncePage.Variables.FormName;
        AnnouncePage.Variables.LoadTableMethod = "Predefined/LoadDataTable/" + AnnouncePage.Variables.FormName;
        AnnouncePage.Component();
    },
    AddEventHandlers: function () {
        $(".modal-footer").on("click", "button[data-role='save']", AnnouncePage.Helpers.Save);
        $("table" + AnnouncePage.Variables.TableName).on("click", "button[data-role='delete']", AnnouncePage.Helpers.Delete);
        $("table" + AnnouncePage.Variables.TableName).on("click", "button[data-role='edit']", AnnouncePage.Helpers.OpenMdl);
        $("div" + AnnouncePage.Variables.TableName + "_wrapper").on("click", "button[name='create']", AnnouncePage.Helpers.OpenMdl);
        $("div#AnnounceTable_wrapper").on("click", "[data-type='switcher']", AnnouncePage.Helpers.SwitchStatus);

        $('.js-summernote').summernote({
            height: 250,
            placeholder: "",
            tabsize: 2,
            dialogsFade: true,
            toolbar: [
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
                ['table', ['table']],
                ['insert', ['link']],
                ['view', ['fullscreen', 'codeview', , 'table', 'undo', 'redo']]
            ],
        });
    },
    Component: function () {
        IT.DataTable(AnnouncePage.Variables.TableName, AnnouncePage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", AnnouncePage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            //iTech.Generated.OpenMdl(id, AnnouncePage.Variables.FormName, AnnouncePage.Variables.GetMethod);

            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = "Predefined/Get/Announce/" + id
                ).then(res => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map("AnnounceForm", res.value);
                        setTimeout(() => {
                            $("#ShownTypeId").val(res.value.shownTypeId).trigger("change");
                        }, 100);
                        $('#Content').summernote('code', res.value.content);
                        $("#AnnounceModal").modal("show");
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalý Ýþlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalý Ýþlem", res.message, "error");
                });
            } else {
                $("#Title").val("");
                $("#Order").val("");
                $('#Content').summernote();
                $('#Content').summernote('code', "");

                const idValType = $("form[name='AnnounceForm'] input[name='Id']").data("id-type");
                if (idValType === "number") {
                    $("form[name='AnnounceForm'] input[name='Id']").val("0");
                } else {
                    $("form[name='AnnounceForm'] input[name='Id']").val(_strings.emptyGuid);
                }
                $("#AnnounceModal").modal("show");

            }
        },
        Save: function () {
            iTech.Generated.Save(AnnouncePage.Variables.FormName, AnnouncePage.Variables.SaveMethod);
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, AnnouncePage.Variables.FormName, AnnouncePage.Variables.DeleteMethod);
        },
        SwitchStatus: async function () {
            const id = $(this).closest("tr").data("id");

            iTech.Services.AjaxPromise(
                $type = FormMethod.Put,
                $url = "Predefined/ToggleIsPublish/" + id,
            ).then(result => {
                if (result.isSuccess) {
                    if (result.value) {
                        iTech.ShowMessage("Bilgi", "Announce aktif hale getirildi!", "info");
                        iTech.DataTable.Refresh.Tables("#AnnounceTable");
                    }
                    else
                        iTech.ShowMessage("Bilgi", "Announce pasif hale getirildi!", "info");
                }

            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalý Ýþlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalý Ýþlem", result.message, "error");
            });
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
$(AnnouncePage.Init);
