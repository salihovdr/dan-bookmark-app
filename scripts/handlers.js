'use strict';
/* global bookmarkList, $, api, store */

$(document).ready(function(){
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.mergeAndAddBookmark({'condensed': true}, bookmark));
    //const bookmark = store.bookmarks[1];
    // store.findAndUpdate(bookmark.id, {
    //   'title': 'Yandex',
    //   'url': 'http://yandex.com',
    //   'desc': 'Great engine to search for Russian-language resources',
    //   'rating': 4
    // });
    bookmarkList.render();
  });
});