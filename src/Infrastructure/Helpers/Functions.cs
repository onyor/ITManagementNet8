using Ardalis.Result;
using Ardalis.Specification;
using ITX.Application;
using ITX.Domain.Shared.Enums;
using ITX.Infrastructure.Helpers.Classes;
using DevExpress.Charts.Native;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;
using System.DirectoryServices.Protocols;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using ITX.Persistance.Extensions;

namespace ITX.Infrastructure.Tools
{

    public class Functions

    {
        enum Phase { Years, Months, Days, Done }
        //----------------------------------------------------------------------
        // Date Utilies: Serdar
        public struct DateTimeSpan
        {
            public int Years { get; }
            public int Months { get; }
            public int Days { get; }
            public int Hours { get; }
            public int Minutes { get; }
            public int Seconds { get; }
            public int Milliseconds { get; }

            public DateTimeSpan(int years, int months, int days, int hours, int minutes, int seconds, int milliseconds)
            {
                Years = years;
                Months = months;
                Days = days;
                Hours = hours;
                Minutes = minutes;
                Seconds = seconds;
                Milliseconds = milliseconds;
            }
            public static DateTimeSpan CompareDates(DateTime date1, DateTime date2)
            {
                if (date2 < date1)
                {
                    var sub = date1;
                    date1 = date2;
                    date2 = sub;
                }

                DateTime current = date1;
                int years = 0;
                int months = 0;
                int days = 0;

                Phase phase = Phase.Years;
                DateTimeSpan span = new DateTimeSpan();
                int officialDay = current.Day;

                while (phase != Phase.Done)
                {
                    switch (phase)
                    {
                        case Phase.Years:
                            if (current.AddYears(years + 1) > date2)
                            {
                                phase = Phase.Months;
                                current = current.AddYears(years);
                            }
                            else
                            {
                                years++;
                            }
                            break;
                        case Phase.Months:
                            if (current.AddMonths(months + 1) > date2)
                            {
                                phase = Phase.Days;
                                current = current.AddMonths(months);
                                if (current.Day < officialDay && officialDay <= DateTime.DaysInMonth(current.Year, current.Month))
                                    current = current.AddDays(officialDay - current.Day);
                            }
                            else
                            {
                                months++;
                            }
                            break;
                        case Phase.Days:
                            if (current.AddDays(days + 1) > date2)
                            {
                                current = current.AddDays(days);
                                var timespan = date2 - current;
                                span = new DateTimeSpan(years, months, days, timespan.Hours, timespan.Minutes, timespan.Seconds, timespan.Milliseconds);
                                phase = Phase.Done;
                            }
                            else
                            {
                                days++;
                            }
                            break;
                    }
                }

                return span;
            }

            public static int GetSgkDayCountBetweenDates(DateTime d1, DateTime d2)
            {
                var dateTimeSpan = CompareDates(d1, d2);
                return dateTimeSpan.Years * 360 + dateTimeSpan.Months * 30 + dateTimeSpan.Days;
            }
        }
        public static string Encrypt(string source)
        {
            string key = ApplicationData.EncKey;
            source += "|" + DateTime.Now.ToString();
            var byteHash = MD5.HashData(Encoding.UTF8.GetBytes(key));
            var tripleDes = new TripleDESCryptoServiceProvider
            {
                Key = byteHash,
                Mode = CipherMode.ECB
            };

            var byteBuff = Encoding.UTF8.GetBytes(source);
            return Convert.ToBase64String(tripleDes.CreateEncryptor()
                .TransformFinalBlock(byteBuff, 0, byteBuff.Length));
        }
        public static bool PasswordCheck(HttpRequest Request)
        {
            string xcontrolvalue = string.Empty;
            if (Request.Headers.TryGetValue("controlvalue", out var controlvalue))
            {
                xcontrolvalue = controlvalue;
            };
            var sifreCoz = Functions.Dencrypt(xcontrolvalue);
            return !string.IsNullOrEmpty(sifreCoz);
        }
        public static string Dencrypt(string encodedText)
        {
            string key = ApplicationData.EncKey;
            var byteHash = MD5.HashData(Encoding.UTF8.GetBytes(key));
            var tripleDes = new TripleDESCryptoServiceProvider
            {
                Key = byteHash,
                Mode = CipherMode.ECB
            };
            var byteBuff = Convert.FromBase64String(encodedText);
            string data = Encoding.UTF8.GetString(
                tripleDes
                    .CreateDecryptor()
                    .TransformFinalBlock(byteBuff, 0, byteBuff.Length));
            string encodedData = "";
            string[] datax = data.Split('|');
            if (datax.Length > 1)
            {
                DateTime dateTimeCreated = DateTime.Parse(datax[1]);
                TimeSpan value = DateTime.Now.Subtract(dateTimeCreated);
                if (value.TotalSeconds > 0 && value.TotalSeconds < 10)
                    encodedData = datax[0];
            }
            return encodedData;
        }

