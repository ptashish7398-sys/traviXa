/* =========================================================
   TraviXa — Home Page JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar =
        document.getElementById("navbar");

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.querySelector(".nav-links");

    const navActions =
        document.querySelector(".nav-actions");

    const navItems =
        document.querySelectorAll(".nav-link");

    const searchButton =
        document.getElementById("searchButton");

    const destinationInput =
        document.getElementById("destinationInput");

    const dateInput =
        document.getElementById("dateInput");

    const travellerInput =
        document.getElementById("travellerInput");


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 20) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );


    handleNavbarScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (
        menuBtn &&
        navLinks &&
        navActions
    ) {

        menuBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "mobile-open"
                    );


                navActions.classList.toggle(
                    "mobile-open",
                    isOpen
                );


                menuBtn.innerHTML =
                    isOpen
                        ? '<i class="fa-solid fa-xmark"></i>'
                        : '<i class="fa-solid fa-bars"></i>';

            }
        );


        navItems.forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "mobile-open"
                        );

                        navActions.classList.remove(
                            "mobile-open"
                        );

                        menuBtn.innerHTML =
                            '<i class="fa-solid fa-bars"></i>';

                    }
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const updateActiveNav = () => {

        let currentSection = "home";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 160;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionBottom
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            }
        );


        navItems.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                const target =
                    link.getAttribute("href");


                if (
                    target ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    };


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =====================================================
       DESTINATION DATA
    ===================================================== */

    const destinationData = {

        Dubai: {

            country:
                "United Arab Emirates",

            image:
                "images/destinations/dubai.jpg",

            description:
                "Experience futuristic architecture, luxury shopping, desert adventures and unforgettable city views.",

            places: [
                "Burj Khalifa",
                "Dubai Marina",
                "Palm Jumeirah",
                "Dubai Mall"
            ],

            budget:
                "₹45,000 – ₹80,000",

            stay:
                "3–5 Days",

            bestTime:
                "November – March"

        },


        Goa: {

            country:
                "India",

            image:
                "images/destinations/goa.jpg",

            description:
                "Relax on beautiful beaches, enjoy sunsets, explore local cafés and experience Goa's vibrant nightlife.",

            places: [
                "Baga Beach",
                "Calangute",
                "Fort Aguada",
                "Dudhsagar Falls"
            ],

            budget:
                "₹12,000 – ₹25,000",

            stay:
                "3–5 Days",

            bestTime:
                "November – February"

        },


        Kashmir: {

            country:
                "India",

            image:
                "images/destinations/kashmir.jpg",

            description:
                "Discover breathtaking mountains, peaceful lakes, beautiful valleys and the magical beauty of Kashmir.",

            places: [
                "Srinagar",
                "Gulmarg",
                "Pahalgam",
                "Dal Lake"
            ],

            budget:
                "₹18,000 – ₹35,000",

            stay:
                "4–6 Days",

            bestTime:
                "March – June"

        },


        Paris: {

            country:
                "France",

            image:
                "images/destinations/paris.jpg",

            description:
                "Explore timeless architecture, world-famous landmarks, art, fashion and romantic streets.",

            places: [
                "Eiffel Tower",
                "Louvre Museum",
                "Arc de Triomphe",
                "Seine River"
            ],

            budget:
                "₹90,000 – ₹1,50,000",

            stay:
                "4–6 Days",

            bestTime:
                "April – June"

        },


        Jaipur: {

            country:
                "India",

            image:
                "images/destinations/jaipur.jpg",

            description:
                "Experience royal palaces, historic forts, colourful markets and the rich culture of Rajasthan.",

            places: [
                "Amber Fort",
                "Hawa Mahal",
                "City Palace",
                "Jal Mahal"
            ],

            budget:
                "₹10,000 – ₹22,000",

            stay:
                "2–4 Days",

            bestTime:
                "October – March"

        }

    };


    /* =====================================================
       CREATE DESTINATION MODAL
    ===================================================== */

    const destinationModal =
        document.createElement("div");


    destinationModal.className =
        "destination-modal";


    destinationModal.innerHTML = `

        <div class="destination-modal-backdrop"></div>


        <div class="destination-modal-box">


            <button
                class="destination-modal-close"
                type="button"
                aria-label="Close destination">

                <i class="fa-solid fa-xmark"></i>

            </button>


            <div class="destination-modal-image">

                <img
                    id="modalDestinationImage"
                    src=""
                    alt="Destination">

            </div>


            <div class="destination-modal-content">


                <span
                    id="modalDestinationCountry">
                </span>


                <h2
                    id="modalDestinationName">
                </h2>


                <p
                    id="modalDestinationDescription">
                </p>


                <div class="destination-info-grid">


                    <div class="destination-info-item">

                        <i class="fa-solid fa-wallet"></i>

                        <div>

                            <small>
                                Estimated Budget
                            </small>

                            <strong
                                id="modalBudget">
                            </strong>

                        </div>

                    </div>


                    <div class="destination-info-item">

                        <i class="fa-regular fa-calendar"></i>

                        <div>

                            <small>
                                Ideal Duration
                            </small>

                            <strong
                                id="modalStay">
                            </strong>

                        </div>

                    </div>


                    <div class="destination-info-item">

                        <i class="fa-solid fa-sun"></i>

                        <div>

                            <small>
                                Best Time
                            </small>

                            <strong
                                id="modalBestTime">
                            </strong>

                        </div>

                    </div>

                </div>


                <div class="modal-places">

                    <h4>
                        Top Places to Visit
                    </h4>

                    <div id="modalPlaces"></div>

                </div>


                <button
                    class="modal-plan-btn"
                    id="modalPlanButton"
                    type="button">

                    Plan This Trip

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </div>
    `;


    document.body.appendChild(
        destinationModal
    );


    /* =====================================================
       DESTINATION MODAL ELEMENTS
    ===================================================== */

    const modalImage =
        document.getElementById(
            "modalDestinationImage"
        );

    const modalCountry =
        document.getElementById(
            "modalDestinationCountry"
        );

    const modalName =
        document.getElementById(
            "modalDestinationName"
        );

    const modalDescription =
        document.getElementById(
            "modalDestinationDescription"
        );

    const modalBudget =
        document.getElementById(
            "modalBudget"
        );

    const modalStay =
        document.getElementById(
            "modalStay"
        );

    const modalBestTime =
        document.getElementById(
            "modalBestTime"
        );

    const modalPlaces =
        document.getElementById(
            "modalPlaces"
        );


    /* =====================================================
       OPEN DESTINATION MODAL
    ===================================================== */

    const openDestinationModal =
        (destination) => {

            const data =
                destinationData[destination];


            if (!data) return;


            modalImage.src =
                data.image;

            modalImage.alt =
                destination;


            modalCountry.textContent =
                data.country;


            modalName.textContent =
                destination;


            modalDescription.textContent =
                data.description;


            modalBudget.textContent =
                data.budget;


            modalStay.textContent =
                data.stay;


            modalBestTime.textContent =
                data.bestTime;


            modalPlaces.innerHTML = "";


            data.places.forEach(
                (place) => {

                    const placeElement =
                        document.createElement("span");


                    placeElement.innerHTML = `

                        <i class="fa-solid fa-location-dot"></i>
                        ${place}

                    `;


                    modalPlaces.appendChild(
                        placeElement
                    );

                }
            );


            destinationModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );

        };


    /* =====================================================
       DESTINATION CARDS
    ===================================================== */

    const destinationCards =
        document.querySelectorAll(
            ".destination-card"
        );


    destinationCards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    const destination =
                        card.dataset.destination;


                    if (destination) {

                        openDestinationModal(
                            destination
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       SEARCH DESTINATION
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            () => {

                const destination =
                    destinationInput
                        ? destinationInput.value.trim()
                        : "";


                if (!destination) {

                    if (destinationInput) {

                        destinationInput.focus();

                        destinationInput.style.outline =
                            "2px solid rgba(16,185,129,0.45)";


                        setTimeout(
                            () => {

                                destinationInput.style.outline =
                                    "none";

                            },
                            1200
                        );

                    }

                    return;

                }


                const matchedDestination =
                    Object.keys(destinationData)
                        .find(
                            (name) =>
                                name.toLowerCase() ===
                                destination.toLowerCase()
                        );


                if (matchedDestination) {

                    openDestinationModal(
                        matchedDestination
                    );

                    return;

                }


                alert(
                    `Searching for ${destination}...\n\nSmart destination search will be connected with the backend in the next stage.`
                );

            }
        );

    }


    /* =====================================================
       POPULAR SEARCH BUTTONS
    ===================================================== */

    const suggestionButtons =
        document.querySelectorAll(
            ".search-suggestions button"
        );


    suggestionButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const destination =
                        button.dataset.destination;


                    if (destinationInput) {

                        destinationInput.value =
                            destination;

                    }


                    openDestinationModal(
                        destination
                    );

                }
            );

        }
    );


    /* =====================================================
       DATE INPUT
    ===================================================== */

    if (dateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        dateInput.min =
            today;

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const closeDestinationModal =
        () => {

            destinationModal.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );

        };


    const closeModalButton =
        destinationModal.querySelector(
            ".destination-modal-close"
        );


    const modalBackdrop =
        destinationModal.querySelector(
            ".destination-modal-backdrop"
        );


    closeModalButton.addEventListener(
        "click",
        closeDestinationModal
    );


    modalBackdrop.addEventListener(
        "click",
        closeDestinationModal
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                destinationModal.classList.contains(
                    "active"
                )
            ) {

                closeDestinationModal();

            }

        }
    );


    /* =====================================================
       PLAN THIS TRIP
    ===================================================== */

    const modalPlanButton =
        document.getElementById(
            "modalPlanButton"
        );


    if (modalPlanButton) {

        modalPlanButton.addEventListener(
            "click",
            () => {

                closeDestinationModal();


                setTimeout(
                    () => {

                        window.location.href =
                            "planner.html";

                    },
                    200
                );

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(
            `
            .destination-card,
            .experience-card,
            .planner-feature,
            .about-point
            `
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show-on-scroll"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealItems.forEach(
            (item) => {

                observer.observe(item);

            }
        );

    } else {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "show-on-scroll"
                );

            }
        );

    }


    /* =====================================================
       PREVENT EMPTY LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                    }
                );

            }
        );

});