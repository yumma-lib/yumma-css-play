export const initialCode: string = `<!--
  Yumma CSS Playground
  A zero-config environment to experiment with Yumma CSS utilities.
  Write classes, preview instantly, and explore the framework.

  This playground is being powered by @yummacss/runtime.
-->

<div class="bg-white h-vh ff-s p-r o-auto">

  <div class="p-a i-0 zi-0 o-20 d-g gtc-16 gtr-12">
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
    <div class="bbw-1 brw-1 bc-silver-4"></div><div class="bbw-1 brw-1 bc-silver-4"></div>
  </div>

  <span class="p-a t-4 l-4 c-indigo fs-lg us-none">+</span>
  <span class="p-a t-4 r-4 c-gray-3 fs-xs ff-m us-none tt-u">Yumma CSS</span>
  <span class="p-a t-20 l-16 c-gray-3 fs-md us-none">+</span>
  <span class="p-a t-12 r-20 c-indigo fs-sm us-none">✦</span>
  <span class="p-a b-20 l-12 c-indigo fs-xs us-none">◆</span>

  <div class="p-a b-4 l-4 d-f ai-c g-2 us-none">
    <span class="c-gray-3 fs-xs ff-m">200 x</span>
  </div>

  <div class="p-r zi-1 max-w-xl mx-auto px-6 pt-12 pb-12 h-full d-f fd-c">

    <header class="ta-l mb-6">
      <h1 class="ff-c fw-100 fs-5xl c-gray-12 lh-2 mb-2">
        Write utilities,<br>preview instantly
      </h1>
      <p class="fs-sm c-gray lh-5 max-w-sm">
        Style your interfaces with intuitive class names.
        Real-time preview. Intelligent completions.
      </p>
    </header>

    <div class="d-f ai-c g-2 mb-3 us-none">
      <span class="c-indigo fs-lg fw-500">|</span>
      <span class="c-indigo fs-xs ff-m">01</span>
      <span class="c-gray-3 fs-xs ff-m">/</span>
      <span class="c-gray-3 fs-xs ff-m">04</span>
      <span class="c-gray-3 fs-xs ff-m ml-4 tt-u">Main Features</span>
    </div>

    <div class="d-g gtc-1 md:gtc-2 f-1">

      <section class="btw-1 blw-1 brw-1 bc-silver-4 bg-white p-4 d-f fd-c">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-package"></i>
          <span class="fs-xs">Contextual</span>
        </div>
        <h3 class="fs-md fw-600 c-gray-12">Completions</h3>
        <p class="fs-sm c-gray mt-1 mb-3">Smart suggestions as you type.</p>
        <div class="bw-1 bc-gray-1 p-2 bg-gray-1/50 f-1">
          <div class="d-f fd-c g-1 fs-xs ff-m">
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-f</span><span class="c-gray-6">display: flex;</span></div>
            <div class="d-f jc-sb bg-silver/40 px-1"><span class="c-black fw-500">d-g</span><span class="c-black">display: grid;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-b</span><span class="c-gray-6">display: block;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-none</span><span class="c-gray-6">display: none;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-i</span><span class="c-gray-6">display: inline;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-if</span><span class="c-gray-6">display: inline-flex;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-ib</span><span class="c-gray-6">display: inline-block;</span></div>
            <div class="d-f jc-sb h:bg-silver/25"><span class="c-gray-6">d-t</span><span class="c-gray-6">display: table;</span></div>
          </div>
        </div>
      </section>

      <section class="btw-1 brw-1 bc-silver-4 bg-white p-4 d-f fd-c">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-swatches"></i>
          <span class="fs-xs">Expressive</span>
        </div>
        <h3 class="fs-md fw-600 c-gray-12">Color System</h3>
        <p class="fs-sm c-gray mt-1 mb-3">21 colors with 12 shades each.</p>
        <div class="d-f g-2 jc-c ai-c f-1">
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-red-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-orange-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-yellow-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-lime-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-mint-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-green-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-cyan-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-sky-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-blue-6 bsh-md"></div>
          <div class="w-8 h-48 br-pill bw-4 bc-white bg-indigo-6 bsh-md"></div>
        </div>
      </section>

      <section class="bw-1 bc-silver-4 bg-white p-4 d-f fd-c">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-devices"></i>
          <span class="fs-xs">Adaptive</span>
        </div>
        <h3 class="fs-md fw-600 c-gray-12">Responsive Panels</h3>
        <p class="fs-sm c-gray mt-1 mb-3">Drag to resize. Press R to reset.</p>
        <div class="f-1 d-f fd-c">
        
          <div class="d-b md:d-none f-1 bw-1 bc-silver-4 bg-gray-1 p-2 fd-c g-1">
            <div class="h-2 w-full bg-gray-3 o-50"></div>
            <div class="h-2 w-full bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-50"></div>
            <div class="h-2 w-half bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-40"></div>
            <div class="h-2 w-full bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-50"></div>
          </div>
          
          <div class="d-none md:d-f f-1 g-1">
          
            <div class="f-1 bw-1 bc-silver-4 bg-gray-1 p-2 d-f fd-c g-1">
              <div class="h-2 w-full bg-gray-3 o-50"></div>
              <div class="h-2 w-full bg-gray-3 o-30"></div>
              <div class="h-2 w-full bg-gray-3 o-50"></div>
              <div class="h-2 w-half bg-gray-3 o-30"></div>
              <div class="h-2 w-full bg-gray-3 o-40"></div>
            </div>
            
            <div class="w-1 bg-indigo"></div>
            
            <div class="f-1 bw-1 bc-silver-4 p-2 d-f fd-c g-2">
              <div class="h-3 w-half bg-gray-2"></div>
              <div class="d-f g-1">
                <div class="h-6 w-8 bg-gray-1"></div>
                <div class="d-f fd-c g-1 f-1">
                  <div class="h-2 w-full bg-gray-2"></div>
                  <div class="h-2 w-full bg-gray-1"></div>
                </div>
              </div>
              <div class="d-f g-2">
                <div class="h-3 w-10 bg-gray-2"></div>
                <div class="h-3 w-10 bg-gray-1"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="btw-1 brw-1 bbw-1 bc-silver-4 bg-white p-4 d-f fd-c">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-brain"></i>
          <span class="fs-xs">Intelligent</span>
        </div>
        <h3 class="fs-md fw-600 c-gray-12">Smart Linting</h3>
        <p class="fs-sm c-gray mt-1 mb-3">Catch class conflicts as you type.</p>
        <div class="bw-1 bc-silver-4 bg-white o-h f-1">
          <div class="d-f ai-c jc-sb px-3 py-2 bbw-1 bc-silver-4">
            <div class="d-f g-2">
              <div class="d-3 br-half bw-1 bc-silver-4"></div>
              <div class="d-3 br-half bw-1 bc-silver-4"></div>
              <div class="d-3 br-half bw-1 bc-silver-4"></div>
            </div>
            <span class="fs-xs c-gray-3 ff-m us-none">[ .TSX ]</span>
          </div>
          <div class="d-f fs-xs ff-m lh-5 p-3">
            <div class="c-gray-3 ta-r pr-3 us-none">
              <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
            </div>
            <div>
              <div class="c-gray-6">&lt;div className="</div>
              <div class="pl-4"><span class="c-yellow-5 td-u tds-w">d-f d-g</span> <span class="c-gray-8">gtc-4</span></div>
              <div class="pl-4 c-gray-8">sm:gtc-2 ai-c jc-sb</div>
              <div class="pl-4 c-gray-8">p-4 bg-indigo-12</div>
              <div class="c-gray-6">"&gt;</div>
              <div class="c-gray-6">&lt;/div&gt;</div>
            </div>
          </div>
        </div>
      </section>

    </div>

  </div>
</div>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css">`;
