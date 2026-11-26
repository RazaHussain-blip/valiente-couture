import { galleries, images } from "./images";

/* ---------------------------------------------------------------
   SITE CONTENT
   Source: the revised website copy for Dianna Coumont (Nov 2026), based
   on her marked-up document and her email of 10 Nov 2026. Use the copy
   as supplied - do not rewrite it. Testimonials are the clients' own
   words and must stay exactly as provided.
---------------------------------------------------------------- */

export const brand = {
  name: "Valiente Couture",
  fullName: "Valiente Couture and Bespoke Services", // [P1]
  designer: "Dianna Coumont",
  tagline: "Ladies fine custom", // business card ("apparel" removed at client request)
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
  titleLines: ["Fashion, elegance", "and", "comfort."],
  text: "Dianna creates one-of-a-kind garments that complement her clients’ style and fit in every way.",
  cta: { label: "Discover Our Story", href: "#story" },
};

/* ---------------- Our Story ---------------- */
export const story = {
  label: "Couture and Bespoke",
  eyebrow: "Our Story",
  title: ["Fascinated by fabric", "and design."],
  lead:
    "Fashion, elegance and comfort: these are the guiding principles for Dianna Coumont of Valiente Couture and Bespoke Services.",
  chapters: [
    {
      numeral: "I",
      title: "Fabric and design",
      /* Not in the revised copy - kept from Dianna's original document. */
      text:
        "Dianna has been fascinated by fabric and design for her whole life. As a child she cut panels from the curtains and from her mother’s long skirts to make dresses for her dolls. These early creative endeavours were not always appreciated at home!",
    },
    {
      numeral: "II",
      title: "A distinctive vision in equestrian fashion",
      text:
        "Dianna’s creative vision extends beyond couture and bespoke clothing. She created an equestrian wear line that changed the language of jackets and breeches, infusing colour and flattering styles into traditional riding garb. Her designs brought a fresh perspective to equestrian clothing, combining the practical requirements of riding wear with a more individual and flattering sense of style. Her clothing was sold in prestigious stores such as Saks Fifth Avenue, Harrods and Kaufman’s, as well as in tack shops around North America and Europe.",
    },
    {
      numeral: "III",
      title: "Couture and bespoke clothing creation",
      text:
        "Over the years, Dianna has studied extensively (you might even say compulsively) in many aspects of couture and bespoke clothing creation.",
    },
  ],
  quote: "As Dianna says, she is sculpting with fabric to create a perfect piece of clothing.",
  signature: brand.designer,
  signatureRole: brand.fullName,
  originsLabel: "Fabrics from",
  fabricOrigins: ["Scotland", "Britain", "Italy", "Japan"],
  mainImage: images.diannaPortrait,
  detailImage: images.fabricSelection,
};

/* ---------------- Fabrics & Craftsmanship (alternating rows) ---------------- */
export const craftsmanship = {
  label: "Fabrics & Craftsmanship",
  title: ["A timeless", "personal style."],
};

/** Each row: label, title, one or more paragraphs, and a photo. */
export const processSteps = [
  {
    number: "01",
    caption: "Fashion, elegance and comfort",
    title: "A timeless personal style",
    paragraphs: [
      "When talking about fashion, we are not talking about short-term trends, but about creating timeless personal style. Each garment is designed to complement the individual, reflect her personality and wear beautifully for years to come.",
    ],
    image: images.fabricsButtons,
  },
  {
    number: "02",
    caption: "Silks, woollens, cottons and linens",
    title: "Fabrics and choices of finishing",
    paragraphs: [
      "Fabric is a vital part of the design and the longevity of each garment. Over the years, Dianna has found sources of exquisite silks, woollens, cottons and linens from across Europe and beyond.",
      "From Scotland comes the mill that creates magnificent tweeds, fabrics that sculpt beautifully, wear forever and always look stylish. Britain also offers lovely woollens, including lighter weights suitable for pants, lighter jackets and skirts. Silks come from Britain as well as Italy, which has remarkable quality and beautiful fabrics. Cotton comes from Italy and Britain, while Japan also offers some particularly lovely choices.",
      "Dianna has samples that clients can see and feel. With so many possibilities, part of her job is to help clients decide which fabrics will work best for their particular garment. The goal is to make a garment that will wear beautifully for years to come.",
    ],
    image: images.fabricSources,
  },
  {
    number: "03",
    caption: "Buttons from England, Germany and Paris",
    title: "Jewellery for clothing",
    paragraphs: [
      "Attention to detail continues with the choices of threads, stitching patterns and finishing touches. Buttons are one of Dianna’s favourite details to choose. She has sources in England, Germany and Paris for these sumptuous little gems. As she says, she thinks of buttons as jewellery for clothing.",
      "Dianna enjoys exploring these choices with her clients, looking through the possibilities and answering their questions. Each little detail contributes to the character of the finished garment, and as the choices come together, the excitement builds.",
    ],
    image: images.parisButtons,
  },
  {
    number: "04",
    caption: "Fabric swatches and button samples",
    title: "The collaboration with clients",
    paragraphs: [
      "Dianna is there every step of the way when a client wishes it. Her job is to help each client choose elements that will enhance her garment while retaining her personal style.",
      "All of these decisions are made together, with an emphasis on having fun with the process. The collaboration involves poring over fabric swatches and button samples, exploring possibilities and benefiting from Dianna’s well-honed sense of style and years of experience.",
      "Her experience helps make the choices easier, ensuring that every decision stays in line with the client’s goals for the garment, her personal fashion style and her lifestyle.",
    ],
    image: images.tailoringProcess,
  },
  {
    number: "05",
    caption: "Fit that feels natural",
    title: "Without comfort there is no elegance",
    paragraphs: [
      "There is another important consideration that should never be overlooked: comfort. Without comfort there is no elegance. This is a major concern when having a special piece made. Fit is essential, and the right fit should feel natural and non-restrictive. Considerable time is spent ensuring that each garment feels as wonderful to wear as it looks.",
    ],
    image: images.fitting,
  },
];

