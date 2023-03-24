        // VARIABLES

const fullName = document.forms["reservations-form"]["fullName"];
const email = document.forms["reservations-form"]["email"];
const seat = document.forms["reservations-form"]["seat"];
const info_submit = document.querySelector("#info_submit");
var seat_reservations_list = document.querySelector("#seat-reservations-list");
var seat_reservation_list_total = document.querySelector("#seat-reservation-list_total");
var seats_object = [];
var total_value = 0;


        // FUNCTIONS

    // Population of Form Field: Seat
const populateFormField_Seat = (i) => {
    document.querySelector("#seat").value = i;
}

    // Form Validation
const validateForm = () => {
    var value_fullName = fullName.value;
    var value_email = email.value;
    var value_seat = seat.value;

    const warning_fullName = document.querySelector("#warning_fullName");
    const warning_email = document.querySelector("#warning_email");
    const warning_seat = document.querySelector("#warning_seat");
    
    const fullName_pattern = /(^[A-Za-z]{2})([ ]{0,1})([A-Za-z]{2})?([ ]{0,1})?([A-Za-z]{2})?([ ]{0,1})?([A-Za-z]{2})/;
    const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const seat_pattern = /^[0-9]/;


    for (var i = 0; i < seats_object.length; i++) {
        if (seat == seats_object[i].seat) {
            info_submit.innerHTML = "Sedište je uveliko na listi rezervacija na čekanju.";
            info_submit.style.color = "hsla(0, 50%, 35%, 1)";
            return false;
        }
    }


    if (value_fullName == '' || value_fullName == null) {
        warning_fullName.innerHTML = "Molimo vas unesite puno ime.";
        return false;
    }
    else if(!fullName_pattern.test(value_fullName)) {
        warning_fullName.innerHTML = "Molimo vas unesite ispravno puno ime.";
        return false;
    }
    else warning_fullName.innerHTML = "";

    if (value_email == '' || value_email == null) {
        warning_email.innerHTML = "Molimo vas unesite imejl adresu.";
    }
    else if(!email_pattern.test(value_email)) {
        warning_email.innerHTML = "Molimo vas unesite ispravnu imejl adresu.";
        return false;
    }
    else warning_email.innerHTML = "";

    if (value_seat == '' || value_seat == null) {
        warning_seat.innerHTML = "Molimo vas unesite broj sedišta.";
        return false;
    }
    else if (!seat_pattern.test(value_seat) || (value_seat < 2 && value_seat > 52)) {
        warning_seat.innerHTML = "Molimo vas unesite ispravan broj sedišta.";
        return false;
    }
    else warning_seat.innerHTML = "";

    
    info_submit.style.color = "hsla(220, 60%, 20%, 1)";
    info_submit.innerHTML = "Sedište je uspešno dodato na listu rezervacija na čekanju.";

    var seat_object = {fullName: `${value_fullName}`, email: `${value_email}`, seat: `${value_seat}`};
    seats_object.push(seat_object);
    document.querySelector(`#bus-seat-${value_seat}`).classList.remove("bus-seat-available");
    document.querySelector(`#bus-seat-${value_seat}`).classList.add("bus-seat-pending");

    const seat_list_item = document.createElement("li");
    seat_list_item.classList.add("seat-reservations-list-item");
    if (seat_reservations_list !== null) seat_list_item.style.paddingTop = "10px"; 
    seat_list_item.innerText = `• ${value_fullName}:\n\t› ${value_email}\n\t› ${value_seat}`;
    seat_reservations_list.appendChild(seat_list_item);

    total_value += 1000;
    seat_reservation_list_total.innerHTML = `Total: ${total_value} din.`

    console.log(seats_object);
    return seats_object;
    
    /*const output = `Korisnik ${fullName} je ocenio film ocenom ${score} i postavio komentar:`;
    document.querySelector("#output").innerHTML = output;
    document.querySelector("#output_comment").innerHTML = `\"${comment}\"`;*/
}


const saveSeats = async () => {
    const res = await fetch("http://localhost:8080/loadSeats", {
        method: 'POST',
        body: seats_object
    });

    var seats = await res.json();
    console.log(seats);
}

const confirmButton = document.querySelector("#confirm-button");
const modalConfirm = document.querySelector("#modal-confirm_container");
const modalConfirm_closeButton = document.querySelector("#modal-confirm_close-button");
const modalConfirm_confirmButton = document.querySelector("#modal-confirm_confirm-button");
const modalConfirm_cancelButton = document.querySelector("#modal-confirm_cancel-button");
const cancelButton = document.querySelector("#cancel-button");
const modalCancel = document.querySelector("#modal-cancel_container");
const modalCancel_closeButton = document.querySelector("#modal-cancel_close-button");
const modalCancel_confirmButton = document.querySelector("#modal-cancel_confirm-button");
const modalCancel_cancelButton = document.querySelector("#modal-cancel_cancel-button");

const toggleModalConfirm = () => { console.log(`TOGGLED: toggleModalConfirm()`); modalConfirm.classList.toggle("show-modal"); }
confirmButton.addEventListener("click", () => { toggleModalConfirm(); });
window.addEventListener("click", (event) => { if (event.target === modalConfirm) () => { toggleModalConfirm(); } });
modalConfirm_closeButton.addEventListener("click", () => { toggleModalConfirm(); });
modalConfirm_cancelButton.addEventListener("click", () => { toggleModalConfirm(); });
modalConfirm_confirmButton.addEventListener("click", () => {
    for (var i = 0; i < seats_object.length; i++) {
        document.querySelector(`#bus-seat-${seats_object[i].seat}`).classList.remove("bus-seat-pending");
        document.querySelector(`#bus-seat-${seats_object[i].seat}`).classList.add("bus-seat-unavailable");
        document.querySelector(`#bus-seat-${seats_object[i].seat}`).onclick = null;
    }
    saveSeats(seats_object); 

    var seat_reservation_list_item = seat_reservations_list.lastElementChild;
    while (seat_reservation_list_item) {
        seat_reservations_list.removeChild(seat_reservation_list_item);
        seat_reservation_list_item = seat_reservations_list.lastElementChild;
    }
    seat_reservation_list_total.innerHTML = `Total: `;
    seats_object = [];

    fullName.value = ``;
    email.value = ``;
    seat.value = ``;
    info_submit.innerHTML = ``;

    toggleModalConfirm();
});

const toggleModalCancel = () => { console.log(`TOGGLED: toggleModalCancel()`); modalCancel.classList.toggle("show-modal"); }
cancelButton.addEventListener("click", () => { toggleModalCancel(); });
window.addEventListener("click", (event) => { if (event.target === modalCancel) () => { toggleModalCancel(); } });
modalCancel_closeButton.addEventListener("click", () => { toggleModalCancel(); });
modalCancel_cancelButton.addEventListener("click", () => { toggleModalCancel(); });
modalCancel_confirmButton.addEventListener("click", () => {
    var seat_reservation_list_item = seat_reservations_list.lastElementChild;
    while (seat_reservation_list_item) {
        seat_reservations_list.removeChild(seat_reservation_list_item);
        seat_reservation_list_item = seat_reservations_list.lastElementChild;
    }
    seat_reservation_list_total.innerHTML = `Total: `;
    seats_object = [];

    toggleModalCancel();
});