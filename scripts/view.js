'use strict';
/* global $, api, store */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  //generate individual bookmark html element
  const generateBookmarkElement = (bookmark) => {
    
    const bookmarkRating = `${bookmark.rating}`;
    
    //generate star rating html
    let ratingDisplay = '';
    for (let i = 0; i < bookmarkRating; i++) {
      ratingDisplay+= '<span class="fa fa-star checked"></span>';
    }                   

    //generate condensed view of bookmark
    if (bookmark.condensed) {
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
    } 
    else 

    //expanded bookmark view
    {
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
  };

  //combine all bookmark elements together
  const generateBookmarksString = (bookmarksList) => {
    const bookmarks = bookmarksList.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  //toggle view of bookmark add form and "Add New" button
  const renderBookmarkAddForm = () => {
    
    //if addingStatus is true, show add bookmark form and hide
    //"Add New" button
    if (store.addingStatus) {
      $('#bookmark-form').show();
      $('.js-add-form-trigger').hide();
    }
    //otherwise do the opposite
    else 
    {
      $('#bookmark-form').hide();
      $('.js-add-form-trigger').show();
    }
  };


  //renders page based on store data
  const render = () => {
    
    //renders form/add new button
    renderBookmarkAddForm();

    let bookmarks = store.bookmarks;
    
    //renders bookmarks based on rating value
    if (store.filtered) {
      bookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filtered);
    }
    //generates list of bookmarks from the store
    const bookmarksString = generateBookmarksString(bookmarks);
    
    //renders generated list of bookmarks in DOM 
    $('.js-bookmark-list').html(bookmarksString);
  };

  //handles addition of new bookmarks to API and store
  const handleNewBookmarkSubmit = () => {
    $('#bookmark-form').on('click', '.add-btn', function (event) {
      event.preventDefault();

      const form = $(event.currentTarget).closest('#bookmark-form');
      
      //collects JSON from form
      const newBookmarkObj = JSON.parse($(form).serializeJson());
      
      //resets form
      $(form)[0].reset();

      //creates new object in API, sends to store, hides
      //bookmark add form and renders changes on page
      api.createBookmark(newBookmarkObj, (newBookmark) => {
        store.addBookmark(newBookmark);
        store.toggleAddBookmarkForm();
        render();
      });
    });
  };

  //gets bookmark object id
  const getBookmarkIdFromElement = (bookmark) => {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  };

  //toggles condensed property of individual bookmark
  const handleBookmarkToggleCondensed = () => {
    $('.js-bookmark-list').on('click', '.js-bookmark-expand', event => {
      
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmark = store.findById(id);
      
      store.findAndUpdate(id, { condensed: !bookmark.condensed });
      render();
    });
  };

  //handles toggling of store.addingStatus value
  //renders change in DOM
  const handleAddBookmarkFormTrigger = () => {
    $('.bookmark-add-form-trigger-btn').click(() => {
      store.toggleAddBookmarkForm();
      render();
    });
  };

  //handles deleting of bookmark objects from API and store
  //renders change in DOM
  const handleDeleteBookmark = () => {
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  };

  //handles display of bookmarks filtered by rating
  //renders change in DOM
  const handleFilteredByRatingView = () => {
    $('#rating-select').on('change', event => {        
      const val = $(event.currentTarget).val();
      store.setFilter(val);
      render();
    });
  };

  const bindEventListeners = () => {
    handleNewBookmarkSubmit();
    handleDeleteBookmark();
    handleBookmarkToggleCondensed();
    handleFilteredByRatingView();
    handleAddBookmarkFormTrigger();
  };

  // exposes some of the methods from view
  return {
    render, bindEventListeners,
  };

}());