import Realm from 'realm';
export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";

export const TodoSchema = {
	name: TODO_SCHEMA,
	primaryKey: 'id',
	properties: {
		id: 'int',	//primary key
		name: { type: 'string', indexed: true },
		done: { type: 'bool', default: false },
	}
};

export const TodoListSchema = {
	name: TODOLIST_SCHEMA,
	primaryKey: 'id',
	properties: {
		id: 'int',	//primary key
		name: 'string',
		creationDate: 'date',
		todos: { type: 'list', objectType: TODO_SCHEMA },
	}
};

const databaseOptions = {
	path: 'todoListApp.realm',
	schema: [TodoListSchema, TodoSchema],
	schemaVersion: 0, //optional
};
	
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(()) => {
			realm.create(TODOLIST_SCHEMA, newTodoList);
			resolve(newTodoList);
		});
	}).catch((error) => reject(error));
});

export const updateTodoList = todoList => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todolist.id);
			resolve()
		});
	}).catch((error) => reject(error));;
});

export const deleteTodoList = todoList => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			let deleteingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todolist.id);
			realm.delete(deletingTodoList);
			resolve();
		});
	}).catch((error) => reject(error));;
});

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			let allTodoLists = realm.objects(TODOLIST_SCHEMA);
			realm.delete(allTodoLists);
			resolve();
		});
	}).catch((error) => reject(error));;
});

export const queryAllTodoList = () => new Promise((resolve, reject) => {
	Realm.open(databaseOptions).then(realm => {
		realm.write(() => {
			let allTodoLists = realm.objects(TODOLIST_SCHEMA);
			resolve(allTOdoLists);
		});
	}).catch((error) => {reject(error)});;
});

export default new Realm(databaseOptions);