describe("ALW Sign Up", () => {
  

  it("Upper Grade Sign Up", () => {

    cy.visit({ url: "/registration", failOnStatusCode: false });


    // API to check if entered number is already in Use
    cy.intercept(
      "POST",
      "https://lms-" +
        Cypress.env("server") +
        "/api/mentora/auth/validation/alw-registration"
    ).as("isNumberUsed");


    // API to get Registration OTP
    cy.intercept(
      "POST",
      "https://lms-" + Cypress.env("server") + "/api/otp/generate"
    ).as("getOTP");


    // API to check if user has been successfully enrolled/registered or not
    cy.intercept(
      "POST",
      "https://lms-" + Cypress.env("server") + "/api/service_based_subscription/plans/1/enroll/"
    ).as("enrollStudent");


    // API to check if plans has loaded
    cy.intercept(
      "GET",
      "https://lms-" + Cypress.env("server") + "/api/service_based_subscription/plans/"
    ).as("subscriptionPlans");


    cy.get(".form-select__control").click();

    // Grade 7
    // cy.get("#react-select-3-option-6").click();

    // Grade 3
    cy.get("#react-select-3-option-2").click();


    // Generate a random number with 3 at start
    function generateNumber() {
      return Math.trunc("3" + Math.random() * 10000000000);
    }
    let num = generateNumber();
    

    cy.get(".react-tel-input input").type(num);


    // Check if number is used or not. In case it is used, remove it and again generate a number
    cy.wait("@isNumberUsed")
    .then((intercept) => {
      const { body } = intercept.response;
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


    // Getting OTP
    cy.wait("@getOTP")
      .then((intercept) => {
        const { statusCode, body } = intercept.response;
        return body.otp;
      })
      .then((otp) => {
        cy.get(":nth-child(1) > :nth-child(1) > .StepTwo_input__3wcRj").type(
          otp
        );
        cy.get(".NewButton_btn-primary__7Sw3_").click();
        
        
        // Wait for Plans to Load
        cy.wait("@subscriptionPlans");


        // Selecting Free trial Plan
        cy.get(
          ":nth-child(1) > .Subscription_paymentPlans__plan__1gWRy"
        ).click();
        cy.get(".NewButton_btn-primary__7Sw3_").click();
  

        // Selecting Subjects
        cy.get(
          ":nth-child(1) > .SemesterSubjects_subjectCard__option__3PpaU"
        ).click();
        cy.get(
          ":nth-child(2) > .SemesterSubjects_subjectCard__option__3PpaU"
        ).click();


        // Submit Button
        cy.get(".NewButton_btn-primary__7Sw3_").click();


        // First Subject Services
        cy.get(
          ":nth-child(1) > .Services_row__3nqpR > :nth-child(1) > .Services_service__box__3N-VE"
        ).click();
        cy.get(
          ":nth-child(1) > .Services_row__3nqpR > :nth-child(2) > .Services_service__box__3N-VE"
        ).click();


        // Second Subject Services
        cy.get(
          ":nth-child(2) > .Services_row__3nqpR > :nth-child(1) > .Services_service__box__3N-VE"
        ).click();
        cy.get(
          ":nth-child(2) > .Services_row__3nqpR > :nth-child(2) > .Services_service__box__3N-VE"
        ).click();


        // Submit Button
        cy.get(".NewButton_btn-primary__7Sw3_").click();
        cy.get(".NewButton_btn-primary__7Sw3_").click();

        cy.wait("@enrollStudent").then((responseBody) => {
          const { statusCode } = responseBody.response;
          if (statusCode != 201) {

            // Throwing an error in case user is not created/registered successfully
            throw new Error("Error occured.");

          }
        });
      });
  });
});
