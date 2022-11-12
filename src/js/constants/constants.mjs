// ------------  URL'S --------------- //
export const baseURL = "https://nf-api.onrender.com/";
export const statusUrl = "status/"
export const registerUrl = "api/v1/social/auth/register";
export const loginUrl = "api/v1/social/auth/login";
export const allPostsUrl = "api/v1/social/posts/?_author=true&_comments=true&_reactions=true";
export const allUsersUrl = "api/v1/social/profiles";
export const profileUrl = "api/v1/social/profiles/";
export const profileExtUrl = "?_posts=true&_following=true&_followers=true";
export const submitPostUrl = "api/v1/social/posts";

// -------------- DOM----------------- //
export const alertWrapper = document.querySelector('.alert-wrapper');
export const postContainer = document.querySelector('#postContainer');
export const postAuthor = document.querySelector('#postAuthor');
export const postReactionCount = document.querySelector('#postReactionCount');
export const mostPopularContainer = document.querySelector('#mostPopularContainer');
export const postAvatar = document.querySelector('#postAvatar');
export const editSubmit = document.querySelector('#editSubmit');
export const avatarImageWrap = document.querySelector('#avatarImageWrap');
export const logoutButton = document.querySelector('#logoutButton');

// ------------- Profile ------------- //
export const profileUsername = document.querySelector('#profileUsername');
export const followerCount = document.querySelector('#followerCount');
export const followingCount = document.querySelector('#followingCount');
export const postForm = document.querySelector('#postForm');

// ------------- search -------------- //
export const searchUsersInput = document.getElementById('searchUsersInput');
export const searchPosts = document.querySelector('#searchPosts');

// ------------- sort --------------- //
export const sortSelect = document.querySelector('#sortPosts');