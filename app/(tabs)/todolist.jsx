import { useState, useEffect } from "react";
import { FlatList, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultTodos = [
  { id: 1, task: "Clean the kitchen", completed: true },
  { id: 2, task: "Watch NBA", completed: false },
  { id: 3, task: "Play Basketball", completed: true },
  { id: 4, task: "Movie Night", completed: false },
];

const STORAGE_KEY = "@todo_list";

const ToDoListPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Load saved tasks from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setTodoList(JSON.parse(storedData));
        } else {
          setTodoList(defaultTodos);
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, []);

  // Save tasks to AsyncStorage
  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  const addNewTask = () => {
    if (todo.trim() === "") return;
    const newId = todoList.length > 0 ? Math.max(...todoList.map((t) => t.id)) + 1 : 1;
    const updatedList = [...todoList, { id: newId, task: todo, completed: false }];
    setTodoList(updatedList);
    saveData(updatedList);
    setTodo("");
  };

  const removeTask = (id) => {
    const updatedList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedList);
    saveData(updatedList);
  };

  const toggleCompleted = (id) => {
    const updatedList = todoList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodoList(updatedList);
    saveData(updatedList);
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditedText(item.task);
  };

  const saveEditedTask = (id) => {
    const updatedList = todoList.map((item) =>
      item.id === id ? { ...item, task: editedText } : item
    );
    setTodoList(updatedList);
    saveData(updatedList);
    setEditingId(null);
    setEditedText("");
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
              <View style={{ flex: 1 }}>
                {editingId === item.id ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={editedText}
                      onChangeText={setEditedText}
                    />
                    <Pressable
                      style={[styles.doneButton, { marginTop: 6 }]}
                      onPress={() => saveEditedTask(item.id)}
                    >
                      <Text style={styles.doneButtonText}>Done</Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable onPress={() => toggleCompleted(item.id)}>
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
                )}
              </View>

              {/* Edit & Remove buttons */}
              {editingId !== item.id && (
                <View style={styles.actionButtons}>
                  <Pressable
                    style={styles.editButton}
                    onPress={() => startEditing(item)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeTask(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </Pressable>
                </View>
              )}
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
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
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
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  doneButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ToDoListPage;
