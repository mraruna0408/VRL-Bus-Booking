let busPrice = 0;

let selectedBusName = "";

let selectedDeparture = "";

let selectedArrival = "";

let selectedDuration = "";

let bookingData = null;

let requiredPassengers = 1;


/* ================= HIDE ALL ================= */

function hideAll() {

    document.getElementById("home")
        .classList.add("hidden");

    document.getElementById("login")
        .classList.add("hidden");

    document.getElementById("register")
        .classList.add("hidden");

    document.getElementById("booking")
        .classList.add("hidden");

    document.getElementById("bus-list")
        .innerHTML = "";

    document.getElementById("seat-section")
        .style.display = "none";

    document.getElementById("passenger-section")
        .style.display = "none";

    document.getElementById("payment-section")
        .style.display = "none";

    document.getElementById("ticket")
        .style.display = "none";

    document.getElementById("my-bookings")
        .style.display = "none";
}


/* ================= HOME ================= */

function showHome() {

    hideAll();

    document.getElementById("home")
        .classList.remove("hidden");
}


/* ================= LOGIN ================= */

function showLogin() {

    hideAll();

    document.getElementById("login")
        .classList.remove("hidden");
}


/* ================= REGISTER ================= */

function showRegister() {

    hideAll();

    document.getElementById("register")
        .classList.remove("hidden");
}


/* ================= BOOKING ================= */

function showBooking() {

    hideAll();

    document.getElementById("booking")
        .classList.remove("hidden");
}


/* ================= REGISTER USER ================= */

function registerUser() {

    let name =
        document.getElementById("register-name").value;

    let email =
        document.getElementById("register-email").value;

    let password =
        document.getElementById("register-password").value;


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill all details.");

        return;
    }


    alert("Registration successful!");

    showLogin();
}


/* ================= LOGIN USER ================= */

function loginUser() {

    let email =
        document.getElementById("login-email").value;

    let password =
        document.getElementById("login-password").value;


    if (
        email === "" ||
        password === ""
    ) {

        alert("Please enter email and password.");

        return;
    }


    alert("Login successful!");

    showBooking();
}


/* ================= SEARCH BUS ================= */

