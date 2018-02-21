/**
*  HTML5 mobilecam Barcode Reader with Dynamsoft Barcode Reader SDK.
*  Support Mobile.
*/
var firstImg = new Image();
var orgCanvas = document.getElementById('orgCanvas');
var btnGrab = document.getElementById('btnGrab');
var btnRead = document.getElementById('btnRead');
//var xhr;
var S = KISSY;
var dlgDoBarcode;

window.mobileAndTabletcheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function showWaitDialog(strInfo) {
    var ObjString = "<div class=\"D-dailog-body-Recognition\">";
    ObjString += "<p>" + strInfo + "</p>";
    ObjString += "<img src='./images/loading.gif' style='width:160px; height:160px; margin-left:17px; margin-top:20px;' /></div>";
    document.getElementById("strBody").innerHTML = ObjString;

    try {
        ShowWaitDialog(237, 262);
    } catch (e) {

    } 
}

function DoNotShowWaitDDialogInner() {
    if (dlgDoBarcode) {
        dlgDoBarcode.hide();
    }
}

function ShowWaitDialog(varWidth, varHeight) {
    S.use("overlay", function (S, o) {
        dlgDoBarcode = new o.Dialog({
            srcNode: "#J_waiting",
            width: varWidth,
            height: varHeight,
            closable: false,
            mask: true,
            align: {
                points: ['cc', 'cc']
            }
        });
        dlgDoBarcode.show();
    });
}

function layout(isInit) {
    var height_7_9 = Math.floor($(window).height() * 0.079);
    var height_1_8 = Math.floor($(window).height() * 0.018);
    var height_60_4 = Math.floor($(window).height() * 0.604);
    var height_2_2 = Math.floor($(window).height() * 0.022);
    var height_64_8 = Math.floor($(window).height() * 0.648);
    var height_4 = Math.floor($(window).height() * 0.04);
    var width_40 = Math.floor($(window).width() * 0.40);
    var width_5 = Math.floor($(window).width() * 0.05);

    $("#demoInfoDiv").css("display", "none");
    $("#container").css("display", "block");

    //imgContainer
    $('#imgContainer').css('height', height_64_8 + 'px');
    $('#imgContainer').css('padding', height_2_2 + 'px');
    $('#divBorder').css('width', Math.floor($(window).width() - height_2_2 * 2) + 'px');
    $('#divBorder').css('height', height_60_4 + 'px');

    //slides
    $('.switch').width(Math.floor($(window).width() * 0.136));
    $('.switch').height(height_4 - Math.floor(height_4 / 7));
    $('.switch-handle').width(height_4);
    $('.switch-handle').height(height_4);
    if (isInit) {
        document.getElementById('chkMultiBarcodes').checked = false;
        document.getElementById('chkLinear').checked = false;
        document.getElementById('chkQRCode').checked = false;
        document.getElementById('chkPdf').checked = false;
        document.getElementById('chkDM').checked = false;
        $('#chkMultiBarcodes').click();
        $('#chkLinear').click();
    } 
    else {
        var i = 0;
        var barcodeType = document.getElementsByName("BarcodeType");
        for (i = 0; i < barcodeType.length; i++) {
            if (!barcodeType[i].checked) continue;
            $(barcodeType[i]).nextAll('.switch-handle').css('left', Math.floor($(window).width() * 0.136 - (Math.floor($(window).height() * 0.04) * 6 / 7)) + 'px');
        }
    }

    //MultiBarcodes
    $('#divMultiBarcodes').css('height', height_7_9 + 'px');
    $('#divMultiBarcodes').css('line-height', height_7_9 + 'px');
    $('#spMultiBarcodes').css('margin-left', height_2_2 + 'px');
    $('#lblMultiBarcodesContainer').css('margin-right', height_2_2 + 'px');

    //divBarcodeTypesP1
    $('#divBarcodeTypesP1').css('height', height_7_9 + 'px');
    $('#divBarcodeTypesP1').css('line-height', height_7_9 + 'px');
    $('#spLinear').css('margin-right', Math.floor(parseFloat($('#spLinear').css('font-size')) * 11 / 14) + 'px');
    $('#divLinear').css('margin-left', height_2_2 + 'px');
    $('#spQRCode').css('padding-right', Math.floor(parseFloat($('#spLinear').css('font-size')) * 13 / 14) + 'px');
    $('#divQRCode').css('float', 'right');
    $('#divQRCode').css('margin-right', height_2_2 + 'px');

    //SapLine
    $('#divSapLine').css('width', $('#divBorder').width() * 0.95 + 'px');

    //divBarcodeTypesP2
    $('#divBarcodeTypesP2').css('height', height_7_9 + 'px');
    $('#divBarcodeTypesP2').css('line-height', height_7_9 + 'px');
    $('#divPdf').css('margin-left', height_2_2 + 'px');
    $('#divDM').css('float', 'right');
    $('#divDM').css('margin-right', height_2_2 + 'px');

    //btn
    $('#btnGrab').width(width_40);
    $('#btnGrab').height(height_7_9);
    $('#btnGrab').css('line-height', height_7_9 + 'px');
    $('#btnRead').width(width_40);
    $('#btnRead').height(height_7_9);
    $('#btnRead').css('line-height', height_7_9 + 'px');

    $('#btnGrab').css('margin-top', height_1_8 + 'px');
    $('#btnGrab').css('margin-bottom', height_1_8 + 'px');
    $('#btnGrab').css('margin-right', width_5 + 'px');

    //font-size
    $('span').css('font-size', Math.floor(height_7_9 * 0.3) + 'px');
    var fontSize = (parseFloat($('#spLinear').css('font-size')) > Math.floor($('#btnGrab').height() * 0.35))
        ? parseFloat($('#spLinear').css('font-size'))
        : Math.floor($('#btnGrab').height() * 0.35);
    $('#btnGrab').css('font-size', fontSize + 'px');
    $('#btnRead').css('font-size', fontSize + 'px');


    $('body').height($(window).height());
}

