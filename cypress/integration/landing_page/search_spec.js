describe('Searching for Jams', () => {
  const PLACEHOLDER = 'Search by tag, title, keyword, author, etc...';
  beforeEach(() => {
    cy.visit('/');
  });

  it('Search Input is Available', () => {
    cy.findByPlaceholderText(PLACEHOLDER).should('exist');
  });

  it('Searches for React', () => {
    cy.findByPlaceholderText(PLACEHOLDER).type('React');
    cy.findAllByTestId(/jam-card/i).should('have.length', 15);
  });

  it('Searches for Author', () => {
    cy.findByPlaceholderText(PLACEHOLDER).type('Jason');
    cy.findAllByTestId(/jam-card/i).should('to.be.greaterThan', 1);
  });
});
