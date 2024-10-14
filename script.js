$(document).ready(function() {
    const locations = [
        { name: "Sultan Qaboos Grand Mosque", coords: [23.583788, 58.3893], hint: "This grand structure is one of the largest in the country, and its chandeliers shine as brightly as the history of Oman.يعد هذا البناء الكبير أحد أكبر المباني في البلاد، وتتألق الثريات فيه مثل تاريخ عُمان." },
        { name: "Jebel Shams", coords: [23.2048, 57.2558], hint: "Often called the ‘Mountain of the Sun,’ it offers the highest peak views in the Sultanate." },
        { name: "Wadi Shab", coords: [22.839135, 59.245280], hint: "A stunning canyon with waterfalls, popular for adventurous hiking and swimming." },
        { name: "Nizwa Fort", coords: [22.9333, 57.5301], hint: "This fort once stood as a defense against invaders and is located in one of Oman’s oldest cities." },
        { name: "Al Hoota Cave", coords: [23.081256, 57.350652], hint: "This natural wonder is filled with stalactites and stalagmites and is home to a lake with blind fish." }
    ];

    let currentLocationIndex = 0;

    // Initialize map
    const map = L.map('map').setView([20.515140, 56.662096], 6);
    L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { maxZoom: 18 }).addTo(map);

    function showHint() {
        $('#hint').text(locations[currentLocationIndex].hint);
        $('#guess').val('');
        $('#nextQuestion').hide();
        $('#submitGuess').show();
    }

    $('#submitGuess').click(function() {
        const guess = $('#guess').val().trim();
        const correctLocation = locations[currentLocationIndex].name;

        if (guess.toLowerCase() === correctLocation.toLowerCase()) {
            alert(`Correct! It's ${correctLocation}.`);
            // Add a green marker for correct guess
            L.marker(locations[currentLocationIndex].coords, { 
                icon: L.icon({ 
                    iconUrl: 'green-marker.png', // Path to the green marker
                    iconSize: [25, 25] 
                }) 
            }).addTo(map).bindPopup(correctLocation).openPopup();
        } else {
            alert(`Sorry, the correct answer is ${correctLocation}.`);
            // Add a red marker for incorrect guess
            L.marker(locations[currentLocationIndex].coords, { 
                icon: L.icon({ 
                    iconUrl: 'red-marker.png', // Path to the red marker
                    iconSize: [25, 25] 
                }) 
            }).addTo(map).bindPopup(correctLocation).openPopup();
        }

        $('#nextQuestion').show();
        $('#submitGuess').hide();
    });

    $('#nextQuestion').click(function() {
        currentLocationIndex++;

        if (currentLocationIndex < locations.length) {
            showHint();
        } else {
            alert('Game Over! Here is the final map with all locations.');
            $('#hint').text('');
            $('#guess').hide();
            $('#submitGuess').hide();
            $('#nextQuestion').hide();
        }
    });

    showHint();
});
