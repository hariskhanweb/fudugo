# SEO team brief: fudugo.netlify.app vs fudugo.com

**To:** SEO team  
**From:** Engineering / site rebuild  
**Re:** Metadata, titles, tags, and keyword alignment before go-live  
**Live site:** [https://fudugo.com/](https://fudugo.com/)  
**Preview:** [https://fudugo.netlify.app/](https://fudugo.netlify.app/)  
**Canonical domain at launch:** `https://fudugo.com` (do not index Netlify as the primary site)

---

## Message (copy / paste)

Hi team,

We rebuilt the FuduGo marketing site. Preview is live at **https://fudugo.netlify.app/**. Production should remain **https://fudugo.com/**.

Please review and sign off on **title tags, meta descriptions, and target keywords** before we replace the current WordPress site. The new site is a cleaner information architecture (fewer URLs, one page per practice). If we ship with the wrong titles we will drop rankings for queries the old site already ranks for (web design, web development, mobile apps, SEO).

Please:

1. Approve or rewrite the **proposed titles / descriptions / keywords** in the tables below (50–60 character titles, 150–160 character descriptions where possible).
2. Confirm the **301 redirect map** from old WordPress URLs to new routes.
3. Confirm **NAP** (name, address, phone). The old site lists Nagpur + Houston; the rebuild still has placeholder Los Angeles copy in places.
4. Confirm we should **not** use “Motion Graphics & 3D Animation Studio” in titles. That language is on the Netlify preview in places and does **not** match [fudugo.com](https://fudugo.com/) (“Web and Mobile App Agency”).
5. Send any **must-keep keywords** (city, CMS names, Magento, WordPress, etc.) if we still want those in metadata even when they are no longer nav items.

Thanks — we will implement your approved copy in `src/lib/seo.ts` and the page metadata files.

---

## Snapshot: what Google sees today

| Surface | Title (as crawled) | Positioning |
| --- | --- | --- |
| [fudugo.com](https://fudugo.com/) | **FuduGo - Web and Mobile App Agency.** | Web design, web development, SEO, mobile apps, hire developers, CMS stack (WordPress, Magento, PHP, etc.) |
| [fudugo.netlify.app](https://fudugo.netlify.app/) | **FuduGo - Motion Graphics & 3D Animation Studio** (preview still showing older build in places) | AI-first digital product, web, apps, cloud, branding, marketing |
| Rebuild codebase (not necessarily deployed yet) | **FuduGo \| AI-First Digital Solutions That Grow Businesses** | Same services as preview, plus CRM, business tools, AI automation |

**Risk:** Preview title talks about motion/3D. Live title talks about a **web and mobile app agency**. Those are different SERP identities. Titles on launch must match the business Google already associates with FuduGo.

---

## What the rebuild already has (engineering)

- Canonical URLs, Open Graph, Twitter cards
- `sitemap.xml` and `robots.txt`
- JSON-LD: Organization, WebSite, Service, BlogPosting
- One H1 per page (contact duplicate H1 removed)
- Title template: `{Page} | FuduGo`

**Env:** set `NEXT_PUBLIC_SITE_URL=https://fudugo.com` on production. Do **not** leave Netlify as `metadataBase` after cutover.

**Default description in code today:**  
“From designing and building your online presence to helping people find it, we help your business grow with confidence.”  
(Too generic for SEO — please replace.)

---

## Proposed metadata (please edit and send back)

Character counts are targets, not hard limits. Keep **FuduGo** near the front of homepage title. Keep **primary keyword** near the front of inner-page titles.

### Core pages

| Page | New URL | Current code title | **Proposed title tag** | **Proposed meta description** | **Primary keywords / tags** |
| --- | --- | --- | --- | --- | --- |
| Home | `/` | FuduGo \| AI-First Digital Solutions That Grow Businesses | FuduGo \| Web Design, App Development & Digital Agency | FuduGo is a web and mobile app agency. We design, build, and grow websites, apps, and digital marketing systems for businesses worldwide. | web design, web development, mobile app development, digital agency, SEO |
| About | `/about` | About | About FuduGo \| Web & Mobile App Company | About FuduGo Solutions — 8+ years in web design, web development, mobile apps, and SEO. Team, process, and clients. | about FuduGo, web development company, mobile app company |
| Contact | `/contact` | Contact | Contact FuduGo \| Get a Quote | Contact FuduGo for web, app, SEO, or custom software. Nagpur and Houston teams. Call +91 9923280712 or email info@fudugo.com. | contact FuduGo, get a quote, web agency Nagpur |
| Services hub | `/services` | Services | Services \| Web, Apps, SEO & Custom Software | Explore FuduGo services: websites, mobile apps, CRM, business tools, cloud, branding, digital marketing, and AI automation. | web development services, mobile app development, digital marketing, custom software |
| Blog | `/blog` | Blog | Blog \| Web, Apps, SEO & Digital Growth \| FuduGo | FuduGo blog: web development, mobile apps, SEO, marketing automation, and product thinking. | FuduGo blog, SEO, web development, marketing automation |
| Blog post | `/blog/{slug}` | Post title | `{Post title} \| FuduGo Blog` | Use post excerpt; first 150–160 chars. Include 1 primary keyword from the article. | post-specific |

### Service pages

| New URL | Code title today (often too short) | **Proposed title tag** | **Proposed meta description** | **Keywords / tags** | Old site URL(s) to 301 |
| --- | --- | --- | --- | --- | --- |
| `/services/web-solutions` | Web | Web Design & Development Company \| FuduGo | Custom websites, CMS, and e-commerce from FuduGo. Fast, Google-friendly, and built to convert on desktop and mobile. | web design, web development, CMS, e-commerce, Next.js | `/website-designing`, `/php-web-development`, many CMS child URLs |
| `/services/mobile-apps` | Mobile Apps | Mobile App Development \| iOS & Android \| FuduGo | Native and cross-platform mobile apps from FuduGo. Android, iPhone, and custom apps from idea to App Store. | mobile app development, Android, iPhone, React Native | `/android-application-development/`, iPhone/iPad/PhoneGap URLs |
| `/services/digital-marketing` | Digital Marketing | SEO & Digital Marketing Services \| FuduGo | SEO, content, social, and paid ads from FuduGo. More visibility, leads, and conversions. | SEO, digital marketing, PPC, social media marketing | `/seo/`, SMM/SEM/content URLs |
| `/services/ai-automation` | AI & Automation | AI Automation & Custom AI Agents \| FuduGo | Custom AI agents, workflow automation, and predictive systems that cut manual work and scale operations. | AI automation, AI agents, workflow automation | *(new — no old 1:1 URL)* |
| `/services/crm-drm-integration` | CRM & DRM | CRM & DRM Integration \| FuduGo | Connect CRM, dealer, and customer data into one live system. Integrations, sync, and reporting. | CRM integration, DRM, API integration | closest: ERP / custom app pages |
| `/services/business-tools-development` | Business Tools | Custom Business Tools & ERP \| FuduGo | Purpose-built business software and ERP-style tools that replace spreadsheets and disconnected apps. | ERP, custom software, business tools | `/` services “ERP Application Development” |
| `/services/business-software` | Software | Custom Business Software \| FuduGo | Internal tools, portals, and workflow software designed around how your team actually works. | custom software, dashboards, workflow automation | hire-a-developer / custom application URLs |
| `/services/cloud-infrastructure` | Cloud | Cloud & DevOps \| AWS Azure \| FuduGo | Cloud architecture, CI/CD, security, and monitoring so products stay fast and reliable as you scale. | cloud, AWS, Azure, DevOps | Cloud Managed Services |
| `/services/branding-design` | Brand | Branding, Logo & Web Design \| FuduGo | Brand identity, UI systems, and design for web and product — consistent across every touchpoint. | branding, logo design, website designing | `/logo-designing`, website designing |

---

## Keyword strategy (match live site, don’t abandon it)

**Keep (high intent, already on fudugo.com):**

- web design / website designing  
- web development  
- mobile app development / Android / iPhone  
- SEO / organic SEO / PPC / social media marketing  
- e-commerce / WordPress *(if still offered)*  
- custom software / hire developers *(if still offered)*  
- FuduGo / Fudugo Solutions  

**Add (new site, don’t replace the above):**

- AI automation, AI agents  
- CRM / DRM integration  
- Next.js / headless CMS *(only if you want to rank for stack, not just services)*  

**Drop or demote in titles (unless SEO insists):**

- Motion graphics / 3D animation studio  
- Magento, Joomla, CakePHP, VirtueMart, etc. **unless** those pages will still exist or you need exact-match 301s + leftover demand  

---

## URL / redirect map (SEO must confirm)

Old WordPress IA is a large dropdown tree. New IA is **9 service URLs**. Every indexed old URL needs a **301**.

Examples from the live nav:

| Old (fudugo.com) | New |
| --- | --- |
| `/` | `/` |
| `/about-us/` | `/about` |
| `/contact-us/` (confirm actual slug) | `/contact` |
| `/blog/` and posts | `/blog` and `/blog/{new-slug}` or keep old slugs |
| `/website-designing` | `/services/web-solutions` |
| `/php-web-development` | `/services/web-solutions` |
| `/android-application-development/` | `/services/mobile-apps` |
| `/seo/` | `/services/digital-marketing` |
| Career, My Account, Cart, Products, Hire-a-developer tree | Confirm: 301 to `/contact` or keep as new pages |

**Ask SEO:** export Search Console **top landing pages** and map each URL. Do not guess Magento/Joomla 301s without GSC data.

**Netlify:** `noindex` the Netlify subdomain after launch (or password-protect). Canonicals must point to `https://fudugo.com`, not `*.netlify.app`.

---

## Content / entity mismatches to fix with SEO

1. **Brand line:** Live = “Web and Mobile App Agency.” Preview/code still mixes “Motion Graphics & 3D Animation Studio” (`site.json` tagline). Align all titles and H1s.  
2. **Address:** Live footer: Nagpur (Chhaoni Square / Koradi Road) and Houston (Katy Freeway). Rebuild `site.json` still has a Los Angeles placeholder. Bad for local SEO and Google Business Profile.  
3. **H1 on home:** Live uses multiple H1s (Web Design, Web Development, SEO, Mobile App…). Rebuild uses one H1 (“BUILD”) which is **weak for SEO**. Recommend H1: “Web Design, App Development & Digital Growth” or similar, with “BUILD” as visual treatment only.  
4. **Stats:** Live claims 1400+ websites, 300+ apps, 800+ clients, 8+ years. Rebuild copy should not contradict GSC/brand claims.  
5. **Blog:** Live posts (e.g. Marketing Automation 2026, Rank Content in LLM, GTM consent) must 301 to new slugs or be migrated. New blog currently uses motion-language articles that may not match ranking content.  
6. **OG image:** Use a 1200×630 brand image, not a random photo. Include FuduGo wordmark.

---

## Checklist before cutover

- [ ] SEO returns **approved** title + description + keywords per URL (tables above).  
- [ ] GSC landing-page export mapped to 301s.  
- [ ] `NEXT_PUBLIC_SITE_URL=https://fudugo.com`  
- [ ] Netlify preview `noindex`  
- [ ] NAP matches GBP and old footer  
- [ ] Homepage H1 contains primary keywords (not only “BUILD”)  
- [ ] Blog slugs preserved or redirected  
- [ ] Submit new sitemap in Search Console after launch  

---

## Where engineering will put your copy

| Item | File |
| --- | --- |
| Default title, description, site URL | `src/lib/seo.ts` |
| Home metadata | `src/app/page.tsx` |
| About / Contact / Blog / Services | `src/app/{about,contact,blog,services}/page.tsx` |
| Service titles/descriptions | `src/lib/seo.ts` (`servicePageMetadata`) + `src/data/service-pages.json` |
| Keywords in root layout | `src/app/layout.tsx` (`metadata.keywords`) |
| Tagline leftover | `src/data/site.json` |

Once you send the approved table (or a spreadsheet), we will paste it in and ship.
