import React, { useState } from 'react';
import './App.js'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';

function Todolist() {
    const columns = [
        { field: "description", sortable: true, filter: true, floatingFilter: true, animateRows: true, rowDragManaged: true},
        { field: "date", sortable: true, filter: true, floatingFilter: true, animateRows: true, rowDragManaged: true},
        { field: "priority", sortable: true, filter: true, floatingFilter: true, animateRows: true, rowDragManaged: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
        ];
        
        

  const [todo, setTodo] = useState({description: '', date: null, priority:''});
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState("DD.MM.YYYY");

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

const dateChanged = date => {
  setTodo({...todo, date: date.format('DD.MM.YYYY')});
  setDate(date);
}

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
    setTodos(todos.filter((todo, index) =>
    index != gridRef.current.getSelectedNodes()[0].id))
    }
    else {
    alert('Select row first');
    }
    };
    
    
    


  return (
    <div>
      <Stack direction="row" spacing={2} justifycontent="center" alignItems="center">
      <TextField 
          label="Description"
          variant='standard'
          name="description" value={todo.description}
          onChange={inputChanged}/>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value= {date} onChange={dateChanged} />
           
         
      </LocalizationProvider>

      <TextField 
         label="Priority"
          variant="standard"
          name="priority" value={todo.priority}
          onChange={inputChanged}
         />
 
      <Button onClick={addTodo} variant="contained" color="primary">Add</Button>
      <Button onClick={deleteTodo} variant="contained" color='secondary'>Delete</Button>    
      </Stack>
      <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}} >
        <AgGridReact
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api}
        rowSelection='single'
        rowDragManaged={true}
        animateRows={true}
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
        </div>

    </div>
  );
};

export default Todolist;