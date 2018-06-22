'use strict';
/*global $ */

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/dan';

  //works
  const getBookmarks = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  //works
  const createBookmark = (bookmarkObj, callback) => {
    const newBookmark = JSON.stringify(bookmarkObj);

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: callback
    });
  };

  //works
  const updateBookmark = (id, updateData, callback) => {
    $.ajax({
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error: callback
    });
  };

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
    updateBookmark,
    deleteBookmark
  };
}());