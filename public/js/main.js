        // VARIABLES

var seats_object = [];


        // FUNCTIONS

    // Population of Form Field: Seat
const populateFormField_Seat = (i) => {
    document.querySelector("#seat").value = i;
}

    // Form Validation
const validateForm = () => {
    const fullName = document.forms["reservations-form"]["fullName"].value;
    const email = document.forms["reservations-form"]["email"].value;
    const seat = document.forms["reservations-form"]["seat"].value;

    const warning_fullName = document.querySelector("#warning_fullName");
    const warning_email = document.querySelector("#warning_email");
    const warning_seat = document.querySelector("#warning_seat");
    
    const fullName_pattern = /(^[A-Za-z]{2})([ ]{0,1})([A-Za-z]{2})?([ ]{0,1})?([A-Za-z]{2})?([ ]{0,1})?([A-Za-z]{2})/;
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const seat_pattern = /^[0-9]/;
    

    if (fullName == '' || fullName == null) {
        warning_fullName.innerHTML = "Molimo vas unesite puno ime.";
        return false;
    }
    else if(!fullName_pattern.test(fullName)) {
        warning_fullName.innerHTML = "Molimo vas unesite ispravno puno ime.";
        return false;
    }
    else warning_fullName.innerHTML = "";

    if (email == '' || email == null) {
        warning_email.innerHTML = "Molimo vas unesite imejl adresu.";
    }
    else if(!email_pattern.test(email)) {
        warning_email.innerHTML = "Molimo vas unesite ispravnu imejl adresu.";
        return false;
    }
    else warning_email.innerHTML = "";

    if (seat == '' || seat == null) {
        warning_seat.innerHTML = "Molimo vas unesite broj sedišta.";
        return false;
    }
    else if (!seat_pattern.test(seat) || (seat < 2 && seat > 52)) {
        warning_seat.innerHTML = "Molimo vas unesite ispravan broj sedišta.";
        return false;
    }
    else warning_seat.innerHTML = "";
    
    
    info_submit.innerHTML = "Sedište je uspešno dodatnu na listu potvrde.";

    var seat_object = [fullName, email, seat];
    seats_object.push(seat_object);
    document.querySelector(`#bus-seat-${seat}`).classList.remove("bus-seat-available");
    document.querySelector(`#bus-seat-${seat}`).classList.add("bus-seat-pending");

    return seats_object();
    
    /*const output = `Korisnik ${fullName} je ocenio film ocenom ${score} i postavio komentar:`;
    document.querySelector("#output").innerHTML = output;
    document.querySelector("#output_comment").innerHTML = `\"${comment}\"`;*/
}

const form = document.querySelector('reservations-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  const jsonObject = {};

  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }

  fetch('https://localhost:8080/loadSeats', {
    method: 'POST',
    body: JSON.stringify(jsonObject),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
});

/*const main = async (seats_object) => {
    const res = await fetch("http://localhost:8080/loadSeats", {
        method: "POST",
        body: seats_object
    });

    var seats = await res.json();

    console.log(seats);
}*/