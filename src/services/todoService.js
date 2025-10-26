import { config, databases, ID } from "./appwriteConfig"

export const getTodos = async() => {
  try {
const response = await 
databases.listDocuments(config.db, config.col.todos)
return response
  } catch (error) {
throw(error)
  }
}

export const addTodo = async (title) => {
   try {
     const newTodo = await database.createDocument(
           config.db,
           config.col.todos,
           ID.unique(),
           { title, completed: false }
       )
       return newTodo
   } catch (error) {
       throw error
   }
}

export const toggleTodo = async (id, completed) => {
   try {
       const updatedTodo = await database.updateDocument(
           config.db,
           config.col.todos,
           id,
           { completed: !completed }
       )
       return updatedTodo
   } catch (error) {
       throw error
   }
}

export const removeTodo = async (id) => {
   try {
       await database.deleteDocument(config.db,
config.col.todos, id)
   } catch (error) {
       throw error
   }
}

