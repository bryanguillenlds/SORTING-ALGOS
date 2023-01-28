/************
* BUBBLE SORT - O (n^2)
*
* * Just for educational purposes, not really useful.
* 
*   Basically compare two subsequent items and if necessary 
*   move the larger one to the last position. Until the highest item
*   ends up at the end. Then we iterate again until we don't have anything
*   else to bubble/move.
************/
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function bubbleSort(arr) {
  const length = arr.length;
  
  //Once we are done with the inner loop we go back to outer loop
  //and compare everything again until we are done bubbling
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      //if current item is greater than next item...
      if (arr[j] > arr[j+1]) {
        //Swap them
        let temp = arr[j]; //tem var holding current item

        arr[j] = arr[j+1] //current item is now equal to next item
        arr[j+1] = temp; //next item is now what current item was
      }
    }
  }

  return arr;
}


function optimizedBubbleSort(arr) {
  const length = arr.length; //extract length
  let noSwaps; //to keep track if there were swaps each iteration
  
  //loop in reverse from the end to the beginning
  for (let i = length; i > 0; i--) {
    noSwaps = true; //set this to false at the beginning...
    
    //loop only through a subset of the arr(up until the last UNSORTED item)
    for (let j = 0; j < i - 1; j++) {
      //if current item is greater than next item...
      if (arr[j] > arr[j+1]) {
        //Swap them
        let temp = arr[j]; //temp var holding current item

        arr[j] = arr[j+1] //current item is now equal to next item
        arr[j+1] = temp; //next item is now what current item was

        noSwaps = false; //swap changes to true ONLY IF we actually made it inside this condition to swap
        //if we didn't make it here, it means we didn't swap, so it doesn't get setto false.
      }
    }

    //if last iteration didn't have any swaps, it means we are done bubbling
    if (noSwaps) break; //exit looping
  }
}

/************
* SELECTION SORT - O (n^2)
* 
* * Just for educational purposes, not really useful.
*
*   Look for the smallest element of the list (by comparing) and 
*   then swap it with the one in the first place of the list.
*   Keep going until there is nothing else to compare.
************/
const nums = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(array) {
  const length = array.length;

  //Inner loop starts at current + 1 (next item) and compares that item
  //to the current minimum. Once we are through that loop, we go to
  //outer loop and move to next item in list and do the same.
  for(let i = 0; i < length; i++){
    // set current index as minimum
    let min = i;
    let temp = array[i]; //grab reference to current item

    //start inner loop at item next to current min
    for(let j = i+1; j < length; j++){
      //if current item is lower than current min
      if (array[j] < array[min]){
        //update index of minimum 
        min = j;
      }
    }

    //Only swap if current index is NOT the same index as the minimum already
    //this way we avoid unnecesary swap attempts. There is only need for swapping
    //if the indexes are different.
    if (i !== min) {
      //SWAP LOGIC
      array[i] = array[min]; //current minimum is moved to the current index in the iteration
      array[min] = temp; //swap current minimum with the current item
    }
  }
  
  return array;
}


/************
* INSERTION SORT - O (n^2)
* 
* * Only use if input is not large or almost already sorted
* 
*   Compare an item to the others and if lower, shift them to the appropiate space.
************/
const numbArr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function insertionSort(array) {
  const length = array.length;
  
	for (let i = 0; i < length; i++) {
    //If current item is lower than first item...
		if (array[i] < array[0]) {
      //move to the first position, unshifting the list
      array.unshift(array.splice(i,1)[0]);
    } else {
      //only sort IF number is smaller than number on the left of it.
      //This is the part of insertion sort that makes it fast if
      //the array is almost sorted.
      if (array[i] < array[i-1]) {
        //loop to find where number should go
        //loop from second item (index 1) until the current item
        for (var j = 1; j < i; j++) {
          //if current element at i is bigger or equal to current el at j-1
          //AND if current el at i is less than current el at j...
          if (array[i] >= array[j-1] && array[i] < array[j]) {
            //move number to the correct spot
            array.splice(j, 0, array.splice(i, 1)[0]);
          }
        }
      }
    }
	}
}

