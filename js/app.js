
// console.log('carousel connected to app.js!')

$(() => {

  // current image counter
  let currentImgIndex = 0
  // count # of images in the carousel
  const numOfImages = $('.carousel-images').children().length - 1
  console.log(numOfImages)

  // next button
  $('.next').on('click', () => {
    // hide current img
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')
    // increment currentImgIndex
    if (currentImgIndex < numOfImages) {
      currentImgIndex++
    } else {
      currentImgIndex = 0
    }
    //show next img
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'block')
  })

  // previous button
  $('.previous').on('click', () => {
    // we want the current img to hide
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')
    // decrement currentImgIndex
    if (currentImgIndex > 0) {
      currentImgIndex--
    } else {
      currentImgIndex = numOfImages
    }
    // show previous img
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'block')
  })
})
