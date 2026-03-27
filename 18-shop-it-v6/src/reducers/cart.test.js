import cartreducer from './cart';

describe('cartreducer', () => {
  it('returns the current state for unknown action', () => {
    const state = [{ id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 }];

    const result = cartreducer(state, { type: 'UNKNOWN_ACTION' });

    expect(result).toBe(state);
  });

  it('adds a new item to cart with quantity 1 and total price', () => {
    const result = cartreducer([], {
      type: 'ADD_TO_CART',
      cartLine: { id: 1, name: 'Laptop', price: 50000 },
    });

    expect(result).toEqual([
      { id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 },
    ]);
  });

  it('increments quantity and total when adding an existing item', () => {
    const initial = [{ id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 }];

    const result = cartreducer(initial, {
      type: 'ADD_TO_CART',
      cartLine: { id: 1, name: 'Laptop', price: 50000 },
    });

    expect(result).toEqual([
      { id: 1, name: 'Laptop', price: 50000, quantity: 2, total: 100000 },
    ]);
  });

  it('removes an item by id', () => {
    const initial = [
      { id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 },
      { id: 2, name: 'Phone', price: 20000, quantity: 1, total: 20000 },
    ];

    const result = cartreducer(initial, { type: 'REMOVE_FROM_CART', id: 1 });

    expect(result).toEqual([
      { id: 2, name: 'Phone', price: 20000, quantity: 1, total: 20000 },
    ]);
  });

  it('changes quantity and recalculates total when CHANGE_QUANTITY is positive', () => {
    const initial = [{ id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 }];

    const result = cartreducer(initial, { type: 'CHANGE_QUANTITY', id: 1, quantity: 2 });

    expect(result).toEqual([
      { id: 1, name: 'Laptop', price: 50000, quantity: 3, total: 150000 },
    ]);
  });

  it('removes item when quantity reaches zero', () => {
    const initial = [{ id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 }];

    const result = cartreducer(initial, { type: 'CHANGE_QUANTITY', id: 1, quantity: -1 });

    expect(result).toEqual([]);
  });

  it('returns unchanged array values when CHANGE_QUANTITY id is not found', () => {
    const initial = [{ id: 1, name: 'Laptop', price: 50000, quantity: 1, total: 50000 }];

    const result = cartreducer(initial, { type: 'CHANGE_QUANTITY', id: 99, quantity: 1 });

    expect(result).toEqual(initial);
    expect(result).not.toBe(initial);
  });

  it('clears all items on CLEAR_CART', () => {
    const initial = [
      { id: 1, name: 'Laptop', price: 50000, quantity: 2, total: 100000 },
      { id: 2, name: 'Phone', price: 20000, quantity: 1, total: 20000 },
    ];

    const result = cartreducer(initial, { type: 'CLEAR_CART' });

    expect(result).toEqual([]);
  });
});
