/**
 * Inserts the original values of the post to the inputs when editing a post using the destructured response of the post fetch
 * @param {string} title Title of the post
 * @param {string} tags Tags of the post
 * @param {string} body Body of the post
 * @param {string} media Media of the post
 */
export function insertValueAsPlaceholder(title, tags, body, media) {
    document.querySelector('input#postTitle').value = title;
    document.querySelector('input#postTag').value = tags;
    document.querySelector('textarea#postBody').value = body;
    document.querySelector('input#postMedia').value = media;
}

