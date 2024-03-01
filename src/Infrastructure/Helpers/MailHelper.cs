using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using ITX.Application.Constants;
using Ardalis.Result;
using System.IO;

namespace ITX.Infrastructure.Helpers
{
    public class MailSendDto
    {
        public string subject { get; set; }
        public string body { get; set; }
        public string toMailAddress { get; set; }
        public string bccMailAddress { get; set; }
        public List<MailAttachFile>? AttachFileList { get; set; }
    }

    public class MailAttachFile
    {
        public string FilePathAndFileName { get; set; }
        public string AttachFileTitle { get; set; }
    }

    public static class MailHelper
    {
        static string SmtpServer = MailSettings.SmtpServer;
        static string SmtpPort = MailSettings.SmtpPort;
        static string SendMailAddress = MailSettings.SmtpUsername;
        static string SendMailPassword = MailSettings.SmtpPassword;
        static string SenderName = MailSettings.SenderName;
        static bool EnableSsl = MailSettings.EnableSsl;
        static bool UseDefaultCredentials = MailSettings.UseDefaultCredentials;

        public static Result MailSend(MailSendDto MailModel)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress(SendMailAddress, SenderName);
                message.Subject = MailModel.subject;
                message.Body = MailModel.body;
                SmtpClient client = new SmtpClient(SmtpServer, int.Parse(SmtpPort));
                client.EnableSsl = EnableSsl;
                client.UseDefaultCredentials = UseDefaultCredentials;
                client.Credentials = new NetworkCredential(SendMailAddress, SendMailPassword);
                message.IsBodyHtml = true;
                if (!string.IsNullOrWhiteSpace(MailModel.toMailAddress))
                    foreach (var item in MailModel.toMailAddress.Split(';'))
                        if (!string.IsNullOrEmpty(item))
                            message.To.Add(item);
                if (!string.IsNullOrWhiteSpace(MailModel.bccMailAddress))
                    foreach (var item in MailModel.bccMailAddress.Split(';'))
                        if (!string.IsNullOrEmpty(item))
                            message.Bcc.Add(item);

                if (MailModel.AttachFileList != null && MailModel.AttachFileList.Count() > 0)
                    foreach (var attachFile in MailModel.AttachFileList)
                    {
                        try
                        {
                            if (!string.IsNullOrEmpty(attachFile.FilePathAndFileName))
                            {
                                if (string.IsNullOrEmpty(attachFile.FilePathAndFileName))
                                    message.Attachments.Add(new Attachment(attachFile.FilePathAndFileName));
                                else
                                {
                                    FileInfo oFileInfo = new FileInfo(attachFile.FilePathAndFileName);
                                    FileStream fStream = File.OpenRead(attachFile.FilePathAndFileName);
                                    message.Attachments.Add(new Attachment(fStream, attachFile.AttachFileTitle + oFileInfo.Extension));
                                }
                            }
                        }
                        catch (Exception ex)
                        {
                            return Result.Error("Dosya Okunamadı");
                        }
                    }
                client.Send(message);
                return Result.Success();

            }
            catch (Exception ex)
            {
                return Result.Error(ex.Message);
            }
        }

        /*public static bool SendEmail(string toEmail, string subject, string body)
        {
            try
            {
                // E-posta ayarları
                string smtpAddress = "smtp.gmail.com";
                int portNumber = 587;
                bool enableSSL = true;

                string emailFrom = "youremail@gmail.com";
                string password = "yourpassword";
                string emailTo = toEmail;

                // MailMessage ve SmtpClient nesneleri oluşturuluyor.
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(emailFrom);
                    mail.To.Add(emailTo);
                    mail.Subject = subject;
                    mail.Body = body;
                    mail.IsBodyHtml = true;

                    using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                    {
                        smtp.Credentials = new NetworkCredential(emailFrom, password);
                        smtp.EnableSsl = enableSSL;
                        smtp.Send(mail);
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Email could not be sent: " + ex.Message);
                return false;
            }
        }*/
    }
}
