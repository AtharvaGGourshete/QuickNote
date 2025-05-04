import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);

      // Show toast notification
      toast.success("Task added successfully! Kindly reload the page ");

      // Clear input after submission
      setDescription("");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to add task.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center text-5xl font-bold p-10 text-gray-800"
        >
          <span>QuickNote</span>
        </motion.div>
        <form onSubmit={onSubmitForm}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex px-10 md:px-40 gap-4 items-center"
          >
            <motion.div
              whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              <Input
                type="text"
                className="form-control w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your task..."
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition duration-200 cursor-pointer"
              >
                Add Task
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default InputTodo;