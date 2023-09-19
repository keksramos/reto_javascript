// const createAvatar = document.querySelector('#createAvatar')
const enviar = document.querySelector('#add-person')
const container = document.querySelector('#list-avatar')

// Esta variable sería diferente, tenemos que llamar con un GET la base de datos de Firebase
const listAvatar = []

const renderAvatar = (infoAvatar, index) => {
    const li = document.createElement('li')
    const firstLine = document.createElement('span')
    const secondLine = document.createElement('span')
    const thirdLine = document.createElement('span')
    const fourthLine = document.createElement('span')
    const button_delete = document.createElement('button')
    const button_edit = document.createElement('button')
    const image = `AVATAR: ${infoAvatar.avatar}`
    const name = `NOMBRE: ${infoAvatar.name} APELLIDO: ${infoAvatar.lastName}`
    const firstData =  `CUMPLEAÑOS: ${infoAvatar.birthday} GENERO: ${infoAvatar.gender}`
    const secondData = `PAÍS: ${infoAvatar.country} DESCRIPCIÓN: ${infoAvatar.description}`

    firstLine.className = 'row g1'
    secondLine.className = 'row g1'
    thirdLine.className = 'row g1'
    fourthLine.className = 'row g1'
    firstLine.textContent = image
    secondLine.textContent = name
    thirdLine.textContent = firstData
    fourthLine.textContent = secondData
    button_delete.className = 'btn btn-danger m-1'
    button_delete.dataset.avatarID = index
    button_delete.textContent = 'Eliminar'
    button_edit.className = 'btn btn-success m-1'
    button_edit.dataset.avatarID = index
    button_edit.textContent = 'Editar'


    button_delete.addEventListener('click', (event) => {
        const elementToRemove = event.target.dataset.avatarID
        // console.log(event)
        listAvatar.splice(Number(elementToRemove), 1)
        // console.log(listAvatar)
        cleanList()
        // form()
        renderList(listAvatar)
    })

    li.appendChild(firstLine)
    li.appendChild(secondLine)
    li.appendChild(thirdLine)
    li.appendChild(fourthLine)
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

const cleanList = () => {
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
};

enviar.addEventListener('click', () => {
    const inputAvatar = document.querySelector('#avatar')
    const inputName = document.querySelector('#name')
    const inputLastName = document.querySelector('#lastName')
    const inputBirthday = document.querySelector('#birthday')
    const inputGender = document.querySelector('input[name="gender"]:checked')
    const inputCountry = document.querySelector('#country')
    const inputDescription = document.querySelector('#description')

    const avatar = {
        avatar: inputAvatar.value,
        name: inputName.value,
        lastName: inputLastName.value,
        birthday: inputBirthday.value,
        gender: inputGender.value,
        country: inputCountry.value,
        description: inputDescription.value,
    };

    listAvatar.push(avatar)
    //Este tiene que cambiar a un post de la base de datos de firebase
    
    postAvatar()
    cleanList()
    renderList(listAvatar)
})

const URL_FIREBASE = 'https://js-ceciliaramos-default-rtdb.firebaseio.com/.json'
const contentList = document.querySelector('#content-list')

const postAvatar = async() => {
    const response = await fetch(URL_FIREBASE, {
        method: 'POST',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        body: JSON.stringify(listAvatar)
    })
}


const getInfo = async() => {
    try{
        const response = await fetch(URL_FIREBASE)
        console.log(response)
        if(response.status !== 201){
            const parsed = await response.json()
            console.log(parsed)
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
