// Seleção de elementos do DOM
const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addBtn');
const noteList = document.getElementById('noteList');

// Inicialização: Carrega as notas ao abrir a página
document.addEventListener('DOMContentLoaded', displayNotes);

// Evento de clique para adicionar nota
addBtn.addEventListener('click', () => {
    const title = noteInput.value.trim();

    if (title === "") {
        alert("Por favor, digite um título para a nota.");
        return;
    }

    addNote(title);
    noteInput.value = ""; // Limpa o campo
});

// Função para adicionar nota no Local Storage
function addNote(title) {
    let notes = getNotesFromStorage();

    // Verifica se o título já existe (Requisito: Título único)
    const exists = notes.some(note => note.title === title);
    if (exists) {
        alert("Já existe uma nota com este título!");
        return;
    }

    const newNote = { title: title };
    notes.push(newNote);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Função para recuperar notas do Local Storage
function getNotesFromStorage() {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
}

// Função para listar as notas na tela
function displayNotes() {
    const notes = getNotesFromStorage();
    noteList.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${note.title}</span>
            <button class="btn-remove" onclick="removeNote('${note.title}')">Remover</button>
        `;
        noteList.appendChild(li);
    });
}

// Função para remover nota do Local Storage
function removeNote(title) {
    let notes = getNotesFromStorage();
    
    // Filtra o array para remover o item com o título correspondente
    const updatedNotes = notes.filter(note => note.title !== title);
    
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    displayNotes();
}