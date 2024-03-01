using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class ResetPasswordDto
    {
        [Required]
        [EmailAddress]
        [StringLength(256)]
        public string Email { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "Parola en az {2} en fazla {1} uzunluğunda olmalıdır.", MinimumLength = 8)]
        [DataType(DataType.Password)]        
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
    }
}

