$Context = Read-Host "Enter DbContext Name [Default: 'ITManagementDbContext']"
if ($Context.Trim() -eq "") {
    $Context = "ITManagementDbContext"
}

Write-Host ""
Write-Host "Update Database..."
Write-Host ""

dotnet ef database update -c $Context -p Persistance -s WebAPI