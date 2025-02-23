// Open links when clicking resource cards
function openLink(url) {
    window.open(url, "_blank");
}

// Toggle DSA Preparation Tips
function toggleTip(element) {
    let content = element.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
