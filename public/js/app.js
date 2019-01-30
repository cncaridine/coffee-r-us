
console.log('carousel connected to app.js!')
// MODAL
$( () => {
  // Grab About the Game button
  const $openBtn = $('#openModal')
  // Grabb modal element
  const $modal = $('#modal')
  // Grab close button
  const $closeBtn = $('#close')

  // Event handler to open the modal or use .show() >>>$modal.show()
  const openModal = () => {
    $modal.css('display', 'block')
  }

  // Event handler to close the modal or use .hide()>>>>$modal.hide()
const closeModal = () => {
  $modal.css('display', 'none')
}

//Add event listener to Close button
$closeBtn.on('click', closeModal)

  //Add event listener to About the Game button
  $openBtn.on('click', openModal)
})

$(() => {
// current image counter
  let currentImgIndex = 0
  // counts # ofimages in the carousel
  const numOfImages = $('.carousel-images').children().length - 1
  console.log(numOfImages)
  // next Button
$('.next').on('click', () => {
  // hide current img
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'none')
    // increment currentImgIndex
    if (currentImgIndex < numOfImages) {
      currentImgIndex++
    } else {
      currentImgIndex = 0
    }
    // next img to show
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
    //  previous img to show
    $('.carousel-images').children().eq(currentImgIndex).css('display', 'block')
  })
})
