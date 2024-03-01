. ".\_Scripts\AddController.ps1"
. ".\_Scripts\AddConfiguration.ps1"
. ".\_Scripts\AddCshtmlAndJS.ps1"
. ".\_Scripts\AddDBSet.ps1"
. ".\_Scripts\AddDTO.ps1"
. ".\_Scripts\AddMapping.ps1"
. ".\_Scripts\AddMVCController.ps1"
. ".\_Scripts\AddScoped.ps1"
. ".\_Scripts\AddValidator.ps1"
. ".\_Scripts\AddServices.ps1"
. ".\_Scripts\AddRepository.ps1"

# Entity adını kullanıcıdan al
$EntityName = Read-Host "Please Enter Entity Name"

# Başlangıç dizini
$BaseDirectory = "./Domain/Entities/"

# Entity dosyasını ara
function Find-EntityFile {
    param (
        [string]$Path,
        [string]$EntityName
    )

    $EntityFilePath = $null

    # Dizin içinde dolaş
    $Directories = Get-ChildItem -Path $Path -Directory -Recurse

    foreach ($Directory in $Directories) {
        $Files = Get-ChildItem -Path $Directory.FullName -File
        foreach ($File in $Files) {
            if ($File.Name -eq "$EntityName.cs") {
                $EntityFilePath = $File.FullName
                break
            }
        }

        if ($EntityFilePath -ne $null) {
            break
        }
    }

    return $EntityFilePath
}

# Entity dosyasının yolunu bul
$EntityFilePath = Find-EntityFile -Path $BaseDirectory -EntityName $EntityName

if ($EntityFilePath -eq $null) {
    Write-Host "Entity file not found!" -ForegroundColor Red
    return
}

# Namespace'i dosya yolundan ayarla
# Dosya yolu içerisinden sadece son klasör adını al (örn. "Test")
$Namespace = Split-Path $EntityFilePath -Parent | Split-Path -Leaf

Write-Host "Entity File Path: $EntityFilePath"
Write-Host "Namespace: $Namespace"

$Context = "ITManagementDbContext";
$EntityNameLower = ($EntityName.substring(0, 1).tolower() + $EntityName.substring(1)).replace("ı", "i")
$EntityNameAllLower = ($EntityName.tolower().replace("ı", "i"))
$NamespaceLower = $Namespace.tolower().replace('ı', 'i')

# For Functions
# $Context = $requiredInfo.Context
# $EntityName = $requiredInfo.EntityName
# $Namespace = $requiredInfo.Namespace
# $NamespaceLower = $requiredInfo.NamespaceLower
# $EntityNameLower = $requiredInfo.EntityNameLower
# $EntityNameAllLower = $requiredInfo.EntityNameAllLower

$requiredInfo = @{
    Context            = $Context
    EntityName         = $EntityName
    Namespace          = $Namespace
    NamespaceLower     = $NamespaceLower
    EntityNameLower    = $EntityNameLower
    EntityNameAllLower = $EntityNameAllLower
}

$demoarrayList = New-Object -TypeName 'System.Collections.ArrayList';

$mappingarrayList = New-Object -TypeName 'System.Collections.ArrayList';

if (!(Test-Path "./Domain/Entities/$($Namespace)/$($EntityName).cs")) {
    Write-Host "`t¬ Verdiğiniz bilgilere ait bir domain bulunamadı!" -ForegroundColor  Red
    return 0
}

