using FluentValidation;
using ITX.Domain.Entities.Identity;

namespace ITX.Infrastructure.Data.Validators
{
    public class MenuValidator : AbstractValidator<Menu>
    {
        public MenuValidator() : base()
        {
            //RuleFor(m => m.Name)
                //.NotEmpty().WithMessage("Name is required.")
                //.MaximumLength(100).WithMessage("Name must not exceed 100 characters");
            //RuleFor(m => m.Order)
            //    .NotEmpty().WithMessage("{PropertyName} is required.");
            RuleFor(m => m.Icon)
                .MaximumLength(100).WithMessage("Icon must not exceed 100 characters");
            RuleFor(m => m.Url)
                .MaximumLength(100).WithMessage("Icon must not exceed 100 characters");
            //RuleFor(m => m.Description)
            //    .MaximumLength(255).WithMessage("Icon must not exceed 255 characters");
            RuleFor(m => m.Param)
                .MaximumLength(100).WithMessage("Icon must not exceed 100 characters");
        }
    }
}
