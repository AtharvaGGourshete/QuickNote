import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (todo && todo.description) {
      setDescription(todo.description);
    }
  }, [todo]);

  const updateTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:3000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update todo.");
      }

      const updated = await response.json();
      console.log("Todo updated:", updated);

      // Optionally show a success message
      window.location.reload(); // OR trigger a refetch from parent
    } catch (err) {
      console.error("Error updating todo:", err.message);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05}}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer">
            Edit
          </Button>
        </motion.div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-semibold text-gray-800">
                Edit Task
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Modify your task description below.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <motion.div
              whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
              transition={{ duration: 0.3 }}
            >
              <Input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                placeholder="Update task description..."
              />
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-sm mt-2"
              >
                {error}
              </motion.p>
            )}

            <AlertDialogFooter className="mt-6 flex gap-4 justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <AlertDialogCancel
                  onClick={() => setDescription(todo.description)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer"
                >
                  Cancel
                </AlertDialogCancel>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <AlertDialogAction
                  onClick={updateTodo}
                  disabled={loading}
                  className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer ${loading ? "opacity-50" : ""}`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </AlertDialogAction>
              </motion.div>
            </AlertDialogFooter>
          </motion.div>
        </AnimatePresence>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTodo;