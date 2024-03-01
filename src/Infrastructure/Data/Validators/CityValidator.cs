using FluentValidation;
using ITX.Domain.Entities.Predefined;
using ITX.Shared.Extensions;

namespace ITX.Infrastructure.Data.Validators
{
    public class CityValidator : BaseValidator<City>
    {
        public CityValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.")
                .MaximumLength(100).WithMessage("{PropertyName} en fazla 100 karakter olabilir.");
            RuleFor(x => x.CountryId)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.");
            RuleFor(x => x.Code)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.")
                .MaximumLength(100).WithMessage("{PropertyName} en fazla 100 karakter olabilir.");
            RuleFor(x => x.PhoneCode)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.")
                .MaximumLength(100).WithMessage("{PropertyName} en fazla 100 karakter olabilir.");

        }
    }
}
