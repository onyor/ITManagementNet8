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

Write-Host ""
Write-Host "Creating Migration..."
Write-Host ""

dotnet ef migrations add $Name -c $Context -p Persistance -s WebAPI -o Database/Migrations --verbose

# dotnet ef migrations add $Name -c ITManagementDbContext -p Persistance -s WebAPI -o Data/Migrations