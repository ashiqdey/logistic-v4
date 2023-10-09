<?php


function head($meta = [
  "title" => "",
  "description" => "",
  "url" => "",
])
{
  echo '<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#161659" />
  <title>' . $meta["title"] . '</title>

  <meta property="og:description" content="' . $meta["description"] . '">
  
  <meta property="og:site_name" content="ATN Worldwide">
  <meta property="og:title" content="ATN Worldwide">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://atnwx.in' . $meta["url"] . '">
  <meta property="og:updated_time" content="1653978600" />

  <meta property="og:image" content="https://atnwx.in/assets/images/og-512.png">
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image" content="https://atnwx.in/assets/images/og-256.png">
  <meta property="og:image:width" content="256" />
  <meta property="og:image:height" content="256" />

  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@ATNWorldwide">
  <meta name="twitter:creator" content="@ATNWorldwide">
  <meta name="twitter:title" content="' . $meta["title"] . '">
  <meta name="twitter:description" content="' . $meta["description"] . '">
  <meta name="twitter:image" content="https://atnwx.in/assets/images/og-256.png">

  <meta name="author" content="ATN Worldwide">
  <meta name="description" content="' . $meta["description"] . '">
  <meta name="keywords" content="art logistic, forwarding, logistic, shipping, cargo, delivery, transportation, truck, service, solutions, importing, exporting, trade, product, calculate, cost">



  <link href="assets/ico/android-chrome-512x512.png" rel="apple-touch-icon" sizes="512x512">
  <link href="assets/ico/android-chrome-192x192.png" rel="apple-touch-icon" sizes="114x114">
  <link href="assets/ico/android-chrome-192x192.png" rel="apple-touch-icon" sizes="72x72">
  <link href="assets/ico/android-chrome-192x192.png" rel="apple-touch-icon">

  <link href="assets/ico/favicon.ico" rel="shortcut icon">

  <link rel="stylesheet" href="assets/css/lineicons.css">
  <link rel="stylesheet" href="assets/css/swiper.min.css">
  <link rel="stylesheet" href="assets/css/odometer.min.css">
  <link rel="stylesheet" href="assets/css/fancybox.min.css">
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/style.css">';
}


function footer()
{
  echo '<footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <figure class="logo"> <img src="assets/images/logo.png" alt="Image"> </figure>
           
        <!--h6 class="widget-title">Socials</h6-->
          <div class="d-flex social-icons mt-5">
            <a href="https://www.facebook.com/atnsocial" target="_blank" class="ic40 ic">
              <i class="lni lni-facebook-filled"></i>
            </a>
             <a href="https://api.whatsapp.com/send?phone=+919880203123&text=Hi" target="_blank" class="ic40 ic">
              <i class="lni lni-whatsapp"></i>
            </a>
            <a href="https://goo.gl/maps/iEHX4WcCyoPcFtkb6" target="_blank" class="ic40 ic">
              <i class="lni lni-map-marker"></i>
            </a>

            <!--a href="https://twitter.com/atnsocial" target="_blank" class="ic40 ic">
              <i class="lni lni-twitter-original"></i>
            </a>
            <a href="https://instagram.com/atnsocial" target="_blank" class="ic40 ic">
              <i class="lni lni-instagram-original"></i>
            </a-->
            <a href="https://www.google.com/search?q=atnsocial+bengaluru" target="_blank" class="ic40 ic">
              <i class="lni lni-google"></i>
            </a>
          </div>
        </div>



        <div class="col-lg-4 col-md-6">
          <h6 class="widget-title">Quick Links</h6>
          <ul class="footer-menu">
            <li><a href="about">About us</a></li>
            <li><a href="services">Services</a></li>
            <li><a href="tracking">Track parcel</a></li>
             <!--li><a href="shipment-request">Shipment request</a></li-->
            <li><a href="contact">Contact</a></li>
          </ul>
        </div>


        <div class="col-lg-4">
          <p>
            <i class="lni lni-phone-set"></i> 080 - 4132 3634
          </p>
           <p>
            <i class="lni lni-phone"></i> +91 988 0203 123
          </p>
          <p>
            <i class="lni lni-envelope"></i> <a href="mailto:info@atnwx.in">info@atnwx.in</a>
          </p>
          <p>
            <i class="lni lni-map-marker"></i> #42, 1st Main Road, Near Mission Road,<br>
             S.R. Nagar, Bangalore - 560 027 India
          </p>
        </div>


        
        <div class="col-12">
          <div class="footer-bottom">
            <span>© 2022 ATN Worldwide | A Logicstics Company</span>
            <span>
              <a href="privacy-policy">Privacy policy</a>
              &nbsp; &nbsp;
              <a href="terms-of-services">Terms of services</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  


  <div class="modal fade" id="getQuote" tabindex="-1" role="dialog" aria-labelledby="getQuoteLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-accent text-white">
          <h5 class="modal-title" id="getQuoteLabel">Get a quote</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <i class="lni-close lni text-white"></i>
          </button>
        </div>
        <div class=" modal-body">
          <form id="form-quote" class="row inner xblform" action="api/contact" method="POST" processing="0">
            <div class="form-group col-lg-4">
              <input type="text" placeholder="Name" name="name" maxlength="50">
            </div>
            <div class="form-group col-lg-4 col-md-6">
              <input type="email" placeholder="Email Address" name="email" maxlength="50">
            </div>
            <div class="form-group col-lg-4 col-md-6">
              <input type="tel" placeholder="Phone No" name="phone" maxlength="10">
            </div>
            <div class="form-group col-12">
              <textarea placeholder="Message" class="w-100" name="message" maxlength="400"></textarea>
            </div>
            <div class="form-group col-12 text-right d-flex jcfe">
              <div class="actionBtn">
                <input type="submit" value="SUBMIT" class="bg-primary">
              </div>
              <div class="loader"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  <div id="toast" data-show="0">
      <div class="lc1 mgs"></div>
      <div class="close" role="button">
        <i class="lni-close lni text-white"></i>
      </div>
  </div>';
}


