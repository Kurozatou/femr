var triageFieldValidator = {
    isValid: true,
    validatePatientInformation: function () {
        var patientInformation = triageFields.patientInformation;//located in triage.js

        //validate First Name
        if (!$.trim(patientInformation.firstName.val())) {
            patientInformation.firstName.attr("placeholder", "Required Input");
            patientInformation.firstName.css('border-color', 'red');
            triageFieldValidator.isValid = false;
        }
        //validate Last Name
        if (!$.trim(patientInformation.lastName.val())) {
            patientInformation.lastName.attr("placeholder", "Required Input");
            patientInformation.lastName.css('border-color', 'red');
            triageFieldValidator.isValid = false;
        }
        //validate City
        if (!$.trim(patientInformation.city.val())) {
            patientInformation.city.attr("placeholder", "Required Input");
            patientInformation.city.css('border-color', 'red');
            triageFieldValidator.isValid = false;
        }
        //Validate Age
        if (!patientInformation.age.val() && !patientInformation.ageClassification.filter(':checked').val() && !patientInformation.months.val() && !patientInformation.years.val() && !$('#readOnlyBirthDate').val() && !$('#readOnlyAge').val()) {
            //nothing has been filled out
            $('#ageClassificationWrap').css('border', '1px solid red');
            triageFieldValidator.isValid = false;
        } else {
            //something has been filled out
            $('#ageClassificationWrap').css('border', 'none');
        }

        //Validate Age Classification
        var ageMap = {
            "infant":[0, 1],
            "child":[2, 12],
            "teen":[13, 17],
            "adult":[18, 64],
            "elder":[65, 150]
        };
        var currAge = patientInformation.years.val();
        var ageClass = patientInformation.ageClassification.filter(':checked').val();
        if (currAge < ageMap[ageClass][0] || currAge > ageMap[ageClass][1]) {
            alert("The inputted age (" + currAge + ") does not match the selected age classification (" + ageClass + "). Please select the correct classification.");
            event.preventDefault();
        }

    },
    validatePatientVitals: function () {
        var patientVitals = triageFields.patientVitals;//located in triage.js
        triageFieldValidator.isValid = vitalClientValidator(patientVitals);
    }
};

function validate() {
    //always check vitals first
    triageFieldValidator.validatePatientVitals();
    triageFieldValidator.validatePatientInformation();
    return triageFieldValidator.isValid;
}