        public static string mysfDCLocator(string pDomainAd)
        {
            try
            {
                DirectoryContext mycontext = new DirectoryContext(DirectoryContextType.Domain, pDomainAd);
                DomainController dc = DomainController.FindOne(mycontext);
                IPAddress DCIPAdress = IPAddress.Parse(dc.IPAddress);
                return DCIPAdress.ToString();
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        public static string mysfADAuthenticate(string userName, string password)
        {
            string domainAd = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "DomainAd").FirstOrDefault().Deger;
            string domainIp = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "DomainIp").FirstOrDefault().Deger;
            DateTime dtBasTar = DateTime.Now;
            string authentic = "";

            if (domainAd == "" || domainIp == "")
                return "";
            string[] domainList = domainIp.Split(';');
            //if (string.IsNullOrEmpty(domain))
            //    domain = mysfDCLocator(domainAd);

            //if (domain == "")
            //    return "LDAP Erişim Hatası";

            userName = domainAd + @"\" + userName;
            foreach (var domain in domainList)
            {
                try
                {
                    DirectoryEntry entry = new DirectoryEntry("LDAP://" + domain, userName, password);
                    try
                    {
                        object nativeObject = entry.NativeObject;
                        if (password == "123456")
                            authentic = "123456 Hatası";
                        else
                            authentic = "";
                        if (authentic == "")
                            break;
                    }
                    catch (Exception ex)
                    {
                        authentic = "LDAP Kullanıcı Hatası";
                    }// ex.Message
                }

                catch (DirectoryServicesCOMException generatedExceptionName)
                {
                    authentic = "Giriş Hatası";
                }
            }
            // generatedExceptionName.Message

            //if (authentic != "")
            //    authentic =  OpenLdapKontrol("10.10.1.172", 389, userName, password);
            return authentic;
        }


        public static string SendMail(string receipments, string subject, string body, List<string> ekler, string ccList)
        {
            string oStatus = "";

            try
            {
                string domainAd = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "DomainAd").FirstOrDefault().Deger;
                string MailUserName = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimAdres").FirstOrDefault().Deger;
                string MailAdres = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimAdres").FirstOrDefault().Deger;
                string SmtpServer = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimSunucu").FirstOrDefault().Deger;
                string SmtpPort = "587";
                string MailPassword = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimSifre").FirstOrDefault().Deger;
                MailMessage message = new MailMessage();
                message.From = new MailAddress(MailAdres, "İnsan Kaynakları Uygulaması");
                message.Subject = subject;
                message.Body = body;
                SmtpClient client = new SmtpClient(SmtpServer, int.Parse(SmtpPort));
                client.UseDefaultCredentials = false;
                client.EnableSsl = false;
                client.Credentials = new NetworkCredential(MailUserName, MailPassword, domainAd);
                message.IsBodyHtml = true;

                foreach (var address in receipments.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    message.To.Add(address);

                }
                foreach (var address in ccList.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    message.CC.Add(address);

                }
                //message.Bcc.Add("info@motivationbuttons.com");
                foreach (var item in ekler)
                {
                    var atachItem = new Attachment(item);
                    message.Attachments.Add(atachItem);

                }


                client.Send(message);
                oStatus = "";

            }
            catch (Exception ex)
            {
                oStatus = "Mail Gönderim Hatalı: " + ex.Message;


            }
            return oStatus;
        }
        public static string SendMailMS(string receipments, string subject, string body, List<EkDosya> ekler, string ccList = "")
        {
            string oStatus = "";

            try
            {
                string domainAd = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "DomainAd").FirstOrDefault().Deger;
                string MailUserName = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimUserName").FirstOrDefault().Deger;
                string MailAdres = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimAdres").FirstOrDefault().Deger;
                string SmtpServer = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimSunucu").FirstOrDefault().Deger;
                string SmtpPort = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimPort").FirstOrDefault().Deger;
                string MailPassword = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimSifre").FirstOrDefault().Deger;
                MailMessage message = new MailMessage();
                message.From = new MailAddress(MailAdres, "İnsan Kaynakları Uygulaması");
                message.Subject = subject;
                message.Body = body;
                SmtpClient client = new SmtpClient(SmtpServer, int.Parse(SmtpPort));
                client.UseDefaultCredentials = false;
                bool MaasPostaGonderimSSL = Application.ApplicationData.ApplicationSettings.Where(x => x.Ad == "MaasPostaGonderimSSL").FirstOrDefault().Deger.xToBool();

                client.EnableSsl = MaasPostaGonderimSSL; 
                client.Credentials = new NetworkCredential(MailUserName, MailPassword, domainAd);
                message.IsBodyHtml = true;

                foreach (var address in receipments.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    message.To.Add(address);

                }
                //message.Bcc.Add("info@motivationbuttons.com");
                if (ekler != null)
                {
                    foreach (var item in ekler)
                    {
                        var atachItem = new Attachment(item.FileStream, item.FileName, item.MimeType);
                        message.Attachments.Add(atachItem);

                    }
                }

                foreach (var address in ccList.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    message.CC.Add(address);
                }

                client.Send(message);
                oStatus = "";

            }
            catch (Exception ex)
            {
                oStatus = "Mail Gönderim Hatalı: " + ex.Message;
            }
            return oStatus;
        }
        public static DataSet getDataFromFile(byte[] fileBytes)
        {
            DataSet result = new DataSet();
            try
            {
                Stream stream = new MemoryStream(fileBytes);
                System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    result = reader.AsDataSet();
                }

            }
            catch (Exception ex)
            {


            }
            return result;
        }
    }

}