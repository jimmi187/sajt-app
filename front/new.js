
/**
 * Checks if a number is found in an array.
 * @param {number} num - The number to check.
 * @param {number[]} array - The array to search in.
 * @returns {number} - -1 if not found, the index if found.
 */

function numberFound(num, array) {
    for (var i = 0; i < array.length; i++) {
        if (num === array[i]) {
            return -1;
        }
    }
    return num;
}

/**
 * Generates a random number within a specified range.
 * @param {number} min - The minimum value (inclusive) of the range.
 * @param {number} max - The maximum value (inclusive) of the range.
 * @returns {number} - A random number within the specified range.
 */
function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Generates an array of unique random numbers within a specified range.
 * @param {number} n - The number of unique random numbers to generate.
 * @param {number} min - The minimum value (inclusive) of the range.
 * @param {number} max - The maximum value (inclusive) of the range.
 * @returns {number[]} - An array of unique random numbers.
 */



function createUniqueRandomArray(n, min, max) {
    var randomNumbers = [];

    for (var i = 0; i < n; i++) {
        var randomNum;

        do {
            randomNum = randomNumber(min, max);
        } while (numberFound(randomNum, randomNumbers) === -1);

        randomNumbers.push(randomNum);
    }

    return randomNumbers;
}



function najredjibrojevi() {

    var brojevi = {}

    let x = 100000;

    while (x > 0) {

        let serija = createUniqueRandomArray(7, 1, 39);
        let k = 7;

        while (k > 0) {
            let n = "" + serija[k - 1];
            brojevi[n] = (n in brojevi) ? brojevi[n] + 1 : 1;
            k -= 1;
        }


        x -= 1;
    }


    var obrnutibrojevi = {}

    for (let key in brojevi) {
        if (brojevi.hasOwnProperty(key)) {
            var value = brojevi[key];
            let sv = "" + value;
            obrnutibrojevi[sv] = key;
        }
    }



    console.log(obrnutibrojevi);

}



// var brojevi = {}

// let x = 1000000;

// while (x > 0) {

//     let n = createUniqueRandomArray(7, 1, 39).sort(function (a,b) {return a-b}).join(',');
//     // console.log(n);
//     if(n in brojevi){ 
//         brojevi[n] = brojevi[n]+ 1;
//     }else{
//         brojevi[n] = 1;
//     }          

//     // while (k > 0) {
//     //     let n = "" + serija[k - 1];
//     //     
//     //     k -= 1;
//     // }
//     x -= 1;
// }



najredjibrojevi()


// var obrnutibrojevi = {}
// var count = 0;
// for (let key in brojevi) {
//     if (brojevi.hasOwnProperty(key)) {
//         var value = brojevi[key];
//         if(value === 1) obrnutibrojevi[key] = value;
//         count++;
//     }
// }

// console.log(count);
// console.log(obrnutibrojevi);





// function calculateCombinations(n, k) {
//     function factorial(num) {
//         if (num === 0 || num === 1) {
//             return 1;
//         }
//         return num * factorial(num - 1);
//     }

//     return factorial(n) / (factorial(k) * factorial(n - k));
// }

// const totalNumbers = 39;
// const numbersToChoose = 7;
// const combinations = calculateCombinations(totalNumbers, numbersToChoose);

// console.log(`Number of unique ${numbersToChoose}-number combinations from 1 to ${totalNumbers} is: ${combinations}`);









7
13
18
32
37
38
39
15
25
26
28
29
37
38
9
16
25
28
30
31
36
14
16
17
27
29
32
38
3
4
13
28
29
35
37
2
7
9
15
26
37
38
2
13
26
33
35
38
39
4
7
9
11
14
20
31
5
7
8
9
10
21
31
7
13
15
16
25
33
34
3
14
22
23
27
30
38
1
14
19
26
30
34
38
12
14
20
21
22
25
29
2
3
4
5
33
35
36





