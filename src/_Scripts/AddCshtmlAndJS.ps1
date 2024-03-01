#region ForCshtml
function Add-String([string]$prop) {
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <input type="text" id="$prop" name="$prop" class="form-control form-control-xs" />
                        </div>
                    </div>`n
"@
    return $row
}

function Add-Datetime([string]$prop, [bool]$required) {
    if ($required) {
        $_isRequired = "required"
    }
    else {
        $_isRequired = ""
    }
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <input id="$prop" name="$prop" type="date" class="form-control form-control-xs flatpickr" $_isRequired />
                        </div>
                    </div>`n
"@
    return $row
}

function Add-Bool([string]$prop) {
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label mr-2">$prop</label>
                            <div class="custom-control custom-switch" switch-text="Evet:Hayır">
                                <input type="checkbox" id="$prop" name="$prop" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="$prop">Hayır</label>
                            </div>
                        </div>
                    </div>`n
"@
    return $row
}

function Add-Long([string]$prop, [bool]$required) {
    if ($prop -eq "Id") {
        return ""
    }
    if ($required) {
        $_isRequired = "required"
    }
    else {
        $_isRequired = ""
    }
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <input type="number" id="$prop" name="$prop" class="form-control form-control-xs" $_isRequired />
                        </div>
                    </div>`n
"@
    return $row
}

