using ITX.Application.Dtos.Predefined;
using ITX.Application.ViewModels;
using Ardalis.Result;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ITX.Domain.Entities.Predefined;

namespace ITX.Application.Interfaces.Predefined
{
    public interface IDistrictService : IBaseService<District, DistrictDto>
    {

    }
}
