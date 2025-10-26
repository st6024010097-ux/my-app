import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const todoLists = [
  { id: 1, task: "Clean the kitchen", completed: true },
  { id: 2, task: "Watch NBA", completed: false },
  { id: 3, task: "Play Basketball", completed: true },
  { id: 4, task: "Movie Night", completed: false },
];

const ToDoListPage = () => {
  const [todoList, setTodoList] = useState(todoLists);
  const [todo, setTodo] = useState("");

  const addNewTask = () => {
    if (todo.trim() === "") return;
    const newId = todoList.length > 0 ? Math.max(...todoList.map((t) => t.id)) + 1 : 1;
    setTodoList([...todoList, { id: newId, task: todo, completed: false }]);
    setTodo("");
  };

  const removeTask = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={todo}
            onChangeText={setTodo}
            placeholder="Add new tasks..."
            placeholderTextColor="#999"
          />
          <Pressable style={styles.addButton} onPress={addNewTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>

        {/* Todo list */}
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.todoCard}>
              <Pressable
                style={styles.todoContent}
                onPress={() => toggleCompleted(item.id)}
              >
                <Text
                  style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                  ]}
                >
                  {item.task}
                </Text>
                <Text style={styles.statusText}>
                  {item.completed ? "✔ Done" : " Pending"}
                </Text>
              </Pressable>
              <Pressable
                style={styles.removeButton}
                onPress={() => removeTask(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  addButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  todoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },
  statusText: {
    fontSize: 12,
    color: "#6b7280",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 12,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ToDoListPage;
