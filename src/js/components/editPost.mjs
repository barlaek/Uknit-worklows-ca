export function insertValueAsPlaceholder(title, tags, body, media) {
    document.querySelector('input#postTitle').placeholder = title;
    document.querySelector('input#postTag').placeholder = tags;
    document.querySelector('textarea#postBody').placeholder = body;
    document.querySelector('input#postMedia').placeholder = media;
}