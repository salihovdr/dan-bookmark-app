'use strict';
/* global $, api, store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateBookmarkElement(bookmark) {
    
    const bookmarkRating = `${bookmark.rating}`;
    
    let ratingDisplay = '';
    for (let i = 0; i < bookmarkRating; i++) {
      ratingDisplay+= '<span class="fa fa-star checked"></span>';
    }                   

    if (bookmark.condensed){
      return `
        <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
            <div class="box">
                <p class="bookmark-title"><a href="${ bookmark.url}" target="_blank">${bookmark.title}</a></p>
                    <div class='rating-stars'>
                        ${ratingDisplay}
                    </div>
                    <div class="bookmark-item-controls">
                    <button class="bookmark-item-expand js-bookmark-expand">
                        <span class="button-label">toggle view</span>
                    </button>
                    <button class="bookmark-item-delete js-bookmark-delete">
                        <span class="button-label">delete</span>
                    </button>
                </div>
            <div>
        </li>
    `;
    } else {
      return `
        <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
            <div class="box">
                <h2><a href="${ bookmark.url}" target="_blank">${bookmark.title}</a></h2>
                    ${ratingDisplay}
                <section class="description">
                    <p>${ bookmark.desc}</p>
                </section>
                <div class="bookmark-item-controls">
                    <button class="bookmark-item-expand js-bookmark-expand">
                        <span class="button-label">toggle view</span>
                    </button>
                    <button class="bookmark-item-edit js-bookmark-edit">
                        <span class="button-label">edit</span>
                    </button>
                    <button class="bookmark-item-delete js-bookmark-delete">
                        <span class="button-label">delete</span>
                    </button>
                </div>
            <div>
        </li>
    `;
    }
  }


  function generateBookmarksString(bookmarksList) {
    const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  const bookmarkAddForm = `        
  <form id="bookmark-form" class="">
            <fieldset name="bookmark-info">

                <legend>Add Bookmark</legend>
                <div>
                <label for="bookmark-url">URL</label>
                <input type="url" name="url" class="js-bookmark-url" placeholder="http://...">
                </div>
                <div>
                <label for="bookmark-title">Title</label>
                <input type="text" name="title" placeholder="i.e. JS video tutorials">
                </div>
                <div>
                <label for="bookmark-description">Description:</label>
                <textarea name="desc" rows="4" cols="33" maxlength="600" wrap="hard"></textarea>
                </div>

                <label for="bookmark-rating">Assign rating</label>
                <div>
                    <input type="radio" id="rating1" name="rating" value="1" checked>
                    <label for="contactChoice1">1 star</label>

                    <input type="radio" id="rating2" name="rating" value="2">
                    <label for="contactChoice2">2 stars</label>

                    <input type="radio" id="rating3" name="rating" value="3">
                    <label for="contactChoice3">3 stars</label>

                    <input type="radio" id="rating4" name="rating" value="4">
                    <label for="contactChoice3">4 stars</label>

                    <input type="radio" id="rating5" name="rating" value="5">
                    <label for="contactChoice3">5 stars</label>
                </div>
            </fieldset>

            <button class="add-btn" type="submit">Add</button>
        </form>`;

  //works
  function render() {
    if (store.newItem) {
      $('#form-section').html(bookmarkAddForm);
    }

    let bookmarks = store.bookmarks;
    
    if (store.filtered) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filtered);
    }
    const bookmarksString = generateBookmarksString(bookmarks);

    $('.js-bookmark-list').html(bookmarksString);
  }

  //works
  function handleNewBookmarkSubmit() {
    $('#bookmark-form').on('submit', function (event) {
      event.preventDefault();
      const newBookmarkObj = JSON.parse($(event.target).serializeJson());
      api.createBookmark(newBookmarkObj, (newBookmark) => {
        store.addBookmark(newBookmark);
        render();
      });
    });
  }

  //works
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  //works
  function handleBookmarkToggleCondensed() {
    $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.findById(id);
      store.findAndUpdate(id, { condensed: !bookmark.condensed });
      render();
    });
  }

  //works
  function handleDeleteBookmark() {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleEditBookmark() {
    $('.js-bookmark-list').on('click', '.js-bookmark-edit', event => {
      event.preventDefault();
      const id = getBookmarkIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      api.updateBookmark((id, newName) => {
        store.findAndUpdate(id, { name: itemName });
        render();
      });
    });
  }

  //works
  function handleFilteredByRatingView() {
    $('#rating-select').on('change', event => {        
      const val = $(event.currentTarget).val();
      store.setFilter(val);
      render();
    });
  }

  function handleFilterList(){}

  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleDeleteBookmark();
    handleEditBookmark();
    handleFilterList();
    handleBookmarkToggleCondensed();
    handleFilteredByRatingView();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());