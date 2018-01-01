// Mail form AJAX

$('#contact-form')
    .formValidation({
        icon: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Name is required'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Not a valid email address'
                    }
                }
            },
            _subject: {
                validators: {
                    notEmpty: {
                        message: 'The subject is required'
                    },
                    stringLength: {
                        max: 100,
                        message: 'The subject must be less than 100 characters long'
                    }
                }
            },
            message: {
                validators: {
                    notEmpty: {
                        message: 'The message is required'
                    },
                    stringLength: {
                        max: 700,
                        message: 'The message must be less than 700 characters long'
                    }
                }
            },
        }
    })
    .on('success.form.fv', function(e) {
        // Prevent default form submission
        e.preventDefault();

        // Send the message
        var $form = $(e.target);
        $.ajax({
            type: 'POST',
            url: 'https://formspree.io/beourmuse@gmail.com',
            data: $form.serialize(),
            dataType: "json"
        }).done(function(response) {
            // Clear the form
            $form.formValidation('resetForm', true);

            if (response.status === 'error') {
                $('#alertContainer')
                    .removeClass('alert-success')
                    .addClass('alert-warning')
                    .html('Sorry, cannot send the message')
                    .show();
            } else {
                $('#alertContainer')
                    .removeClass('alert-warning')
                    .addClass('alert-success')
                    .html('Thanks we will be in touch soon')
                    .show();
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $('#alertContainer')
                .removeClass('alert-success')
                .addClass('alert-warning')
                .html('Sorry, cannot send the message ' + jqXHR.responseText)
                .show();
        });
    })
    .on('err.form.fv', function(e) {
        console.log("Validation Error");
    });