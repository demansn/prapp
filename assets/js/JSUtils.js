function removeElementOfArray(array, element) {

    var i, l, newArr = [];

    for (i = 0, l = array.length; i < l; i += 1) {
        if (array[i] !== element) {
            newArr.push(array[i]);
        }
    }

    return newArr;

}
