describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
      cy.setCookie('accessToken', 'test-access-token');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен загружать ингредиенты', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
  });

  it('должен открывать модальное окно ингредиента при клике', () => {
    cy.contains('Краторная булка N-200i').click();
    
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('должен закрывать модальное окно по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.get('#modals').within(() => {
      cy.get('button').first().click();
    });
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен закрывать модальное окно по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    
    cy.get('#modals')
      .find('div')
      .not(':contains("Детали ингредиента")')
      .not(':contains("Краторная булка")')
      .last()
      .click({ force: true });
    
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен создавать заказ', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    
    cy.contains('12345').should('be.visible');
    cy.contains('идентификатор заказа').should('be.visible');
  });

  it('должен закрывать модальное окно заказа и очищать конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();
    
    cy.contains('Оформить заказ').click();
    cy.wait('@createOrder');
    
    cy.contains('12345').should('be.visible');
    
    cy.get('#modals')
      .find('div')
      .not(':contains("12345")')
      .not(':contains("идентификатор")')
      .last()
      .click({ force: true });
    
    cy.contains('12345').should('not.exist');
    
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});

