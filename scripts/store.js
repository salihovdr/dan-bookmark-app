'use strict';
/* global Item */

// eslint-disable-next-line no-unused-vars
const store = (function () {
  //works
//   const addBookmark = function (bookmarkObj) {
//     this.bookmarks.push(bookmarkObj);
//   };

  //works
  const mergeAndAddBookmark = (obj, apiObj) => {
    obj = Object.assign(obj, apiObj);
    store.bookmarks.push(obj);

  };

  //works
  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  //works
  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  //works
  const findAndUpdate = (id, newObj) => {
    let currentObj = store.findById(id);
    currentObj = Object.assign(currentObj, newObj);
  };

  //works
  const setFilter = (rating) => {
    this.filtered = rating;
  };

  const toggleAddBookmarkForm = () => {
    this.newItem = true;
  };

  return {
    bookmarks: [],
    filtered: '',
    newItem: false,

    //addBookmark,
    mergeAndAddBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    setFilter,
    toggleAddBookmarkForm
  };

}());
