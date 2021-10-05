const fs = require('fs')
const chalk = require('chalk')

const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Created!'))
    }
    else {
        console.log(chalk.red.inverse('Duplicate Note Title!'))
    }
}

const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    
    if(notes.length === notesToKeep.length){
        console.log(chalk.red.inverse('No Note Found!'))
    }
    else {
        console.log(chalk.green.inverse('Note Successfully Removed!'))
        saveNotes(notesToKeep)
    }
}


const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your Notes...'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}


const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e){
        return []
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}
