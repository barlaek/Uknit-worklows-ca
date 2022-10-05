export function insertValueAsPlaceholder(title, tags, body, media) {
    document.querySelector('input#postTitle').value = title;
    document.querySelector('input#postTag').value = tags;
    document.querySelector('textarea#postBody').value = body;
    document.querySelector('input#postMedia').value = media;
}

export async function editPost(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = Object.fromEntries(data.entries());
    const accessToken = localStorage.getItem('accessToken');
    const url = baseURL + submitPostUrl + "/" + id;
    console.log(values);
    await standardFetch(url, editProfileBody(values, accessToken));
    location.reload();
}