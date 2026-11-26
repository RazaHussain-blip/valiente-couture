import { useId, useRef, useState } from "react";
import { briefForm, contact } from "../data/content";
import { FabricLabel } from "./decor/Textiles";

/**
 * Brief form: the client describes the garment they have in mind and the
 * details are emailed to Dianna (via FormSubmit's AJAX endpoint, see
 * `briefForm` in content.js). Not a general contact form.
 */
export default function BriefForm() {
  const uid = useId().replace(/:/g, "");
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [occasions, setOccasions] = useState([]);
  const [error, setError] = useState("");

  const toggleOccasion = (option) =>
    setOccasions((list) => (list.includes(option) ? list.filter((o) => o !== option) : [...list, option]));

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    if (data.get("_honey")) return; // spam bot filled the hidden field

    const payload = {
      Name: data.get("name"),
      Email: data.get("email"),
      Phone: data.get("phone") || "-",
      ...Object.fromEntries(briefForm.questions.map((q) => [q.label, data.get(q.name) || "-"])),
      [briefForm.occasion.label]:
        occasions
          .map((o) => (o === "Other" && data.get("occasionOther") ? `Other: ${data.get("occasionOther")}` : o))
          .join(", ") || "-",
      _subject: `New garment brief from ${data.get("name")}`,
      _replyto: data.get("email"),
      _template: "table",
      _captcha: "false",
    };

    setStatus("sending");
    setError("");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${briefForm.recipient}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== "true") throw new Error(result.message || "Request failed");
      setStatus("sent");
      form.reset();
      setOccasions([]);
    } catch {
      setStatus("error");
      setError("Sorry, your brief could not be sent. Please try again, or email Dianna directly.");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status === "sent") {
    return (
      <div className="brief brief--sent" ref={statusRef} tabIndex={-1} role="status">
        <FabricLabel>{briefForm.label}</FabricLabel>
        <h3 className="brief__title">{briefForm.successTitle}</h3>
        <p className="brief__lead">{briefForm.successText}</p>
        <button type="button" className="brief__again" onClick={() => setStatus("idle")}>
          Send another brief
        </button>
      </div>
    );
  }

  const otherChecked = occasions.includes("Other");

  return (
    <form ref={formRef} className="brief" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`}>
      <FabricLabel>{briefForm.label}</FabricLabel>
      <h3 id={`${uid}-title`} className="brief__title">
        {briefForm.title}
      </h3>

      <div className="brief__row">
        <Field id={`${uid}-name`} label="Your name" required>
          <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required />
        </Field>
        <Field id={`${uid}-email`} label="Email" required>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required />
        </Field>
      </div>
      <Field id={`${uid}-phone`} label="Phone" optional>
        <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" />
      </Field>

      {briefForm.questions.map((q, i) => (
        <Field key={q.name} id={`${uid}-${q.name}`} label={q.label} number={i + 1} required={q.required}>
          <textarea id={`${uid}-${q.name}`} name={q.name} rows={3} required={q.required} />
        </Field>
      ))}

      <fieldset className="brief__field brief__occasion">
        <legend className="brief__label">
          <span className="brief__no">{briefForm.questions.length + 1}</span>
          {briefForm.occasion.label}
        </legend>
        <div className="brief__chips">
          {briefForm.occasion.options.map((option) => (
            <label key={option} className={`brief__chip ${occasions.includes(option) ? "is-on" : ""}`}>
              <input
                type="checkbox"
                name="occasion"
                value={option}
                checked={occasions.includes(option)}
                onChange={() => toggleOccasion(option)}
              />
              {option}
            </label>
          ))}
        </div>
        {otherChecked && (
          <input
            className="brief__other"
            name="occasionOther"
            type="text"
            aria-label="Other occasion"
            placeholder="Please tell us the occasion"
          />
        )}
      </fieldset>

      {/* honeypot: hidden from people, tempting for spam bots */}
      <input type="text" name="_honey" className="brief__honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" && (
        <p className="brief__error" role="alert" ref={statusRef} tabIndex={-1}>
          {error}{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      )}

      <button type="submit" className="brief__submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : briefForm.submitLabel}
        <span className="brief__arrow" aria-hidden="true">
          &rarr;
        </span>
      </button>
    </form>
  );
}

function Field({ id, label, number, required, optional, children }) {
  return (
    <div className="brief__field">
      <label className="brief__label" htmlFor={id}>
        {number && <span className="brief__no">{number}</span>}
        {label}
        {required && (
          <span className="brief__req" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {optional && <span className="brief__opt"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}
