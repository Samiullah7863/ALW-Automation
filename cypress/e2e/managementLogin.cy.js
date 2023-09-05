describe('ALW Dev Management Login', () => {

    it('Teacher Login Happy Flow with Email and Password', () => {
      cy.visit({url: '/management-login', failOnStatusCode: false});
      cy.get(".ManagementLogin_form__mNdmK input").first().type("muhammad.samiullah+alw_teacher_dev@edly.io");
      cy.get(".ManagementLogin_form__mNdmK input").last().type("Test12");
      cy.get(".ManagementLogin_side-actions__2coJ- button").click();
    })
  
  })