/************
* MERGE SORT - O (n log(n))
* 
*
*   Divide the list into subsets until we have only single items,
*   then compare items in pairs and order them and merge them.
*   Keep doing  this until we have a single list again.
************/
const numberArr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function mergeSort (array) {
  //if only one item, return it and exit recursion
  if (array.length === 1) {
    return array
  }
  
  // Split Array in into right and left arrays
  const length = array.length;
  const middle = Math.floor(length / 2); //grab middle index
  const left = array.slice(0, middle); //grab from beginning to middle
  const right = array.slice(middle); //grab from middle to end

  //The recursion will keep splitting into left sublists until it can't anymore
  //Once a left sublist cannot split anymore, it will move onto splitting the right sublists into sublists. 
  //Once it can't split anymore it will call MERGE to merge them and then keep doing that
  //until merge has been called for every sublist and also the original sublists.
  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

//function that takes the split up arrays and merges them
function merge(left, right){
  const result = [];
  let leftArrIndex = 0;
  let rightArrIndex = 0;

  //loop through all the right and left arrays
  while (leftArrIndex < left.length && rightArrIndex < right.length) {
    //if the current item of the left array is less than the current item of the right array...
    if (left[leftArrIndex] < right[rightArrIndex]) {
      //push the current item from left array and increment the left index to move onto
      //the next item of the left array
      result.push(left[leftArrIndex]);
      leftArrIndex++;
    } else {
      //if it's the opposite
      //then push current item from left array and increment right index to move onto 
      //the next item of right arr
      result.push(right[rightArrIndex]);
      rightArrIndex++;
    }
  }

  //concatenate the two arrays to the resul, in case there are leftovers
  return result
    .concat(left.slice(leftArrIndex))
    .concat(right.slice(rightArrIndex));
}


/************
* QUICK SORT - O (n log(n))
* 
*
*   Select one pivot element and find where all other elements
*   belong in relation to the pivot. Smaller to the left, greater
*   to the right.
*   Repeat the process of picking a pivot and finding
*   with the left subset and right subset.
************/

//HELPER FUNCTION TO SWAP
function swap(arr, i, j) {
  //Swap them
  let temp = arr[i]; //temp var holding current item

  arr[i] = arr[j] //initial swap
  arr[j] = temp; //swap for what current item was
}

//HELPER FUNCTION TO CHOOSE PIVOT
//This will return the index of the pivot after arranging
//the lesser items to the left and the greater to the right
function pivot(arr, start=0, end=arr.length-1) {
  let pivot = arr[start]; //place pivot at the start of arr
  let swapIndex = start; //this will keep track of where the pivot should be swaped to

  //loop through all arr starting at the element next to start
  for (let i = start + 1; i <= end; i++) {
    //If current pivot is greater than current element
    if (pivot > arr[i]) {
      //increment swapindex to keep track of how many elements
      //are smaller than the pivot
      swapIndex++;
      //swap current el with el at current swap index
      //this is in preparation so that all smaller items are
      //next to each other before finally swaping the pivot to the
      //right place (the final swapIndex)
      swap(arr, swapIndex, i);
    }
  }

  //after all is in place,
  //swap the starting pivot with the final swap index
  swap(arr, start, swapIndex);

  return swapIndex; //return new pivot index after rearranging arr
}

//QUICK SORT
function quickSort(arr, left=0, right=arr.length-1) {
  //if left is less than right, then it means we can still recurse
  //if it is equal then it means they are pointing at the same element/index
  //so we don't have to recurse anymore, we can skip to return the arr
  if (left < right) {
    let pivotIndex = pivot(arr, left, right); //figure out correct index of pivot

    //recursively do quicksort on the left subarray
    //which starts at 0 (left) and ends before the pivotIndex
    quickSort(arr, left, pivotIndex-1);
  
    //do he same with right subarray
    //start after pivotindex and end where arr ends
    quickSort(arr, pivotIndex+1, right);
  }

  return arr;
  
}


/************
* RADIX SORT - Only for numbers
* 
* * This is NOT a comparison algo
*
*   It exploits the fact that info about the size of a number
*   is encoded in the number of digits.
*   Create buckets that will contain all numbers that end with
*   the same digit. Keep doing that with the rest of the digits of the numbers.
*   The amount of times we will have to iterate depends on the largest number and the
*   amount of digits it has.
************/