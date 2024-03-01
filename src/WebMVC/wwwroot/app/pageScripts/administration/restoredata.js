const RestoreDataPage = {
    Init: function () {
        RestoreDataPage.Variables.FormName = "RestoreData";
        RestoreDataPage.Variables.TableName = "#" + RestoreDataPage.Variables.FormName + "Table";
        RestoreDataPage.Variables.GetMethod = "AdminManagement/Get/" + RestoreDataPage.Variables.FormName;
        RestoreDataPage.Variables.SaveMethod = "AdminManagement/Save" + RestoreDataPage.Variables.FormName;
        RestoreDataPage.Variables.DeleteMethod = "AdminManagement/Delete/" + RestoreDataPage.Variables.FormName;
        RestoreDataPage.Variables.LoadTableMethod = "AdminManagement/LoadDataTable/" + RestoreDataPage.Variables.FormName;
        RestoreDataPage.AddEventHandlers.PageHandler();
        RestoreDataPage.Helpers.GetMenuControllers();
    },
    AddEventHandlers: {
        PageHandler: function () {
            $("[name='RestoreDataSearchForm']").on("change", "#GenderId, #DepartmentId, #TitleId, #ZoneId, #UserId, #DormId, #RequestTypeId, #CityId ", RestoreDataPage.Helpers.SearchAdvisor);
            $("select#MenuController").change(RestoreDataPage.Helpers.GetMenuActions);
            $("[name='AramaKriterForm']").on("change", "#RequestTypeId", RestoreDataPage.Helpers.AramaKriterChange);
            $("#btnSearch").on("click", RestoreDataPage.Helpers.AramaKriterChange);

            iTech.FlatPicker.OnChange(["#DateMin", "#DateMax"], RestoreDataPage.Helpers.AramaKriterChange);
        },
        TableHandler: function () {
            $("div#RestoreDataTable_wrapper").on("click", "[data-type='switcher']", RestoreDataPage.Helpers.SwitchStatus);
        },
    },
    Components: {
        RestoreDataTable: (aramaKriter) => {
            if (iTech.DataTable.IsDataTable("#RestoreDataTable")) {
                $("#RestoreDataTable").DataTable().destroy();
            }

            var controller = $("#MenuController").val().replace("Controller", "");
            var action = $("#MenuAction").val();

            if (controller.length > 0 && action)
                IT.DataTable("#RestoreDataTable", `${controller}/LoadDataTable/${action}`, FormMethod.Post, "25", aramaKriter).then((table) => {
                    table.on("draw.dt", RestoreDataPage.AddEventHandlers.TableHandler);
                });
        },
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Generated.OpenMdl(id, RestoreDataPage.Variables.FormName, RestoreDataPage.Variables.GetMethod);
        },
        SearchAdvisor: () => {
            if (iTech.DataTable.IsDataTable(RestoreDataPage.Variables.TableName)) {
                $(RestoreDataPage.Variables.TableName).DataTable().destroy();
            }

            var $form = $("form[name='RestoreDataSearchForm']");

            let requestData = iTech.Helpers.ConvertToSearchParameter($form.find("input,select,textarea"));

            IT.DataTable(RestoreDataPage.Variables.TableName, RestoreDataPage.Variables.LoadTableMethod, FormMethod.Post, 10, requestData).then((table) => {

            });
        },
        GetMenuControllers: function (dataurl = null) {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "/Administration/GetAllControllers",
                $requestData = {},
                $contentType = ContentTypes.FromForm,
                $useToken = true,
                $encrypt = false,
                $isApi = false,
            ).then(res => {
                if (res.isSuccess) {
                    if (res.value.length > 0) {
                        let cname = "";
                        let act = "";
                        if (dataurl !== null) {
                            cname = dataurl.split("/")[0];
                            act = dataurl.split("/")[1];
                        }
                        $("select#MenuController option").remove();
                        let defaultOpt = "<option value='0'> Bir Seçim Yap </option>";
                        let op = "";
                        for (let i = 0; i < res.value.length; i++) {

                            let select = "";
                            if (cname === res.value[i].replace("Controller", "")) {
                                select = "selected";
                            }
                            op += "<option value='" + res.value[i] + "'" + select + " >" + res.value[i].replace("Controller", "") + "</option>";
                        }
                        $("select#MenuController").append(defaultOpt + op);
                        if (cname.length) RestoreDataPage.Helpers.GetMenuActions(act);

                    } else {
                        alert(iTech.Localization.GetWord("common.NotList"));
                    }
                }
            }).catch(res => {
                if (res.message.resText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.resText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        GetMenuActions: function (actName) {
            const controllerName = $("#MenuController option:selected").val();
            if (controllerName == null || controllerName === "0") {
                $("select#MenuAction option").remove();
                $("#Url").val("");
                $("#Fake_url").val("");
                return false;
            };

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "/Administration/GetControllerActions",
                $requestData = {
                    controllerName: controllerName
                },
                $contentType = ContentTypes.FromForm,
                $useToken = true,
                $encrypt = false,
                $isApi = false,
                $isApi = false,
            ).then(res => {
                if (res.isSuccess) {
                    if (res.value.length > 0) {
                        $("select#MenuAction option").remove();
                        for (let i = 0; i < res.value.length; i++) {
                            let select = "";
                            if (actName.length && res.value[i] === actName) select = "selected";
                            const op = "<option id='" +
                                res.value[i] +
                                "' value='" +
                                res.value[i] +
                                "' data-select2-id='" +
                                res.value[i] +
                                "' " +
                                select +
                                ">" +
                                res.value[i] +
                                "</option>";
                            $("select#MenuAction").append(op);
                        }
                        $("select#MenuAction").change(RestoreDataPage.Helpers.SetUrl);
                    } else {
                        alert(iTech.Localization.GetWord("common.NotList"));
                    }
                    RestoreDataPage.Helpers.SetUrl();
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        SetUrl: function () {
            let controllerName = $("#MenuController option:selected").val();
            if (controllerName === "0" || controllerName === undefined) return false;

            controllerName = controllerName.replace("Controller", "");

            $("#Url").val(controllerName + "/" + $("select#MenuAction option:selected").val());
            $("#Fake_url").val(controllerName + "/" + $("select#MenuAction option:selected").val());
        },
        SwitchStatus: async function () {
            const id = $(this).closest("tr").data("id");

            var controller = $("#MenuController").val().replace("Controller", "");
            var action = $("#MenuAction").val();

            if (!controller.length > 0 && !action)
                return;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Put,
                $url = `${controller}/ToggleIsDelete/${action}/` + id,
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
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
        AramaKriterChange: () => {
            if (iTech.DataTable.IsDataTable(RestoreDataPage.Variables.TableName)) {
                $(RestoreDataPage.Variables.TableName).DataTable().destroy();
            }

            var $form = $("form[name='AramaKriterForm']");

            let requestData = iTech.Helpers.ConvertToSearchParameter($form.find("input,select,textarea"));

            RestoreDataPage.Components.RestoreDataTable(requestData);
        },
    },
    Variables: {
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null,
        SetUrl: null
    }
}
$(RestoreDataPage.Init);
