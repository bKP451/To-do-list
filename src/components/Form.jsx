import  React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";
import { createMuiTheme } from "@material-ui/core/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#000000' },
    },
});

const Form = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [ newTodo, setNewTodo ] = useState('');
    const [ todos, setTodos ] = useState([
        {
            text: "Watch Man City vs Arsernal",
            isCompleted: false,
            isEditing: false
        },
        {
            text: "Meet friend for lunch",
            isCompleted: false,
            isEditing: false
        },
        {
            text: "Wash dishes",
            isCompleted: true,
            isEditing: false
        }
    ]);
    const inputRef = useRef();
    const noteRef = useRef({});
    const [ isInputEmpty, setInputEmpty ] = useState(false)


    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
        inputRef.current.focus();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addTodo = text => {
        if ( text !== '') {
            const newTodos = [...todos, { text }]
            setNewTodo('')
            setTodos(newTodos);
        } else {
            console.log('text', text)
            setInputEmpty(true);
        }
    };

    const removeTodo = inx => {
        const newArr = [...todos]
        newArr.splice(inx, 1)
        setTodos(newArr)
    }

    const completeTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isCompleted = !newTodos[inx].isCompleted;
        setTodos(newTodos);
    };

    const editTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        setTodos(newTodos);
    }

    const saveTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        newTodos[inx].text = noteRef.current[inx].value;
        setTodos(newTodos);
    }

    const clearInput = () => {
        setNewTodo('');
    }

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    }

    const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log(`I am ${darkMode}`);
    }

    useEffect(() => {

    }, [todos])

    useEffect(() => {
        if (darkMode) {
          document.body.style.background = 'gray';
        } else {
          document.body.style.background = 'white';
        }
      }, [darkMode]);

    return (
        <>
        <button onClick={toggleDarkMode} className='toggledarkmode'>
            {darkMode ? <DarkModeIcon /> : <Brightness4Icon />}
            </button>
        <form onSubmit={handleSubmit} className="form">

                <TodoCreator
                    theme={theme}
                    todo={newTodo}
                    setTodo={setTodo}
                    clearInput={clearInput}
                    inputRef={inputRef}
                    isInputEmpty={isInputEmpty}
                    preventSubmit={preventSubmit}
                />

                <TodoList
                    theme={theme}
                    todos={todos}
                    completeTodo={completeTodo}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    preventSubmit={preventSubmit}
                />
            </form>
        </>
    )
}

export default Form;