function Add-Enum([string]$prop, [bool]$required) {
    if ($required) {
        $_isRequired = "required"
    }
    else {
        $_isRequired = ""
    }
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <select id="$prop" name="$prop" class="form-control form-control-xs" data-type="static" opt-sel2="true" source="Forms/GetEnumList/$($prop.Replace("Id",""))" data-text="ad" data-value="deger" opt-initialText $_isRequired >
                            </select>
                        </div>
                    </div>`n
"@
    return $row
}
function Add-Form([string]$prop, [bool]$required) {
    if ($required) {
        $_isRequired = "required"
    }
    else {
        $_isRequired = ""
    }
    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <select type="number" id="$prop" name="$prop" class="form-control form-control-xs" opt-sel2="true" data-type="dynamic" data-text="Ad" data-value="deger" opt-initialText $_isRequired >
                            </select>
                        </div>
                    </div>`n
"@
    return $row
}
function Add-Domain([string]$prop, [bool]$required, [string]$Controller) {
    if ($required) {
        $_isRequired = "required"
    }
    else {
        $_isRequired = ""
    }
    if ($Controller.Contains(":")) {
        $Controller = $line.Trim().Split(":")[0];

    }

    $row = @" 
                    <div class="row">
                        <div class="col">
                            <label for="$prop" class="form-label">$prop</label>
                            <select id="$prop" name="$prop" class="form-control form-control-xs" data-type="static" opt-sel2="true" source="$Controller/GetAll/$($prop.Replace("Id",""))" data-text="name" data-value="id" opt-initialText $_isRequired >
                            </select>
                        </div>
                    </div>`n
"@
    return $row
}

#endregion

function Add-HtmlJavascript () {
    $EntityName = $requiredInfo.EntityName
    $Namespace = $requiredInfo.Namespace
    $NamespaceLower = $requiredInfo.NamespaceLower
    $EntityNameAllLower = $requiredInfo.EntityNameAllLower
    $pathCshtml = "././WebMVC/Views/$Namespace"
    $pathJavascript = "././WebMVC/wwwroot/app/pageScripts/$NamespaceLower"

    # Create Cshtml directory if not exist
    if (!(Test-Path $pathCshtml)) {
        New-Item -ItemType Directory -Force -Path $pathCshtml
    }

    # Create Javascript directory if not exist
    if (!(Test-Path $pathJavascript)) {
        New-Item -ItemType Directory -Force -Path $pathJavascript
    }

    #region Javascript Code
    $JavascriptFileText = @"
const $($EntityName)Page = {
    Init: function () {
        $($EntityName)Page.Variables.FormName = "$($EntityName)";
        $($EntityName)Page.Variables.TableName = "#" + $($EntityName)Page.Variables.FormName + "Table";
        $($EntityName)Page.Variables.GetMethod = "$($Namespace)/Get/" + $($EntityName)Page.Variables.FormName;
        $($EntityName)Page.Variables.SaveMethod = "$($Namespace)/Save" + $($EntityName)Page.Variables.FormName;
        $($EntityName)Page.Variables.DeleteMethod = "$($Namespace)/Delete/" + $($EntityName)Page.Variables.FormName;
        $($EntityName)Page.Variables.LoadTableMethod = "$($Namespace)/LoadDataTable/" + $($EntityName)Page.Variables.FormName;
        $($EntityName)Page.Component();
    },
    AddEventHandlers: function () {
        `$(".modal-footer").on("click", "button[data-role='save']", $($EntityName)Page.Helpers.Save);
        `$("table"+$($EntityName)Page.Variables.TableName).on("click", "button[data-role='delete']", $($EntityName)Page.Helpers.Delete);
        `$("table"+$($EntityName)Page.Variables.TableName).on("click", "button[data-role='edit']", $($EntityName)Page.Helpers.OpenMdl);
        `$("div" +$($EntityName)Page.Variables.TableName+"_wrapper").on("click", "button[name='create']", $($EntityName)Page.Helpers.OpenMdl);
    },
    Component: function () {
        IT.DataTable($($EntityName)Page.Variables.TableName, $($EntityName)Page.Variables.LoadTableMethod).then((table) => {
            $($EntityName)Page.Variables.TableApi=table;
            table.one("draw.dt", $($EntityName)Page.AddEventHandlers);
        });
    },
    Helpers: {
        OpenMdl: function () {
            const id = `$(this).data("id");
            iTech.Generated.OpenMdl(id, $($EntityName)Page.Variables.FormName, $($EntityName)Page.Variables.GetMethod);
        },
        Save: function () {
            iTech.Generated.Save($($EntityName)Page.Variables.FormName, $($EntityName)Page.Variables.SaveMethod);
        },
        Delete: function () {
            const id = `$(this).data("id");
            iTech.Generated.Delete(id, $($EntityName)Page.Variables.FormName, $($EntityName)Page.Variables.DeleteMethod);
        }
    },
    Variables: {
        TableApi: null,
        FormName: null,
        TableName: null,
        GetMethod: null,
        SaveMethod: null,
        DeleteMethod: null,
        LoadTableMethod: null
    }
}
`$($($EntityName)Page.Init);
"@

    $path = "$($pathJavascript)/$($EntityNameAllLower).js"
    if (!(Test-Path $path)) {
        $JavascriptFileText | Out-File "$($pathJavascript)/$($EntityNameAllLower).js" -Encoding UTF8
    }
    else {
        Write-Host "`t¬ Javascript zaten mevcut." -ForegroundColor  DarkBlue
    }
    #endregion

    #region Cshtml Code
    $CshtmlFileText = @"
@using ITX.WebMVC.Models
@{
var parents = new Dictionary<string, Dictionary<string, string>>
{
    {
        "MainPage", new Dictionary<string, string> {{"jsonKey", "Anasayfa"}}
    },
    {
        "HasSub", new Dictionary<string, string> {{"jsonKey", "$($Namespace)" } }
    },
    {
        "ActivePage", new Dictionary<string, string> {{"jsonKey", "$($EntityName)" } }
    }
};
}

@{
    List<TableAuthorityViewModel> TableAuthorityList = new List<TableAuthorityViewModel>();
    TableAuthorityList.Add(new TableAuthorityViewModel()
            {
                TableName = "$($EntityName)",
                ActionButtonList = new List<string> { "edit", "delete" },
                TopButtonList = new List<string> { "add" },
            });
}

@await Html.PartialAsync("_TableAuthority", TableAuthorityList);

<main id="js-page-content" role="main" class="page-content">
    <div class="row">
        @await Html.PartialAsync("_Breadcrumb", parents)
    </div>
    <div class="row">
        <div class="col-xl-12">
            <div id="panel-1" class="panel">
                <div class="panel-container show">
                    <div class="panel-content">
                        <div class="row">
                            <div class="col">
                                <div class="table-responsive h-scrollbar-primary">
                                    @{
                                        var $($EntityName)ActionsString = TempData["$($EntityName)ActionsString"] as string;
                                        var $($EntityName)TopButtonsString = TempData["$($EntityName)TopButtonsString"] as string;
                                    }
                                    <table id="$($EntityName)Table" data-topButtons="@$($EntityName)TopButtonsString" class="table table-bordered table-hover table-striped w-100 nowrap display compact" data-responsive="false">
                                        <thead>
                                            <tr role="row">
                                                <th col-data='Id' col-align='center' col-noSearchable>Id</th>
"@                                               
    foreach ($item in $demoarrayList) {
        if ($item.Type -eq "string") {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)'>$($item.Prop)</th>";
        }
        elseif (($item.Type -eq "int") -and ($null -ne $item.LongType) -and ($item.LongType.Trim().Split("-")[0] -eq "Domain")) {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)Name' col-dynamic='Form_'>$($item.Prop)</th>";
        }
        elseif ((($item.Type -eq "long") -and ($item.LongType -eq "long")) -or ($item.Type -eq "int") -or ($item.Type -eq "double") -or ($item.Type -eq "decimal")) {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)' col-align='center'>$($item.Prop)</th>";
        }
        elseif ($item.Type -eq "DateTime") {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)' col-noSearchable col-type='date'>$($item.Prop)</th>";
        }
        elseif ($item.Type -eq "bool") {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)' col-noSearchable col-type='bool' col-align='center'>$($item.Prop)</th>";
        }
        elseif (($item.Type -eq "long") -and ($item.LongType.Trim().Split("-")[0] -eq "Domain") -and ($item.Prop.Contains("Id"))) {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)Name' col-dynamic='Domain_' col-noSearchable> $($item.Prop)</th>";
        }
        elseif (($item.Type -eq "long") -and ($item.LongType -eq "Form") -and ($item.Prop.Contains("Id"))) {
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)Name' col-dynamic='Form_'>$($item.Prop)</th>";
        }
        elseif ($item.Type.Contains("Enm")){
            $CshtmlFileText += "`n`t`t`t`t`t`t`t`t`t`t`t`t<th col-data='$($item.Prop)Name' col-dynamic='Enum_'>$($item.Prop)</th>";
        }
    }
    $CshtmlFileText += @"
    `n                                    `t`t`t@if (!string.IsNullOrEmpty($($EntityName)ActionsString))
                                                {
                                                    <th col-role="action" action-list="@$($EntityName)ActionsString">İşlemler</th>
                                                }
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<div class="page-content-overlay" data-action="toggle" data-class="mobile-nav-on"></div>

