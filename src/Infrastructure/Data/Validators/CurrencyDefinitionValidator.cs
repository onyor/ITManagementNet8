using FluentValidation;
using ITX.Domain.Entities.Predefined;
using ITX.Shared.Extensions;

namespace ITX.Infrastructure.Data.Validators
{
    public class CurrencyDefinitionValidator : BaseValidator<CurrencyDefinition>
    {
        public CurrencyDefinitionValidator()
        {
            RuleFor(m => m.Name)
               .NotEmpty().WithMessage("Ad is required.")
               .MaximumLength(5).WithMessage("Name must not exceed 100 characters");
            RuleFor(m => m.ShortName)
                .NotEmpty().WithMessage("{PropertyName} is required.");
        }
    }
}
