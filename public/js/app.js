
console.log('carousel connected to app.js!')

$(() => {
// next Button
$('.next').on('click', () => {
  //hide current img 
 $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')
 // increment currentImgIndex
 if (currentImgIndex < numOfImages) {
   currentImgIndex ++;
 } else {
   currentImgIndex = 0;
 }
}

})
