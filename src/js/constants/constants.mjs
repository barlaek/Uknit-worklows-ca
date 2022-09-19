// URL'S
export const baseURL = "https://nf-api.onrender.com/";
export const statusUrl = "status/"
export const registerUrl = "api/v1/social/auth/register";
export const loginUrl = "api/v1/social/auth/login";
export const allPostsUrl = "api/v1/social/posts/?_author=true&_comments=true&reactions=true";
export const allUsersUrl = "api/v1/social/profiles";

// DOM
export const alertWrapper = document.querySelector('.alert-wrapper');
export const postContainer = document.querySelector('#postContainer');
export const postAuthor = document.querySelector('#postAuthor');
export const postReactionCount = document.querySelector('#postReactionCount');
export const mostPopularContainer = document.querySelector('#mostPopularContainer');

// search 
export const searchUsersInput = document.getElementById('searchUsersInput');