function menu()
{
  echo '<div class="page-transition"></div>
  
  <aside class="side-widget">
    <div class="inner">
      <div class="logo">
        <a href="/">
          <img src="assets/images/logo.png" alt="Image">
        </a>
      </div>

      <div class="show-mobile">
        <div class="site-menu">
          <ul>
            <li><a href="about">About us</a></li>
            <li><a href="services">Services</a></li>
            <li><a href="tracking">Tracking</a></li>
            <li><a href="assets/pdf/atn-express-company-profile.pdf" download>Company profile</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <small>© 2022 ATN Worldwide | Logicstic Shipping Company</small>
    </div>
  </aside>

  <div class="topbar">
    <div class="container">
      <div class="phone">Call Us Now: <a href="tel:+919880203123"> +91 988 020 3123 </a></div>
      <div class="email"> Email: <a href="mailto:info@atnwx.in">info@atnwx.in</a> </div>
      <div class="social-media"> <span></span>
        <ul>
          <li>
            <a href="https://www.facebook.com/atnsocial" target="_blank">
              <i class="lni lni-facebook-filled"></i>
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://api.whatsapp.com/send?phone=+919880203123&text=Hi" target="_blank">
              <i class="lni lni-whatsapp"></i>
              <span>Whatsapp</span>
            </a>
          </li>
          <li>
            <a href="https://www.google.com/search?q=atnsocial+bengaluru" target="_blank">
              <i class="lni lni-google"></i>
              <span>Google</span>
            </a>
          </li>

       


          <!--li>
            <a href="https://twitter.com/atnsocial" target="_blank">
              <i class="lni lni-twitter-original"></i>
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/atnsocial" target="_blank">
              <i class="lni lni-instagram-original"></i>
              <span>Instagram</span>
            </a>
          </li-->
        </ul>
      </div>
    </div>
  </div>

  <nav class="navbar overflow-hidden">
    <div class="container">
      <div class="inner">
        <div class="logo">
         <a href="/"> 
         <img src="assets/images/logo.png" alt="Image">
          </a> 
          </div>

        <div class="site-menu">
          <ul>
            <li><a href="about">About us</a></li>
            <li><a href="services">Services</a></li>
            <!-- <li><a href="tracking">Tracking</a></li> -->
            <li><a href="assets/pdf/atn-express-company-profile.pdf" download>Company profile</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
        </div>
        <div class="show-mobile">
          <div class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-button d-xl-flex ">

          <form method="get" action="tracking" class="tracking position-relative me-3 mr-3">
            <input type="text" name="awb" placeholder="AWB Number">
            <button type="submit" class="bg-transparent text-primary"><i class="lni lni-search-alt"></i></button>
          </form>

          <a role="button" data-toggle="modal" data-target="#getQuote">GET A QUOTE</a>
        </div>
      </div>
    </div>
  </nav>';
}

function counter()
{
  echo '<section class="content-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="6" data-status="yes">0</span>
            <h6>Domestic partners</h6>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="5" data-status="yes">0</span>
            <h6>International partners</h6>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="26" data-status="yes">0</span>
            <span class="symbol">+</span>
            <h6>Years into business</h6>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="8000" data-status="yes">0</span>
            <span class="symbol">+</span>
            <h6>Shipments annually</h6>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="6000" data-status="yes">0</span>
            <span class="symbol">+</span>
            <h6>Pincodes served in India</h6>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="400" data-status="yes">0</span><span class="symbol"></span>
            <h6>sq.ft of
              warehousing</h6>
          </div>
        </div>
      </div>
    </div>
  </section>';
}
