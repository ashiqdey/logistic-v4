<?php
include("php/data.php");
include("php/view.php");

head([
  "title" => "ATN Worldwide | Logicstic Shipping Company",
  "description" => "ATN Worldwide is a provider of comprehensive logistics and transportation solutions. Established in 2014 as an express operator, the company rapidly transformed itself into a global brand recognized for its customized services and innovative multi-product offering",
  "url" => "",
]);
?>
</head>

<body>
  <?php menu(); ?>



  <header class="slider">
    <div class="main-slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="slide-image" data-background="assets/images/slide01.webp"></div>
          <!-- end slide-image -->
          <div class="container">
            <h1>Transport & <br>
              Logistics</h1>
            <p>Take the complexity out of customs Freight Solutions <br>
              with customs brokerage services</p>
            <a href="services">SERVICES</a>
          </div>
          <!-- end container -->
        </div>
        <!-- end swiper-slide -->
        <div class="swiper-slide">
          <div class="slide-image" data-background="assets/images/slide02.webp"></div>
          <!-- end slide-image -->
          <div class="container">
            <h1>Quickest & Safe <br>
              Delivery</h1>
            <p>Take the complexity out of customs Freight Solutions <br>
              with customs brokerage services</p>
            <a href="about">ABOUT US</a>
          </div>
          <!-- end container -->
        </div>
        <!-- end swiper-slide -->
        <div class="swiper-slide">
          <div class="slide-image" data-background="assets/images/slide03.webp"></div>
          <!-- end slide-image -->
          <div class="container">
            <h1>Allways <br>
              Trustable</h1>
            <p>Take the complexity out of customs Freight Solutions <br>
              with customs brokerage services</p>
            <a href="contact">CONTACT US</a>
          </div>
          <!-- end container -->
        </div>
        <!-- end swiper-slide -->
      </div>
      <!-- end swiper-wrapper -->
      <div class="controls">
        <div class="button-prev"><i class="lni lni-chevron-left"></i>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 30 30" xml:space="preserve">
            <circle fill="none" stroke="#fff" stroke-width="1" cx="15" cy="15" r="15"></circle>
          </svg>
        </div>
        <!-- end button-prev -->
        <div class="swiper-pagination"></div>
        <!-- end swiper-pagination -->
        <div class="button-next"><i class="lni lni-chevron-right"></i>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="60" viewBox="0 0 30 30" xml:space="preserve">
            <circle fill="none" stroke="#fff" stroke-width="1" cx="15" cy="15" r="15"></circle>
          </svg>
        </div>
        <!-- end button-next -->
      </div>
      <!-- end controls -->
    </div>
    <!-- end main-slider -->
  </header>
  <!-- end slider -->
  <div class="section-note">
    <div class="container">
    </div>
  </div>
  <!-- end section-note -->
  <section class="content-section no-top-spacing">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <figure class="video-thumb">
            <img src="assets/images/video-thumb.webp" alt="Image">
          </figure>
        </div>
        <!-- end col-5 -->
        <div class="col-lg-7">
          <div class="track-shipping-form">
            <div class="inner">
              <h3 class="mb-0">Where is my shipment?</h3>
              <p>Search and track your shipment with the provided AWB number</p>

              <form method="get" action="tracking">
                <div class="form-group">
                  <input type="text" placeholder="AWB Number">
                </div>
                <div class="form-group ">
                  <button type="submit"><i class="lni lni-search-alt"></i> SEARCH</button>
                </div>
              </form>

              <p class="mt-4">
                <i class"lni-support lni"></i> Nees any help? <a href="/contact" class="tdu">Write to us</a>
              </p>
            </div>
          </div>
        </div>
        <!-- end col-7 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->



  <section class="content-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="side-content">
            <h2>Worldwide Logistics,
              Air Freight Forwarding,
              Road Haulage.</h2>
              <p>
              ATN Worldwide Xpress is a professionally managed company based out of Bangalore, India which provides courier services that is quick, easy and cost-effective. While ATN has branches spread across all major cities and towns throughout India, its global reach is strengthened by partnering with leading International Courier and Logistics companies like Fedex, DHL, OCS, UPS and TNT enabling ATN to provide services to any part of the globe.
              </p>
              <p>
              ATN Worldwide Xpress serves reputed companies in fulfilling their courier and parcel delivery requirements offering them a reliable, fast and cost-effective service.
              </p>
            <a href="about" class="custom-button">Know more</a>
          </div>
          <!-- end side-content -->
        </div>
        <!-- end col-7 -->
        <div class="col-lg-5">
          <figure class="side-image"> <img src="assets/images/side-image01.webp" alt="Image"> </figure>
          <!-- end side-image -->
        </div>
        <!-- end col-5 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->






  <section class="content-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6">
          <div class="icon-box">
            <div class="inner">
              <figure><img src="assets/images/ic-delivery.svg" alt="Image"></figure>
              <h6>Pick-Up and Delivery</h6>
              <p>Dedicated and Time Critical services, we collect your document or parcel from your booking and deliver directly to any location with guaranteed, safe, quick, prompt and professionals. </p>
            </div>
            <!-- end inner -->
          </div>
          <!-- end icon-box -->
        </div>
        <!-- end col-4 -->
        <div class="col-lg-4 col-md-6">
          <div class="icon-box">
            <div class="inner">
              <figure><img src="assets/images/ic-tracking.svg" alt="Image"></figure>
              <h6>Online Tracking</h6>
              <p>With our cuttig edge online tracking facility in place we help you stay up to date and worryfree regarding shipment status from the time of pick-up till your shipment has been successfully delivered.</p>
            </div>
            <!-- end inner -->
          </div>
          <!-- end icon-box -->
        </div>
        <!-- end col-4 -->
        <div class="col-lg-4 col-md-6">
          <div class="icon-box">
            <div class="inner">
              <figure><img src="assets/images/ic-pricing.svg" alt="Image"></figure>
              <h6>Competitive Pricing</h6>
              <p>We offers flexible and economical pricing plans for our services. We offer value for your money, because being trustworthy, sustainable, and cost-effective are the driving force that keep us motivated.</p>
            </div>
            <!-- end inner -->
          </div>
          <!-- end icon-box -->
        </div>
        <!-- end col-4 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->



  <section class="content-section" data-background="#f9f7ef">
    <a name="solutions">&nbsp;</a>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <figure><img src="assets/ico/android-chrome-192x192.png" alt="Image"></figure>
            <h2>Global supply chain solutions</h2>
            <p>Dedicated specialists taking care of your products</p>
          </div>
          <!-- end section-title -->
        </div>
        <!-- end col-12 -->
        <div class="col-lg-3">
          <div class="solution-box">
            <figure><img src="assets/images/same-day-1.webp" alt="Image">
              <figcaption> <small>Solutions</small>
                <h6>Same day delivery</h6>
                <a href="services#same-day-delivery">Discover More</a>
              </figcaption>
            </figure>
          </div>
          <!-- end solution-box -->
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3">
          <div class="solution-box">
            <figure><img src="assets/images/freight-1.webp" alt="Image">
              <figcaption> <small>Services</small>
                <h6>Freight Forwarding</h6>
                <a href="services#freight-forwarding">Discover More</a>
              </figcaption>
            </figure>
          </div>
          <!-- end solution-box -->
        </div>
        <!-- end col-3 -->
        <div class="col-lg-5">
          <div class="solution-box">
            <figure><img src="assets/images/solution-image03.webp" alt="Image">
              <figcaption> <small>Services</small>
                <h6>Document and Parcel Delivery</h6>
                <a href="services#document">Discover More</a>
              </figcaption>
            </figure>
          </div>
          <!-- end solution-box -->
        </div>
        <!-- end col-6 -->
        <div class="col-lg-4 offset-lg-2">
          <div class="solution-box">
            <figure><img src="assets/images/solution-image04.webp" alt="Image">
              <figcaption> <small>Services</small>
                <h6>Sea Freight</h6>
                <a href="services#sea-freight">Discover More</a>
              </figcaption>
            </figure>
          </div>
          <!-- end solution-box -->
        </div>
        <!-- end col-4 -->
        <div class="col-lg-4">
          <div class="solution-box">
            <figure><img src="assets/images/solution-image05.webp" alt="Image">
              <figcaption> <small>Services</small>
                <h6>Air Freight</h6>
                <a href="services#air-freight">Discover More</a>
              </figcaption>
            </figure>
          </div>
          <!-- end solution-box -->
        </div>
        <!-- end col-3 -->

        <!-- end col-2 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->



  <section class="content-section overflow-hidden">
    <div class="container">
      <div class="row align-items-center no-gutters">
        <div class="col-lg-6">
          <div class="side-services">
            <h6>Services</h6>
            <h2>Quality delivered <br>
              as standard </h2>
            <ul>
              <li><a href="services">Forwarding <i class="lni lni-chevron-right"></i></a></li>
              <li><a href="services">Supply Chain <i class="lni lni-chevron-right"></i></a></li>
              <li><a href="services">Outsourcing <i class="lni lni-chevron-right"></i></a></li>
              <li><a href="services">Technology <i class="lni lni-chevron-right"></i></a></li>
            </ul>
            <a href="services" class="custom-link">View All Services</a>
          </div>
          <!-- end side-services -->
        </div>
        <!-- end col-6 -->
        <div class="col-lg-6">
          <figure class="side-image full-right">
            <div class="info-box">
              <figure><img src="assets/images/icon-infobox.webp" alt="Image"></figure>
              <p>Personnel deliver bespoke
                solutions that are designed
                to increase speed to market, <strong>simplify inventory</strong> management,
                streamline product flow and
                drive down costs.</p>
            </div>
            <!-- end info-box -->
            <img src="assets/images/slide02.webp" alt="Image">
          </figure>
        </div>
        <!-- end col-6 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->

  <?php counter(); ?>

  <!-- end content-section -->
  <section class="content-section dark-overlay" data-background="assets/images/slide01.webp">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 m-auto">
          <div class="cta-bar">
            <h3>Domestic and <br>
            International Services
            </h3>
            <p>With years of experience and knowledge along with the support of our carefully selected network of branches and partners across the globe, we are able to offer an exceptional service that is guaranteed safe, fast, reliable, and cost-effective.</p>
            <a class="custom-button" role="button" data-toggle="modal" data-target="#getQuote">Get A Quote</a>
            <a href="#estimate" class="light-button">Estimate cost</a>
          </div>
          <!-- end cta-bar -->
        </div>
        <!-- end col-12 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->
  <section class="content-section no-bottom-spacing bottom-bg-half">
    <a name="estimate">&nbsp;</a>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title text-left">
            <h6>DELIVERY COST ESTIMATION</h6>
            <h2>Get Estimate for<br>
              delivery of your shipments</h2>
          </div>
          <!-- end section-title -->
        </div>
        <!-- end col-12 -->
        <div class="col-12">
            <form 
            id="form-get-estimate" 
            class="calculator xblform" 
            action="api/get-estimate" 
            method="POST" 
            processing="0"
            >

            <div class="row inner">
              <div class="form-group col-md-6"> <span>Phone number</span>
                <input type="tel" name="phone" maxlength="15">
              </div>
              <div class="form-group col-md-6"> <span>Destination</span>
                <input type="text" name="destination" maxlength="100">
              </div>
              <!-- end form-group -->

              <div class="form-group col-lg-3 col-md-6"> <span>Weight</span>
                <input type="text" name="weight" maxlength="10">
              </div>
              <div class="form-group col-lg-3 col-md-6"> <span>Width</span>
                <input type="text" name="width" maxlength="10">
              </div>
              <div class="form-group col-lg-3 col-md-6"> <span>Height</span>
                <input type="text" name="height" maxlength="10">
              </div>
              <!-- end form-group -->
              
              <!-- end form-group -->
              <div class="form-group col-lg-3 col-md-6"> <span>Fragile</span>
                <div class="yes-no" id="yes-no">
                  <input type="radio" name="fragile" id="yes" value="1"  />
                  <input type="radio" name="fragile" id="no" value="0"  checked/>
                  <div class="switch">
                    <label for="yes">Yes</label>
                    <label for="no">No</label>
                    <span></span>
                  </div>
                </div>
                <!-- end yes-no -->
              </div>
              <!-- end form-group -->
              <div class="form-group col-12">
                <label>
                  <input type="checkbox" name="express" value="1" checked>
                  Express Delivery</label>
                <label>
                  <input type="checkbox" name="insurance" value="1">
                  Insurance</label>
                <label>
                  <input type="checkbox" name="packing" value="1">
                  Packaging</label>
              </div>
              <!-- end form-group -->
              <div class="form-group col-12 text-right d-flex jcfe">
                  <div class="actionBtn">
                    <input type="submit" value="Get estimate" class="bg-primary">
                  </div>
                  <div class="loader"></div>
              </div>
            
              </form>
            </div>
          </div>
        </div>
        <!-- end col-12 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->




  <section class="content-section bg-half">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5">
          <div class="testimonials-slider">
            <div class="swiper-wrapper">
              <?php
              foreach($testimonials  as $t){
                echo "<div class='swiper-slide'>
                  <div class='testimonial'>
                    <p>".$t['text']."</p>
                    <h6>".$t['name']."</h6>
                    <small>".$t['job']."</small>
                  </div>
                </div>";
              }
              ?>
              <!-- end swiper-slide -->
            </div>
            <!-- end swiper-wrapper -->
            <div class="swiper-pagination"></div>
            <!-- end swiper-pagination -->
          </div>
          <!-- end testimonials-slider -->
        </div>
        <!-- end col-6 -->
        <div class="col-lg-6 offset-lg-1">
          <div class="section-title">
            <h2>
              <span class="text-primary">World class partners,</span><br>
              <span class="text-secondary">For hassle free shipment</span>
            </h2>
          </div>
          <!-- end section-title -->
          <div class="row inner">
            <?php
              foreach($partners  as $p){
                echo " <div class='col-lg-4 col-6'>
                  <figure class='logo-item'> <img src='assets/images/partners/".$p."' alt='Image'> </figure>
                </div>";
              }
            ?>
          </div>
        </div>
      </div>
    </div>
  </section>


  <?php
  footer();
  ?>


  <!-- JS FILES -->
  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/fancybox.min.js"></script>
  <script src="assets/js/swiper.min.js"></script>
  <script src="assets/js/odometer.min.js"></script>
  <script src="assets/js/imagesloaded.pkgd.min.js"></script>
  <script src="assets/js/isotope.min.js"></script>
  <script src="assets/js/scripts.js"></script>
</body>

</html>