var endPoint = 'server/api.php';
var forms = document.getElementsByTagName('form');

for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', submitForm);
}

function submitForm(event) {
    event.preventDefault();
    var numberField = event.target.getElementsByClassName('number-field')[0];
    var value = numberField.value;
    var player = numberField.dataset.player;
    hideMessage(player);
    if (!isNumberValid(value)) {
        displayMessage('Please enter a valid number', player, true);
        return;
    }
    toggleLoading(event.target);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', endPoint + '?player=' + player + '&guess=' + value);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            handleGuess(response.guess, player);
        } else {
            displayMessage('Something went wrong!', player, true);
        }
        toggleLoading(event.target);
    };
    xhr.send();
}

function handleGuess(guess, player) {
    var bannerText;
    if (guess === 'higher') {
        bannerText = 'Try a higher number';
    } else if (guess === 'lower') {
        bannerText = 'Try a lower number';
    } else if (guess === 'Bingo!!!') {
        bannerText = 'Bingo, you guessed it!';
        celebrate(player);
    }
    displayMessage(bannerText, player);
}

function celebrate(player) {
    document.getElementById('player-' + player + '-box').classList.add('animated', 'tada');
    document.getElementById('fireworks').classList.add('active');
    var banners = document.getElementsByClassName('banner')
    var buttons = document.getElementsByClassName('btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        banners[i].classList.remove('active');
    }
}


//helper functions
function isNumberValid(num) {// Number need to be a valid integer in the inclusive range of 0 => 100
    return !isNaN(parseInt(num)) && num % 1 === 0 && num <= 100 && num >= 0;
}

function displayMessage(text, player, isError = false) {
    var element = document.getElementById('player-' + player + '-banner');
    element.innerText = text;
    element.classList.add('animated', 'fadeIn', 'active');
    if (isError) {
        document.getElementById('player-' + player + '-box').classList.add('animated', 'shake');
        element.classList.add('error');
    }
    setTimeout(function () {
        document.getElementById('player-' + player + '-box').classList.remove('animated', 'shake');
    }, 1000);
}

function hideMessage(player) {
    var element = document.getElementById('player-' + player + '-banner');
    element.classList.remove('active', 'error');
}

function toggleLoading(formContainer) {
    var btn = formContainer.getElementsByClassName('btn')[0];
    var loading = formContainer.getElementsByClassName('lds-ellipsis')[0];
    if (btn.classList.contains('hidden')) {
        btn.classList.remove('hidden');
        loading.classList.add('hidden');
    } else {
        btn.classList.add('hidden');
        loading.classList.remove('hidden');
    }
}