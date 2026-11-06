import { brand, contact, sections } from "../data/content";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#home" className="footer-brand__name" aria-label={`${brand.name}, back to top`}>
              <Logo tone="ivory" className="footer-logo" />
            </a>
            <p>{brand.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="footer-title">Explore</h2>
            <ul className="footer-links">
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer-title">Visit &amp; follow</h2>
            <ul className="footer-links">
              <li>{brand.location}</li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noreferrer">
                  Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={contact.facebook} target="_blank" rel="noreferrer">
                  Facebook<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="footer-copy">
          &copy; {year} {brand.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
