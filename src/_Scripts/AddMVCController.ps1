function Add-MVCController () {
  $EntityName = $requiredInfo.EntityName
  $Namespace = $requiredInfo.Namespace
    
  $ControllerPath = "././WebMVC/Controllers/$($Namespace)Controller.cs"
  $actionResult = "`n`t`tpublic IActionResult $($EntityName)() => View();"
  
  if (Test-Path $ControllerPath) {
    $file = Get-Content $($ControllerPath)
    if (!([string]$file).Contains("$($EntityName)")) {
      $i = 0
      foreach ($line in  $file) {
        if ($line.Contains("{")) {
          $i++
          if ($i -gt 1) {
            $line += $actionResult
          }
        }
        $DtoString += $line + "`n"
      }
      $DtoString > $ControllerPath
    }
    else {
      Write-Host "`t¬ IActionResult zaten mevcut." -ForegroundColor  DarkBlue
    }
  }
  else {
    $controllerFileText = @"
using Microsoft.AspNetCore.Mvc;

namespace WebMVC.Controllers
{
    public class $($Namespace)Controller : Controller
    {
        public IActionResult $($EntityName)() => View();
    }
}
"@
    $controllerFileText > $ControllerPath
  }
}