/* ---------------- The Process: co-creation ---------------- */
export const coCreation = {
  label: "The Valiente Couture Experience",
  title: ["A process", "of co-creation."],
  paragraphs: [
    "The experience is a key part of this journey with Valiente Couture. It is an exciting and delightful process of co-creation.",
    "It begins with a dream, a wish from a client. Through consultation, exploring fabrics, choosing finishing details and making decisions together, that dream gradually takes shape. With Dianna’s guidance and her creative and technical brilliance, the dream becomes a reality in a garment created just for the client.",
    "Dianna loves what she does, and her joy and sense of anticipation are infectious. She enjoys helping clients discover the possibilities, make their choices and create something that truly reflects who they are.",
    "The result is more than simply a piece of clothing. It is a garment designed around the client’s personal style, lifestyle, comfort and individuality.",
  ],
  /* Each photo opens a pop-up gallery of related pictures (see `galleries` in images.js). */
  galleries: [galleries.evening, galleries.outerwear, galleries.tailoring, galleries.bespoke],
};

/* ---------------- Services & Creations ---------------- */
export const creations = {
  label: "Services & Creations",
  title: ["Her", "portfolio."],
  text:
    "Her portfolio includes such pieces as Chanel-style jackets and couture garments, all done with an attention to detail that creates an unrivalled fit and finish.",
  /* Garment types named in the copy. */
  garments: [
    "Chanel-style jackets",
    "Couture garments",
    "Equestrian wear",
    "Jackets and breeches",
    "One-of-a-kind garments",
  ],
};

/** Gallery titles are garment types / phrases from the copy. */
export const portfolio = [
  { title: "Chanel-style jackets", image: images.jackets },
  { title: "One-of-a-kind garments", image: images.dresses },
  { title: "Unrivalled fit and finish", image: images.coats },
  { title: "Finishing touches", image: images.coutureDetails },
  { title: "Equestrian wear", image: images.equestrian },
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

/* ---------------- Making dreams come true (closing) ---------------- */
export const invitation = {
  eyebrow: "Valiente Couture",
  title: ["Making dreams", "come true."],
  text: "As Dianna says, every woman should feel beautiful in her clothing.",
  paragraphs: [
    "It is the mission of Valiente Couture to make that happen: to create individual garments that combine fashion, elegance and comfort, allowing every woman to feel wonderful in what she wears.",
    "At Valiente Couture, it is about creating something truly personal, something that fits beautifully, feels wonderful and will be treasured for years to come. It is about making dreams come true.",
  ],
  image: images.tailoringDetail,
};

/* ---------------- Brief form (contact section, right column) ----------------
   Submissions are emailed to `recipient` through FormSubmit (formsubmit.co),
   which needs no account. The very first submission sends Dianna a one-time
   activation email: she must click its link before briefs are delivered.
   Questions 1-4 are Dianna's own. */
export const briefForm = {
  recipient: "dianna@valiente.ca",
  label: "Garment brief",
  title: "Tell Dianna about your garment",
  questions: [
    { name: "want", label: "What do you want?", required: true },
    { name: "concerns", label: "What are your concerns?" },
    { name: "lifestyle", label: "What is your lifestyle?" },
  ],
  occasion: {
    label: "Is it for everyday, weddings or another occasion?",
    options: ["Everyday", "Wedding", "Special occasion", "Other"],
  },
  submitLabel: "Send my brief",
  successTitle: "Thank you",
  successText: "Your brief has been sent to Dianna. She will be in touch with you soon.",
};
