import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch todos from server
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");

      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // Animation variants for staggered row entrance
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-10 text-black max-w-4xl mx-auto"
    >
      <Table className="bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-semibold text-gray-800">Description</TableHead>
            <TableHead className="font-semibold text-gray-800">Edit</TableHead>
            <TableHead className="font-semibold text-gray-800">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.tr
                key={todo.todo_id}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={rowVariants}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="font-medium text-gray-700">{todo.description}</TableCell>
                <TableCell>
                  <EditTodo todo={todo} />
                </TableCell>
                <TableCell>
                  <motion.div
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="destructive"
                      onClick={() => deleteTodo(todo.todo_id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                    >
                      Delete
                    </Button>
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ListTodos;