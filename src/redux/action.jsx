import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from "../firebase/Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

export const inputForm = createAction('INPUT_FORM');

export const submitTodo = createAsyncThunk(
  'todo/submitTodo',
  async (payload) => {
    const docRef = await addDoc(collection(db, "todos"), payload);
    const docSnapshot = await getDoc(docRef);  // Corrected this line
    return { id: docSnapshot.id, ...docSnapshot.data() };
  }
);

export const fetchTodoCount = createAsyncThunk(
  'todo/fetchTodoCount',
  async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.size;
  }
);

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (todoId) => {
    await deleteDoc(doc(db, "todos", todoId));
    return todoId;
  }
);

export const editTodo = createAsyncThunk(
  'todo/editTodo',
  async ({ todoId, updatedTodo }) => {
    await updateDoc(doc(db, "todos", todoId), updatedTodo);
    return { todoId, updatedTodo };
  }
);
