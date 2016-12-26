'use strict';

var getElement = function getElement(elementId) {
  return document.getElementById(elementId);
};

var time = getElement('currentTime');

time.html = Date.now();