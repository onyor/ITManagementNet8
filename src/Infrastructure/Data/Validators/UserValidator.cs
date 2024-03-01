using FluentValidation;
using ITX.Domain.Entities.Identity;

namespace ITX.Infrastructure.Data.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(m => m.Name)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .MaximumLength(40).WithMessage("Name must not exceed 40 characters");
            RuleFor(m => m.Surname)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .MaximumLength(40).WithMessage("Surname must not exceed 40 characters");
            RuleFor(m => m.Email)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .MaximumLength(255).WithMessage("{PropertyName} must not exceed 255 characters")
                .EmailAddress().WithMessage("{PropertyValue} is not a valid email");
            RuleFor(m => m.Title)
                .MaximumLength(40).WithMessage("{PropertyName} must not exceed 40 characters");
        }
    }
}
