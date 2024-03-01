using ITX.Application.Dtos.LogManagement;
using ITX.Application.Interfaces;
using ITX.Domain.Shared.Enums;
using System;
using System.Collections.ObjectModel;
using System.Collections.Specialized;

namespace ITX.WebAPI.Helpers
{

    public class ApiResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
    }
    public class ApiError
    {
        public string FieldName { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ErrorResponse
    {
        private readonly IRequestLogService _requestLogService;

        private ObservableCollection<ApiError> _errors;

        public ErrorResponse(IRequestLogService requestLogService)
        {
            _errors = new ObservableCollection<ApiError>();
            _errors.CollectionChanged += Errors_CollectionChanged;
            _requestLogService = requestLogService;
        }

        public ObservableCollection<ApiError> Errors
        {
            get { return _errors; }
            set
            {
                _errors = value;
                _errors.CollectionChanged += Errors_CollectionChanged;
            }
        }

        private async void Errors_CollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            try
            {
                if (e.Action == NotifyCollectionChangedAction.Add)
                {
                    // Burada eklenen öğeleri işleyebilirsiniz.
                    foreach (ApiError error in e.NewItems)
                    {
                        //error.ErrorMessage
                         _requestLogService.AddAsync(new RequestLogDto()
                        {
                            UserId = new Guid(),
                            UserIdAdSoyad = "",
                            RemoteIp = "",
                            Url = "/Account/Login",
                            CreatedAt = DateTime.Now,
                            FieldName = error.FieldName,
                            Fonksiyon = "",
                            Islem = error.ErrorMessage,
                            RequestLogTypeCodeId = EnmRequestLogTypeCode.Hatali,
                            LogTypeAd = "",
                            HataKod = "",
                            IsSystem = true,
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
