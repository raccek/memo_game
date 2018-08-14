var numberOfSymbols = 8;
var symbols = [];
var cards = []

function prepareSymbols() {
    for (var i = 0 ; i < numberOfSymbols ; i++) {
        var n = i + 1;
    
        symbols.push(n, n)
    }
}

function shuffleSymbols() {
    var max = symbols.length;
    
    for (var i = 0 ; i < max ; i++) {
        var rand = Math.floor(Math.random() * max);

        var tmp = symbols[i];

        symbols[i] = symbols[rand]
        symbols[rand] = tmp
    }
}

function renderCards() {
    var container = document.querySelector('#app');
    var template = document.querySelector('#card-template');

    symbols.forEach(symbol => {
        var copy = template.cloneNode(true)

        copy.removeAttribute('id')
        copy.querySelector('.back').innerText = symbol
        copy.dataset.symbol = symbol

        cards.push(copy)
        container.appendChild(copy)
    })
}

function addClickListeners() {
    var selected = []
    var matched = []
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Czy kliknieta 2 x ta sama karta
            // lub kliknieta karta ktora wygrała
            if (selected.includes(card) || matched.includes(card)) {
                return
            }

            // Czy zaznaczone dwie karty
            if (selected.length === 2) {
                selected[0].classList.remove('selected')
                selected[1].classList.remove('selected')

                selected = []
            }
            
            // Zaznacz karte
            card.classList.add('selected')
            selected.push(card)

            // Czy wygrana
            if (selected.length === 2 && selected[0].dataset.symbol === selected[1].dataset.symbol) {
                selected[0].classList.remove('selected')
                selected[0].classList.add('matched')

                selected[1].classList.remove('selected')
                selected[1].classList.add('matched')

                matched.push(selected[0], selected[1])
            }

            if (matched.length === cards.length) {
                alert('Hurrraaaaaa!!!!!')
            }
        })
    })
}

prepareSymbols()
shuffleSymbols()
renderCards()
addClickListeners()

console.log(symbols)