$(document).ready(function () {
    var email = iTech.Helpers.GetUrlParameter("email");
    var token = iTech.Helpers.GetUrlParameter("token");
    var data = {
        email: email,
        token: token
    };
    iTech.Services.AjaxPromise(
        $type = FormMethod.Get,
        $url = "Account/confirmEmail",
        $requestData = data,
        $useToken = false,
    ).then(res => {
        if (res.isSuccess) {
            if (res.value.emailConfirmed) {
                $("div.row").removeClass("d-none");
            }
        }
    }).catch(res => {
        if (res.message.responseText)
            iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
        else
            iTech.ShowMessage("Hatalı İşlem", res.message, "error");
    });
});