using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ITX.Application;
using ITX.Application.Dtos.Predefined;
using ITX.Persistance.Database.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Helpers
{
    public class ApplicationDataManager
    {
        private readonly IMapper _mapper;
        private readonly ITManagementDbContext _context;

        public ApplicationDataManager(IMapper mapper, ITManagementDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task CityList()
        {
            var citys = await _context.Citys
                   .Where(x => x.IsDeleted == false)
                   .OrderBy(x => x.Name).ToListAsync();

            ApplicationData.CityList = _mapper.Map<List<CityDto>>(citys);
        }

        public async Task AppSettinglari()
        {
            var AppSettinglari = _context.AppSettings.Where(x => x.IsActive && !x.IsDeleted).OrderBy(x => x.Ad);
            ApplicationData.ApplicationSettings = _mapper.Map<List<AppSettingDto>>(AppSettinglari);
        }
    }
}