function searchBus() {

    requiredPassengers =
    parseInt(document.getElementById("passengers").value) || 1;

    let from =
        document.getElementById("from").value;

    let to =
        document.getElementById("to").value;

    let date =
        document.getElementById("date").value;


    if (from === "" || to === "") {

        alert("Please select From and To.");

        return;
    }


    if (from === to) {

        alert(
            "From and To districts cannot be same."
        );

        return;
    }


    if (date === "") {

        alert("Please select journey date.");

        return;
    }


    /*
       Demo schedules.

       Each journey is approximately
       8 to 10 hours.
    */

    let buses = [

        {
            name: "VRL AC Sleeper",
            departure: "05:30 AM",
            arrival: "02:00 PM",
            duration: "8.5 Hours",
            price: 750,
            type: "Morning"
        },

        {
            name: "VRL Non AC Sleeper",
            departure: "07:00 AM",
            arrival: "04:30 PM",
            duration: "9.5 Hours",
            price: 600,
            type: "Morning"
        },

        {
            name: "VRL AC Seater",
            departure: "09:00 AM",
            arrival: "06:00 PM",
            duration: "9 Hours",
            price: 700,
            type: "Morning"
        },

        {
            name: "VRL AC Sleeper",
            departure: "11:30 AM",
            arrival: "08:30 PM",
            duration: "9 Hours",
            price: 800,
            type: "Afternoon"
        },

        {
            name: "VRL Non AC Sleeper",
            departure: "01:00 PM",
            arrival: "10:00 PM",
            duration: "9 Hours",
            price: 650,
            type: "Afternoon"
        },

        {
            name: "VRL AC Seater",
            departure: "03:30 PM",
            arrival: "12:00 AM",
            duration: "8.5 Hours",
            price: 750,
            type: "Afternoon"
        },

        {
            name: "VRL AC Sleeper",
            departure: "06:00 PM",
            arrival: "03:00 AM",
            duration: "9 Hours",
            price: 800,
            type: "Evening"
        },

        {
            name: "VRL Non AC Sleeper",
            departure: "09:00 PM",
            arrival: "06:00 AM",
            duration: "9 Hours",
            price: 650,
            type: "Night"
        },

        {
            name: "VRL AC Sleeper",
            departure: "10:30 PM",
            arrival: "07:30 AM",
            duration: "9 Hours",
            price: 850,
            type: "Night"
        },

        {
            name: "VRL Premium Sleeper",
            departure: "11:30 PM",
            arrival: "08:30 AM",
            duration: "9 Hours",
            price: 950,
            type: "Night"
        }

    ];


    let html = `
    
        <h2>Available Buses</h2>

        <p style="text-align:center;">
            ${from} → ${to}
            | Journey Date: ${date}
        </p>

    `;


    buses.forEach(function(bus, index) {

        html += `

            <div class="bus">

                <h3>
                    ${getIcon(bus.type)}
                    ${bus.name}
                </h3>


                <div class="bus-info">

                    <p>
                        <strong>Category:</strong>
                        ${bus.type}
                    </p>


                    <p>
                        <strong>Price:</strong>
                        ₹${bus.price}
                    </p>


                    <p class="time">
                        🕐 ${bus.departure}
                    </p>


                    <p class="time">
                        🕐 ${bus.arrival}
                    </p>


                    <p>
                        <strong>Duration:</strong>
                        ${bus.duration}
                    </p>

                </div>


                <button
                    onclick="selectBus(
                        ${bus.price},
                        '${bus.name}',
                        '${bus.departure}',
                        '${bus.arrival}',
                        '${bus.duration}'
                    )">

                    Select Bus

                </button>

            </div>

        `;

    });


    document.getElementById("bus-list")
        .innerHTML = html;


    document.getElementById("bus-list")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= ICON ================= */

function getIcon(type) {

    if (type === "Morning") {

        return "🌅";

    }


    if (type === "Afternoon") {

        return "☀️";

    }


    if (type === "Evening") {

        return "🌆";

    }


    return "🌙";
}


/* ================= SELECT BUS ================= */

function selectBus(
    price,
    busName,
    departure,
    arrival,
    duration
) {

    busPrice = price;

    selectedBusName = busName;

    selectedDeparture = departure;

    selectedArrival = arrival;

    selectedDuration = duration;


    document.getElementById("seat-section")
        .style.display = "block";


    document.getElementById("seat-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ================= SELECT SEAT ================= */

function selectSeat(seat) {

    let selectedSeats =
        document.querySelectorAll(".seat.selected");

    if (seat.classList.contains("selected")) {

        seat.classList.remove("selected");

    } else {

        if (selectedSeats.length >= requiredPassengers) {

            alert("You can select only " +
                requiredPassengers + " seat(s).");

            return;
        }

        seat.classList.add("selected");
    }

    selectedSeats =
        document.querySelectorAll(".seat.selected");

    document.getElementById("selected-seats").innerText =
        "Selected Seats: " + selectedSeats.length;

}


/* ================= CONTINUE ================= */

function continueBooking() {

    let selectedSeats =
        document.querySelectorAll(
            ".seat.selected"
        );


    if (selectedSeats.length !== requiredPassengers) {

    alert(
        "Please select exactly " +
        requiredPassengers +
        " seat(s) for your passengers."
    );

    return;
}


    let total =
        selectedSeats.length * busPrice;


    document.getElementById(
        "total-price"
    ).innerText =
        "Total Amount: ₹" + total;


    document.getElementById(
        "passenger-section"
    ).style.display = "block";


    document.getElementById(
        "passenger-section"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= CONFIRM BOOKING ================= */

function confirmBooking() {

    let name =
        document.getElementById(
            "passenger-name"
        ).value;

    let email =
        document.getElementById(
            "passenger-email"
        ).value;

    let age =
        document.getElementById(
            "age"
        ).value;

    let mobile =
        document.getElementById(
            "mobile"
        ).value;


    let from =
        document.getElementById(
            "from"
        ).value;

    let to =
        document.getElementById(
            "to"
        ).value;

    let date =
        document.getElementById(
            "date"
        ).value;


    let selectedSeats =
        document.querySelectorAll(
            ".seat.selected"
        );


    if (
        name === "" ||
        email === "" ||
        age === "" ||
        mobile === ""
    ) {

        alert(
            "Please enter all passenger details."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email ID."
        );

        return;
    }


    if (mobile.length !== 10) {

        alert(
            "Please enter valid 10 digit mobile number."
        );

        return;
    }


    let seats = [];


    selectedSeats.forEach(
        function(seat) {

            seats.push(
                seat.innerText
            );

        }
    );


    let total =
        selectedSeats.length * busPrice;


    let bookingId =
        "VRL" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    bookingData = {

        id: bookingId,

        name: name,

        email: email,

        age: age,

        mobile: mobile,

        from: from,

        to: to,

        date: date,

        seats: seats.join(", "),

        bus: selectedBusName,

        departure: selectedDeparture,

        arrival: selectedArrival,

        duration: selectedDuration,

        total: total

    };


    document.getElementById(
        "payment-amount"
    ).innerText =
        "Amount: ₹" + total;


    document.getElementById(
        "payment-section"
    ).style.display = "block";


    document.getElementById(
        "payment-section"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= PAYMENT ================= */

function makePayment() {

    alert(
        "Demo payment successful!"
    );


    document.getElementById(
        "payment-section"
    ).style.display = "none";


    showTicket();
}


/* ================= SHOW TICKET ================= */

function showTicket() {

    document.getElementById(
        "ticket-id"
    ).innerText =
        bookingData.id;


    document.getElementById(
        "ticket-name"
    ).innerText =
        bookingData.name;


    document.getElementById(
        "ticket-email"
    ).innerText =
        bookingData.email;


    document.getElementById(
        "ticket-mobile"
    ).innerText =
        bookingData.mobile;


    document.getElementById(
        "ticket-from"
    ).innerText =
        bookingData.from;


    document.getElementById(
        "ticket-to"
    ).innerText =
        bookingData.to;


    document.getElementById(
        "ticket-date"
    ).innerText =
        bookingData.date;


    document.getElementById(
        "ticket-bus"
    ).innerText =
        bookingData.bus;


    document.getElementById(
        "ticket-departure"
    ).innerText =
        bookingData.departure;


    document.getElementById(
        "ticket-arrival"
    ).innerText =
        bookingData.arrival;


    document.getElementById(
        "ticket-duration"
    ).innerText =
        bookingData.duration;


    document.getElementById(
        "ticket-seat"
    ).innerText =
        bookingData.seats;


    document.getElementById(
        "ticket-price"
    ).innerText =
        "₹" + bookingData.total;


    document.getElementById(
        "ticket"
    ).style.display = "block";


    document.getElementById(
        "ticket"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


/* ================= MY BOOKINGS ================= */

function showMyBookings() {

    hideAll();


    document.getElementById(
        "my-bookings"
    ).style.display = "block";


    let details =
        document.getElementById(
            "booking-details"
        );


    if (bookingData === null) {

        details.innerHTML = `

            <div class="booking-card">

                <h3>
                    No Booking Yet
                </h3>

                <p>
                    Your confirmed bookings
                    will appear here.
                </p>


                <button
                    onclick="showBooking()">

                    Book Your Bus

                </button>

            </div>

        `;

        return;
    }


    details.innerHTML = `

        <div class="booking-card">

            <h3>
                VRL Travels 🎫
            </h3>


            <p>
                <strong>Booking ID:</strong>
                ${bookingData.id}
            </p>


            <p>
                <strong>Passenger:</strong>
                ${bookingData.name}
            </p>


            <p>
                <strong>Email:</strong>
                ${bookingData.email}
            </p>


            <p>
                <strong>Mobile:</strong>
                ${bookingData.mobile}
            </p>


            <p>
                <strong>Route:</strong>
                ${bookingData.from}
                →
                ${bookingData.to}
            </p>


            <p>
                <strong>Date:</strong>
                ${bookingData.date}
            </p>


            <p>
                <strong>Bus:</strong>
                ${bookingData.bus}
            </p>


            <p>
                <strong>Departure:</strong>
                ${bookingData.departure}
            </p>


            <p>
                <strong>Arrival:</strong>
                ${bookingData.arrival}
            </p>


            <p>
                <strong>Duration:</strong>
                ${bookingData.duration}
            </p>


            <p>
                <strong>Seats:</strong>
                ${bookingData.seats}
            </p>


            <p>
                <strong>Total:</strong>
                ₹${bookingData.total}
            </p>


            <p class="status">
                ✓ Payment Successful
            </p>


            <p class="status">
                ✓ Booking Confirmed
            </p>


            <button
                onclick="showTicketFromBooking()">

                View Ticket

            </button>

        </div>

    `;
}


/* ================= VIEW TICKET ================= */

function showTicketFromBooking() {

    document.getElementById(
        "my-bookings"
    ).style.display = "none";


    showTicket();
}