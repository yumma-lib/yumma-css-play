export const initialCode: string = `<div class="d-f fd-c ai-c jc-c min-h-vh px-6 py-20 bg-white">
  <div class="d-f fd-c ai-c g-5 max-w-lg ta-c">
    <div class="d-f fd-c g-3">
      <h1 class="c-gray-12 fs-5xl fw-100 ff-s lh-2">
        Edit this page!
      </h1>
      <p class="max-w-sm c-gray fs-md lh-5">
        You could also follow the design tokens and patterns in our documentation.
      </p>
    </div>
  </div>
</div>`;

/**
 * Default snippet for the `/embed` route.
 *
 * Deliberately different from `initialCode`: an embed is usually somebody's
 * first contact with the syntax, so this one is built to be read against the
 * CSS it compiles to. Every class here is a property most people already know
 * - `jc-sb` is `justify-content: space-between`, `br-md` is `border-radius` -
 * which is the whole claim, demonstrated rather than asserted.
 */
export const embedCode: string = `<div class="d-f fd-c g-4 p-8 bg-white">
  <div class="d-f ai-c jc-sb">
    <h1 class="c-gray-12 fs-xl fw-600">Yumma CSS</h1>
    <span class="px-3 py-1 br-md bg-mint-2 c-mint-12 fs-sm fw-500">
      Live
    </span>
  </div>

  <p class="c-gray-10 fs-md lh-5">
    Edit this markup. Every class is one CSS property.
  </p>

  <div class="d-g g-4 gtc-2">
    <div class="p-4 br-md bw-1 bc-gray-3">
      <p class="c-gray-12 fs-sm fw-600">d-g gtc-2</p>
      <p class="c-gray-10 fs-sm">grid-template-columns</p>
    </div>
    <div class="p-4 br-md bw-1 bc-gray-3">
      <p class="c-gray-12 fs-sm fw-600">jc-sb</p>
      <p class="c-gray-10 fs-sm">justify-content</p>
    </div>
  </div>
</div>`;
