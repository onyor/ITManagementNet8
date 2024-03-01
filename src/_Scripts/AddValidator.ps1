function Add-Validator () {
    $EntityName=$requiredInfo.EntityName
    $Namespace=$requiredInfo.Namespace

    $filePath = "././Infrastructure/Data/Validators"
    if ($Namespace.Trim() -ne "") {
        $NamespaceValidator = "ITX.Infrastructure.Data.Validators"
        $nsModelEntity = "ITX.Domain.Entities.$($Namespace)"
        # $filePath = "$($filePath)/$($Namespace)"
    }

    # Create Validator directory if not exist
    if (!(Test-Path $filePath)) {
        New-Item -ItemType Directory -Force -Path $filePath
    }


    $validatorFileText = @"
using $($nsModelEntity);
using ITX.Shared.Extensions;

namespace $($NamespaceValidator)
{
    public class $($EntityName)Validator : BaseValidator<$($EntityName)>
    {
        public $($EntityName)Validator()
        {
            
        }
    }
}
"@
    $path = "$($filePath)/$($EntityName)Validator.cs"
    if (!(Test-Path $path)) {
        $validatorFileText > $path
    }
    else {
        Write-Host "`t¬ Validator zaten mevcut." -ForegroundColor  DarkBlue
    }
}