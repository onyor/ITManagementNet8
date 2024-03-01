using System.ComponentModel.DataAnnotations;

namespace ITX.Application.Dtos.Identity
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Şimdiki parola gereklidir!")]
        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = "Yeni parola gereklidir!")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Yeni parola (tekrar) gereklidir!")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Yeni parola ve takrar alanlarİ eşleşmelidir")]
        public string ConfirmNewPassword { get; set; }
    }
}

