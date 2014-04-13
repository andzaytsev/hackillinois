// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
/*
var formGenerator = {
  getForm: function() {
    var input = document.createElement('textarea');
    input.cols = 40;
    input.rows = 5;
    document.body.appendChild(input);
  },
  getButton: function(){
    var input = document.createElement('button');
  }
};*/

// Run our kitten generation script as soon as the document's DOM is ready.
// document.addEventListener('DOMContentLoaded', function () {
//   //formGenerator.getForm();

// });

$(document).ready(function(){
  $("#submit").click(function(event){
    console.log("submit clicked");
    console.log($("#comment").val());
    chrome.runtime.sendMessage({"comment":$("#comment").val()});
  });
});
