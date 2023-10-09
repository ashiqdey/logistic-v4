<?php
include("php/view.php");
head([
  "title" => "Track shipments | ATN Worldwide",
  "description" => "Track your shipment to see where if your parcel have reached so far. ATN Worldwide’s system employs cutting edge technology and in-house developed software, aimed at achieving greater Customer Delight.",
  "url" => "/tracking",
]);
?>
</head>

<body>
  <?php menu(); ?>



  <section class="content-section">
    <div class="container">
      <div class="row p-3">
        <div class="div-lg-10 div-xl-9 m-auto ">

          <div class="d-flex m-auto jcc">
            <div class="form-group w-100 mw440">
              <input type="text" placeholder="AWB Number" id="tracking-awb">
            </div>
            <div class="form-group">
              <button type="submit" onclick="onSubmit()"><i class=" lni lni-search-alt"></i> SEARCH</button>
            </div>
          </div>




          <style>
            .jcsb {
              justify-content: space-between;
            }

            .cgray9 {
              color: #999;
            }

            .f08 {
              font-size: 0.8em;
            }

            #details .label {
              text-transform: uppercase;
              font-size: 0.8em;
              color: #999;
            }

            #details table td {
              padding: 10px 10px 10px 0;
            }


            .status-block {
              --color: #1bdeb0;
              --linecolor: #1bdeb0;
            }

            .status-block .deco:before {
              background-color: var(--linecolor);
              content: "";
              height: 100%;
              left: 4px;
              position: absolute;
              top: 24px;
              width: 2px;
            }

            .status-block .deco:after {
              border: 3px solid var(--color);
              background: #fff;
              content: "";
              height: 20px;
              left: -5px;
              position: absolute;
              top: 16px;
              width: 20px;
            }

            .status-block:not([type="done"]):nth-last-child(1) {
              --color: #ccc;
            }



            .status-block:not([type="done"]):nth-last-child(2) {
              --linecolor: #ccc;
            }

            .status-block:not([type="done"]):nth-last-child(2) .deco:before {
              border-right: 3px dashed #ccc;
              background: unset;
            }


            .status-block:last-child .deco:before,
            .status-block:not(:hover) .icons {
              display: none;
            }



            .pr {
              position: relative;
            }

            .status {
              padding: 2px 10px;
              background: #ffd4d4;
              font-size: 0.8em;
              font-weight: 600;
            }

            .status[type="1"] {
              background: #d8d8d8;
            }

            .status[type="2"] {
              background: #c4e3ff;
              color: #0b6ee5;
            }

            .status[type="3"] {
              background: #fffad7;
              color: #e89f0e;
            }

            .status[type="4"] {
              background: #ffebd8;
              color: #e55b0b;
            }

            .status[type="5"] {
              background: #d7ffe6;
              color: #0dce7e;
            }

            .status[type="6"] {
              background: #ffe8f3;
              color: #e50b68;
            }
          </style>


          <div class="text-center py-5" id="no-data" style="display:none">
            <img src="assets/images/empty.svg" class="w-70 mw200 mb-4" />
            <div class="message">Search your consignment with AWB number</div>
          </div>

          <div class="text-center py-5 my-5" id="loading">
            <div class="loader">
              <div class="wrap">
                <svg viewbox="25 25 50 50" class="w100">
                  <circle class="path" stroke-linecap="round" stroke-width="3px" fill="none" r="20" cx="50" cy="50" />
                </svg>
              </div>
            </div>

            <div>Loading...</div>
          </div>

          <div id="details"></div>
          <div class="p-4 statuses mt-3" id="statuses"></div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
  </section>


  <?php
  footer();
  ?>

  <!-- JS FILES -->
  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.min.js"></script>
  <script src="assets/js/scripts.js"></script>
  <script>
    // on load check url query
    // on url change check url query
    $(function() {
      check(true)
    })

    function check(initial = false) {

      const urlParams = new URLSearchParams(window.location.search);
      const awb = urlParams.get('awb');

      if (initial) {
        // No data found for the AWB number.

        if (!awb || awb === "") {
          $("#loading").hide();
          $("#no-data").show();
        }

        $('#tracking-awb').val(awb);
      }


      if (!awb) {
        return;
      }


      $("#loading").show();
      $("#no-data").hide();
      $("#details").html("");
      $("#statuses").html("");

      ajax(`api/tracking?awb=${awb}`, 'GET', null, trackingData)

      // trackingData({
      //   tracking: true
      // });
    }

    function onSubmit() {
      const awb = $('#tracking-awb').val();
      window.history.pushState('tracking', '', `tracking?awb=${awb}`);

      //check new data
      check();
    }


    function trackingData(r) {
      console.log("trackingData", r);
      $("#loading").hide();

      if (r.error) {
        $("#no-data .message").html(r.message);
        $("#no-data").show();
      } else {
        $("#no-data").hide();


        const {
          tracking,
          statuses
        } = r;

        $("#details").html(`<div class="mt-5">
              <h4 class='bold ctheme'>
                <span class="o8">AWB : </span> ${tracking.awb}
              </h4>
              <div>
                <span class="cgray9">Forwarding number :</span> ${tracking.forwarding_no}
              </div>
              <div class="mt-2">
                <span class='label'>STATUS</span> : <span class="status" type="${tracking.status}">${tracking.status_label}</span>
              </div>
            </div>

            <div class='p-1'>
              <div class='mt-3 row'>
                <div class="col col-12 col-md-6 mt-3">
                  <div class='label ttu'>Courier</div>
                  <div>${tracking.courier}</div>
                </div>
                <div class="col col-12  col-md-6 mt-3">
                  <div class='label ttu'>Vendor</div>
                  <div>${tracking.vendor}</div>
                </div>
                <div class="col col-12  col-md-6 mt-3">
                  <div class='label ttu'>Sender</div>
                  <div>${tracking.courier}</div>
                </div>
                <div class="col col-12  col-md-6 mt-3">
                  <div class='label ttu'>Receiver</div>
                  <div>${tracking.vendor}</div>
                </div>

                <div class='mt-2 col col-12 mt-3'>
                  <div class='label ttu'>Destination</div>
                  <div>${tracking.destination}</div>
                </div>
              </div>

              <div class=" mt-3">
                <div class='info-tab py50 px1 br10'>
                  <table class=''>
                    <tbody>
                      <tr>
                        <td class='label'>Content</td>
                        <td>${tracking.content}</td>
                      </tr>
                      <tr>
                        <td class='label'>No. of packets</td>
                        <td>${tracking.pack}</td>
                      </tr>
                      <tr>
                        <td class='label '>Weight</td>
                        <td>${tracking.wt}</td>
                      </tr>
                      <tr>
                        <td class='label'>Dimn. Weight</td>
                        <td>${tracking.dwt}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>`);

        // loop all 
        if (tracking.status < 5) {
          statuses.push({
            "id": "73",
            "type": "3",
            "text": `Expected delivery 
            <div> Need help ? <a href="contact" class="tdu"> Contact us </a></div>`,
            "location": "",
            "ts": 0,
            "last": true
          });
        }

        $("#statuses").html(statuses.map((e) => makeStatus(e, tracking.status)).join(""));
      }
    }

    function makeStatus(e, status) {
      return `<div class="status-block pr pt-3" type="${status < 5 ? status: "done"}">
                <div class='deco'></div>
                <div class='text pb-5 pl-4'>
                  <div class="pr pt10p">
                    <div>${e.text}</div>
                    <div class='cgray9 f08'>${getDateTime(e.ts)}</div>
                  </div>
                </div>
              </div>`
    }

    const months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function getDateTime(d) {
      if (!d || d === "") {
        return "";
      }

      d = new Date(d);
      return `${d.getDate()} ${months[d.getMonth()]} &bull; ${d.getHours()}:${addZero(d.getMinutes())}`;
    }

    function addZero(n) {
      return (n < 10 ? `0${n}` : n);
    }
  </script>
</body>

</html>