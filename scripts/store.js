'use strict';

// eslint-disable-next-line no-unused-vars
const store = (function () {

  //add bookmark to store 
  const addBookmark = function (bookmarkObj) {
    //add condensed property to obj before adding to store
    bookmarkObj.condensed = true;
    this.bookmarks.push(bookmarkObj);
  };

  //find bookmark obj by id
  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  //delete bookmark from store
  const findAndDelete = function (id) {
    //filter out bookmark with passed in id
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  //update bookmark object
  const findAndUpdate = (id, newObj) => {
    // eslint-disable-next-line no-unused-vars
    let currentObj = store.findById(id);
    //merge passed in new object into current bookmark object
    currentObj = Object.assign(currentObj, newObj);
  };

  //set value to store.filtered property
  const setFilter = (rating) => {
    store.filtered = rating;
  };

  //toggle store.addingStatus Boolean value
  const toggleAddBookmarkForm = () => {
    store.addingStatus = !store.addingStatus;
  };

  //return object with store properties and methods
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
