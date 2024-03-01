function Add-ServicePack () {
    $Context = $requiredInfo.Context
    $EntityName = $requiredInfo.EntityName
    $Namespace = $requiredInfo.Namespace
    $EntityNameLower = $requiredInfo.EntityNameLower
    
    $nsAbstractService = "ITX.Application.Interfaces.$($Namespace)"
    $nsConcreteService = "ITX.Infrastructure.Data.Services.$($Namespace)"
    $nsModelEntity = "ITX.Domain.Entities.$($Namespace)";
    $nsModelDtos = "ITX.Application.Dtos.$($Namespace)";
    $pathAbstractService = "././Application/Interfaces/$($Namespace)"
    $pathConcreteService = "././Infrastructure/Data/Services/$($Namespace)"

    # Create Concrete Services directory if not exist
    if (!(Test-Path $pathConcreteService)) {
        New-Item -ItemType Directory -Force -Path $pathConcreteService
    }

    # Create Abstract Services directory if not exist
    if (!(Test-Path $pathAbstractService)) {
        New-Item -ItemType Directory -Force -Path $pathAbstractService
    }

    #region IService Code
    $iServiceFileText = @"
using ITX.Application.Dtos.$($Namespace);
using ITX.Domain.Entities.$($Namespace);

namespace $($nsAbstractService)
{
    public interface I$($EntityName)Service : IBaseService<$($EntityName), $($EntityName)Dto>
    {
        
    }
}
"@
    $iServicePath = "$($pathAbstractService)/I$($EntityName)Service.cs"
    if (!(Test-Path $iServicePath)) {
        $iServiceFileText > $iServicePath
    }
    else {
        Write-Host "`t¬ IService zaten mevcut." -ForegroundColor  DarkBlue
    }

    #endregion

    #region Service Code
    $serviceFileText = @"
using AutoMapper;
using ITX.Application.Dtos.$($Namespace);
using ITX.Application.Interfaces.$($Namespace);
using ITX.Application.Repositories.IBase;
using ITX.Application.Specifications;
using ITX.Domain.Entities.$($Namespace);
using ITX.Persistance.Database.Context;
using ITX.Infrastructure.Helpers;

namespace $($nsConcreteService)
{
    public class $($EntityName)Service : BaseService<$($EntityName), $($EntityName)Dto>, I$($EntityName)Service
    {
        public $($EntityName)Service(IMapper mapper, ITManagementDbContext context, IAsyncRepository<$($EntityName)> repository, IUnitOfWork unitOfWork, LogResponse logResponse) : base(mapper, context, repository, unitOfWork, logResponse)
        {
        }
    }
}
"@

    $servicePath = "$($pathConcreteService)/$($EntityName)Service.cs"
    if (!(Test-Path $servicePath)) {
        $serviceFileText | Out-File $servicePath -Encoding UTF8
    }
    else {
        Write-Host "`t¬ Service zaten mevcut." -ForegroundColor  DarkBlue
    }
    #endregion
}