<?php
include("php/view.php");
head([
  "title" => "Contact | ATN Worldwide",
  "description" => "Have any query or facing any issue while shipping your parcel. feel free to contact us.",
  "url" => "/contact",
]);
?>
</head>

<body>
  <?php menu(); ?>


  <header class="page-header" data-background="assets/images/slide01.webp">
    <div class="container">
      <h1>Contact</h1>
      <p>Take the complexity out of customs Freight Solutions<br> with customs brokerage services</p>
    </div>
    <!-- end container -->
  </header>
  <!-- end page-header -->
  <section class="content-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="section-title">
            <figure><img src="assets/ico/android-chrome-192x192.png" alt="Image"></figure>
            <h2>We’d love to hear from you</h2>
            <p>Please send your enquiry to <u>atnwx.in</u>, or reach us using the details below.</p>
          </div>
          <!-- end section-title -->
        </div>
      
        <!-- end col-5 -->
        <div class="col-md-8 col-xl-6">
          <div class="contact-box">
            <h5>Branch Office</h5>

            <div class="row mt-5 mb-5">
              <div class="col-md-6" style="border-right:1px dashed #ddd">
                <address class="mb-0">
                #42, 1st Main Road, <br>
                Near Mission Road, S.R. Nagar,<br>
                Bangalore - 560 027<br><br>
              </address>
              </div>  
              <div class="col-md-6">
                <div class="mb-2">
                  <i class="lni lni-phone-set"></i> 080 - 4132 3634
                </div>
                 <div class="mb-2">
                 <i class="lni lni-phone"></i> +91 988 0203 123
                </div>
                 <div>
                 <i class="lni lni-envelope"></i> <a href="mailto:info@atnwx.in">info@atnwx.in</a>
                </div>
              </div>  
            </div>  
            
            
            <a href="https://goo.gl/maps/iEHX4WcCyoPcFtkb6" class="custom-button bg-accent" target="_blank" >FIND US ON MAP</a> 
            &nbsp;&nbsp; 
            <a href="https://maps.google.com/maps/dir//ATN+WORLDWIDE+XPRESS+%2342+1st+Main+Road+12th+A+Cross+Rd,+S+R+Nagar+Bengaluru,+Karnataka+560027/@12.987932,77.5382514,14z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bae3dbfef831497:0x85540ff309fc1d8b"  class="custom-button" target="_blank">GET DIRECTION</a>
        
          </div>
          <!-- end contact-box -->
        </div>
        <!-- end col-5 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->
  <section class="content-section no-bottom-spacing" data-background="#f9f7ef">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title text-left">
            <h2>Have Any Question?</h2>
            <h6>If you would like to know more about our services, <br>
              please contact us using this form
            </h6>
          </div>
          <!-- end section-title -->
        </div>
        <!-- end col-12 -->

        <div class="col-12">
          <div class="contact-form">
            <form id="form-contact" class="row inner xblform m-auto" action="api/contact" method="POST" processing="0">
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
              <!-- end form-group -->
              <div class="form-group col-12 text-right d-flex jcfe">
                <div class="actionBtn">
                  <input type="submit" value="SEND MESSAGE" class="bg-primary">
                </div>
                <div class="loader"></div>
              </div>
              <!-- end form-group -->
            </form>
            <!-- end row inner -->
          </div>
          <!-- end contact-form -->
        </div>
        <!-- end col-12 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->
  <div style="height:200px;"></div>
  <div class="google-maps">
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31101.98641028748!2d77.53825800000001!3d12.987944000000002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x85540ff309fc1d8b!2sATN%20WORLDWIDE%20XPRESS!5e0!3m2!1sen!2sin!4v1660498560854!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>


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