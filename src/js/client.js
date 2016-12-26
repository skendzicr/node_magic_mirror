const getElement = elementId => document.getElementById(elementId);

let time = getElement('currentTime');

time.html = Date.now();
