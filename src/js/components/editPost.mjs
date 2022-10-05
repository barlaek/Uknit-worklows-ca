export function insertValueAsPlaceholder(title, tags, body, media) {
    document.querySelector('input#postTitle').value = title;
    document.querySelector('input#postTag').value = tags;
    document.querySelector('textarea#postBody').value = body;
    document.querySelector('input#postMedia').value = media;
}