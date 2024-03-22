const DashboardPage = {
    Init: async function () {
        DashboardPage.Components.MapInit();
        DashboardPage.Helpers.GetPageCountersValue();
        DashboardPage.Components.MakeMap();
        DashboardPage.Components.RiskSituationByRequestTable();
        DashboardPage.Components.RequestAndAppointmentChart();
        DashboardPage.Components.GetAdviserCalendarCalenderData();
        DashboardPage.AddEventHandlers.PageHandler();
    },
    AddEventHandlers: {
        PageHandler: function () {

        },
        RiskSituationTable: function () {
            $("#RequestTypeId").on("change", DashboardPage.Components.RiskSituationByRequestTable);
        },
    },
    Components: {
        MapInit: function () {
            IT.Ajax(
                $type = FormMethod.Get,
                $url = "Dashboard/Vertical/Panel4",
            ).then(async (res) => {
                const topology = await DashboardPage.Helpers.FetchJson();

                let data = [];
                $.each(JSON.parse(res.value), (k, v) => {
                    let hcKey = topology.objects.default.geometries.find(x => x.properties.name == k)?.properties["hc-key"];
                    if (hcKey) {
                        data.push([hcKey, v]);
                    }
                });

                //const data = [
                //    ['tr-or', 10], ['tr-ss', 11], ['tr-ga', 12], ['tr-4409', 13],
                //    ['tr-kc', 14], ['tr-bk', 15], ['tr-ck', 16], ['tr-tt', 17],
                //    ['tr-gi', 18], ['tr-en', 19], ['tr-bg', 20], ['tr-ht', 21],
                //    ['tr-aa', 22], ['tr-cm', 23], ['tr-kk', 24], ['tr-ng', 25],
                //    ['tr-ak', 26], ['tr-kh', 27], ['tr-yz', 28], ['tr-am', 29],
                //    ['tr-ms', 30], ['tr-bm', 31], ['tr-ka', 32], ['tr-ig', 33],
                //    ['tr-du', 34], ['tr-zo', 35], ['tr-kb', 36], ['tr-yl', 37],
                //    ['tr-sk', 38], ['tr-ci', 39], ['tr-bl', 40], ['tr-ed', 41],
                //    ['tr-es', 42], ['tr-ko', 43], ['tr-bu', 44], ['tr-kl', 45],
                //    ['tr-ib', 46], ['tr-kr', 47], ['tr-al', 48], ['tr-af', 49],
                //    ['tr-bd', 50], ['tr-ip', 51], ['tr-ay', 52], ['tr-mn', 53],
                //    ['tr-dy', 54], ['tr-ad', 55], ['tr-km', 56], ['tr-ky', 57],
                //    ['tr-eg', 58], ['tr-ic', 59], ['tr-sp', 60], ['tr-av', 61],
                //    ['tr-ri', 62], ['tr-tb', 63], ['tr-an', 64], ['tr-su', 65],
                //    ['tr-bb', 66], ['tr-em', 67], ['tr-mr', 68], ['tr-sr', 69],
                //    ['tr-si', 70], ['tr-hk', 71], ['tr-va', 72], ['tr-ar', 73],
                //    ['tr-ki', 74], ['tr-br', 75], ['tr-tg', 76], ['tr-iz', 77],
                //    ['tr-ks', 78], ['tr-mg', 79], ['tr-ku', 80], ['tr-nv', 81],
                //    ['tr-sv', 82], ['tr-tc', 83], ['tr-ml', 84], ['tr-ag', 85],
                //    ['tr-bt', 86], ['tr-gu', 87], ['tr-os', 88], ['tr-bc', 89],
                //    ['tr-dn', 90], ['tr-us', 91]
                //];

                // Create the chart
                Highcharts.mapChart('container', {
                    chart: {
                        map: topology
                    },

                    title: {
                        text: 'İllere Göre Başvuru Dağılımı'
                    },
                    mapNavigation: {
                        enabled: false,
                        enableMouseWheelZoom: false,
                        buttonOptions: {
                            verticalAlign: 'bottom'
                        }
                    },
                    exporting: {
                        enabled: false,
                    },
                    colorAxis: {
                        min: 0,
                        minColor: '#BBE070',
                        maxColor: '#FF0000'
                    },
                    series: [{
                        data: data,
                        name: 'Başvurular',
                        states: {
                            hover: {
                                color: '#BADA55'
                            }
                        },
                        color: '#FF0000',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        },
                    }],
                    //tooltip: {
                    //    enabled: false
                    //},
                    //legend: {
                    //    enabled: false
                    //},
                });
            });
        },
        MakeMap: async function (sGId = null) {
            var map = DashboardPage.Variables.Map;

            IT.Ajax(FormMethod.Get, "Dashboard/Vertical/Panel3").then((res) => {
                if (res.isSuccess) {
                    var result = JSON.parse(res.value);

                    if (map != null && result !== undefined) map.remove();

                    if (result !== undefined && result !== null) {
                        map = iTech.Leaflet.Load.WithMarkerCluster("leaflet", result.locations, iTech.Leaflet.UrlTemplates.Mapbox);
                    }
                    else {
                        map = iTech.Leaflet.Load.WithMarkerCluster("leaflet", null, iTech.Leaflet.UrlTemplates.Mapbox);
                    }
                    DashboardPage.Variables.Map = map;
                }
            });

        },
        RiskSituationByRequestTable: async function () {
            if (iTech.DataTable.IsDataTable("#RiskSituationByRequestTable")) {
                $("#RiskSituationByRequestTable").DataTable().destroy();
            }

            IT.DataTable("#RiskSituationByRequestTable", "Dashboard/Vertical/Panel1").then((table) => {
                table.one("draw.dt", DashboardPage.AddEventHandlers.RiskSituationTable);
            });
        },
        RequestAndAppointmentChart: async function () {
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Dashboard/Vertical/Panel2",
            ).then(async result => {
                if (result.isSuccess) {
                    result.value = JSON.parse(result.value);

                    var dataProfit = result.value.appointmentCount;
                    var dataSignups = result.value.requestCount;
                    var data = [
                        {
                            label: "Başvurular",
                            data: dataProfit,
                            color: color.info._500,
                            lines:
                            {
                                show: true,
                                lineWidth: 5
                            },
                            shadowSize: 0,
                            points:
                            {
                                show: true
                            }
                        },
                        {
                            label: "Toplantılar",
                            data: dataSignups,
                            color: color.warning._500,
                            lines:
                            {
                                show: true,
                                lineWidth: 4
                            },
                            shadowSize: 0,
                            points:
                            {
                                show: true
                            }
                        }]

                    var options = {
                        grid:
                        {
                            hoverable: true,
                            clickable: true,
                            tickColor: '#f2f2f2',
                            borderWidth: 1,
                            borderColor: '#f2f2f2'
                        },
                        tooltip: true,
                        tooltipOpts:
                        {
                            cssClass: 'tooltip-inner',
                            defaultTheme: false
                        },
                        xaxis: {
                            mode: "time",
                            tickSize: [1, "month"],
                            tickFormatter: function (val, axis) {
                                var date = new Date(val);
                                var months = ["", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", "Ocak"];
                                return months[date.getMonth() + 1] + ' ' + date.getFullYear();
                            }
                        },
                        yaxes:
                        {
                            tickFormatter: function (val, axis) {
                                return "$" + val;
                            },
                            max: 1200
                        }

                    };

                    var plot2 = null;

                    function plotNow() {
                        var d = [];
                        $("#js-checkbox-toggles").find(':checkbox').each(function () {
                            if ($(this).is(':checked')) {
                                d.push(data[$(this).attr("name").substr(4, 1)]);
                            }
                        });
                        if (d.length > 0) {
                            if (plot2) {
                                plot2.setData(d);
                                plot2.draw();
                            }
                            else {
                                plot2 = $.plot($("#flot-toggles"), d, options);
                            }
                        }

                    };

                    $("#js-checkbox-toggles").find(':checkbox').on('change', function () {
                        plotNow();
                    });
                    plotNow()
                }
                else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseJSON.detail.split("*")[1], "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
        GetAdviserCalendarCalenderData: async function (pShowOnlyFilledEvents = true) {
            debugger;
            if (pShowOnlyFilledEvents == undefined || pShowOnlyFilledEvents == null)
                pShowOnlyFilledEvents = DashboardPage.Variables.ShowOnlyFilledEvents;
            else
                DashboardPage.Variables.ShowOnlyFilledEvents = pShowOnlyFilledEvents;

            var oDefaultView = "dayGridMonth";
            var oShowEventTime = false;
            if (DashboardPage.Variables.ShowOnlyFilledEvents == false) {
                oShowEventTime = true;
                oDefaultView = "timeGridWeek";
            }
            $('#AdviserCalender').empty();
            var oUrl = "Dashboard/Vertical/Panel6";

            iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = oUrl,
            ).then(res => {
                if (res.isSuccess) {
                    res.value = JSON.parse(res.value);
                    DashboardPage.Variables.oAppointmentEvents = [];
                    for (let i = 0; i < res.value.length; i++) {
                        let oEvent = {};
                        oEvent.title = res.value[i].title;
                        oEvent.start = res.value[i].startDate;
                        oEvent.end = res.value[i].endDate;
                        oEvent.description = res.value[i].description;
                        oEvent.className = res.value[i].className;
                        oEvent.id = res.value[i].id;
                        oEvent.status = res.value[i].status;
                        oEvent.advisorDefinitionId = res.value[i].advisorDefinitionId;
                        oEvent.type = "AdviserWS";
                        oEvent.eventtype = res.value[i].eventType;
                        DashboardPage.Variables.oAppointmentEvents.push(oEvent);
                    }
                    var calendarAdviser = document.getElementById('AdviserCalender');
                    var calendar = new FullCalendar.Calendar(calendarAdviser,
                        {
                            plugins: ['dayGrid', 'list', 'timeGrid', 'interaction', 'bootstrap'],
                            defaultView: oDefaultView,
                            themeSystem: 'bootstrap',
                            timeZone: 'UTC',
                            locale: 'tr',
                            firstDay: 1,
                            allDay: false,
                            timeFormat: 'H:mm',
                            allDayText: "Saat",
                            eventLimitText: "adet oturum.",
                            //height: 500,
                            contentHeight: 600,
                            displayEventTime: oShowEventTime,
                            progressiveEventRendering: false,
                            minTime: "08:00",
                            maxTime: "22:00",
                            businessHours: [
                                {
                                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                                    startTime: '08:00:00',
                                    endTime: '12:00:00',
                                },
                                {
                                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                                    startTime: '14:00:00',
                                    endTime: '22:00:00',
                                }
                            ],
                            dayGridMonth: {
                                dayHeaderFormat: {
                                    weekday: 'long'
                                },
                                titleFormat: {
                                    month: 'long',
                                    year: 'numeric',
                                    day: 'none',
                                    weekday: 'long'
                                },
                            },
                            allDaySlot: false,
                            slotDuration: '00:30',
                            hiddenDays: [],
                            buttonText:
                            {
                                today: 'Bugün',
                                month: 'Ay',
                                week: 'Hafta',
                                day: 'Gün',
                                list: 'Liste'
                            },
                            eventTimeFormat:
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                meridiem: 'long'
                            },
                            navLinks: true,
                            header:
                            {
                                left: '',
                                center: 'title',
                                right: 'prev,next', //'dayGridMonth,timeGridWeek,timeGridDay prev,next'
                            },
                            footer:
                            {
                                left: '', //'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                                center: '',
                                right: ''
                            },
                            customButtons: {
                                customprev: {
                                    text: '<',
                                    click: function () {
                                        calendar.prev();
                                        DashboardPage.Helpers.SetAdviserCalendarClasses(oDefaultView);
                                    }
                                },
                                customnext: {
                                    text: '>',
                                    click: function () {
                                        calendar.next();
                                        DashboardPage.Helpers.SetAdviserCalendarClasses(oDefaultView);
                                    }
                                }
                            },
                            eventRender: function (event) {
                                $(event.el).tooltip({ title: event.event.title });
                            },
                            editable: false,
                            eventLimit: true,
                            views: {
                                //timeGrid: {
                                //    eventLimit: 1  
                                //},
                                dayGridMonth: {
                                    eventLimit: 3
                                },
                            },
                            events: DashboardPage.Variables.oAppointmentEvents,
                            navLinkDayClick: function (date, jsEvent) {
                                //alert("navLinkDayClick");
                                //return false;
                            },
                            navLinkWeekClick: function (weekStart, jsEvent) {
                                //alert("navLinkWeekClick");
                            },
                            eventClick: function (event) {
                                if (DashboardPage.Variables.PageAdviserId == 0) {
                                    var eventDate = event.event.start.toISOString().toString().substring(0, 19)
                                    var oEvent = DashboardPage.Variables.oAppointmentEvents.filter(x => x.start == eventDate);
                                    if (oEvent != undefined && oEvent != null) {
                                        oEvent = oEvent[0];
                                        var oId = oEvent.id;
                                        if (oEvent.eventtype == DashboardPage.Variables.CalenderEventTypes.Appointment) {
                                            var oAdvisorDefinitionId = oEvent.advisorDefinitionId;
                                            switch (oEvent.status) {
                                                case DashboardPage.Variables.SessionStatusTypes.Undefined: {
                                                    $("#AdviserSelectModal").data("id", oId);
                                                    $("#AdviserSelectModal").data("AdvisorDefinitionId", oAdvisorDefinitionId);
                                                    $("#AdviserSelectModal").data("event", oEvent);
                                                    $("#AdviserSelectModal").modal("show");
                                                    break;
                                                }
                                                case DashboardPage.Variables.SessionStatusTypes.Block: {
                                                    $("#DeleteBlockModal").data("id", oId);
                                                    $("#DeleteBlockModal").modal("show");
                                                    break;
                                                }
                                                case DashboardPage.Variables.SessionStatusTypes.SetedAppointment: {
                                                    location.href = "/AdviseManagement/AppointmentDetails?param=" + parseInt(oId);
                                                    break;
                                                }
                                                default:
                                                    break;
                                            }
                                        } else if (oEvent.eventtype == DashboardPage.Variables.CalenderEventTypes.Group)
                                            location.href = "/AdviseManagement/GroupDetails?param=" + parseInt(oId);
                                        else if (oEvent.eventtype == DashboardPage.Variables.CalenderEventTypes.Guidance) {
                                            //var eventDate = event.event.start.toISOString().toString().substring(0, 19);
                                            DashboardPage.OpenGuidanceDefinitionModal(event.event.id, eventDate);
                                        }
                                        else
                                            iTech.ShowMessage("Hata", "Hatalı Parametre", "error");
                                    }
                                    else
                                        iTech.ShowMessage("Hatalı İşlem", "İşlem Sırasında Bir Hata Oluştu.", "error");
                                }
                            },
                            viewSkeletonRender: function () {
                                $('#AdviserCalender .fc-toolbar .btn-default').addClass('btn-sm');
                                $('#AdviserCalender .fc-header-toolbar h2').addClass('fs-md');
                                $('#AdviserCalender').addClass('fc-reset-order')
                            },
                            datesSet: function () { },
                            datesRender: function () { DashboardPage.Helpers.SetAdviserCalendarClasses(oDefaultView); },
                            dateClick: function (info) { },
                        });
                    calendar.render();
                }
                else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseJSON.detail.split("*")[1], "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
    },
    Helpers: {
        SlideIt: function (slides) {
            let indicators = "";
            let slideItem = "";
            let act = "";
            for (let i = 0; i < slides.length; i++) {
                act = (i === 0) ? "active" : "";
                indicators += "<li data-target='#NewsSlider' data-slide-to='" + i + "' class='" + act + "'></li>";
                slideItem += "<div class='carousel-item" + _ + act + "'>";
                slideItem += "<p class='text-right' name='updatedAt'>" + moment(slides[i].updatedAt).format("DD/MM/YYYY HH:mm"); + "</p>";
                slideItem += "<h2 name='baslik'>" + slides[i].baslik + "</h2>";
                slideItem += "<p name='icerik'>" + slides[i].icerik + "</p>";
                slideItem += "</div>";
            }
            indicators += "</ol>";
            $(".carousel-indicators").append(indicators);
            $(".carousel-inner").append(slideItem);
            $(".cs").carousel({
                interval: 5000,
                pause: false,
                ride: true,
                wrap: true
            });
        },
        FetchJson: async function () {
            try {
                const response = await fetch('/lib/maps/tr-all.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Hata:', error);
            }
        },
        GetPageCountersValue: async function () {
            await iTech.Services.AjaxPromise(
                $type = FormMethod.Get,
                $url = "Dashboard/Vertical/Panel5",
            ).then(async res => {
                if (res.isSuccess) {
                    var result = JSON.parse(res.value);
                    $("#ActiveAppointment").html(result.activeAppointment + " Adet");
                    $("#WaitingForAppointment").html(result.waitingForAppointment + " Adet");
                    $("#NumberOfAdvisor").html(result.numberOfAdvisor + " Adet");
                    $("#NumberofClients").html(result.numberofClients + " Adet");
                    $("#PotentialRisk").html(result.potentialRisk + " Adet");
                }
                else
                    iTech.ShowMessage(ShowMessages.HataBaslik, ShowMessages.HataMesaj, "error");
            }).catch(result => {
                if (result.message.responseText)
                    iTech.ShowMessage("Hatalı İşlem", result.message.responseText, "error");
                else
                    iTech.ShowMessage("Hatalı İşlem", result.message, "error");
            });
        },
        SetAdviserCalendarClasses: function (pDefaultView) {
            const DateItems = document.getElementsByClassName("fc-axis fc-time");
            for (const oDateItem of DateItems) {
                // arrayden 2 ye bol ilk olan tam saat sonraki de end time olur 
                var oDate = $(oDateItem).parent().attr("data-time").toString().substring(0, 5);
                $(oDateItem).html("<span>" + oDate + "</span>");
            }
            $('#AdviserCalender .fc-time-grid-event').css('display', 'flex');
            $('#AdviserCalender .fc-time-grid-event').css('justify-content', 'center');
            $('#AdviserCalender .fc-time-grid-event').css('align-items', 'center');
            $('#AdviserCalender .fc-time-grid-event').css('cursor', 'pointer');
            $('#AdviserCalender .fc-axis').css('width', '35px');
            $('#AdviserCalender .fc-event').css('font-size', '14px');
            if (pDefaultView == "dayGridMonth")
                $('#AdviserCalender .fc-event').css('margin', '0px 0px 0px 0px');
            else
                $('#AdviserCalender .fc-event').css('margin', '0px -7px -9px -2px');
            $('#AdviserCalender .fc-event').css('vertical-align', 'middle');
        },
    },
    Variables: {
        CustomerDefinitionId: null,
        PageStatus: null,
        Map: null
    }
};
$(DashboardPage.Init);