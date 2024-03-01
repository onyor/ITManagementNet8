function Add-Repository () {
    $Context = $requiredInfo.Context
    $EntityName = $requiredInfo.EntityName
    $Namespace = $requiredInfo.Namespace
    $EntityNameLower = $requiredInfo.EntityNameLower
    
    $nsAbstractRepository = "ITX.Application.Interfaces.$($Namespace)"
    $nsConcreteRepository = "ITX.Infrastructure.Data.Repositories.$($Namespace)"
    $nsModelEntity = "ITX.Domain.Entities.$($Namespace)";
    $nsModelDtos = "ITX.Application.Dtos.$($Namespace)";
    $pathAbstractRepository = "././Application/Repositories/$($Namespace)"
    $pathConcreteRepository = "././Persistance/Database/Repositories/$($Namespace)"

    # Create Concrete Repositorys directory if not exist
    if (!(Test-Path $pathConcreteRepository)) {
        New-Item -ItemType Directory -Force -Path $pathConcreteRepository
    }

    # Create Abstract Repositorys directory if not exist
    if (!(Test-Path $pathAbstractRepository)) {
        New-Item -ItemType Directory -Force -Path $pathAbstractRepository
    }

    #region IRepository Code
    $iRepositoryFileText = @"
using ITX.Application.Repositories.IBase;
using ITX.Domain.Entities.$($Namespace);

namespace $($nsAbstractRepository)
{
    public interface I$($EntityName)Repository : IAsyncRepository<$($EntityName)>
    {
        
    }
}
"@
    $iRepositoryPath = "$($pathAbstractRepository)/I$($EntityName)Repository.cs"
    if (!(Test-Path $iRepositoryPath)) {
        $iRepositoryFileText > $iRepositoryPath
    }
    else {
        Write-Host "`t¬ IRepository zaten mevcut." -ForegroundColor  DarkBlue
    }

    #endregion

    #region Repository Code
    $RepositoryFileText = @"
using ITX.Application.Interfaces.$($Namespace);
using ITX.Domain.Entities.$($Namespace);
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Data.Repositories.$($Namespace);
namespace $($nsConcreteRepository)
{
    public class $($EntityName)Repository : EfRepositoryBase<$($EntityName)>, I$($EntityName)Repository
    {
        public $($EntityName)Repository(ITManagementDbContext context) : base(context)
        {

        }
    }
}
"@

    $RepositoryPath = "$($pathConcreteRepository)/$($EntityName)Repository.cs"
    if (!(Test-Path $RepositoryPath)) {
        $RepositoryFileText | Out-File $RepositoryPath -Encoding UTF8
    }
    else {
        Write-Host "`t¬ Repository zaten mevcut." -ForegroundColor  DarkBlue
    }
    #endregion
}