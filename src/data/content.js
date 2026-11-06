import { images } from "./images";

/* ---------------------------------------------------------------
   SITE CONTENT
   STRICT RULE: every sentence below is taken word for word from the
   client's own document (or her business card / testimonials).
   Do not write, rewrite or paraphrase copy. Headings are short phrases
   lifted from the same document. Source paragraph noted as [P1]-[P8].
---------------------------------------------------------------- */

export const brand = {
  name: "Valiente Couture",
  fullName: "Valiente Couture and Bespoke Services", // [P1]
  designer: "Dianna Coumont",
  tagline: "Ladies fine custom apparel", // business card
  location: "North Saanich, Vancouver Island",
};

export const contact = {
  email: "dianna@valiente.ca", // business card
  phone: null, // not fully legible on the card - add when confirmed
  instagram: "https://www.instagram.com/diannacoumont/",
  instagramHandle: "@diannacoumont",
  facebook: "https://www.facebook.com/share/156q1xqdu2w/?mibextid=wwXIfr",
};

export const sections = [
  { id: "home", label: "Home", number: "01" },
  { id: "story", label: "Our Story", number: "02" },
  { id: "process", label: "The Process", number: "03" },
  { id: "creations", label: "Creations", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

/* ---------------- Hero ---------------- */
export const hero = {
  eyebrow: brand.tagline,
  titleLines: ["Fashion, elegance", "and", "comfort."], // [P1]
  text: "Dianna creates one of a kind garments that complement her client’s style and that fit in every way.", // [P1]
  cta: { label: "Discover Our Story", href: "#story" },
};

/* ---------------- Our Story ---------------- */
export const story = {
  label: "Couture and Bespoke", // [P6] phrase
  eyebrow: "Our Story",
  title: ["Fascinated by fabric", "and design."], // [P5] phrase
  lead:
    "Fashion, elegance and comfort; these are the guiding principles for Dianna Coumont of Valiente Couture and Bespoke Services.", // [P1]
  chapters: [
    {
      numeral: "I",
      title: "Fabric and design",
      text:
        "Dianna has been fascinated by fabric and design for her whole life. As a child she cut panels from the curtains and from her mother’s long skirts to make dresses for her dolls. These early creative endeavours were not always appreciated at home!", // [P5]
    },
    {
      numeral: "II",
      title: "Jackets and breeches",
      text:
        "As a woman she created an equestrian wear line that changed the language of jackets and breeches, infusing colour and flattering styles into traditional riding garb. Her clothing sold in stores such as Saks Fifth Avenue, Harrods and Kaufman’s and at tack shops around North America and Europe.", // [P5]
    },
    {
      numeral: "III",
      title: "Couture and bespoke clothing creation",
      text:
        "Over the years she has studied extensively (you might even say compulsively) in many aspects of couture and bespoke clothing creation.", // [P6]
    },
  ],
  quote: "As Dianna says, she is sculpting with fabric to create a perfect piece of clothing.", // [P1]
  signature: brand.designer,
  signatureRole: brand.fullName,
  originsLabel: "Directly from", // [P2] phrase
  fabricOrigins: ["Italy", "France", "England", "Scotland"], // [P2]
  mainImage: images.diannaPortrait,
  detailImage: images.fabricSelection,
};

/* ---------------- Fabrics & Craftsmanship (thread timeline) ---------------- */
export const craftsmanship = {
  label: "Fabrics & Craftsmanship",
  title: ["A timeless", "personal style."], // [P2] phrase
};

/**
 * `visual`: { type: "swatches" | "photo" | "buttons", caption, image? }
 * Captions are short phrases from the document.
 */
export const processSteps = [
  {
    number: "01",
    title: "A timeless personal style", // [P2] phrase
    text:
      "When Dianna talks about fashion she is not talking about short term trends, but about creating a timeless personal style. Of course the fabric is a vital part of the design and of the longevity of each garment.", // [P2]
    visual: { type: "photo", image: images.fabricsButtons, caption: "Silks, woollens, cottons, linens" },
  },
  {
    number: "02",
    title: "Italy, France, England and Scotland", // [P2] phrase
    text:
      "Over the years Dianna has found sources of exquisite silks, woollens, cottons, linens and other goods that she orders directly from Italy, France, England and Scotland. These will wear beautifully for years to come.", // [P2]
    visual: { type: "swatches", caption: "Exquisite silks, woollens, cottons, linens" },
  },
  {
    number: "03",
    title: "Buttons from Paris", // [P3] phrase
    text:
      "Her attention to detail continues with her choices of threads and stitching patterns and other finishing touches. For example she sources buttons from Paris, sometimes having them custom designed and made to order for a particular garment. She compares these to jewellery for clothing!", // [P3]
    visual: { type: "buttons", caption: "Jewellery for clothing" },
  },
  {
    number: "04",
    title: "In consultation with her clients", // [P4] phrase
    text:
      "All of these decisions are made in consultation with her clients. This process is delightful and exciting. Dianna loves what she does and her joy and sense of anticipation are infectious. The collaboration involves pouring over fabric swatches and button samples with Dianna; benefiting from her well honed style sense and her years of experience.", // [P4]
    visual: { type: "photo", image: images.tailoringProcess, caption: "Fabric swatches and button samples" },
  },
];

/* ---------------- The Process: co-creation ---------------- */
export const coCreation = {
  label: "The Process",
  title: ["A process", "of co-creation."], // [P7] phrase
  paragraphs: [
    "The experience is a key part of this journey with Valiente Couture. It is an exciting and delightful process of co-creation.", // [P7]
    "It begins with a dream, a wish from a client, and with Dianna’s guidance and her creative and technical brilliance the dream becomes a reality in a garment created just for them.", // [P7]
  ],
  photos: [images.serviceEvening, images.serviceOuterwear, images.serviceTailoring, images.serviceBespoke],
};

/* ---------------- Services & Creations ---------------- */
export const creations = {
  label: "Services & Creations",
  title: ["Her", "portfolio."], // [P6] phrase
  text:
    "Her portfolio includes such pieces as Chanel style jackets and glittering ball gowns as well as raincoats and jeans, all done with an attention to detail that creates an unrivalled fit and finish.", // [P6]
  /* Garment types named in the document - no descriptions added. */
  garments: [
    "Chanel style jackets",
    "Glittering ball gowns",
    "Raincoats",
    "Jeans",
    "Equestrian wear",
    "Jackets and breeches",
    "One of a kind garments",
  ],
};

/** Gallery titles are garment types / phrases from the document. No captions are invented. */
export const portfolio = [
  { title: "Chanel style jackets", image: images.jackets, layout: "a" },
  { title: "One of a kind garments", image: images.dresses, layout: "b" },
  { title: "Unrivalled fit and finish", image: images.coats, layout: "c" },
  { title: "Finishing touches", image: images.coutureDetails, layout: "d" },
  { title: "Equestrian wear", image: images.equestrian, layout: "e" },
];

/**
 * TESTIMONIALS - genuine client words, supplied by Dianna.
 * Wording is reproduced exactly as provided. Do not edit or paraphrase.
 */
export const testimonials = [
  {
    quote:
      "Dianna made a custom equestrian show jacket for me as I was unable to find one that fit me properly. She worked with me to choose a suitable pattern and fabric. From beginning to end she was very detailed in adjusting the pattern for fit and overall construction of the jacket. She was endlessly patient with this project and the result is a high end professional garment that I am proud to wear.",
    name: "Patti Brown",
    detail: null,
  },
  {
    quote:
      "Dianna is an accomplished seamstress who loves the attention-to-detail for couture sewing. She enjoys the entire process; from discussions with the client on design and fabric choices, to the fine hand sewing details that complete a bespoke outfit.",
    name: "Penny Lai",
    detail: "Owner of Gala Fabrics",
  },
  {
    quote:
      "Dianna has finally gotten into doing something else she excels at .. couture sewing. With a true perfectionist at the machine, and with her fine hand sewing she can't help but be headed towards greatness. I can only hope her garments are appreciated for the fine details in construction she does as a labour of love for others to enjoy.",
    name: "Judi Caldwell",
    detail: null,
  },
];

/* ---------------- Brand philosophy (closing) ---------------- */
export const invitation = {
  eyebrow: "Valiente Couture",
  title: ["To make dreams", "come true!"], // [P8] phrase
  text:
    "As Dianna says every woman should feel beautiful in her clothing. It is the mission of Valiente Couture to make that happen, to make dreams come true!", // [P8]
  image: images.tailoringDetail,
};
