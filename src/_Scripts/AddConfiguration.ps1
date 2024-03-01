function Add-Configuration () {
    $EntityName=$requiredInfo.EntityName
    $Namespace=$requiredInfo.Namespace
    
    $filePath = "././Persistance/Database/Configurations"

    $validatorFileText = @"
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ITX.Domain.Entities.$($Namespace);

namespace ITX.Infrastructure.Data.Configurations
{
    public class $($EntityName)Configuration : IEntityTypeConfiguration<$($EntityName)>
    {
        public void Configure(EntityTypeBuilder<$($EntityName)> builder)
        {
            builder.ToTable("$($EntityName)");
            builder.HasKey(x => x.Id);
        }
    }
}
"@
    $path = "$($filePath)/$($EntityName)Configuration.cs"
    if (!(Test-Path $path)) {
        $validatorFileText > $path
    }
    else {
        Write-Host "`t¬ Configuration zaten mevcut." -ForegroundColor  DarkBlue
    }
}