if (Test-Path "./Domain/Entities/$($Namespace)/$($EntityName).cs") {
    $pathName = "./Domain/Entities/$($Namespace)/$($EntityName).cs"
    foreach ($line in Get-Content $pathName) {
        if ($line.Contains("{ get; set; }")) {
            if (!($line.Contains("virtual"))) {
                if (!($line.Contains("//public"))) {
                    if ($line.Contains("Enm") -or $line.Contains("string") -or $line.Contains("bool") -or $line.Contains("DateTime") -or $line.Contains("long") -or $line.Contains("int") -or $line.Contains("double") -or $line.Contains("decimal")) {
                        $lineArray = $line.Trim().Split(" ")
                        [bool]$IsRequired = 0
                        if ($lineArray[1].Contains("?") -or $lineArray[1].Contains("string") ) {
                            $IsRequired = 0
                        }
                        else {
                            $IsRequired = 1
                        }
                        
                        $_LongType = ""
                        if ($lineArray[1].Contains("long") -or ($line.Contains("int") -and $line.Contains("Domain"))) {
                            if ($lineArray[$lineArray.Count - 1].Contains("Form")) {
                                $_LongType = $line.Split("//")[1].Trim()
                            }
                            elseif ($lineArray[$lineArray.Count - 1].Contains("Domain")) {
                                $_LongType = $line.Split("//")[1].Trim()
                            }
                            else {
                                $_LongType = "long"
                            }
                            $null = $demoarrayList.Add(@{
                                    Type       = $lineArray[1].Replace("?", "")
                                    Prop       = $lineArray[2]
                                    IsRequired = $IsRequired
                                    LongType   = $_LongType
                                })
                        }
                        else {
                            $null = $demoarrayList.Add(@{
                                    Type       = $lineArray[1].Replace("?", "")
                                    Prop       = $lineArray[2]
                                    IsRequired = $IsRequired
                                })
                        }
                    }
                    if ($line.Contains("Enm") -or ($line.Contains("long") -and $line.Contains("Form")) -or (($line.Contains("long") -and $line.Contains("Domain"))) -or (($line.Contains("int") -and $line.Contains("Domain")))) {
                        $lineArray = $line.Trim().Split(" ")
                        $_Type = ""
                        if ($line.Contains("Enm")) {
                            $_Type = "Enum"
                        }
                        elseif ($line.Contains("long") -and $line.Contains("Form")) {
                            $_Type = "Form"
                        }
                        elseif ($line.Contains("long") -and $line.Contains("Domain")) {
                            $_Type = "Domain"
                        }
                        elseif ($line.Contains("int") -and $line.Contains("Domain")) {
                            $_Type = "Domain"
                        }
                        $null = $mappingarrayList.Add(@{
                                Type       = $lineArray[1].Replace("?", "")
                                Prop       = $lineArray[2]
                                DefineType = $_Type
                            })
                    }
                
                }
            }
        
        }
    }
}

$testTime = 0
if ($testTime) {
    Add-Dto
    Add-ServicePack
    Add-Repository
    Add-DBSet
    Add-Validator
    Add-Configuration
    Add-Mapping
    Add-Scoped
    Add-APIController
    Add-MVCController
    Add-HtmlJavascript
}
else {
    #region DTO
    Write-Host "`nAdd DTO in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No DTO added!" -ForegroundColor DarkRed
    }
    else {
        Add-Dto
    }
    #endregion

    #region Service and IService
    Write-Host "`nAdd Service and IService in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No service added!" -ForegroundColor DarkRed
    }
    else {
        Add-ServicePack
    }
    #endregion

    #region Repository and IRepository
    Write-Host "`nAdd Repository and IRepository in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No service added!" -ForegroundColor DarkRed
    }
    else {
        Add-Repository
    }
    #endregion

    #region DBSet<>
    Write-Host "`nAdd DBSet<> in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No DBSet<> added!" -ForegroundColor DarkRed
    }
    else {
        Add-DBSet
    }
    #endregion

    #region Validator
    Write-Host "`nAdd Validator in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Validator added!" -ForegroundColor DarkRed
    }
    else {
        Add-Validator
    }
    #endregion

    #region Configurations
    Write-Host "`nAdd Configuration in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Configuration added!" -ForegroundColor DarkRed
    }
    else {
        Add-Configuration
    }
    #endregion

    #region Mapping
    Write-Host "`nAdd Mapping in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Mapping added!" -ForegroundColor DarkRed
    }
    else {
        Add-Mapping
    }
    #endregion

    #region Scoped
    Write-Host "`nAdd Scoped in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Scoped added!" -ForegroundColor DarkRed
    }
    else {
        Add-Scoped
    }
    #endregion

    #region API-Controller
    Write-Host "`nAdd API-Controller in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Controller added!" -ForegroundColor DarkRed
    }
    else {
        Add-APIController
    }
    #endregion

    #region MVC-Controller
    Write-Host "`nAdd MVC-Controller in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No MVC-Controller added!" -ForegroundColor DarkRed
    }
    else {
        Add-MVCController
    }
    #endregion

    #region Html-Javascript
    Write-Host "`nAdd Html-Javascript in Project?"
    $isOkey = Read-Host "y/n"
    Write-Host ""
    if ($isOkey.ToLower() -ne "y") {
        Write-Host "No Html-Javascript added!" -ForegroundColor DarkRed
    }
    else {
        Add-HtmlJavascript
    }
    #endregion

    Write-Host ""
    for ($a = 0; $a -le 100; $a++) {
        Write-Host -NoNewLine "`r$a% completed"
        Start-Sleep -Milliseconds 10
    }
    Write-Host ""
}

