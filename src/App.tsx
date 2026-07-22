import { useEffect, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Clock3, Flame, Camera, MapPin, Menu, Phone, Play, X, Heart, UtensilsCrossed, ChevronUp, BadgeDollarSign, Music2 } from 'lucide-react'
import wingsImg from './assets/fgztd4xr7pk71.jpg'
import tendersImg from './assets/fe34bc81-1be4-481a-b577-3e62ca7140d4-retina-large.jpg.webp'

const photos = {
  tacos: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1400&q=85',
  wings: wingsImg,
  tenders: tendersImg,
  quesadilla: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=1400&q=85',
  tacosAlt: 'https://images.unsplash.com/photo-1604467715878-83e57e8bc129?auto=format&fit=crop&w=1400&q=85',
}

const nav = ['Menu', 'Specials', 'Story', 'Location']
const reveal = { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .55, ease: [0.16, 1, 0.3, 1] as const } }

function Brand() { return <a className="brand" href="#top" aria-label="Little Spicy home"><span className="brand-flame"><Flame /></span><span>LITTLE<br /><b>SPICY</b></span></a> }
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string, title: ReactNode, copy?: string }) { return <motion.div {...reveal} className="section-heading"><p className="eyebrow"><Flame size={15} /> {eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</motion.div> }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [top, setTop] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 120])
  useEffect(() => { const change = () => { setScrolled(window.scrollY > 24); setTop(window.scrollY > 700) }; change(); window.addEventListener('scroll', change); return () => window.removeEventListener('scroll', change) }, [])
  const close = () => setMenuOpen(false)
  return <main id="top">
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <Brand />
      <div className="nav-links">{nav.map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</div>
      <a className="nav-cta" href="#location">Find us <MapPin size={16} /></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <div className={`mobile-menu ${menuOpen ? 'show' : ''}`}>{nav.map(n => <a key={n} onClick={close} href={`#${n.toLowerCase()}`}>{n}</a>)}<a onClick={close} href="#location">Find us</a></div>
    </nav>

    <section className="hero">
      <motion.div className="hero-image menu-hero" style={{ y: heroY, backgroundImage: `url(${photos.tacos})` }} />
      <div className="hero-overlay" /><div className="grain" />
      <div className="spice p1">✦</div><div className="spice p2">✷</div><div className="pepper pepper1">🌶</div><div className="pepper pepper2">🌶</div>
      <div className="hero-content"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="hero-brand"><Flame /><span>LITTLE <b>SPICY</b></span></motion.div><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="hero-label"><span /> The hidden gem at the pump <span /></motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .7 }}>Fresh. Hot.<br /><em>Made To Order.</em></motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }} className="hero-copy">Tacos, quesadillas, crispy tenders, and wings—made fresh every day, just when you want them.</motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .58 }} className="hero-buttons"><a href="#menu" className="button button-fire">View the menu <ArrowRight size={18} /></a><a href="#specials" className="button button-glass">Weekly specials <ChevronDown size={18} /></a></motion.div>
      </div>
      <div className="hero-bottom"><div className="rating"><span>4.9</span><div>★★★★★<small>Local favorite</small></div></div><a className="scroll-cue" href="#menu">Scroll to taste <ChevronDown size={18} /></a></div>
    </section>

    <section id="menu" className="menu section"><SectionHeading eyebrow="The good stuff" title={<>Big flavor.<br /><i>Small prices.</i></>} copy="Made fresh, served fast, and packed with the kind of flavor that turns a quick stop into your new favorite food stop." />
      <div className="menu-grid">
        <FoodCard feature image={photos.tacos} crop="tacos" icon="🌮" title="Tacos" price="$2" note="each" detail="Special chicken, special beef, habana chicken, or pastor pork. Flour or corn tortilla." tags={['Made fresh', 'Pick your protein']} />
        <FoodCard image={photos.quesadilla} crop="quesadilla" icon="🧀" title="Quesadillas" price="$3.50" detail="Choice of meat with cheese, jalapeños, sour cream, and onions." tags={['Golden crisp']} />
        <FoodCard image={photos.wings} crop="wings" fries icon="🍗" title="Chicken Wings" price="$2" note="3 pieces" detail="Exactly 3 pieces. Buffalo, hot honey, or mango habanero. Served with fries." tags={['Choose your heat']} />
        <FoodCard image={photos.tenders} crop="tenders" fries icon="🔥" title="Chicken Tenders" price="$2" note="2 pieces" detail="Exactly 2 pieces, made to order and served with fries." tags={['Made to order']} />
      </div><a className="text-link" href="#location">Come hungry. Leave happy. <ArrowRight size={17} /></a>
    </section>

    <section id="specials" className="specials section"><div className="specials-glow" /><SectionHeading eyebrow="Worth a detour" title={<>Your midweek<br /><i>craving solved.</i></>} />
      <div className="special-grid"><motion.article {...reveal} className="special taco-special"><div className="special-top"><span className="special-day">Every Tuesday</span><span className="special-icon">🌮</span></div><h3>Taco<br />Tuesday</h3><p>Small price. Big taco energy.</p><div className="deal"><b>$1</b><span>TACOS</span></div><a href="#location" className="special-link">Get directions <ArrowRight size={17} /></a></motion.article>
      <motion.article {...reveal} transition={{ delay: .12 }} className="special wing-special"><div className="special-top"><span className="special-day">Every Wednesday</span><span className="special-icon">🍗</span></div><h3>Wing<br />Wednesday</h3><p>Your wing fix, right on time.</p><div className="deal"><b>$1</b><span>WINGS</span></div><div className="wing-deco">✦</div><a href="#location" className="special-link">Get directions <ArrowRight size={17} /></a></motion.article></div>
    </section>

    <section className="why section"><SectionHeading eyebrow="Why little spicy" title={<>Not your average<br /><i>gas station stop.</i></>} copy="The food is seriously good. The wait is seriously short." /><div className="feature-grid">
      <Feature n="01" icon={<UtensilsCrossed />} title="Fresh ingredients" text="Everything is cooked fresh. No shortcuts, no compromises." /><Feature n="02" icon={<BadgeDollarSign />} title="Affordable prices" text="Restaurant-quality flavor without restaurant prices." /><Feature n="03" icon={<Flame />} title="Made to order" text="No heat lamps. Your food hits the grill when you do." /><Feature n="04" icon={<Clock3 />} title="Fast service" text="The perfect fuel-up for lunch, dinner, or whenever." />
    </div></section>

    <section className="gallery section"><div className="gallery-intro"><SectionHeading eyebrow="A little proof" title={<>The flavor<br /><i>speaks loud.</i></>} /><p>Real food. Real portions.<br /><a href="#contact">@littlespicy</a></p></div><div className="masonry">{[photos.tacos,photos.wings,photos.tenders,photos.quesadilla,photos.tacosAlt].map((src,i)=><button key={src} className={`gallery-item g${i+1}`} onClick={()=>setLightbox(src)} aria-label="View Little Spicy food"><img src={src} loading="lazy" alt="Little Spicy food" /><span><Play size={16} fill="currentColor" /> Take a closer look</span></button>)}</div></section>

    <section className="reviews section"><SectionHeading eyebrow="Local love" title={<>One bite and<br /><i>you get it.</i></>} /><div className="review-grid"><Review quote="The tacos are incredible. Fresh, packed with flavor, and I can’t believe the price." name="Maya R." from="Verified local" color="#f06449" /><Review quote="Best wings around. Hot honey is a must—and they always hit the spot." name="Derrick J." from="Regular customer" color="#93b843" /><Review quote="A hidden gem inside the gas station. Don’t sleep on the quesadillas." name="Sandra L." from="Verified local" color="#ffae00" /></div></section>

    <section id="story" className="story"><div className="story-photo"><img src={photos.tacos} alt="Freshly prepared Little Spicy tacos" loading="lazy" /><div className="story-stamp"><Flame /> Fresh food<br /><b>Great flavor</b></div></div><div className="story-content"><p className="eyebrow"><Flame size={15} /> The Little Spicy story</p><h2>A big little<br /><i>idea.</i></h2><p>Little Spicy serves fresh, flavorful food made to order at prices that make coming back easy. We’re proof that a quick stop can be the best part of your day.</p><p>Whether you’re stopping for gas or looking for your next favorite taco spot, we’re here with great food and a warm welcome.</p><a href="#location" className="button button-dark">Find your next favorite <ArrowRight size={18} /></a></div></section>

    <section id="location" className="location section"><div className="location-card"><div><p className="eyebrow"><MapPin size={15} /> Come see us</p><h2>Worth the<br /><i>stop.</i></h2><p className="location-copy">Great food is waiting right inside the gas station. Pull up, step in, and leave with a whole new favorite.</p><div className="location-details"><p><MapPin /> <span><b>Inside the gas station</b><br />6620 Brentwood Stair Rd<br />Fort Worth, TX 76112</span></p><p><Phone /> <span><b>Give us a call</b><br /><em>Phone number coming soon</em></span></p></div></div><a className="map" href="https://www.google.com/maps/search/?api=1&query=6620+Brentwood+Stair+Rd,+Fort+Worth,+TX+76112" target="_blank" rel="noreferrer" aria-label="Open Little Spicy location in Google Maps"><div className="map-lines" /><div className="map-pin"><MapPin fill="currentColor" /><span>Little Spicy</span></div><p>6620 BRENTWOOD STAIR RD<br />FORT WORTH, TX 76112</p></a></div></section>

    <section id="contact" className="contact"><div><p className="eyebrow"><Flame size={15} /> Always fresh</p><h2>Come get<br /><i>spicy.</i></h2></div><div className="contact-actions"><a href="tel:+10000000000"><Phone /><span>Call us<small>Phone number coming soon</small></span></a><a href="mailto:hello@littlespicy.com"><Heart /><span>Say hello<small>hello@littlespicy.com</small></span></a></div></section>
    <footer><div className="footer-main"><Brand /><p>Fresh food. Great flavor.<br />Affordable prices.</p><div className="footer-links"><a href="#menu">Menu</a><a href="#specials">Specials</a><a href="#story">Our story</a><a href="#location">Location</a></div><div className="socials"><a href="#contact" aria-label="Facebook">f</a><a href="#contact" aria-label="Instagram"><Camera /></a><a href="#contact" aria-label="TikTok"><Music2 /></a></div></div><div className="footer-bottom"><span>© 2026 Little Spicy. All flavor reserved.</span><span>Made fresh, always.</span></div></footer>
    {top && <button className="back-top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><ChevronUp /></button>}
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Food photo" onClick={()=>setLightbox(null)}><button aria-label="Close photo"><X /></button><img src={lightbox} alt="Little Spicy food close up" /></div>}
  </main>
}

