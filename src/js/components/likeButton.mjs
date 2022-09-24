

export function like() {
    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener("click", () => {
        likeFetch();
    })
}