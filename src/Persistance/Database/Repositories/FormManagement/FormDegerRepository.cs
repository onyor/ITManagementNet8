﻿using ITX.Application.Repositories.FormManagement;
using ITX.Domain.Entities.FormManagement;
using ITX.Persistance.Database.Base;
using ITX.Persistance.Database.Context;

namespace ITX.Persistance.Repositories.FormManagement;

public class FormDegerRepository : EfRepositoryBase<FormDeger>, IFormDegerRepository
{
    public FormDegerRepository(ITManagementDbContext context) : base(context)
    {

    }
}