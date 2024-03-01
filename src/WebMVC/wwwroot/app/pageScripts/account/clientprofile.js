const ClientProfilePage = {
    Init: function () {
        var localStorageData = localStorage.getItem("ITManagement.UserInfo");
        //var storedUserInfo = localStorage.getItem("eDevletUserInfo");
        //var eDevletUserInfo = null;
        //if (storedUserInfo) {
        //    eDevletUserInfo = JSON.parse(storedUserInfo);
        //    ClientProfilePage.Variables.isCustody = eDevletUserInfo.isCustody;
        //};

        ClientProfilePage.Components.ListCheckers();

        function getAndUpdateEDevletUserInfo() {
            var storedUserInfo = localStorage.getItem("eDevletUserInfo");
            var eDevletUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};

            var citizenNoFromUrl = iTech.Helpers.GetUrlParameter("tc");
            if (citizenNoFromUrl) {
                eDevletUserInfo.citizenNumber = parseInt(citizenNoFromUrl);
                eDevletUserInfo.fullName = "Deneme Client";
                localStorage.setItem("eDevletUserInfo", JSON.stringify(eDevletUserInfo));
            }

            return eDevletUserInfo;
        }

        function checkAndShowCustodyModal(eDevletUserInfo) {
            if (eDevletUserInfo && eDevletUserInfo.isCustody) {
                $('#custodyModal').modal({
                    backdrop: 'static',
                    keyboard: false,
                }).css({ backgroundColor: "rgba(100,100,100,.75)" }).modal("show");
            }
        }

        var eDevletUserInfo = getAndUpdateEDevletUserInfo();
        if (eDevletUserInfo && eDevletUserInfo.citizenNumber && eDevletUserInfo.fullName) {
            ClientProfilePage.Variables.isCustody = eDevletUserInfo.isCustody;
            ClientProfilePage.Variables.eDevletUserInfo = eDevletUserInfo; // eDevletUserInfo'yu ClientProfilePage içine aktarma
            checkAndShowCustodyModal(eDevletUserInfo);
        } else {
            //iTech.User.Logout();
        }

        //if (ClientProfilePage.Variables.isCustody) {
        //    $('#custodyModal').modal({
        //        backdrop: 'static',
        //        keyboard: false,
        //    }).css({ backgroundColor: "rgba(100,100,100,.75)" }).modal("show");
        //}

        //if (localStorageData != null) {
        //    var citizenNo = iTech.Helpers.GetUrlParameter("tc");
        //    if (citizenNo) {
        //        localStorage.setItem("citizenNo", JSON.stringify(parseInt(citizenNo)));
        //        localStorage.setItem("fullName", JSON.stringify("ABC"));
        //    }
        //} else if (eDevletUserInfo.citizenNo == null) {
        //    var citizenNo = iTech.Helpers.GetUrlParameter("tc");
        //    if (citizenNo) {
        //        localStorage.setItem("citizenNo", JSON.stringify(parseInt(citizenNo)));
        //        localStorage.setItem("fullName", JSON.stringify("ABC"));
        //    } else
        //        iTech.User.Logout();
        //}

        ClientProfilePage.Variables.FormName = "ClientProfile";
        ClientProfilePage.Variables.TableName = "#" + ClientProfilePage.Variables.FormName + "Table";
        ClientProfilePage.Variables.GetMethod = ClientProfilePage.Variables.FormName + "s";
        ClientProfilePage.Variables.SaveMethod = ClientProfilePage.Variables.FormName + "s";
        ClientProfilePage.Variables.DeleteMethod = ClientProfilePage.Variables.FormName + "s";
        ClientProfilePage.Variables.LoadTableMethod = "ClientProfiles/Load";
        ClientProfilePage.AddEventHandlers();
        ClientProfilePage.Variables.UrlParam = iTech.Helpers.GetUrlParameter("p");
        if (ClientProfilePage.Variables.UrlParam !== "10") {
            $(".flatpickr").attr("disabled", true);
            $(".dormClass").empty().append(`<label class="form-label">Yurt</label><span id="DormIdName" name="DormIdName" class="form-control form-control-xs"></span>`);
            $(".genderClass").empty().append(`<label class="form-label">Cinsiyet</label><span id="GenderIdName" name="GenderIdName" class="form-control form-control-xs"></span>`);
            $(".birthPlaceClass").empty().append(`<label class="form-label">Doğum Yeri</label><span id="BirthPlace" name="BirthPlace" class="form-control form-control-xs"></span>`);
            $(".pastRequestStatus").show(200);
            $(".backBtn").show(200);


            setTimeout(function () {
                ClientProfilePage.Helpers.GetClientProfile();
            }, 300);
            $(".btnSave").show(100);
        }
        else {
            //ClientProfilePage.Helpers.BlockComponent(".clientDataClass");
            $(".clientProfile").remove();
            $(".approveButtonsHeader").show(200);
            $(".approveButtons").show(200);
            //ClientProfilePage.Helpers.CreateNewClientProfile();
        }


    },
    AddEventHandlers: function () {
        //$(".modal-footer").on("click", "button[data-role='save']", ClientProfilePage.Helpers.Save);
        $("table#ClientProfileTable").on("click", "button[data-ClientProfile='delete']", ClientProfilePage.Helpers.Delete);
        $("table#ClientProfileTable").on("click", "button[data-ClientProfile='edit']", ClientProfilePage.Helpers.OpenMdl);
        $("div#ClientProfileTable_wrapper").on("click", "button[name='create']", ClientProfilePage.Helpers.OpenMdl);
        $('form[name="ClientProfileForm"]').on("click", "button[data-role='save']", ClientProfilePage.Helpers.Save);
        $('#custodyClientTcNoButton').on("click", ClientProfilePage.Helpers.SaveCustodyClientTcNoButton);

        $("#checkApprove").on("change", function () {
            if ($("#checkApprove").is(":checked")) {
                ClientProfilePage.Variables.CheckApprove = true;
                ClientProfilePage.Helpers.AllOk();
            } else {
                ClientProfilePage.Variables.CheckApprove = false;
                ClientProfilePage.Helpers.AllOk();
            }
        });
        $("#ExplicitConsentTextApproval").on("change", function () {
            if ($("#ExplicitConsentTextApproval").is(":checked")) {
                ClientProfilePage.Variables.ExplicitConsentTextApproval = true;
                ClientProfilePage.Helpers.AllOk();
            } else {
                ClientProfilePage.Variables.ExplicitConsentTextApproval = false;
                ClientProfilePage.Helpers.AllOk();
            }
        });
        $("#ConsentToDataProcessing").on("change", function () {
            if ($("#ConsentToDataProcessing").is(":checked")) {
                ClientProfilePage.Variables.ConsentToDataProcessing = true;
                ClientProfilePage.Helpers.AllOk();
            } else {
                ClientProfilePage.Variables.ConsentToDataProcessing = false;
                ClientProfilePage.Helpers.AllOk();
            }
        });

        $("#DormId").on("change", function () {
            if ($("#DormId").val() != '') {
                ClientProfilePage.Helpers.AllOk();
            } else {
                iTech.ShowMessage("Uyarı!", "Lütfen Yurt seçimi yapınız!", "warning");
            }
        });

        document.addEventListener('DOMContentLoaded', function () {
            // KVKK ve AÇIK RIZA Beyanı bağlantılarını seç
            var kvkkLink = document.getElementById('1');
            var consentLink = document.getElementById('2');

            // Orta fare tuşu tıklamasını engelleyen fonksiyon
            function disableMiddleClick(event) {
                // Eğer tıklama orta fare tuşuyla yapıldıysa
                if (event.button === 1) {
                    event.preventDefault();
                }
            }

            // Her iki bağlantı için olay dinleyicileri ekle
            kvkkLink.addEventListener('mousedown', disableMiddleClick);
            consentLink.addEventListener('mousedown', disableMiddleClick);
        });



        $("#approvedBtn").on("click", () => {
            var input = $("input[alt='" + ClientProfilePage.Variables.KvkkName + "']");
            if (input.length > 0) {
                input.removeAttr("disabled");
            }
            $("#pdfModal").modal("hide");
        });
    },
    Components: {
        //IT.DataTable(ClientProfilePage.Variables.TableName, ClientProfilePage.Variables.LoadTableMethod).then((table) => {
        //    table.one("draw.dt", ClientProfilePage.AddEventHandlers);
        //});
        ListCheckers: function () {
            iTech.Services.AjaxPromise(FormMethod.Get, "Other/GetAll/QaInfo/70")
                .then((res) => {
                    if (res.isSuccess) {
                        $.each(res.value, (i, v) => {
                            var content = `<div class="custom-control custom-switch mt-1 ml-2" onClick="ClientProfilePage.Helpers.ControlIsDisabled('${v.order}_checkbox')">
                                                <input type="checkbox" class="custom-control-input" id="${v.order}_checkbox" disabled alt="${v.question}">
                                                <label class="custom-control-label d-block" for="${v.order}_checkbox">
                                                    <span class="d-inline-block">
                                                        ${v.question} <span class="text-danger font-weight-bold">okudum, onaylıyorum.</span>
                                                        <a id="${v.order}" onClick="ClientProfilePage.Helpers.OpenMdl(${v.id})" class="text-info" style="text-decoration: none; font-weight: 400;">(${v.question})</a>
                                                    </span>
                                                </label>
                                            </div>`;
                            $("#forms").append(content);
                        });
                    }
                });
        },
    },
    Helpers: {
        ControlIsDisabled: function (inputId) {
            var input = $("#" + inputId);
            if (input.attr("disabled"))
                iTech.ShowMessage("Uyarı!", "Lütfen Formları Okuyunuz.", "warning");
        },
        GetForm: function (id) {
            iTech.Services.AjaxPromise(FormMethod.Get, `Other/GetBase64String/${id}`)
                .then(res => {
                    if (res.isSuccess) {
                        $("#pdfName").text(res.value.name);

                        let totalPageCount = 0;
                        const mimeType = res.value.mimeType;
                        const base64Data = res.value.base64Content;

                        var pdfData = atob(base64Data);
                        var pdfDoc = null,
                            pageNum = 1,
                            pageRendering = false,
                            pageNumPending = null,
                            scale = 1.5,
                            canvas = document.getElementById('the-canvas'),
                            ctx = canvas.getContext('2d');

                        function renderPage(num) {

                            pageRendering = true;
                            pdfDoc.getPage(num).then(function (page) {
                                $('.modal-body').animate({ scrollTop: 0 }, 'fast', function () {
                                });
                                if (num == totalPageCount) {
                                    $("#nextPdf").hide(100);
                                    $("#prevPdf").show(100);
                                    $("#approvedBtn").removeClass("disabled");
                                    ClientProfilePage.Variables.KvkkName = res.value.name;
                                }
                                else if (num != 1) {
                                    $("#prevPdf").show(100);
                                    $("#nextPdf").show(100);
                                    $("#approvedBtn").addClass("disabled");
                                } else if (num == 1) {
                                    $("#prevPdf").hide(100);
                                    $("#nextPdf").show(100);
                                    $("#approvedBtn").addClass("disabled");
                                }
                                var viewport = page.getViewport({ scale: scale });
                                canvas.height = viewport.height;
                                canvas.width = viewport.width;
                                var renderContext = {
                                    canvasContext: ctx,
                                    viewport: viewport
                                };
                                var renderTask = page.render(renderContext);
                                renderTask.promise.then(function () {
                                    pageRendering = false;
                                    if (pageNumPending !== null) {
                                        renderPage(pageNumPending);
                                        pageNumPending = null;
                                    }
                                });
                            });
                            document.getElementById('page_num').textContent = num;
                        }
                        function queueRenderPage(num) {
                            if (pageRendering) {
                                pageNumPending = num;
                            } else {
                                renderPage(num);
                            }
                        }

                        function onPrevPage(event) {
                            event.preventDefault();
                            if (pageNum <= 1) {
                                return;
                            }
                            pageNum--;
                            queueRenderPage(pageNum);
                        }
                        document.getElementById('prevPdf').addEventListener('click', onPrevPage);
                        function onNextPage(event) {
                            event.preventDefault();
                            if (pageNum >= pdfDoc.numPages) {
                                return;
                            }
                            pageNum++;
                            queueRenderPage(pageNum);
                        }
                        document.getElementById('nextPdf').addEventListener('click', onNextPage);
                        pdfjsLib.getDocument({ data: pdfData }).promise.then(function (pdfDoc_) {
                            pdfDoc = pdfDoc_;
                            totalPageCount = pdfDoc.numPages; // Toplam sayfa sayısını değişkene atayın
                            document.getElementById('page_count').textContent = totalPageCount;
                            renderPage(pageNum);
                        });

                    } else {
                        console.error("Sunucudan veri alınamadı.");
                    }
                })
                .catch(error => {
                    console.log("error:", error)
                });
        },
        BlockComponent: function (el) {
            $(el).block({
                message: `<div class="spinner-border" role="status" style="z-index: 9999;position: absolute;top: 50%;left: 50%;color: black;"></div>`,
                css: { border: '5' }
            });
        },
        AllOk: function () {
            var IsLaw = $("input[alt='KVKK Açık Rıza Onay Formu']").is(':checked');
            var ExplicitConsent = $("input[alt='KVKK Aydınlatma Metni']").is(':checked');
            debugger;
            if (IsLaw === true && ExplicitConsent === true && $("#DormId").val() != '') {
                ClientProfilePage.Helpers.CreateNewClientProfile();
                //$(".clientDataClass").unblock();
                //$(".btnSave").show(200);
            }
            else {
                //ClientProfilePage.Helpers.BlockComponent(".clientDataClass");
                iTech.Helpers.ClearForm($(`form[name='${ClientProfilePage.Variables.FormName}Form']`));
                $(".btnSave").hide(200);
                return false;
            }
        },


        //ChangeHistory: async function () {
        //    $('#HideHistory').change(() => {
        //        if ($('#HideHistory').is(':checked'))
        //            $(".HideHistoryClass").addClass('text-danger').removeClass('text-success').html(' Görünmesin! (Şuan aktif randevular hariç!)');
        //        else
        //            $(".HideHistoryClass").addClass('text-success').removeClass('text-danger').html(' Görünsün! (Şuan aktif randevular hariç!)');
        //    });

        //    $('#HideAll').change(() => {
        //        if ($('#HideAll').is(':checked'))
        //            $(".HideAllClass").addClass('text-danger').removeClass('text-success').html(' Görünmesin! (Şuan aktif randevular dahil!)');
        //        else
        //            $(".HideAllClass").addClass('text-success').removeClass('text-danger').html(' Görünsün! (Şuan aktif randevular dahil!)');
        //    });
        //},
        capitalizeFirstLetter: function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        },
        CreateNewClientProfile: async function () {
            var titleHrefEl = $(".page-logo-link").get(0);
            $(titleHrefEl).attr('href', '/');

            ClientProfilePage.Variables.eDevletUserInfo.citizenNumber = ClientProfilePage.Variables.eDevletUserInfo.citizenNumber.toString();
            //localStorage.setItem('eDevletUserInfo', JSON.stringify($("#DormId").val()));
            ClientProfilePage.Variables.eDevletUserInfo.dormServiceCode = $("#DormId").val();
            $("#hdnDormId").val($("#DormId").val());
            iTech.Services.AjaxPromise(FormMethod.Post, `Account/GetNewClientData`, ClientProfilePage.Variables.eDevletUserInfo, ContentTypes.FromForm, false)
                .then((res) => {
                    if (res.isSuccess && res.value != null) {
                        if (res.value.birthDate == "0001-01-01T00:00:00")
                            res.value.birthDate = "";

                        iTech.Helpers.Map("ClientProfileForm", res.value);
                        if (!ClientProfilePage.Variables.isCustody) {
                            $("#Name").prop("disabled", true);
                            $("#Surname").prop("disabled", true);
                            if (res.value.email != null && res.value.email != '')
                                $("#Email").prop("disabled", true);
                        } else {
                            $("#Name").prop("disabled", false);
                            $("#Surname").prop("disabled", false);
                        }

                        $("#DormBlockIdName").val(res.value.dormBlockIdName);
                        $("#DormBlockIdName").prop("disabled", true);


                        $("#CitizenNo").prop("disabled", true);
                        if (res.value.genderId != 0)
                            $("#GenderId").prop("disabled", true);
                        if (res.value.gsmNumber != null && res.value.gsmNumber != '' && !ClientProfilePage.Variables.isCustody) {
                            $("#GsmNumber").prop("disabled", true);
                        }
                        $(".flatpickr").attr("disabled", true);
                        //$("#BirthDate")[0]._flatpickr.clear();
                        $(".btnSave").show(200);

                    } else {
                        debugger;
                        localStorage.removeItem("eDevletUserInfo");
                        localStorage.setItem("hataMesaji", JSON.stringify(res.message));
                        window.location.href = `/`;
                    }
                }).catch(res => {
                    $(".btnSave").hide(200);
                    iTech.ShowMessage("Uyarı!", res.message.responseJSON.detail.split("*")[1], "warning");
                    console.log("res", res);
                });

        },
        OpenMdl: function (id) {
            $("#pdfModal").modal("show");
            ClientProfilePage.Helpers.GetForm(id);
        },
        SaveCustodyClientTcNoButton: function () {
            const custodyClientTcNo = $("#custodyClientTcNo").val();
            if (!custodyClientTcNo || custodyClientTcNo.length !== 11) {
                iTech.ShowMessage("Uyarı!", "T.C. Kimlik No eksik veya hatalı!", "warning");
                return false;
            }
            ClientProfilePage.Variables.custodyClientTcNo = ClientProfilePage.Variables.eDevletUserInfo.custodyCitizenNo;
            ClientProfilePage.Variables.eDevletUserInfo.custodyCitizenNo = custodyClientTcNo;
            $('#custodyModal').modal('hide');
        },
        Save: async function () {
            ClientProfilePage.Helpers.BlockComponent("body");
            //iTech.Generated.Save(ClientProfilePage.Variables.FormName, ClientProfilePage.Variables.SaveMethod);
            if (!iTech.Helpers.ValidateForm("ClientProfileForm")) {
                $("body").unblock();
                return false;
            }
            var email = $("#Email").val();
            //var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            //if (!emailPattern.test(email)) {
            //    iTech.ShowMessage("Uyarı!", "Lütfen geçerli bir mail adresi girin.", "warning");
            //    $("body").unblock();
            //    return false;
            //}
            $("#DormId").prop("disabled", false);
            var inputs = $("form[name='ClientProfileForm']").find("input,select,textarea").filter(function () {
                return !$(this).attr("disabled");
            });

            var data = iTech.Forms.Helpers.SerializeArray(inputs);
            data["CitizenNo"] = $("#CitizenNo").val();
            data["Name"] = $("#Name").val();
            data["Surname"] = $("#Surname").val();
            data["Email"] = $("#Email").val();
            data["GsmNumber"] = $("#GsmNumber").val();
            data["GenderId"] = $("#GenderId").val();
            data["Token"] = ClientProfilePage.Variables.eDevletUserInfo != undefined ? ClientProfilePage.Variables.eDevletUserInfo.token : null;
            data["BirthDate"] = $("#BirthDate").val();

            data["DormBlockId"] = $("#hdnDormBlockId").val();
            data["DormBlockCode"] = $("#hdnDormBlockCode").val();

            if (ClientProfilePage.Variables.isCustody)
                data["CustodyCitizenNo"] = ClientProfilePage.Variables.custodyClientTcNo;

            if (ClientProfilePage.Variables.UrlParam !== "10")
                await iTech.Services.AjaxPromise(FormMethod.Post, `AdminManagement/SaveClientProfile`, data)
                    .then((result) => {
                        iTech.ShowMessage("Kaydedildi!", "Hesap bilgileri başarıyla kaydedildi.", "success");
                        $("body").unblock();
                    }).catch(result => {
                        iTech.ShowMessage("Hata!", "Hesap bilgileri kaydedilirken hata oluştu.<br> Sorun devam ederse yönetinicinize başvurunuz.", "error");
                        console.log("result", result);
                    });
            else {
                //if (ClientProfilePage.Variables.CheckApprove != true
                //    && ClientProfilePage.Variables.ExplicitConsentTextApproval != true) {
                //    iTech.ShowMessage("Uyarı!", "Lütfen onay kutucuklarını işaretleyin.", "warning");
                //    return false;
                //}

                await iTech.Services.AjaxPromise(FormMethod.Post, `Other/SaveClientProfile`, data, ContentTypes.FromForm, false)
                    .then((result) => {

                        //iTech.Helpers.Map("ClientProfileForm", result.data);
                        iTech.ShowMessage("Kaydedildi!", "Hesap bilgileri başarıyla kaydedildi.", "success");
                        //setTimeout(async function (result) {
                        localStorage.removeItem("citizenNo");
                        localStorage.removeItem("fullName");
                        localStorage.removeItem("eDevletUserInfo");
                        $('#LoginFormEmail').val(result.data.email);
                        $('#LoginFormCitizenNo').val(result.data.citizenNo);
                        $('#LoginForm').submit();
                        $("body").unblock();

                    }).catch(result => {
                        iTech.ShowMessage("Hata!", "Hesap bilgileri kaydedilirken hata oluştu.<br> Sorun devam ederse yönetinicinize başvurunuz.", "error");
                        console.log("result", result);
                    });
            }
            $("body").unblock();
        },
        Delete: async function () {
            const id = $(this).data("id");
            iTech.Generated.Delete(id, ClientProfilePage.Variables.FormName, ClientProfilePage.Variables.DeleteMethod);
        },
        GetClientProfile: async function () {
            const id = $(this).data("id");
            iTech.Helpers.ClearForm($("form[name='ClientProfileForm']"));
            await iTech.Services.AjaxPromise(FormMethod.Get, `AdminManagement/GetClientProfile/${iTech.lclStr.get("ITManagement.UserInfo").clientId}`)
                .then((result) => {
                    //var hideHistory = result.data.hideHistory;
                    //var hideAll = result.data.hideAll;

                    //var requestStatusHtml = `<div class="custom-control custom-switch mt-3 d-flex align-items-center justify-content-between pastAppointmentDiv">
                    //                            <input type="checkbox" class="custom-control-input" id="HideHistory" name="HideHistory">
                    //                            <label class="custom-control-label " for="HideHistory">
                    //                                Geçmiş Randevularım<span class="${hideHistory ? 'text-danger' : 'text-success'} font-weight-bold HideHistoryClass">&nbsp;${hideHistory ? 'Görünmesin!' : 'Görünsün!' } (Şuan aktif randevular hariç!)&nbsp; </span>
                    //                            </label>
                    //                        </div>
                    //                        <div class="custom-control custom-switch mt-2 d-flex align-items-center justify-content-between allAppointmentDiv">
                    //                            <input type="checkbox" class="custom-control-input" id="HideAll" name="HideAll">
                    //                            <label class="custom-control-label " for="HideAll">
                    //                                Tüm Randevularım<span class="${hideAll ? 'text-danger' : 'text-success'} font-weight-bold HideAllClass">&nbsp; ${hideAll ? 'Görünmesin!' : 'Görünsün!' } (Şuan aktif randevular dahil!)&nbsp;</span>
                    //                            </label>
                    //                        </div>`
                    //$(".pastRequestStatus").append(requestStatusHtml);

                    //ClientProfilePage.Helpers.ChangeHistory();

                    if (result.data.birthDate != null) {
                        var jsTarih = new Date(result.data.birthDate);
                        // Tarihi dd/mm/yyyy formatına çevirme
                        var gun = jsTarih.getDate();
                        var ay = jsTarih.getMonth() + 1;
                        var yil = jsTarih.getFullYear();
                        //result.data.birthDate = gun + '/' + ay + '/' + yil;
                    }
                    iTech.Helpers.Map("ClientProfileForm", result.data);
                }).catch(result => {
                    iTech.ShowMessage("Hata!", "Hesap bilgileri getirilirken hata oluştu.<br> Sorun devam ederse yönetinicinize başvurunuz.", "error");
                    console.log("result", result);
                });
        },
    },
    Variables: {
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null,
        UrlParam: null,
        UrlParamNo: null,
        CheckApprove: false,
        ExplicitConsentTextApproval: false,
        ConsentToDataProcessing: false,
        isCustody: false,
        custodyClientTcNo: null,
        KvkkName: null,
        IsLaw: false,
        ExplicitConsentText: false,
    }
}
$(ClientProfilePage.Init);