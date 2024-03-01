const Script = {
    Init: () => {
        Script.GetScripts();
    },
    AddEventHandlers: () => {
        if (localStorage.getItem("themeSettings")) iTech.ThemeSettings.Reset();
        //if (dynamicForms.length || staticForms.length ||relatedForms.length)  iTech.Forms.Generate();
        if (dtSelects.length)
            iTech.Forms.Generate();
        if (flatPickers.length) iTech.FlatPicker.Init(flatPickers);
        if (rangePickers.length) iTech.UI.BootstrapDateRangepicker(rangePickers);
        if (switches.length) iTech.SwitchTexts.Init();


        if (inputMasks.length) iTech.InputMasks.Init();
        if (tabElement.length) iTech.Tabs.Init();
        if (autoCompletedElement.length) iTech.UI.BootstrapAutoCompleted(autoCompletedElement);

        //iTech.UI.AuthorityElementsInit(authorityElement);
    },
    GetScripts: (partialName) => {
        /*console.log(appFolder.pageScripts + iTech.Helpers.GetCurrentPage().toLowerCase());*/
        $.getScript("//" + appFolder.pageScripts + iTech.Helpers.GetCurrentPage().toLowerCase() + ".js").done(function (script, textStatus) {
            Script.AddEventHandlers();
        });

    }
};

$(document).ready(() => {
    Script.Init();
    $("body").keydown(function (e) {
        if (e.ctrlKey && e.shiftKey)
            $(".pull-trigger-btn").click();
    });
}).ajaxStart(() => {
    $("div#itech-loader").css("display", "block");
}).ajaxStop(() => {
    setTimeout(() => {
        $("div#itech-loader").css("display", "none");
    }, 300)
});