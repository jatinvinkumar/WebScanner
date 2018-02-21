using System;
using System.Collections.Generic;
using System.Web;
using System.Drawing;

namespace BarcodeDLL
{
    public class PostData
    {
        public string image { get; set; }
        public long barcodeFormat { get; set; }
        public int maxNumPerPage { get; set; }
    }

    public class Barcode
    {
        public long format { get; set; }
        public string formatString { get; set; }
        public string displayValue { get; set; }
        public string rawValue { get; set; }
        public Rectangle boundingBox { get; set; }
        public Point[] cornerPoints { get; set; }
        public int pageNumber { get; set; }
    }

    public class ReadResult
    {
        public int errorCode { get; set; }
        public string errorString { get; set; }
        public Barcode[] barcodes { get; set; }
    }
}