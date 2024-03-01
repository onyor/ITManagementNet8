using DevExpress.DataAccess.Json;
using DevExpress.XtraPrinting;
using DevExpress.XtraReports.UI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ITX.Infrastructure.ReportEngine
{
    public static class Builder
    {
        public static byte[] CreateReport(string designFile, Dictionary<string, string> subReports, object dataModel, byte exporttype = 0)
        {
            byte[] dosya = null;
            var rootAdress = Path.Combine(Directory.GetCurrentDirectory(), "Temp" + Path.DirectorySeparatorChar);
            try
            {
                var report = new JsonReport();

                report.LoadTextWithDataObject(rootAdress + designFile, dataModel);
                if (subReports != null)
                {
                    foreach (var item in subReports)
                    {
                        report.SubReports.Add(new JsonBase { ReportName = item.Key, DesignFile = rootAdress + item.Value });

                    }
                }
                if (exporttype == 1)
                    dosya = report.SaveToDocxBytes();
                else if (exporttype == 0)
                    dosya = report.SaveToPdfBytes();
                else if (exporttype == 2)
                    dosya = report.SaveToXlsxBytes();
            }
            catch (Exception ex)
            {
                // buraya şık bir log yazılırsa daha iyi olabilir
            }

            return dosya;
        }
        public static MemoryStream CreateStreamReport(string designFile, Dictionary<string, string> subReports, object dataModel)
        {
            MemoryStream dosya = new MemoryStream();
            var rootAdress = Path.Combine(Directory.GetCurrentDirectory(), "Temp" + Path.DirectorySeparatorChar);
            try
            {
                var report = new JsonReport();

                report.LoadTextWithDataObject(rootAdress + designFile, dataModel);
                if (subReports != null)
                {
                    foreach (var item in subReports)
                    {
                        report.SubReports.Add(new JsonBase { ReportName = item.Key, DesignFile = rootAdress + item.Value });

                    }
                }
             
                dosya = report.SaveToMemoryStream();
            }
            catch (Exception ex)
            {
                // buraya şık bir log yazılırsa daha iyi olabilir
            }

            return dosya;
        }



    }

    public class JsonReport : JsonBase, IDisposable
    {
        private XtraReport _xtraReport;

        public List<JsonBase> SubReports { get; set; }

        public JsonReport()
        {
            SubReports = new List<JsonBase>();
        }

        public void Dispose()
        {
            if (_xtraReport != null)
            {
                _xtraReport.Dispose();
                _xtraReport = null;
            }
        }

        private bool prepare()
        {
            var result = false;


            if (DesignBytes != null)
            {

                _xtraReport = XtraReport.FromXmlFile(DesignText);

                if (DataBytes != null)
                {
                    var dataSource = new JsonDataSource { JsonSource = new CustomJsonSource(JsonConvert.SerializeObject(JsonConvert.DeserializeObject(Encoding.UTF8.GetString(DataBytes)))) };
                    dataSource.Fill();

                    _xtraReport.DataSource = dataSource;
                    if (SubReports != null && SubReports.Count > 0)
                    {
                        var xtraSubReports = _xtraReport.AllControls<XRSubreport>().ToList();
                        foreach (var xtraSubReport in xtraSubReports)
                        {
                            foreach (var subReport in SubReports)
                            {
                                if (subReport.DesignBytes != null && subReport.ReportName == xtraSubReport.Name)
                                {
                                    //xtraSubReport.ReportSource = XtraReport.FromXmlStream(new MemoryStream(subReport.DesignBytes));
                                    xtraSubReport.ReportSource = XtraReport.FromXmlFile(subReport.DesignFile);
                                    var dataBytes = subReport.DataBytes != null && subReport.DataBytes.Length > 0 ? subReport.DataBytes : DataBytes != null && DataBytes.Length > 0 ? DataBytes : null;
                                    if (dataBytes != null)
                                    {
                                        var subDataSource = new JsonDataSource { JsonSource = new CustomJsonSource(JsonConvert.SerializeObject(JsonConvert.DeserializeObject(Encoding.UTF8.GetString(dataBytes)))) };
                                        subDataSource.Fill();


                                        xtraSubReport.ReportSource.DataSource = subDataSource;
                                    }
                                }
                            }
                        }
                    }
                }

                result = true;
            }
            else
            {
                if (_xtraReport != null)
                    _xtraReport.Dispose();

                _xtraReport = null;
            }

            return result;
        }

        public void LoadBytesWithDataBytes(byte[] designBytes, byte[] dataBytes)
        {
            DesignBytes = designBytes;
            DataBytes = dataBytes;
        }

        public void LoadBytesWithDataText(byte[] designBytes, string dataText)
        {
            DesignBytes = designBytes;
            DataText = dataText;
        }

        public void LoadBytesWithDataObject(byte[] designBytes, object dataObject)
        {
            DesignBytes = designBytes;
            DataObject = dataObject;
        }

        public void LoadBytesWithDataFile(byte[] designBytes, string dataFile)
        {
            DesignBytes = designBytes;
            DataFile = dataFile;
        }

        public void LoadTextWithDataBytes(string designText, byte[] dataBytes)
        {
            DesignText = designText;
            DataBytes = dataBytes;
        }

        public void LoadTextWithDataText(string designText, string dataText)
        {
            DesignText = designText;
            DataText = dataText;
        }

        public void LoadTextWithDataObject(string designText, object dataObject)
        {
            DesignText = designText;
            DataObject = dataObject;
        }

        public void LoadTextWithDataFile(string designText, string dataFile)
        {
            DesignText = designText;
            DataFile = dataFile;
        }

        public void LoadFileWithDataBytes(string designFile, byte[] dataBytes)
        {
            DesignFile = designFile;
            DataBytes = dataBytes;
        }

        public void LoadFileWithDataText(string designFile, string dataText)
        {
            DesignFile = designFile;
            DataText = dataText;
        }

        public void LoadFileWithDataObject(string designFile, object dataObject)
        {
            DesignFile = designFile;
            DataObject = dataObject;
        }

        public void LoadFileWithDataFile(string designFile, string dataFile)
        {
            DesignFile = designFile;
            DataFile = dataFile;
        }

        public byte[] SaveToPdfBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    PdfExportOptions options = new PdfExportOptions();
                    
                    _xtraReport.ExportToPdf(stream);
                    result = stream.ToArray();
                }
            }

            return result;
        }
        public MemoryStream SaveToMemoryStream()
        {
            MemoryStream stream = new MemoryStream();

            if (prepare())
            {
                _xtraReport.ExportToPdf(stream);

            }

            return stream;
        }
        public void SaveToPdfFile(string filePath)
        {
            if (prepare())
                _xtraReport.ExportToPdf(filePath);
        }

        public byte[] SaveToHtmlBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    _xtraReport.ExportToHtml(stream, new HtmlExportOptions { ExportMode = HtmlExportMode.SingleFile });
                    result = stream.ToArray();
                }
            }

            return result;
        }

        public void SaveToHtmlFile(string filePath)
        {
            if (prepare())
                _xtraReport.ExportToHtml(filePath, new HtmlExportOptions { ExportMode = HtmlExportMode.SingleFile });
        }

        public byte[] SaveToMhtBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    _xtraReport.ExportToMht(stream);
                    result = stream.ToArray();
                }
            }

            return result;
        }

        public void SaveToMhtFile(string filePath)
        {
            if (prepare())
                _xtraReport.ExportToMht(filePath);
        }

        public byte[] SaveToDocxBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    _xtraReport.ExportToDocx(stream);
                    result = stream.ToArray();
                }
            }

            return result;
        }
        public byte[] SaveToXlsxBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    _xtraReport.ExportToXlsx(stream);
                    result = stream.ToArray();
                }
            }

            return result;
        }
        public byte[] SaveToCsvBytes()
        {
            byte[] result = null;

            if (prepare())
            {
                using (var stream = new MemoryStream())
                {
                    _xtraReport.ExportToCsv(stream);
                    result = stream.ToArray();
                }
            }

            return result;
        }
        public void SaveToDocxFile(string filePath)
        {
            if (prepare())
                _xtraReport.ExportToDocx(filePath);
        }
    }
    public class JsonBase
    {
        public string ReportName { get; set; }

        public byte[] DesignBytes { get; set; }

        private string _designText;
        public string DesignText
        {
            get => _designText;
            set
            {
                _designText = value;
                DesignBytes = !string.IsNullOrWhiteSpace(_designText) ? Encoding.UTF8.GetBytes(_designText) : null;
            }
        }

        private string _designFile;
        public string DesignFile
        {
            get => _designFile;
            set
            {
                _designFile = value;
                DesignText = !string.IsNullOrWhiteSpace(_designFile) && File.Exists(_designFile) ? File.ReadAllText(_designFile, Encoding.UTF8) : null;
            }
        }

        public byte[] DataBytes { get; set; }

        private string _dataText;
        public string DataText
        {
            get => _dataText;
            set
            {
                _dataText = value;
                DataBytes = !string.IsNullOrWhiteSpace(_dataText) ? Encoding.UTF8.GetBytes(_dataText) : null;
            }
        }

        private object _dataObject;
        public object DataObject
        {
            get => _dataObject;
            set
            {
                _dataObject = value;
                DataText = _dataObject != null ? JsonConvert.SerializeObject(_dataObject) : null;
            }
        }

        private string _dataFile;
        public string DataFile
        {
            get => _dataFile;
            set
            {
                _dataFile = value;
                DataObject = !string.IsNullOrWhiteSpace(_dataFile) && File.Exists(_dataFile) ? JsonConvert.DeserializeObject(File.ReadAllText(_dataFile, Encoding.UTF8)) : null;
            }
        }
    }
}
