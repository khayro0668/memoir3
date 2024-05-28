class Resident {
    firstName;
    lastName;
    email;
    country;
    arrivalTime;
    creditCardNumber;
    durationOfReservation;

    constructor(firstName , lastName , email ,
        country , arrivalTime , creditCardNumber , durationOfReservation
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.country = country;
        this.arrivalTime = arrivalTime;
        this.creditCardNumber = creditCardNumber;
        this.durationOfReservation = durationOfReservation;
    }
}