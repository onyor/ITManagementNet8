var UserPage = {
    Init: function () {
        UserPage.Variables.FormName = "User";
        UserPage.Variables.TableName = "#" + UserPage.Variables.FormName + "Table";
        UserPage.Variables.GetMethod = "Identity/Get/" + UserPage.Variables.FormName;
        UserPage.Variables.SaveMethod = "Identity/Save" + UserPage.Variables.FormName;
        UserPage.Variables.DeleteMethod = "Identity/Delete/" + UserPage.Variables.FormName;
        UserPage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + UserPage.Variables.FormName;
        iTech.Helpers.DataVisible(UserPage.Variables.FormName);
        UserPage.Component();
    },
    AddEventHandlers() {
        $("table#UserTable").off("click").on("click", "button[data-role='loginas']", UserPage.Helpers.LoginAs);
        $("table#UserTable").on("click", "button[data-role='delete']", UserPage.Helpers.Delete);
        $("table#UserTable").on("click", "button[data-role='edit']", UserPage.Helpers.OpenMdl);
        $(".modal-footer").off("click").on("click", "button[data-role='save']", UserPage.Helpers.Save);
        $("div#UserTable_wrapper").off("click").on("click", "button[name='create']", UserPage.Helpers.OpenMdl);
        $("table" + UserPage.Variables.TableName).on("click", "button[data-role='passive']", UserPage.Helpers.ActivePassive);
        $("table" + UserPage.Variables.TableName).on("click", "button[data-role='active']", UserPage.Helpers.ActivePassive);
        $(":input").inputmask();
        $("select[name='UserTable_length']").on("dblclick", () => { $("[data-role='loginas']").toggle(); });
        $("#mySwitch").on("click", () => iTech.Helpers.NotActiveSwitch(UserPage.Variables.FormName,"Identity"));
    },
    Component: function () {
        IT.DataTable(UserPage.Variables.TableName, UserPage.Variables.LoadTableMethod).then((table) => {
            UserPage.Variables.UserTable = table;
            table.one("draw.dt", UserPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            $("#companyListDiv,#facilityListDiv").removeClass("d-none");
            const id = $(this).data("id");
            iTech.Helpers.ClearForm($("form[name='UserForm']"));
            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                // Edit
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = UserPage.Variables.GetMethod + "/" + id,
                ).then(res => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map("UserForm", res.value);
                        UserPage.Helpers.GetRoles(res.value.userRoles);
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            } else {
                // Create
                const idType = $("#hdnDataId").data("id-type");
                if (idType === "id")
                    $("#hdnDataId").val("0");
                else
                    $("#hdnDataId").val(_strings.emptyGuid);
                UserPage.Helpers.GetRoles();
            }
            $("#UserModal").modal("show");
        },
        Save: function () {
            if (!iTech.Helpers.ValidateForm("UserForm"))
                return false;

            let data = $("form[name='UserForm'] input").serializeArray();
            data = iTech.Convert.ToObj(data);
            data.userRoles = [];
            $.each($("#RoleList").val(),
                function (index, element) {
                    const obj = {};
                    obj.roleId = element;
                    data.userRoles.push(obj);
                });

            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = UserPage.Variables.SaveMethod,
                $requestData = data
            ).then(async result => {
                if (result.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                    iTech.DataTable.Refresh.Tables("#UserTable");
                    $("#UserModal").modal("hide");
                }
                else {
                    if (result.validationErrors.length > 0) {
                        let errorMessage = "Hatalar:\n";
                        result.validationErrors.forEach(error => {
                            errorMessage += "- " + error.errorMessage + "\n";
                        });
                        iTech.ShowMessage("Hata", errorMessage, "warning");
                    }
                    else {
                        iTech.ShowMessage("Hata", result.errors[0], "warning");
                        iTech.DataTable.Refresh.Tables("#UserTable");

                        await iTech.UI.AskConfirm(
                            "Danışman Sayfasına Yönlendir",
                            "Git",
                            "İptal",
                            "warning",
                            "green",
                            "Danışman tablosundaki kayıtı güncelle"
                        ).then((confirm, v, e) => {
                            if (confirm) {
                                window.location.href = `/AdminManagement/AdvisorDefinition?id=${result.errors[1]}`;
                            }
                            else
                                $("#UserModal").modal("hide");
                        });
                    }
                }
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
        Delete: async function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, UserPage.Variables.FormName, UserPage.Variables.DeleteMethod);
        },
        LoginAs: async function () {
            const userId = $(this).data("id");
            let user = iTech.DataTable.FindInDataSet("UserTable", "id", userId);

            const form = document.createElement('form');
            form.method = 'post';
            form.action = '/Account/LoginAsUser';

            const emailInput = document.createElement('input');
            emailInput.type = 'hidden';
            emailInput.name = 'email';
            emailInput.value = user.email;
            form.appendChild(emailInput);

            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'token';
            tokenInput.value = getToken();
            form.appendChild(tokenInput);

            document.body.appendChild(form);
            form.submit();
        },
        GetRoles: function (userRoles) {
            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Identity/GetAll/Role",
            ).then(res => {
                if (res.isSuccess && res.value.length > 0) {
                    iTech.Select2.Select("RoleList", res.value, "id", userRoles, "roleId", "name");
                } else
                    iTech.ShowMessage(ShowMessages.ListeBaslik, ShowMessages.ListeMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        ActivePassive: function () {
            const id = $(this).data("id");
            iTech.Generated.ActivePassive(id, "User", "Identity/TakePassive/User/");
        },
    },
    Variables: {
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null,
        UserTable: null,
        ColPassive: null,
        ColActive: null
    }

}
$(UserPage.Init);
