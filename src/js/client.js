require('../scss/main');
import moment from 'moment';


const getElement = elementId => document.getElementById(elementId);


let time = getElement('currentTime');
time.innerText = moment().format('LTS');
