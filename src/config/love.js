/**
 * ❤️  PERSONALIZE EVERYTHING HERE  ❤️
 * ------------------------------------------------------------
 * This is the only file you need to edit to make the website yours.
 * Every field is optional. If something is left empty, the site hides it
 * gracefully (nothing made-up is ever shown to her).
 *
 * While you run `npm run dev`, any empty field shows a small dashed
 * "placeholder" hint so you can see where your words will go.
 * Those hints are never shown in the production build.
 */

export const love = {
  /** Her name, or a pet name. Used in greetings and the final message. */
  herName: '',

  /** What to call her when no name is given above. */
  fallbackName: 'my love',

  /** Your name, used to sign the letter. */
  yourName: '',

  /**
   * The date you are giving her this apology.
   * Use any text you like, e.g. 'October 15, 2026'. Leave empty to hide.
   */
  apologyDate: '',

  /**
   * Your favorite memories together. Add as many as you like.
   * Please only write real memories — nothing is invented for you.
   *
   * Example:
   * { title: 'Our first walk by the lake', text: 'You laughed at my terrible joke…', date: 'June 2024' }
   */
  memories: [],

  /**
   * Optional photographs. Put the image files in `public/photos/`
   * and reference them like this:
   *
   * { src: '/photos/us-at-the-beach.jpg', caption: 'The day you…', alt: 'The two of us at the beach' }
   */
  photos: [],

  /**
   * A personal message in your own words. This appears as a handwritten
   * note near the end. Use \n\n to start a new paragraph.
   */
  personalMessage: '',

  /**
   * The secret note revealed when she taps the small hidden heart.
   * Keep it gentle — a small, private thought just for her.
   */
  hiddenMessage:
    'Even on the days when I get things wrong, you are still the person I am most grateful for. Thank you for being you.',

  /**
   * Music. By default the site plays a soft, gentle piano melody generated
   * right in the browser (no download needed, and it never autoplays).
   *
   * To use your own song instead, put an .mp3 file in `public/music/`
   * and set the path here, e.g. '/music/our-song.mp3'.
   */
  musicSrc: '',
}

/** The name to use when speaking to her. */
export const herDisplayName = love.herName.trim() || love.fallbackName
