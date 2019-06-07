/// <reference path="../_ref.js" />

//$("form").on("submit", function (event) {

//    var btn = $("#btnSubmit");
//    preventRefresh = true;
//    var url = btn.attr("data-url");
    
// //   var data = $(this).serialize() + 
//    $.ajax({
//        url: $(this).attr("action"),
//        dataType: 'json', type: 'post',
//        data:   $(this).serialize() ,
//        beforeSend: function () {
//            $("#imgLoad").removeClass("hide-loader");
//            $("#btnSubmit").attr("disabled");
//        },
//        complete: function () {
//            $("#btnSubmit").removeAttr("disabled");
//            $("#imgLoad").addClass("hide-loader");
//        },
//        success: function (result) {
//            if (result.status === 200) {
//                alert(result.message);
//                $("#txtNotify").text(result.message);
//                $("#myModal").modal();
//           //     preventRefresh = false;
//            } else {
//                $("#txtNotify").text(result.message);
//                $("#myModal").modal();
//            }
//        },
//        error: function () {
//            $("#txtNotify").text(result.message);
//            $("#myModal").modal();
//        }
//    });
//})

function uploadToCloud(file, url) {
    var $progressBar = $('.progress-bar');
    var imgLoadingUrl = "../images/ajaxLoader/ringLoading1.gif";
    var formData = new FormData();
    formData.append("file", file)
    $.ajax(url, {
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
     
        xhr: function () {
            var xhr = new XMLHttpRequest();
            $("#imgLoader").attr("src", imgLoadingUrl);
            xhr.upload.onprogress = function (e) {
                var percent = '0';
                var percentage = '0%';
                if (e.lengthComputable) {
                    percent = Math.round((e.loaded / e.total) * 100);
                    percentage = percent + '%';
                    $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                }
            };
            return xhr;
        },
        begin: function () {
            $(".progress").show();
        },
        success: function (response) {
            //   $alert.show().addClass('alert-success').text('Upload success');
            if (response.status === 200) {
                $("#imgLoc").val(response.imageLocation);
                $("#fullImageName").val(response.fullImageName);
                $("#imgName").val(response.fullImageName);
                //show delete button 
                //show upload successfull
                $("#imgLoader").attr("src", "../images/ajaxLoader/ok.png");
                $("#deleteUpload").show();
             
                $(".progress").hide();
            }
            else {
                $("#imgLoader").attr("src", "../images/ajaxLoader/Close.png");
                $(".progress").hide();
            }
            console.log(response)
            alert("Uploaded Successfully")
        },
        error: function (err) {
            console.log(err)
            $("#imgLoader").attr("src", "../images/ajaxLoader/Close.png");
            $(".progress").hide();
        },
        complete: function () {
            $progress.hide();
        },
    });
}

function uploadFilesToCloud(fullImage, croppedImage, url) {
    var $progressBar = $('.progress-bar');
    var imgLoadingUrl = "../image/ajaxImg/ringLoading1.gif";
    var formData = new FormData();
    formData.append("fullImage", fullImage);
    formData.append("croppedImage", croppedImage);
    $.ajax(url, {
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function (e) {
                $("#imgLoader").attr("src", imgLoadingUrl);
                //$(".progress").show();
                ////disable submit button and set a text
                //var percent = '0';
                //var percentage = '0%';
                //if (e.lengthComputable) {
                //    percent = Math.round((e.loaded / e.total) * 100);
                //    percentage =  '';
                //    $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                //}
            };
            return xhr;
        },
        begin: function () {
            $(".progress").show();
            $("imgLoader").attr("src", imgLoadingUrl);
        },
        success: function (response) {
            //   $alert.show().addClass('alert-success').text('Upload success');
            if (response.status === 200) {
                $("#imgLoc").val(response.imageLocation);
                $("#ThumbNailUrl").val(response.thumbNailUrl);
                //show delete button 
                //show upload successfull
                $("#imgLoader").attr("src", "../image/ajaxImg/ok.png");
                $("#deleteUpload").show();
                $("#thumbNailName").val(response.thumbNailName);
                $("#fullImageName").val(response.fullImageName);
                $(".progress").hide();
            }
            else {
                $("#imgLoader").attr("src", "../image/ajaxImg/Close.png");
                $(".progress").hide();
            }
            console.log(response)
            alert("Uploaded Successfully")
        },
        error: function (err) {
            //avatar.src = initialAvatarURL;
            //$alert.show().addClass('alert-warning').text('Upload error');
            console.log(err);
            $("#imgLoader").attr("src", "../image/ajaxImg/Close.png");
            $(".progress").hide();
           
        },
        complete: function () {
         //   $progress.hide();
        },
    });
}

$("#deleteUpload").click(function (event) {
    event.preventDefault();
    var  fullImageName = $("#fullImageName").val();
    $.ajax("/Admin/DeleteFile?fileName=" +fullImageName, {
        type: "get",
        success: function (response) {
            if (response.status = 200) {
                window.location.reload();
            }
        }
    });
});

