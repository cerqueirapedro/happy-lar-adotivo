//Cria o mapa e seleciona a região inicial do mapa através da latidude e longitude
const map = L.map('mapid').setView([-12.9015883, -38.4901455], 15);

//Adiciona o mapa com a camada de renderização(tile layer) padrão
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//cria o icone
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // add lat e lng
    document.querySelector(' [name=lat] ').value = lat;
    document.querySelector(' [name=lng] ').value = lng;

    // remove icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], { icon }).addTo(map)
})

// adicionar o campo de fotos
function addPhotoField() {

    // pegar o container de fotos #images
   const container = document.querySelector('#images')

    // pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    // realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    
    // Verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]

    if(input.value == "") {
        return
    }

    // limpar o campo antes de adicionar ao container de imagens
    input.value = ""

    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)

}
 
// deletar o campo de fotos
function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length < 2 ) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // Deletar o campo 
    span.parentNode.remove()
}

// select yes or no
function toggleSelect() {

    // retirar a classe .active dos botões
    document.querySelectorAll('.button-select button')
    .forEach( function (button) {
        button.classList.remove('active') 
    })  

    // colocar a class .active nesse botão clicado
    const button = event.currentTarget
    button.classList.add('active')

     // atualizar o meu input hidden com o valor selecionado 
     const input = document.querySelector('[ name="open_on_weekends"]')

     input.value = button.dataset.value
}