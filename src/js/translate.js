export default function convert(lat) {
    const digraphs = [
        ['lj', 'љ'],
        ['nj', 'њ'],
        ['dž', 'џ'],
        ['Lj', 'Љ'],
        ['Nj', 'Њ'],
        ['Dž', 'Џ']
    ];
    const map = [
        ['a', 'а'],
        ['b', 'б'],
        ['v', 'в'],
        ['g', 'г'],
        ['d', 'д'],
        ['đ', 'ђ'],
        ['e', 'е'],
        ['ž', 'ж'],
        ['z', 'з'],
        ['i', 'и'],
        ['j', 'ј'],
        ['k', 'к'],
        ['l', 'л'],
        ['m', 'м'],
        ['n', 'н'],
        ['o', 'о'],
        ['p', 'п'],
        ['r', 'р'],
        ['s', 'с'],
        ['t', 'т'],
        ['ć', 'ћ'],
        ['u', 'у'],
        ['f', 'ф'],
        ['h', 'х'],
        ['c', 'ц'],
        ['č', 'ч'],
        ['š', 'ш']
    ];

    let word = lat;

    digraphs.forEach(digraph => {
        word = word.split(digraph[0]).join(digraph[1]);
    });

    function findReplace(arr) {
        return letter => {
            const item = arr.find(arrItem => arrItem[0] === letter);
            return item ? item[1] : letter;
        };
    }

    const letters = word.split('');
    return letters
    .map(findReplace(map))
    .map(letter => {
        let item = map.find(arrItem => arrItem[0].toLocaleUpperCase() ===
        letter.toLocaleUpperCase());
        item = item ? item[1].toLocaleUpperCase() : item;
        return item || letter;
    })
    .join('');
}
