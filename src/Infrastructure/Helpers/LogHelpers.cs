using ITX.Application.Dtos.LogManagement;
using ITX.Application.Interfaces;
using ITX.Domain.Shared.Enums;
using System;
using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace ITX.Infrastructure.Helpers
{
    
    public class ApiLog
    {
        public long FieldId { get; set; }
        public string FieldName { get; set; }
        public string HataKod { get; set; }
        public string Fonksiyon { get; set; }
        public string Islem { get; set; }
        public EnmRequestLogTypeCode RequestLogTypeCodeId { get; set; }
        public bool IsSystem { get; set; }

    }

    public class LogResponse
    {
        private readonly IRequestLogService _requestLogService;

        private ObservableCollection<ApiLog> _apiLog;

        public LogResponse(IRequestLogService requestLogService)
        {
            _apiLog = new ObservableCollection<ApiLog>();
            _apiLog.CollectionChanged += ApiLog_CollectionChanged;
            _requestLogService = requestLogService;
        }

        public ObservableCollection<ApiLog> ApiLog
        {
            get { return _apiLog; }
            set
            {
                _apiLog = value;
                _apiLog.CollectionChanged += ApiLog_CollectionChanged;
            }
        }

        private async void ApiLog_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            try
            {
                if (e.Action == NotifyCollectionChangedAction.Add)
                {
                    // Burada eklenen öğeleri işleyebilirsiniz.
                    foreach (ApiLog log in e.NewItems)
                    {
                        _requestLogService.AddAsync(new RequestLogDto()
                        {
                            UserId = new Guid(),
                            UserIdAdSoyad = "",
                            RemoteIp = "",
                            Url = "",
                            CreatedAt = DateTime.Now,
                            FieldName = log.FieldName,
                            FieldId = log.FieldId,
                            Fonksiyon = log.Fonksiyon,
                            Islem = log.Islem,
                            RequestLogTypeCodeId = log.RequestLogTypeCodeId,
                            HataKod = log.HataKod,
                            IsSystem = log.IsSystem,
                            
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }


    
}
