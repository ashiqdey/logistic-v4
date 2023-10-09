<?php
include("php/view.php");
include("php/data.php");

head([
  "title" => "About ATN Worldwide",
  "description" => "Our motto has always been to offer “Customized Service & Value for Money Service” to our clients and our services are complimented by competitive offers",
  "url" => "/about",
]);
?>
</head>

<body>
  <?php menu(); ?>



  <header class="page-header" data-background="assets/images/slide01.webp">
    <div class="container">
      <h1>About Us</h1>
      <p>Take the complexity out of customs Freight Solutions<br>
        with customs brokerage services</p>
    </div>
  </header>

  <section class="content-section">
    <div class="section-title">
      <figure><img src="assets/ico/android-chrome-192x192.png" alt="Image"></figure>
      <h2>Everyone within our business <br>
        understands our mission</h2>
      <p>It means we don’t just come to work to do a job, we come to work to make a difference.</p>
    </div>

    <div class="image-quote" data-background="assets/images/quote-image.webp">
      <div class="quote-box">
        <blockquote>“ To make the process of buying and
          managing shipping and logistics
          services simple, efficient, stress free
          and cost effective.”</blockquote>
        <p>We do this by providing a friendly, efficient
          and personalised service combined with
          innovative IT solutions that enable our
          customers to always be in control of their
          supply chains.</p>
      </div>
    </div>
  </section>


  <section class="content-section no-spacing">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="section-title text-left">
            <h6>Our Values</h6>
            <h2>Giving customers <br>
              a unique experience <br>
              of partnership. </h2>
          </div>
          <!-- end section-title -->
        </div>
        <!-- end col-6 -->
        <div class="col-lg-5 offset-lg-1">
          <div class="accordion" id="accordion" role="tablist">
            <div class="card">
              <div class="card-header" role="tab" id="headingOne"> 
                <a data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Provide a service we are proud of</a> </div>
              <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">With 26+ years of experience in shipping, we aim to achieve sustained
                  growth that provides enhanced value to customers
                  and industry partners and opportunities</div>
              </div>
            </div>
            <!-- end card -->
            
            <!-- end card -->
            <div class="card">
              <div class="card-header" role="tab" id="headingThree"> <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Make long-term business
                  decisions</a> </div>
              <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                <div class="card-body">We are committed to the long-term, profitable
                  future of our business that could sustained
                  growth and provides enhanced value to our customers
                  and shipping partners.</div>
              </div>
            </div>

            <!-- end card -->
            <div class="card">
              <div class="card-header" role="tab" id="headingFour"> <a class="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour"> Always seek to improve</a>
              </div>
              <div id="collapseFour" class="collapse" role="tabpanel" aria-labelledby="headingFour" data-parent="#accordion">
                <div class="card-body">We are open for feedback to improve our services, Since Rome was not build in a day, hence we grow day by day.</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- end content-section -->




  <section class="content-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="6" data-status="yes">0</span>
            <h6>Domestic partners</h6>
          </div>
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="3" data-status="yes">0</span>
            <h6>International partners</h6>
          </div>
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="12" data-status="yes">0</span>
            <span class="symbol"></span>
            <h6>Logistics
              Professionals</h6>
          </div>
          <!-- end counter-box -->
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="2000" data-status="yes">0</span>
            <span class="symbol">+</span>
            <h6>Parcels shipped</h6>
          </div>
          <!-- end counter-box -->
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3 col-md-6">
          <div class="counter-box">
            <span class="odometer" data-count="6000" data-status="yes">0</span>
            <span class="symbol">+</span>
            <h6>Pincodes served in India</h6>
          </div>
          <!-- end counter-box -->
        </div>
        <!-- end col-3 -->
        <div class="col-lg-3 col-md-6">
          <div class="counter-box"> <span class="odometer" data-count="400" data-status="yes">0</span><span class="symbol"></span>
            <h6>sq.ft of
              warehousing</h6>
          </div>
          <!-- end counter-box -->
        </div>
        <!-- end col-3 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->



  <!-- end content-section -->
  <!--section class="content-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="section-title">
            <figure><img src="assets/ico/android-chrome-192x192.png" alt="Image"></figure>
            <h2>Meet our team of experts</h2>
            <p>Advice and best practice from our own team</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="team-member">
            <div class="inner">
              <figure> <img src="assets/images/team-member02.webp" alt="Image"> </figure>
              <h6>MEMEBER 1</h6>
              <small>Chief Operations Officer</small>
              <p>At vero eos et accusamus et
                iusto odio dignissimos ducimus
                qui blanditiis praesentium</p>
            </div>
          </div>
        </div>


        <div class="col-lg-4 col-md-6">
          <div class="team-member">
            <div class="inner">
              <figure> <img src="assets/images/team-member02.webp" alt="Image"> </figure>
              <h6>Jagadeesh</h6>
              <small>Founder</small>
              <p>My vision is always to contribuite something towards the betterment of humanity so that the earth would be a better place to live in.</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="team-member">
            <div class="inner">
              <figure> <img src="assets/images/team-member02.webp" alt="Image"> </figure>
              <h6>MEMEBER 1</h6>
              <small>Financial Manager</small>
              <p>At vero eos et accusamus et
                iusto odio dignissimos ducimus
                qui blanditiis praesentium</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section-->


  <!-- end content-section -->
  <section class="content-section image-bar" data-background="assets/images/slide03.webp"> </section>
  <!-- end content-section -->
  <section class="content-section no-spacing">
    <div class="container">
      <div class="row">

      <?php
        for($i=0;$i<2; $i++){
          echo "<div class='col-md-6'>
            <div class='testimonial ".($i==0 ? 'bg-accent text-white' : 'bg-primaryl')."'>
              <p>".$testimonials[$i]['text']."</p>
              <h6>".$testimonials[$i]['name']."</h6>
              <small>".$testimonials[$i]['job']."</small>
            </div>
          </div>";
        }
        ?>

        <!-- <div class="col-md-6">
          <div class="testimonial bg-primaryl">
            <p>As a first time importer from the Far
              East, the process can be quite daunting.
              John Good has provided exceptional
              service and support right through
              the process.</p>
            <h6>Steve Macholnad </h6>
            <small>Manager Smart Move LTD</small>
          </div>
        </div> -->
        <!-- end col-6 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->
  <section class="content-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <figure><img src="assets/ico/android-chrome-192x192.png" alt="Image"></figure>
            <h2>Our partners</h2>
            <p>We are committed to delivering professional services of the highest standard</p>
          </div>
          <!-- end section-title -->
        </div>
        <!-- end col-12 -->
        <?php
          foreach($partners  as $p){
            echo "<div class='col-lg-4 col-xl-2 col-6'>
              <figure class='logo-item'> <img src='assets/images/partners/".$p."' alt='Image'> </figure>
            </div>";
          }
        ?>
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->
  <section class="content-section ">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="gallery-item"> <a href="assets/images/solution-image03.webp" data-fancybox>
              <img src="assets/images/solution-image03.webp" alt="Image"></a> </div>
          <!-- end gallery-item -->
        </div>
        <!-- col-6 -->
        <div class="col-md-6">
          <div class="row inner">
            <div class="col-md-6">
              <div class="gallery-item"> <a href="assets/images/solution-image05.webp" data-fancybox><img src="assets/images/solution-image05.webp" alt="Image"></a> </div>
              <!-- end gallery-item -->
            </div>
            <!-- col-6 -->
            <div class="col-md-6">
              <div class="gallery-item"> <a href="assets/images/same-day-1.webp" data-fancybox><img src="assets/images/same-day-1.webp" alt="Image"></a> </div>
              <!-- end gallery-item -->
            </div>
            <!-- col-6 -->
            <div class="col-md-6">
              <div class="gallery-item"> <a href="assets/images/freight-1.jpg" data-fancybox><img src="assets/images/freight-1.jpg" alt="Image"></a> </div>
              <!-- end gallery-item -->
            </div>
            <!-- col-6 -->
            <div class="col-md-6">
              <div class="gallery-item"> <a href="assets/images/gallery-item05.webp" data-fancybox><img src="assets/images/gallery-item05.webp" alt="Image"></a> </div>
              <!-- end gallery-item -->
            </div>
            <!-- col-6 -->
          </div>
          <!-- end row inner -->
        </div>
        <!-- col-6 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </section>
  <!-- end content-section -->

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