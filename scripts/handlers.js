'use strict';
/* global bookmarkList, $, api, store */

$(document).ready(function(){
  bookmarkList.bindEventListeners();
  api.getBookmarks(bookmarks => {
    bookmarks.forEach(bookmark => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});