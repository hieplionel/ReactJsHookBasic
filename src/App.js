import logo from './logo.svg';
import './App.css';
import Nav from './views/Nav';
import { useState, useEffect } from 'react';
import Todo from './views/Todo';
import Covid from './views/Covid';
import {CountDown, NewCountDown} from './views/Countdown';
import Blog from './views/Blog';
import DetailBlog from './views/DetailBlog';
import AddNewBlog from './views/AddNewBlog';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


// template + logic
// JSX
const App = () => {
  let [name, setName] = useState('Lionel')
  const [address, setAddress] = useState('')
  const [todos, setTodos] = useState([
    {id: 'todo1', title:'watching channel', type: 'lionel'},
    {id: 'todo2', title:'Doing homework', type: 'lionel'},
    {id: 'todo3', title:'Playing game',  type: 'messi'},
    {id: 'todo4', title:'Debug code',  type: 'messi'}

  ]);

  // khi thêm 1 mảng vào cuối hàm useEffect thì hàm này chỉ chạy 1 lần 
  // duy nhất khi render lần đầu
  // cách viết này tương đương với hàm didmount ở class compoment
  // có thể tách ra thành nhiều hàm useEffect hoặc viết gộp mảng
  useEffect(() => {
    // console.log('run use Effect');
  }, [address]);

  useEffect(() => {
    // console.log('run use Effect todos');
  }, [todos]);

  const handleEventClick = (event) => {
    if(!address) {
      alert('empty input')
      return;
    }
    // hook not merge state
    // ...spread syntax array js
    let newTodo = {
      id: Math.floor((Math.random()*100) + 1), 
      title: address, 
      type:'lionel' 
    }
    setTodos ([...todos, newTodo])
    setAddress('')
  };

  const handleOnChangeInput = (event) => {
    setAddress(event.target.value)
  };

  const deleteDataTodo = (id) => {
    let currentTodos = todos;
    currentTodos = currentTodos.filter(item => item.id !== id)
    setTodos(currentTodos)
  }

  const onTimesUp = () => {
    // alert('Times Up')
  }

  // re-render
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav/>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Covid/>
          </Route>
          <Route path="/timer">
            <CountDown onTimesUp={onTimesUp}/>
            <span>-----------</span>
            <NewCountDown onTimesUp={onTimesUp}/>
          </Route>
          <Route path="/todo">
            <Todo
              todos={todos}
              title={'All todos'}
              deleteDataTodo = {deleteDataTodo}
            />
            <Todo
              todos={todos.filter(item => item.type === 'messi')}
              title={`Messi's todos`}
              deleteDataTodo = {deleteDataTodo}
            />
            <input type="text" value={address} onChange={(event) => handleOnChangeInput(event)}/>
            <button type="button" onClick= {(event) => handleEventClick(event)}>Click me!</button>
          </Route>
          <Route path="/blog" exact>
            <Blog/>
          </Route>
          <Route path="/blog/:id">
            <DetailBlog/>
          </Route>
          <Route path="/add-new-blog">
            <AddNewBlog/>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
