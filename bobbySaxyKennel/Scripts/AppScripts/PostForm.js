/// <reference path="../_ref.js" />
$(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            url: $("form").attr("action"),
            data: $("form").serialize(),
            type: "post",
            beforeSend: function () {
                $("#imgLoad").show();
                $("#btnSubmit").attr("disabled", true);
            },
            complete: function () {
                $("#imgLoad").hide();
                $("#btnSubmit").attr("disabled", false);
            },
            error: function () {
                $("#myAlert1").slideDown();
            },
            success: function (response) {
                console.log(response);
            }
        });

    });

    $(function () {
        $(".btnAddtoCart").click(function (event) {
          //  event.preventDefault();
            var ticktetId = $(this).attr("data-ticketId");
            $.ajax({
                url: "/Ticket/AddToCart/?ticketno=" + ticktetId,
                type: "get",
                beforeSend: function () {
                    $("#imgLoad_"+ticktetId).show();
                    $(this).attr("disabled", true);
                },
                complete: function () {
                    $("#imgLoad_" + ticktetId).hide();
                    $(this).attr("disabled", false);
                },
                error: function (err) {
                    $("#myAlert1").slideDown();
                    console.log(err);
                },
                success: function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        window.location.href = response.url;
                    }
                }
            });

        });


    });

});
