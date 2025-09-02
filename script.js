/**
 * Initializes all the interactive animations for the page.
 */
function initializeAnimations() {
    // --- 1. Mouse Follower & Media Circle Setup ---
    const follower = document.querySelector("#mouse-follower");
    const mediaCircle = document.querySelector("#hover-media-circle");

    // Combine mousemove listeners for efficiency
    window.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;

        gsap.to(follower, {
            x: clientX,
            y: clientY,
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(mediaCircle, {
            x: clientX,
            y: clientY,
            duration: 0.8,
            ease: "power4.out",
        });
    });

    // --- 2. Magnetic Elements Effect ---
    const magneticElements = document.querySelectorAll(".magnet");
    magneticElements.forEach((element) => {
        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            // Calculate position of cursor relative to the center of the element
            const x = event.clientX - (rect.left + rect.width / 2);
            const y = event.clientY - (rect.top + rect.height / 2);

            gsap.to(element, {
                x: x * 0.5,
                y: y * 0.5,
                duration: 0.8,
                ease: "power3.out",
            });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
            });
        });
    });

    // --- 3. Hover Media Circle Effect ---
    const hoverElements = document.querySelectorAll(".hvr");
    const videos = mediaCircle.querySelectorAll("video");
    hoverElements.forEach((element, index) => {
        element.addEventListener("mouseenter", () => {
            const currentVideo = videos[index];
            if (!currentVideo) return;

            // Make the corresponding video active and play it
            videos.forEach(v => v.classList.remove("active"));
            currentVideo.classList.add("active");
            currentVideo.currentTime = 0;
            currentVideo.play();

            // Animate the follower and media circle
            gsap.to(mediaCircle, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });
            gsap.to(follower, {
                scale: 3,
                backgroundColor: "transparent",
                border: "1px solid #fff",
                mixBlendMode: "difference",
                duration: 0.3,
            });
        });

        element.addEventListener("mouseleave", () => {
            videos.forEach(v => v.pause());
            gsap.to(mediaCircle, { scale: 0, opacity: 0, duration: 0.5, ease: "power3.inOut" });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "#000",
                border: "none",
                mixBlendMode: "normal",
                duration: 0.3,
            });
        });
    });

    // --- 4. Featured Projects Scroll Effect ---
    // Pin the left text column
    gsap.to(".fleftelm", {
        scrollTrigger: {
            trigger: "#fimages",
            pin: true,
            start: "top top",
            end: "bottom bottom",
            endTrigger: ".last",
            scrub: 1,
        },
        y: "-300%", // Move container up by 300% (4 items total)
        ease: "power1.inOut",
    });

    // Animate the image visibility on scroll
    const projectSections = document.querySelectorAll(".fleftelm");
    const projectImages = document.querySelectorAll("#fright .images img");
    projectSections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                gsap.to(projectImages, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
                if (projectImages[index]) {
                    gsap.to(projectImages[index], { opacity: 1, duration: 0.5, ease: "power2.inOut" });
                }
            },
            onEnterBack: () => {
                gsap.to(projectImages, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
                if (projectImages[index]) {
                    gsap.to(projectImages[index], { opacity: 1, duration: 0.5, ease: "power2.inOut" });
                }
            },
        });
    });
}

// Wait for the DOM to be fully loaded before running the animations
document.addEventListener("DOMContentLoaded", initializeAnimations);