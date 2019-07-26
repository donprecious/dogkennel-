/// <reference path="../_ref.js" />
$(function () {

    $("form").submit(function (event) {
        event.preventDefault();
        // jQuery.ajaxSettings.traditional = true;
        $.ajax({
            url: $(this).attr("action"),
            data: $(this).serialize(),
            type: "post",
            beforeSend: function () {
                $("#imgLoad").show();
                $("button[type='submit']").attr("disabled", true);
            //    $("button[type='submit']").attr("disabled", true);
            },
            complete: function () {
                $("#imgLoad").hide();

                $("button[type='submit']").removeAttr("disabled", true);
            },
            error: function (err) {
                $("#myAlert1").slideDown();
                console.log(err);
            },
            success: function (response) {
                $("#errorSummary ul li").remove();
                $("#errorSummary").hide();
                if (response.status === 200) {
                    $("#txtMsg").text(response.message);
                    $("#myModal").modal();
                   
                }
                else {
                    $("#errorSummary ul li").remove();
                    $("#errorSummary").hide();
                    response.errors.forEach(function (item, index,array) {
                        $(".validation-summary-errors ul").append("<li>" + item + "<li>");
                        $("#errorSummary ul").append("<li>" + item + "<li>");
                        console.log(item);
                        console.log(index);
                        console.log(array);
                    });
                    //   $(".validation-summary-errors ul li").append("<li> $response.errors. <li>`)

                    $(".validation-summary-errors ul li").show();
                    $("#errorSummary").show();
                }
                console.log(response);
            }
        });

    });

})