<div id="$($EntityName)Modal" aria-hidden="true" aria-labelledby="modalCaption" class="modal fade" data-backdrop="static" data-keyboard="true" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <span id="modalCaption" class="form-span">$($EntityName) Ekle/Güncelle</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Kapat">
                    <span aria-hidden="true">
                        <i class="fal fa-times"></i>
                    </span>
                </button>
            </div>
            <div class="modal-body">
                <form name="$($EntityName)Form">
                    <input id="hdnDataId" name="Id" type="hidden" value="" data-id-type="number" />`n
"@
    foreach ($item in $demoarrayList) {
        if ($item.Type -eq "string") {
            $CshtmlFileText += Add-String $item.Prop
        }
        elseif ((($item.Type -eq "long") -and ($item.LongType -eq "long")) -or ($item.Type -eq "int") -or ($item.Type -eq "double") -or ($item.Type -eq "decimal")) {
            $CshtmlFileText += Add-Long $item.Prop $item.IsRequired
        }
        elseif ($item.Type -eq "DateTime") {
            $CshtmlFileText += Add-Datetime $item.Prop $item.IsRequired
        }
        elseif ($item.Type -eq "bool") {
            $CshtmlFileText += Add-Bool $item.Prop
        }
        elseif (($item.Type -eq "long") -and ($item.LongType.Trim().Split("-")[0] -eq "domain")) {
            $CshtmlFileText += Add-Domain $item.Prop $item.IsRequired $item.LongType.Trim().Split("-")[1]
        }
        elseif (($item.Type -eq "long") -and ($item.LongType -eq "form")) {
            $CshtmlFileText += Add-Form $item.Prop $item.IsRequired
        }
        else {
            $CshtmlFileText += Add-Enum $item.Prop $item.IsRequired
        }
    }
    $CshtmlFileText += @"                          
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger" data-content="remove" data-dismiss="modal" type="button">
                    İptal
                </button>
                @if (User.HasClaim(c => c.Type == "Save" && c.Value == "True"))
                {
                    <button class="btn btn-primary" data-role="save" type="button">
                        Kaydet
                    </button>
                }
            </div>
        </div>
    </div>
</div>
"@

    $path = "$($pathCshtml)/$($EntityName).cshtml"
    if (!(Test-Path $path)) {
        $CshtmlFileText | Out-File "$($pathCshtml)/$($EntityName).cshtml" -Encoding UTF8 
    }
    else {
        Write-Host "`t¬ Cshtml zaten mevcut." -ForegroundColor  DarkBlue
    }
    #endregion
}