export const initialCode: string = `<!--
  Yumma CSS Playground
  A zero-config environment to experiment with Yumma CSS utilities.
  Write classes, preview instantly, and explore the framework.

  This playground is being powered by @yummacss/runtime.
-->

<div class="p-r o-auto h-vh bg-white">

  <div class="d-g p-a i-0 zi-0 gtc-16 gtr-12 o-20">
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
    <div class="bc-silver-4 bbw-1 brw-1"></div><div class="bc-silver-4 bbw-1 brw-1"></div>
  </div>

  <span class="p-a t-4 l-4 c-indigo fs-lg us-none">+</span>
  <span class="p-a t-4 r-4 c-gray-3 fs-xs ff-m tt-u us-none">Yumma CSS</span>
  <span class="p-a t-20 l-16 c-gray-3 fs-md us-none">+</span>
  <span class="p-a t-12 r-20 c-indigo fs-sm us-none">✦</span>
  <span class="p-a b-20 l-12 c-indigo fs-xs us-none">◆</span>

  <div class="d-f p-a b-4 l-4 ai-c g-2 us-none">
    <span class="c-gray-3 fs-xs ff-m">200 x</span>
  </div>

  <div class="d-f p-r zi-1 fd-c max-w-xl mx-auto px-6 pt-12 pb-12 h-full">

    <header class="mb-6 ta-l">
      <h1 class="mb-2 c-gray-12 ff-c fw-100 fs-5xl lh-2">
        Write utilities,<br>preview instantly
      </h1>
      <p class="max-w-sm c-gray fs-sm lh-5">
        Style your interfaces with intuitive class names.
        Real-time preview. Intelligent completions.
      </p>
    </header>

    <div class="d-f ai-c g-2 mb-3 us-none">
      <span class="c-indigo fs-lg fw-500">|</span>
      <span class="c-indigo fs-xs ff-m">01</span>
      <span class="c-gray-3 fs-xs ff-m">/</span>
      <span class="c-gray-3 fs-xs ff-m">04</span>
      <span class="ml-4 c-gray-3 fs-xs ff-m tt-u">Main Features</span>
    </div>

    <div class="d-g gtc-1 f-1 md:gtc-2">

      <section class="d-f fd-c p-4 bg-white bc-silver-4 btw-1 blw-1 brw-1">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-package"></i>
          <span class="fs-xs">Contextual</span>
        </div>
        <h3 class="c-gray-12 fs-md fw-600">Completions</h3>
        <p class="mt-1 mb-3 c-gray fs-sm">Smart suggestions as you type.</p>
        <div class="f-1 p-2 bg-gray-1/50 bc-gray-1 bw-1">
          <div class="d-f fd-c g-1 fs-xs ff-m">
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-f</span><span class="c-gray-6">display: flex;</span></div>
            <div class="d-f jc-sb px-1 bg-silver/40"><span class="c-black fw-500">d-g</span><span class="c-black">display: grid;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-b</span><span class="c-gray-6">display: block;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-none</span><span class="c-gray-6">display: none;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-i</span><span class="c-gray-6">display: inline;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-if</span><span class="c-gray-6">display: inline-flex;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-ib</span><span class="c-gray-6">display: inline-block;</span></div>
            <div class="d-f jc-sb px-1 h:bg-silver/25"><span class="c-gray-6">d-t</span><span class="c-gray-6">display: table;</span></div>
          </div>
        </div>
      </section>

      <section class="d-f fd-c p-4 bg-white bc-silver-4 btw-1 brw-1">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-swatches"></i>
          <span class="fs-xs">Expressive</span>
        </div>
        <h3 class="c-gray-12 fs-md fw-600">Color System</h3>
        <p class="mt-1 mb-3 c-gray fs-sm">21 colors with 12 shades each.</p>
        <div class="d-f g-2 jc-c ai-c f-1">
          <div class="w-8 h-48 bg-red-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-orange-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-yellow-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-lime-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-mint-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-green-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-cyan-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-sky-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-blue-6 bc-white br-pill bw-4 bs-o-md"></div>
          <div class="w-8 h-48 bg-indigo-6 bc-white br-pill bw-4 bs-o-md"></div>
        </div>
      </section>

      <section class="d-f fd-c p-4 bg-white bc-silver-4 bw-1">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-devices"></i>
          <span class="fs-xs">Adaptive</span>
        </div>
        <h3 class="c-gray-12 fs-md fw-600">Responsive Panels</h3>
        <p class="mt-1 mb-3 c-gray fs-sm">Drag to resize. Press R to reset.</p>
        <div class="d-f f-1 fd-c">
        
          <div class="d-b f-1 fd-c g-1 p-2 bg-gray-1 bc-silver-4 bw-1 md:d-none">
            <div class="h-2 w-full bg-gray-3 o-50"></div>
            <div class="h-2 w-full bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-50"></div>
            <div class="h-2 w-half bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-40"></div>
            <div class="h-2 w-full bg-gray-3 o-30"></div>
            <div class="h-2 w-full bg-gray-3 o-50"></div>
          </div>
          
          <div class="d-none f-1 g-1 md:d-f">
          
            <div class="d-f f-1 fd-c g-1 p-2 bg-gray-1 bc-silver-4 bw-1">
              <div class="h-2 w-full bg-gray-3 o-50"></div>
              <div class="h-2 w-full bg-gray-3 o-30"></div>
              <div class="h-2 w-full bg-gray-3 o-50"></div>
              <div class="h-2 w-half bg-gray-3 o-30"></div>
              <div class="h-2 w-full bg-gray-3 o-40"></div>
            </div>
            
            <div class="w-1 bg-indigo"></div>
            
            <div class="d-f f-1 fd-c g-2 p-2 bc-silver-4 bw-1">
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

      <section class="d-f fd-c p-4 bg-white bc-silver-4 btw-1 brw-1 bbw-1">
        <div class="d-f ai-c g-2 mb-2 c-gray-4 us-none">
          <i class="ph ph-brain"></i>
          <span class="fs-xs">Intelligent</span>
        </div>
        <h3 class="c-gray-12 fs-md fw-600">Smart Linting</h3>
        <p class="mt-1 mb-3 c-gray fs-sm">Catch class conflicts as you type.</p>
        <div class="o-h f-1 bg-white bc-silver-4 bw-1">
          <div class="d-f ai-c jc-sb px-3 py-2 bc-silver-4 bbw-1">
            <div class="d-f g-2">
              <div class="w-3 h-3 bc-silver-4 br-half bw-1"></div>
              <div class="w-3 h-3 bc-silver-4 br-half bw-1"></div>
              <div class="w-3 h-3 bc-silver-4 br-half bw-1"></div>
            </div>
            <span class="c-gray-3 fs-xs ff-m us-none">[ .TSX ]</span>
          </div>
          <div class="d-f p-3 fs-xs ff-m lh-5">
            <div class="pr-3 c-gray-3 ta-r us-none">
              <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div>
            </div>
            <div>
              <div class="c-gray-6">&lt;div className="</div> <div class="pl-4"><span class="c-yellow-5 td-u tds-w">d-f d-g</span>
              <span class="c-gray-8">gtc-4</span></div>
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
