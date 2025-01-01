const formulario = document.getElementById("formularioCita");
const tabla = document.querySelector("#tablaCitas tbody");
const btnAñadirCita = document.getElementById("btnAñadirCita");

// Declaración de variables globales. Array de citas como objeto JSON y índice de la cita a editar
let citas = JSON.parse(localStorage.getItem("citas")) || [];
let citaEditIndex = -1;

// Función para dar formato al campo de fecha de nacimiento
function formatearFecha(fecha) {
    const formatoFecha = { day: "2-digit", month: "2-digit", year: "numeric" };
    // Se usa Intl.DateTimeFormat para dar formato a la fecha con el idioma y el formato deseado
    return new Intl.DateTimeFormat("es-ES", formatoFecha).format(new Date(fecha));
}

// Función para dar formato a los campos de fecha de cita con su hora
function formatearFechaHora(fecha) {
    const formatoFecha = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", formatoFecha).format(new Date(fecha));
}

// Evento click en el botón de añadir cita
btnAñadirCita.addEventListener("click", (event) => {
    // event.preventDefault();

    // Se validan que todos los datos del formulario sean válidos y no se quedan vacios
    if (formulario.fechaCita.value === "" || formulario.nombre.value === "" || formulario.apellido.value === "" || formulario.dni.value === "" || formulario.telefono.value === "" || formulario.fecha.value === "") {
        alert("Por favor, rellene todos los campos");
        formulario.fechaCita.style.borderColor = "#F58787";
        formulario.fechaCita.style.borderWidth = "2px";
        formulario.nombre.style.borderColor = "#F58787";
        formulario.nombre.style.borderWidth = "2px";
        formulario.apellido.style.borderColor = "#F58787";
        formulario.apellido.style.borderWidth = "2px";
        formulario.dni.style.borderColor = "#F58787";
        formulario.dni.style.borderWidth = "2px";
        formulario.telefono.style.borderColor = "#F58787";
        formulario.telefono.style.borderWidth = "2px";
        formulario.fecha.style.borderColor = "#F58787";
        formulario.fecha.style.borderWidth = "2px";
        return;
    } else {
        formulario.fechaCita.style.borderColor = "";
        formulario.fechaCita.style.borderWidth = "";
        formulario.nombre.style.borderColor = "";
        formulario.nombre.style.borderWidth = "";
        formulario.apellido.style.borderColor = "";
        formulario.apellido.style.borderWidth = "";
        formulario.dni.style.borderColor = "";
        formulario.dni.style.borderWidth = "";
        formulario.telefono.style.borderColor = "";
        formulario.telefono.style.borderWidth = "";
        formulario.fecha.style.borderColor = "";
        formulario.fecha.style.borderWidth = "";
    }
    // Se valida que el número de teléfono sea de 9 dígitos y solo números con la función match
    if (!formulario.telefono.value.match(/^\d{9}$/)) {
        alert("El número de teléfono debe ser de 9 dígitos numéricos");
        formulario.telefono.style.borderColor = "#F58787";
        formulario.telefono.style.borderWidth = "2px";
        return;
    } else {
        formulario.telefono.style.borderColor = "";
    }
    // Se valida que el DNI sea de 8 dígitos numéricos y una letra con la función match
    if (!formulario.dni.value.match(/^(\d{8})([a-zA-Z])$/)) {
        alert("El DNI debe ser de 8 dígitos numéricos y una letra");
        formulario.dni.style.borderColor = "#F58787";
        formulario.dni.style.borderWidth = "2px";
        return;
    } else {
        formulario.dni.style.borderColor = "";
        formulario.dni.style.borderWidth = "";
    }

    // Se crea un objeto tipo cita con los datos del formulario
    const cita = {
        id: formulario.fechaCita.value.toString(),
        fechaCita: formulario.fechaCita.value,
        nombre: formulario.nombre.value,
        apellido: formulario.apellido.value,
        dni: formulario.dni.value,
        telefono: formulario.telefono.value,
        fecha: formulario.fecha.value,
        observaciones: formulario.observacion.value
    };

    // Si el índice de la cita a editar es diferente a -1, significa que se está editando una cita
    if (citaEditIndex >= 0) {
        citas[citaEditIndex] = cita;
        citaEditIndex = -1;
        btnAñadirCita.value = "Confirmar cita";
        // Si no se está editando una cita, se añade la nueva cita al array
    } else {
        citas.push(cita);
    }

    // Se guarda el array de citas en el localStorage
    localStorage.setItem("citas", JSON.stringify(citas));

    function limpiarFormulario() {
        formulario.fechaCita.value = "";
        formulario.nombre.value = "";
        formulario.apellido.value = "";
        formulario.dni.value = "";
        formulario.telefono.value = "";
        formulario.fecha.value = "";
        formulario.observacion.value = "";
    }

    // Llamamos a la función para renderizar la tabla de citas
    renderizarTabla();
    // Se limpia el formulario
    limpiarFormulario();

});


