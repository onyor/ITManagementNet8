using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class LoginDto
    {
        [StringLength(255)]
        [Required(ErrorMessage = "Identity is required!")]
        //[EmailAddress]
        public string UserName { get; set; }

        [StringLength(20)]
        [Required(ErrorMessage = "Password is required!")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string CitizenNo { get; set; }
    }
}

