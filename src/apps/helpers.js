export const getRandomIndex = (str) => Math.floor(Math.random() * str.length);

export const capitaliseLetterAtIndex = (str, index) => {
    return str.substring(0, index) +
        str[index].toUpperCase() +
        str.substring(index + 1);
}

export const capitaliseRandomLetter = (str) => capitaliseLetterAtIndex(str, getRandomIndex(str));

export const lowercaseLetterAtIndex = (str, index) => {
    return str.substring(0, index) +
        str[index].toLowerCase() +
        str.substring(index + 1);
}

export const deleteEverySecondLetter = (str) => {
    return str
        .split('')
        .filter((_, index) => index % 2 === 0)
        .join('');
}

export const restoreDeletedLetters = (str, deletedLetters) => {
    const newStrArray = [];
    for (let i=0; i<str.length; i++) {
        newStrArray.push(str[i]);
        newStrArray.push(deletedLetters[i]);
    }

    return newStrArray.join('');
}
