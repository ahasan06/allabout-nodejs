const fs = require("fs");
const { title } = require("process");
const filepath = "./data.json" // file path

console.log("Todo.js is running...");

const loadTasks = ()=>{ // load the data from the file
    try {
        const dataBuffer = fs.readFileSync(filepath) // read the file in binary formet example : 101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
        const dataJSON = dataBuffer.toString() // convert the binary data to string example: 101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
        return JSON.parse(dataJSON) // convert the string to json object example : {"name":"John","age":30,"city":"New York"}
        
    } catch (error) { // catch the error if the file is not found
        console.log(error); // print the error
        return []; 
        
    }
}

const saveTasks = (tasks) => { // save the data to the file
    const dataJSON = JSON.stringify(tasks) // convert the json object to string example : {"name":"John","age":30,"city":"New York"}
    fs.writeFileSync(filepath,dataJSON)// write the data to the file 
    console.log(dataJSON); // print the data

}

const addTask = (title,description ) => { // add a new task
    const tasks = loadTasks() // load the data from the file
    const duplicateTask = tasks.find((task) => task.title === title) // find the task with the same title
    if (!duplicateTask) { // if the task is not found
        tasks.push({ // add the new task
            title: title,
            description: description
        })

        saveTasks(tasks) // save the data to the file
        console.log('Task added successfully'); // print the message
    }

}

const removeTask = (title) => { // remove a task
    const tasks = loadTasks() // load the data from the file
    const filteredTasks  = tasks.filter((task)=>task.title!==title)// filter the task with the same title
    if (tasks.length > filteredTasks.length) {
        saveTasks(filteredTasks) // save the data to the file
        console.log('Task removed successfully'); // print the message
    }else{
        console.log('Task not found'); // print the message
    }
    
}

const updateTask = (title,description) => { // update a task
    const tasks = loadTasks() // load the data from the file
    const task = tasks.find((task)=>task.title===title) // find the task with the same title
    if (task) { // if the task is found
        task.description = description
        saveTasks(tasks) // save the data to the file
        console.log('Task updated successfully'); // print the message
    }
    else{
        console.log('Task not found'); // print the message
    }
}

const readTask = (title) => { // read a task
    const tasks = loadTasks() // load the data from the file
    const task  = tasks.find((task)=>task.title===title) // find the task with the same title
    if (task) {
    console.log(`Title :${task.title}` );
    console.log(`Description :${task.description}` );
    
    }
    else{
        console.log('Task not found'); // print the message
    }
   
    
}


addTask('Learn Node.js','Completed the node.js course');
addTask('Learn Next.js','Completed the Next.js course');
addTask('Learn Css','Completed the Css course');
addTask('Learn Html','Completed the Html course');
removeTask('Learn Node.js');
updateTask('Learn Next.js','Completed the Next.js course within 15days');
readTask('Learn Next.js');
