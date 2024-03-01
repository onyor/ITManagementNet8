using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class RegisterDto
    {
        [StringLength(40)]
        [Required]
        public string Name { get; set; }

        [StringLength(40)]
        [Required]
        public string Surname { get; set; }

        [StringLength(40)]
        public string Title { get; set; }

        [StringLength(255)]
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(20)]
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}

