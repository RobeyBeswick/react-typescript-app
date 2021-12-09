import React from 'react'

type ITodo = { 
  // Our todo should have the title and completed fields and the id field to 
  id: number;
  title: string;
  completed: boolean;
}

type ITodos = {
  todos: ITodo[], // Our Todos is an array of Todo
}


// This accepts props with one field addTodos, a function that takes in a string and returns nothing
// This const is a jsx element, it returns a jsx element
const AddTodoComponent = ({addTodos} : {addTodos: (text: string) => void}) => {
  //setTodo and todo states are both set to empty string
  // This is so cool, it returns a state and a function to update it
  const [todo, setTodo] = React.useState<string>("");
  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // if the state is not set, alert the use to set a todo
    if (!todo) {
      alert("Please enter a todo");
    } else {
      // This is the todo state that gets edited by setTodos, which is the function that accepts the data on entry
      // it uses the function it is given here to put a new single todo in the todos list in the app, we often pass around
      // functions in react and it is something you are going to have to get used to 
      addTodos(todo);
      setTodo("");
    }
  };
  return (
    <div className="AddTodo">
      <form>
        <input
          value={todo}
          // on a mouse action
          onChange={e => {setTodo(e.target.value)}} />
        <button onClick={submit}>Add</button>
      </form>
    </div>
  );
};

function App() {
  // Set up an empty state 
  const [todos, setTodos] = React.useState<ITodos>({todos: []});
  // 
  const addTodos = (title: string) => { 
    // The react state is set up by the setTodos
    // This is passed to the AddTodoComponent react element and it adds a new component 
    // to the list
    setTodos({
      todos: [
        {title, completed: false, id: todos.todos.length+1}, 
        // here the rest of the todos already in existence are added to the todo state
        ...todos.todos
      ]
    });
  };
  // this function edits the settodos again
  const deleteTodos = (id: number) => {
    setTodos({
      // Edit out the todo that is passed
      todos: todos.todos.filter(t => t.id !== id)
    });
  };
  // this is passed to the todosComponent react class and changes the completed state on the todos app
  const toggleTodos = (id: number) => {
    setTodos({
      todos: todos.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    });
  }
  // 
  return (
    <div className="App">
      {/* I am not sure */}
      <AddTodoComponent addTodos={addTodos} />
      <hr />
      <TodosComponent 
        todos={todos} 
        toggleTodos={toggleTodos}
        deleteTodos={deleteTodos} />
    </div>
  );
}
// THIS FUNCTION expects functions as arguments, these functions are defined in the app 
const TodosComponent: React.FC<{
  todos: ITodos, // list of all todos, ID, title, completed
  toggleTodos: (id: number) => void,// changes the completed field of the current ITodo
  deleteTodos: (id: number) => void //
}> = ({todos, toggleTodos, deleteTodos}) => {
  const deleteTodo = (id: number) => {
    if (window.confirm(`Are you sure you want to delete todo?`)) {
      deleteTodos(id);
    }
  }
  return (
    <div className="section__todos">
    <h2>Todos</h2>
    {todos.todos.length ? <ul className="todos">
      {todos.todos.map(todo => (
        <li key={todo.id}>
          <span style={{textDecoration: todo.completed? 'line-through': 'none'}}>{todo.title}</span>
          <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleTodos(todo.id)} />
          <button onClick={() => {deleteTodo(todo.id)}}>X</button>
        </li>
      ))}
    </ul>: <div>No Todo has been created</div>}
  </div>
  );
};


export default App;