function FoodCard({ image, crop, fries=false, icon, title, price, note, detail, tags, feature=false }: 
  {image:string, crop:string, fries?:boolean, icon:string, title:string, price:string, note?:string, detail:string, tags:string[], feature?:boolean}) 
  { return <motion.article whileHover={{ y:-8, rotate: feature ? -.4 : .4 }} transition={{ type:'spring', stiffness:280, damping:20 }} className={`food-card ${feature ? 'feature' : ''}`}>
    <div className={`food-image ${crop} ${fries ? 'with-fries' : ''}`}>
      <img src={image} loading="lazy" alt={title} />
      
      <span>{icon}</span>{feature && <b className="popular">Most loved</b>}
      </div><div className="food-info"><div className="food-title"><h3>{title}</h3><p><b>{price}</b> {note}</p></div><p className="food-detail">{detail}</p><div className="tags">{tags.map(t=><span key={t}>{t}</span>)}</div></div></motion.article> }
function Feature({n,icon,title,text}:{n:string,icon:ReactNode,title:string,text:string}) { return <motion.article {...reveal} whileHover={{y:-6}} className="feature-card"><span className="feature-n">{n}</span><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></motion.article> }
function Review({quote,name,from,color}:{quote:string,name:string,from:string,color:string}) { return <motion.article {...reveal} className="review"><div className="stars">★★★★★</div><blockquote>“{quote}”</blockquote><div className="reviewer"><span style={{background:color}}>{name[0]}</span><p><b>{name}</b><small>{from}</small></p></div></motion.article> }
