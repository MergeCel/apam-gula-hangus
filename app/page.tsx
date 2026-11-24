import Image from "next/image";
import type { CSSProperties } from "react";
import { FaWhatsapp } from "react-icons/fa";
import data from "@/data/site.json";
import GalleryCarousel from "@/components/GalleryCarousel";
import Header from "@/components/Header";
import HeroTransition from "@/components/HeroTransition";
import MenuCarousel from "@/components/MenuCarousel";
import SiteFooter from "@/components/SiteFooter";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { LineIcon } from "@/components/Icons";

const GALLERY_ROTATIONS = [-4.52, -0.89, -2.97, -0.89];

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

export default function Home() {
  return (
    <>
      <Header navigation={data.navigation} logo={data.brand.logo} />

      <main>
        <section className="hero" id="beranda">
          <Image
            className="hero-bg"
            src={data.hero.image}
            alt=""
            fill
            priority
            sizes="100vw"
          />
          <HeroTransition images={data.hero.transitions} />
          <div className="hero-content">
            <h1>
              {data.hero.title.split(" ").map((word) => (
                <span key={word}>{word}</span>
              ))}
            </h1>
            <p>{data.hero.description}</p>
          </div>
        </section>

        <section className="story" id="kisah">
          <div className="story-pill">
            <Image
              src={data.story.image}
              alt={data.story.imageAlt}
              fill
              sizes="(max-width: 900px) 200px, 430px"
            />
          </div>
          <h2>{data.story.title}</h2>
          <p>
            <RichText text={data.story.description} />
          </p>
        </section>

        <section className="unique" id="keunikan">
          <Image
            className="unique-bg"
            src={data.unique.background}
            alt=""
            fill
            sizes="100vw"
          />
          <h2>{data.unique.title}</h2>
          <div className="unique-grid">
            <span className="unique-band" aria-hidden="true" />
            {data.unique.items.map((item) => (
              <article
                className="unique-card"
                key={item.title}
                style={{ "--card-rotation": item.rotation } as CSSProperties}
              >
                <span className="unique-card-media" aria-hidden="true">
                  <Image
                    src={data.unique.cardImage}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 340px, 420px"
                  />
                  <span className="unique-card-shade" />
                </span>
                <LineIcon name={item.icon} className="unique-icon" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="halal" aria-label="Informasi halal">
          <div className="halal-pill">
            <Image
              className="halal-bg"
              src={data.halal.background}
              alt=""
              fill
              sizes="(max-width: 900px) 90vw, 1320px"
            />
            <div className="halal-content">
              <Image
                src={data.halal.logo}
                alt="Placeholder logo Halal Indonesia"
                width={96}
                height={116}
              />
              <p>{data.halal.description}</p>
            </div>
          </div>
        </section>

        <section className="menu" id="menu">
          <h2>{data.menu.title}</h2>
          <div className="menu-inner">
            <div className="product-grid">
              {data.menu.products.map((product) => (
                <article className="product-card" key={product.name}>
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={`Placeholder foto apam rasa ${product.name}`}
                      fill
                      sizes="(max-width: 900px) 90vw, 400px"
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <strong className="product-price">{product.price}</strong>
                    <span className="product-quantity">{product.quantity}</span>
                  </div>
                </article>
              ))}
            </div>

            <MenuCarousel products={data.menu.products} />

            <div className="order-banner">
              <p>{data.menu.cta.text}</p>
              <a href={data.menu.cta.href} target="_blank" rel="noreferrer">
                <FaWhatsapp aria-hidden="true" />
                <span>{data.menu.cta.button}</span>
              </a>
            </div>
          </div>
        </section>

        <section className="gallery" id="galeri">
          <div className="gallery-heading">
            <Image
              className="gallery-doodle gallery-doodle-left"
              src="/images/Group 30.svg"
              alt=""
              width={69}
              height={76}
            />
            <h2>{data.gallery.title}</h2>
            <Image
              className="gallery-doodle gallery-doodle-right"
              src="/images/Group 30.svg"
              alt=""
              width={69}
              height={76}
            />
          </div>

          <div className="gallery-grid">
            {data.gallery.items.map((item, index) => (
              <figure className="gallery-item" key={item.caption}>
                <div
                  className="gallery-image"
                  style={{
                    transform: `rotate(${
                      GALLERY_ROTATIONS[index % GALLERY_ROTATIONS.length]
                    }deg)`
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`Placeholder ${item.caption}`}
                    fill
                    sizes="(max-width: 600px) 45vw, (max-width: 1200px) 22vw, 285px"
                  />
                </div>
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <GalleryCarousel items={data.gallery.items} />
        </section>

        <section className="testimonials" id="testimoni">
          <div className="testimonial-heading">
            <Image
              className="doodle doodle-left"
              src="/images/Group 38.svg"
              alt=""
              width={69}
              height={76}
            />
            <h2>
              <span className="testimonial-title-full">
                {data.testimonials.title}
              </span>
              <span className="testimonial-title-short">
                {data.testimonials.titleShort}
              </span>
            </h2>
            <Image
              className="doodle doodle-right"
              src="/images/Group 38.svg"
              alt=""
              width={69}
              height={76}
            />
          </div>

          <TestimonialCarousel testimonials={data.testimonials.items} />
          <Image
            className="doodle doodle-mobile-left"
            src="/images/Group 30.svg"
            alt=""
            width={69}
            height={76}
          />
        </section>
      </main>

      <a className="chatbot-fab" href="/chatbot" aria-label="Buka Chatbot Pampam">
        <Image src="/images/pampam-coklat.png" alt="" width={120} height={120} />
      </a>

      <SiteFooter />
    </>
  );
}
