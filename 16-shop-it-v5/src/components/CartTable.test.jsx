import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartTable from './CartTable';
import CartContext from '../contexts/CartContext';

function renderCartTable({ cart = [], dispatch = vi.fn() } = {}) {
  render(
    <CartContext.Provider value={{ cart, dispatch }}>
      <CartTable />
    </CartContext.Provider>
  );

  return { dispatch };
}

describe('CartTable', () => {

  const mockCart = [
    { id: 1, name: 'Laptop', price: 50000, quantity: 2, total: 100000 },
    { id: 2, name: 'Phone', price: 20000, quantity: 1, total: 20000 },
  ];

  it('renders empty cart state when there are no items', () => {
    renderCartTable({ cart: [] });
    expect(screen.getByText('Your Cart Is Empty')).toBeInTheDocument();
    expect(screen.getByText('Add products to see them here.')).toBeInTheDocument();
  });

  it('renders cart rows and grand total when items exist', () => {
    renderCartTable({ cart: mockCart });
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('2 item(s) selected')).toBeInTheDocument();
    expect(screen.getByText('₹120000')).toBeInTheDocument();
  });

  it('dispatches CHANGE_QUANTITY with +1 when plus button is clicked', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCartTable({ cart: mockCart });
    const controls = screen.getByRole('group', { name: /quantity controls for laptop/i });
    const buttons = controls.querySelectorAll('button');
    await user.click(buttons[1]);

    expect(dispatch).toHaveBeenCalledWith({ type: 'CHANGE_QUANTITY', id: 1, quantity: 1 });
  });

  it('dispatches CHANGE_QUANTITY with -1 when minus button is clicked', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCartTable({ cart: mockCart });

    const controls = screen.getByRole('group', { name: /quantity controls for laptop/i });
    const buttons = controls.querySelectorAll('button');
    await user.click(buttons[0]);

    expect(dispatch).toHaveBeenCalledWith({ type: 'CHANGE_QUANTITY', id: 1, quantity: -1 });
  });

  it('dispatches REMOVE_FROM_CART when remove button is clicked', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCartTable({ cart: mockCart });

    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    await user.click(removeButtons[0]);

    expect(dispatch).toHaveBeenCalledWith({ type: 'REMOVE_FROM_CART', id: 1 });
  });

  it('dispatches CLEAR_CART when clear cart is confirmed', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCartTable({ cart: mockCart });
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    await user.click(screen.getByRole('button', { name: /clear all cart items/i }));

    expect(window.confirm).toHaveBeenCalledWith('Clear all items from cart?');
    expect(dispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });

    window.confirm.mockRestore();
  });

  it('does not dispatch CLEAR_CART when confirmation is cancelled', async () => {
    const user = userEvent.setup();
    const { dispatch } = renderCartTable({ cart: mockCart });
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    await user.click(screen.getByRole('button', { name: /clear all cart items/i }));

    expect(window.confirm).toHaveBeenCalledWith('Clear all items from cart?');
    expect(dispatch).not.toHaveBeenCalledWith({ type: 'CLEAR_CART' });

    window.confirm.mockRestore();
  });
});
