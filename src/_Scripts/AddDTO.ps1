function Add-Dto () {
  $EntityName = $requiredInfo.EntityName
  $Namespace = $requiredInfo.Namespace
    
  $EntityPath = "././Domain/Entities/$($Namespace)/$($EntityName).cs"
  $DtoPath = "././Application/Dtos/$($Namespace)"
  $DtoClass = "`tpublic class $($EntityName)Dto: BaseDto<long>"
  $DtoNamespace = "namespace ITX.Application.Dtos.$Namespace"
  # $LongProp = "`t`tpublic long Id { get; set; }"
  
  # Create DTO directory if not exist
  if (!(Test-Path $DtoPath)) {
    New-Item -ItemType Directory -Force -Path $DtoPath
  }
  
  $file = Get-Content $($EntityPath)
  foreach ($line in $file) {
    if (!($line.Contains("virtual"))) {
      if (!($line.Contains("//public"))) {
        if (!($line.Contains("properties"))) {
          if ($line.Contains("namespace")) {
            $line = $DtoNamespace
          }
          elseif ($line.Contains("class")) {
            $line = $DtoClass
          }
          elseif ($line.Contains("Enm")) {
            $lineArray = $line.Trim().Split(" ");
            $line += "`n`t`tpublic string $($lineArray[2])Name { get; set; }";
            $pos = $DtoString.IndexOf("namespace")
          }
          elseif ($line.Contains("long") -or (($line.Contains("int") -and $line.Contains("Domain")))) {
            $lineArray = $line.Trim().Split(" ");
            if ($line.Contains(":")) {
              $includePropName = $line.Trim().Split(":")[1];
              $line += "`n`t`tpublic string $($lineArray[2])$($includePropName) { get; set; }";
            }
            elseif ($lineArray[2].Contains("Id")) {
              $line += "`n`t`tpublic string $($lineArray[2])Name { get; set; }";
            }
            $pos = $DtoString.IndexOf("namespace")
          }
          elseif ($line.Contains("bool") -or $line.Contains("string") -or $line.Contains("double") -or $line.Contains("int") -or $line.Contains("float") -or $line.Contains("DateTime") -or $line.Contains("decimal")) {
            $line = $line;
          }
          elseif ($line.Contains("public ")) {
            continue
          }
          $DtoString += $line + "`n"
        }
      }
    }
  }
  $path = "$($DtoPath)/$($EntityName)Dto.cs"
  if (!(Test-Path $path)) {
    $DtoString > $path 
  }
  else {
    Write-Host "`t¬ DTO zaten mevcut." -ForegroundColor  DarkBlue
  }
}