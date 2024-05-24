import { createSlice } from '@reduxjs/toolkit';
import { submitTodo, fetchTodos, deleteTodo, editTodo, fetchTodoCount } from './action';

const initialState = {
  todos: [],
  todoCount: 0,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTodo.fulfilled, (state, action) => {
        console.log("Todo submitted successfully:", action.payload);
        state.todos.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const { todoId, updatedTodo } = action.payload;
        const index = state.todos.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...updatedTodo };
        }
      })
      .addCase(fetchTodoCount.fulfilled, (state, action) => {
        state.todoCount = action.payload;
      });
  },
});

export const { reducer } = todoSlice;
export default reducer;
