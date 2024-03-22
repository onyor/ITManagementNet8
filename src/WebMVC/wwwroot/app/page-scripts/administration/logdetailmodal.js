const LogDetailPage = {
    Init: function () {
        LogDetailPage.AddEventHandlers();
    },
    AddEventHandlers: function () {
        if ($("#AuditLogModal").data("domainname") != "AllLog")
            $("#AuditLog").on("click", LogDetailPage.Helpers.GetAuditTable);
    },
    Helpers: {
        FormDegerGetir: async function (tabloAd, degerId) {
            if (tabloAd == "")
                return "---";
            if (degerId == null || degerId == 0 || degerId == "" || degerId == "0")
                return "---";

            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Forms/GetFormDataCache/" + tabloAd + "/" + degerId
            ).then(res => {
                if (res.isSuccess) {
                    if (res.value == "Hatalı Veri")
                        iTech.Services.AjaxPromise(
                            $type = FormMethod.Get,
                            $url = "Predefined/GetEntityData/" + tabloAd + "/" + degerId
                        ).then(formRes => {
                            if (formRes.isSuccess) {
                                return formRes.value;
                            }
                            else
                                return res.value;
                        }).catch(res => {
                            if (res.message.responseText)
                                iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                            else
                                iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                        });
                }
                else
                    return false;
            }).catch(res => {
                if (res.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", res.message, "error");
            });
        },
        GetAuditTable: function () {
            $("#AuditLogModal").modal("show");
            let obj = {}
            $("#AuditLogModal  div.modal-dialog").css("max-width", "1350px");

            var dname = $("#AuditLogModal").data("domainname");
            if (dname != "AllLog") {
                obj = {
                    primaryKey: window[$("#AuditLogModal").data("pagename") + "Page"].Variables.CurrentPersonelId,
                    tableName: dname
                }
            }

            let result = null;
            result = (dname != "AllLog") ?

                iTech.Services.AjaxPromise(
                    $type = FormMethod.Post,
                    $url = "AuditLogs/LoadDataTable",
                    $requestData = obj,
                ).then(res => {
                    if (res.isSuccess) 
                        result = res.value;
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                })
                :
                iTech.Services.AjaxPromise(
                    $type = FormMethod.Get,
                    $url = "AuditLogs/" + $(this).attr("data-id"),
                ).then(res => {
                    if (res.isSuccess) 
                        result = res.value;
                }).catch(res => {
                    if (res.message.responseText)
                        iTech.ShowMessage("Hatalı İşlem", res.message.responseText, "error");
                    else
                        iTech.ShowMessage("Hatalı İşlem", res.message, "error");
                });

            $(".auditPanel").find("div, hr").remove();

            let infoPanel = "";
            $.each(result.data, (k, v) => {
                if (v.oldValues == null || v.newValues == null) {
                    return;
                }
                const oldKeys = Object.keys(JSON.parse(v.oldValues));
                const oldValues = Object.values(JSON.parse(v.oldValues));
                const newKeys = Object.keys(JSON.parse(v.newValues));
                const newValues = Object.values(JSON.parse(v.newValues));

                infoPanel += `<div class="row align-items-center">
                                                <div class="col col-6 p-1">
                                                    <div class="col text-center text-white bg-primary p-1">Eski Durumu</div>
                                                </div>

                                                <div class="col col-6 p-1">
                                                    <div class="col text-center text-white bg-primary p-1">Yeni Durumu</div>
                                                </div>
                                            </div>`;

                let araDiv = "";
                for (var i = 0; i < oldKeys.length; i++) {
                    let oldV = oldValues[i];
                    let newV = newValues[i];

                    let oldK = oldKeys[i];
                    let newK = newKeys[i];


                    if (oldK.indexOf("Id") > 0) {
                        var tabloAd = oldK.substring(0, oldK.indexOf("Id"));
                        var deger = LogDetailPage.Helpers.FormDegerGetir(tabloAd, oldV);
                        if (deger)
                            oldV = deger;
                    };
                    if (newK.indexOf("Id") > 0) {
                        var tabloAd = newK.substring(0, newK.indexOf("Id"));
                        var deger = LogDetailPage.Helpers.FormDegerGetir(tabloAd, newV);

                        if (deger)
                            newV = deger;
                    };

                    if (oldK.includes("Tar") || oldK.includes("Tarih") || oldK.includes("Trh"))
                        oldV = moment(new Date(oldV)).format("DD/MM/YYYY HH:MM");

                    if (newK.includes("Tar") || newK.includes("Tarih") || newK.includes("Trh"))
                        newV = moment(new Date(newV)).format("DD/MM/YYYY HH:MM");



                    araDiv += `<div class="row align-items-center">
                                                <div class="col col-2 p-1">
                                                    <label class="form-label">${oldK}</label>
                                                </div>
                                                <div class="col col-4 p-1">
                                                    <span>${oldV}</span>
                                                </div>
                                                <div class="col col-2 p-1">
                                                    <label class="form-label">${newK}</label>
                                                </div>
                                                <div class="col col-4 p-1">
                                                    <span>${newV}</span>
                                                </div>
                                            </div>`;
                }
                infoPanel += araDiv;


                infoPanel += `
                            <div class="row align-items-center">
                                <div class="col col-6 p-1">
                                </div>
                                <div class="col col-2 p-1">
                                    <label class="form-label" style="background:yellow;">İşlemi Yapan</label>
                                </div>
                                <div class="col col-4 p-1">
                                    <span>${v.userName + " " + v.userSurname}</span>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col col-6 p-1">
                                </div>
                                <div class="col col-2 p-1">
                                    <label class="form-label" style="background:yellow;">İşlem Tarihi</label>
                                </div>
                                <div class="col col-4 p-1">
                                    <span>${moment(new Date(v.createdAt)).format("DD/MM/YYYY HH:mm")}</span>
                                </div>
                            </div>
                            <div class="row align-items-center">
                                <div class="col col-6 p-1">
                                </div>
                                <div class="col col-2 p-1">
                                    <label class="form-label" style="background:yellow;">İşlem Türü</label>
                                </div>
                                <div class="col col-4 p-1">
                                    <span>${v.type}</span>
                                </div>
                            </div>

`
                infoPanel += `<hr style="border: 2px solid gray"/>`;

            });
            $(".auditPanel").append(infoPanel);
        },
    },
    Variables: {
        FormName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null,
        CurrentPersonelId: null
    }
}
$(LogDetailPage.Init);