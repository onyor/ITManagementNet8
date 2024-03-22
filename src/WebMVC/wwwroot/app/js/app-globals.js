"use strict";
const _ = " ";

const appDocs = window.location.host + "/app";

var serverIp, serverPort;

const getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
};

const apiBaseUrl = getCookie("ApiBaseUrl");

const appFolder = {
    images: appDocs + "/images/",
    js: appDocs + "/js",
    pageScripts: appDocs + "/page-scripts",
    localization: appDocs + "/localization/"
}

const _strings = {
    emptyGuid: "00000000-0000-0000-0000-000000000000"
};

//const relatedForms = $("select[data-type='related']");
const dtSelects = $("select[data-type='dynamic'],select[data-type='static'],table[data-type='dynamicTable'],table[data-type='staticTable'],[data-filterTree]");
const flatPickers = $("input[type='date'].flatpickr");
const rangePickers = $("input[type='text'].rangepickr");
let switches = $("input[type='checkbox'].custom-control-input");
const inputMasks = $("input[data-inputmask]");
const tabElement = $("ul[role = 'tablist']");
const authorityElement = $("[data-authority]");
const autoCompletedElement = $("[data-type='autocomplete']");

var ItechLoaderS = ".ajax-loader";
var ItechLoader = document.querySelector('#itech-loader');

if (ItechLoader != null)
    ItechLoaderS = ItechLoader.cloneNode(true);

const _pageElements = {
    lang: $(".language-item"),
    btn: {
        edit: "button[data-role='edit']",
        delete: "button[data-role='delete']",
        loginAs: "a[data-role='loginAs']",
        save: "button[data-translate='common.BtnSave']"
    },
    itechLoaders: ItechLoaderS
};

const FormMethod = {
    Post: "POST",
    Get: "GET",
    Put: "PUT",
    Delete: "DELETE"
};

const contentTypes = {
    Json: "json",
    AppJson: "application/json",
    TextPlain: "text/plain",
    Html: "html"
};

const dataTableOpts = {
    domString: "<'row mb-3'<'col-xl-2 col-lg-3 col-md-4 col-sm-12  d-flex align-items-center justify-content-start'f><'col-xl-8 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center'B><'col-xl-2 col-lg-3 col-md-2 col-sm-12 d-flex align-items-center justify-content-end'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    withoutButtons: "<'row mb-3'<'col-sm-12 col-md-3 d-flex align-items-center justify-content-start'f><'col-sm-12 col-md-9 d-flex align-items-right justify-content-end'l>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>"
};

const ShowMessages = {
    EkleBaslik: "Ekle/Güncelle",
    EkleMesaj: "Veri ekleme başariyla tamamlandi!",
    SilBaslik: "Veri Silme",
    SilMesaj: "Silme işlemi başariyla gerçekleşti!",
    GuncelleBaslik: "Veri Güncelleme",
    GuncelleMesaj: "Güncelleme işlemi başariyla gerçekleşti!",
    HataBaslik: "Hata",
    HataMesaj: "işlem sırasında hata meydana geldi",
    ListeBaslik: "Liste Hatasi",
    ListeMesaj: "Liste mevcut değil."
}

const Int32 = {
    MinValue: -2147483648,
    MaxValue: 2147483647
}
const Int64 = {
    MinValue: -9223372036854775808,
    MaxValue: 9223372036854775807
}

const ContentTypes = {
    FromForm: "application/x-www-form-urlencoded",
    FromBody: "application/json"
}

const Direction = {
    Horizontal: "10",
    Vertical: "20"
}

const EnmQuestionType = {
    Undefined: 0,
    Number: 10,
    Date: 20,
    Bool: 30,
    Text: 40,
    List: 50,
    CheckList: 80,
    RadioButton: 90
}

const EnmQuestionTypeDisplayNames = {
    0: "Undefined",
    10: "Number",
    20: "Date",
    30: "Bool",
    40: "Text",
    50: "List",
    80: "CheckList",
    90: "RadioButton"
};

const pastelHexColors = [
    "#e5a0a0", // Pastel Red
    "#a0e5a0", // Pastel Green
    "#a0a0e5", // Pastel Blue
    "#e5e5a0", // Pastel Yellow
    "#a0e5e5", // Pastel Cyan
    "#e5a0e5", // Pastel Magenta
    "#e5cda0", // Pastel Orange
    "#e5a0e5", // Pastel Purple
    "#e5a0ac", // Pastel Pink
    "#a0e5a0", // Pastel Lime
    "#a0e5e5", // Pastel Teal
    "#a0a0e5", // Pastel Lavender
    "#e5a0a0", // Pastel Brown
    "#e5e5a0", // Pastel Beige
    "#e5a0a0", // Pastel Maroon
    "#a0e5c3"  // Pastel Mint
];