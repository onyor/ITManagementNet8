using Ardalis.Result;
using ITX.Application;
using ITX.Application.ViewModels;
using DevExpress.XtraRichEdit.SpellChecker;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ITX.Infrastructure.Helpers
{
    public static class HttpRequestTool
    {
        //https://learn.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-7.0
        public static async Task<Result<string>> HttpRequestAsync(
            string source,
            HttpMethod requestType,
            HttpClient httpClient,
            Object requestData
            )
        {
            try
            {
                var response = "";
                var jsonModel = JsonSerializer.Serialize(requestData);
                var todoItemJson = new StringContent(
                    jsonModel,
                    Encoding.UTF8, "application/json"
                );

                var httpResponseMessage = await httpClient.PostAsync(source, todoItemJson);

                using var contentStream =
                     await httpResponseMessage.Content.ReadAsStreamAsync();

                using (StreamReader reader = new StreamReader(contentStream))
                {
                    response = reader.ReadToEnd();
                }

                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    return Result<string>.Success(response);
                }
                else
                {
                    //if(httpResponseMessage.StatusCode == HttpStatusCode.NotFound)
                    //    return Result<string>.Error("Sunucu Bulunamadı");

                    return Result<string>.Error(response);
                }
            }
            catch (Exception ex)
            {
                return Result<string>.Error(ex.Message);
            }
        }
    }
}
