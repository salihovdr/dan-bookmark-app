'use strict';
/* global Item */

// eslint-disable-next-line no-unused-vars
const store = (function () {
  //works
//   const addBookmark = function (bookmarkObj) {
//     this.bookmarks.push(bookmarkObj);
//   };

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

  const toggleCheckedFilter = function () {
    this.hideCheckedItems = !this.hideCheckedItems;
  };

  const setSearchTerm = function (term) {
    this.searchTerm = term;
  };

  return {
    bookmarks: [],
    hideCheckedItems: false,
    searchTerm: '',

    //addBookmark,
    mergeAndAddBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleCheckedFilter,
    setSearchTerm,
  };

}());
