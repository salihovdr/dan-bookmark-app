'use strict';
/*global $ */

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/dan';

  //get bookmarks
  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  //create bookmark
  const createBookmark = (bookmarkObj, callback) => {
    const newBookmark = JSON.stringify(bookmarkObj);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: () => Snackbar.show({text: 'Title and url data required. Try again..'})
    });
  };

  //delete bookmark
  const deleteBookmark = (id, callback) => {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    //updateBookmark,
    deleteBookmark
  };
}());