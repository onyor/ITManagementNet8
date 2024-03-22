var RoleClaimPage = {
    Init: function () {
        RoleClaimPage.Variables.FormName = "RoleClaim";
        RoleClaimPage.Variables.TableName = "#" + RoleClaimPage.Variables.FormName + "Table";
        RoleClaimPage.Variables.GetMethod = "Identity/Get/" + RoleClaimPage.Variables.FormName;
        RoleClaimPage.Variables.SaveMethod = "Identity/Save" + RoleClaimPage.Variables.FormName;
        RoleClaimPage.Variables.DeleteMethod = "Identity/Delete/" + RoleClaimPage.Variables.FormName;
        RoleClaimPage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + RoleClaimPage.Variables.FormName;
        RoleClaimPage.Component();
    },
    AddEventHandlers: function () {
        $("#BulkRoleClaimModal .modal-footer").off().on("click", "button[data-role='save']", RoleClaimPage.Helpers.Save);
        $("#RoleClaimModal .modal-footer").off().on("click", "button[data-role='update']", RoleClaimPage.Helpers.Update);
        $("table" + RoleClaimPage.Variables.TableName).on("click", "button[data-role='delete']", RoleClaimPage.Helpers.Delete);
        $("table" + RoleClaimPage.Variables.TableName).on("click", "button[data-role='edit']", RoleClaimPage.Helpers.OpenMdl.Edit);
        $("div" + RoleClaimPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", RoleClaimPage.Helpers.OpenMdl.BulkClaim);
        $("#ClaimtTypeIds").off().on("change", () => $("#hdnClaimValue").val($("[name='RoleClaimForm'] #ClaimtTypeIds :selected").select2().text()));
    },
    Component: function () {
        IT.DataTable(RoleClaimPage.Variables.TableName, RoleClaimPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", RoleClaimPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: {
            BulkClaim: function () {
                iTech.Helpers.ClearForm($("#BulkRoleClaimForm"));
                $("#BulkRoleClaimModal").modal("show");
            },
            Edit: function () {
                const id = $(this).data("id");
                iTech.Generated.OpenMdl(id, RoleClaimPage.Variables.FormName, RoleClaimPage.Variables.GetMethod);
            },
        },
        Update: function () {
            iTech.Generated.Save(RoleClaimPage.Variables.FormName, RoleClaimPage.Variables.SaveMethod);

            RoleClaimPage.Helpers.ClaimUpdateByUser();
        },
        Save: async function () {
            if (!iTech.Helpers.ValidateForm("BulkRoleClaimForm"))
                return null;
            var id = $("form[name='BulkRoleClaimForm'] #hdnDataId").val();
            let dto = {
                id: id,
                roleIds: [],
                claimTypeIds: [],
            };

            $.each($("[name='RoleList']").val(),
                function (index, element) {
                    dto.roleIds.push(element);
                });

            $.each($("[name='ClaimtTypeIds']").val(),
                function (index, element) {
                    dto.claimTypeIds.push(element);
                });


            IT.Ajax(FormMethod.Post, "Identity/AddBulkRoleClaims", dto).then((result) => {
                if (result.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                    iTech.DataTable.Refresh.Tables("#RoleClaimTable");
                    $("#BulkRoleClaimModal").modal("hide");
                }
                else
                    iTech.ShowMessage("Hata", result["message"], "warning");
            });
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, RoleClaimPage.Variables.FormName, RoleClaimPage.Variables.DeleteMethod);
        },
        ClaimUpdateByUser: function () {
            var selectedRoles = $("[name='BulkRoleClaimForm'] #RoleList").select2('data')
                .map(function (elem) { return elem.text; });

            IT.Ajax(
                $type = FormMethod.Post,
                $url = "/Guest/ClaimUpdateByRole",
                $requestData = selectedRoles,
                $contentType = ContentTypes.FromBody,
                $useToken = false,
                $encrypt = false,
                $isApi = false,
            ).then(res => {
                if (res.isSuccess)
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
            }).catch(result => {
                console.log(result);
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
$(RoleClaimPage.Init);
