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
    
    
    alert("Forma je uspešno popunjena.");


    
    /*const output = `Korisnik ${fullName} je ocenio film ocenom ${score} i postavio komentar:`;
    document.querySelector("#output").innerHTML = output;
    document.querySelector("#output_comment").innerHTML = `\"${comment}\"`;*/
}