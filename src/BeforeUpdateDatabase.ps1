Write-Host ""
$Name = Read-Host "Please Enter Migration Name [Required]"

if ($Name.Trim() -eq "") {
    Write-Host ""
    Write-Host "Migration Name Is Required!"
    Exit
}

Write-Host ""

$Context = Read-Host "Enter DbContext Name [Default: 'ITManagementDbContext']"
if ($Context.Trim() -eq "") {
    $Context = "ITManagementDbContext"
}


dotnet ef database update -c $Context -p Persistance -s WebAPI $Name