using System;
using System.IO;
using System.Web;
using Newtonsoft.Json;
using BarcodeDLL;

namespace DecodeMobileCam
{
    /// <summary>
    /// Summary description for MobilecamBarcodeReader
    /// </summary>
    public class MobilecamBarcodeReader : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var result = new ReadResult();
            try
            {
                // 1. Get Base64 Stream
                context.Request.InputStream.Position = 0;
                string jsonString;
                using (var inputStream = new StreamReader(context.Request.InputStream))
                {
                    jsonString = inputStream.ReadToEnd();
                }

                var postData = JsonConvert.DeserializeObject<PostData>(@jsonString);
                if (postData == null)
                {
                    result.errorCode = (int)Dynamsoft.Barcode.ErrorCode.DBR_UNKNOWN;
                    result.errorString = "Post data is null.";
                }
                else
                {
                    if (postData.barcodeFormat == 0)
                        postData.barcodeFormat = 234882047;
                    if (postData.maxNumPerPage <= 0)
                        postData.maxNumPerPage = 0x7fffffff;

                    // 2. reader barcode and output result
                    BarrecodeReaderRepo.DoBarcode(postData.image, postData.barcodeFormat, postData.maxNumPerPage, ref result);
                }

                var strResult = JsonConvert.SerializeObject(result);
                context.Response.Write(strResult);
            }
            catch (Exception exp)
            {
                result.errorCode = (int)Dynamsoft.Barcode.ErrorCode.DBR_UNKNOWN;
                result.errorString = exp.Message;

                context.Response.Write(JsonConvert.SerializeObject(result));
            }
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}