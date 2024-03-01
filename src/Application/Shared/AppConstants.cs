using Microsoft.Extensions.Configuration;
using ITX.Application;
namespace ITX.Application.Shared
{
    public static class AppConstants
    {
        //#if DEBUG
        //        public static string API_BASE = ApplicationData.ApiLocalBaseURL;
        //#else
        //        public static string API_BASE = ApplicationData.ApiProdBaseURL;
        //#endif


        public const int MaxImageSize = 1 * 1024 * 1024; // 1 MB
        public static readonly string[] AcceptedImageTypes = new[]
            { ".jpg", ".jpeg", ".png", ".jfif" };
    }


    public static class ROL_LISTESI
    {
        public const string
            DEVELOPER = "Developer",
            ADMIN = "Admin",
            AKRANREHBERİ = "Akran Rehberi",
            BOLGESORUMLUSU = "Bölge Sorumlusu",
            DANISAN = "Danışan",
            DANISMAN = "Danışman",
            ILKOORDINATORU = "İl Koordinatörü",
            KOORDINATOR = "Koordinatör",
            UYGULAMAYONETICISI = "Uygulama Yöneticisi",
            CREATE_USER = "Create User",
            EDIT_USER = "Edit User",
            CREATE_ROLE = "Create Role",
            EDIT_ROLE = "Edit Role";
    }
}
