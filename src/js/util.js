const getElement = elementId => document.getElementById(elementId);

const beaufortScale = (wind) => {
    let windStrength;

    switch (true) {
    case wind < 0.3:
        windStrength = '0';
        break;
    case (wind >= 0.3 && wind <= 1.5):
        windStrength = '1';
        break;
    case (wind >= 1.6 && wind <= 3.3):
        windStrength = '2';
        break;
    case (wind >= 3.4 && wind <= 5.5):
        windStrength = '3';
        break;
    case (wind >= 5.6 && wind <= 7.9):
        windStrength = '4';
        break;
    case (wind >= 8.0 && wind <= 10.7):
        windStrength = '5';
        break;
    case (wind >= 10.8 && wind <= 13.9):
        windStrength = '6';
        break;
    case (wind >= 14.0 && wind <= 17.1):
        windStrength = '7';
        break;
    case (wind >= 17.2 && wind <= 20.7):
        windStrength = '8';
        break;
    case (wind >= 20.8 && wind <= 24.4):
        windStrength = '9';
        break;
    case (wind >= 24.5 && wind <= 28.4):
        windStrength = '10';
        break;
    case (wind >= 28.5 && wind <= 32.6):
        windStrength = '11';
        break;
    case wind >= 32.7:
        windStrength = '12';
        break;
    default:
        windStrength = '0';
    }

    return windStrength;
};

module.exports = {
    getElement: getElement,
    beaufortScale: beaufortScale
};
