using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace ITX.Application.ViewModels
{
    public class DataTableViewModel
    {
        public long? UstId { get; set; }
        public DateTime? BasTar { get; set; }
        public DateTime? BitTar { get; set; }
        public string SortColumn { get; set; }
        public string SortColumnDirection { get; set; }
        public string SearchValue { get; set; }
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public string Draw { get; set; }
        public List<string> ColumnList { get; set; }
        public List<string> SearchList { get; set; }
        public List<string> DomainList { get; set; }

        public DataTableViewModel()
        {
        }

        public DataTableViewModel(HttpRequest request)
        {
            try
            {
                ColumnList = new List<string>();
                SearchList = new List<string>();
                DomainList = new List<string>();

                Draw = request.Form["draw"].FirstOrDefault();
                var start = request.Form["start"].FirstOrDefault();
                var length = request.Form["length"].FirstOrDefault();
                SortColumn = request.Form["columns[" + request.Form["order[0][column]"].FirstOrDefault() + "][data]"].FirstOrDefault();
                SortColumnDirection = request.Form["order[0][dir]"].FirstOrDefault();
                SearchValue = request.Form["search[value]"].FirstOrDefault();
                PageSize = Math.Min(length != null ? Convert.ToInt32(length) : 10, 1000);
                Skip = start != null ? Convert.ToInt32(start) : 0;
                var columnCount = request.Form.Where(x => x.Key.Contains("columns")).Count() / 6;

                for (int i = 0; i < columnCount; i++)
                {
                    string name = request.Form["columns[" + i + "][name]"].FirstOrDefault();
                    string colAd = request.Form["columns[" + i + "][data]"].FirstOrDefault();
                    string listAd = request.Form["columns[" + i + "][data]"].FirstOrDefault();
                    if (colAd != null && colAd != "" && name != "false")
                    {
                        if (colAd.Contains("Id"))
                        {
                            if (colAd.IndexOf("Id") + 2 != colAd.Length && !name.Contains("Form_") && !name.Contains("Enum_") && !name.Contains("Domain_"))
                            {
                                colAd = colAd.Substring(0, colAd.IndexOf("Id")) + "." + colAd.Substring(colAd.IndexOf("Id") + 2);
                            }
                        }

                        colAd = colAd.Substring(0, 1).ToUpper(new CultureInfo("en-US", false)) + colAd.Substring(1);
                        listAd = listAd.Substring(0, 1).ToUpper(new CultureInfo("en-US", false)) + listAd.Substring(1);

                        if (!name.Contains("Form_") && !name.Contains("Enum_") && !name.Contains("Domain_") && name != "")
                            listAd = colAd = name;

                        if (request.Form["columns[" + i + "][searchable]"].FirstOrDefault() == "true")
                        {
                            if (name.Contains("Form_") || name.Contains("Enum_"))
                                colAd = name + colAd.Substring(0, colAd.IndexOf("Id") + 2);
                            else if (name.Contains("Domain_"))
                                colAd = name + colAd;
                            SearchList.Add(colAd);
                        }

                        if (name.Contains("Domain_"))
                        {
                            var replaceName = colAd.Contains("Id") ? "Id" : "Name";
                            colAd = colAd.Substring(0, colAd.IndexOf(replaceName));


                            DomainList.Add(colAd.Replace("LinkContract", "LinkDocument"));
                            continue;
                        }
                        ColumnList.Add(listAd);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        public DataTableViewModel(int pageSize, int skip)
        {
            Draw = null;
            SortColumn = "name";
            SortColumnDirection = null;
            SearchValue = null;
            PageSize = Math.Min(pageSize, 1000);
            Skip = skip;
        }
    }
}
