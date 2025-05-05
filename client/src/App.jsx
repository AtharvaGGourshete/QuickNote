import React, { Fragment } from "react";
import "./App.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodo";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <div className="container">
        <Toaster />
        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
