const iTech = {
    Version: "20.2.24",
    Services: {
        /**
         * AJAX isteği yapmak için Promise tabanlı bir fonksiyon. API çağrıları yapar, isteğe bağlı olarak istekleri şifreleyebilir ve JWT token'ı ekleyebilir.
         * 
         * @param {FormMethod} $type         İstek türünü belirtir. Örneğin, GET veya POST.
         * @param {string} $url              İsteğin yapılacağı URL'yi belirtir.
         * @param {object} $requestData      Sunucuya gönderilecek veriyi belirtir.
         * @param {ContentTypes} $contentType İsteğin içerik türünü belirtir. Varsayılan değer 'application/x-www-form-urlencoded'.
         * @param {boolean} $useToken        İstek yapılırken JWT token'ının kullanılıp kullanılmayacağını belirtir. Varsayılan değer true.
         * @param {boolean} $encrypt         İsteğin şifrelenip şifrelenmeyeceğini belirtir. Varsayılan değer false.
         * @param {boolean} $isApi           İsteğin API'ye mi yoksa başka bir adrese mi yapılacağını belirtir. Varsayılan değer true.
         * @param {boolean} $showLoader      İstek sırasında bir yükleme göstergesinin gösterilip gösterilmeyeceğini belirtir. Varsayılan değer true.
         * @returns {Promise<object>} İstek başarılı olduğunda çözülen veya hata durumunda reddedilen bir Promise döndürür.
         */
        AjaxPromise: function (
            $type = FormMethod.Post,
            $url,
            $requestData,
            $contentType = ContentTypes.FromForm, // "application/x-www-form-urlencoded" 
            $useToken = true,
            $encrypt = false,
            $isApi = true,
            $showLoader = true) {
            try {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `${$isApi ? iTech.Defaults.ApiBaseUrl : ''}${$url}`,
                        type: $type,
                        contentType: $contentType,
                        data: iTech.Services.Helpers.AjaxPromiseDataConverter($contentType, $requestData),
                        beforeSend: (jqXhr) => {
                            if ($encrypt)
                                jqXhr.setRequestHeader("ControlValue", iTech.Helpers.Encrypt("ID"));
                            if ($useToken)
                                jqXhr.setRequestHeader("Authorization", `Bearer ${iTech.User.GetToken()}`);
                        },
                        success: (data) => {
                            if (data === undefined || data == null) return resolve({});

                            if (data.hasOwnProperty('isSuccess') && data.hasOwnProperty('value')) {
                                resolve(data);
                            } else {
                                const customResult = {
                                    value: data,
                                    isSuccess: true,
                                };
                                resolve(customResult);
                            }
                        },
                        error: (jqXHR, textStatus, errorThrown) => {
                            const result = {
                                statusCode: jqXHR.status,
                                statusText: textStatus,
                                errorThrown: errorThrown,
                                message: jqXHR.responseJSON ? jqXHR.responseJSON.message : (jqXHR.statusText || "An unknown error occurred"),
                            };
                            reject({
                                value: result,
                                isSuccess: false,
                            });
                        },
                    });
                });
            } catch (e) {
                console.error(e);
                return Promise.reject(e);
            }
        },
        Ajax: function (
            $type = FormMethod.Post,
            $url,
            $requestData = {},
            $useToken = true,
            $async = false,
            $contentType = ContentTypes.FromBody, // "application/json"
            $encrypt = false,
        ) {
            try {
                let result = {};
                $.ajax({
                    url: `${iTech.Defaults.ApiBaseUrl}${$url}`,
                    type: $type,
                    async: $async,
                    contentType: $contentType,
                    data: $requestData,
                    beforeSend: (jqXhr) => {
                        if ($encrypt) {
                            jqXhr.setRequestHeader("ControlValue", iTech.Helpers.Encrypt("ID"));
                        }
                        if ($useToken) {
                            jqXhr.setRequestHeader("Authorization", `Bearer ${iTech.User.GetToken()}`);
                        }
                    },
                    success: (data) => {
                        if (data === undefined || data == null)
                            result = {};
                        else {
                            if (data.hasOwnProperty('isSuccess') && data.hasOwnProperty('value')) {
                                result = data;
                            } else {
                                result = {
                                    value: data,
                                    isSuccess: true,
                                };
                            }
                        }
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        result = {
                            value: {
                                statusCode: jqXHR.status,
                                statusText: textStatus,
                                errorThrown: errorThrown,
                                message: jqXHR.responseJSON ? jqXHR.responseJSON.message : (jqXHR.statusText || "An unknown error occurred"),
                            },
                            isSuccess: false,
                        };
                    },
                });
                return result;
            } catch (e) {
                console.error(e);
                return e;
            }
        },
        AjaxPromiseFile: function (type, url, requestData, $useToken = true) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `${iTech.Defaults.ApiBaseUrl}${url}`,
                    type: type,
                    processData: false,
                    contentType: false,
                    data: requestData,
                    beforeSend: (jqXhr) => {
                        if ($useToken) {
                            jqXhr.setRequestHeader("Authorization", `Bearer ${iTech.User.GetToken()}`);
                        }
                    },
                    success: (data) => {
                        if (data === undefined || data == null)
                            return resolve({});
                        resolve(data);
                    },
                    error: (jqXHR, textStatus, errorThrown) => {
                        const result = {
                            statusCode: jqXHR.status,
                            statusText: textStatus,
                            errorThrown: errorThrown,
                            message: jqXHR.responseJSON ? jqXHR.responseJSON.message : (jqXHR.statusText || "An unknown error occurred"),
                        };
                        reject(result);
                    },
                });
            });
        },
        AjaxBlob: function (method, value, action = 'download') {  // 'download' or 'view'
            $.ajax({
                url: `${iTech.Defaults.ApiBaseUrl}${method}`,
                method: 'GET',
                data: value,
                xhrFields: {
                    responseType: 'blob'
                },
                success: (data) => {
                    const a = document.createElement('a');
                    const url = window.URL.createObjectURL(data);
                    a.href = url;

                    if (action === 'download') {
                        const filename = value.path ? value.path.split("files\\")[1] : 'downloaded_file';
                        a.download = filename;
                    } else if (action === 'view') {
                        a.target = '_blank';
                    }

                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                    window.URL.revokeObjectURL(url);
                },
                error: (err) => {
                    console.error("AjaxBlob Error: ", err);
                }
            });
        },
        AjaxReadJson: async function (url) {
            try {
                const response = await $.ajax({
                    url: url,
                    type: "GET",
                });
                return response;
            } catch (error) {
                console.error("Error fetching JSON:", error);
                return error;
            }
        },
        Helpers: {
            AjaxPromiseDataConverter: function (contentType, data) {
                if (contentType === ContentTypes.FromBody) {
                    return JSON.stringify(data);
                } else if (contentType === ContentTypes.FromForm) {
                    return data;
                } else {
                    throw new Error("Desteklenmeyen content type: " + contentType);
                }
            },
        }
    },
    Helpers: {
        Encrypt: function (value) {
            var formData = { sText: value };
            iTech.Services.AjaxPromise(
                $type = FormMethod.Post,
                $url = "Predefined/Sifrele",
                $requestData = formData,
            ).then(res => {
                if (res.isSuccess)
                    return res.value;
                else
                    return "";
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        Base64File: function (contentType, base64Data, fileName, action = 'download') {
            const linkSource = `data:${contentType};base64,${base64Data}`;
            const link = document.createElement("a");
            link.href = linkSource;

            if (action === 'download') {
                link.download = fileName;
            } else if (action === 'view') {
                link.target = '_blank';
                document.body.appendChild(link); // Görüntüleme için link'i DOM'a eklemek gerekir
            }

            link.click();

            if (action === 'view') {
                link.remove(); // Kullanıldıktan sonra link'i DOM'dan kaldır
            }
        },
        FilterCombo: function (comboName, filterText) {
            var names = $('#' + comboName + ' option').clone();


            $('#' + comboName).empty();
            names.filter(function (idx, el) {
                return filterText === 'ALL' || $(el).text().indexOf('[' + filterText + ']') >= 0;
            }).appendTo('#' + comboName);
        },
        BetweenDates: function (startingDate, endingDate) {
            var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
            if (!endingDate) {
                endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
            }
            var endDate = new Date(endingDate);
            if (startDate > endDate) {
                var swap = startDate;
                startDate = endDate;
                endDate = swap;
            }
            var startYear = startDate.getFullYear();
            var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
            var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var yearDiff = endDate.getFullYear() - startYear;
            var monthDiff = endDate.getMonth() - startDate.getMonth();
            if (monthDiff < 0) {
                yearDiff--;
                monthDiff += 12;
            }
            var dayDiff = endDate.getDate() - startDate.getDate();
            if (dayDiff < 0) {
                if (monthDiff > 0) {
                    monthDiff--;
                } else {
                    yearDiff--;
                    monthDiff = 11;
                }
                dayDiff += daysInMonth[startDate.getMonth()];
            }

            return yearDiff + ' Yıl ' + monthDiff + ' Ay ' + dayDiff + ' Gün';
        },
        SetUrlParameter: function (action, params) {
            var encodedParams = [];
            for (var key in params) {
                var _secretKey = CryptoJS.enc.Utf8.parse(secretKey);
                var config = {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                };

                if (params.hasOwnProperty(key)) {
                    var encryptedKey = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(key), _secretKey, config).toString();
                    var encryptedValue = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(params[key]), _secretKey, config).toString();

                    encodedParams.push(encryptedKey + "~" + encryptedValue);
                }
            }
            window.location.href = action + "?" + encodedParams.join("&");
        },
        GetUrlParameter: function (sParam, decoding = false) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            var config = {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            };

            for (i = 0; i < sURLVariables.length; i++) {
                if (decoding) {
                    sParameterName = sURLVariables[i].split('~');
                    var decryptedKey = CryptoJS.AES.decrypt(sParameterName[0], CryptoJS.enc.Utf8.parse(secretKey), config).toString(CryptoJS.enc.Utf8);
                    if (decryptedKey === decodeURIComponent(sParam) || (decryptedKey === sParam)) {
                        var decryptedValue = CryptoJS.AES.decrypt(sParameterName[1], CryptoJS.enc.Utf8.parse(secretKey), config).toString(CryptoJS.enc.Utf8);
                        return decodeURIComponent(decryptedValue);
                    }
                }
                else {
                    sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] === sParam)
                        return decodeURIComponent(sParameterName[1]);
                }
            }
            return false;
        },
        SetComboText: function (comboName, text) {
            $("#" + comboName + " option").filter(function () {

                return $(this).text() == text;
            }).prop('selected', true);
        },
        SetComboItemText: function (comboText, text) {
            $(comboText + " option").filter(function () {

                return $(this).text() == text;
            }).prop('selected', true);
        },
        GetCurrentPage: function (withParameters = false) {
            return (window.location.pathname === "/")
                ? "/Account/Login"
                : (withParameters)
                    ? window.location.pathname + window.location.search
                    : window.location.pathname;

            //return (window.location.pathname === "/")
            //    ? "/Account/Login"
            //    : window.location.pathname;
        },
        ValidateForm: function ($formName) {
            //const requireds = $("form[name='" + $formName + "'] :required");
            const requireds = $("form[name='" + $formName + "'] :required").filter((i, htmlEl) => $(htmlEl).css("visibility") !== "hidden");
            let $this, $result = true;
            const requiredLength = requireds.length;
            let confirmedCounter = 0;
            requireds.each(function (index, htmlEl) {
                let $message = "";
                $this = $(this);
                $this.css("border", "1px solid #E5E5E5");

                const lbl = $this.closest("form").find(`label[for='${$this.attr("name")}']`);
                lbl.find("small").remove();

                const hasRequiredAttr = htmlEl.hasAttribute("required");
                if (hasRequiredAttr) {
                    if ($this.is("[step]")) {
                        $result = ($this.val() != "") ? true : false;
                    } else {
                        $result = $this.get(0).validity.valid;//required
                    }
                }
                else
                    $result = $this.get(0).value.length; // data-required için konfirmasyon.

                if ($(htmlEl).get(0).tagName == 'SELECT') {
                    if (($(htmlEl).get(0).id).indexOf(".") > 0) {
                        var idEl = ($(htmlEl).get(0).id).replace(".", "\\.");
                        $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    }
                    if (($(htmlEl).get(0).id).indexOf(".") < 0) {
                        var idEl = ($(htmlEl).get(0).id);
                        $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    }
                }

                // inputMasks
                if ($this.data("inputmask")) {
                    var maskedValue = $this.data("inputmask").split(":")[1].replace(/['-]/g, "").trim();
                    var inputValue = $this.val().replace(/['_-]/g, "");
                    if (inputValue.length != maskedValue.length)
                        $result = false;
                }

                if ($this.is("[minlength]")) {
                    $result = $this.attr("minlength") == $this.val().length;
                }

                if (!$result) {
                    $message = _ + "<small class='text-danger font-italic'> (*) </small>";
                    $this.css("border", "1px solid red");
                    // FlatPickr (DateTime Picker), bizim insert'i hidden yaptığı için sonraki elemente border verildi
                    if ($this.hasClass("flatpickr-input")) {
                        $this.next().css("border", "1px solid red");
                    }

                    if ($(htmlEl).get(0).tagName == 'SELECT') {
                        if (($(htmlEl).get(0).id).indexOf(".") > 0) {
                            var idEl = ($(htmlEl).get(0).id).replace(".", "\\.");
                            $("#select2-" + idEl + "-container").parent().css("border", "1px solid red");
                        }
                        if (($(htmlEl).get(0).id).indexOf(".") < 0) {
                            var idEl = ($(htmlEl).get(0).id);
                            $("#select2-" + idEl + "-container").parent().css("border", "1px solid red");
                        }
                    }
                }
                else
                    confirmedCounter++;

                lbl.append($message);
            });

            if (confirmedCounter != requiredLength) {
                iTech.ShowMessage("UYARI", "Eksik Alan(lar) Mevcut!", "warning");
                return false;
            }

            return true;
        },
        ValidatePrivate: function ($formName, requiredText) {
            // const requireds = $("form[name='" + $formName + "'] :required");
            const requireds = $("form[name='" + $formName + "'] *[data-required='" + requiredText + "'],form[name='" + $formName + "'] :required").filter((i, htmlEl) => $(htmlEl).css("visibility") !== "hidden");
            let $this, $result = true;
            const requiredLength = requireds.length;
            //$("form[name='" + $formName + "'] span").remove();
            let confirmedCounter = 0;

            requireds.each(function (index, htmlEl) {
                let $message = "";
                $this = $(htmlEl);
                $this.css("border", "1px solid #E5E5E5");

                if ($this.hasClass("flatpickr-input")) {
                    $this.next().css("border", "1px solid #E5E5E5");
                }

                if ($(htmlEl).get(0).tagName == 'SELECT') {
                    $(htmlEl).next(".select2-container").css("border", "1px solid #E5E5E5");
                    //if (($(htmlEl).get(0).id).indexOf(".") > 0) {
                    //    var idEl = ($(htmlEl).get(0).id).replace(".", "\\.");
                    //    $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    //}
                    //if (($(htmlEl).get(0).id).indexOf(".") < 0) {
                    //    var idEl = ($(htmlEl).get(0).id);
                    //    $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    //}
                }

                const lbl = $this.closest("form").find(`label[for='${$this.attr("name")}']`);
                lbl.find("small").remove();

                if ($this.hasAttr("minlength")) {
                    $result = $this.attr("minlength") == $this.val().length;
                }

                // inputMasks
                if ($this.data("inputmask")) {
                    var maskedValue = $this.data("inputmask").split(":")[1].replace(/['-]/g, "").trim();
                    var inputValue = $this.val().replace(/['_-]/g, "");
                    if (inputValue.length != maskedValue.length)
                        $result = false;
                }

                const hasRequiredAttr = htmlEl.hasAttribute("required");
                if (hasRequiredAttr)
                    $result = $this.get(0).validity.valid;//required
                else
                    $result = $this.get(0).value.length; // data-required için konfirmasyon.

                if (!$result) {
                    $message = _ + "<small class='text-danger font-italic'> (*) </small>";
                    $this.css("border", "1px solid red");

                    // FlatPickr (DateTime Picker), bizim insert'i hidden yaptığı için sonraki elemente border verildi
                    if ($this.hasClass("flatpickr-input")) {
                        $this.next().css("border", "1px solid red");
                    }

                    // Select2, select span'a dönüştüğü için başka bir elemente border verildi
                    if ($(htmlEl).get(0).tagName == 'SELECT') {
                        $(htmlEl).next(".select2-container").css("border", "1px solid red");

                        //if (($(htmlEl).get(0).id).indexOf(".") > 0) {
                        //    var idEl = ($(htmlEl).get(0).id).replace(".", "\\.");
                        //    $("#select2-" + idEl + "-container").parent().css("border", "1px solid red");
                        //}
                        //if (($(htmlEl).get(0).id).indexOf(".") < 0) {
                        //    var idEl = ($(htmlEl).get(0).id);
                        //    $("#select2-" + idEl + "-container").parent().css("border", "1px solid red");
                        //}
                    }
                }
                else
                    confirmedCounter++;
            });



            if (confirmedCounter != requiredLength) {
                iTech.ShowMessage("UYARI", "Eksik Alan(lar) Mevcut!", "warning");
                return false;
            }

            var validationResult = (confirmedCounter === requiredLength);
            return validationResult;
        },
        /**
         * @param {string} targetForm  Temizlencecek formun id parametresi "Form"
         * @param {boolean} isDNone    Formun içinde yalnızca d-none olan alanlara silmek için kullanıyoruz
         */
        ClearForm: function (target, isDNone = false) {
            target.find("span").filter((i, el) => { ($(el).hasClass("select2")) ? el : false }).text("");
            target.find("small").text("");
            target.find("input,textarea,select").filter((i, el) => !el.hasAttribute("data-fixedvalue")).val("");

            const inputs = target.find("input,select,textarea,p,img").filter((i, el) => el.type !== "hidden");
            $.each(inputs, (i, htmlEl) => {
                const el = $(htmlEl);

                el.css("border", "1px solid #E5E5E5");

                const lbl = el.closest("form").find(`label[for='${el.attr("name")}']`);
                lbl.find("small").remove();


                if (el.get(0).tagName == 'SELECT') {
                    if ((el.get(0).id).indexOf(".") > 0) {
                        var idEl = (el.get(0).id).replace(".", "\\.");
                        $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    }
                    if (($(htmlEl).get(0).id).indexOf(".") < 0) {
                        var idEl = (el.get(0).id);
                        $("#select2-" + idEl + "-container").parent().css("border", "1px solid #E5E5E5");
                    }
                }
                //#endregion

                if (el.is("select")) {
                    if (!el.hasAttr("data-fixedvalue")) {
                        var defaultText = $(htmlEl).attr("text") != null;
                        if (!defaultText)
                            el.val("").trigger("change");
                    }
                };

                // Switch
                if (el.attr("type") == "checkbox") {
                    if (!el.hasAttr("data-fixedvalue")) {
                        var temp = el.closest("div").attr("switch-text");
                        var defaultCheck = temp?.split(":")[1];
                        el.prop("checked", false);
                        el.siblings().text(defaultCheck);
                    }
                }

                if (el.attr("type") == "radio") {
                    if (!el.hasAttr("data-fixedvalue")) {
                        // Assuming you want to uncheck all radio buttons in a group
                        // You could also set a default value based on a specific condition or data attribute
                        el.prop("checked", false);
                    } else {
                        // If a radio button has a "data-fixedvalue" attribute, you might want to check it
                        // This example assumes the value of "data-fixedvalue" is the value that should be checked
                        let fixedValue = el.data("fixedvalue");
                        if (el.val() === fixedValue) {
                            el.prop("checked", true);
                        }
                    }
                }

                // input number
                if (el.attr("type") == "number") {
                    if (el.data("fixedvalue")) {
                        const fixedValue = el.data("fixedvalue");
                        el.val(fixedValue);
                    }
                }

                if (el.is("textarea")) { }

                // image
                if ($(htmlEl).is("img")) {
                    el.attr("src", "/app/images/profil.jpg");
                }

                // flatpickr
                if (el.hasClass("flatpickr")) {
                    if ($(el).siblings().attr("data-fixedDate") == "today") {
                        iTech.FlatPicker.Init($(el).siblings());
                    }
                }

            });

        },
        SetMapBySelector: function (value, key, selector) {
            key = key.charAt(0).toUpperCase() + key.substr(1); // ilk Harf Büyük Karaktere çevirilir.
            let el = "";

            (selector.includes('Form')) ?
                el = $("form[name='" + selector + "'] *[name='" + key + "']") :
                el = $(selector + " [name='" + key + "']");

            if (value != null) {
                el.val(value);

                // Switch
                if (el.eq(0).attr("type") == "checkbox") {
                    //if (el.eq(0).data("default")) value = el.eq(0).attr("value");
                    iTech.SwitchTexts.SetText(el, value);
                    return;
                }
                // DateTime
                if (el.eq(0).attr("type") == "hidden" && el.eq(0).hasClass("flatpickr")) {
                    //if (el.eq(0).data("default")) value = el.eq(0).attr("value");
                    iTech.FlatPicker.Init(el, value, true);
                    return;
                }

                if (!el.eq(0).hasClass("flatpickr") && value != null && key.includes("Tarih")) {
                    value = moment.utc(value).format('DD.MM.YYYY');
                    if (value == "Invalid date")
                        value = "";
                }

                // Select
                if (el.eq(0).is("select")) {
                    //if (el.eq(0).data("default")) value = el.eq(0).attr("value");
                    el.trigger('change');
                    return;
                }

                if (el.eq(0).is("span")) {

                    if (el.eq(0).hasClass("currency"))
                        el.text(iTech.Helpers.FormatMoney(value));
                    else
                        el.text(value);
                    return;
                }
                if (el.eq(0).is("small")) {

                    if (el.eq(0).hasClass("currency"))
                        el.text(iTech.Helpers.FormatMoney(value));
                    else
                        el.text(value);
                    return;
                }
                if (el.eq(0).is(":hidden") && el.prev().eq(0).is("input[type='search']")) {
                    el.prev().eq(0).val(value);
                    return;
                }
            }
        },
        Map: function (selector, data) {
            Object.keys(data).map((key) => { // name'lerine göre value atayacak.
                const value = data[key];
                const pType = typeof value;
                if (value == null || pType != 'object' || Array.isArray(value)) {
                    iTech.Helpers.SetMapBySelector(value, key, selector);
                }
                else {
                    Object.keys(value).map((keychild) => { // name'lerine göre value atayacak.
                        const valueChild = value[keychild];
                        keychild = keychild.charAt(0).toUpperCase() + keychild.substr(1);
                        iTech.Helpers.SetMapBySelector(valueChild, key + "." + keychild, selector);
                    });
                }
            });
        },
        MapObject: function (obj, properties) {
            const resultObj = {};
            properties.forEach((property) => {
                if (obj.hasOwnProperty(property)) {
                    resultObj[property] = obj[property];
                }
            });

            return resultObj;
        },
        SwitchDisplay: function (element, targetElements, expectedValue, visible = false) {
            const targetElementsArr = targetElements.split(",");
            $.each(targetElementsArr, (index, htmlElement) => {
                var isNone = true;
                const elementValue = $(element).val();

                if (expectedValue.includes(elementValue)) {
                    isNone = false;
                }
                if (isNone)
                    $(htmlElement).removeClass("d-none");
                else {
                    if (!$(htmlElement).hasClass("d-none"))
                        $(htmlElement).addClass("d-none");
                }
            });
            //const targetElementsArr = targetElements.split(",");
            //$.each(targetElementsArr, (index, htmlElement) => {
            //    var visCondition = "hidden";
            //    if (visible && elementValue == expectedValue)
            //        visCondition = "visible";
            //    else if (!visible && elementValue != expectedValue)
            //        visCondition = "visible";
            //    else if (elementValue != expectedValue) 
            //        $(htmlElement).siblings().prop("disabled", false);
            //    if (disabled && elementValue == expectedValue) {
            //        if ($(htmlElement).hasClass("flatpickr")) {
            //            $(htmlElement).siblings().val("");
            //            $(htmlElement).siblings().prop("disabled", true);
            //        }
            //        else {
            //            $(htmlElement).val("");
            //            $(htmlElement).prop("disabled", true);
            //        }
            //    }
            //    $(htmlElement).css("visibility", visCondition);
            //});
        },
        Slugify: function (sName, pName = "") {
            let dataFilter;
            sName = sName.replaceAll("I", "I");
            sName = sName.replaceAll("İ", "I");
            sName = sName.replaceAll("Ü", "U");
            sName = sName.replaceAll("Ç", "C");
            sName = sName.replaceAll("Ö", "O");
            sName = sName.replaceAll("Ş", "S");
            sName = sName.replaceAll("Ğ", "G");
            sName = sName.replaceAll("ı", "i");
            sName = sName.replaceAll("ü", "u");
            sName = sName.replaceAll("ç", "c");
            sName = sName.replaceAll("ö", "o");
            sName = sName.replaceAll("ş", "s");
            sName = sName.replaceAll("ğ", "g");
            if (pName !== null) {
                pName = pName.replaceAll("I", "I");
                pName = pName.replaceAll("İ", "I");
                pName = pName.replaceAll("Ü", "U");
                pName = pName.replaceAll("Ç", "C");
                pName = pName.replaceAll("Ö", "O");
                pName = pName.replaceAll("Ş", "S");
                pName = pName.replaceAll("Ğ", "G");
                pName = pName.replaceAll("ı", "i");
                pName = pName.replaceAll("ü", "u");
                pName = pName.replaceAll("ç", "c");
                pName = pName.replaceAll("ö", "o");
                pName = pName.replaceAll("ş", "s");
                pName = pName.replaceAll("ğ", "g");
            }
            (pName === null) ? dataFilter = sName : dataFilter = pName + " " + sName
            return dataFilter.toLowerCase();
            // Bu iki arkadaşı kullanmayalım.
            //.replaceAll("?", "_")
            //.replaceAll(/ /g, '-')
            //.replaceAll(/[^\w-]+/g, '')
        },
        Debounce: function (func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        },
        FormatMoney: function (num) {
            if (num && !isNaN(num)) {
                var p = num.toFixed(2).split(".");
                return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
                    return num + (num != "-" && i && !(i % 3) ? "." : "") + acc;
                }, "") + "," + p[1];
            }
            else
                return "0.00";
        },
        ConvertToSearchParameter: function (elements) {
            var requestData = { searchParameterDto: [] };
            $.each(elements, (i, htmlEl) => {
                var SearchParameterDto = {};
                var el = $(htmlEl);

                if (el.attr("name") === undefined)
                    return;

                if (el.closest(".row").hasClass("d-none"))
                    return;

                SearchParameterDto.aranacakDeger = el.val();
                SearchParameterDto.kolonAd = el.attr("name");
                SearchParameterDto.veriTipi = "string";
                SearchParameterDto.aramaTipi = 20;

                if (el.is("select")) {
                    if (el.val() == null || !el.val().length)
                        return;
                    SearchParameterDto.veriTipi = "number";

                    if ($(el).attr("data-searchType") == 'bool') {
                        SearchParameterDto.veriTipi = "bool";
                        SearchParameterDto.aramaTipi = 10;
                    }

                    if ($(el).attr("data-searchType") == 'string') {
                        SearchParameterDto.veriTipi = "string";
                        SearchParameterDto.aramaTipi = 20; // Contains
                    }

                    if ($(el).attr("data-searchType") == 'string-esit') {
                        SearchParameterDto.veriTipi = "string";
                        SearchParameterDto.aramaTipi = 10; // ==
                    }

                    if ($(el).attr("data-searchType") == 'decimal-esit') {
                        SearchParameterDto.veriTipi = "decimal";
                        SearchParameterDto.aramaTipi = 10; // ==
                    }

                    if ($(el).attr("data-searchType") == 'child') {
                        SearchParameterDto.veriTipi = "child";
                        SearchParameterDto.aramaTipi = 60; // ==
                    }
                }

                if (el.is("input")) {
                    if (el.val() == null || !el.val().length)
                        return;

                    if (el.attr("type") === "checkbox") {
                        SearchParameterDto.aranacakDeger = el.prop("checked");
                        SearchParameterDto.veriTipi = "bool";
                        SearchParameterDto.aramaTipi = 10;
                    }
                    if (el.attr("type") === "number") {
                        SearchParameterDto.veriTipi = "number";
                    }
                    if (el.attr("type") === "radio") {
                        var oncedenEklenmisMi = $.grep(requestData.searchParameterDto, (obj) => obj.kolonAd === SearchParameterDto.kolonAd).length;
                        if (oncedenEklenmisMi)
                            return;

                        SearchParameterDto.aranacakDeger = el.parent().find(":checked").val();
                    }

                    if (el.hasClass("flatpickr-input")) {
                        SearchParameterDto.veriTipi = "date";
                        SearchParameterDto.aramaTipi = 10;
                        // Tarih aralığı için eklendi. Tarih filtresi yapılacaksa flatpickr içine data-basTar ve data-bitTar eklenecektir.
                        //<input type="date" id="BasTarih" name="BasTarih" data-basTar class="form-control form-control-xs flatpickr" />
                        if (el.hasAttr('data-basTar')) {
                            SearchParameterDto.aramaTipi = 40;
                        }
                        else if (el.hasAttr('data-bitTar')) {
                            SearchParameterDto.aramaTipi = 30;
                        }

                        if (el.hasAttr('data-together')) {
                            var bas = moment($(el).val()).format("YYYY-MM-DD");

                            let togetherDate;
                            if (el.hasAttr('data-basTar')) {
                                togetherDate = $($(el).closest(".row").find("input")[2]);
                            } else {
                                togetherDate = $($(el).closest(".row").find("input")[0]);
                            }

                            if (togetherDate.val() != '' && $(el).val() != '') {
                                var son = moment(togetherDate.val()).format("YYYY-MM-DD");
                                SearchParameterDto.aranacakDeger = bas + "/" + son;
                                SearchParameterDto.kolonAd += "/" + togetherDate.attr("id");
                                SearchParameterDto.aramaTipi = 50;

                                var testTogether = SearchParameterDto.kolonAd.split("/")[1].toString() + "/" + SearchParameterDto.kolonAd.split("/")[0].toString();
                                if (requestData.searchParameterDto.find(x => x.kolonAd == testTogether))
                                    return;
                            }
                        }
                    }

                    // Geliştirilecek
                    //if ($(el).hasAttr('date-rangepickr')) {
                    //    SearchParameterDto.veriTipi = "date";
                    //    var bas = moment($(el).val().split(" - ")[0], "DD/MM/YYYY").format("YYYY-MM-DD");
                    //    var son = moment($(el).val().split(" - ")[1], "DD/MM/YYYY").format("YYYY-MM-DD");
                    //    SearchParameterDto.aranacakDeger = bas + "/" + son;
                    //    SearchParameterDto.aramaTipi = 50;
                    //}
                }

                if ($(el).hasAttr('data-filtercolname')) {
                    const tableData = $(el).DataTable().rows(".selected").data()[0];

                    if (tableData !== undefined) {
                        SearchParameterDto.veriTipi = "number"
                        const selectedItems = $(el).DataTable().rows(".selected").data();

                        let arrayToSend = [];
                        $.each(selectedItems, (i, obj) => {
                            arrayToSend.push(obj[$(el).attr('data-filtercolname')]);
                        });

                        SearchParameterDto.aranacakDeger = arrayToSend;
                    }
                }

                if ($(el).hasAttr('data-filterTree')) {
                    const treeArray = $(el).jstree("get_selected").filter(x => x != 1);
                    if (treeArray.length > 0) {
                        SearchParameterDto.veriTipi = "number"
                        SearchParameterDto.aranacakDeger = treeArray;
                    }
                }

                if (SearchParameterDto.veriTipi == "number")
                    SearchParameterDto.aramaTipi = 10;

                if (SearchParameterDto.aranacakDeger !== null && SearchParameterDto.aranacakDeger !== "" && $(el).attr("data-searchType") !== 'none')
                    requestData.searchParameterDto.push(SearchParameterDto);
            });

            return requestData;
        },
        ObjectKeysRename: function (obj, newKeys) {
            //const obj = { a: "1", b: "2" };
            //const newKeys = { a: "A", c: "C" };
            //const renamedObj = renameKeys(obj, newKeys);
            //console.log(renamedObj);
            // {A:"1", b:"2"}


            //let newObj = {};
            //$.each(Object.entries(obj), (k, v) => {
            //    newObj[v[0]] = v[0] + 'Donusum';
            //});

            const keyValues = Object.keys(obj).map(key => {
                const newKey = newKeys[key] || key;
                return { [newKey]: obj[key] };
            });
            return Object.assign({}, ...keyValues);
        },
        DateDiff: function (startingDate, endingDate = null) {
            var startDate = new Date(startingDate.toISOString().substr(0, 10));
            if (endingDate) {
                endingDate = endingDate.toISOString().substr(0, 10); // need date in YYYY-MM-DD format
            }
            var endDate = new Date();
            if (startDate > endDate) {
                var swap = startDate;
                startDate = endDate;
                endDate = swap;
            }
            var startYear = startDate.getFullYear();
            var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
            var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            var yearDiff = endDate.getFullYear() - startYear;
            var monthDiff = endDate.getMonth() - startDate.getMonth();
            if (monthDiff < 0) {
                yearDiff--;
                monthDiff += 12;
            }
            var dayDiff = endDate.getDate() - startDate.getDate();
            if (dayDiff < 0) {
                if (monthDiff > 0) {
                    monthDiff--;
                } else {
                    yearDiff--;
                    monthDiff = 11;
                }
                dayDiff += daysInMonth[startDate.getMonth()];
            }
            return yearDiff + "-" + monthDiff + "-" + dayDiff;
        },
        ScriptIntegration: function (fileName, beforeDelete = false) {
            if (beforeDelete) {
                $("#innerJS script").remove();
            }

            const rootPath = window.location.pathname.split("/")[1];
            const jsPath = `//${window.location.host}/app/pageScripts/${rootPath}/${fileName}.js?v=${$.now()}`;
            // remote insert
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = jsPath;
            $("#innerJS").append(s);
        },
        CopyToClipboard: function (element) {
            var text = element.getAttribute('data-text'); // Get the text from the data-text attribute
            if (navigator.clipboard && window.isSecureContext) {
                // Navigator clipboard api method'
                navigator.clipboard.writeText(text).then(function () {
                    console.log('Text copied to clipboard');
                }).catch(function (err) {
                    console.error('Could not copy text: ', err);
                });
            } else {
                // Text area method
                var textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed"; //avoid scrolling to bottom
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Fallback: Copying text command was ' + msg);
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }

                document.body.removeChild(textArea);
            }
        },
        DownloadPdf: function (idEl) {
            var divContents = document.getElementById(idEl).innerHTML;
            var formData = new FormData();
            formData.append('Html', divContents);

            fetch('/pdf/create-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Html: divContents })
            })
                .then(response => response.blob())
                .then(blob => {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = 'mydiv.pdf';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                })
                .catch(error => console.error('Error:', error));
        },
        NotActiveSwitch: function (formName, contollerName = undefined) {
            if ($("#mySwitch").data('status') == 'passive') {
                window[formName + "Page"].Variables[formName + "Table"].column(window[formName + "Page"].Variables.ColActive).visible(true);
                window[formName + "Page"].Variables[formName + "Table"].column(window[formName + "Page"].Variables.ColPassive).visible(false);
            }
            else {
                window[formName + "Page"].Variables[formName + "Table"].column(window[formName + "Page"].Variables.ColActive).visible(false);
                window[formName + "Page"].Variables[formName + "Table"].column(window[formName + "Page"].Variables.ColPassive).visible(true);
            }

            window[formName + "Page"].Variables[formName + "Table"].ajax.url(`${iTech.Defaults.ApiBaseUrl}` + contollerName + `/${$("#mySwitch").data('status') == 'active' ? "LoadDataTable" : "LoadDataTableNotActive"}/` + formName).load();
        },
        DataVisible: function (formName) {
            $("#" + formName + "Table thead > tr > th").each(function (index) {
                if ($(this).attr('col-rule') == 'active')
                    window[formName + "Page"].Variables.ColActive = index;
                else if ($(this).attr('col-rule') == 'passive')
                    window[formName + "Page"].Variables.ColPassive = index
            });
            $("#" + formName + "Table").attr("data-visibleArray", window[formName + "Page"].Variables.ColActive);
        },
        SearchFilterForDatatable: function (formName, table) {
            var $form = $(`form[name='${formName}SearchForm']`);

            let requestData = iTech.Helpers.ConvertToSearchParameter($form.find("input,select,textarea"));

            table.settings()[0].ajax.data = function (d) {
                return $.extend(d, requestData);
            };

            table.ajax.reload();
        },
    },
    UI: {
        SetDate: function (targets) {
            // flatpickr kullanılmaktadır.
            const opt = {
                altInput: true, // kullanıcının göreceği formatı enable eder.
                altFormat: "d/m/Y", // kullanıcının göreceği format
                dateFormat: "Y-m-d", // dbye gönderilecek format,
                allowInput: true,
                onOpen: function (selectedDates, dateStr, instance) {
                    $(instance.altInput).prop("readonly", true);
                },
                onClose: function (selectedDates, dateStr, instance) {
                    $(instance.altInput).prop("readonly", false);
                    $(instance.altInput).blur();
                }
            };
            // virgüle göre split eder, -1 gelir ise bir adet demektir.
            const singleOrMulti = targets.indexOf(",");
            if (!singleOrMulti) { // Sayfada bir tane datepicker varsa
                $("#" + targets).flatpickr(opt);
            } else { // birden fazla her biri için.
                const htmlElArr = targets.split(",");
                $.each(htmlElArr,
                    function (index, htmlEl) {
                        $("#" + htmlEl).flatpickr(opt);
                    });
            }
        },
        BootstrapDateRangepicker: function (elements, date = null) {
            $.each(elements, (index, htmlEl) => {
                $(htmlEl).daterangepicker({
                    showDropdowns: true,
                    showWeekNumbers: true,
                    showISOWeekNumbers: true,
                    //"timePicker": true,
                    //"timePicker24Hour": true,
                    //"timePickerSeconds": true,
                    autoApply: false,
                    startDate: (date != null) ? date["BeginDate"] : new Date(),
                    endDate: (date != null) ? date["EndDate"] : new Date(new Date().setMonth(new Date().getMonth() + 1)),
                    locale: {
                        format: 'DD/MM/YYYY'
                    },
                    //locale: {
                    //    format: 'M/DD hh:mm A'
                    //},
                    ranges:
                    {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    alwaysShowCalendars: true,
                    applyButtonClasses: "btn-default shadow-0",
                    cancelClass: "btn-success shadow-0"
                }, function (start, end, label) {
                    //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
                    //console.log("Last Date => ", end.format("DD-MM-YYYY"));
                });
            });
        },
        BootstrapAutoCompleted: function (target) {
            $.each(target, (k, v) => {
                var debounceTimer;
                $(v).autoComplete({
                    resolver: 'custom',
                    events: {
                        search: function (qry, callback, el) {
                            var source = el[0].hasAttribute("source") ? el[0].getAttribute("source") : false;
                            var parent = el[0].hasAttribute("parent") ? el[0].getAttribute("parent") : false;
                            if (source) {
                                var isErr = false;
                                var parentId = false;
                                var parentEl = $("#" + parent + " option:selected");

                                if (parent)
                                    if (parentEl.hasAttr("data-code") && parentEl.data("code") != 'undefined')
                                        parentId = parentEl.data("code");
                                    else
                                        isErr = true;

                                if (isErr) {
                                    iTech.ShowMessage("Uyarı", "Bir Ülke Seçiniz!", "warning");
                                    return;
                                }

                                // İsteği 300 milisaniye geciktir
                                clearTimeout(debounceTimer);
                                debounceTimer = setTimeout(function () {
                                    var param = `${iTech.Defaults.ApiBaseUrl}${source}` + (parent ? "/" + parentId : "");
                                    $.ajax(
                                        `${param}`,
                                        {
                                            data: { 'q': qry }
                                        }
                                    ).done(function (res) {
                                        callback(res)
                                    });
                                }, 1000);
                            }
                        }
                    },
                });
            });
        },
        ShowValidationMessages: function ($code, $errors, $responseText) {
            if ($code === 204) {
                iTech.ShowMessage("Hata", "204 Hatası Mesajları", "error");
            } else if ($code === 400 && typeof $errors === typeof {} && $errors["status"] == undefined) { // Invalid
                $.each($errors,
                    function (key, value) {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                        const lbl = $("label[for='" + key + "']");
                        lbl.find("small").remove();
                        const span = "<small class='text-danger font-italic'> * " + value + "(sunucu mesajı)</small>";
                        lbl.append(span);
                        lbl.next().attr("required", true); // ?
                        $("[name='" + key + "']").prop("required", true);
                    });
            } else if ($code === 400 && $errors["status"] == 400) {  // Error
                $errors = $errors.errors;
                $.each($errors,
                    function (key, value) {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                        const lbl = $("label[for='" + key + "']");
                        lbl.find("small").remove();
                        const span = "<small class='text-danger font-italic'> * " + value + "(sunucu mesajı)</small>";
                        lbl.append(span);
                        lbl.next().attr("required", true); // ?
                        $("[name='" + key + "']").prop("required", true);
                    });
            } else if ($code === 401) {
                iTech.ShowMessage("Hata", "EPosta / şifre yanlış veya geçerli bir Rol bulunamadı!", "error");

            } else if ($code === 403) {
                localStorage.removeItem("ITManagement.UserInfo");
                window.reload();
            } else {
                iTech.ShowMessage("Hata", "Veri Bulunamadı", "error");
            }
        },
        BlockElements: function () {
            if ($(_pageElements.ajaxLoaders).length) {
                $.each($(_pageElements.ajaxLoaders),
                    function () {
                        $(this).block({
                            message:
                                "<div class='aLoader bg-transparent'><span class='spinner-border spinner-border-sm bg-transparent' role='status' aria-hidden='true'></span></div>",
                            overlayCSS: {
                                backgroundColor: "#fff",
                                opacity: 0.8,
                                cursor: "not-allowed"
                            },
                            css: {
                                cursor: "not-allowed",
                                background: "transparent",
                                border: 0,
                                width: "auto",
                                '-webkit-border-radius': 2,
                                '-moz-border-radius': 2
                            }
                        });
                    });
            }
        },
        UnBlockElements: function () {
            if ($(_pageElements.ajaxLoaders).length) {
                $.each($(_pageElements.ajaxLoaders),
                    function () {
                        $(this).unblock();
                    });
            }
        },
        AskConfirmation: function ($title = "Silmek istediğinize Emin Misiniz?", $confirm = "Eminim, Sil!", $cancel = "Hayır, İptal Et.") {
            return new Promise((resolve, reject) => {
                swal({
                    title: $title,
                    text: "Bu işlemi geri alamazsınız!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: $confirm,
                    confirmButtonColor: "red",
                    cancelButtonText: $cancel,
                    cancelButtonClass: "bg-primary text-white",
                    allowOutsideClick: false,
                    padding: "2em"
                }).then(result => resolve(result.hasOwnProperty("value")));
            });
        },
        AskConfirm: function ($title = "Yapılan İşlemi Onaylıyor Musunuz?", $confirm = "Evet, Onaylıyorum.", $cancel = "Hayır, İptal Et.", $type = "warning", $confirmButtonColor = "red", $text = "Bu işlemi geri alamazsınız!") {
            return new Promise((resolve, reject) => {
                swal({
                    title: $title,
                    text: $text,
                    type: $type,
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: $confirm,
                    confirmButtonColor: $confirmButtonColor,
                    cancelButtonText: $cancel,
                    cancelButtonClass: "bg-primary text-white",
                    allowOutsideClick: false,
                    padding: "2em"
                }).then(result => resolve(result.hasOwnProperty("value")));
            });
        },
        ShowSuccessSwal: function ($title = "İşlem Başarılı!", $text = "İşleminiz başarıyla tamamlandı.", $confirmButtonText = "Tamam") {
            return new Promise((resolve, reject) => {
                swal({
                    title: $title,
                    text: $text,
                    type: "success",
                    confirmButtonText: $confirmButtonText,
                    confirmButtonColor: "green",
                    allowOutsideClick: false,
                    padding: "2em"
                }).then(result => resolve(result.hasOwnProperty("value")));
            });
        },
        ChangeLanguage: function () {
            const targetLanguage = $(this).data("language");
            localStorage.setItem("Language", targetLanguage);
            window.location.reload(true);
        },
        ScrollTo: function (target, selector = "html,body", delay = 1000) {
            var targetPosition = $(target).offset().top;
            $(selector).animate({
                scrollTop: targetPosition
            }, delay);
        },
        AuthorityElementsInit: function (authorityElement) {
            console.log("Yetki özelliği bulunan element sayısı: %c" + authorityElement.length + " adet!", "color: yellow; font-size:15px;");
            if (iTech.lclStr.get("ITManagement.UserInfo") != null)
                var yetkiList = iTech.lclStr.get("ITManagement.UserInfo").yetkiNesneList;

            $.each(yetkiList, (k, v) => {
                $("[data-authority='" + v + "']").css("display", "block");
                $("[data-authority='" + v + "']").addClass("dBlock");
                //console.log("k. element -> ", $(v), "<->", $(v).data("authority"));
                $(v).show();
            });

            $.each(authorityElement, (k, v) => {
                $(v).not(".dBlock").remove();
            });
        }
    },
    User: {
        GetUser: $.parseJSON(localStorage.getItem("ITManagement.UserInfo")),
        GetToken: function () {
            return getToken();
        },
        GetMenus: function ($roleId, userRoles) {
            var results = [];
            var newRoleList = userRoles.filter(x => x.roleName == "Danışman" || x.roleName == "İl Koordinatörü");
            if (newRoleList.length > 0) {
                $.each(newRoleList, function (k, v) {
                    results.push(v.roleId);
                });
            }
            else {
                $.each(userRoles, function (k, v) {
                    results.push(v.roleId);
                });
            }

            const data = {
                roleId: results.join(","),
            };

            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Identity/ByRoleId",
                $requestData = data).then(result => {
                    if (result.isSuccess) {
                        const menuListForBreadCrumb = result.value;
                        iTech.Services.AjaxPromise(
                            $type = FormMethod.Get,
                            $url = "Identity/MenuInfobyRoleId",
                            $requestData = data).then(result => {
                                if (result.isSuccess) {
                                    const menuListForMenu = result.value;
                                    if (menuListForMenu.length > 0) {
                                        let menuString = iTech.User.Helpers.MenuNew(menuListForMenu);
                                        $("#js-nav-menu2").append(menuString);
                                        $("#nav_filter_input").on("keyup", iTech.Helpers.Debounce(() => iTech.User.Helpers.FilterMenu()));
                                        iTech.User.Helpers.SetActivePage();

                                        $("#js-nav-menu2").navigation({
                                            accordion: true,
                                            animate: "easeOutExpo",
                                            speed: 200,
                                            closedSign: "<em class='fal fa-angle-down text-white'></em>",
                                            openedSign: "<em class='fal fa-angle-up text-white'></em>"
                                        });
                                        iTech.User.Helpers.MakeBreadCrumb(menuListForBreadCrumb);
                                    }
                                }
                            }).catch(result => {
                                const e = result.message;
                                if (e.status === 404 || e.status === 401) {
                                    iTech.ShowMessage("Error", e.responseText, "error");
                                }
                            });
                    }
                }).catch(result => {
                    const e = result.message;
                    if (e.status === 404 || e.status === 401) {
                        iTech.ShowMessage("Error", e.responseText, "error");
                    }
                });
        },
        GetRolesToList: function ($roles, $currentRoleId, $roleList) {
            let li = "";
            for (let i = 0; i < $roles.length; i++) {
                let select = "";
                if ($currentRoleId === $roles[i].roleId) select = "selected";
                li += "<li class=" + select + ">" + _;
                li += "<a" + _;
                li += "data-roleId=" + $roles[i].roleId + _;
                li += "class = 'dropdown-item' onclick=iTech.User.SetActiveRole('" + $roles[i] + "') >" + _;
                li += $roles[i].roleName;
                li += "</a>";
                li += "</li>";
                $roleList.push($roles[i].roleId);
            }
            $("#role-dropdown-menu").append(li);
        },
        SetActiveRole: function ($role) {
            const lclStorageUserObj = $.parseJSON(localStorage.getItem("ITManagement.UserInfo"));
            lclStorageUserObj.currentRoleId = $role.roleId;
            for (let i = 0; i < lclStorageUserObj.roles.length; i++) {
                if (lclStorageUserObj.roles[i].roleId === $role.roleId) {
                    lclStorageUserObj.currentRoleName = lclStorageUserObj.roles[i].roleName;
                }
            }
            localStorage.setItem("ITManagement.UserInfo", JSON.stringify(lclStorageUserObj));
            const uId = $role.userId;
            const rId = JSON.parse(localStorage.getItem("ITManagement.UserInfo")).currentRoleId;
            iTech.Services.AjaxPromise(
                $type = FormMethod.Put,
                $url = "Identity/" + uId + "/role/" + rId,
            ).then(result => {
                iTech.User.OpenDashboard(null, lclStorageUserObj.currentRoleName);
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
        Login: function () {
            const data = {
                Email: $("#email").val().trim(),
                Password: $("#password").val().trim()
            };

            iTech.Services.AjaxPromise(FormMethod.Post, "Account/login", data, ContentTypes.FromForm, false, true)
                .then(res => {
                    if (res.isSuccess) {
                        iTech.ShowMessage("Güvenlik Kontrolü", "Giriş Başarılı.");
                        iTech.User.OpenDashboard(res);
                    }
                }).catch(res => {
                    const e = res.message;
                    if (e.status === 404 || e.status === 401) {
                        iTech.ShowMessage("Error", /*e.responseText*/ "Incorrect user information!", "error");
                    }
                });
        },
        CheckLogin: function () {
            const loggedInUser = $.parseJSON(localStorage.getItem("ITManagement.UserInfo"));
            const expirationMinutes = $.parseJSON(localStorage.getItem("ITManagement.ExpirationMinutes"));
            let time = new Date().getTime();

            //Kullanici Giriş Yapmiş(Token Mevcut)
            if (loggedInUser !== null) {
                $("a#homeButton").attr("href", iTech.User.DirectoryWay(loggedInUser.currentRoleName, loggedInUser));
                var roleList = [];
                iTech.User.GetRolesToList(loggedInUser.userRoles, loggedInUser.currentRoleId, roleList);

                iTech.User.GetMenus(roleList.join(), loggedInUser.userRoles);

                if (time >= expirationMinutes) {
                    iTech.User.Logout();
                }
                else {
                    setTimeout(function () {
                        iTech.User.Logout();
                    }, expirationMinutes - time);
                }
            }
        },
        Logout: function () {
            localStorage.removeItem("ITManagement.UserInfo");
            localStorage.removeItem("ITManagement.ExpirationMinutes");
            window.location.href = "/";
        },
        /**
         * User tablosunda login butonuna tıklandıktan sonra
         * Giriş sayfasında login butonuna tıklandıktan sonra
         * @param {any} result , UserDto
         * @param {any} $role , Kullanıcının Rolü
         */
        OpenDashboard: function (result, $role = null) {
            iTech.User.ITManagementConvertStorage(result);

            var currentRoleName = $.parseJSON(localStorage.getItem("ITManagement.UserInfo")).currentRoleName;

            if ($role !== null) {
                currentRoleName = $role;
            }

            const directory = iTech.User.DirectoryWay(currentRoleName, $.parseJSON(localStorage.getItem("ITManagement.UserInfo")));
            window.location.href = directory;
        },

        ITManagementConvertStorage: function (result) {
            if (result) {
                var lclStorageObj = {};
                lclStorageObj = {
                    email: result.data.email,
                    id: result.data.id,
                    fullName: result.data.fullname,
                    token: result.data.token,
                    roles: result.data.userRoles,
                    title: result.data.title,
                    currentRoleId: result.data.currentRoleId,
                    currentRoleName: result.data.currentRoleName,
                    personelTanimId: result.data.personelTanimId,
                    personelKurumSicilNo: result.data.personelSicilNo,
                    sorumluBirimList: result.data.sorumluBirimList,
                    yetkiNesneList: result.data.yetkiNesneList,
                    customerDefinitionId: result.data.customerDefinitionId,
                    dormName: result.data.dormName,
                };
                localStorage.setItem("ITManagement.UserInfo", JSON.stringify(lclStorageObj));
                localStorage.setItem("ITManagement.ExpirationMinutes", new Date().getTime() + result.data.expirationMinutes * 1000);
            };

        },
        DirectoryWay: function ($role, lclStr) {
            $(".userInfoName").text(lclStr.fullname);
            $(".userInfoRole").text(lclStr.currentRoleName);
            lclStr.dormName.forEach((item, index) => {
                var li = "<li style='font-size: 11px;'>" + item + "</li>";
                $(".dormName").append(li);
            });

            route = "/Home/Dashboard";
            return route;
        },
        Helpers: {
            MakeMenu: function (ul, menuList) {
                try {
                    let subList = $.grep(menuList, (v) => v.parentId !== null);
                    for (let index = 0; index < menuList.length; index++) {
                        if (menuList[index].parentId === null) {
                            let li = "<li class='addCursor' id='m" + menuList[index].id + "'" + _;
                            if (iTech.Helpers.GetCurrentPage().substring(1) === menuList[index].url) {
                                li += "class='active'" + _;
                            }
                            li += ">";
                            //let li = $("<li id='m" + menuList[index].id+"'>")
                            //.append("<a class='nav-link' href='"+ window.location.protocol+ "//" + window.location.host + "/" +  menuList[index].url + "'>" + menuList[index].name + " </a>")
                            li += "<a class='nav-link' href='" +
                                window.location.protocol + "//" + window.location.host + "/" + menuList[index].url +
                                "'>";
                            li += "<i class='" + menuList[index].icon + "'></i>";
                            li += "<span class='nav-link-text'>";
                            //li += menuList[index].name;
                            li += menuList[index].name;
                            li += "</span></a>";
                            $(ul).append(li);
                        }
                        for (let subIndex = 0; subIndex < subList.length; subIndex++) {
                            if (menuList[index].id === subList[subIndex].parentId) {
                                //let sul = $("<ul class='nav nav-treeview'>");
                                //let li = $("<li id='s" + subList[subIndex].id + "'>")
                                //.append("<a class='nav-link ' href='" + subList[subIndex].url + "'>" + subList[subIndex].name + " </a>");
                                let subUl = "<ul id='s" + menuList[index].id + "' class='nav nav-treeview' > ";
                                let li = "<li id='s" + subList[subIndex].id + "'" + _;
                                if (subList[subIndex].url === iTech.Helpers.GetCurrentPage().substring(1)) {
                                    li += "class='active'";
                                } // Home/Dashboard
                                li += ">";

                                li += "<a class='nav-link' href='" +
                                    window.location.protocol +
                                    "//" +
                                    window.location.host +
                                    "/" +
                                    subList[subIndex].url +
                                    "'>";
                                li += "<i class='" + subList[subIndex].icon + "'></i>";
                                li += "<span class='nav-link-text'>";
                                li += subList[subIndex].name;
                                li += "</span></a>";
                                li += "</li>";
                                subUl += li + "</ul>";
                                $("li#m" + menuList[index].id + _ + " > a").removeAttr("href");
                                if ($("ul#s" + menuList[index].id).length) {
                                    $("ul#s" + menuList[index].id).append(li);
                                } else {

                                    $("li#m" + menuList[index].id).append(subUl);
                                }
                            }
                        }
                    }
                    $(ul + " li.active").parent("ul").css("display", "block");

                } catch (ex) {
                    console.log('Menü Oluşturulurken Hata Meydana Geldi \n', ex);
                } finally {
                    $(ul).navigation({
                        accordion: true,
                        animate: "easeOutExpo",
                        speed: 200,
                        closedSign: "<em class='fal fa-angle-down text-white'></em>",
                        openedSign: "<em class='fal fa-angle-up text-white'></em>"
                    });
                }
            },
            MakeBreadCrumb: function (menuList) {
                var menuList = menuList;
                const subsDiv = $("div[data-subsparent]");
                const checkMatch = subsDiv.attr("data-subsparent");
                const subsParent = $.grep(menuList, (n, i) => (n.description === checkMatch));
                var subMenus;
                if (subsParent.length) {
                    subMenus = $.grep(menuList, (n, i) => (n.parentId === subsParent[0].id));
                    $.each(subMenus,
                        function (key, value) {
                            let selector = "";
                            if (iTech.Helpers.GetCurrentPage() === "/" + value.url) {
                                selector = "active";
                            }

                            var href = "/" + value.url;
                            if (href === "/null") {
                                href = "#";
                            }
                            const aString = "<a class='dropdown-item " + selector + "' href='" + href + "' >" + value.description + "</a>";
                            subsDiv.append(aString);
                        });
                }
            },
            MenuNew: function (menuList, isSub = false) {
                try {
                    const activePage = iTech.Helpers.GetCurrentPage(true).slice(1);
                    var html = (isSub && menuList.length > 0) ? '<ul style="display:%D_STATUS%;">' : ''; // Wrap with div if true

                    for (item in menuList) {
                        const mName = menuList[item].name;
                        const pName = menuList[item].parentName;
                        const filterTags = iTech.Helpers.Slugify(mName, pName);
                        html += '<li class="addCursor">';

                        const mUrl = (menuList[item].url?.length > 0) ? window.location.protocol + "//" + window.location.host + "/" + menuList[item].url : "#";


                        const mIcon = (menuList[item].icon != null) ? menuList[item].icon : "";
                        if (isSub) {
                            html += '<a href="' + mUrl + '"  data-filter-tags="' + iTech.Helpers.Slugify(filterTags, null) + '"><span class="nav-link-text ' + mIcon + '" >' + mName + '</span></a>';
                        } else {
                            let isAriaExpanded = (activePage === menuList[item].url) ? "true" : "false";
                            html += '<a href="' + mUrl + '" data-filter-tags="' + iTech.Helpers.Slugify(filterTags, null) + '"><i class="' + mIcon + '"></i><span class="nav-link-text" >' + menuList[item].name + '</span></a>'; // Submenu found, but top level list item.
                        }

                        var tmpMenu = menuList[item].subMenus;

                        html += iTech.User.Helpers.MenuNew(tmpMenu, true);

                        html += '</li>';
                    }
                    html += (isSub && menuList.length > 0) ? '</ul>' : '';
                } catch (ex) {
                    console.log('Menü Oluşturulurken Hata Meydana Geldi \n', ex);
                } finally {
                    return html;
                }
            },
            SetActivePage: function () {
                const fullPageUrl = window.location.protocol + "//" + window.location.host + iTech.Helpers.GetCurrentPage(true);
                let aHrefs = $("#js-nav-menu2").find("a");
                $.each(aHrefs, (ind, el) => {
                    const ele = $(el).eq(0);
                    let elementHref = ele.attr("href");
                    if (elementHref === fullPageUrl) {
                        let parentULs = ele.parents("ul");
                        parentULs.css("display", "block");

                        let parentLi = ele.parents("li:first")
                        parentLi.addClass("active");

                    }
                });
            },
            FilterMenu: function (e) {
                var inputValue = iTech.Helpers.Slugify($("#nav_filter_input").val(), null);
                var aHrefs = $("ul#js-nav-menu2 li a");
                if (inputValue.length > 2)
                    $.each(aHrefs, function (index, htmlEl) {
                        var dataFilterTag = iTech.Helpers.Slugify($(htmlEl).data("filter-tags"), null);
                        if (!dataFilterTag.includes(inputValue)) {
                            $(htmlEl).parent("li").hide();
                        } else {
                            $.each($(htmlEl).parents("li"), (_index, _htmlEl) => {
                                $(_htmlEl).show();
                                $(_htmlEl).parents("ul").css("display", "block");
                            });
                        }
                    });
                else {
                    $.each($("ul#js-nav-menu2 ul"), (_index, _htmlEl) => {
                        _htmlEl.style.removeProperty('display');
                    });

                    $.each($("ul#js-nav-menu2 li"), (index, htmlEl) => {
                        $(htmlEl).show();
                    });
                    $("ul#js-nav-menu2 li .active").parents("ul").css("display", "block");
                }
            }
        }
    },
    ShowMessage: function ($header, $message, $type = "success", $positionClass = "toast-bottom-right") {
        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: $positionClass,
            preventDuplicates: false,
            onclick: null,
            showDuration: 300,
            hideDuration: 1000,
            timeOut: 5000,
            extendedTimeOut: 1000,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };
        toastr[$type]($message, $header);
    },
    DataTable: {
        Load: {
            AjaxSourced: async function ($targetTable, $reqUrl, $type = FormMethod.Post, $pageLength = 10, filterData = {}) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;
                const isSelect = (typeof opts.select == typeof undefined) ? false : opts.select;
                const isVisible = (typeof opts.visiblearray == typeof undefined) ? true : false;
                const isOrderable = (typeof opts.orderarray == typeof undefined) ? true : false;
                const isFixedRightColumns = (typeof opts.fixedrightcolumns == typeof undefined) ? true : false;
                const isFixedLeftColumns = (typeof opts.fixedleftcolumns == typeof undefined) ? true : false;
                const isGroup = (typeof opts.group == typeof undefined) ? true : false;
                const dom = (typeof opts.mask == typeof undefined) ? false : opts.mask; // data-mask="f l B i p"
                $pageLength = (opts.pagination == 'false' && typeof opts.pagination != typeof undefined)
                    ? 2147483647
                    : ($pageLength == "All") ? 2147483647 : $pageLength;
                var table = {};
                var config = {
                    destroy: true,
                    responsive: isResponsive,
                    pageLength: $pageLength,
                    lengthMenu: [[10, 25, 50, 75, 100, 2147483647], [10, 25, 50, 75, 100, "All"]],
                    processing: true,
                    serverSide: true,
                    filter: true,
                    order: (!isOrderable) ? JSON.parse("[" + opts.orderarray + "]") : true,
                    deferRender: true,
                    select: isSelect,
                    searchDelay: 500,
                    dom: iTech.DataTable.Helpers.GetDomString(dom),
                    language: { url: "//" + appFolder.localization + "dataTable/tr.json" },
                    ajax: {
                        url: iTech.Defaults.ApiBaseUrl + $reqUrl,
                        type: $type,
                        async: true,
                        datatype: "json",
                        data: filterData,
                        beforeSend: function (jqXhr, settings) {
                            jqXhr.setRequestHeader("Authorization", "Bearer " + iTech.User.GetToken());
                        },
                        error: function (xhr, error, code) {
                            console.log(xhr.responseText);
                            return;
                        },
                        dataSrc: function (res) {
                            if (!res.isSuccess) {
                                if (res?.errors.length > 0) {
                                    iTech.ShowMessage("Bir sorun meydana geldi.", res.errors.join(" "), "error");
                                }
                                else if (res?.validationErrors.length > 0) {
                                    iTech.ShowMessage("Veri alınamadı.Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.", res.validationErrors.map(x => x.errorMessage).join(" "), "warning");
                                }
                                return [];
                            } else {
                                return res.value.value.data;
                            }
                        },
                        dataFilter: function (data) {
                            var json = jQuery.parseJSON(data);
                            if (json.isSuccess && json.value.value) {
                                // Gerekli değerleri ayarlayın.
                                json.recordsTotal = json.value.value.recordsTotal;
                                json.recordsFiltered = json.value.value.recordsFiltered;
                            }
                            return JSON.stringify(json);
                        },
                    },
                    scrollX: !isResponsive,
                    scrollCollapse: false,
                    fixedColumns: {
                        left: (!isFixedLeftColumns) ? JSON.parse("[" + opts.fixedleftcolumns + "]") : [],
                        right: (!isFixedRightColumns) ? JSON.parse("[" + opts.fixedrightcolumns + "]") : []
                    },
                    buttons: iTech.DataTable.Helpers.GetTblTopButtons($targetTable, opts.topbuttons),
                    columns: iTech.DataTable.Helpers.GetTblColumns($targetTable), // https://datatables.net/reference/option/columns
                    columnDefs: [{
                        visible: isVisible,
                        targets: (!isVisible) ? JSON.parse("[" + opts.visiblearray + "]") : []
                    }],
                    rowCallback: (row, data) => iTech.DataTable.Helpers.GetTblColActButtons(row, data, $targetTable) // https://datatables.net/reference/option/rowCallback
                };
                if (!isGroup) {
                    config = $.extend({}, config, {
                        rowGroup: {
                            dataSrc: opts.group,
                        }
                    });
                }

                table = await new Promise((resolve, reject) => {
                    try {
                        resolve($($targetTable).DataTable(config));
                    } catch (e) {
                        iTech.UI.ShowValidationMessages(e.status, e.responseJSON, e.responseText);
                        reject(e);
                    }
                });
                return table;
            },
            AjaxSourcedSynchronicity: function ($targetTable, $reqUrl, $type = FormMethod.Post, $pageLength = 10, filterData = {}, $left = 0, $right = 1) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;
                const isSelect = (typeof opts.select == typeof undefined) ? false : opts.select;
                const isVisible = (typeof opts.visiblearray == typeof undefined) ? true : false;
                const isGroup = (typeof opts.group == typeof undefined) ? true : false;
                const dom = (typeof opts.dom == typeof undefined) ? false : opts.dom;
                $pageLength = (opts.pagination == 'false' && typeof opts.pagination != typeof undefined)
                    ? 2147483647
                    : ($pageLength == "All") ? 2147483647 : $pageLength;
                try {
                    var config = {
                        destroy: true,
                        responsive: isResponsive,
                        pageLength: $pageLength,
                        lengthMenu: [[10, 25, 50, 75, 100, 2147483647], [10, 25, 50, 75, 100, "All"]],
                        processing: true,
                        serverSide: true,
                        filter: true,
                        orderMulti: true,
                        deferRender: true,
                        select: isSelect,
                        searchDelay: 500,
                        dom: iTech.DataTable.Helpers.GetDomString(dom),
                        language: { url: "//" + appFolder.localization + "dataTable/tr.json" },
                        ajax: {
                            url: iTech.Defaults.ApiBaseUrl + $reqUrl,
                            type: $type,
                            async: false,
                            datatype: "json",
                            data: filterData,
                            beforeSend: function (jqXhr, settings) {
                                jqXhr.setRequestHeader("Authorization", "Bearer " + iTech.User.GetToken());
                            },
                            error: function (xhr, error, code) {
                                console.log(xhr.responseText);
                            },
                            dataSrc: function (res) {
                                if (!res.isSuccess) {
                                    if (res?.errors.length > 0) {
                                        iTech.ShowMessage("Bir sorun meydana geldi.", res.errors.join(" "), "error");
                                    }
                                    else if (res?.validationErrors.length > 0) {
                                        iTech.ShowMessage("Veri alınamadı.Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.", res.validationErrors.map(x => x.errorMessage).join(" "), "warning");
                                    }
                                    return [];
                                } else {
                                    return res.value.value.data;
                                }
                            },
                            dataFilter: function (data) {
                                var json = jQuery.parseJSON(data);
                                if (json.isSuccess && json.value.value) {
                                    // Gerekli değerleri ayarlayın.
                                    json.recordsTotal = json.value.value.recordsTotal;
                                    json.recordsFiltered = json.value.value.recordsFiltered;
                                }
                                return JSON.stringify(json);
                            },
                        },
                        scrollX: !isResponsive,
                        scrollCollapse: false,
                        fixedColumns: {
                            left: $left,
                            right: $right
                        },
                        buttons: iTech.DataTable.Helpers.GetTblTopButtons($targetTable, opts.topbuttons),
                        columns: iTech.DataTable.Helpers.GetTblColumns($targetTable), // https://datatables.net/reference/option/columns
                        columnDefs: [{
                            visible: isVisible,
                            targets: (!isVisible) ? JSON.parse("[" + opts.visiblearray + "]") : []
                        }],
                        rowCallback: (row, data) => iTech.DataTable.Helpers.GetTblColActButtons(row, data, $targetTable) // https://datatables.net/reference/option/rowCallback
                    };
                    if (!isGroup) {
                        config = $.extend({}, config, {
                            rowGroup: {
                                dataSrc: opts.group,
                            }
                        });
                    }
                    var table =
                        $($targetTable).DataTable(config);

                } catch (e) {
                    iTech.UI.ShowValidationMessages(e.status, e.responseJSON, e.responseText);
                }
                return table;
            },
            WithoutColumns: async function ($targetTable, colReqUrl, dtReqUrl, addIdField = false) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;
                let tableInfo = null;
                await iTech.Services.AjaxPromise(
                    $type = FormMethod.Post,
                    $url = colReqUrl,
                ).then(res => {
                    if (res.isSuccess) {
                        if (res.value.length > 0) {
                            var thList = `<thead>
                                    <tr>`;
                            if (addIdField)
                                thList += `<th col-data="Id">Id</th>`;
                            $.each(res.value, (i, obj) => {
                                thList += `<th col-data="${iTech.Convert.ToPascalCase(obj.ad)}">${obj.etiket}</th>`;
                            });
                            thList += `<th col-role="action" action-list="edit,delete">İşlemler</th>
                                   </tr>
                                </thead>`;
                            $($targetTable).append(thList);
                        }
                    }
                    tableInfo = iTech.DataTable.Load.AjaxSourcedSynchronicity($targetTable, dtReqUrl);
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });

                return tableInfo;
            },
            DataSourced: function (tableId, data = {}) {
                const YVal = (typeof $(tableId).data("scrolly") !== typeof undefined) ? $(tableId).data("scrolly") : false;
                const PVal = (YVal) ? false : true;
                const headings = $(tableId).find("thead th");
                const hasAlreadyTBody = $(tableId).find("tbody").length;
                if (hasAlreadyTBody)
                    $(tableId).find("tbody").remove();

                if (iTech.DataTable.IsDataTable(tableId))
                    $(tableId).DataTable().destroy();

                var domTemplate = `<'row mb-3'
                        <'col-xl-2 col-lg-3 col-md-4 col-sm-12 d-flex align-items-center justify-content-start'f>
                        <'offset-8 col-xl-2 col-lg-3 col-md-2 col-sm-12 d-flex align-items-center justify-content-end'l>
                    >
                    <'row'
                        <'col-sm-12'tr>
                    >
                    <'row'
                        <'col-sm-12 col-md-5'i>
                        <'col-sm-12 col-md-7'p>
                    >`;
                if (YVal) domTemplate = `<'row'<'col-sm-12'tr>>`;

                var tbody = `<tbody>`;
                $.each(data, (ind, obj) => {
                    tbody += `<tr>`;
                    $.each(headings, (i, htmlEl) => {
                        const colData = obj[$(htmlEl).data("col")];
                        tbody += `<td>${colData}</td>`;
                    });
                    tbody += `</tr>`;
                });
                tbody += `</tbody>`;
                $(tableId).append(tbody);

                return $(tableId).DataTable({
                    scrollY: YVal,
                    paging: PVal,
                    dom: domTemplate
                });
            },
            WithData: function ($targetTable, inData = [], $pageLength = 10) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;

                $pageLength = (opts.pagination == 'false' && typeof opts.pagination != typeof undefined)
                    ? 2147483647
                    : $pageLength;
                //opts.select = (typeof opts.select == typeof undefined) ?  : opts.responsive;
                try {
                    var table =
                        $($targetTable).DataTable({
                            destroy: true,
                            paging: false,
                            //pageLength: $pageLength,
                            //lengthMenu: [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
                            dom: iTech.DataTable.Helpers.GetDomString(),
                            language: { url: "//" + appFolder.localization + "dataTable/tr.json" },
                            data: inData,
                            scrollX: !isResponsive,
                            scrollY: "200px",
                            scrollCollapse: true,
                            //buttons: iTech.DataTable.Helpers.GetTblTopButtons($targetTable, opts.topbuttons),
                            columns: iTech.DataTable.Helpers.GetTblColumns($targetTable), // https://datatables.net/reference/option/columns
                            //rowCallback: (row, data) => iTech.DataTable.Helpers.GetTblColActButtons(row, data, $targetTable) // https://datatables.net/reference/option/rowCallback
                        });

                } catch (e) {
                    iTech.UI.ShowValidationMessages(e.status, e.responseJSON, e.responseText);
                }
                return table;
            },
            TableCreate: function (table, data, tableHead = false) {
                let cols = [];
                let filterCol = [];
                $(table + _ + "thead > tr > th").each(function (k, v) {
                    var itemCol = { dCol: $(this).get(0).dataset.col, dType: $(this).get(0).dataset.type };
                    filterCol.push(itemCol.dCol);
                    cols.push(itemCol);
                });

                let tableDatas = [];
                $.each(data, function (objK, objV) {
                    var entryItems = Object.entries(objV);
                    var pushItem = Object.fromEntries(entryItems.filter(([key, value]) => filterCol.includes(key)));
                    tableDatas.push(pushItem);
                });


                let tBody = "";
                $.each(tableDatas, function (k, v) {
                    var boolAdd = true;
                    let tR = "<tr data-dynamic='true'>";
                    $.each(cols, function (altK, findColItem) {

                        var objItem = tableDatas[k][findColItem.dCol];

                        if (findColItem.dType == 'number') {
                            boolAdd = objItem > 0;
                            objItem = iTech.Helpers.FormatMoney(objItem);
                            tR += `<td class='text-right'><small>${objItem}<small></td>`;
                        }
                        else if (findColItem.dType == 'date') {

                            objItem = moment.utc(objItem).format('DD.MM.YYYY');
                            tR += `<td class='text-center'><small>${objItem}<small></td>`;
                        }
                        else
                            tR += `<td><label class="form-label">${objItem}</label></td>`;
                    });
                    tR += '</tr>';
                    if (boolAdd)
                        tBody += tR;

                });

                $(table + " > tbody").append(tBody);
                if (!tableHead)
                    $(table + " thead").hide();
            },
            InCreate: function ($targetTable) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;
                const isSelect = (typeof opts.select == typeof undefined) ? false : opts.select;
                const isVisible = (typeof opts.visiblearray == typeof undefined) ? true : false;
                const nosearch = (typeof opts.domNosearch == typeof undefined) ? false : opts.domNosearch;
                try {
                    var table =
                        $($targetTable).DataTable({
                            destroy: true,
                            pageLength: 10,
                            lengthMenu: [[10, 25, 50, 75, 100, 2147483647], [10, 25, 50, 75, 100, "All"]],
                            processing: true,
                            filter: true,
                            orderMulti: true,
                            deferRender: true,
                            responsive: isResponsive,
                            deferRender: true,
                            select: isSelect,
                            dom: iTech.DataTable.Helpers.GetDomString(nosearch),
                            language: { url: "//" + appFolder.localization + "dataTable/tr.json" },
                            columnDefs: [{
                                visible: isVisible,
                                targets: (!isVisible) ? JSON.parse("[" + opts.visiblearray + "]") : []
                            }],
                            buttons: iTech.DataTable.Helpers.GetTblTopButtons($targetTable, opts.topbuttons),
                            columns: iTech.DataTable.Helpers.GetTblColumns($targetTable), // https://datatables.net/reference/option/columns
                        });

                } catch (e) {
                    iTech.UI.ShowValidationMessages(e.status, e.responseJSON, e.responseText);
                }
                return table;
            },
            Dynamic: function ($targetTable, $reqUrl, $type = FormMethod.Post, $pageLength = 10, data = {}) {
                const opts = $($targetTable).get(0).dataset;
                const isResponsive = (typeof opts.responsive == typeof undefined) ? true : opts.responsive;
                const nosearch = (typeof opts.domNosearch == typeof undefined) ? false : opts.domNosearch;
                $pageLength = (opts.pagination == 'false' && typeof opts.pagination != typeof undefined)
                    ? 2147483647
                    : $pageLength;
                try {
                    var table =
                        $($targetTable).DataTable({
                            destroy: true,
                            responsive: isResponsive,
                            pageLength: $pageLength,
                            lengthMenu: [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
                            processing: true,
                            serverSide: true,
                            filter: true,
                            ordering: false,
                            deferRender: true,
                            dom: iTech.DataTable.Helpers.GetDomString(nosearch),
                            language: { url: "//" + appFolder.localization + "dataTable/tr.json" },
                            ajax: {
                                url: iTech.Defaults.ApiBaseUrl + $reqUrl,
                                type: $type,
                                async: false,
                                datatype: "json",
                                data: data,
                                beforeSend: function (jqXhr, settings) {
                                    jqXhr.setRequestHeader("Authorization", "Bearer " + iTech.User.GetToken());
                                },
                                error: function (xhr, error, code) {

                                    console.log(error);
                                    //throw xhr;
                                }
                            },
                            buttons: iTech.DataTable.Helpers.DynamicTopButtons($targetTable, opts.topbuttons),
                            columns: iTech.DataTable.Helpers.DynamicColumns($targetTable),
                            rowCallback: (row, data) => iTech.DataTable.Helpers.DynamicRowCallback(row, data, $targetTable),
                        });

                } catch (e) {
                    iTech.UI.ShowValidationMessages(e.status, e.responseJSON, e.responseText);
                }
                return table;
            },
        },
        Refresh: {
            Tables: function (tableNames, backProfile = null) {
                const tables = tableNames.split(",");

                $.each(tables, (i, e) => {
                    $(e).DataTable().ajax.reload(backProfile, false);
                });

                return;
            },
        },
        FindInDataSet: function (table, $dtSetKey, $targetKey) {
            const tableDataSet = $("#" + table).DataTable().rows().data();
            const rowData = $.grep(tableDataSet, (n) => (n[$dtSetKey] === $targetKey))[0];
            return rowData;
        },
        Helpers: {
            CreateTblColActButtons: function ($actionList, $dataId = null) {
                $dataId = ($dataId != null) ? "  data-id='" + $dataId + "'" : ""
                let htmlString = "";
                htmlString += `<div class='btn-group align-items-center'>`;
                $.each($actionList,
                    function (index, element) {
                        if (element.includes("switch")) {
                            htmlString += `
                                <div class='custom-control custom-switch'>
                                    <input type='checkbox' data-type='switcher' class='custom-control-input' data-prop='${element.split("/")[1]}'>
                                    <label class='custom-control-label'></label>
                                </div>
                            </div>`;

                            return htmlString;
                        }

                        switch (element) {
                            case "edit":
                                htmlString +=
                                    "<button type='button' data-role='edit' class='btn btn-success btn-xs' " + $dataId + " title='Düzenle'> <i class='text-white fas fa-edit'> </i></button>";
                                break;
                            case "delete":
                                htmlString +=
                                    "<button type='button' data-role='delete' class='btn btn-danger btn-xs'" + $dataId + " title='Sil' > <i class='fas fa-trash'> </i></button>";
                                break;
                            case "download":
                                htmlString +=
                                    "<button type='button' data-role='download' title='Download'" + $dataId + " class='btn btn-info btn-xs text-white' > <i class='fas fa-download'></i> </button>";
                                break;
                            case "choose":
                                htmlString +=
                                    "<button type='button' data-role='choose' class='btn btn-info btn-xs'" + $dataId + " title='Seç' > <i class='fas fa-plus'> </i></button>";
                                break;
                            case "bring":
                                htmlString +=
                                    "<button type='button' data-role='bring' class='btn btn-success btn-xs' " + $dataId + " title='Getir' > <i class='fas fa-arrow-right'> </i></button>";
                                break;
                            case "loginAs":
                                htmlString +=
                                    "<button type='button' data-role='loginas' class='btn btn-info btn-xs actionBtn' " + $dataId + " title='Giriş Yap'> <i class='fas fa-sign-in-alt'> </i> </button>";
                                break;
                            case "changestatus":
                                htmlString +=
                                    "<button type='button' data-role='changestatus' title='Durum Değiştir'" + $dataId + " class='btn btn-warning btn-xs' > <i class='fas fa-exchange-alt'></i></button>";
                                break;
                            case "detail":
                                htmlString +=
                                    "<button  type='button' data-role='detail' class='btn btn-primary btn-xs text-white'" + $dataId + " title='Detaylar'> <i class='fa fa-search'> </i> </button>";
                                break;
                            case "settings":
                                htmlString +=
                                    "<button type='button' data-role='settings' title='Ayarlar'" + $dataId + " class='btn btn-info btn-xs' > <i class='fas fa-cogs'></i> </button>";
                                break;
                            case "contact":
                                htmlString +=
                                    "<button type='button' data-role='contact' title='Eğitmenler'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fas fa-chalkboard-teacher'></i> </button>";
                                break;
                            case "report":
                                htmlString +=
                                    "<button type='button' data-role='report' title='Rapor'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fas fa-tasks'></i> </button>";
                                break;
                            case "list":
                                htmlString +=
                                    "<button type='button' data-role='list' title='Katılımcılar'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fa fa-list'></i> </button>";
                                break;
                            case "file":
                                htmlString +=
                                    "<button type='button' data-role='file' title='Dosyalar'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fas fa-file'></i> </button>";
                                break;
                            case "pdf":
                                htmlString +=
                                    "<button type='button' data-role='file' title='Pdf'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fal fa-file-pdf''></i> </button>";
                                break;
                            case "survey":
                                htmlString +=
                                    "<button type='button' data-role='survey' title='Anket'" + $dataId + " class='btn btn-primary btn-xs' > <i class='fas fa-poll'></i> </button>";
                                break;
                            case "approve":
                                htmlString +=
                                    "<button type='button' data-role='approve' name='approve' title='Onayla'" + $dataId + " class='btn btn-success btn-xs' > <i class='fas fa-check'></i> </button>";
                                break;
                            case "payment":
                                htmlString +=
                                    "<button type='button' data-role='payment' title='Ödeme'" + $dataId + " class='btn btn-secondary btn-xs' > <i class='fal fa-shopping-basket'></i> </button>";
                                break;
                            case "show":
                                htmlString +=
                                    "<button type='button' data-role='show' title='Hitap Veri Listesi'" + $dataId + " class='btn btn-primary btn-xs' ><i class='fal fa-search'></i> </button>";
                                break;
                            case "send":
                                htmlString +=
                                    "<button type='button' data-role='send' title='Gönder'" + $dataId + " class='btn btn-warning btn-xs' > <i class='fas fa-paper-plane'></i></button>";
                                break;
                            case "attended":
                                htmlString +=
                                    "<button type='button' data-role='attended' title='Katıldı'" + $dataId + " class='btn btn-success btn-xs' > <i class='fas fa-check'></i></button>";
                                break;
                            case "nonattended":
                                htmlString +=
                                    "<button type='button' data-role='nonattended' title='Katılmadı'" + $dataId + " class='btn btn-warning btn-xs' > <i class='fas fa-times'></i></button>";
                                break;
                            case "checkbox":
                                htmlString +=
                                    "<input type='checkbox' name='name' style='width:18px;height:18px;'/>"
                                break;
                            case "print":
                                htmlString +=
                                    "<button type='button' data-role='print' title='Fatura Dosyası'" + $dataId + " class='btn btn-info btn-xs'> <i class='fas fa-print'></i> </button>";
                                break;
                            case "product":
                                htmlString +=
                                    "<button type='button' data-role='product' title='Ürün'" + $dataId + " class='btn btn-primary btn-xs text-white'><i class='far fa-truck-loading'></i> </button>";
                                break;
                            case "package":
                                htmlString +=
                                    "<button type='button' data-role='package' title='Paket'" + $dataId + " class='btn btn-info btn-xs text-white'> <i class='fas fa-cubes'></i> </button>";
                                break;
                            case "producer":
                                htmlString +=
                                    "<button type='button' data-role='producer' title='Üterici'" + $dataId + " class='btn btn-warning btn-xs'> <i class='far fa-barcode-read'></i> </button>";
                                break;
                            case "student":
                                htmlString +=
                                    "<button type='button' data-role='student' class='btn btn-success btn-xs text-white'" + $dataId + " title='Öğrenci Detay' > <i class='fas fa-user-graduate'> </i></button>";
                                break;
                            case "arxapprove":
                                htmlString +=
                                    "<button type='button' data-role='arxapprove' name='arxapprove' title='Onayla'" + $dataId + " class='btn btn-success btn-xs'> <i class='fas fa-check'></i> </button>";
                                break;
                            case "zonedefinition":
                                htmlString +=
                                    "<button  type='button' data-role='zonedefinition' class='btn btn-secondary btn-xs text-white'" + $dataId + " title='Bölge Tanım'> <i class='fas fa-map-marked-alt'></i> </button>";
                                break;
                            case "zonepoint":
                                htmlString +=
                                    "<button  type='button' data-role='zonepoint' class='btn btn-primary btn-xs text-white'" + $dataId + " title='Bölge Fiyat'> <i class='far fa-sack-dollar'></i> </button>";
                                break;
                            case "passive":
                                htmlString +=
                                    "<button  type='button' data-role='passive' class='btn btn-danger btn-xs text-white'" + $dataId + " title='Pasife Al'><i class='fas fa-do-not-enter'></i> </button>";
                                break;
                            case "active":
                                htmlString +=
                                    "<button  type='button' data-role='active' class='btn btn-success btn-xs text-white'" + $dataId + " title='Aktif Al'> <i class='fas fa-plus-circle'></i> </button>";
                                break;
                            case "tracking":
                                htmlString +=
                                    "<button type='button' data-role='tracking' title='Tracking Number'" + $dataId + " class='btn btn-success btn-xs'> <i class='fas fa-barcode'></i> </button>";
                                break;
                            case "paid":
                                htmlString +=
                                    "<button type='button' data-role='paid' title='Ödendi'" + $dataId + " class='btn btn-success btn-xs'> <i class='fas fa-share-all'></i> </button>";
                                break;
                            case "note":
                                htmlString +=
                                    "<button type='button' data-role='note' title='Not'" + $dataId + " class='btn btn-secondary btn-xs'> <i class='fas fa-info'></i> </button>";
                                break;
                            case "addchield":
                                htmlString +=
                                    "<button type='button' data-role='addchield' title='Bağlı Öğe Ekle'" + $dataId + " class='btn btn-secondary btn-xs'> <i class='fas fa-plus'></i> </button>";
                                break;
                            case "upDown":
                                htmlString +=
                                    "<button type='button' data-role='upDown' title='Yukarı Aşağı Taşıma'" + $dataId + " class='btn btn-info btn-xs text-white '><i class='fas fa-sort'></i> </button>";
                                break;
                            case "levelUp":
                                htmlString +=
                                    "<button type='button' data-role='levelUp' title='Yukarı Taşıma'" + $dataId + " class='btn btn-info btn-xs text-white '><i class='fas fa-arrow-up'></i> </button>";
                            case "levelDown":
                                htmlString +=
                                    "<button type='button' data-role='levelDown' title='Yukarı Taşıma'" + $dataId + " class='btn btn-info btn-xs text-white '><i class='fas fa-arrow-down'></i> </button>";
                                break;
                            case "editcalendar":
                                htmlString +=
                                    "<button type='button' data-role='editcalendar' title='Takvim Düzenle'" + $dataId + " class='btn btn-primary btn-xs text-white '><i class='fas fa-calendar-alt'></i> </button>";
                                break;
                            case "editDetail":
                                htmlString +=
                                    "<button type='button' data-role='editdetail' title='Detay Düzenle'" + $dataId + " class='btn btn-warning btn-xs text-white d-none'><i class='far fa-edit'></i> </button>";
                                break;
                            case "editws":
                                htmlString +=
                                    "<button type='button' data-role='editws' title='Çalışma Takvimi Düzenle'" + $dataId + " class='btn btn-success btn-xs text-white '><i class='fas fa-clock'></i> </button>";
                                break;
                            default:
                                break;
                        }
                    });
                htmlString += "</div>";
                return htmlString;
            },
            GetTblTopButtons: function (tblName, opts) {
                const jqElement = $(tblName);
                let dataTitle = jqElement.hasAttr("data-title") ? jqElement.attr("data-title") : false;

                let fileName = jqElement.hasAttr("data-filename") ? jqElement.attr("data-filename") : false;

                let messagetop = jqElement.hasAttr("data-messagetop") ? jqElement.attr("data-messagetop") : false;

                let landscape = null;
                if ($(window).width() > 5) {
                    landscape = "landscape";
                }

                const buttonList = [];
                if (opts !== undefined) {
                    opts = opts.split(".");
                    $.each(opts,
                        function (index, element) {
                            switch (element) {
                                case "xls":
                                    buttonList.push({
                                        extend: "excelHtml5",
                                        text: "Excel",
                                        title: (dataTitle) ? dataTitle : null,
                                        filename: (fileName) ? fileName : "Excel Rapor",
                                        messageTop: (messagetop) ? messagetop : null,
                                        titleAttr: "Generate Excel",
                                        className: "btn-outline-success btn-sm mr-1",
                                        exportOptions: {
                                            columns: iTech.DataTable.Helpers.ExportOptions.GetColumns(tblName),
                                            format: {
                                                body: function (data, row, column, node) {
                                                    var result = $(node).find("div").text();
                                                    if (data.includes("fa-times") && data.includes("text-danger"))
                                                        data = "HAYIR"
                                                    else if (data.includes("fa-check") && data.includes("text-success"))
                                                        data = "EVET"
                                                    else
                                                        data = result;
                                                    return data;
                                                }
                                            }
                                        },
                                    });
                                    break;
                                case "pdf":
                                    buttonList.push({
                                        extend: "pdfHtml5",
                                        text: "PDF",
                                        title: (dataTitle) ? dataTitle : null,
                                        filename: (fileName) ? fileName : "Excel Rapor",
                                        messageTop: (messagetop) ? messagetop : null,
                                        titleAttr: "Generate PDF",
                                        className: "btn-outline-danger btn-sm mr-1",
                                        orientation: landscape,
                                        exportOptions: {
                                            columns: iTech.DataTable.Helpers.ExportOptions.GetColumns(tblName)
                                        },
                                        //customize: function (doc) {
                                        //doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                                        //},
                                        customize: function (doc) {
                                            // Tablonun kendisine erişim
                                            var table = doc.content.find(element => element.table);
                                            if (table) {
                                                // Tüm sütunlar için genişlik ayarı
                                                table.table.widths = Array(table.table.body[0].length).fill('*');
                                            }

                                            // Diğer stil ayarları
                                            doc.styles.tableHeader.alignment = 'center';
                                            doc.styles.tableBodyEven.alignment = 'center';
                                            doc.styles.tableBodyOdd.alignment = 'center';
                                        }

                                    });
                                    break;
                                case "add":
                                    buttonList.push({
                                        text: '<i class="fal fa-plus mr-1"></i> Ekle',
                                        attr: {
                                            name: "create"
                                        },
                                        className: "btn-primary btn-sm mr-1"
                                    });
                                    break;
                                case "send":
                                    buttonList.push({
                                        text: '<i class="fal fa-plus mr-1"></i> Gönder',
                                        attr: {
                                            name: "send"
                                        },

                                        className: "btn-success btn-sm mr-1"
                                    });
                                    break;
                                case "print":
                                    buttonList.push({
                                        text: '<i class="fal fa-print mr-1"></i> Yazdır',
                                        attr: {
                                            name: "print"
                                        },
                                        className: "btn-success btn-sm mr-1"
                                    });
                                    break;
                                case "remove":
                                    buttonList.push({
                                        text: '<i class="fas fa-times mr-1"></i> Çıkar',
                                        attr: {
                                            name: "remove"
                                        },
                                        className: "btn-danger btn-sm mr-1"
                                    });
                                    break;
                                case "clear":
                                    buttonList.push({
                                        text: '<i class="fas fa-broom mr-1"></i> Temizle',
                                        attr: {
                                            name: "clear"
                                        },
                                        className: "btn-danger btn-sm mr-1"
                                    });
                                    break;
                                case "colvis":
                                    buttonList.push({
                                        extend: 'colvis',
                                        text: '<i class="fal fa-columns mr-1"></i> Tablo Kolon Listesi',
                                        titleAttr: 'Col visibility',
                                        className: 'btn-outline-default'
                                    });
                                    break;
                                case "Excel":
                                    buttonList.push({
                                        text: '<i class="fas fa-sync mr-1"></i> Excel',
                                        attr: {
                                            name: "Excel",
                                            role: 'excel'
                                        },
                                        className: "btn-success btn-sm mr-1"
                                    });
                                    break;
                                case "switch":
                                    buttonList.push({
                                        text: '<i class="fas fa-toggle-off mr-1"></i> Pasif', // Başlangıç metni
                                        attr: {
                                            name: "switch",
                                            id: "mySwitch", // Butonun benzersiz bir ID'si olmalı
                                            'data-status': 'active' // Başlangıç durumu true olarak ayarlanıyor
                                        },
                                        className: "btn-info btn-sm mr-1", // Butonun stil sınıfı
                                        action: function (e, dt, node, config) {
                                            var switchStatus = $('#mySwitch').data('status');
                                            switchStatus = switchStatus == 'active' ? 'passive' : 'active';
                                            $('#mySwitch').data('status', switchStatus);

                                            if (switchStatus == 'active') {
                                                $('#mySwitch').html('<i class="fas fa-toggle-off mr-1"></i> Pasif');
                                            } else {
                                                $('#mySwitch').html('<i class="fas fa-toggle-on mr-1"></i> Aktif');
                                            }
                                        }
                                    });
                                    break;
                            }
                        });
                }
                return buttonList;
            },
            GetTblColumns: function ($table) {
                const cols = [];
                const startDiv = `<div class='text-ALIGN'>`;
                const endDiv = `</div>`;
                $($table + _ + "thead > tr > th").each(function (k, v) {
                    const obj = {};
                    const col = $(this);
                    const colAlign = col.attr("col-align") ?? "left";
                    const colRole = col.attr("col-role");
                    const isOrderable = col.hasAttr("orderable");
                    const colType = col.attr("col-type");

                    if (colRole === "action") {
                        const actionList = col.attr("action-list").split(",");
                        obj["data"] = null;
                        obj["render"] = function (data, type, row) {
                            var buttonId = row.id;
                            let render = startDiv.replace("ALIGN", colAlign);
                            if (col.hasAttr("id"))
                                buttonId = row[col.attr("id")];

                            render += iTech.DataTable.Helpers.CreateTblColActButtons(actionList, buttonId);
                            render += endDiv;
                            return render;
                        }
                    }
                    else if (colRole == "selection") {
                        obj["orderable"] = false;
                        obj["defaultContent"] = "";
                        obj["className"] = "select-checkbox";
                        obj["render"] = function (data, type, row) {
                            if (Object.keys(row).includes("degerBilgi")) {
                                if (row.degerBilgi === "selected") {
                                    var el = $($table + _ + "tbody > tr > td div");
                                    $.each(el, (k, v) => {
                                        if ($(v).text() == row.valueText) {
                                            $(v).closest("tr").addClass("selected");
                                        }
                                    });
                                }
                            }
                        }
                    }
                    else {
                        var colData = iTech.Convert.ToCamelCase(col.attr("col-data"));
                        if (colType == "date") {
                            const colFormat = col.attr("col-format") ?? 'DD.MM.YYYY HH:mm';

                            obj["data"] = colData;
                            (data, type, row) => (data !== null) ? moment(data).format(colFormat) : data;
                            obj["render"] = function (data, type, row) {
                                if (data !== null && data !== undefined && data !== "0001-01-01T00:00:00") {
                                    let rString = startDiv.replace("ALIGN", colAlign);
                                    rString += moment(data).format(colFormat) + endDiv;
                                    return rString;
                                }
                                else {
                                    return "";
                                }
                            }
                        } else if (colType == "dateNoTime") {
                            const colFormat = col.attr("col-format") ?? 'DD.MM.YYYY';

                            obj["data"] = colData;
                            (data, type, row) => (data !== null) ? moment(data).format(colFormat) : data;
                            obj["render"] = function (data, type, row) {
                                if (data !== null && data !== undefined && data !== "0001-01-01T00:00:00") {
                                    let rString = startDiv.replace("ALIGN", colAlign);
                                    rString += moment(data).format(colFormat) + endDiv;
                                    return rString;
                                }
                                else {
                                    return "";
                                }
                            }
                        }
                        else if (colType == "input") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = startDiv.replace("ALIGN", colAlign);
                                let inputType = "number";
                                let inputClass = "form-control form-control-xs"; // Additional classes for styling
                                let inputPlaceholder = col.attr("input-placeholder") ?? ""; // Placeholder text
                                let colCallback = col.attr('col-callback') ?? 'defaultCallback';

                                let readonlyAttribute = row.questionChoiceId == null ? "readonly" : "";
                                // Creating the input element with dynamic attributes
                                rString += `<input type='${inputType}' class='${inputClass}' value='${data}' placeholder='${inputPlaceholder}' onchange='${colCallback}(${row.questionChoiceId},this)' ${readonlyAttribute} >`;
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "image") {
                            obj["data"] = colData;
                            var size = (col.data("imagesize") !== undefined) ? col.data("imagesize") : "45"
                            var el = $(this);
                            obj["render"] = function (data, type, row) {
                                let rString = "";
                                rString += `<img src='${data}' width='${size}' height='${size}' alt='profilResmi' />`;
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "bool") {
                            const viewMode = col.attr("view-mode") ?? "icon";
                            // boolean kolonlar için
                            obj["width"] = 100;
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = startDiv.replace("ALIGN", colAlign);

                                switch (viewMode) {
                                    case "dot": {
                                        rString += `<div class="t-dot bg-${(data) ? 'success' : 'danger'}"></div>`
                                        break;
                                    }
                                    case "text": {
                                        var rules = col.attr("text-rule").split(":");
                                        rString += `<span class="text-${(data) ? 'success' : 'danger'}" >`;
                                        rString += (data) ? rules[0] : rules[1];
                                        rString += `</span>`;

                                        break;
                                    }
                                    case "icon": {
                                        rString += (data) ? '✔️' : '❌';
                                        break;
                                    }
                                    default: rString += data
                                }
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "boolToButton") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = startDiv.replace("ALIGN", colAlign);

                                if (data) {
                                    rString += `<button type="button" onclick="${col.attr('col-callback')}(${row.id})" class="btn btn-info btn-xs">Diğer Yanıt</button>`;
                                }

                                rString += endDiv;
                                return rString;
                            }
                        }

                        else if (colType == "currency") {
                            obj["data"] = colData;
                            obj["render"] = (data, type, row) => {
                                var viewMode = col.attr("view-mode") ?? null;
                                if (viewMode != null) {
                                    var currencyIcon = ["₺", "$", "€"];
                                    var viewMode0 = viewMode.charAt(0);
                                    var findIcon = currencyIcon.find(e => e == viewMode0);
                                    var charLengthAfterComma = viewMode.split(",")[1].length;
                                    if (viewMode0 == findIcon) {
                                        return findIcon + " " + parseFloat(data).toFixed(charLengthAfterComma);
                                    } else {
                                        return parseFloat(data).toFixed(charLengthAfterComma);
                                    }

                                }
                                return data;
                            };
                        }
                        else if (colType == "riskStatus") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = "";
                                let color = "default"; // varsayılan renk

                                const riskStatuses = [
                                    { status: "Çok Riskli", color: "danger-500" },
                                    { status: "Orta Riskli", color: "danger-100" },
                                    { status: "Az Riskli", color: "warning-400" },
                                    { status: "Riskli", color: "warning-800" },
                                    { status: "Risksiz", color: "success-600" }
                                ];
                                const matchingStatus = riskStatuses.find(riskStatus => data?.includes(riskStatus.status));
                                if (matchingStatus) {
                                    color = matchingStatus.color;
                                }

                                rString += `<span style="color: var(--theme-${color}) !important;">${data}</span>`;
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType === "link") {
                            obj["data"] = colData;
                            var el = $(this);
                            obj["render"] = function (data, type, row) {
                                let rString = "", colName = "", sendData = {};
                                var params = el.data("link") ?? ""; // undefined degilse değerini al, undefined ise '' yap.
                                if (params.length) {
                                    var paramArr = params.split(",");
                                    $.each(paramArr, (i, e) => {
                                        var eArr = e.split(":");
                                        colName = eArr[0];
                                        sendData[eArr[0]] = eArr[1];
                                    });
                                }
                                if (data) rString += `<a onclick="${el.data("function")}('${row[sendData[colName]]}')" class='text-info' style="text-decoration: underline !important; cursor: pointer;">${data}</a>`;
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "phone") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = "";
                                if (data) {
                                    // This will format the phone number as a clickable tel: link
                                    rString += `<a href='tel:${data}' class='text-primary'>${data}</a>`;
                                }
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "secret") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                var words = data.split(" ");
                                var rString = "";
                                for (var item of words) {
                                    rString += item.charAt(0);
                                    for (var i = 1; i < item.length; i++) {
                                        rString += '*';
                                    }
                                    rString += ' ';
                                }
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else if (colType == "copy") {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                let rString = startDiv.replace("ALIGN", colAlign);
                                // Create a text element with an onclick event to copy the text
                                rString += `<span class="copyText" onclick="iTech.Helpers.CopyToClipboard(this)" data-text="${data}">${data}</span>`;
                                rString += endDiv;
                                return rString;
                            }
                        }
                        else {
                            obj["data"] = colData;
                            obj["render"] = function (data, type, row) {
                                if (data == null) {
                                    data = "";
                                }
                                let rString = startDiv.replace("ALIGN", colAlign);
                                rString += data + endDiv;
                                return rString;
                            }
                        }
                    }

                    obj["orderable"] = isOrderable;
                    var colWidth = col.attr("width");

                    if (colWidth !== undefined) {
                        if (colType == "date")
                            data = data !== null ? moment.utc(data).format('DD.MM.YYYY') : "";
                        //if (colType != "image") {
                        //    obj["render"] = function (data, type, row) {
                        //        const colType = col.attr("col-type");
                        //        if (colType == "date")
                        //            data = data !== null ? moment.utc(data).format('DD.MM.YYYY') : "";

                        //        return "<div style='white-space: normal;' >" + data + "</div>";
                        //    }
                        //}
                        obj["width"] = col.attr("width") + "px";
                        obj["className"] = 'question-column';
                    } else
                        obj["width"] = colRole === "action" ? "1px" : "auto";
                    obj["name"] = col.attr("col-dynamic");
                    //obj["type"] = col.attr("col-type") ?? "string";
                    obj["searchable"] = col.attr("col-noSearchable") ?? true;
                    cols.push(obj);
                });
                return cols;
            },
            GetTblColActButtons: function (row, data, tblName) {
                tblName = tblName.replace("#", "");
                const dId = data.id ?? data.Id;
                row.dataset.id = dId;
                //const hasRule = $("#" + tblName).find("th:last").hasAttr("rules");
                const btnObjects = $(row.childNodes).find("button,input,xedit,xdelete,xreportview,checkbox");

                $.each(btnObjects,
                    function (i, htmlEl) {
                        const targetEl = htmlEl.localName.substring(0, htmlEl.localName.length);
                        const opts = $(htmlEl).get(0).dataset;
                        if ($(htmlEl).is("input") || $(htmlEl).is("checkbox")) {
                            if ($(htmlEl).data("type") === "switcher") {
                                const prop = (typeof opts.prop == typeof undefined) ? false : opts.prop;
                                $(htmlEl).attr("id", tblName + "Switcher" + dId);
                                $(htmlEl).prop("checked", data[prop]);
                                $(htmlEl).next().attr("for", tblName + "Switcher" + dId);
                            }
                        };
                        $(htmlEl).data("id", dId);

                        //if (hasRule) {
                        //    const ruleList = eval($("#" + tblName).find("th:last").attr("rules"));
                        //    var filteredRule = ruleList.filter(t => t[targetEl])[0];

                        //    if (filteredRule) {
                        //        const targetData = filteredRule[targetEl].split("|")[0];
                        //        const targetCondition = filteredRule[targetEl].split("|")[1];
                        //        var targetResult = filteredRule[targetEl].split("|")[2];

                        //        var ruleString = "";
                        //        var result = true;
                        //        if (targetResult == "null") {
                        //            result = data[targetData] == null;
                        //        } else {
                        //            ruleString = data[targetData] + " " + targetCondition + ' parseInt(' + targetResult + ');';
                        //        }
                        //        if (!eval(ruleString) && result) {
                        //            $(htmlEl).css("display", "none");
                        //        }
                        //    }
                        //}
                    });
                return btnObjects;
            },
            ExportOptions: {
                GetColumns: function (tblName) {
                    const cols = [];
                    $(tblName + _ + "thead th").each(function (index, htmlEl) {
                        if ($(this).hasAttr("data-export")) {
                            if ($(this).data("export") === true && typeof $(this).data("export") != typeof undefined) {
                                cols.push(index);
                            }
                        }
                        else
                            cols.push(index);
                    });
                    return cols;
                }
            },
            GetDomString: function (dom) {
                if (!dom && dom !== "") {
                    return `<'row mb-3'
                        <'col-xl-2 col-lg-3 col-md-4 col-sm-12 d-flex align-items-center justify-content-start'f>
                        <'col-xl-8 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center'B>
                        <'col-xl-2 col-lg-3 col-md-2 col-sm-12 d-flex align-items-center justify-content-end'l>
                    >
                    <'row'
                        <'col-sm-12'tr>
                    >
                    <'row'
                        <'col-sm-12 col-md-5'i>
                        <'col-sm-12 col-md-7'p>
                    >`;
                } else {
                    let parts = dom ? dom.split(" ") : [];
                    const layoutMapping = {
                        'f': false,
                        'B': false,
                        'l': false,
                        'i': false,
                        'p': false
                    };

                    parts.forEach(part => {
                        if (!layoutMapping[part]) {
                            layoutMapping[part] = true;
                        }
                    });

                    return `<'row mb-3'
                        <'col-xl-2 col-lg-3 col-md-4 col-sm-12 d-flex align-items-center justify-content-start'${layoutMapping['f'] ? 'f' : ''}>
                        <'col-xl-8 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center'${layoutMapping['B'] ? 'B' : ''}>
                        <'col-xl-2 col-lg-3 col-md-2 col-sm-12 d-flex align-items-center justify-content-end'${layoutMapping['l'] ? 'l' : ''}>
                    >
                    <'row'
                        <'col-sm-12'tr>
                    >
                    <'row'
                        <'col-sm-12 col-md-5'${layoutMapping['i'] ? 'i' : ''}>
                        <'col-sm-12 col-md-7'${layoutMapping['p'] ? 'p' : ''}>
                    >`;
                }
            },
            GetGroupedColumn: function (tableId) {
                var targetData = $(tableId).find("thead > tr:first").attr("group-by");
                return (typeof targetData != typeof undefined) ? { dataSrc: targetData } : false;
            },
            DynamicTopButtons: function (tblName, opts) {
                const buttonList = [];
                if (opts !== undefined) {
                    opts = opts.split(".");
                    $.each(opts,
                        function (index, element) {
                            switch (element) {
                                case "Save":
                                    buttonList.push({
                                        text: 'Kaydet',
                                        attr: {
                                            name: "SaveTable"
                                        },
                                        className: "btn-success btn-sm mr-1"
                                    });
                                    break;
                            }
                        });
                }
                return buttonList;
            },
            DynamicColumns: function ($table) {
                const cols = [];
                $($table + _ + "thead > tr > th").each(function (k, v) {
                    const obj = {};
                    const tAlign = $(this).attr("align") ?? "left";
                    const isReadOnly = $(this).hasAttr("readonly");
                    let elWidth = "auto";
                    if ($(this).attr("elWidth") !== undefined)
                        elWidth = $(this).attr("elWidth") + "vw";

                    if ($(this).data("type") == "text") {
                        var colName = $(this).data("col");
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<input type="text" name="${obj.data}" data-type="text" data-attr="${colName}-${row.sicilNo}"  class="form-control form-control-xs table-input text-center" style="width:${elWidth};" value="${data}"  ${(isReadOnly) ? "disabled" : ""}/>`;
                                return rString;
                            }
                        }
                    }
                    else if ($(this).data("type") == "label") {
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<span name="${obj.data}" class="table-input" style="width:${elWidth}; display:block;">${(data != null) ? data : ""}</span>`;
                                return iTech.DataTable.Helpers.CenterCell(rString, tAlign);
                            }
                        }
                    }
                    else if ($(this).data("type") == "textarea") {
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<textarea name="${obj.data}" rows="2" class="form-control form-control-xs" style="width:${elWidth};" ${(isReadOnly) ? "disabled" : ""}>${data}</textarea>`;
                                return rString;
                            }
                        }
                    }
                    else if ($(this).data("type") == "select") {
                        var datamethod = $(this).data("method");
                        var dataParam = $(this).data("param");
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            var paramValue = row[dataParam];
                            if (paramValue !== null) {
                                var itemName = obj.data.charAt(0).toUpperCase() + obj.data.substr(1); // ilk harf büyültülür.
                                var value = row[obj["data"]];

                                let rString = `<select id="${itemName}" name="${itemName}" class="form-control form-control-xs" data-sel2="false" data-firstEmpty="true" data-type="static" style="width:${elWidth};" data-method="${datamethod}" data-action="GetAll" data-text="ad" data-value="id" data-param="${paramValue}" value="${value}">
                                </select>`;

                                return rString;
                            }
                            return "";
                        }
                    }
                    else if ($(this).data("type") == "number") {
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<input type="number"  name="${obj.data}" data-type="number" step="0.0001" class="form-control form-control-xs text-right" style="width:${elWidth}; border:1px solid #235aa7;" value="${data}" ${(isReadOnly) ? "disabled" : ""}/>`;
                                if (row["odemeHesapTur"] == 40)
                                    rString = `<input type="number"  name="${obj.data}" data-type="number" step="0.01"   class="form-control form-control-xs text-right" style="width:${elWidth}; border:1px solid #235aa7;" value="${data}" ${(isReadOnly) ? "disabled" : ""}/>`;
                                return rString;
                            }

                            return data;
                        }
                    }
                    else if ($(this).data("type") == "date") {
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<input type="date" style="width:${elWidth};" name="${obj.data}" data-type="date" value="${obj.data}" ${(isReadOnly) ? "disabled" : ""}/>`;
                                return rString;
                            }
                            return data;
                        }
                    }
                    else if ($(this).data("type") == "bool") {
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data !== null) {
                                let rString = `<input type="checkbox" value="${obj.data}"  ${(isReadOnly) ? "disabled" : ""}/>`;
                                return rString;
                            }
                        }
                    }
                    else {
                        // Normal Kolon
                        obj["data"] = $(this).data("col");
                        obj["render"] = function (data, type, row) {
                            if (data == null) {
                                data = "";
                            }

                            let rString = startDiv.replace("ALIGN", tAlign);
                            rString += `<input type="text" data-type="text" name="${obj.data}" value="${data}"  ${(isReadOnly) ? "disabled" : ""}/>`;
                            rString += endDiv;
                            return rString;
                        }
                    }

                    obj["orderable"] = typeof $(this).attr("orderable") == typeof undefined;
                    //obj["width"] = ($(this).attr("width") != undefined) ?
                    //    $(this).attr("width") + "px" :
                    obj["width"] = "auto";

                    cols.push(obj);
                });
                return cols;
            },
            DynamicRowCallback: function (row, data, tblName) {
                // https://datatables.net/reference/option/rowCallback
                tblName = tblName.replace("#", "");
                const dId = data.id ?? data.Id;
                row.dataset.id = dId;

                const btnObjects = $(row.childNodes).last().find("select");
                $.each(btnObjects,
                    function (key, htmlEl) {

                        if ($(htmlEl).is("select")) {
                            var maasDonemId = $("#MaasDonemIdMain").val();

                            var param = $(htmlEl).data("param");

                            if (maasDonemId != null) {
                                param = param + ":" + maasDonemId;
                            }

                            var pVal = $(htmlEl).val();
                            iTech.Forms.Helpers.comboDoldur(htmlEl, param, pVal);

                            $(htmlEl).val(data.odemeGrupAltId);
                        }
                    });
                return btnObjects;
            },
            GetDynamicTblData: function (tableId) {
                //  Gizli Kolon(lar) için tutucu dizi (variable).
                var hiddenColumnsArr = [];

                // selector
                var table = $(`${tableId}`);

                // headings satırında data-hidden attr varsa 
                if (table.find(`thead tr:first`).hasAttr(`data-hidden`))
                    hiddenColumnsArr = table.find(`thead tr:first`).attr(`data-hidden`).split(`,`);

                // tablo satırları
                const tableRows = table.find(`tbody tr`);

                // Method Sonunda Geri Döneceğimiz Array
                var rArr = [];

                // Algorithm
                // 1) Her bir satır için
                $.each(tableRows, (index, rowEl) => {
                    // geçici obje.
                    var tempObj = {};

                    // satırdaki kolonlar
                    const rowColumns = $(rowEl).find("td");

                    // her bir kolon için
                    $.each(rowColumns, (i, colEl) => {
                        // kolon hedefleme.
                        const col = $(colEl);

                        // kolon içerisindeki element(ler)
                        const innerElement = col.find("input,select");
                        if (!innerElement.length) return; // Sütunda element işlem yapmak gereksiz.

                        //const isReadOnly = innerElement.hasAttr("readonly"); // readonly alan mı kontrolü. (sonra kullanılabilir.)

                        var elName = innerElement.attr("name"); // Objede kullanılacak olan 'Key', adını elementinden alır.
                        elName = elName.charAt(0).toUpperCase() + elName.substr(1); // ilk harf büyültülür.

                        // elementlere göre değer atamaları yapılır.
                        // element input ise
                        if (innerElement.is("input")) {
                            // input ama [text mi, number mı, date mi]
                            const elType = innerElement.attr("data-type");

                            switch (elType) {
                                case "number":
                                    var colVal = parseFloat(innerElement.val());
                                    tempObj[elName] = colVal;
                                    break;
                                case "date":
                                    tempObj[elName] = innerElement.val(); //datetime kontrol edilecek. (revize gerekebilir.)
                                    break;
                                case "checkbox":
                                    tempObj[elName] = innerElement.prop("checked");
                                    break;
                                default://text'tir yani.
                                    tempObj[elName] = innerElement.val();
                            }
                        }

                        // element select ise
                        if (innerElement.is("select")) {
                            tempObj[elName] = innerElement.val();
                        }

                    });

                    // hidden alan var ise dönecek array'e eklenir.
                    if (hiddenColumnsArr.length) {
                        // datatable dan bu row'un tüm verisi okunuyor. (hidden alanlar dahil)
                        var rowData = $(`${tableId}`).DataTable().row(index).data();
                        if (rowData) {
                            // her bir gizlenmiş kolon için
                            $.each(hiddenColumnsArr, (i, hdnKey) => {
                                // geçici objeye rowData'dan eşleşen key ile ekleme yapılıyor.
                                tempObj[hdnKey] = rowData[hdnKey];
                            });
                        }

                    }
                    if (tempObj.hasOwnProperty("OdemeGrupAltId"))
                        if (tempObj["OdemeGrupAltId"] > 0 && tempObj["Deger"] == 0)
                            tempObj["Deger"] = 1;
                    // geçici obje, dönecek olan array'e eklenir.(push edilir)
                    rArr.push(tempObj);

                });

                return rArr;

            },
            CenterCell: function (rstring, tAlign) {
                return `<div class='text-${tAlign}'>${rstring}</div>`;
            },
        },
        IsDataTable: function ($table) {
            return $.fn.DataTable.isDataTable($table)
        },
    },
    Select2: {
        Load: {
            WithAjax: function (selector, url, type = FormMethod.Post, $selectionMethod, $selectionUrl, $viewKey) {
                // Set up the Select2 control

                $("#" + selector).select2({
                    ajax: {
                        url: apiBaseUrl + url,
                        type: type,
                        processResults: function (data) {
                            // Transforms the top-level key of the response object from 'items' to 'results'
                            return {
                                results: data.data
                            };
                        }
                    }
                });
            }
        },
        /**
         * @param {string} selector      "Kulanılan select elementinin id'si.
         * @param {object} $resultObj    Liste olarak ajax ile gelen data.
         * @param {string} $resultObjKey Gelen listenin hangi parametresi(keyword) ile çalışacağımızı belirtiyoruz.
         * @param {object} $targetObj    Çoklu seçimlerdeki ajax ile ayrı yeten çektiğimiz hedef objemiz. (Data base kayıtlı olan önceki seçtiklerimiz.)  !!!MULTIPLE!!!
         * @param {string} $targetObjKey Tekli or Çoklu fark etmeksizin hedef bir keyword veririz. Select'imiz verdiğimiz bu değerle oluşur.
                                         Tekli select işlemlerde doğrudan değeri.
                                         Çoklu select işlemlerde ise hedef object($targetObj)'in keyword'ünü veririz.
         * @param {string} $viewKey      Kullanıcıya listelenecek olan yani select box da bizim görebileceğimiz değer belirttiğimiz keyword.  ($resultObj sonuç objemizin keywordü)
         * @param {string} $idName       Select2 içerisindeki Options'ların alacağı Value değerlerini belirttiğimiz keyword.
         * @param {boolean} isChoice     Select2'nun ilk option'ı olan -> "<option> Lütfen Bir Seçim Yapınız... </option>" seçeneğini ekler.
         */
        Select: function (selector, $resultObj, $resultObjKey, $targetObj = null, $targetObjKey = null, $viewKey, $idName = "id", isChoice = true) {
            $("#" + selector + " option").remove();
            let op = "";
            let defaultOpt;
            (isChoice) ? defaultOpt = "<option value=''> Bir Seçim Yapın </option>" : defaultOpt = "";
            for (let index = 0; index < $resultObj.length; index++) {
                let select = "";
                op += "<option" + _;
                if ($targetObj !== null) { // Multi Select
                    for (let i = 0; i < $targetObj.length; i++) {
                        if ($resultObj[index][$resultObjKey] === $targetObj[i][$targetObjKey])
                            select = "selected";
                    }
                    op += "id='" + selector + $resultObj[index].id + "'" + _;

                } else { // Single Select
                    if ($targetObj == null && $resultObj[index][$resultObjKey] === $targetObjKey)
                        select = "selected";
                    op += "id='" + selector + $resultObj[index][$resultObjKey] + "'" + _;

                }
                op += "value = '" + $resultObj[index][$idName] + "'" + _;
                op += select + ">";
                op += $resultObj[index][$viewKey];
                op += "</option>";
            }
            return $("#" + selector).append(defaultOpt + op).select2();
        },
        SelectWithAjaxSearch: function ($selector, $method, $filter = "id", $delay = 250) {
            $($selector).select2(
                {
                    ajax:
                    {
                        url: iTech.Defaults.ApiBaseUrl + $method,
                        dataType: 'json',
                        delay: $delay,
                        data: function (params) {
                            return {
                                q: params.term, // search term
                                page: params.page || 1
                            };
                        },
                        beforeSend: function (jqXhr) {
                            jqXhr.setRequestHeader("Authorization", "Bearer " + iTech.User.GetToken());
                        },
                        processResults: function (data, params) {
                            $($selector).children().remove();
                            params.page = params.page || 1;

                            var results = [];
                            $.each(data.result, function (k, v) {
                                results.push({ id: v[$filter], text: v.text });
                            });

                            return {
                                results: results,
                                pagination: { more: ((params.page * 30) < data.result.length) }
                            };
                        },
                        cache: true
                    },
                    placeholder: 'Aranacak personelin adını giriniz...',
                    //escapeMarkup: function (markup) {
                    //    return markup;
                    //},
                    minimumInputLength: 1,
                    templateResult: (repo) => {
                        if (repo.loading) {
                            return repo.text;
                        }
                        var $container = $(
                            `<div class='select2-result-repository clearfix'>
                                    <div class='select2-result-repository__meta'>
                                        <div class='select2-result-repository__title'> </div>
                                    </div>
                                </div>`
                        );

                        $container.find(".select2-result-repository__title").text(repo.text);

                        return $container;
                    },
                    templateSelection: (repo) => { return repo.text; }
                });
        },
        SearchPersonelWithAjaxDetail: function ($selector, $method, $filter = "id", $delay = 250) {
            $($selector).select2(
                {
                    ajax:
                    {
                        url: iTech.Defaults.ApiBaseUrl + $method,
                        dataType: 'json',
                        delay: $delay,
                        data: function (params) {
                            return {
                                q: params.term, // search term
                                page: params.page || 1
                            };
                        },
                        beforeSend: function (jqXhr) {
                            jqXhr.setRequestHeader("Authorization", "Bearer " + iTech.User.GetToken());
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;

                            var results = [];

                            $.each(data, function (k, v) {
                                results.push({
                                    id: v[$filter],
                                    text: v.adSoyad,
                                    profilImg: v.profilResim,
                                    dahili: v.dahili,
                                    unvanAd: v.unvanTanimIdAd,
                                    birimAd: v.kurumTanimIdGorevAd,
                                    searchText: params.term
                                });
                            });

                            return {
                                results: results,
                                pagination: { more: ((params.page * 30) < data.length) }
                            };
                        },
                        cache: true
                    },
                    placeholder: 'Aranacak personelin adını giriniz...',
                    //escapeMarkup: function (markup) {
                    //    return markup;
                    //},
                    minimumInputLength: 1,
                    templateResult: (repo) => {
                        if (repo.loading) {
                            return repo.text;
                        }
                        var $container = $(
                            `  
                                         <div class="row">
                                        <div class="col-10">
                                            <div class="row">
                                                <div class="col-12">
                                                    <span style="font-size:15px;font-weight:500;">${repo.text}</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    <span style="font-size:12px;font-weight:200;">  ${repo.unvanAd} </span>
                                                </div>
                                                <div class="col-12">
                                                    <span style="font-size:10px; font-weight:200;">  ${repo.birimAd} </span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <span style="font-size:12px; font-weight:100;"><i class="fa fa-phone fx-2 mr-2"></i>   ${repo.dahili}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            `
                        );
                        return $container;
                    },
                    templateSelection: (repo) => {

                        return repo.searchText;
                    }
                });
        },
    },
    lclStr: {
        get: function ($key) {
            const jsonStr = localStorage.getItem($key);
            let result;
            try {
                result = $.parseJSON(jsonStr);
            } catch (ex) {
                result = jsonStr;
            }
            return result;
        },
        set: function ($key, $data) {
            localStorage.setItem($key, JSON.stringify($data));
        },
        rem: function ($key) {
            localStorage.removeItem($key);
        }
    },
    Convert: {
        ToBase62: function (param) {
            var s = param.toString();
            var digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var result = 0;
            for (var i = 0; i < s.length; i++) {

                var p = digits.indexOf(s[i]);
                if (p < 0) {
                    return NaN;
                }
                result += p * Math.pow(digits.length, s.length - i - 1);
            }
            return result;
        },
        FromBase62: function (n) {
            if (n === 0) {
                return '0';
            }
            var digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var result = '';
            while (n > 0) {
                result = digits[n % digits.length] + result;
                n = parseInt(n / digits.length, 10);
            }

            return result;
        },
        ToObj: function (serializedDataArray) {
            var rObj = {}

            $.each(serializedDataArray, function (i, obj) {
                const objData = obj.name.split(".");
                if (objData.length > 1) {
                    if (typeof rObj[objData[0]] == 'undefined') {
                        rObj[objData[0]] = {};
                    }
                    rObj[objData[0]][objData[1]] = obj.value;
                }
                else
                    rObj[obj.name] = obj.value;

            });

            return rObj;
        },
        ToInt: function (string) {
            return parseInt(string);
        },
        ToString: function (s) {
            return s.ToString();
        },
        StringToJson: function (s) {
            return $.parseJSON(s);
        },
        ToBoolean: function (text) {
            return text.length;
        },
        BoolToInt: function (boolVal) {
            return (boolVal) ? 1 : 0;
        },
        ListOfArrToObj: function (arr) {
            try {
                const obj = {};
                $.each(arr, (key, value) => obj[key] = value);
                return obj;
            } catch (ex) {
                console.log(ex);
            }
        },
        ToDateString: function (dateTimeString) {
            return (dateTimeString != null) ? dateTimeString.substring(0, 10).split("-").reverse().join("/") : ""
        },
        ImageToBase64String: function (file) {
            //async
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        ToCamelCase: function (value) {
            return value.charAt(0).toLowerCase() + value.slice(1);
        },
        ToPascalCase: function (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        GetKeyByValue: function (object, value) {
            return Object.keys(object).find(key => object[key] === value);
        },
    },
    Defaults: {
        Language: "tr",
        ApiBaseUrl: apiBaseUrl,
    },
    Forms: {
        Generate: function ($formName = "") {
            $.each(dtSelects, (i, htmlEl) => {
                var inModal = $(htmlEl).closest("div[role='dialog']").length;
                var inTab = $(htmlEl).closest("div[role='tabpanel']").length;
                if (inModal) {
                    var parentModal = $(htmlEl).closest("div[role='dialog']");
                    var inTab = $(htmlEl).closest("div[role='tabpanel']");
                    var pmId = parentModal.attr("id");
                    $("#" + pmId).on("show.bs.modal", () => {
                        var partials = $("#" + pmId + _ + "div[data-role='partial']");
                        if (partials.length) {
                            var parentPartial = $(htmlEl).closest("div[data-role='partial']").attr("id");
                            var parentPartialDiv = $("#" + parentPartial);
                            if (!parentPartialDiv.hasClass("d-none"))
                                iTech.Forms.Helpers.ExecuteSelect(htmlEl);
                        } else {
                            iTech.Forms.Helpers.ExecuteSelect(htmlEl);
                        }
                    });
                }
                else if (inTab && !$("#smartwizard").length > 0) {
                    var parentModal = $(htmlEl).closest("div[role='tabpanel']");
                    var pmId = parentModal.attr("id");

                    if (parentModal.hasClass("active")) {
                        iTech.Forms.Helpers.ExecuteSelect(htmlEl);
                    }

                    $(`a[href='#${pmId}']`).on("show.bs.tab", () => {
                        var partials = $("div[role='tabpanel']#" + pmId);
                        var noLoad = partials.data("noload");
                        if (partials.length && !noLoad) {
                            iTech.Forms.Helpers.ExecuteSelect(htmlEl);
                        }
                    });
                }
                else {
                    iTech.Forms.Helpers.ExecuteSelect(htmlEl);
                }
            });
        },
        Helpers: {
            ComboRefreshData: function (htmlEl, target, value = null) {
                const param = htmlEl.value ?? htmlEl.find("option:selected").val();
                if (target != "" && target != undefined) {
                    target.split(",").forEach((k, v) => {
                        var combo = $('#' + k)[0];
                        var dataForm = combo.getAttribute("data-form"); // <select data-param="1" 'deki param

                        if (param) {
                            if (!dataForm)
                                iTech.Forms.Helpers.FillCombo.Static(combo, param, value);
                            else
                                iTech.Forms.Helpers.FillCombo.Dynamic(combo, param, value);
                        }
                    });
                }
            },
            GetComboData: async function (controller, NormalizeAd, FieldText) {
                let response = null;
                await iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = controller + "/" + NormalizeAd + "/" + FieldText,
                ).then(res => {
                    response = (res.isSuccess) ? res.value : null;
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
                return response;
            },
            JsShortGuid: function () {
                var uuid = Math.random().toString(36).slice(-6);
                return "IT" + uuid + "_";
            },
            MakeJsTree: function ($data, $htmlEl) {
                var dataPageName = $htmlEl.getAttribute("data-pagename");
                var threeState = $htmlEl.getAttribute("data-threestate");
                var multiple = $htmlEl.getAttribute("data-multiple");
                var checbox = ($htmlEl.getAttribute("data-checkbox") == null) ? true : $htmlEl.getAttribute("data-checkbox");
                if ($($htmlEl).jstree("get_selected").length > 1)
                    return;

                if ($($htmlEl).jstree(true)) {
                    $($htmlEl).jstree().destroy();
                }

                $($htmlEl).jstree({
                    core: {
                        strings: {
                            "Loading ...": "Yükleniyor..."
                        },
                        data: $data,
                        multiple: (multiple == "true") ? true : false,
                        themes: {
                            "icons": false
                        }
                    },
                    checkbox: {
                        "keep_selected_style": true,
                        "three_state": (threeState == "true") ? true : false
                    },
                    check_callback: false,
                    plugins: (!checbox) ? [
                        "search", "checkbox", "sort", "changed"
                    ] : [
                        "search", "sort", "changed"
                    ],
                    search: {
                        case_sensitive: false,
                        show_only_matches: true
                    }

                }).bind("changed.jstree",
                    function (e, data) {
                        let selectData = data["selected"];
                        selectData.unshift("1");
                        if ($($htmlEl).hasAttr("data-pagename")) {
                            window[dataPageName].Variables.UnitsData = $data.filter(x => selectData.includes(x.id)).sort(function (a, b) {
                                return a.id - b.id || a.name.localeCompare(b.name);
                            });
                        }
                    })
                    .bind("ready.jstree", function () {
                        $($htmlEl).jstree("open_node", "700036");
                    })
                    .on('select_node.jstree deselect_node.jstree', function (e, data) {
                        if ((threeState == "false") ? true : false) {
                            var children = iTech.Forms.Helpers.GetAllChildrenNodes(data.node.id, [], $htmlEl);
                            (e.type == "select_node") ?
                                children.forEach(function (node) {
                                    $($htmlEl).jstree("select_node", node);
                                })
                                :
                                children.forEach(function (node) {
                                    $($htmlEl).jstree("deselect_node", node);
                                });
                        }
                    })
                    .init("loading.jstree", function () {
                        if ($($htmlEl).siblings().length > 0)
                            iTech.Forms.Helpers.TreeSearchHandler($($htmlEl).siblings(), $htmlEl);
                    });
            },
            TreeSearchHandler: function ($htmlEl, $treeEl) {
                var to = false;
                $($htmlEl).off().on("change", function (e) {
                    var searchValue = e.currentTarget.value;
                    if (searchValue.length == 0)
                        $($treeEl).jstree(true).show_all();

                    else if (searchValue.length < 4)
                        return false;

                    if (to) {
                        clearTimeout(to);
                    }

                    to = setTimeout(function () {
                        const v = $($htmlEl).val();
                        $($treeEl).jstree(true).search(iTech.Helpers.Slugify(v));
                    },
                        250);
                });
            },
            GetAllChildrenNodes: function (parentNode, children = [], $htmlEl) {
                var node = $($htmlEl).jstree("get_node", parentNode);
                children.push(node.id);
                if (node.children) {
                    for (var i = 0; i < node.children.length; i++) {
                        iTech.Forms.Helpers.GetAllChildrenNodes(node.children[i], children, $htmlEl);
                    }
                }
                return children;
            },
            ExecuteSelect: function (htmlEl) {
                var dType = $(htmlEl).data("type");
                switch (dType) {
                    case "dynamicTable":
                        iTech.Forms.Helpers.FillTable.Dynamic(htmlEl);
                        break;
                    case "staticTable":
                        iTech.Forms.Helpers.FillTable.Static(htmlEl);
                        break;
                    case "dynamic":
                        iTech.Forms.Helpers.FillCombo.Dynamic(htmlEl);
                        break;
                    case "static":
                        iTech.Forms.Helpers.FillCombo.Static(htmlEl);
                        break;
                    case "tree":
                        iTech.Forms.Helpers.FillTree(htmlEl);
                        break;
                }
            },
            SerializeArray: function (inputs) {
                let data = inputs.not("[multiple]").serializeArray();


                data = iTech.Convert.ToObj(data);

                $.each(inputs, (index, htmlEl) => {
                    const el = $(htmlEl);
                    if (el.attr("type") === "checkbox") {
                        data[el.attr("name")] = el.prop("checked");
                    }

                    if (el.attr("type") === "file") {
                        if (el.attr("name") !== undefined)
                            data[el.attr("name")] = el[0].files[0];
                    }

                    if (el.hasAttr("multiple")) {
                        if (el.attr("name") !== undefined)
                            data[el.attr("name")] = el.val();
                    }

                    if (el.hasClass("currency")) {
                        data[el.attr("name")] = parseFloat(el.val().replaceAll(",", ""));
                    }
                });
                return data;
            },
            FillTree: function (htmlEl) {
                let splitted = htmlEl.id.split('.');
                if (splitted.length > 1)
                    elName = splitted[1];
                else
                    elName = htmlEl.id;

                var source = htmlEl.getAttribute("source");

                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = source
                ).then(res => {
                    if (res.isSuccess) {
                        $.each(res.value,
                            function (index, obj) {
                                if (obj.parent === "#") {
                                    obj.icon = "//" + appFolder.images + "/tree-view-icons/SBBx16.png";
                                } else {
                                    obj.icon = "//" + appFolder.images + "/tree-view-icons/birim.png";
                                }
                            });
                        iTech.Forms.Helpers.MakeJsTree(res.value, htmlEl);
                    } else
                        iTech.ShowMessage("dashboard.TreeView", "common.DataNotFound", "error");
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            },
            FillCombo: {
                Dynamic: async function (htmlEl, param = null, value = null) {
                    if (!htmlEl)
                        return false;
                    let splitted = htmlEl.id.split('.');

                    if (splitted.length > 1)
                        elName = splitted[1];
                    else
                        elName = htmlEl.id;

                    const indOfId = elName.indexOf("Id");
                    if (indOfId > -1)
                        elName = elName.slice(0, indOfId);

                    var datatext = htmlEl.getAttribute("data-text");
                    var datavalue = htmlEl.getAttribute("data-value");
                    // <select data-firstEmpty='true'
                    var defaultValue = ($(htmlEl).attr("value") != null) ? $(htmlEl).attr("value") : "";
                    var isSelect2 = (htmlEl.getAttribute("opt-sel2") != null) ? (htmlEl.getAttribute("opt-sel2") == 'true') : false

                    var dataParam = htmlEl.getAttribute("data-param"); // <select data-param="1" 'deki param
                    var initialText = htmlEl.hasAttribute("opt-initialText") ? htmlEl.getAttribute("opt-initialText") === '' ? "---" : htmlEl.getAttribute("opt-initialText") : null;

                    //default-text
                    var defaultValue = ($(htmlEl).attr("value") != null) ? $(htmlEl).attr("value") : "";
                    var defaultText = ($(htmlEl).attr("text") != null) ? $(htmlEl).attr("text") : "";

                    if (dataParam == "fvalue") {//filter value

                        var target = iTech.Helpers.GetUrlParameter("fvalue");
                        if (target)
                            dataParam = target;
                    }

                    if (param)
                        elName = elName + "/" + param;

                    if (datatext) {
                        var paramSend = datatext;
                        if (datavalue)
                            paramSend += "|" + datavalue;

                        var result = await iTech.Forms.Helpers.GetComboData("Forms/GetComboData", elName, paramSend);
                        let optString = "";

                        for (var i = 0; i < result.length; i++) {
                            var selected = '';
                            if (initialText == result[i].name) {
                                selected = "selected='true'";
                                initialText = false;
                            }
                            optString += `<option value="${result[i].value}" ${selected}>${result[i].name}</option>`;
                        };

                        if (initialText)
                            optString = "<option value=''>" + initialText + "</option>" + optString;

                        $(htmlEl).html(optString);

                        if (defaultValue.length) {
                            $(htmlEl).val(defaultValue);
                        }

                        if (isSelect2) {
                            $(htmlEl).select2();
                        }
                    }
                },
                Static: async function (htmlEl, param = null, value = null) {
                    try {
                        let params = (param != null) ? (param.includes(":")) ? param.split(":") : null : null;

                        var dataText = htmlEl.getAttribute("data-text");
                        var dataValue = htmlEl.getAttribute("data-value");
                        var dataExtraValue = htmlEl.getAttribute("data-extraValue");
                        var source = htmlEl.getAttribute("source");
                        var initialText = htmlEl.hasAttribute("opt-initialText") ? htmlEl.getAttribute("opt-initialText") === '' ? "---" : htmlEl.getAttribute("opt-initialText") : null;

                        //default-text
                        var defaultValue = ($(htmlEl).attr("value") != null) ? $(htmlEl).attr("value") : "";
                        var defaultText = ($(htmlEl).attr("text") != null) ? $(htmlEl).attr("text") : "";

                        var dataParam = htmlEl.getAttribute("data-param"); // <select data-param="1" 'deki param

                        if (dataParam == "fvalue") {//filter value

                            var target = iTech.Helpers.GetUrlParameter("fvalue");
                            if (target)
                                dataParam = target;
                        }

                        //opt-sel2 
                        var isSelect2 = (htmlEl.getAttribute("opt-sel2") != null) ? (htmlEl.getAttribute("opt-sel2") == 'true') : false
                        if (dataText) {
                            if (!param && dataParam)
                                source = source + "/" + dataParam;
                            if (param && !(param.includes(":")))
                                source = source + "/" + param;
                            if (params != null)
                                source = source + "/" + params[0] + "/" + params[1];

                            var response = iTech.Services.Ajax(FormMethod.Get, source);

                            if (!response.isSuccess)
                                return;

                            let result = response.value;

                            let optString = "";
                            for (var i = 0; i < result.length; i++) {
                                if (result[i][dataText] != "Tanımsız") {
                                    var optText = "";
                                    var splitText = dataText.split(',');
                                    splitText.forEach(function (currentValue, index, array) {
                                        if (optText.length > 0) optText += " - ";
                                        if (result[i][currentValue]?.toString() !== undefined)
                                            optText += result[i][currentValue];
                                        else
                                            optText = optText.replace(" - ", "");
                                    });

                                    var extValue = "";
                                    if (htmlEl.hasAttribute("data-extraValue")) {
                                        var splitText = dataExtraValue.split(',');
                                        splitText.forEach(function (currentValue, index, array) {
                                            if (extValue.length > 0) extValue += " ";
                                            extValue += "data-" + currentValue + '="' + result[i][currentValue]?.toString() + '"';
                                        });
                                    }
                                    optString += `<option value="${result[i][dataValue]}" ${extValue}>${optText}</option>`;
                                }

                                if (defaultText.length && defaultText == result[i][dataText])
                                    defaultValue = result[i][dataValue];
                            }

                            if (initialText)
                                optString = "<option value=''>" + initialText + "</option>" + optString;

                            $(htmlEl).html(optString);

                            if (defaultValue != "")
                                $(htmlEl).val(defaultValue);

                            if (value)
                                $(htmlEl).val(value);

                            if (isSelect2) $(htmlEl).select2();

                            if (htmlEl.hasAttribute("onchange"))
                                $(htmlEl).trigger('change');
                        }
                    } catch (err) {
                        console.log("%c (!) StaticDoldur (!) \n", "background: red", err);
                    }
                },
            },
            FillTable: {
                Dynamic: function (htmlEl, param = null, value = null) {
                    let splitted = htmlEl.id.split('.');
                    if (splitted.length > 1)
                        elName = splitted[1];
                    else
                        elName = htmlEl.id;

                    const indOfId = elName.indexOf("Id");
                    if (indOfId > -1)
                        elName = elName.slice(0, indOfId);

                    var datatext = htmlEl.getAttribute("data-text");
                    var dataParam = htmlEl.getAttribute("data-param"); // <select data-param="1" 'deki param

                    if (dataParam == "fvalue") {//filter value

                        var target = iTech.Helpers.GetUrlParameter("fvalue");
                        if (target)
                            dataParam = target;
                    }

                    if (param)
                        elName = elName + "/" + param;

                    const formName = $(htmlEl).closest("form").attr("name");
                    let selectorId = "[name='" + formName + "'] #" + elName;

                    if (datatext) {
                        var thead = `<thead>
                            <tr class="d-none">
                                <th id="allCheck" col-role="selection">
                                    <i class="fas fa-check" style="color: var(--primary);"></i>
                                </th>
                                <th col-data="value"></th>
                            </tr>
                        </thead>`;

                        if (iTech.DataTable.IsDataTable(htmlEl)) {
                            $(htmlEl).DataTable().destroy();
                        }

                        if (!$(htmlEl).find("thead").length > 0)
                            $(htmlEl).append(thead);

                        if (thead.length > 0) {
                            const rule = ($(htmlEl).hasAttr("data-rule")) ? "/" + htmlEl.getAttribute("data-rule") : "";
                            iTech.DataTable.Load.AjaxSourcedSynchronicity(selectorId, "Forms/GetTableData/" + elName.replace("Table", "") + "/" + datatext + rule);
                        }
                    }
                },
                Static: function (htmlEl) {
                    try {
                        if (htmlEl != null) {
                            let elName = htmlEl.id;

                            let splitted = htmlEl.id.split('.');
                            if (splitted.length > 1)
                                elName = splitted[1];
                            else
                                elName = htmlEl.id;

                            const indOfId = elName.indexOf("Id");
                            if (indOfId > -1)
                                elName = elName.slice(0, indOfId);

                            var dataText = htmlEl.getAttribute("data-text");
                            var dataMethod = htmlEl.getAttribute("data-method");
                            var dataAction = htmlEl.getAttribute("data-action");
                            var dataParam = htmlEl.getAttribute("data-param"); // <select data-param="1" 'deki param


                            if (dataText) {
                                var actionName = dataAction + "/" + elName.replace("Table", "");
                                const formName = $(htmlEl).closest("form").attr("name");
                                let selectorId = "[name='" + formName + "'] #" + elName;

                                var thead = `<thead>
                                            <tr class="d-none">
                                                <th id="allCheck" col-role="selection">
                                                    <i class="fas fa-check" style="color: var(--primary);"></i>
                                                </th>
                                                <th col-data="${dataText.substr(0, 1).toLowerCase() + dataText.substr(1)}"></th>
                                            </tr>
                                        </thead>`;

                                if (iTech.DataTable.IsDataTable(htmlEl)) {
                                    $(htmlEl).DataTable().destroy();
                                }

                                if (!$(htmlEl).find("thead").length > 0)
                                    $(htmlEl).append(thead);
                                if (dataParam !== null) {
                                    actionName += "/" + dataParam;
                                }
                                iTech.DataTable.Load.AjaxSourcedSynchronicity(selectorId, dataMethod + "/" + actionName);
                            }
                        }
                    } catch (err) {
                        console.log("%c (!) TableDOLDUR (!) \n", "background: red", err);
                    }
                },
            },
            FillComboManuel: function (selector, config = {}, source, paramData = null, value = null, formMethod = FormMethod.Get, type = true, useToken = true) {
                var htmlEl = $(selector);
                var isFirstOptionEmpty = (htmlEl.attr("data-firstEmpty") != null) ? (htmlEl.attr("data-firstEmpty") == 'true') : false;
                var firstText = (htmlEl.attr("data-firstText") != null) ? htmlEl.attr("data-firstText") : "---";
                var defaultValue = ($(htmlEl).attr("value") != null) ? $(htmlEl).attr("value") : "";
                var isSelect2 = htmlEl.attr("opt-sel2") ?? false
                var tags = htmlEl.attr("opt-tags") ?? false
                var datatext = htmlEl.attr("data-text");
                var datavalue = htmlEl.attr("data-value");
                source = htmlEl.attr("source") ?? source;

                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = source,
                ).then(res => {
                    if (res.isSuccess) {
                        if (isFirstOptionEmpty)
                            htmlEl.append(new Option(firstText, '', selected, selected));
                        for (var l = 0; l < res.value.length; l++) {
                            var selected = false;
                            if (value) {
                                if (value == res.value[l][datavalue])
                                    selected = true;
                            }
                            htmlEl.append(new Option(res.value[l][datatext], res.value[l][datavalue], selected, selected));
                        }
                        if (defaultValue.length) {
                            $(htmlEl).val(defaultValue);
                        }
                        if (isSelect2) {
                            $(htmlEl).select2(config);
                        }
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            },
            FillComboRefresh: function (target) {
                $(target + " option").remove();

                if ($(target).data("type") == "static")
                    iTech.Forms.Helpers.FillCombo.Static(document.querySelector(target));
                else
                    iTech.Forms.Helpers.FillCombo.Dynamic(document.querySelector(target));
            },
            IsDeployment: function () {
                const hostname = window.location.hostname;
                var result = false;
                if (hostname === "localhost" || hostname === "127.0.0.1") {
                    result = true; // true
                }

                return result;
            }
        }
    },
    CustomFormManagement: {
        ComboData: function (selValue, combos, value = null) {
            for (var i = 0; i < combos.length; i++) {
                var combo = combos[0];
                combo.options.length = 0;
                combo.append(new Option("Seçim Yapınız.", ""));
                var controllerList = combo.attributes.veriListe.value.split("|");

                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = controllerList[0] + "/" + controllerList[1] + "/" + selValue,
                    $requestData = data
                ).then(res => {
                    if (res.isSuccess) {
                        for (var l = 0; l < res.value.length; l++) {
                            var selected = false;
                            if (value) {
                                if (value == res.value[l]["id"])
                                    selected = true;
                            }
                            combo.append(new Option(res.value[l][controllerList[2]], res.value[l]["id"], selected, selected));
                        }
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            }
        },
        ComboChanged(e, value = null) {
            var combos = $("select[id^='" + e.id + "_ci" + "']");
            if (combos.length > 0) this.ComboData(e.value, combos, value);
        },
        AddDataCombo: function (id, values, memberName, value) {
            var combo = " <select class='form-control form-control-xs' name='ti_" + id + "' id='ti_" + id + "' onchange=iTech.CustomFormManagement.ComboChanged(this)>";
            combo += "<option selected></option>";

            for (var i = 0; i < values.length; i++) {

                combo += (value == values[i]["id"] || value == String(values[i]["id"]))
                    ? "<option selected value='" + values[i]["id"] + "'>" + values[i][memberName] + "</option>"
                    : "<option value='" + values[i]["id"] + "'>" + values[i][memberName] + "</option>";
            }

            combo += "</select > ";
            combo += "<p asp-validation-for='ti_" + id + "' class='text-danger'></p>";

            return combo;
        },
        AddLabel: function (item) {
            var label = "<label  for='ti_" + item.id + "' class='form-label'>" + item.etiket + "</label>";
            return label;
        },
        AddText: function (item, value) {
            var deger = item.varsayilanDeger;

            if (value) deger = value;
            else if (!deger) deger = "";

            var textItem = " <input required type='text' id='ti_" + item.id + "' class='form-control form-control-xs' placeholder='" + item.tanimlayici + "' name='ti_" + item.id + "' value='" + deger + "' title='" + item.ipucu + "'";
            if (item.maxDeger > 0) textItem += " maxlength ='" + item.maxDeger + "'";

            textItem += " style ='";

            if (item.ozelStil !== "") textItem += item.ozelStil;
            textItem += "'";
            textItem += "  /> <p asp-validation-for='ti_" + item.id + "' class='text-danger'></p>";

            return textItem;
        },
        AddNumber: function (item, value) {
            var deger = item.varsayilanDeger;

            if (value) deger = value;
            var textItem = " <input type='number' id='ti_" + item.id + "' class='form-control form-control-xs'   placeholder='" + item.tanimlayici + "' name='ti_" + item.id + "' value='" + deger + "' title='" + item.ipucu + "'";

            if (item.maxDeger > 0) textItem += " max ='" + item.maxDeger + "'";

            if (item.minDeger) textItem += " min ='" + item.minDeger + "'";

            textItem += " style ='";

            if (item.ozelStil !== "") textItem += item.ozelStil;
            textItem += "'";
            textItem += "  /> <p asp-validation-for='ti_" + item.id + "' class='text-danger'></p>";

            return textItem;
        },
        AddCheck: function (item, value) {
            var deger = item.varsayilanDeger;

            if (value) deger = value;
            var divCheck = " <div class='custom-control custom-switch'>";
            var checkItem = divCheck + "&nbsp;&nbsp;&nbsp;<input type='checkbox' id='ti_" + item.id + "' class='custom-control-input' placeholder='" + item.tanimlayici + "' name='ti_" + item.id + "' value='" + deger + "' title='" + item.ipucu + "'";

            if (deger === "True" || deger === "true" || deger === "1") checkItem += " checked";
            checkItem += ">";
            checkItem += "<label class='custom-control-label' for='ti_" + item.id + "' ></label></div> ";
            checkItem += "<p asp-validation-for='ti_" + item.id + "' class='text-danger'></p>";

            return checkItem;
        },
        AddDate: function (item, value) {

            var deger = item.varsayilanDeger;
            if (value) deger = value;

            let today = new Date().toISOString().slice(0, 10);
            if (item.varsayilanDeger === "today") item.varsayilanDeger = today;

            var dateHtml = " <input type='date' id='ti_" + item.id + "' class='form-control form-control-xs' placeholder='" + item.tanimlayici + "' name='ti_" + item.id + "' value='" + deger + "' title='" + item.ipucu + "'";

            if (item.maxDeger > 0) dateHtml += " max ='" + item.maxDeger + "'";
            if (item.minDeger) dateHtml += " min ='" + item.minDeger + "'";

            dateHtml += " style ='";

            if (item.ozelStil !== "") dateHtml += item.ozelStil;
            dateHtml += "'";
            dateHtml += "  /> ";
            dateHtml += "<p asp-validation-for='ti_" + item.id + "' class='text-danger'></p>";

            return dateHtml;
        },
        AddCombo: function (item, value) {
            var deger = item.varsayilanDeger;
            if (value) deger = value;

            var values = item.veriListe;
            var combo = " <select class='form-control form-control-xs' id='ti_" + item.id + "' placeholder = '" + item.tanimlayici + "' name = 'ti_" + item.id + "'   title = '" + item.ipucu + "'>";
            combo += "<option selected></option>";

            var spl = values.split("|");
            for (var i = 0; i < spl.length; i++) {
                var spltVal = spl[i].split("_");
                var selected = "";
                if (deger[0] === spltVal) selected = "selected";
                combo += "<option value='" + deger[0] + "' " + selected + ">" + deger[1] + "</option>";
            }

            combo += "</select >  ";
            combo += "<p asp-validation-for='ti_" + item.id + "' class='text-danger'></p>";

            return combo;
        },
        GetData: function (item, value) {
            var controllerList = item.veriListe.split("|");

            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = controllerList[0] + "/" + controllerList[1],
                $requestData = data
            ).then(res => {
                if (res.isSuccess) {
                    var combo = this.AddDataCombo(item.id, res.value, controllerList[2], value);
                    return combo;
                }
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });

            return false;
        },
        GetChildData: function (item, value) {

            var combo = " <select  data-parent='ti_" + item.ustId + "' data-type='related' data-value='" + value + "'  class='form-control form-control-xs' name='ti_" + item.id + "_ci_" + item.ustId + "' id='ti_" + item.ustId + "_ci_" + item.id + "' veriListe='" + item.veriListe + "'>";
            combo += "<option selected>Seçim Yapınız.</option>";
            combo += "</select > ";
            combo += "<p asp-validation-for='ti_" + item.ustId + "_ci_" + item.id + "' class='text-danger'></p>";

            return combo;
        },
    },
    Generated: {
        OpenMdl: function (id, formName, methodName) {
            iTech.Helpers.ClearForm($(`form[name='${formName}Form']`));
            $("#" + formName + "Modal").modal("show").on("keyup", function (e) {
                if (e.keyCode == 13) {
                    var methodName = window[formName + "Page"].Variables.SaveMethod;
                    iTech.Generated.Save(formName, methodName);
                }
            });

            if (id != null && id !== "" && id !== _strings.emptyGuid) {
                // Edit
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = methodName + "/" + id
                ).then(res => {
                    if (res.isSuccess) {
                        iTech.Helpers.Map(formName + "Form", res.value);
                        return res;
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            } else {
                // Create
                const idValType = $("form[name='" + formName + "Form'] input[name='Id']").data("id-type");
                if (idValType === "number") {
                    $("form[name='" + formName + "Form'] input[name='Id']").val("0");
                } else {
                    $("form[name='" + formName + "Form'] input[name='Id']").val(_strings.emptyGuid);
                }
            }
        },
        Save: function (formName, methodName) {
            if (!iTech.Helpers.ValidateForm(formName + "Form"))
                return null;
            let inputs = $("form[name='" + formName + "Form']").find("input,select,textarea");
            const data = iTech.Forms.Helpers.SerializeArray(inputs);
            return iTech.Generated.SaveFormData(formName, methodName, data);
        },
        SavePrivate: function (formName, methodName) {
            let inputs = $("form[name='" + formName + "Form']").find("input,select,textarea");
            const data = iTech.Forms.Helpers.SerializeArray(inputs);
            return iTech.Generated.SaveFormData(formName, methodName, data);
        },
        SaveFormData: function (formName, methodName, data) {
            if (data.hasOwnProperty('Id'))
                if (data.Id == "")
                    data.Id = 0;

            iTech.Services.AjaxPromise(FormMethod.Post, methodName, data)
                .then(res => {
                    if (res.isSuccess) {
                        iTech.ShowMessage("İşlem Sonucu", "Kaydetme İşlemi Başarılı");
                        // Eğer Sayfada FormAdıTable varsa tabloyu refresh'ler
                        if ($("table#" + formName + "Table").length)
                            iTech.DataTable.Refresh.Tables("#" + formName + "Table");
                        // Eğer Bu pop-up ise , pop-up'ı kapatır.
                        if ($("#" + formName + "Modal").length)
                            $("#" + formName + "Modal").modal("hide");
                        return res.value;
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
        },
        Delete: async function (id, formName, methodName) {
            const deleteConfirmed = await iTech.UI.AskConfirmation();
            if (!deleteConfirmed)
                return false;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Delete,
                $url = methodName + "/" + id,
            ).then(res => {
                if (res.isSuccess) {
                    iTech.ShowMessage("İşlem Sonucu", "Silme İşlemi Başarılı");
                    // Eğer Sayfada DataTable var ise refreshlenir.
                    if ($("#" + formName + "Table").length)
                        iTech.DataTable.Refresh.Tables("#" + formName + "Table");
                } else
                    iTech.ShowMessage("İşlem Sonucu", "Silme İşlemi Sırasında Hata Meydana Geldi!", "error");
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        ActivePassive: async function (id, formName, methodName) {
            const passiveConfirmed = await iTech.UI.AskConfirmation("Verinin durumunu değiştirmek istediğinize emin misiniz?", "Evet Eminim!", "Hayır, İptal Et.");
            if (!passiveConfirmed)
                return false;

            iTech.Services.AjaxPromise(
                $type = FormMethod.Put,
                $url = methodName + id,
            ).then(result => {
                if (result.isSuccess) {
                    iTech.ShowMessage("İşlem Sonucu", "Veri pasife çekildi");
                    if ($("#" + formName + "Table").length)
                        iTech.DataTable.Refresh.Tables("#" + formName + "Table");
                } else
                    iTech.ShowMessage("İşlem Sonucu", "Pasif'e alma işlemi sırasında hata meydana geldi!", "error");
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        }
    },
    FlatPicker: {
        Init: function (elements, date = null, map = false) {
            $.each(elements, (index, htmlEl) => {

                if ($(htmlEl).attr("data-fixedDate") == "today" && !map)
                    date = new Date();

                if ($(htmlEl).attr("data-mode") == "range")
                    iTech.FlatPicker.Cfg.mode = "range";

                iTech.FlatPicker.Cfg.enableTime = (typeof $(htmlEl).attr("data-enableTime") != typeof undefined) ? $(htmlEl).attr("data-enableTime") : false;
                iTech.FlatPicker.Cfg.static = (typeof $(htmlEl).attr("data-enableTime") != typeof undefined) ? true : false;
                iTech.FlatPicker.Cfg.altFormat = (typeof $(htmlEl).attr("data-enableTime") != typeof undefined) ? "d.m.Y H:i" : "d.m.Y";
                iTech.FlatPicker.Cfg.defaultDate = date;

                flatpickr(htmlEl, iTech.FlatPicker.Cfg);
                date = null;
            });
        },
        OnChange: function (elements, onChangeFunction) {
            if (Array.isArray(elements)) {
                elements.forEach(function (element) {
                    flatpickr(element, Object.assign({}, iTech.FlatPicker.Cfg, {
                        onChange: function (selectedDates, dateStr, instance) {
                            onChangeFunction();
                        }
                    }));
                });
            } else {
                flatpickr(elements, Object.assign({}, iTech.FlatPicker.Cfg, {
                    onChange: function (selectedDates, dateStr, instance) {
                        onChangeFunction();
                    }
                }));
            }
        },
        Cfg: {
            locale: 'tr',
            altInput: true, // kullanıcının göreceği formatı enable eder.
            dateFormat: "Y-m-d H:i", // dbye gönderilecek format,
            allowInput: true,
        }
    },
    SwitchTexts: {
        Init: function (elFrom = undefined) {
            $.each(elFrom ?? switches, (index, htmlEl) => {
                var switchEl = $("#" + htmlEl.id);

                var textElements = switchEl.parent("div").attr("switch-text");
                var textElements = switchEl.parent("div").attr("switch-text");
                if (textElements == undefined) return;
                var texts = textElements.split(":");

                switchEl.next().html((switchEl.prop("checked") ? texts[0] : texts[1]));

                switchEl.change(function (event) {
                    var val = event.target.value;
                    switchEl.next().html(texts[iTech.Convert.BoolToInt(!switchEl.prop("checked"))])
                    switchEl.val(switchEl.prop("checked") ? true : false);
                });
            });
        },
        SetText: function (el, value) {
            $(el).prop("checked", value);
            $(el).trigger("change");
        }
    },
    InputMasks: {
        Init: function () {
            $.each(inputMasks, (index, htmlEl) => {
                $(htmlEl).inputmask();
            });
        }
    },
    Tabs: {
        Init: function () {
            const tabs = tabElement.find("a");
            const initialTabId = $(".tab-pane.active").attr("id");
            const inititalAHref = $("a[href='#" + initialTabId + "']");
            const initialJsPath = inititalAHref.data("js");
            if (tabs.length) {
                // undefined ise bir işlem yapmamaktadır.
                if (typeof initialJsPath != typeof undefined) {
                    // inject js
                    $("#innerJS script").remove();
                    // https
                    const jsPath = `${window.location.protocol}//${window.location.host}/app/pageScripts/${initialJsPath}.js?v=${$.now()}`;
                    //// remote insert
                    $("<script>", { src: jsPath }).appendTo("#innerJS");
                }
            }
            $.each(tabs, (index, htmlEl) => {
                $(htmlEl).on("shown.bs.tab", function (e) {
                    if (typeof $(this).data("js") != typeof undefined) {
                        $("#innerJS script").remove();
                        $("<script>", { src: "//" + appFolder.pageScripts + "/" + $(this).data("js") + ".js?v=" + $.now() }).appendTo("#innerJS");

                    }
                });
            });
        }
    },
    StaticTexts: {
        Init: function () {

        },
        SetText: function (selectElement) {
            var selectId = selectElement.id;
            const selectedVal = $("#" + selectId + _ + "option:selected").eq(0);
            var dataFieldsArr = $(selectElement).data("fields").split(","); // adres,
            $.each(dataFieldsArr, (i, e) => {
                const idKey = e.charAt(0).toUpperCase() + e.substr(1); // ılk Harf Büyük Karaktere çevirilir.
                $("#" + idKey).text(selectedVal.data(e));
            });
        }
    },
    ThemeSettings: {
        Reset: function () {
            localStorage.removeItem("themeSettings");
        }
    },
    Html5: {
        Table: {
            GenerateRows: function (tableName, requestUrl, formMethod = FormMethod.Get, postData) {
                const thead = $(tableName + _ + "thead");
                thead.removeClass("d-none");
                const headings = $(tableName + _ + "thead th").sort(t => t.dataset["col"]);

                iTech.Services.AjaxPromise(
                    $type = formMethod,
                    $url = methodName + "/" + id,
                    $requestData = postData,
                ).then(res => {
                    if (res.isSuccess) {
                        $(tableName).find("tbody").remove();
                        var rowString = `<tbody>`;
                        $.each(res.value, (i, obj) => {
                            (i % 2 == 0) ? rowString += "<tr class='odd'> " : rowString += "<tr class='even'> ";
                            $.each(headings, (i, htmlEl) => {
                                let data = obj[$(htmlEl).data("col")]
                                if (!data) {
                                    data = "";
                                }
                                const tAlign = (typeof $(htmlEl).data("align") == typeof undefined) ? "left" : $(htmlEl).data("align");
                                if ($(htmlEl).data("type") == "date") {
                                    const dateString = iTech.Convert.ToDateString(data);
                                    rowString += "<td class='text-" + tAlign + "'>" + dateString + "</td>";
                                } else if ($(htmlEl).data("type") == "bool") {
                                    rowString += "<td class='text-" + tAlign + "'>";
                                    rowString += (data) ? "<i class='fa fa-check text-success'></i>" : "<i class='fa fa-times text-danger'></i>";
                                    rowString += "</td>";

                                } else {
                                    rowString += "<td class='text-" + tAlign + "'>" + data + "</td>";
                                }
                            });
                            rowString += "</tr>";
                        });
                        rowString += "</tbody>";
                        thead.after(rowString);

                        const showAsDataTable = (typeof $(tableName).attr("mode") !== typeof undefined) ? ($(tableName).attr("mode") == "dt") : false;

                        if (showAsDataTable) {
                            if (iTech.DataTable.IsDataTable(tableName))
                                $(tableName).DataTable().destroy();
                            $(tableName).DataTable({ dom: "" });
                        }

                        return (res.value.length == 0) ? false : true;
                    }
                    else {
                        return false;
                    }
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });
            }
        },
    },
    MatchHeight: {
        Init: function (className) {
            const options = {
                byRow: true,
                property: 'height',
                target: null,
                remove: false
            }
            $('.' + className).matchHeight(options);
        },
        Config: {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        }
    },
    Leaflet: {
        Load: {
            WithMarkerCluster: function (
                divId,
                objArr,
                urlTemplate,
                mapStyleId = "mapbox/streets-v11",
                zoomLvl,
                iconCfg,
                mxZoom = 18,
                mnZoom = 1) {
                var tileLayerSettings = {
                    maxZoom: mxZoom,
                    minZoom: mnZoom,
                    attribution: iTech.Leaflet.Attributions.IsTeknoloji,
                    tileSize: 512,
                    zoomOffset: -1
                };
                // Setting Default urlTemplate
                urlTemplate = (urlTemplate == null) ? iTech.Leaflet.UrlTemplates.OpenStreetMap : urlTemplate;

                // Mapbox requirement
                tileLayerSettings["id"] = (urlTemplate == iTech.Leaflet.UrlTemplates.Mapbox) ? mapStyleId : null;

                // Set default zoom level
                zoomLvl = (zoomLvl == null) ? iTech.Leaflet.Defaults.ZoomLevel : zoomLvl;


                // calculations
                let totalLat = totalLng = avLat = avLng = 0;

                var locationArr = [];

                var mapbox = new L.TileLayer(urlTemplate, tileLayerSettings), latlng = new L.LatLng(39.925533, 32.866287);


                var map = new L.Map(divId, { center: latlng, scrollWheelZoom: false, zoom: 15, layers: [mapbox] });

                var markers = new L.MarkerClusterGroup();
                if (objArr !== null) {
                    $.each(objArr,
                        function (key, value) {
                            let iconName;
                            (value.isActive !== false) ? iconName = value.objectType : iconName = 'Error';
                            //const iconURL = `//${appFolder.images}/leaflet/${value.objectType}/${value.isActive}.png`;
                            if (value.lat == null || value.lng == null)
                                return;
                            totalLat += value.lat;
                            totalLng += value.lng;
                            female = ` <i class="fas fa-venus" style='color:pink'></i> Kız Sayısı: ${value.female}`;
                            male = `<i class="fas fa-mars" style='color:blue'></i> Erkek Sayısı: ${value.male}`;
                            var marker = new L.marker(
                                [value.lat, value.lng], {
                                icon: L.BeautifyIcon.icon(iTech.Leaflet.Defaults.IconSettings[iconName]),
                            }).bindPopup(`<a href='../AdminManagement/Dorm?id=${value.id}'>${value.popupDescription}</a>
                                            <p>
                                            ${value.dormTypeId == 10 ? female :
                                    value.dormTypeId == 20 ? male : `${male} <br/> ${female} <br/> Toplam: ${value.female + value.male}`}
                                            </p>`);
                            markers.addLayer(marker);
                        });
                    avLat = totalLat / objArr.length;
                    avLng = totalLng / objArr.length;
                    locationArr = [avLat, avLng];
                } else {
                    locationArr = iTech.Leaflet.Constants.Coords.Turkey;
                }

                map.addLayer(markers);

                // harita ortalanmış bir şekilde oluşturuluyor.
                map.setView(locationArr, zoomLvl);

                var isZoom = map.options.scrollWheelZoom;
                map.on('dblclick', function () {
                    if (!isZoom) {
                        isZoom = true;
                        map.scrollWheelZoom.enable();
                    } else {
                        isZoom = false;
                        map.scrollWheelZoom.disable();
                    }
                });

                return map;
            },
            WithCoords: function (
                divId,
                coordinatesArr,
                urlTemplate,
                mapStyleId = "mapbox/streets-v11",
                zoomLvl,
                iconCfg,
                mxZoom = 17,
                mnZoom = 1) {
                if (coordinatesArr == null || (coordinatesArr[0] == '' && coordinatesArr[1] == '')) {
                    coordinatesArr = iTech.Leaflet.Constants.Coords.Ankara;
                }

                var map = L.map(divId.substring(1)).setView(coordinatesArr, 12);

                var tileLayerSettings = {
                    maxZoom: mxZoom,
                    minZoom: mnZoom,
                    attribution: iTech.Leaflet.Attributions.IsTeknoloji,
                    tileSize: 512,
                    zoomOffset: -1
                };

                // Setting Default urlTemplate
                urlTemplate = (urlTemplate == null) ? iTech.Leaflet.UrlTemplates.OpenStreetMap : urlTemplate;

                // Mapbox requirement

                tileLayerSettings["id"] = (urlTemplate == iTech.Leaflet.UrlTemplates.Mapbox) ? mapStyleId : null;

                // Set default zoom level
                zoomLvl = (zoomLvl == null) ? iTech.Leaflet.Defaults.ZoomLevel : zoomLvl;

                // IconSettings if null
                const LeafIcon = (iconCfg == null) ? L.Icon.extend(iTech.Leaflet.Defaults.IconSettings) : L.Icon.extend(iconCfg);

                // Adding TileLayer
                L.tileLayer(urlTemplate, tileLayerSettings).addTo(map);

                marker = L.marker(
                    coordinatesArr,
                    {
                        icon: L.BeautifyIcon.icon(iTech.Leaflet.Defaults.IconSettings["Yurt"]),
                    }).addTo(map);

                map.on("move", (e) => {
                    const coordinatesArr = map.getCenter();
                    $("input#lat").val(coordinatesArr.lat.toFixed(6));
                    $("input#lng").val(coordinatesArr.lng.toFixed(6));
                    marker.setLatLng(coordinatesArr);
                });

                return map;
            }
        },
        Mapbox: {
            Styles: {
                Dark: "mapbox/dark-v10",
                Light: "mapbox/light-v9",
                Street: "mapbox/streets-v11",
                Outdoors: "mapbox/outdoors-v11",
                Satellite: "mapbox/satellite-streets-v11"
            }
        },
        Attributions: {
            IsTeknoloji: `&copy; <a target=Blank href="http://www.isteknoloji.com.tr">İş Teknoloji A.Ş</a> `,
            OpenStreetMap: `Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
                    Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`
        },
        UrlTemplates: {
            Mapbox: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            OpenStreetMap: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            OpenCycleMap: "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
            WmfLabs: "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
            Stamen: "http://tile.stamen.com/terrain/{z}/{x}/{y}.png",
            OpenTopoMap: "https://tile.opentopomap.org/{z}/{x}/{y}.png"
        },
        Constants: {
            Coords: {
                Adana: [37, 35.325],
                Ankara: [39.925533, 32.866287],
                Bursa: [40.1833, 29.0667],
                Istanbul: [41.015137, 28.979530],
                Izmir: [38.423733, 27.142826],
                Turkey: [38.987363, 35.100318]
            }
        },
        Defaults: {
            IconSettings: {
                Yurt: {
                    icon: 'fas fa-hotel',
                    iconShape: 'marker',
                    borderColor: '#2198F3',
                    textColor: '#00ABDC',
                },
                Error: {
                    icon: 'sync',
                    iconShape: 'marker',
                    spin: 'true',
                    borderColor: '#FC1349',
                    textColor: '#fff',
                    backgroundColor: '#FC1349'
                },
            },
            ZoomLevel: 5.5
        }
    },
};


var IT = Object.assign({}, iTech);

IT.Ajax = iTech.Services.AjaxPromise;
IT.DataTable = iTech.DataTable.Load.AjaxSourced;
IT.ClearForm = iTech.Helpers.ClearForm;
IT.Map = iTech.Helpers.Map;
IT.ComboRefresh = iTech.Forms.Helpers.FillComboRefresh;