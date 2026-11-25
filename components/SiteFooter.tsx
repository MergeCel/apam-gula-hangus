import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import data from "@/data/site.json";
import { LineIcon } from "./Icons";

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
        part.startsWith("**") ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-hours">
          <h3>{data.footer.hours.title}</h3>
          <p>
            <RichText text={data.footer.hours.description} />
          </p>
        </div>

        <div className="footer-social">
          <h3>{data.footer.social.title}</h3>
          <p>{data.footer.social.description}</p>
          <div className="socials">
            {data.footer.social.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon === "whatsapp" ? (
                  <FaWhatsapp aria-hidden="true" />
                ) : (
                  <LineIcon name={link.icon} />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-map">
          <Image
            src="/images/map-location.jpg"
            alt={`Peta lokasi ${data.footer.address}`}
            fill
            sizes="(max-width: 900px) 90vw, 320px"
          />
          <a
            className="map-button"
            href={data.footer.map.href}
            target="_blank"
            rel="noreferrer"
          >
            <span>{data.footer.map.button}</span>
            <LineIcon name="external" />
          </a>
        </div>

        <a
          className="footer-address"
          href={data.footer.map.href}
          target="_blank"
          rel="noreferrer"
        >
          <LineIcon name="pin" />
          <span>{data.footer.address}</span>
        </a>
      </div>
    </footer>
  );
}
