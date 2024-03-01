using FluentValidation;
using ITX.Domain.Entities.Predefined;
using ITX.Shared.Extensions;

namespace ITX.Infrastructure.Data.Validators
{
    public class AppSettingValidator : BaseValidator<AppSetting>
    {
        public AppSettingValidator()
        {
            RuleFor(x => x.Ad)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.")
                .MaximumLength(100).WithMessage("{PropertyName} en fazla 100 karakter olabilir.");
        }
    }
}
