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
                </div>
            <div>
        </li>
    `;
    } else {
      return `
        <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
            <div class="box">
                <p class="bookmark-title"><a href="${ bookmark.url}" target="_blank">${bookmark.title}</a></p>
                    <div class='rating-stars'>
                        ${ratingDisplay}
                    </div>
                <section class="description">
                    <p>${ bookmark.desc}</p>
                </section>
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
    }
  }


  function generateBookmarksString(bookmarksList) {
    const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  //works 
  const renderBookmarkAddForm = () => {
    if (store.addingStatus) {
      $('#bookmark-form').show();
      $('.js-add-form-trigger').hide();
    }
    else {
      $('#bookmark-form').hide();
      $('.js-add-form-trigger').show();
    }
  };


  //works
  function render() {

    renderBookmarkAddForm();

    let bookmarks = store.bookmarks;
    
    if (store.filtered) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filtered);
    }
    const bookmarksString = generateBookmarksString(bookmarks);

    $('.js-bookmark-list').html(bookmarksString);
  }

  //doesn't work with 'submit' event
  function handleNewBookmarkSubmit() {
    $('#bookmark-form').on('click', '.add-btn', function (event) {
      event.preventDefault();

      const form = $(event.currentTarget).closest('#bookmark-form');
      const newBookmarkObj = JSON.parse($(form).serializeJson());

      api.createBookmark(newBookmarkObj, (newBookmark) => {
        store.addBookmark(newBookmark);
        store.toggleAddBookmarkForm();
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
  function handleAddBookmarkFormTrigger() {
    $('.bookmark-add-form-trigger-btn').click(event => {
      console.log('add bookmark clicked!');
      store.toggleAddBookmarkForm();
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

  //   function handleEditBookmark() {
  //     $('.js-bookmark-list').on('click', '.js-bookmark-edit', event => {
  //       event.preventDefault();
  //       const id = getBookmarkIdFromElement(event.currentTarget);
  //       const itemName = $(event.currentTarget).find('.shopping-item').val();
  //       api.updateBookmark((id, newName) => {
  //         store.findAndUpdate(id, { name: itemName });
  //         render();
  //       });
  //     });
  //   }

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
    //handleEditBookmark();
    handleFilterList();
    handleBookmarkToggleCondensed();
    handleFilteredByRatingView();
    handleAddBookmarkFormTrigger();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };

}());