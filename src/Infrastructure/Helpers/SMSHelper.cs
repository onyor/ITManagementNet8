using Ardalis.Result;
using Azure.Core;
using DevExpress.Portable;
using DevExpress.XtraReports.Templates;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Helpers
{
    public class SMSParam
    {
        public string numbers { get; set; }
        public string message { get; set; }
        public string sd { get; set; } = "";
        public string ed { get; set; } = "";
    }

    public static class SMSHelper
    {
        public static string SMSUserName { get; set; } = "PRJ_PsikoSosyal";
        public static string SMSPassword { get; set; } = "6mGzHhLp";
        public static string SMSSericeURL { get; set; } = "https://servis3.gsb.gov.tr/TTMesajSmsRestServis/SendSms/SendSingle";

        public static Result SendSMS(SMSParam sMS)
        {
            try
            {
                var client = new RestClient(SMSSericeURL);
                var request = new RestRequest();
                request.Method = Method.Post;
                request.AddHeader("Content-Type", "application/json");
                request.AddHeader("Content-Length", Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sMS)).Length.ToString());
                request.AddHeader("Host", "gsb.gov.tr");
                request.AddHeader("Accept", "*/*");
                string AuthStr = Convert.ToBase64String(Encoding.UTF8.GetBytes(SMSUserName + ":" + SMSPassword));
                request.AddHeader("Authorization", "Basic " + AuthStr);
                request.AddBody(JsonConvert.SerializeObject(sMS), "application/json");
                RestResponse response = client.Execute(request);
                if (response.IsSuccessful)
                {
                    var responseData = JsonConvert.DeserializeObject<dynamic>(response.Content);
                    if (responseData["fault"] != null)
                        return Result.Error(responseData["fault"]["faultString"]);
                    else
                        return Result.Success();    
                }
                else
                    return Result.Error(response.ErrorMessage);
            }
            catch (Exception ex)
            {
                return Result.Error(ex.Message);
            }
        }
    }



}
