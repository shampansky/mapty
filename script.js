'use strict';

const form = document.querySelector('.form');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      map.on('click', function(mapE) {
        mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function() {
      console.log('error getting location');
    }
  )
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  [inputDistance, inputDuration, inputCadence, inputElevation].forEach(input => {
    input.value = '';
  })

  const {lat, lng} = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup'
    }))
    .setPopupContent('test')
    .openPopup();
});

inputType.addEventListener('change', function() {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});