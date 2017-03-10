$(document).ready(function() {


    function validateUserInput() {
        var validInput = true;
        $(".form-control").each(function() {
            if ($(this).val() === "")
                validInput = false;
        });
        return validInput;
    }


    $("#sendEmail").on("click", function() {

        console.log("inside!!")

        if (validateUserInput() === true) {



            var emailContent = {
                name: $("#NameInputEmail").val().trim(),
                email: $("#inputEmail").val().trim(),
                emailSubject: $("#subjectEmail").val().trim(),
                emailBody: $("#bodyEmail").val().trim()
            }

            $.post("/email", emailContent, function(data) {

                if (data.error) {

                    $("#emailSuccessful").modal();
                    $("#isEmailSent").html("Sorry, your email was not sent!")

                } else {

                    $("#emailSuccessful").modal();
                    $("#isEmailSent").html("Email Sent!")

                }

            });

        } else {

            $("#emailResult").html("Please validate your input and try again!");

        }

    })


    $(".close").on("click", function() {


        $.get("/close", function(data) {

            if (data.error) {

                console.log(data.error);

            } else {
                window.location = data;
            }

        });

    })





})