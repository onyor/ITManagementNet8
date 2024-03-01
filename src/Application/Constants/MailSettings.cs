using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Application.Constants
{
    public class MailSettings
    {
        public static string SmtpServer { get; set; }
        public static string SmtpPort { get; set; }
        public static string SmtpUsername { get; set; }
        public static string SmtpPassword { get; set; }
        public static string SenderName { get; set; }
        public static bool UseDefaultCredentials { get; set; }
        public static bool EnableSsl { get; set; }
    }
}
