import { BASE_URL } from "./api";

export const GET_NOTES = `/notes`;
export const POST_NOTE = `/notes`;
export const DELETE_NOTE = "/notes";
export const FAVOURITE_NOTE = "/notes";
export const GET_TAGS = "/notes/tags";
export const GET_PROFILE = "/notes/stats";
export const GET_BOOKMARKS = `/bookmarks`;
export const POST_BOOKMARKS = `/bookmarks`;
export const FAVOURITE_BOOKMARK = "/bookmarks";
export const REGISTER_USER = `${BASE_URL}/auth/register`;
export const LOGIN_USER = `${BASE_URL}/auth/login`;
