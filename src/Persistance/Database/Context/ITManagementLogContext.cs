using ITX.Domain.Entities.LogManagement;
using Microsoft.EntityFrameworkCore;

namespace ITX.Persistance.Database.Context
{
    public class ITManagementLogContext : DbContext
    {
        public ITManagementLogContext(DbContextOptions<ITManagementLogContext> options)
            : base(options)
        {
        }

        public DbSet<RequestLog> RequestLogs { get; set; }
    }
}
