using Nest;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Helpers.Classes
{
  public class  EkDosya
    {
        public string FileName { get; set; }
        public string MimeType = "application/pdf";
        public MemoryStream FileStream { get; set; }

    }
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string UserId { get; set; }
    }
    public class ServiceResult
    {
        public Boolean Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public string[] Errors { get; set; }
    }
    public class Meeting
    {
       
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int State { get; set; }
        public DateTime MeetingTime { get; set; }
        public object EndTime { get; set; }
        public string Url{ get=>
                "https://konferans.gsb.gov.tr/join/" + Id.ToString();
                }
    }
    public class MeetingResponse
    {
        public List<Meeting> Data { get; set; }
        public int Total { get; set; }
        public object AggregateResults { get; set; }
        public object Errors { get; set; }
    }
    public class Participant
    {
       
        public string Email { get; set; }
        public string TimeZone { get; set; }
        public string InviteLanguage { get; set; }
        public bool IsHost { get; set; }
        public string ParticipantToken { get; set; }
        public string Url { get; set; }
         
        
    }
    public class AddMeeting
    {
        public int Id { get; set; }
        public string MeetingId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsRepeatable { get; set; }
        public bool HasWaitingRoom { get; set; }
        public int Duration { get; set; }
        public bool HasNotification { get; set; }
        public bool GuestMode { get; set; }
        public bool IsPublic { get; set; }
        public bool IsPasswordProtected { get; set; }
        public bool IsDeviceShareRestricted { get; set; }
        public List<int> RepeatDays { get; set; }
        public string Password { get; set; }
        public DateTime RepeatEndTime { get; set; }
        public List<Participant> Participants { get; set; }
        public List<object> Translators { get; set; }
        public DateTime MeetingTime { get; set; }
    }
    public class MeetingData
    {
        public List<Participant> Participants { get; set; }
        public List<object> Translators { get; set; }
        public string MeetingId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime MeetingTime { get; set; }
        public int Duration { get; set; }
        public bool IsAutoRecorderEnabled { get; set; }
        public bool IsRepeatable { get; set; }
        public object RepeatDays { get; set; }
        public object RepeatEndTime { get; set; }
        public bool HasWaitingRoom { get; set; }
        public bool IsPublic { get; set; }
        public bool GuestMode { get; set; }
        public bool HasNotification { get; set; }
        public bool IsPasswordProtected { get; set; }
        public object Password { get; set; }
        public int DeviceRestriction { get; set; }
        public int TimeZoneOffset { get; set; }
        public bool PublicDraw { get; set; }
        public string Url
        {
            get =>
             "https://konferans.gsb.gov.tr/join/" + MeetingId.ToString();
        }
    }
}
