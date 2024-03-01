using Ardalis.Result;
using DevExpress.Charts.Native;
using DevExpress.XtraPrinting.Native;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Nest;
using Newtonsoft.Json;
using ITX.Infrastructure.Helpers;
using ITX.Infrastructure.Helpers.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;


namespace ITX.Infrastructure.ExternalServices
{
    public static class VimeService
    {
        public async static Task<ServiceResult> GetToken()
        {
            var client = new HttpClient();
            var apiUrl = "https://konferans.gsb.gov.tr/api/login/app";
            var veri = new
            {
                username = "demoapiuser",
                password = "1GsB20!!23**"
            };

            var json = JsonConvert.SerializeObject(veri);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync(apiUrl, data);

            string sonuc = await response.Content.ReadAsStringAsync();


            ServiceResult oResult = new ServiceResult();
            AuthenticationResponse serviceData = JsonConvert.DeserializeObject<AuthenticationResponse>(sonuc);
            oResult.Success = true;
            oResult.Data = serviceData.Token;
            return oResult;
        }
        public async static Task<ServiceResult> MeetingList()
        {
            var client = new HttpClient();
            string bearerToken = GetToken().Result.Data.ToString();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var apiUrl = "https://konferans.gsb.gov.tr/api/MeetingManagement/List";

            var response = await client.GetAsync(apiUrl);

            string sonuc = await response.Content.ReadAsStringAsync();
            ServiceResult oResult = new ServiceResult();
            oResult.Success = true;
            MeetingResponse meetingResponse = JsonConvert.DeserializeObject<MeetingResponse>(sonuc);

            oResult.Data = (List<Meeting>)meetingResponse.Data;

            return oResult;
        }
        public async static Task<ServiceResult> GetMeetingById(string Id)
        {
            var client = new HttpClient();
            string bearerToken = GetToken().Result.Data.ToString();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var apiUrl = "https://konferans.gsb.gov.tr/api/MeetingManagement/" + Id.ToString();

            var response = await client.GetAsync(apiUrl);

            string sonuc = await response.Content.ReadAsStringAsync();
            ServiceResult oResult = new ServiceResult();
            oResult.Success = true;
            Meeting meetingResponse = JsonConvert.DeserializeObject<Meeting>(sonuc);

            oResult.Data = (Meeting)meetingResponse;

            return oResult;
        }

        public async static Task<ServiceResult> DeleteMeetingById(string Id)
        {
            var client = new HttpClient();
            string bearerToken = GetToken().Result.Data.ToString();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var apiUrl = "https://konferans.gsb.gov.tr/api/MeetingManagement/" + Id.ToString();
            var response = await client.DeleteAsync(apiUrl);
            string sonuc = await response.Content.ReadAsStringAsync();
            ServiceResult oResult = new ServiceResult();
            oResult.Success = true;
            Meeting meetingResponse = JsonConvert.DeserializeObject<Meeting>(sonuc);
            oResult.Data = (Meeting)meetingResponse;
            return oResult;
        }

        public async static Task<ServiceResult> CreateMeeting(string Title, string Description, DateTime StartDate, string HostMail, List<string> MailList, int Duration = 60)
        {            
            var client = new HttpClient();
            string bearerToken = GetToken().Result.Data.ToString();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var apiUrl = "https://konferans.gsb.gov.tr/api/MeetingManagement";
            List<object> Partipiciants = new List<object>();
            Partipiciants.Add(new Participant
            {
                Email = HostMail,
                InviteLanguage = "en",
                TimeZone = "Europe/Istanbul",
                IsHost = true
            });

            foreach (var item in MailList)
                Partipiciants.Add(new Participant
                {
                    Email = item,
                    InviteLanguage = "en",
                    TimeZone = "Europe/Istanbul",
                    IsHost = false
                });

            DateTimeOffset utcDate = StartDate.ToUniversalTime();
            // Zamanı "yyyy-MM-ddTHH:mm:ssZ" formatında yazdır
            string formattedDate = utcDate.ToString("yyyy-MM-ddTHH:mm:ssZ");
            var veri = new
            {
                Id = 0,
                Title = Title,
                Description = Description,
                Duration = Duration,
                Participants = Partipiciants,
                MeetingTime = formattedDate,
                IsRepeatable = false,
                HasWaitingRoom = false,
                IsPublic = false,
                GuestMode = false,
                State = 1
            };
            var json = JsonConvert.SerializeObject(veri);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(apiUrl, data);
            string sonuc = await response.Content.ReadAsStringAsync();
            ServiceResult oResult = new ServiceResult();
            MeetingData meetingResponse = JsonConvert.DeserializeObject<MeetingData>(sonuc);
            foreach (var item in meetingResponse.Participants)
                item.Url = "https://konferans.gsb.gov.tr/join/" + meetingResponse.MeetingId + "/" + item.ParticipantToken;
            oResult.Success = true;
            oResult.Data = meetingResponse;
            return oResult;
        }

        public async static Task<ServiceResult> EditMeeting(Guid MeetingId, string Title, string Description, DateTime StartDate, string HostMail, List<string> MailList, int Duration = 60)
        {
            var client = new HttpClient();
            string bearerToken = GetToken().Result.Data.ToString();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var apiUrl = "https://konferans.gsb.gov.tr/api/MeetingManagement/" + MeetingId.ToString();
            List<object> Partipiciants = new List<object>();
            Partipiciants.Add(new Participant
            {
                Email = HostMail,
                InviteLanguage = "en",
                TimeZone = "Europe/Istanbul",
                IsHost = true
            });

            foreach (var item in MailList)
                Partipiciants.Add(new Participant
                {
                    Email = item,
                    InviteLanguage = "en",
                    TimeZone = "Europe/Istanbul",
                    IsHost = false
                });
            DateTimeOffset utcDate = StartDate.ToUniversalTime();
            // Zamanı "yyyy-MM-ddTHH:mm:ssZ" formatında yazdır
            string formattedDate = utcDate.ToString("yyyy-MM-ddTHH:mm:ssZ");
            var veri = new
            {
                Title = Title,
                Description = Description,
                Duration = Duration,
                Participants = Partipiciants,
                MeetingTime = formattedDate,
                IsRepeatable = false,
                HasWaitingRoom = false,
                IsPublic = false,
                GuestMode = false,
                State = 1
            };
            var json = JsonConvert.SerializeObject(veri);
            var data = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.PutAsync(apiUrl, data);
            string sonuc = await response.Content.ReadAsStringAsync();
            ServiceResult oResult = new ServiceResult();
            MeetingData meetingResponse = JsonConvert.DeserializeObject<MeetingData>(sonuc);
            meetingResponse.MeetingId = MeetingId.ToString();
            foreach (var item in meetingResponse.Participants)
                item.Url = "https://konferans.gsb.gov.tr/join/" + MeetingId.ToString() + "/" + item.ParticipantToken;
            oResult.Success = true;
            oResult.Data = meetingResponse;
            return oResult;
        }
    }
}
