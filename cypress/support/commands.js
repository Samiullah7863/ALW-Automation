
// Command to Login with Email and Password
Cypress.Commands.add("login", (email, password) => {

  // API to Check Login Response
  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/alw-login/"
  ).as("loginAPI");

  cy.visit({ url: "/login", failOnStatusCode: false });
  cy.get("span.Login_anchor__37QjD").click();
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("button.NewButton_btn-primary__7Sw3_").click();
  cy.wait("@loginAPI").then((intercept) => {
    const { statusCode, body } = intercept.response;
    if (statusCode != 200) {
      throw new Error("Error occured.");
    }
  });
});

// Command to Login with Phone Number
Cypress.Commands.add("loginWithNumber", (number) => {
  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/alw-login/"
  ).as("loginAPI");

  cy.visit({ url: "/login", failOnStatusCode: false });
  cy.get(".react-tel-input input").type(number);
  cy.get(".Login_form-actions__1Ru2I button").click();
  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/otp/generate-signin-otp/"
  ).as("getOTP");
  cy.wait("@getOTP")
    .then((intercept) => {
      const { statusCode, body } = intercept.response;
      return body.otp;
    })
    .then((otp) => {
      cy.get(".StepTwo_input__3wcRj").first().type(otp);
      cy.get(".StepTwo_form-actions__2yvCG button").first().click();
    });

  cy.wait("@loginAPI").then((intercept) => {
    const { statusCode, body } = intercept.response;
    if (statusCode != 200) {
      throw new Error("Error occured.");
    }
  });
});










// Upper Grade Sign Up
Cypress.Commands.add("signup", () => {
  cy.visit({ url: "/registration", failOnStatusCode: false });

  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/validation/alw-registration"
  ).as("isNumberUsed");

  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/otp/generate"
  ).as("getOTP");

  cy.intercept(
    "GET",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/v2/user-class-courses/?grade_id=12"
  ).as("semesterSubjects");

  cy.get(".form-select__control").click();

  cy.get("#react-select-3-option-11").click();

  function generateNumber() {
    return Math.trunc("3" + Math.random() * 100000000);
  }
  let num = generateNumber();

  cy.get(".react-tel-input input").type(num);

  cy.wait("@isNumberUsed").then((intercept) => {
    const { statusCode, body } = intercept.response;
    if (
      body.validation_decisions.phone_number ==
      "رقم الجوال 966" + num + " قيد الاستخدام بالفعل"
    ) {
      cy.get(".react-tel-input input")
        .focus()
        .type("{moveToEnd}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}");
      cy.get(".react-tel-input input").type(generateNumber());
    }
  });

  cy.get(".NewButton_btn-big__18Lpi").click();

  cy.wait("@getOTP")
    .then((intercept) => {
      const { statusCode, body } = intercept.response;
      return body.otp;
    })
    .then((otp) => {
      cy.get(":nth-child(1) > :nth-child(1) > .StepTwo_input__3wcRj").type(otp);
      cy.get(".NewButton_btn-primary__7Sw3_").click();
      cy.wait(1000);
      cy.get(".Subscription_paymentPlans__13Gi6 > :nth-child(1)").click();
      cy.wait("@semesterSubjects");
      cy.get(
        ".SemesterSubjects_subjectCard__subjectListWrap__1L3_Y > .Checkbox_container__2kuRU > .Checkbox_label__33-dN"
      ).click();
      cy.get(".NewButton_btn-primary__7Sw3_").click();
    });
});

// Lower Grade Sign Up
Cypress.Commands.add("signupLowerGrade", () => {
  cy.visit({ url: "/registration", failOnStatusCode: false });

  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/validation/alw-registration"
  ).as("isNumberUsed");

  cy.intercept(
    "POST",
    "https://lms-" + Cypress.env('server') + "/api/otp/generate"
  ).as("getOTP");

  cy.intercept(
    "GET",
    "https://lms-" + Cypress.env('server') + "/api/mentora/auth/v2/user-class-courses/?grade_id=4"
  ).as("semesterSubjects");

  cy.get(".form-select__control").click();

  cy.get("#react-select-3-option-2").click();

  function generateNumber() {
    return Math.trunc("3" + Math.random() * 100000000);
  }
  let num = generateNumber();

  cy.get(".react-tel-input input").type(num);

  cy.get(".react-tel-input input").blur();

  cy.wait("@isNumberUsed").then((intercept) => {
    const { statusCode, body } = intercept.response;
    if (
      body.validation_decisions.phone_number ==
      "رقم الجوال 966" + num + " قيد الاستخدام بالفعل"
    ) {
      cy.get(".react-tel-input input")
        .focus()
        .type("{moveToEnd}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}")
        .type("{backspace}");
      cy.get(".react-tel-input input").type(generateNumber());
    }
  });

  cy.get(".NewButton_btn-big__18Lpi").click();

  cy.wait("@getOTP")
    .then((intercept) => {
      const { statusCode, body } = intercept.response;
      return body.otp;
    })
    .then((otp) => {
      cy.get(":nth-child(1) > :nth-child(1) > .StepTwo_input__3wcRj").type(otp);
      cy.get(".NewButton_btn-primary__7Sw3_").click();
      cy.wait(1000);
      cy.get(".Subscription_paymentPlans__13Gi6 > :nth-child(1)").click();
      cy.wait("@semesterSubjects");
      cy.get(
        ".SemesterSubjects_subjectCard__subjectListWrap__1L3_Y > .Checkbox_container__2kuRU > .Checkbox_label__33-dN"
      ).click();
      cy.get(".SemesterSubjects_form-actions__3RZB2").click();
    });
});
