document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       NAVBAR
    ================================= */

    const navbar =
        document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });


    /* ===============================
       MOBILE MENU
    ================================= */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");


    mobileMenuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("show");

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("show");

        });

    });


    /* ===============================
       ELEMENTS
    ================================= */

    const plannerForm =
        document.getElementById("plannerForm");

    const destination =
        document.getElementById("destination");

    const startDate =
        document.getElementById("startDate");

    const endDate =
        document.getElementById("endDate");

    const travellers =
        document.getElementById("travellers");

    const budget =
        document.getElementById("budget");

    const stay =
        document.getElementById("stay");

    const generatedSection =
        document.getElementById("generatedSection");


    /* ===============================
       DATE SETTINGS
    ================================= */

    const today = new Date();

    const todayString =
        today.toISOString().split("T")[0];

    startDate.min = todayString;

    endDate.min = todayString;


    startDate.addEventListener("change", () => {

        endDate.min = startDate.value;

        if (
            endDate.value &&
            endDate.value < startDate.value
        ) {

            endDate.value =
                startDate.value;

        }

    });


    /* ===============================
       DESTINATION SUGGESTIONS
    ================================= */

    document
        .querySelectorAll("[data-place]")
        .forEach(button => {

            button.addEventListener("click", () => {

                destination.value =
                    button.dataset.place;

                destination.focus();

            });

        });


    /* ===============================
       DESTINATION DATA
    ================================= */

    const destinations = {

        Dubai: {

            country:
                "United Arab Emirates",

            activities: [

                "Explore Burj Khalifa and Downtown Dubai",

                "Visit Dubai Mall and enjoy city views",

                "Experience a desert safari",

                "Relax at Jumeirah Beach",

                "Explore Dubai Marina at sunset"

            ]

        },


        Goa: {

            country:
                "India",

            activities: [

                "Relax at Baga or Calangute Beach",

                "Explore Old Goa heritage sites",

                "Enjoy a sunset at Chapora",

                "Discover local cafes and markets",

                "Spend a peaceful evening by the sea"

            ]

        },


        Kashmir: {

            country:
                "India",

            activities: [

                "Explore Dal Lake and enjoy a Shikara ride",

                "Visit Mughal Gardens",

                "Explore Gulmarg",

                "Enjoy mountain views in Pahalgam",

                "Discover local markets and cuisine"

            ]

        },


        Paris: {

            country:
                "France",

            activities: [

                "Visit the Eiffel Tower",

                "Explore the Louvre Museum",

                "Walk through Champs-Élysées",

                "Enjoy Seine River views",

                "Explore Montmartre"

            ]

        },


        Jaipur: {

            country:
                "India",

            activities: [

                "Explore Amber Fort",

                "Visit City Palace",

                "See Hawa Mahal",

                "Explore local markets",

                "Enjoy traditional Rajasthani cuisine"

            ]

        }

    };


    /* ===============================
       FORMAT DATE
    ================================= */

    function formatDate(dateString) {

        if (!dateString) {

            return "";

        }

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* ===============================
       CALCULATE DAYS
    ================================= */

    function calculateDays(start, end) {

        const startTime =
            new Date(start).getTime();

        const endTime =
            new Date(end).getTime();

        const difference =
            endTime - startTime;

        return Math.max(
            1,
            Math.round(
                difference /
                (1000 * 60 * 60 * 24)
            ) + 1
        );

    }


    /* ===============================
       GET DESTINATION
    ================================= */

    function getDestinationData(name) {

        const key =
            Object.keys(destinations)
                .find(
                    item =>
                        item.toLowerCase() ===
                        name.trim().toLowerCase()
                );

        if (key) {

            return destinations[key];

        }

        return {

            country:
                "Your destination",

            activities: [

                "Explore the main attractions",

                "Discover local food and culture",

                "Visit popular landmarks",

                "Explore hidden local places",

                "Enjoy a relaxed evening"

            ]

        };

    }


    /* ===============================
       CREATE DAY
    ================================= */

    function createDay(
        dayNumber,
        activity
    ) {

        const dayCard =
            document.createElement("div");

        dayCard.className =
            "day-card";


        const activityOne =
            activity[0] ||
            "Explore the destination";

        const activityTwo =
            activity[1] ||
            "Discover local attractions";

        const activityThree =
            activity[2] ||
            "Enjoy local food and culture";


        dayCard.innerHTML = `

            <div class="day-header">

                <div class="day-number">
                    DAY ${dayNumber}
                </div>

                <div>

                    <h3>
                        Day ${dayNumber} —
                        Explore & Discover
                    </h3>

                    <p>
                        A balanced day for your journey
                    </p>

                </div>

            </div>


            <div class="activity-list">

                <div class="activity">

                    <div class="activity-time">
                        09:00 AM
                    </div>

                    <div class="activity-content">

                        <strong>
                            ${activityOne}
                        </strong>

                        <p>
                            Start your day with an
                            exciting experience.
                        </p>

                    </div>

                </div>


                <div class="activity">

                    <div class="activity-time">
                        01:00 PM
                    </div>

                    <div class="activity-content">

                        <strong>
                            ${activityTwo}
                        </strong>

                        <p>
                            Enjoy the destination and
                            discover something new.
                        </p>

                    </div>

                </div>


                <div class="activity">

                    <div class="activity-time">
                        06:00 PM
                    </div>

                    <div class="activity-content">

                        <strong>
                            ${activityThree}
                        </strong>

                        <p>
                            End your day with a memorable
                            local experience.
                        </p>

                    </div>

                </div>

            </div>

        `;


        return dayCard;

    }


    /* ===============================
       GENERATE TRIP
    ================================= */

    plannerForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const destinationValue =
                destination.value.trim();

            const startValue =
                startDate.value;

            const endValue =
                endDate.value;

            const travellersValue =
                travellers.value;

            const budgetValue =
                budget.value;


            if (!destinationValue) {

                destination.focus();

                return;

            }


            if (!startValue || !endValue) {

                alert(
                    "Please select your travel dates."
                );

                return;

            }


            if (
                new Date(endValue) <
                new Date(startValue)
            ) {

                alert(
                    "End date cannot be before start date."
                );

                return;

            }


            const days =
                calculateDays(
                    startValue,
                    endValue
                );


            const data =
                getDestinationData(
                    destinationValue
                );


            /* SUMMARY */

            document.getElementById(
                "summaryDestination"
            ).textContent =
                destinationValue;


            document.getElementById(
                "summaryDuration"
            ).textContent =
                `${days} Day${days > 1 ? "s" : ""}`;


            document.getElementById(
                "summaryTravellers"
            ).textContent =
                `${travellersValue} ${
                    travellersValue === "1"
                        ? "Traveller"
                        : "Travellers"
                }`;


            const budgetLabels = {

                budget:
                    "Budget Friendly",

                standard:
                    "Standard",

                premium:
                    "Premium",

                luxury:
                    "Luxury"

            };


            document.getElementById(
                "summaryBudget"
            ).textContent =
                budgetLabels[budgetValue] ||
                "Flexible";


            /* TITLE */

            document.getElementById(
                "tripTitle"
            ).textContent =
                `${destinationValue} Travel Plan`;


            document.getElementById(
                "tripSubtitle"
            ).textContent =
                `${formatDate(startValue)} → ${formatDate(endValue)} · ${data.country}`;


            /* ITINERARY */

            const itinerary =
                document.getElementById(
                    "itinerary"
                );

            itinerary.innerHTML = "";


            const selectedActivities =
                data.activities;


            for (
                let day = 1;
                day <= Math.min(days, 7);
                day++
            ) {

                const startIndex =
                    ((day - 1) * 3) %
                    selectedActivities.length;


                const activities = [

                    selectedActivities[
                        startIndex
                    ],

                    selectedActivities[
                        (startIndex + 1) %
                        selectedActivities.length
                    ],

                    selectedActivities[
                        (startIndex + 2) %
                        selectedActivities.length
                    ]

                ];


                itinerary.appendChild(
                    createDay(
                        day,
                        activities
                    )
                );

            }


            if (days > 7) {

                const extra =
                    document.createElement("p");

                extra.style.marginTop =
                    "15px";

                extra.style.color =
                    "#64748b";

                extra.style.fontSize =
                    "11px";

                extra.textContent =
                    "Your detailed itinerary can be expanded further when TraviXa's smart planning backend is connected.";

                itinerary.appendChild(
                    extra
                );

            }


            /* SHOW */

            generatedSection.classList.add(
                "show"
            );


            setTimeout(() => {

                generatedSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 100);

        }
    );


    /* ===============================
       SAVE TRIP
    ================================= */

    const saveTripBtn =
        document.getElementById(
            "saveTripBtn"
        );


    saveTripBtn.addEventListener(
        "click",
        () => {

            const destinationValue =
                destination.value.trim();


            if (!destinationValue) {

                alert(
                    "Generate your trip first."
                );

                return;

            }


            const trip = {

                destination:
                    destinationValue,

                startDate:
                    startDate.value,

                endDate:
                    endDate.value,

                travellers:
                    travellers.value,

                budget:
                    budget.value,

                travelType:
                    document.querySelector(
                        'input[name="travelType"]:checked'
                    )?.value ||
                    "Adventure",

                stay:
                    stay.value,

                savedAt:
                    new Date().toISOString()

            };


            localStorage.setItem(
                "travixaLastTrip",
                JSON.stringify(trip)
            );

            const savedTrips = JSON.parse(
                localStorage.getItem("travixaSavedTrips") || "[]"
            );

            savedTrips.unshift(trip);

            localStorage.setItem(
                "travixaSavedTrips",
                JSON.stringify(savedTrips.slice(0, 20))
            );


            saveTripBtn.textContent =
                "✓ Trip Saved";

            saveTripBtn.style.color =
                "#059669";

            saveTripBtn.style.borderColor =
                "#10b981";

            saveTripBtn.style.background =
                "#ecfdf5";


            setTimeout(() => {

                saveTripBtn.textContent =
                    "♡ Save Trip";

            }, 2500);

        }
    );


    /* ===============================
       LOAD PREVIOUS TRIP
    ================================= */

    const savedTrip =
        localStorage.getItem(
            "travixaLastTrip"
        );


    if (savedTrip) {

        try {

            const trip =
                JSON.parse(savedTrip);

            if (trip.destination) {

                destination.value =
                    trip.destination;

            }

        } catch (error) {

            console.log(
                "No previous trip found."
            );

        }

    }

});