document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll for Page Sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Text Slide-in Animation on Scroll
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Dynamic Content Reveal for Guide Buttons
    const guideButtons = document.querySelectorAll(".guide-btn");
    guideButtons.forEach(button => {
        button.addEventListener("click", function () {
            const sectionId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            revealContent(sectionId);
        });
    });

    function revealContent(section) {
        const contentBox = document.createElement("div");
        contentBox.className = "content-box";
        contentBox.innerHTML = `<p>Loading ${section} content...</p>`;
        
        document.querySelector(".guide").appendChild(contentBox);

        setTimeout(() => {
            contentBox.innerHTML = `<p>${section} content is now available.</p>`;
        }, 1000);
    }

    // Fetch Placement Data from Backend
    fetch("http://localhost:5000/placements")
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector(".table-container table");
            data.forEach(row => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${row.company}</td>
                    <td>${row.date}</td>
                    <td>${row.role}</td>
                    <td>${row.location}</td>
                `;
                table.appendChild(newRow);
            });
        })
        .catch(error => console.error("Error fetching placements:", error));
});
// roadmap 

document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", () => {
        let roadmapContainer = button.nextElementSibling;
        roadmapContainer.style.display = roadmapContainer.style.display === "flex" ? "none" : "flex";
    });
});
// other

// Scroll Animation for Roadmaps
document.addEventListener("DOMContentLoaded", function() {
    const roadmaps = document.querySelectorAll(".roadmap");

    function checkScroll() {
        roadmaps.forEach(roadmap => {
            const position = roadmap.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {
                roadmap.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});

// Progress Bar Logic
function updateProgress(roadmapId, progressBarId) {
    const checkboxes = document.querySelectorAll(`#${roadmapId} input[type="checkbox"]`);
    const progressBar = document.getElementById(progressBarId);
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const checkedCount = document.querySelectorAll(`#${roadmapId} input[type="checkbox"]:checked`).length;
            const totalCount = checkboxes.length;
            const progress = (checkedCount / totalCount) * 100;
            progressBar.style.width = progress + "%";
        });
    });
}

updateProgress("cpp-roadmap", "progress-cpp");
updateProgress("google-roadmap", "progress-google");
updateProgress("microsoft-roadmap", "progress-microsoft");

// Sound Effect on Checkbox Click (Using Howler.js)
var tickSound = new Howl({ src: ['tick.mp3'] });

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) tickSound.play();
    });
});


// faang
document.addEventListener("DOMContentLoaded", function () {
    const dropdownContent = document.querySelector(".dropdown-content");
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const roadmapPopup = document.getElementById("roadmap-popup");
    const popupContent = document.getElementById("popup-content");
    const closePopup = document.getElementById("close-popup");

    // Toggle dropdown visibility when clicking the button
    dropdownBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownContent.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".interview-section")) {
            dropdownContent.classList.remove("active");
        }
    });

    // Show roadmap in a pop-up when clicking a company
    function showInterviewDetails(company) {
        const roadmaps = {
            google: `
                <h2>Google Interview Roadmap</h2>
                <ul>
                    <li>✔ Master Data Structures & Algorithms</li>
                    <li>✔ System Design (LLD & HLD)</li>
                    <li>✔ Competitive Programming & Mock Interviews</li>
                </ul>
            `,
            microsoft: `
                <h2>Microsoft Interview Roadmap</h2>
                <ul>
                    <li>✔ DSA & Problem Solving</li>
                    <li>✔ System Design & LLD</li>
                    <li>✔ Behavioral & HR Rounds</li>
                </ul>
            `,
            amazon: `
                <h2>Amazon Interview Roadmap</h2>
                <ul>
                    <li>✔ Master Amazon-Specific DSA Questions</li>
                    <li>✔ System Design & Object-Oriented Design</li>
                    <li>✔ Amazon Leadership Principles</li>
                </ul>
            `
        };

        popupContent.innerHTML = roadmaps[company] || "<h2>Coming Soon</h2>";
        roadmapPopup.style.display = "block";
    }

    // Close pop-up
    closePopup.addEventListener("click", function () {
        roadmapPopup.style.display = "none";
    });

    // Attach function globally
    window.showInterviewDetails = showInterviewDetails;
});
