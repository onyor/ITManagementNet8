var UserClaimPage = {
    Init: function () {
        UserClaimPage.Variables.FormName = "UserClaim";
        UserClaimPage.Variables.TableName = "#" + UserClaimPage.Variables.FormName + "Table";
        UserClaimPage.Variables.GetMethod = "Identity/Get/" + UserClaimPage.Variables.FormName;
        UserClaimPage.Variables.SaveMethod = "Identity/Save" + UserClaimPage.Variables.FormName;
        UserClaimPage.Variables.DeleteMethod = "Identity/Delete/" + UserClaimPage.Variables.FormName;
        UserClaimPage.Variables.LoadTableMethod = "Identity/LoadDataTable/" + UserClaimPage.Variables.FormName;
        UserClaimPage.Component();
    },
    AddEventHandlers: function () {
        $("#BulkUserClaimModal .modal-footer").off().on("click", "button[data-role='save']", UserClaimPage.Helpers.Save);
        $("#UserClaimModal .modal-footer").off().on("click", "button[data-role='update']", UserClaimPage.Helpers.Update);
        $("table" + UserClaimPage.Variables.TableName).off().on("click", "button[data-role='delete']", UserClaimPage.Helpers.Delete);
        $("table" + UserClaimPage.Variables.TableName).on("click", "button[data-role='edit']", UserClaimPage.Helpers.OpenMdl.Edit);
        $("div" + UserClaimPage.Variables.TableName + "_wrapper").on("click", "button[name='create']", UserClaimPage.Helpers.OpenMdl.BulkClaim);
        $("#ClaimtTypeIds").off().on("change", () => $("#hdnClaimValue").val($("[name='UserClaimForm'] #ClaimtTypeIds :selected").select2().text()));
    },
    Component: function () {
        IT.DataTable(UserClaimPage.Variables.TableName, UserClaimPage.Variables.LoadTableMethod).then((table) => {
            table.one("draw.dt", UserClaimPage.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: {
            BulkClaim: function () {
                iTech.Helpers.ClearForm($("#BulkUserClaimForm"));
                $("#BulkUserClaimModal").modal("show");
            },
            Edit: function () {
                const id = $(this).data("id");
                iTech.Generated.OpenMdl(id, UserClaimPage.Variables.FormName, UserClaimPage.Variables.GetMethod);
            },
        },
        Update: function () {
            iTech.Generated.Save(UserClaimPage.Variables.FormName, UserClaimPage.Variables.SaveMethod);

            UserClaimPage.Helpers.ClaimUpdateByUser();
        },
        Save: function () {
            if (!iTech.Helpers.ValidateForm("BulkUserClaimForm"))
                return null;

            let dto = {
                userIds: [],
                claimTypeIds: [],
            };

            $.each($("[name='UserClaimAllForm'] #UserList").val(),
                function (index, element) {
                    dto.userIds.push(element);
                });

            $.each($("[name='UserClaimAllForm'] #ClaimtTypeIds").val(),
                function (index, element) {
                    dto.claimTypeIds.push(element);
                });

            IT.Ajax(FormMethod.Post, "Identity/AddBulkUserClaims", dto).then((result) => {
                if (result.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                    iTech.DataTable.Refresh.Tables("#UserClaimTable");
                    $("#BulkUserClaimModal").modal("hide");
                }
                else
                    iTech.ShowMessage("Hata", result["message"], "warning");
            });
        },
        Delete: function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, UserClaimPage.Variables.FormName, UserClaimPage.Variables.DeleteMethod);
        },
        ClaimUpdateByUser: function () {
            var selectedUsers = $("[name='BulkUserClaimForm'] #UserList").select2('data')
                .map(function (elem) { return elem.text; });

            IT.Ajax(
                $type = FormMethod.Post,
                $url = "/Guest/ClaimUpdateByUser",
                $requestData = selectedUsers,
                $contentType = ContentTypes.FromBody,
                $useToken = false,
                $encrypt = false,
                $isApi = false,
            ).then(result => {
                debugger;
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
$(UserClaimPage.Init);
