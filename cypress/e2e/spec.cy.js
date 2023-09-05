// describe("Product Assignment Automation", () => {
//   it("Add New Product", () => {

//     // In order to wait for get all products fetch request to complete
//     cy.intercept({
//       method: "GET",
//       url: "https://fakestoreapi.com/products",
//     }).as("getProducts");

//     // In order to wait for POST product fetch request
//     cy.intercept({
//       method: "POST",
//       url: "https://fakestoreapi.com/products",
//     }).as("postProduct");

//     cy.visit("http://127.0.0.1:5500/assignment.html");

//     cy.fixture("spec.json").then((data) => {

//       //Waiting for Request to Complete
//       cy.wait("@getProducts");
//       cy.get("#product-input").type(data.product);
//       cy.get("#add-btn").click();

//       // Waiting for Request to Complete
//       cy.wait("@postProduct");
//       cy.get(".product-item").first().contains(data.product);
//     });
//   });
// });
