const LoginPage = {
    Init: function () {
        LoginPage.Helpers.Canvas();
        LoginPage.AddEventHandlers();
        LoginPage.Component();
        //LoginPage.Helpers.Announce();
        LoginPage.Helpers.MaterialModule();
        //if (localStorage.getItem("HRManagement.UserInfo") !== null) {
        //     window.location.href = "/Home/Dashboard";

        //}
        if (localStorage.getItem("hataMesaji") !== null) {
            var mesaj = localStorage.getItem("hataMesaji");
            iTech.ShowMessage("Hata!", mesaj, "error");
            localStorage.removeItem("hataMesaji");
        }
        if (localStorage.getItem("message") !== null) {
            var message = localStorage.getItem("message");
            iTech.ShowMessage("Hata!", message, "error");
            localStorage.removeItem("message");
        }

    },
    AddEventHandlers: function () {
        document.getElementById('LoginForm').addEventListener('submit', function (e) {
            var loginBtn = document.getElementById('loginBtn');
            loginBtn.innerHTML = '<div class="spinner"></div>';
            loginBtn.disabled = true;
        });

        $(".openMapModal").on("click", () => {
            $("#MapModal").modal("show");
        })
        $("#email, #password").keyup(function (event) {
            if (event.keyCode === 13 || event.key === 'Enter') {
                $("#loginBtn").click();
            }
        });
        $(".closeLoginSection").on("click", () => {
            $("#loginSection").fadeOut(100, function () {
            });
            $("#cardSection").removeClass("col-lg-4 col-md-6 loginOpen");
            $("#cardSection").addClass("col-lg-12 col-md-12 loginClose");
        });
        $(".openLoginSection").on("click", () => {
            $("#loginSection").fadeIn(300, function () {
            });
            $("#cardSection").removeClass("col-lg-12 col-md-12 loginClose");
            $("#cardSection").addClass("col-lg-8 col-md-6 loginOpen");

        });

        $(".sssBtn").on("click", () => {
            window.location.href = `Other/SSS`;
        });
    },
    Component: function () {
        const names = ["KurumAdres", "KurumEposta", "KurumTelefon", "KurumMapLink"];

        iTech.Services.AjaxPromise(
            $type = FormMethod.Post,
            $url = "Guest/GetByNameList",
            $requestData = names,
            $contentType = ContentTypes.FromBody,
            $useToken = false,
        ).then(res => {
            if (res.isSuccess) {
                $.each(res.value, function (index, item) {
                    var elementId = item.ad;
                    var value = item.deger;
                    if (elementId == "KurumMapLink")
                        $('#' + elementId).attr("src", value);
                    else if (elementId == "KurumTelefon") {
                        $('#' + elementId).html(value);
                        $('#' + elementId).attr("href", "tel:" + value);
                    }
                    else if (elementId == "KurumEposta") {
                        $('#' + elementId).html(value);
                        $('#' + elementId).attr("href", "mailto:" + value);
                    }
                    else
                        $('#' + elementId).html(value);
                });
            } else {
                iTech.ShowMessage("Hata", "Veri Gelmedi", "error");
                LoginPage.Variables.PageToken = "";
            }
        }).catch(res => {
            LoginPage.Variables.PageToken = "";
            if (res.message.responseText)
                iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
            else
                iTech.ShowMessage("Hatalı İşlem", res.message, "error");
        });

    },
    EDAuth: {
        RedirectForLogin: function (State, Scope) {
            window.location = LoginPage.Variables.EDConfiguration.AuthURL
                + "?response_type=code&client_id=" + LoginPage.Variables.EDConfiguration.ClientId + "&state=" + State + "&scope=" +
                Scope + "&redirect_uri=" + LoginPage.Variables.EDConfiguration.RedirectUri;
        },
        GetResponseAuthCode: function () {
            try {
                var error = LoginPage.EDAuth.GetUrlParameter("error");
                if (error == "") {
                    LoginPage.Variables.EDAuthFunctionResult.Success = true;
                    LoginPage.Variables.EDAuthFunctionResult.AuthorizationCode = LoginPage.EDAuth.GetUrlParameter("code");
                } else {
                    LoginPage.Variables.EDAuthFunctionResult.Success = false;
                    LoginPage.Variables.EDAuthFunctionResult.ErrorMessage = LoginPage.EDAuth.GetUrlParameter("error_description");
                }
            }
            catch (ex) {

            }
            return LoginPage.Variables.EDAuthFunctionResult;
        },
        GetUrlParameter: function (sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        }
    },
    EDToken: {
        GetAccessToken: function (AuthorizationCode) {
            $.ajax({
                url: LoginPage.Variables.EDConfiguration.TokenURL + "?grant_type=authorization_code&client_id=" + LoginPage.Variables.EDConfiguration.ClientId + "&client_secret=" + LoginPage.Variables.EDConfiguration.ClientSecret + "&code=" + AuthorizationCode + "&redirect_uri=" + LoginPage.Variables.EDConfiguration.RedirectUri,
                method: "POST",
                async: false,
                success: function (data) {
                    if (data.access_token != undefined) {
                        LoginPage.Variables.EDFunctionResult.Success = true;
                        LoginPage.Variables.EDFunctionResult.AccessToken = data.access_token;
                    }
                    else {
                        LoginPage.Variables.EDFunctionResult.Success = false;
                        LoginPage.Variables.EDFunctionResult.ErrorMessage = data.error_description
                    }
                    return LoginPage.Variables.EDFunctionResult;
                }
            });
        }
    },
    EDFunctions: {
        GetPersonInfo: function (AccessToken) {
            $.ajax({
                url: LoginPage.Variables.EDConfiguration.TokenURL + "?accessToken=" + AccessToken + "&resourceId=1&kapsam=Ad-Soyad&clientId=" + LoginPage.Variables.EDConfiguration.ClientId,
                method: "POST",
                async: false,
                success: function (data) {
                    if (data.sonucKodu == "EDV09.000") {
                        LoginPage.Variables.EDPersonInfo.Success = true;
                        LoginPage.Variables.EDPersonInfo.Person.Identity = data.kullaniciBilgileri.kimlikNo;
                        LoginPage.Variables.EDPersonInfo.Person.Name = data.kullaniciBilgileri.ad;
                        LoginPage.Variables.EDPersonInfo.Person.Surmame = data.kullaniciBilgileri.soyad;
                    }
                    else {
                        LoginPage.Variables.EDPersonInfo.Success = false;
                        LoginPage.Variables.EDPersonInfo.ErrorMessage = data.sonucAciklamasi;
                    }
                    return LoginPage.Variables.EDPersonInfo;
                }
            });
        }
    },
    Helpers: {
        TokenControl: async function () {
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "PageTokenControl/" + LoginPage.Variables.PageToken,
                $requestData = {},
                $contentType = ContentTypes.FromForm,
                $useToken = false,
                $encrypt = false,
                $isApi = false,
            ).then(res => {
                if (res.isSuccess) {
                    var oResult = res.value;
                    if (oResult.data != undefined && oResult.data != null && oResult.data != "" && !LoginPage.Variables.TokenResult) {
                        debugger;
                        //bunu sayfa çok geç yüklenirse tekrar bu fonksiyona girmemesi için önlem olarak koydum 21.12.23
                        LoginPage.Variables.TokenResult = true;
                        //var citizenNo = parseInt(oResult.data.citizienNumber);
                        //localStorage.setItem("citizenNo", JSON.stringify(citizenNo));
                        //localStorage.setItem("fullName", JSON.stringify(oResult.data.fullName));
                        //localStorage.setItem("isCustody", JSON.stringify(LoginPage.Variables.isCustody));
                        var custodyCitizenNo = "";
                        if (LoginPage.Variables.isCustody)
                            custodyCitizenNo = oResult.data.citizenNumber;

                        var eDevletUserInfo = {
                            citizenNumber: parseInt(oResult.data.citizenNumber),
                            fullName: oResult.data.fullName,
                            isCustody: LoginPage.Variables.isCustody,
                            email: oResult.data.email,
                            gsmCountryCode: oResult.data.gsmCountryCode,
                            gsmNo: oResult.data.gsmNo,
                            birthDate: oResult.data.birthDate,
                            gender: oResult.data.gender,
                            custodyCitizenNo: custodyCitizenNo,
                            token: oResult.data.token
                        };
                        localStorage.setItem("eDevletUserInfo", JSON.stringify(eDevletUserInfo));
                        //var eDevletUserInfo = localStorage.getItem("eDevletUserInfo");

                        LoginPage.Variables.EDevletLoginPage.close();
                        var sendUrl = "LoginClient/" + oResult.data.token + "/" + LoginPage.Variables.isCustody;
                        window.location.href = sendUrl;
                        clearInterval(LoginPage.Variables.PageInterval);
                    }
                }

            }).catch(result => {

            });
        },
        OpenEDevletLogin: async function (isCustody = false) {
            LoginPage.Variables.isCustody = isCustody;
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "GetPageToken",
                $requestData = null,
                $contentType = ContentTypes.FromForm,
                $useToken = false,
                $encrypt = false,
                $isApi = false
            ).then(res => {
                if (res.isSuccess) {
                    LoginPage.Variables.PageToken = res.value.data;
                    LoginPage.Variables.EDevletLoginPage = window.open("https://giris.gsb.gov.tr/?appid=25165e5f-f345-4f07-91aa-023b3d3530fd&parametre=" + LoginPage.Variables.PageToken, "_blank");
                    LoginPage.Variables.PageInterval = setInterval(LoginPage.Helpers.TokenControl, 2000);
                } else {
                    iTech.ShowMessage("Hata", "Kimlik Hatası", "error");
                    LoginPage.Variables.PageToken = "";
                }
            }).catch(res => {
                LoginPage.Variables.PageToken = "";
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        MaterialModule: async function () {
            $(".materialDiv").append(``);

            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Other/GetAll/MaterialInfo/20",
                $requestData = {},
                $contentType = ContentTypes.FromForm,
                $useToken = false,
            ).then(res => {
                //$(".carousel-inner").empty();
                $(".spinner-border").hide();
                if (res.success) {
                    var materialData = res.value;
                    var supportMaterialData = [];
                    var supportMaterialContent = "";
                    supportMaterialData = materialData.sort((a, b) => a.order - b.order).slice(0, 3);
                    for (let i = 0; i < supportMaterialData.length; i++) {
                        supportMaterialContent += `
                                                <a target="_blank" onclick="LoginPage.Helpers.DownloadMaterial(${supportMaterialData[i].id})"> 
                                                    <li class="list-group-item text-white  customMaterialLi m-1" title="${supportMaterialData[i].question}" style="background-color: #ee7d22;border:none">
                                                    <div class="row justify-content-between">
                                                        <div class="col-10">
                                                            <span class="d-block text-truncate ">
                                                            ${supportMaterialData[i].question}
                                                            </span>
                                                        </div>   
                                                        <div class="col-2">
                                                            <i class="fas fa-download ml-1"></i></li> </a>
                                                        </div>
                                                    </div>
                                                 `;
                    }
                    if (supportMaterialData.length > 0)
                        supportMaterialContent += `
                                            <a href="/Other/MaterialInfo?param=20" target="_self"> <li class="list-group-item text-white text-center customMaterialLi m-1" style="background-color: #ee7d22;border:none">Tümünü Göster</li></a>
                                                    `;
                    else
                        supportMaterialContent += `<span class="text-white fw-400 fs-xl" style="margin: 0 auto;"> Materyal Mevcut Değil.</span>`

                    $(".materialDiv").append(supportMaterialContent);

                }
            }).catch(res => {
                //$(".carousel-inner").empty();
                $(".spinner-border").hide();
                if (e.status === 404 || e.status === 401) {
                    iTech.ShowMessage("Error", /*e.responseText*/ "Incorrect user information!", "error");
                }
            });
        },
        Canvas: function () {
            /* ====================== *
            *  Initiate Canvas       *
            * ====================== */
            paper.install(window);
            paper.setup(document.getElementById("canvas"));

            // Paper JS Variables
            var canvasWidth,
                canvasHeight,
                canvasMiddleX,
                canvasMiddleY;

            var shapeGroup = new Group();

            var positionArray = [];

            function resizeCanvas() {
                // Yeni pencere boyutlarını al
                var width = window.innerWidth;
                var height = window.innerHeight;

                // Canvas boyutlarını güncelle
                view.size.width = width;
                view.size.height = height;

                // Canvas içindeki öğelerin pozisyonlarını yeniden hesapla
                getCanvasBounds();
            }

            // Pencere yeniden boyutlandırıldığında 'resizeCanvas' fonksiyonunu çağır
            window.addEventListener('resize', resizeCanvas);

            // İlk yükleme için canvas boyutunu ayarla
            resizeCanvas();
            function getCanvasBounds() {
                // Get current canvas size
                canvasWidth = view.size.width;
                canvasHeight = view.size.height;
                canvasMiddleX = canvasWidth / 2;
                canvasMiddleY = canvasHeight / 2;
                // Set path position
                var position1 = {
                    x: (canvasMiddleX / 2) + 100,
                    y: 100,
                };

                var position2 = {
                    x: 200,
                    y: canvasMiddleY,
                };

                var position3 = {
                    x: (canvasMiddleX - 50) + (canvasMiddleX / 2),
                    y: 150,
                };

                var position4 = {
                    x: 0,
                    y: canvasMiddleY + 100,
                };

                var position5 = {
                    x: canvasWidth - 130,
                    y: canvasHeight - 75,
                };

                var position6 = {
                    x: canvasMiddleX + 80,
                    y: canvasHeight - 50,
                };

                var position7 = {
                    x: canvasWidth + 60,
                    y: canvasMiddleY - 50,
                };

                var position8 = {
                    x: canvasMiddleX + 100,
                    y: canvasMiddleY + 100,
                };

                positionArray = [position3, position2, position5, position4, position1, position6, position7, position8];
            };


            /* ====================== *
             * Create Shapes          *
             * ====================== */
            function initializeShapes() {
                // Get Canvas Bounds
                getCanvasBounds();

                var shapePathData = [
                    'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
                    'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
                    'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
                    'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
                    'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
                    'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
                    'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
                    'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
                ];

                for (var i = 0; i <= shapePathData.length; i++) {
                    // Create shape
                    var headerShape = new Path({
                        strokeColor: 'rgba(50, 50, 200, 0.5)',
                        strokeWidth: 2,
                        parent: shapeGroup,
                    });
                    // Set path data
                    headerShape.pathData = shapePathData[i];
                    headerShape.scale(2);
                    // Set path position
                    headerShape.position = positionArray[i];
                }
            };

            initializeShapes();

            /* ====================== *
             * Animation              *
             * ====================== */
            view.onFrame = function paperOnFrame(event) {
                if (event.count % 2 === 0) {
                    // Slows down frame rate
                    for (var i = 0; i < shapeGroup.children.length; i++) {
                        if (i % 2 === 0) {
                            shapeGroup.children[i].rotate(-0.1);
                        } else {
                            shapeGroup.children[i].rotate(0.1);
                        }
                    }
                }
            };

            view.onResize = function paperOnResize() {
                getCanvasBounds();

                for (var i = 0; i < shapeGroup.children.length; i++) {
                    shapeGroup.children[i].position = positionArray[i];
                }

                if (canvasWidth < 700) {
                    shapeGroup.children[3].opacity = 0;
                    shapeGroup.children[2].opacity = 0;
                    shapeGroup.children[5].opacity = 0;
                } else {
                    shapeGroup.children[3].opacity = 1;
                    shapeGroup.children[2].opacity = 1;
                    shapeGroup.children[5].opacity = 1;
                }
            };
        },
        Announce: async function () {
            iTech.Services.AjaxPromise(FormMethod.Get, "Predefined/GetAll/Announce", {}, ContentTypes.FromForm, false)
                .then((res) => {
                    if (res.success) {
                        var announceContent = "";
                        for (let i = 0; i < res.data.length; i++) {
                            announceContent += `
                                    <li class="list-group-item text-white text-center customMaterialLi m-1" style="background-color: #a169e7;border:none">${res.data[i].title}</li>
                            `;
                        }
                        announceContent += `
                                   <a href="https://www.google.com.tr" target="_blank"> <li class="list-group-item text-white text-center customMaterialLi m-1" style="background-color: #a169e7;border:none">Tümünü Göster</li></a>
                        `;
                        $(".announceListGroup").append(announceContent);
                    }
                });
        },
        DownloadMaterial: async function (id) {
            await iTech.Services.AjaxPromise(FormMethod.Get, `Other/DownloadMaterialDocument/${id}`, {}, ContentTypes.FromForm, false, false)
                .then(result => {
                    if (result.isSuccess) {
                        var contentType = result.value.mimeType;
                        var base64Data = result.value.base64Content;
                        fileName = result.value.name;
                        iTech.Helpers.Base64File(contentType, base64Data, fileName);
                    }
                    else {
                        iTech.ShowMessage("Uyarı", "Dosya Mevcut Değil !", "warning");
                    }
                }).catch(result => {
                    if (result.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", result.message, "error");
                });
        }
    },
    Variables: {
        EDConfiguration: {
            AuthURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AuthorizationController",
            TokenURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AccessTokenController",
            ResponseURL: "https://giris.turkiye.gov.tr/OAuth2AuthorizationServer/AuthenticationController",
            ClientId: "0f79e469-cf36-4aae-8a58-0f526a52b0b0",
            ClientSecret: "",
            RedirectUri: "https://localhost:44335",
        },
        EDFunctionResult: {
            Success: false,
            ErrorMessage: "",
            AuthorizationCode: "",
            AccessToken: ""
        },
        EDPersonInfo: {
            Person: {
                Identity: "",
                Name: "",
                Surmame: ""
            },
            Success: false,
            ErrorMessage: ""
        },
        EDevletLoginPage: null,
        PageToken: null,
        PageInterval: null,
        TokenResult: false,
        isCustody: false,
    }
};

$(LoginPage.Init);
