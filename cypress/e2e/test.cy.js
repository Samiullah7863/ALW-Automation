describe('Signup with Free trial', () => {
  it('signup free user with 2 subjects and all services ', () => {
  
       //"POST", Cypress.env('baseURL')+"/api/otp/generate").as("getOTP");
       cy.visit('https://juniper-stage-learn.alw.sa/registration', {failOnStatusCode: false })
      // get otp api 
      cy.intercept( "POST", "https://lms-juniper-stage-learn.alw.sa/api/otp/generate").as("getOTP");
      // generate random phone number that starts with 3 
      function generateRandomPhoneNumber() {
          const randomNumber = Math.floor(Math.random() * 900000000) + 100000000; // Generates an 8-digit number
          return '3' + randomNumber.toString().slice(1); // Ensure it starts with '3'
        }
      // register lower grade student
      cy.get('.form-select__value-container.css-1hwfws3').click() 
      cy.contains('الثاني الابتدائي').click()
      const phoneNumber = generateRandomPhoneNumber();
      cy.get('[name = "phone"]').type(phoneNumber)
      cy.get('.NewButton_btn-big__18Lpi').click()
      
      // type OTP
      cy.wait('@getOTP').then(xhr => {
          
          cy.log(xhr.response.body);
          cy.wrap(xhr.response.body.otp).as('OTP');
          
      })
      cy.get('@OTP').then( otpValue => {
          cy.get(':nth-child(1) > :nth-child(1) > .StepTwo_input__3wcRj').type(otpValue)
      })
        
      // cy.wait('@getOTP').then( (response) => {
          // const { body } = response.response
          // return body.otp
      // }).then((otp) => {
          // cy.get(':nth-child(1) > :nth-child(1) > .StepTwo_input__3wcRj').type(otpvalue).should('be.visible') 
      // })
      // cy.wait('@getOTP').its('body').then((body) => { 
      //     return body.otp
      // }).then(cy.log)
     
      
      // cy.get('.NewButton_btn-small__oc5_Z.NewButton_btn-primary__7Sw3_').click()
      
      // // free trial 
      // cy.get('.Subscription_row__1IbU3 > .Subscription_col-md-6__3z5Cf').click({multiple: true})
    
    
  })
})