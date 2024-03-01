const PredefinedPage = {
    Init: () => {
        PredefinedPage.AddEventHandlers();
    },
    AddEventHandlers: () => {

    },
    Component: () => {

    },
    Helpers: {
        ClearForm: function () {
            $("main span").not(".nav-tabs span").text("");
            $("input[name='AdSoyad']").val("");
            $("input#KurumSicilNo").val("");
            $('[href="#PredefinedNufusBilgi-tab"]').click();
        },
    },
    Variables: {
    }
}
$(PredefinedPage.Init);