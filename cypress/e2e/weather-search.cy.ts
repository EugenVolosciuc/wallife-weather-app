describe("Weather search", () => {
  it("should show weather info for a searched city", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-testid='location-search-input']").click().type("London");

    cy.intercept("http://localhost:3000/api/weather?location=London", {
      fixture: "london-weather.json",
    });
    cy.get("[data-testid='location-search-btn']").click();

    cy.contains("London, GB").should("exist");
  });

  it("should inform the user if a city could not be found", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-testid='location-search-input']").click().type("Bucuresti");

    cy.intercept("http://localhost:3000/api/weather?location=Bucuresti", {
      fixture: "city-not-found.json",
    });

    cy.get("[data-testid='location-search-btn']").click();

    cy.contains("Could not find the searched location").should("exist");
  });
});
