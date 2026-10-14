const STORAGE_KEY = 'DatosUsuario';

const form = document.getElementById('formulario');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputEdad = document.getElementById('edad');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('lista');

let DatosUsuario = cargarDeStorage();

function cargarDeStorage() {
    try {
        const datos = localStorage.getItem(STORAGE_KEY);
        return datos ? JSON.parse(datos) : [];
    
    if (!array.isArray(usuario)){
        return[];
    }

    return usuario.filter(usuario =>
        usuario &&
        Number.isSafeInteger(usuario,id) &&
        typeof usuario.nombre === 'string' &&
        usuario.nombre.trim.trim().length >= 3 &&
        typeof usuario.apellido === 'string' &&
        usuario.apellido.trim().length >= 3 &&
        usuario.edad >= 0 &&
        usuario.edad <= 120
    );
}
catch(error){
    console.error('Error al cargar los datos', error)
    return [];
}
}

function guardarEnStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DatosUsuario));
    }
    catch (error) {
        console.error('Error al guardar los datos', error);
        mensaje.textContent = 'No se pudieron guardar los datos';
    }
}

function validar(nombre, apellido, edad) {
    if(nombre.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
    if(apellido.trim().length < 3) return 'El apellido debe tener al menos 3 caracteres';
    if(isNaN(edad) || edad < 0 || edad > 120) return 'La edad debe ser un número entre 0 y 120';
    return null;
}

function render(){
    lista.replaceChildren();
    DatosUsuario.forEach((usuario) => {
        const li = document.createElement('li');
        li.textContent = `${usuario.nombre} ${usuario.apellido}, ${usuario.edad} años`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.dataset.id = usuario.id;
        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const edad = inputEdad.value;

    const error = validar(nombre, apellido, edad);
    if (error){
        mensaje.textContent = error;
        return;
    }
DatosUsuario.push({
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    edad: edad
});
guardarEnStorage();
render();
form.reset();
mensaje.textContent = 'Guardado correctamente';
inputNombre.focus();
})

lista.addEventListener('click', (event) => {
    if(event.target.tagName !== 'BUTTON')return;
    const id = Number(event.target.dataset.id);
    DatosUsuario = DatosUsuario.filter(usuario => usuario.id !== id);
    guardarEnStorage();
    render();
    
});

render();