// Función para renderizar la tabla de citas
function renderizarTabla() {

    tabla.innerHTML = "";

    // Si el array de citas está vacío, se muestra un mensaje de "No hay citas"
    if (citas.length === 0) {
        const filaVacia = document.createElement("tr");
        const celdaVacia = document.createElement("td");
        celdaVacia.setAttribute("colspan", "9");
        celdaVacia.textContent = "No hay citas";
        celdaVacia.classList.add("text-center");
        filaVacia.appendChild(celdaVacia);
        tabla.appendChild(filaVacia);
        return;
    }

    // Iteramos sobre cada elemento del array de citas para crear la fila
    citas.forEach((cita, index) => {

        const fila = document.createElement("tr");

        const numeroCita = document.createElement("td");
        numeroCita.textContent = index + 1;

        const fechaCita = document.createElement("td");
        fechaCita.textContent = formatearFechaHora(cita.fechaCita);
        fechaCita.classList.add("px-4");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = cita.nombre;
        celdaNombre.classList.add("px-4");

        const celdaApellido = document.createElement("td");
        celdaApellido.textContent = cita.apellido;
        celdaApellido.classList.add("px-4");

        const celdaDNI = document.createElement("td");
        celdaDNI.textContent = cita.dni;
        celdaDNI.classList.add("px-4");

        const celdaTelefono = document.createElement("td");
        celdaTelefono.textContent = cita.telefono;
        celdaTelefono.classList.add("px-4");

        const celdaFecha = document.createElement("td");
        celdaFecha.textContent = formatearFecha(cita.fecha);
        celdaFecha.classList.add("px-4");

        const celdaObservaciones = document.createElement("td");
        celdaObservaciones.textContent = cita.observaciones;

        const celdaBotones = document.createElement("td");


        // Botón para editar la cita
        const btnEditarCita = document.createElement("button");
        btnEditarCita.style.backgroundImage = "url('src/img/iconEdit.png')";
        btnEditarCita.style.backgroundSize = "contain";
        btnEditarCita.style.backgroundRepeat = "no-repeat";
        btnEditarCita.style.backgroundPosition = "center";
        btnEditarCita.style.width = "25px";
        btnEditarCita.style.height = "25px";
        btnEditarCita.style.border = "none";
        btnEditarCita.style.cursor = "pointer";
        btnEditarCita.style.marginRight = "5px";
        btnEditarCita.style.marginLeft = "8px";

        // Evento de click en el botón de editar
        btnEditarCita.addEventListener("click", () => {
            editarCita(index);
        });

        // Botón para borrar la cita
        const btnBorrarCita = document.createElement("button");
        btnBorrarCita.style.backgroundImage = "url('src/img/iconDelete.png')";
        btnBorrarCita.style.backgroundSize = "contain";
        btnBorrarCita.style.backgroundRepeat = "no-repeat";
        btnBorrarCita.style.backgroundPosition = "center";
        btnBorrarCita.style.width = "25px";
        btnBorrarCita.style.height = "25px";
        btnBorrarCita.style.border = "none";
        btnBorrarCita.style.cursor = "pointer";

        // Evento de click en el botón de borrar
        btnBorrarCita.addEventListener("click", () => {
            borrarCita(index);
        });

        celdaBotones.appendChild(btnEditarCita);
        celdaBotones.appendChild(btnBorrarCita);

        // Añadir los elementos al HTML
        fila.appendChild(numeroCita);
        fila.appendChild(fechaCita);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaDNI);
        fila.appendChild(celdaTelefono);
        fila.appendChild(celdaFecha);
        fila.appendChild(celdaObservaciones);
        fila.appendChild(celdaBotones);


        // Añadir la fila al HTML
        tabla.appendChild(fila);

    });
}

// Función para editar una cita
function editarCita(index) {
    const cita = citas[index];

    formulario.fechaCita.value = cita.fechaCita;
    formulario.nombre.value = cita.nombre;
    formulario.apellido.value = cita.apellido;
    formulario.dni.value = cita.dni;
    formulario.telefono.value = cita.telefono;
    formulario.fecha.value = cita.fecha;
    formulario.observacion.value = cita.observaciones;


    btnAñadirCita.textContent = "Actualizar Cita";

    citaEditIndex = index;
}

// Función para borrar una cita
function borrarCita(index) {
    citas.splice(index, 1);

    localStorage.setItem("citas", JSON.stringify(citas));
    renderizarTabla();
}

// Llamamos a la función para renderizar la tabla de citas
renderizarTabla();