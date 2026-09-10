/* =========================================================
   TRAVIXA DESTINATIONS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");

            if (mobileMenu.classList.contains("show")) {
                mobileMenuBtn.textContent = "×";
            } else {
                mobileMenuBtn.textContent = "☰";
            }
        });


        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                mobileMenu.classList.remove("show");
                mobileMenuBtn.textContent = "☰";
            });

        });

    }


    /* =====================================================
       DESTINATION DATA
       ===================================================== */

    const destinations = {

        Dubai: {
            country: "United Arab Emirates",
            image: "images/destinations/dubai.jpg",
            description:
                "Experience futuristic skylines, luxury shopping, desert adventures and unforgettable city life in one of the world's most exciting destinations.",
            bestTime: "Oct – Apr",
            budget: "Premium",
            stay: "4 – 6 Days"
        },

        Goa: {
            country: "India",
            image: "images/destinations/goa.jpg",
            description:
                "Relax beside beautiful beaches, enjoy spectacular sunsets and experience Goa's unique blend of coastal culture, food and nightlife.",
            bestTime: "Nov – Feb",
            budget: "Standard",
            stay: "3 – 5 Days"
        },

        Kashmir: {
            country: "India",
            image: "images/destinations/kashmir.jpg",
            description:
                "Discover peaceful valleys, snow-capped mountains, beautiful lakes and breathtaking landscapes in the paradise of Kashmir.",
            bestTime: "Mar – Jun",
            budget: "Standard",
            stay: "5 – 7 Days"
        },

        Paris: {
            country: "France",
            image: "images/destinations/paris.jpg",
            description:
                "Explore iconic landmarks, elegant streets, world-famous art, charming cafés and the timeless culture of Paris.",
            bestTime: "Apr – Jun",
            budget: "Premium",
            stay: "4 – 6 Days"
        },

        Jaipur: {
            country: "India",
            image: "images/destinations/jaipur.jpg",
            description:
                "Experience royal palaces, magnificent forts, colourful markets and the rich heritage of Rajasthan in the Pink City.",
            bestTime: "Oct – Mar",
            budget: "Budget Friendly",
            stay: "2 – 4 Days"
        },

        Manali: {
            country: "India",
            image: "images/destinations/manali.jpg",
            description:
                "Enjoy Himalayan landscapes, rivers, mountain cafés and exciting outdoor adventures in the beautiful town of Manali.",
            bestTime: "Oct – Jun",
            budget: "Budget Friendly",
            stay: "3 – 5 Days"
        },

        Bali: {
            country: "Indonesia",
            image: "images/destinations/bali.jpg",
            description:
                "Discover tropical beaches, lush landscapes, peaceful temples and unforgettable island experiences in Bali.",
            bestTime: "Apr – Oct",
            budget: "Premium",
            stay: "5 – 7 Days"
        },

        Rome: {
            country: "Italy",
            image: "images/destinations/rome.jpg",
            description:
                "Step into history with ancient landmarks, remarkable architecture, art, food and unforgettable Italian culture.",
            bestTime: "Apr – Jun",
            budget: "Premium",
            stay: "4 – 6 Days"
        }

    };


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const searchInput =
        document.getElementById("destinationSearch");

    const searchBtn =
        document.getElementById("searchBtn");

    const destinationGrid =
        document.getElementById("destinationGrid");

    const destinationCards =
        document.querySelectorAll(".destination-card");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const noResults =
        document.getElementById("noResults");


    /* =====================================================
       SEARCH FUNCTION
       ===================================================== */

    function filterDestinations(searchValue) {

        const value = searchValue.trim().toLowerCase();

        let visibleCount = 0;

        destinationCards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const category =
                card.dataset.category.toLowerCase();

            const cardText =
                card.textContent.toLowerCase();

            if (
                value === "" ||
                name.includes(value) ||
                category.includes(value) ||
                cardText.includes(value)
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (visibleCount === 0) {
            noResults.classList.add("show");
        } else {
            noResults.classList.remove("show");
        }

    }


    if (searchBtn) {

        searchBtn.addEventListener("click", () => {

            filterDestinations(searchInput.value);

            if (destinationGrid) {
                destinationGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    }


    if (searchInput) {

        searchInput.addEventListener("input", () => {
            filterDestinations(searchInput.value);
        });


        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();

                filterDestinations(searchInput.value);

            }

        });

    }


    /* =====================================================
       CATEGORY FILTERS
       ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selectedFilter =
                button.dataset.filter;

            let visibleCount = 0;

            destinationCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            if (visibleCount === 0) {
                noResults.classList.add("show");
            } else {
                noResults.classList.remove("show");
            }


            /* Clear search when changing category */

            if (searchInput) {
                searchInput.value = "";
            }

        });

    });


    /* =====================================================
       MODAL ELEMENTS
       ===================================================== */

    const modal =
        document.getElementById("destinationModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalImage =
        document.getElementById("modalImage");

    const modalLocation =
        document.getElementById("modalLocation");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalBestTime =
        document.getElementById("modalBestTime");

    const modalBudget =
        document.getElementById("modalBudget");

    const modalStay =
        document.getElementById("modalStay");

    const modalPlanBtn =
        document.getElementById("modalPlanBtn");


    let selectedDestination = "";


    /* =====================================================
       OPEN DESTINATION MODAL
       ===================================================== */

    function openDestinationModal(destinationName) {

        const destination =
            destinations[destinationName];

        if (!destination || !modal) {
            return;
        }

        selectedDestination = destinationName;


        modalImage.style.backgroundImage =
            `url("${destination.image}")`;


        modalLocation.textContent =
            `📍 ${destination.country}`;


        modalTitle.textContent =
            destinationName;


        modalDescription.textContent =
            destination.description;


        modalBestTime.textContent =
            destination.bestTime;


        modalBudget.textContent =
            destination.budget;


        modalStay.textContent =
            destination.stay;


        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeDestinationModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeDestinationModal
        );

    }


    const modalBackdrop =
        document.querySelector(".modal-backdrop");

    if (modalBackdrop) {

        modalBackdrop.addEventListener(
            "click",
            closeDestinationModal
        );

    }


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("show")
        ) {

            closeDestinationModal();

        }

    });


    /* =====================================================
       EXPLORE BUTTONS
       ===================================================== */

    const exploreButtons =
        document.querySelectorAll(".explore-btn");

    exploreButtons.forEach(button => {

        button.addEventListener("click", () => {

            const destinationName =
                button.dataset.destination;

            openDestinationModal(destinationName);

        });

    });


    /* =====================================================
       PLAN THIS TRIP BUTTONS
       ===================================================== */

    const planButtons =
        document.querySelectorAll(".plan-btn");

    planButtons.forEach(button => {

        button.addEventListener("click", () => {

            const destinationName =
                button.dataset.plan;

            localStorage.setItem(
                "travixaPlannerDestination",
                destinationName
            );

            window.location.href = "planner.html";

        });

    });


    /* =====================================================
       MODAL PLAN BUTTON
       ===================================================== */

    if (modalPlanBtn) {

        modalPlanBtn.addEventListener("click", () => {

            if (selectedDestination) {

                localStorage.setItem(
                    "travixaPlannerDestination",
                    selectedDestination
                );

            }

            window.location.href = "planner.html";

        });

    }


    /* =====================================================
       FAVORITE BUTTONS
       ===================================================== */

    const favoriteButtons =
        document.querySelectorAll(".favorite-btn");


    let savedDestinations =
        JSON.parse(
            localStorage.getItem(
                "travixaSavedDestinations"
            )
        ) || [];


    favoriteButtons.forEach(button => {

        const card =
            button.closest(".destination-card");

        if (!card) {
            return;
        }

        const destinationName =
            card.dataset.name;


        /* Restore saved state */

        if (
            savedDestinations.includes(
                destinationName
            )
        ) {

            button.classList.add("saved");

            button.textContent = "♥";

        }


        button.addEventListener("click", event => {

            event.stopPropagation();


            if (
                savedDestinations.includes(
                    destinationName
                )
            ) {

                savedDestinations =
                    savedDestinations.filter(
                        name =>
                            name !== destinationName
                    );

                button.classList.remove("saved");

                button.textContent = "♡";

            } else {

                savedDestinations.push(
                    destinationName
                );

                button.classList.add("saved");

                button.textContent = "♥";

            }


            localStorage.setItem(
                "travixaSavedDestinations",
                JSON.stringify(
                    savedDestinations
                )
            );

        });

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    if (noResults) {
        noResults.classList.remove("show");
    }

});