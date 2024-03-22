const ResetPasswordPage = {
    Init:   function () {
          ResetPasswordPage.AddEventHandlers();
    },
    AddEventHandlers:   function () {
        $("#sendPassword").click(ResetPasswordPage.Helpers.SendPassword);
    },
    Component: function () { },
    Helpers: {
        SendPassword:   function () {
            var email = iTech.Helpers.GetUrlParameter("email");
            var token = iTech.Helpers.GetUrlParameter("token");
            var data = {
                email: email,
                token: token
            };

            let formData = $("form[name='SendPasswordForm'] input").serializeArray();
            formData = iTech.Convert.ToObj(formData);
            $.each(formData, function (key, value) {
                data[key] = value;
            });
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Account/resetPassword",
                $requestData = data,
                $useToken = false
            ).then(res => {
                if (res.isSuccess) {

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

$(ResetPasswordPage.Init);