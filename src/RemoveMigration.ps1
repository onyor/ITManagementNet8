Write-Host ""
$Context = Read-Host "Enter DbContext Name [Default: 'ITManagementDbContext']"
Write-Host ""
if ($Context.Trim() -eq "") {
    $Context = "ITManagementDbContext"
}
Write-Host ""
Write-Host "Removing last Migration..."
Write-Host ""
dotnet ef migrations remove -c $Context -p Persistance -s WebAPI