function init() {
    if (!window.mobileAndTabletcheck()) {
        $("#demoInfoDiv").css("display", "block");
        $("#container").css("display", "none");
        return;
    }

    window.addEventListener("orientationchange", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        layout(false);
    }, false);

    layout(true);
}

function ClickCheckBox(obj) {
    var bSelect = obj.checked;
    if (bSelect == true) {
        $(obj).nextAll('.switch-handle').css('left', Math.floor($(window).width() * 0.136 - (Math.floor($(window).height() * 0.04) * 6 / 7)) + 'px'); //height_6_5
    }
    else {
        $(obj).nextAll('.switch-handle').css('left', '3px');
    }
}

function getBarcodeFormat() {
    var vType = 0;
    var barcodeType = document.getElementsByName("BarcodeType");
    for (i = 0; i < barcodeType.length; i++) {

        if (barcodeType[i].checked == true)
            vType = vType | (barcodeType[i].value * 1);
    }
    return vType;
}

function fileOnload(e) {
    var $img = $('<img>', { src: e.target.result });

    $img.load(function () {
        var w = 0, h = 0, scale = 0;
        if (this.width > this.height) {
            w = 800;
            scale = 800 / this.width;
            h = this.height * scale;
        } else {
            h = 800;
            scale = 800 / this.height;
            w = this.width * scale;
        }

        orgCanvas.width = w;
        orgCanvas.height = h;
        var orgCtx = orgCanvas.getContext('2d');
        orgCtx.drawImage(this, 0, 0, this.width, this.height,
                               0, 0, orgCanvas.width, orgCanvas.height);

        //scanBarcode();
        var count = 1;
        if(document.getElementById('chkMultiBarcodes').checked)
            count = 65535;
            
        var base64 = orgCanvas.toDataURL('image/jpeg', 0.7);
        var data = base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        Dynamsoft.BarcodeReaderDemo.ReadFromImage("MobilecamBarcodeReader.ashx", data, getBarcodeFormat(), count, uploadComplete, uploadProgress, uploadFailed, uploadCanceled);
    });
}

$('#fileToUpload').change(function(e) {
    var file = e.target.files[0], imageType = /image.*/;

    if (!file.type.match(imageType))
    {
        alert('The uploaded file is not supported.');
        return;
    }

    btnGrab.disabled = true;
    btnRead.disabled = true;

    loadImage(e.target.files[0],
        function (img) {
            //$("#imgContainer").empty();
            //$('#imgContainer').attr('min-height', '1px');
            //document.getElementById('imgContainer').appendChild(img);

            $("#divBorder").empty();
            $('#divBorder').attr('min-height', '1px');
            document.getElementById('divBorder').appendChild(img);

            btnGrab.disabled = false;
            btnRead.disabled = false;
        });
});

$('#btnGrab').click(function() {
    $('#fileToUpload').click();
});

$('#divBorder').click(function () {
    $('#fileToUpload').click();
});

btnRead.onclick = function () {
    if (document.getElementById('fileToUpload').files.length < 1) {
        alert("Please grab an image first.");
        return;
    }

    if (getBarcodeFormat() == 0) {
        alert("Barcode Format is invalid.");
        return;
    }

    //btnRead.textContent = 'Uploading...';
    showWaitDialog('Uploading...');

    btnRead.disabled = true;
    btnGrab.disabled = true;

    var reader = new FileReader();
    reader.onload = fileOnload;
    
    reader.readAsDataURL(document.getElementById('fileToUpload').files[0]);
};

function uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    var strMsg;
    var result = JSON.parse(evt.target.responseText);
    if (result.barcodes != null && result.barcodes.length > 0) {
        strMsg = "Total barcode(s) found: " + result.barcodes.length + ".<br/>";
        for (var idx = 0; idx < result.barcodes.length; ++idx) {
            strMsg = strMsg + "Barcode " + (idx + 1) + ":<br/>";
            strMsg = strMsg + "Type: " + result.barcodes[idx].formatString + "<br/>";
            strMsg = strMsg + "Value: " + result.barcodes[idx].displayValue + "<br/>";
            strMsg = strMsg + "<br/>";
        }
    }
    else {
        strMsg = "No barcode found. ";
    }

    $("#dlgResult").html('<div class="resultContent">' + strMsg + '</div>').dialog({
        modal: true,
        buttons: { 'OK': function() { $("#dlgResult").dialog("close"); } }
    });

    //btnRead.textContent = 'Read Barcode';
    DoNotShowWaitDDialogInner();
    btnRead.disabled = false;
    btnGrab.disabled = false;
}

function uploadFailed(evt) {
    alert("There was an error attempting to upload the file.");
    //btnRead.textContent = 'Read Barcode';
    DoNotShowWaitDDialogInner();
    btnRead.disabled = false;
    btnGrab.disabled = false;
}

function uploadCanceled(evt) {

    alert("The upload has been canceled by the user or the browser dropped the connection.");

}

function uploadProgress(evt)
{
    if (evt.lengthComputable && evt.loaded == evt.total) {
        //btnRead.textContent = 'Scanning...';
        DoNotShowWaitDDialogInner();
        showWaitDialog('Scanning...');
    }
}

init();