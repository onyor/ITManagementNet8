using FluentValidation;
using ITX.Domain.Entities.Predefined;
using ITX.Shared.Extensions;

namespace ITX.Infrastructure.Data.Validators
{
    public class AnnounceValidator : BaseValidator<Announce>
    {
        public AnnounceValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("{PropertyName} boş bırakılamaz.")
                .MaximumLength(100).WithMessage("{PropertyName} en fazla 100 karakter olabilir.");
        }
    }
}
