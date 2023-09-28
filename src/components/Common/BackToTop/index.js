import React from 'react';
import "./styles.css"
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';

const BackToTop = () => {
    let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
  return (
    <div className='back-top-top-btn' id='myBtn' onClick={() => topFunction()}><NorthRoundedIcon /></div>
  )
}

export default BackToTop