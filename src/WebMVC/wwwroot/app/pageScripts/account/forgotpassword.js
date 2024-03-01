const ForgetPasswordPage = {
    Init: function () {
        ForgetPasswordPage.AddEventHandlers();
    },
    AddEventHandlers: function () {
        $("#sendMail").click(ForgetPasswordPage.Helpers.SendMail);
    },
    Component: function () { },
    Helpers: {
        SendMail: function () {
            let data = $("form[name='SendMailForm'] input").serializeArray();
            data = iTech.Convert.ToObj(data);
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Account/forgotPassword", ,
                $requestData = data,
                $useToken = false
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage("login.ChangePassword", "login.SendMail", "info", "toast-top-center");
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        }
    },
    Variables: {}
};

$(ForgetPasswordPage.Init);