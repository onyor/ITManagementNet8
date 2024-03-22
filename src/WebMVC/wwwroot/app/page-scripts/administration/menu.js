const MenuPage = {
    Init: function () {
        MenuPage.Variables.FormName = "Menu";
        MenuPage.Variables.TableName = "#" + MenuPage.Variables.FormName + "Table";
        MenuPage.Variables.GetMethod = "Identity/Get/" + MenuPage.Variables.FormName;
        MenuPage.Variables.GetAllMethod = "Identity/GetAll/" + MenuPage.Variables.FormName;
        MenuPage.Variables.SaveMethod = "Identity/Save" + MenuPage.Variables.FormName;
        MenuPage.Variables.DeleteMethod = "Identity/Delete/" + MenuPage.Variables.FormName;
        MenuPage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + MenuPage.Variables.FormName;
        MenuPage.Component();
        $("#MenuModal").on("shown.bs.modal", function (e) { $(document).off("focusin.modal"); });
    },
    AddEventHandlers: function () {
        $("table#MenuTable").on("click", "button[data-role='delete']", MenuPage.Helpers.Delete);
        $("table#MenuTable").on("click", "button[data-role='edit']", MenuPage.Helpers.OpenMdl);
        $(".modal-footer").off("click").on("click", "button[data-role='save']", MenuPage.Helpers.Save);
        $("div#MenuTable_wrapper").off("click").on("click", "button[name='create']", MenuPage.Helpers.OpenMdl);
        $("select#MenuController").change(MenuPage.Helpers.GetMenuActions);

        $("#iconpick").on("change", function (e) {
            $("#Icon").val(e.icon);
        });

        $("#iconpick").iconpicker();

        $('#IsNotMenuVisible').change(function () {
            if ($(this).is(':checked')) {
                $('#Name').prop('required', false).closest('.row').hide();
                $('#Description').closest('.row').hide();
                $('#ParentId').closest('.row').hide();
                $('#Order').prop('required', false).closest('.row').hide();
                $('#Param').closest('.row').hide();
                $('#Icon').closest('.row').hide();
                $('#MenuController').prop('required', true);
                $('#MenuAction').prop('required', true);
            } else {
                $('#Name').prop('required', true).closest('.row').show();
                $('#Description').closest('.row').show();
                $('#ParentId').closest('.row').show();
                $('#Order').prop('required', true).closest('.row').show();
                $('#Param').closest('.row').show();
                $('#Icon').closest('.row').show();
                $('#MenuController').prop('required', false);
                $('#MenuAction').prop('required', false);
            }
        });
    },
    Component: async function () {
        await IT.DataTable("#MenuTable", MenuPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", () => {
                MenuPage.AddEventHandlers();
                if (iTech.lclStr.get("LastMenuPageNumber") != null)
                    $("#MenuTable").DataTable().page(iTech.lclStr.get("LastMenuPageNumber")).draw(false);
                $("#MenuTable_wrapper").closest(".table-responsive").removeClass("d-none");
                $(".spinner-border").hide();
            });
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = $(this).data("id");
            iTech.Helpers.ClearForm($("form[name='MenuForm']"));
            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                // Edit
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = `${MenuPage.Variables.GetMethod}/${id}`,
                ).then(async (res) => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map("MenuForm", res.value);
                        await MenuPage.Helpers.GetParentMenu(res.value.parentId);
                        await MenuPage.Helpers.GetRoles(res.value.menuRoles);
                        await MenuPage.Helpers.GetMenuControllers(res.value.url);
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            } else {
                $("#hdnDataId").val("0");
                MenuPage.Helpers.GetParentMenu();
                MenuPage.Helpers.GetRoles();
                MenuPage.Helpers.GetMenuControllers();
            }
            $("#MenuModal").modal("show");
            iTech.lclStr.set("LastMenuPageNumber", $("#MenuTable").DataTable().page());
        },
        Save: function () {
            if (!iTech.Helpers.ValidateForm("MenuForm"))
                return false;
            let data = $("form[name='MenuForm']").find("input,textarea,select").serializeArray();
            data = iTech.Convert.ToObj(data);

            data.MenuRoles = [];

            $.each($("#MenuRoles").val(), function (index, element) {
                var obj = {};
                obj.RoleId = element;
                data.MenuRoles.push(obj);
            });

            data.Description = data.Name;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = MenuPage.Variables.SaveMethod,
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                    window.location.reload();
                } else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        Delete: async function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, MenuPage.Variables.FormName, MenuPage.Variables.DeleteMethod);
        },
        GetParentMenu: function (parentId = null) {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = MenuPage.Variables.GetAllMethod,
            ).then(res => {
                if (res.isSuccess && res.value.length > 0) {
                    iTech.Select2.Select("ParentId", res.value, "id", null, parentId, "name");
                } else
                    iTech.ShowMessage(ShowMessages.ListeBaslik, ShowMessages.ListeMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        GetRoles: function (menuRolesObj) {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Identity/GetAll/Role"
            ).then(res => {
                if (res.isSuccess && res.value.length > 0) {
                    iTech.Select2.Select("MenuRoles", res.value, "id", menuRolesObj, "roleId", "name");
                } else
                    iTech.ShowMessage(ShowMessages.ListeBaslik, ShowMessages.ListeMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
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
                    result = res.value.value;
                    if (result.length > 0) {
                        let cname = "";
                        let act = "";
                        if (dataurl !== null) {
                            cname = dataurl.split("/")[0];
                            act = dataurl.split("/")[1];
                        }
                        $("select#MenuController option").remove();
                        let defaultOpt = "<option value='0'> Bir Seçim Yap </option>";
                        let op = "";
                        for (let i = 0; i < result.length; i++) {

                            let select = "";
                            if (cname === result[i].replace("Controller", "")) {
                                select = "selected";
                            }
                            op += "<option value='" + result[i] + "'" + select + " >" + result[i].replace("Controller", "") + "</option>";
                        }
                        $("select#MenuController").append(defaultOpt + op);
                        if (cname.length) MenuPage.Helpers.GetMenuActions(act);

                    } else {
                        alert(iTech.Localization.GetWord("common.NotList"));
                    }
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
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
                    let result = res.value.value;
                    if (result.length > 0) {
                        $("select#MenuAction option").remove();
                        for (let i = 0; i < result.length; i++) {
                            let select = "";
                            if (actName.length && result[i] === actName) select = "selected";
                            const op = "<option id='" +
                                result[i] +
                                "' value='" +
                                result[i] +
                                "' data-select2-id='" +
                                result[i] +
                                "' " +
                                select +
                                ">" +
                                result[i] +
                                "</option>";
                            $("select#MenuAction").append(op);
                        }
                        $("select#MenuAction").change(MenuPage.Helpers.SetUrl);
                    } else {
                        alert(iTech.Localization.GetWord("common.NotList"));
                    }
                    MenuPage.Helpers.SetUrl();
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
$(MenuPage.Init);
