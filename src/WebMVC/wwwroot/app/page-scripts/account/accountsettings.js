const AccountSettingsPage = {
    Init: function () {
        AccountSettingsPage.AddEventHandlers();
        AccountSettingsPage.Comment(AccountSettingsPage.Variables.UserId);
    },
    AddEventHandlers: function () {
        $("button[data-role='save']").on("click", () => {
            console.log("Kullanıcı Bilgileri Save Butonu");
        });
        //$("a[data-toggle='collapse']").on("click", function () {
        //     $(this).attr("aria-expanded", "false");
        //     $(this).parents(".card").find(".collapse").removeClass("show");
        //});
        $(".card-header").click(this.SwitchAccordions);
    },
    Comment: () => {

    },
    SwitchAccordions: function (event) {
        //console.log(event);
        var el = $(this).find("a").eq(0);
        if (el.attr("aria-expanded") === "true") {
            el.attr("aria-expanded", "false");
            const target = el.data("target");
            $(el).addClass("collapsed");
            $(target).removeClass("show");
            return false;
        } else {
            el.attr("aria-expanded", "true");
        }
    },
    Helpers: {
        Save: function () {
            if (!iTech.Helpers.ValidateForm("AccountSettingForm"))
                return false;

            let data = $("form[name='AccountSettingForm']").find("input,textarea,select").serializeArray();
            data = iTech.Convert.ToObj(data);
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Account/changepassword",
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage(ShowMessages.EkleBaslik, ShowMessages.EkleMesaj);
                }
                else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        }
    },
    Variables: {
        UserId: null,
    }
}

$(AccountSettingsPage.Init);
