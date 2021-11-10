
(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function validateForm(){

  let x = document.getElementById("name").value;
  let y = document.getElementById("email").value;
  let z = document.getElementById("subject").value;
  let a = document.getElementById("message").value;
  let b = document.getElementById("date").value;
  let c = document.getElementById("time").value;
  let d = document.getElementById("phone").value;
  let e = document.getElementById("people").value;
  console.log(x)
  console.log(y)
  console.log(z)
  console.log(a)
  console.log(b)
  console.log(c)
  console.log(d)
  console.log(e)
  if( x=="" || y==""|| z==""|| a =="" || b==""|| c==""|| d==""|| e==""){
    alert("enter the required fields");
    // console.log("ENter details correctly")
  return false;
  }else{
    alert("Your booking request was sent. We will call back or send an Email to confirm your reservation. Thank you!");
    // console.log("Sent Successfully")
  }

}
// function qw(){

//   let name = document.getElementById("name").value;
//   let mail = document.getElementById("email").value;
//   let sub = document.getElementById("subject").value;
//   let mess = document.getElementById("message").value;
//   let date = document.getElementById("date").value;
//   let time = document.getElementById("time").value;
//   let phone = document.getElementById("phone").value;
//   let people = document.getElementById("people").value;
 

//   if(name =="" || mail==""|| sub =="" || mess=="" || date==""||time==""|| phone==""|| people==""){
//     alert("enter the required fields");
//     return false;
//   }else{
//     alert("Your booking request was sent. We will call back or send an Email to confirm your reservation. Thank you!");
//   }
//   }



  // function clicked(){
  //   let i = document.getElementById("name");
  //   let j = document.getElementById("email");
  //   let k = document.getElementById("subject");
  //   let l = document.getElementById("message");
  //   console.log(i)
  //   console.log(j)
  //   console.log(k)
  //   console.log(l)
  //   if(name =="" || mail==""|| sub =="" || mess==""){
  //     alert("Plz Completely fill the form!!!!");
  //     return false;
  //   }else{
  //     alert("Message sent successfully");
  //   }
  //   }



   function contactClicked() {
    let i = document.getElementById("name");
    let j = document.getElementById("email");
    let k = document.getElementById("subject");
    let l = document.getElementById("message");
    console.log(i)
    console.log(j)
    console.log(k)
    console.log(l)
   } 


   function contactclickeed(){
    let fName = document.forms["myForm2"]["name"].value;
    let mailId = document.forms["myForm2"]["email"].value;
    let subjectData = document.forms["myForm2"]["subject"].value;
    let messageData = document.forms["myForm2"]["message"].value;
    console.log(fName)
    console.log(mailId)
    console.log(subjectData)
    console.log(messageData)
    if(fName =="" || mailId==""|| subjectData =="" || messageData==""){
          alert("Plz Completely fill the form!!!!");
          return false;
        }else{
          alert("Message sent successfully");
        }
        }
   