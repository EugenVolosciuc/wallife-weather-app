describe("Weather Bookmark", () => {
  it("should be able to bookmark a city", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-testid='location-search-input']").click().type("London");

    cy.intercept("http://localhost:3000/api/weather?location=London", {
      fixture: "london-weather.json",
    });
    cy.get("[data-testid='location-search-btn']").click();
    cy.get("[data-testid='bookmark-btn']").click();
    cy.get("[data-testid='bookmark-list'] > div").should(
      "have.length.at.least",
      1
    );
  });

  it("should be able to remove a bookmark", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-testid='location-search-input']").click().type("London");

    cy.intercept("http://localhost:3000/api/weather?location=London", {
      fixture: "london-weather.json",
    });
    cy.get("[data-testid='location-search-btn']").click();
    cy.get("[data-testid='bookmark-btn']").click();
    cy.get(
      "[data-testid='bookmark-list'] [data-testid='bookmark-btn']"
    ).click();
    cy.get("[data-testid='bookmark-list'] > div").should("have.length", 0);
  });
});
