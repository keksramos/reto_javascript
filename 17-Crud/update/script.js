console.log(window.location)


const url = new URLSearchParams(search)
const ID_PERSONA = url.get('id')

const search = window.location.search
const inputName = document.querySelector('#name')
const inputLastName = document.querySelector('#lastName')
const buttonSave = document.querySelector('#add-person')

const updatePersona = async() => {
    const persona ={
        name: 'Editado',
        lastName: 'Elemento'
    }
    const url = URL_API + ID_PERSONA + 'json'
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(persona)
    })
    if(response.status === 200){
        window.location.href = ''
    }
}

buttonSave.addEventListener('click', () => {
    updatePersona()
})

const getInfoById = async() => {
    const url = URL_API + id + 'json'
    const info = await fetch(url)
    const parsed = await info.json()
    console.log(parsed)
    inputName.value = parsed.name
    inputLastName.value = parsed.inputLastName
}

console.log(getInfoById)