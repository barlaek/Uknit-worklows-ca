

export function like() {
    const likeButton = document.querySelectorAll('[#likeButton]');
    likeButton.addEventListener("click", () => {
        console.log("Like");
        likeFetch();
    })
}