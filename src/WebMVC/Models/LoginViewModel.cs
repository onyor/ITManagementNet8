using System.Collections.ObjectModel;

namespace ITX.WebMVC.Models
{
    public class LoginViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string CitizenNo { get; set; }
        public bool IsValid { get; set; } = true;
    }

    public class ErrorObject
    {
        public string Field { get; set; }
        public string Message { get; set; }
    }

    public class ApiError
    {
        public string FieldName { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ErrorResponse
    {
        public ObservableCollection<ApiError> Errors { get; set; }
    }
}
