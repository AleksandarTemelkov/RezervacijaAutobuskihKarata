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


    var seat_reservations_list = document.querySelector("#seat-reservations-list");
    const info_submit = document.querySelector("#info_submit");


    for (var i = 0; i < seats_object.length; i++) {
        if (seat == seats_object[i].seat) {
            info_submit.innerHTML = "Sedište je na listi za potvrdu rezervacije.";
            info_submit.style.color = "hsla(0, 50%, 35%, 1)";
            return false;
        }
    }
    

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

    
    info_submit.style.color = "hsla(220, 60%, 20%, 1)";
    info_submit.innerHTML = "Sedište je uspešno dodatnu na listu potvrde.";

    var seat_object = {fullName: `${fullName}`, email: `${email}`, seat: `${seat}`};
    seats_object.push(seat_object);
    document.querySelector(`#bus-seat-${seat}`).classList.remove("bus-seat-available");
    document.querySelector(`#bus-seat-${seat}`).classList.add("bus-seat-pending");
    const seat_list_item = document.createElement("li");
    seat_list_item.classList.add("seat-reservations-list-item");
    seat_list_item.innerText = `• ${fullName} — ${email} — ${seat}`;
    seat_reservations_list.appendChild(seat_list_item);


    console.log(seats_object);
    return seats_object;
    
    /*const output = `Korisnik ${fullName} je ocenio film ocenom ${score} i postavio komentar:`;
    document.querySelector("#output").innerHTML = output;
    document.querySelector("#output_comment").innerHTML = `\"${comment}\"`;*/
}

const main = async (seats_object) => {
    const res = await fetch("http://localhost:8080/loadSeats", {
        method: 'POST',
        body: seats_object
    });

    var seats = await res.json();

    console.log(seats);
}