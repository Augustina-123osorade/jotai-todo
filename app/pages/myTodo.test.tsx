import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MyTodo from './myTodo'
import { Provider } from 'jotai'
import userEvent from '@testing-library/user-event'
 
describe('MyTodo', () => {

    // testing the heading
  it('renders a heading', () => {
    render(
        <Provider>
            <MyTodo />
        </Provider>
        
    );
 
    const heading = screen.getByRole('heading', { level: 1 });
 
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('TODO APP');
  });

  // testing the add task

  it('renders add task button', ()=> {
    render(
        <Provider>
            <MyTodo />
        </Provider>
    );

    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  it('opens modal when Add Task is clicked', async () => {
    const user = userEvent.setup();

    render(
        <Provider>
            <MyTodo />
        </Provider>
    );

    const addButton = screen.getByText('Add Task');
    await user.click(addButton);

    expect(screen.getByPlaceholderText(/Enter your Todo/i)).toBeInTheDocument();

  });

  it('adds a new todo item', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <MyTodo />
        </Provider>
    );
    const addButton = screen.getByText('Add Task');
    await user.click(addButton);
    const input = screen.getByPlaceholderText(/Enter your Todo/i);
    await user.type(input, 'New Todo Item{enter}'); 
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  it('deletes a todo item', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <MyTodo />
        </Provider>
    );
    const addButton = screen.getByText('Add Task');
    await user.click(addButton);
    const input = screen.getByPlaceholderText(/Enter your Todo/i);
    await user.type(input, 'Todo to be deleted{enter}'); 
    const deleteButton = screen.getByRole('button', { name: 'Delete todo' });
    // Mock the confirm dialog to always return true
    window.confirm = jest.fn(() => true);
    await user.click(deleteButton);
    expect(screen.queryByText('Todo to be deleted')).not.toBeInTheDocument();
  });

  it('edits a todo item', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <MyTodo />
        </Provider>
    );
    const addButton = screen.getByText('Add Task');
    await user.click(addButton);
    const input = screen.getByPlaceholderText(/Enter your Todo/i);
    await user.type(input, 'Todo to be edited{enter}');
    const editButton = screen.getByRole('button', { name: 'Edit todo' });
    await user.click(editButton);
    const editInput = screen.getByPlaceholderText(/Edit your Todo/i);
    await user.clear(editInput);
    await user.type(editInput, 'Edited Todo Item{enter}');
    expect(screen.getByText('Edited Todo Item')).toBeInTheDocument();
    expect(screen.queryByText('Todo to be edited')).not.toBeInTheDocument();
  });

  it('toggles todo completion status', async () => {
    const user = userEvent.setup();
    render(
        <Provider>
            <MyTodo />
        </Provider>
    );
    const addButton = screen.getByText('Add Task');
    await user.click(addButton);
    const input = screen.getByPlaceholderText(/Enter your Todo/i);
    await user.type(input, 'Todo to be completed{enter}');
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  
})