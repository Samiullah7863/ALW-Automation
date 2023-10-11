describe("ALW Dev Login", () => {

  it("Happy Flow with Email and Password", () => {

    cy.login("muhammad.samiullah+alw_student7@arbisoft.com", "Test12");

  });

  // it("Happy Flow with Phone Number", () => {

  //   cy.loginWithNumber("381059018");

  // });

});
