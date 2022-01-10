 
router.get('/test', (req, res) => {
    res.send(res)
})
  */

// also use _.range to create an array of vals within args
function evalArray (target) {
    let onOff = []
    target.forEach((target) => {
        if (_.inRange(target, 26.9, 128.1) == true) {
            console.log('wow!' + target)
            onOff.push('1')
        } else {
            onOff.push('0')
            console.log('false' + target)}
    })
    let zipArr = _.zip(target, onOff)
    console.log(zipArr)

  }
  let trueArr = [80, 28, 100, 127, 128, 76, 40]
  evalArray(trueArr)
  let falseArr = [80, 28, 200, 129, 128, 20, 40]
  evalArray(falseArr)

// First check 
  


/////FUNCTION SANDBOX >>>>
*/
let btcArr = 
    [41408, 41399, 41162, 41452, 41385, 41339, 41751, 41809,
    41730, 41803, 41894, 41919, 41845, 41949, 42100, 42290,
    42358, 42800, 42766, 42757, 42774, 42799, 42860, 42823,
    42815, 42835, 42874, 42935, 42902, 42904, 42871, 42875,
    43004, 43008, 43000, 42967, 42950, 42961, 42999, 42970,
    42833, 42882, 42929, 42947, 42904, 42788, 42843, 42787,
    42765, 42800, 42759, 42905, 42885, 42864, 42922, 42940,
    43071, 43082, 43120, 43129, 43207, 43207, 43154, 43155,
    43071, 43095, 43156, 43122, 43131, 43180, 43195, 43124,
    43103, 43190, 43190, 43141, 43154, 43051, 43026, 43120,
    43141, 43120, 43153, 43139, 43121, 43215, 43177, 43189,
    43212, 43201, 43150, 43136, 43199, 43221, 43169, 43219,
    43227, 43179, 43232, 43318]
//GOAL!!!!!!!
/* Write a function that 
a) preserves > and < relationship for the current value and the prev value
b) performs the same operations on each index position the same number of times to get the number between 1 and 1000 */
let compareArr = []
function getLowerThanOneK () {

}
let relArr = []
let tryArr = []
function genRelArr () {
    btcArr.reduce(function(acc, cur, ind) {
        /* console.log(`${btcArr[ind]} versus ${btcArr[ind - 1]}`) */
        if (btcArr[ind] === btcArr[0]) {
            relArr.push('e')
            tryArr.push('e')
            return
        } else {
            let vally = (btcArr[ind] - btcArr[ind - 1])
            tryArr.push(vally)
            btcArr[ind] > btcArr[ind - 1] === true ? relArr.push('g') : relArr.push('l')
            return
        }
        
        }
   ,0
    )

console.log(relArr)
console.log(tryArr)
compareArr = _.zip(relArr, tryArr)
console.log(compareArr)
}
genRelArr()
let verArr = []
function preservesRelationship() {
    compareArr.forEach((pos) => {
        if (pos[0] === 'g' && pos[1] > 0 === true) {
            verArr.push('true greater')
        } else if (pos[0] === 'l' && pos[1] < 0 === true) {
            verArr.push('true lesser')
            
        } else {
            verArr.push('false')
        }
    })
    console.log(verArr)
    
}
preservesRelationship()

function anyFalse(arr, val) {
    let indexArr = []
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === val){
            indexArr.push(i)}}
 console.log(indexArr)
}
anyFalse(verArr, 'false')
console.log(compareArr[61] + 'vallllll')

let newVals = []
function translateData () {
    btcArr.forEach((pos) => {
    let lengthVal = Math.ceil(Math.log10(pos + 1))
    transVal = (pos / (lengthVal * lengthVal)) / 13
    console.log(transVal / Math.ceil(Math.log10(transVal + 1)))
})
}
translateData()