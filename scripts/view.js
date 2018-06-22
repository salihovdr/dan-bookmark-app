'use strict';
/* global $, api, store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateBookmarkElement(bookmark) {
    if (bookmark.condensed){
      return `
        <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
            <div class="box">
                <p class="bookmark-title"><a href="${ bookmark.url}" target="_blank">${bookmark.title}</a></p>
                    <div class='rating-stars'>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
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
                    <div class='rating-stars'>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
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


  function render() {
    // Filter item list if store prop is true by item.checked === false
    let bookmarks = store.bookmarks;

    //     if (store.hideCheckedItems) {
    //       items = store.items.filter(item => !item.checked);
    //     }

    //     // Filter item list if store prop `searchTerm` is not empty
    //     if (store.searchTerm) {
    //       items = store.items.filter(item => item.name.includes(store.searchTerm));
    //     }
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

  //   function handleToggleFilterClick() {
  //     $('.js-filter-checked').click(() => {
  //       store.toggleCheckedFilter();
  //       render();
  //     });
  //   }

  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
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
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());