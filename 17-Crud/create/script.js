// const createAvatar = document.querySelector('#createAvatar')
const URL_FIREBASE = 'https://js-ceciliaramos-default-rtdb.firebaseio.com/'

const enviar = document.querySelector('#add-person')
const container = document.querySelector('#list-avatar')

const cleanList = () => {
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
};

const deletePersona = async (id) => {
    const url = URL_FIREBASE+id+'.json'
    const deleted = await fetch(url, {
        method:'GET'
    })
    if(deleted.status === 200){
        getInfo()
    }
}

const createAvatar = async(persona) => {
    const url = URL_FIREBASE+'.json'
    const create = await fetch(url, {
        method:'POST',
        body: JSON.stringify(persona)
    })
    if(create.status===200){
        getInfo()
    }
    console.log(create)
}


enviar.addEventListener('click', () => {
    const inputAvatar = document.querySelector('#avatar')
    const inputName = document.querySelector('#name')
    const inputLastName = document.querySelector('#lastName')
    const inputBirthday = document.querySelector('#birthday')
    const inputGender = document.querySelector('input[name="gender"]:checked')
    const inputCountry = document.querySelector('#country')
    const inputDescription = document.querySelector('#description')

    const persona = {
        name: inputName.value,
        lastName: inputLastName.value,
    };
    createAvatar(persona)
})

const renderAvatar = (infoAvatar, index) => {
    const li = document.createElement('li')
    const firstLine = document.createElement('span')
    const button_delete = document.createElement('button')
    const button_edit = document.createElement('button')
    const name = `NOMBRE: ${infoAvatar.name} APELLIDO: ${infoAvatar.lastName}`

    firstLine.className = 'row g1'
    firstLine.textContent = name
    button_delete.className = 'btn btn-danger m-1'
    button_delete.dataset.avatarID = infoAvatar.id
    button_delete.textContent = 'Eliminar'
    button_edit.className = 'btn btn-success m-1'
    button_edit.dataset.avatarID = infoAvatar.id
    button_edit.textContent = 'Editar'


    button_delete.addEventListener('click', (event) => {
        const elementToRemove = event.target.dataset.avatarID
        listAvatar.splice(Number(elementToRemove), 1)
        cleanList()
        renderList(listAvatar)
    })

    button_edit.addEventListener('click', () =>{
        console.log(window)
        const elementToEdit = event.target.dataset.persona
        window.location.href = 'https://127.0.0.1:5000/17-Crud/update/?id' + elementToEdit
        
    })

    li.appendChild(firstLine)
    li.appendChild(button_delete)
    li.appendChild(button_edit)
    container.appendChild(li)

}

const renderList = (listToRender) => {
    console.log(listToRender)
    listToRender.forEach((avatar, index)=>{
        renderAvatar(avatar, index) 
    })
}

const contentList = document.querySelector('#content-list')

const postAvatar = async() => {
    const response = await fetch(URL_FIREBASE, {
        method: 'POST',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(listAvatar)
    })
}


const getInfo = async() => {
    const url = URL_FIREBASE+'.json'
    try{
        const response = await fetch(url)
        console.log(response)
        if(response.status !== 201){
            const parsed = await response.json()
            console.log(parsed)
            renderList(responseParsered)
        }
    } catch (error){
        console.error(error)
    }
}

getInfo(URL_FIREBASE)

const getInfoApi = async() => {
    try {
        const response = await fetch (URL_FIREBASE, {
            method: 'GET'
        })
        const parsed = await response.json()
        renderList(parsed.listAvatar)
    } catch (error) {
        console.error(error)
    }
}


console.log(JSON.stringify(listAvatar))
