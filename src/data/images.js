/**
 * CENTRAL IMAGE CONFIGURATION
 * ---------------------------------------------------------------
 * Every photograph on the website is defined here, and only here.
 * All photographs are Dianna Coumont's own (public/images).
 *
 *   w, h      intrinsic size of the original file (prevents layout shift)
 *   position  CSS object-position - keeps the subject in frame
 *   zoom      optional extra crop (e.g. 1.08) to hide Instagram badges or
 *             dark edges baked into some photos; `origin` sets the anchor
 *
 * Responsive WebP copies live in public/images/optimized and are created
 * with `npm run images` (originals are never modified). After adding a new
 * photo, run that command and add an entry below.
 */

const BASE = import.meta.env.BASE_URL; // "/" or "/valiente-couture/"

const slugOf = (file) => file.replace(/\.[^.]+$/, "").toLowerCase().replace(/\s+/g, "-");

const img = (file, alt, w, h, opts = {}) => ({
  src: `${BASE}images/${encodeURI(file)}`,
  webp: `${BASE}images/optimized/${slugOf(file)}`,
  alt,
  w,
  h,
  position: "center",
  need: alt,
  ...opts,
});

/* ---- Photograph library ---- */
const photos = {
  owner: img("owner.jpeg", "Dianna Coumont smiling beside a dress form in her atelier", 1170, 656,
    { position: "28% 30%" }),
  ownerFitting: img("owner-square.jpeg", "Dianna Coumont fitting a tailored jacket on a dress form", 1170, 1189,
    { position: "35% top", zoom: 1.05, origin: "50% 0%" }), // hides dark strip at the bottom
  showJacket: img("coat img-1.jpeg", "Custom equestrian show jacket with snaffle-bit buttons on a dress form", 894, 1600,
    { position: "50% 35%" }),
  showJacketDetail: img("coat img-2.jpeg", "Close-up of the show jacket's shaped seams, hand-finished pocket and snaffle-bit buttons", 900, 1600,
    { position: "60% 40%" }),
  showJacketAtelier: img("coat img-3.jpeg", "Tailored show jacket and silk stock on a wooden dress form in the atelier", 922, 1600,
    { position: "35% 45%" }),
  tweedJacket: img("portfolio-img-1.jpeg", "Dianna's hand resting on a Chanel-style tweed jacket with braided trim", 1170, 1172,
    { position: "55% 50%", zoom: 1.02, origin: "50% 100%" }),
  waffleKnit: img("portfolio-img-2.jpeg", "A relaxed waffle-weave garment made by Dianna, worn by a client", 1156, 1174,
    { position: "55% 40%", zoom: 1.02, origin: "50% 100%" }),
  inProgress: img("portfolio-img-3.jpeg", "A garment in progress on the cutting table with pins, tape measure and the Valiente Couture label", 1170, 1163,
    { position: "0% 60%" }), // left-anchored crop hides the Instagram badge
  houndstooth: img("portfolio-img-4.jpeg", "Houndstooth wool with a silk lining and the Valiente Couture label", 1170, 1162,
    { position: "30% 50%" }),
  blackJumpsuit: img("portfolio-img-5.jpeg", "A client laughing in an elegant black outfit made by Dianna", 1170, 1452,
    { position: "40% 30%", zoom: 1.12, origin: "0% 100%" }), // hides the Instagram badge
  plaidDress: img("portfolio-img-6.jpeg", "A fitted plaid dress with a lace-trimmed petticoat", 1170, 1458,
    { position: "50% 45%" }),
  linedCoat: img("portfolio-img-7.jpeg", "A soft wool coat with a printed silk lining", 1170, 1148,
    { position: "55% 45%" }),
  linenTrousers: img("portfolio-img-8.jpeg", "Custom linen trousers in olive and rose", 1170, 654,
    { position: "72% 50%" }),
  laceHem: img("portfolio-img-9.jpeg", "Lace trim on the hem of a plaid dress", 1170, 1165,
    { position: "50% 45%" }),
  camelCoat: img("portfolio-img-10.jpeg", "A long camel wool coat designed by Dianna", 1170, 1345,
    { position: "50% 30%" }),
};

export const images = {
  /* Hero composition (crossfades if several). A transparent PNG cut-out
     would sit even more naturally on the fabric. */
  heroSlides: [photos.showJacketAtelier],

  /* Optional: a real photograph of draped ivory fabric for the page backdrop. */
  backdrop: null,

  /* Story */
  diannaPortrait: photos.ownerFitting,
  fabricSelection: photos.laceHem,

  /* Process */
  fabricsButtons: photos.houndstooth,
  tailoringProcess: photos.inProgress,

  /* Services */
  serviceBespoke: photos.waffleKnit,
  serviceTailoring: photos.linenTrousers,
  serviceEvening: photos.blackJumpsuit,
  serviceOuterwear: photos.linedCoat,

  /* Selected creations */
  jackets: photos.tweedJacket,
  dresses: photos.plaidDress,
  coats: photos.camelCoat,
  coutureDetails: photos.showJacketDetail,
  equestrian: photos.showJacket,

  /* Contact */
  tailoringDetail: photos.owner,
};

/** Client logo (transparent versions extracted from "logo 2.png" by scripts/extract-logo.mjs). */
export const logo = {
  burgundy: `${BASE}images/logo-burgundy`,
  ivory: `${BASE}images/logo-ivory`,
  w: 1200,
  h: 311,
};

/** Decorative SVG assets supplied by the client (public/images). */
export const svgAssets = {
  sewingMachine: `${BASE}images/sewing-machine-fashion-svgrepo-com.svg`,
  measuringTape: `${BASE}images/measuring-tape-tool-svgrepo-com.svg`,
  spool: `${BASE}images/spool-of-thread-fashion-svgrepo-com.svg`,
  mannequin: `${BASE}images/mannequin-mannequin-svgrepo-com.svg`,
  shirtButton: `${BASE}images/shirt-button-svgrepo-com.svg`,
};
