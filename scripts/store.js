'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function () {
  //works
  const addBookmark = function (bookmarkObj) {
    bookmarkObj.condensed = true;
    this.bookmarks.push(bookmarkObj);
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
    store.filtered = rating;
  };

  //works
  const toggleAddBookmarkForm = () => {
    store.addingStatus = !store.addingStatus;
  };

  return {
    bookmarks: [],
    filtered: '',
    addingStatus: false,

    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    setFilter,
    toggleAddBookmarkForm
  };

}());
