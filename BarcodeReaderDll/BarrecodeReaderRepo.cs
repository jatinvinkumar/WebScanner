using System;
using System.Drawing;
using System.IO;
using Dynamsoft.Barcode;

namespace BarcodeDLL
{
    public class BarrecodeReaderRepo
    {
        public static void DoBarcode(string strImgBase64, Int64 format, int iMaxNumbers, ref ReadResult result)
        {
            try
            {
                var listResult = GetBarcode(strImgBase64, format, iMaxNumbers);
                
                result.errorCode = (int)Dynamsoft.Barcode.ErrorCode.DBR_SUCCESS;
                result.errorString = "Success";
                if (listResult != null && listResult.Length > 0)
                {
                    var barcodes = new Barcode[listResult.Length];
                    for (int i = 0; i < listResult.Length; ++i)
                    {
                        barcodes[i] = new Barcode();
                        barcodes[i].displayValue = listResult[i].BarcodeText;
                        barcodes[i].boundingBox = listResult[i].BoundingRect;
                        barcodes[i].cornerPoints = listResult[i].ResultPoints;
                        barcodes[i].format = (long)listResult[i].BarcodeFormat;
                        barcodes[i].formatString = listResult[i].BarcodeFormat.ToString();
                        barcodes[i].pageNumber = listResult[i].PageNumber;
                        barcodes[i].rawValue = Convert.ToBase64String(listResult[i].BarcodeData);
                    }
                    result.barcodes = barcodes;
                }
            }
            catch (BarcodeReaderException exp)
            {
                result.errorCode = (int)exp.Code;
                result.errorString = exp.Message;
            }
        }

        public static BarcodeResult[] GetBarcode(string strImgBase64, Int64 format, int iMaxNumbers)
        {
            var reader = new Dynamsoft.Barcode.BarcodeReader();
            var options = new ReaderOptions
            {
                MaxBarcodesToReadPerPage = iMaxNumbers,
                BarcodeFormats = (BarcodeFormat) format
            };

            reader.ReaderOptions = options;
            reader.LicenseKeys = "t0068MgAAADLO7wPvK7gujnel3nucbWHr3Z77rexgKdURtp25LD5l6c+cyU9KOYK07nFJ/F25qCO+6OITUYVG3modpyd9LdE=";
            return reader.DecodeBase64String(strImgBase64);
        }
    }
}
