$(document).ready(function () {
    // If already filled, go to game
    if (localStorage.getItem("firstName")) {
        window.location.href = "game.html";
        return;
    }

    // Custom method: regex pattern validation
    $.validator.addMethod("regex", function (value, element, pattern) {
        const re = new RegExp(pattern);
        return this.optional(element) || re.test(value);
    }, "Invalid format");

    // Custom method: even number
    $.validator.addMethod("even", function (value, element) {
        return parseInt(value) % 2 === 0;
    }, "Must be an even number");

    // Initialize validation
    $("#playerForm").validate({
        rules: {
            firstName: {
                required: true,
                maxlength: 35,
                regex: "^[A-Za-z][A-Za-z~'\\-\\s]{0,33}[A-Za-z~'\\-]?$"
            },
            lastName: {
                required: true,
                maxlength: 45,
                regex: "^[A-Za-z][A-Za-z~'\\-\\s]{0,43}[A-Za-z~'\\-]?$"
            },
            username: {
                required: true,
                regex: "^[0-9][A-Z]{3}[a-z][\\$&\\*@!]$"
            },
            phone: {
                required: true,
                regex: "^\\d{3}\\.\\d{3}\\.\\d{4}$"
            },
            postal: {
                required: true,
                regex: "^[A-Za-z]\\d[A-Za-z] \\d[A-Za-z]\\d$"
            },

            city: {
                required: true,
                maxlength: 50,
                regex: "^[A-Za-z\\s]{1,50}$"
            },
            email: {
                required: true,
                regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.(com|ca)$"
            },
            money: {
                required: true,
                digits: true,
                min: 5,
                max: 5000,
                even: true
            }
        },
        messages: {
            firstName: "Enter a valid first name (letters, ~ ' - allowed)",
            lastName: "Enter a valid last name (letters, ~ ' - allowed)",
            username: "Format: 1 digit, 3 uppercase, 1 lowercase, ends with $, &, *, @ or !",
            phone: "Format must be ###.###.####",
            postal: "Enter a valid Canadian postal code (e.g. A1A 1A1)",

            city: "Only letters and spaces allowed (max 50 chars)",
            email: "Enter a valid .com or .ca email",
            money: "Must be even number between $5 and $5000"
        },
        submitHandler: function (form) {
            localStorage.setItem("firstName", $("#firstName").val().trim());
            localStorage.setItem("lastName", $("#lastName").val().trim());
            localStorage.setItem("username", $("#username").val().trim());
            localStorage.setItem("phoneNumber", $("#phone").val().trim());
            localStorage.setItem("postal", $("#postal").val().trim());

            localStorage.setItem("city", $("#city").val().trim());
            localStorage.setItem("email", $("#email").val().trim());
            localStorage.setItem("bank", $("#money").val().trim());
            localStorage.setItem("lastVisit", new Date().toLocaleString());

            window.location.href = "game.html";
        }
    });

    // Clear credentials
    $("#changeUser").on("click", function () {
        localStorage.clear();
        location.reload();
    });
});
