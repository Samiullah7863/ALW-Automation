describe("Practice", () => {
  it("Practice Test", () => {


    cy.visit({ url: "/registration", failOnStatusCode: false });
    cy.get(".form-select__control").within((list) => {
      console.log(list);
    })







    // *   *   *   *   *   *   *   * Ingredients Practice Code  *   *   *   *   *   *   *   *   *   *

    // cy.intercept(
    //   "GET",
    //   "https://rahulshettyacademy.com/seleniumPractise/"
    // ).as("ingredientPage");

    // let numberOfItems = 4;
    
    // cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");

    // cy.wait("@ingredientPage")
    // .then(intercept => {
    //   const { statusCode } = intercept.response;
    //   if (statusCode !== 200) {
    //     throw new Error("Error occured.");
    //   }
    // })

    // cy.get('.search-keyword').type("Capsicum");
    // cy.wait(1000);

    // for (let i=1; i<numberOfItems; i++) {
    //     cy.get('.increment').click();   
    // }

    // cy.get('.product-action > button').click();
    // cy.get('.cart-icon > img').click();

    // cy.get('p.quantity').first().contains(numberOfItems);


  });
});
