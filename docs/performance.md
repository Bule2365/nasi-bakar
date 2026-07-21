# Performance Analysis - Nasi Bakar Mama Aura

> Analisa performa website dengan fokus pada lightweight, mobile first, dan fast loading.
> Dibuat: 21 Juli 2026

---

## Daftar Isi

1. [Performance Overview](#1-performance-overview)
2. [CSS Performance](#2-css-performance)
3. [JavaScript Performance](#3-javascript-performance)
4. [Asset Performance](#4-asset-performance)
5. [Image Optimization](#5-image-optimization)
6. [Lazy Loading](#6-lazy-loading)
7. [Render Performance](#7-render-performance)
8. [DOM Performance](#8-dom-performance)
9. [Memory Consumption](#9-memory-consumption)
10. [Bundle Size Analysis](#10-bundle-size-analysis)
11. [Network Performance](#11-network-performance)
12. [Performance Budget](#12-performance-budget)
13. [Optimization Recommendations](#13-optimization-recommendations)

---

## 1. Performance Overview

### Current Performance Metrics (Estimated)

| Metric | Estimated Value | Target | Status |
|--------|----------------|--------|--------|
| Total Page Weight | **~50 MB** | < 500 KB | **KRITIS** |
| HTML Size | ~6 KB | < 10 KB | PASS |
| CSS Size | ~12 KB | < 15 KB | PASS |
| JavaScript Size | ~13 KB | < 20 KB | PASS |
| Images Total | **~51.4 MB** | < 300 KB | **KRITIS** |
| Font Loading | 0 KB (system) | 0 KB | PASS |
| First Contentful Paint | **~15s+** (est.) | < 1.5s | **KRITIS** |
| Largest Contentful Paint | **~20s+** (est.) | < 2.5s | **KRITIS** |
| Total Blocking Time | Low | < 200ms | PASS |
| Cumulative Layout Shift | Medium | < 0.1 | SEDANG |
| Speed Index | **~15s+** (est.) | < 3.0s | **KRITIS** |

### Performance Score Breakdown

| Category | Score | Weight | Contribution |
|----------|-------|--------|-------------|
| Image Optimization | 1/10 | 40% | 0.4 |
| CSS Performance | 8/10 | 15% | 1.2 |
| JavaScript Performance | 6/10 | 15% | 0.9 |
| Network Optimization | 2/10 | 20% | 0.4 |
| Rendering Performance | 7/10 | 10% | 0.7 |
| **Overall** | **3.6/10** | | |

---

## 2. CSS Performance

### Current CSS Metrics

| Metric | Value | Assessment |
|--------|-------|------------|
| File size | 12,334 bytes (~12 KB) | PASS |
| Line count | 760 lines | PASS |
| Selectors | ~90 unique | PASS |
| Media queries | 2 | PASS |
| `!important` | 0 | PASS |
| CSS custom properties | 0 | SEDANG |
| Animations | 0 keyframes | PASS |
| Transitions | 7 | PASS |

### CSS Analysis

#### What's Good

1. **No `!important` declarations.** Specificity management is clean.
2. **No web fonts.** System font stack eliminates font loading delay.
3. **Mobile-first media queries.** Base styles are lightweight.
4. **Box-sizing reset.** Prevents layout calculations.
5. **Modern CSS features.** `gap`, `object-fit`, `flex-wrap`.
6. **No CSS framework.** No Bootstrap/Tailwind overhead.

#### What Can Be Improved

1. **No CSS minification.** ~12 KB could be reduced to ~10 KB.
2. **No critical CSS inlining.** Full CSS blocks first paint.
3. **ID selectors for styling.** 9 IDs with high specificity.
4. **No CSS custom properties.** Colors repeated ~30 times.
5. **No `will-change` hints** for transitions (minor).

### CSS Performance Impact

```
Current: 12 KB uncompressed → ~4 KB gzipped
Impact:  LOW (CSS is not the bottleneck)
```

**Verdict:** CSS performance is acceptable. Not a priority for optimization.

---

## 3. JavaScript Performance

### Current JS Metrics

| Metric | Value | Assessment |
|--------|-------|------------|
| File sizes | 13 KB total | PASS |
| Line count | 414 lines | PASS |
| Functions | 16 | PASS |
| Global variables | 29 | SEDANG |
| Event listeners | Dynamic (re-attached) | SEDANG |
| DOM operations | Full re-render | SEDANG |
| Memory usage | Low | PASS |

### JS Performance Analysis

#### What's Good

1. **No external libraries.** Zero dependency overhead.
2. **No framework overhead.** Direct DOM manipulation.
3. **No async operations.** No promise/callback chains.
4. **Simple state management.** Single cart array.
5. **Efficient localStorage.** JSON parse/stringify is fast.
6. **System font stack.** No font loading delays.

#### What Can Be Improved

1. **Full DOM re-render on every cart action.**
   ```
   Every +/- click:
   → destroy ALL menu items (6 elements)
   → recreate ALL menu items (6 elements)
   → destroy ALL cart items
   → recreate ALL cart items
   → re-attach ALL event listeners
   → save to localStorage
   ```
   For 6 items, this is acceptable. For 20+ items, it becomes noticeable.

2. **Event listeners re-attached after every render.**
   ```javascript
   // Current approach (called every render)
   function attachMenuEventListeners() {
       const buttons = menuListEl.querySelectorAll('.btn-quantity');
       buttons.forEach(function(button) {
           button.addEventListener('click', function() { ... });
       });
   }
   ```
   Should use event delegation instead.

3. **No debouncing on input validation.**
   Every keystroke triggers full validation cycle.

4. **String concatenation for innerHTML.**
   Multiple `+` operations instead of template literals.

### JavaScript Performance Impact

```
Current: ~13 KB uncompressed → ~5 KB gzipped
DOM operations: ~60 elements rebuilt per action (acceptable for 6 items)
Event listeners: ~12 re-attached per render (negligible impact)
```

**Verdict:** JS performance is acceptable for current scale. Would need refactoring for 20+ menu items.

---

## 4. Asset Performance

### Asset Inventory

| Asset Type | Count | Total Size | Optimized? |
|------------|-------|------------|------------|
| HTML | 1 | ~6 KB | N/A |
| CSS | 1 | ~12 KB | No (no minification) |
| JavaScript | 2 | ~13 KB | No (no minification) |
| PNG images | 6 | **~51.4 MB** | **NO** |
| Favicon | 0 | 0 | MISSING |
| Fonts | 0 | 0 | N/A (system fonts) |

### Asset Performance Assessment

| Asset | Load Time (3G) | Load Time (4G) | Load Time (WiFi) |
|-------|----------------|----------------|-------------------|
| HTML | < 100ms | < 50ms | < 20ms |
| CSS | < 200ms | < 100ms | < 30ms |
| JS (both) | < 200ms | < 100ms | < 30ms |
| **1 PNG image** | **~6s** | **~2s** | **< 500ms** |
| **All 6 PNG images** | **~36s** | **~12s** | **~3s** |

**The images are the ONLY bottleneck.** Source code loads fast. Images make the website unusable on mobile networks.

---

## 5. Image Optimization

### Current Image Analysis

| File | Dimensions (est.) | Format | Size | Quality |
|------|-------------------|--------|------|---------|
| nasiBakar-ayamSuwir.png | ~2000x2000? | PNG | 8.57 MB | RAW |
| nasiBakar-tongkol.png | ~2000x2000? | PNG | 8.78 MB | RAW |
| nasiBakar-ayamJamurSuwir.png | ~2000x2000? | PNG | 8.85 MB | RAW |
| nasiBakar-atiAmpela.png | ~2000x2000? | PNG | 8.07 MB | RAW |
| nasiBakar-cumi.png | ~2000x2000? | PNG | 8.48 MB | RAW |
| nasiBakar-teri.png | ~2000x2000? | PNG | 8.65 MB | RAW |
| **Total** | | | **51.4 MB** | |

### What's Wrong

1. **PNG format for photos.** PNG is lossless - ideal for graphics/screenshots, terrible for photos. JPEG or WebP is 10-20x smaller for photos.

2. **No compression.** Raw PNG files with no optimization.

3. **Wrong dimensions.** Menu images display at 64-80px. Loading 2000px+ images for 64px display is wasteful.

4. **No responsive images.** No `srcset` or `<picture>` elements.

5. **No WebP fallback.** Modern browsers support WebP which is 25-35% smaller than JPEG.

### Optimization Impact

| Format | Target Size | Reduction | Load Time (3G) |
|--------|-------------|-----------|----------------|
| Current PNG | 8.57 MB | - | ~6s |
| JPEG (quality 80) | ~200-400 KB | 95%+ | ~200ms |
| WebP (quality 80) | ~100-300 KB | 96%+ | ~150ms |
| WebP (quality 75) | ~80-250 KB | 97%+ | ~120ms |

### Target Image Specifications

| Property | Recommendation |
|----------|----------------|
| Format | WebP primary, JPEG fallback |
| Max width | 400px (display size is 64-80px) |
| Max height | 400px |
| Quality | 75-80% |
| Target size | 50-150 KB per image |
| Total images | < 500 KB |

### How to Optimize

**Option 1: Manual (Simpel)**
```bash
# Install Squoosh CLI atau gunakan online tool
# Convert PNG → WebP, resize to 400x400, quality 80
```

**Option 2: Using sharp (Node.js)**
```javascript
const sharp = require('sharp');
sharp('input.png')
  .resize(400, 400, { fit: 'cover' })
  .webp({ quality: 80 })
  .toFile('output.webp');
```

**Option 3: Using tinypng.com (Online)**
Upload PNG files, download optimized versions.

---

## 6. Lazy Loading

### Current Implementation

```html
<img src="..." alt="..." class="menu-item-image" loading="lazy">
```

### Analysis

| Aspect | Status | Detail |
|--------|--------|--------|
| `loading="lazy"` attribute | PRESENT | Applied to all menu images |
| Effectiveness | LOW | Only 6 images, all visible on scroll |
| Native lazy loading | YES | Browser handles it |

### Issues

1. **Lazy loading 6 images doesn't help much.** All 6 images are visible within the first few scrolls. Lazy loading only helps for images below the fold.

2. **No `fetchpriority` attribute.** First visible image could use `fetchpriority="high"`.

3. **No `decoding="async"`.** Could improve rendering performance.

### Recommendations

```html
<!-- First image: eager load with high priority -->
<img src="..." alt="..." class="menu-item-image" loading="eager" fetchpriority="high">

<!-- Other images: lazy load -->
<img src="..." alt="..." class="menu-item-image" loading="lazy" decoding="async">
```

**Verdict:** Lazy loading is implemented but not impactful for 6 images. Not a priority.

---

## 7. Render Performance

### Render Pipeline Analysis

```
1. HTML parse
   ↓
2. CSS parse + style calculation
   ↓
3. Layout (reflow)
   ↓
4. Paint
   ↓
5. Composite
```

### Current Render Performance

| Step | Status | Issue |
|------|--------|-------|
| HTML parse | FAST | ~6 KB, minimal DOM |
| CSS parse | FAST | ~12 KB, simple selectors |
| Layout | FAST | Flexbox only, few elements |
| Paint | FAST | Minimal effects |
| Composite | FAST | No layers |

### Potential Issues

1. **Sticky header with `z-index: 100`.** Creates a compositing layer. Minimal impact.

2. **Sticky checkout button with `z-index: 50`.** Another compositing layer. Minimal impact.

3. **CSS transitions** on `transform` and `box-shadow`. GPU-accelerated, no paint required.

4. **No `contain` property.** Could limit layout/paint scope per section.

### Recommendations

```css
/* Add containment to sections */
section {
    contain: layout style;
}
```

**Verdict:** Render performance is excellent. Not a priority for optimization.

---

## 8. DOM Performance

### DOM Metrics

| Metric | Value | Target |
|--------|-------|--------|
| Total DOM elements | ~100 (est.) | < 1500 |
| Max DOM depth | ~6 | < 32 |
| Max children per node | ~6 | < 60 |
| DOM mutations per action | ~24 (destroy + recreate) | < 10 |

### DOM Operations per Cart Action

```
User clicks + button:
├── renderMenu()
│   ├── menuListEl.innerHTML = ''          ← DOM destroy
│   ├── 6x createElement('div')           ← DOM create
│   ├── 6x set innerHTML                  ← DOM modify
│   ├── 6x appendChild                    ← DOM insert
│   └── attachMenuEventListeners()        ← DOM query + listener attach
├── renderCart()
│   ├── cartListEl.innerHTML = ''         ← DOM destroy
│   ├── Nx createElement('div')           ← DOM create (N = cart items)
│   ├── Nx set innerHTML                  ← DOM modify
│   ├── Nx appendChild                    ← DOM insert
│   └── querySelectorAll('.btn-remove')   ← DOM query
└── saveCartToLocalStorage()              ← No DOM ops
```

**Total per action:** ~24 DOM destroys + ~24 DOM creates + ~24 DOM inserts = ~72 DOM operations

### Analysis

For 6 menu items, 72 DOM operations per cart action is fine. Modern browsers handle thousands of DOM operations per frame.

However, the pattern of "destroy all → recreate all" is inefficient:
- Forces browser to recalculate layout
- Forces browser to re-evaluate lazy loading
- Forces browser to re-attach event listeners
- Causes unnecessary paint operations

### Recommendations

For current scale (6 items): **No change needed.**

If scaling to 20+ items: Use targeted updates:
```javascript
// Instead of full re-render, update only changed elements
function updateMenuItemQuantity(menuId, quantity) {
    var el = document.querySelector('[data-menu-id="' + menuId + '"] .quantity-display');
    if (el) el.textContent = quantity;
}
```

---

## 9. Memory Consumption

### Memory Analysis

| Component | Memory Usage | Assessment |
|-----------|-------------|------------|
| DOM tree | ~200 KB (est.) | LOW |
| CSSOM | ~50 KB (est.) | LOW |
| JavaScript heap | ~500 KB (est.) | LOW |
| Cart state | < 1 KB | MINIMAL |
| Event listeners | ~50 KB (est.) | LOW |
| localStorage | < 1 KB | MINIMAL |
| **Total** | **~800 KB** | **EXCELLENT** |

### Memory Leak Assessment

| Risk | Status | Detail |
|------|--------|--------|
| Event listener leaks | LOW | Old listeners cleaned up via DOM destruction |
| Closures | LOW | Closures reference DOM elements that get destroyed |
| Global variables | LOW | Small state, no unbounded growth |
| localStorage | LOW | Cart data is small |
| Image caching | LOW | Browser handles image cache |

**Verdict:** Memory consumption is excellent. No concerns.

---

## 10. Bundle Size Analysis

### Source Code Bundle

| File | Raw | Gzipped | Brotli |
|------|-----|---------|--------|
| index.html | 6 KB | ~2 KB | ~1.5 KB |
| style.css | 12 KB | ~3.5 KB | ~3 KB |
| data.js | 1.8 KB | ~0.7 KB | ~0.5 KB |
| app.js | 11 KB | ~4 KB | ~3 KB |
| **Total source** | **30.8 KB** | **~10.2 KB** | **~8 KB** |
| Images | 51.4 MB | ~51.4 MB | ~51.4 MB |
| **Total project** | **~51.4 MB** | **~51.4 MB** | **~51.4 MB** |

### Bundle Assessment

**Source code is excellent.** ~10 KB gzipped is tiny.

**Images are the problem.** 51.4 MB is 5,000x larger than the source code.

### Target Bundle

| Resource | Current | Target | Reduction |
|----------|---------|--------|-----------|
| HTML | 6 KB | 6 KB | 0% |
| CSS | 12 KB | 10 KB | 17% (minify) |
| JS | 13 KB | 10 KB | 23% (minify) |
| Images | 51.4 MB | **< 500 KB** | **99%** |
| **Total** | **~51.4 MB** | **~526 KB** | **99%** |

---

## 11. Network Performance

### Network Requests

| Resource | Requests | Size | Type |
|----------|----------|------|------|
| HTML | 1 | 6 KB | document |
| CSS | 1 | 12 KB | stylesheet |
| JS | 2 | 13 KB | script |
| Images | 6 | 51.4 MB | image |
| Favicon | 1 | 0 (404!) | icon |
| **Total** | **11** | **~51.4 MB** | |

### Network Analysis by Connection Type

#### 3G (1.5 Mbps)
| Resource | Download Time |
|----------|---------------|
| HTML | < 50ms |
| CSS | < 100ms |
| JS | < 100ms |
| 1 image | ~45s |
| All images | **~4.5 minutes** |
| **Total** | **~4.5 minutes** |

#### 4G (10 Mbps)
| Resource | Download Time |
|----------|---------------|
| HTML | < 10ms |
| CSS | < 15ms |
| JS | < 15ms |
| 1 image | ~7s |
| All images | **~41s** |
| **Total** | **~41s** |

#### WiFi (50 Mbps)
| Resource | Download Time |
|----------|---------------|
| HTML | < 5ms |
| CSS | < 5ms |
| JS | < 5ms |
| 1 image | ~1.4s |
| All images | **~8s** |
| **Total** | **~8s** |

### Critical Finding

**On 3G (common in rural Indonesia), the website takes ~4.5 minutes to fully load.** This is unusable.

### Optimization Impact

After image optimization (WebP, 400px, quality 80):

| Connection | Current | Optimized | Improvement |
|------------|---------|-----------|-------------|
| 3G | ~4.5 min | **~3s** | **99x faster** |
| 4G | ~41s | **~0.5s** | **82x faster** |
| WiFi | ~8s | **~0.2s** | **40x faster** |

---

## 12. Performance Budget

### Budget Allocation

| Resource | Budget | Current | Status |
|----------|--------|---------|--------|
| Total page weight | 500 KB | 51.4 MB | **KRITIS** |
| HTML | 10 KB | 6 KB | PASS |
| CSS | 15 KB | 12 KB | PASS |
| JavaScript | 20 KB | 13 KB | PASS |
| Images | 300 KB | 51.4 MB | **KRITIS** |
| Fonts | 0 KB | 0 KB | PASS |
| Third-party | 0 KB | 0 KB | PASS |
| **Total** | **500 KB** | **~51.4 MB** | **KRITIS** |

### Performance Metrics Targets

| Metric | Target | Current (est.) |
|--------|--------|----------------|
| FCP | < 1.5s | ~15s |
| LCP | < 2.5s | ~20s |
| TTI | < 3.5s | ~25s |
| TBT | < 200ms | < 100ms |
| CLS | < 0.1 | ~0.15 |
| SI | < 3.0s | ~15s |

---

## 13. Optimization Recommendations

### Priority 1: KRITIS - Image Optimization

**Impact: 99% page weight reduction, 40x faster load**

1. Convert all PNG to WebP format
2. Resize to max 400x400 pixels
3. Set quality to 75-80%
4. Add JPEG fallback for older browsers

**Tools:**
- Squoosh (https://squoosh.app)
- TinyPNG (https://tinypng.com)
- sharp (Node.js library)

**Estimated effort: 1-2 hours**

### Priority 2: SEDANG - CSS/JS Minification

**Impact: ~20% source code reduction**

1. Minify CSS (~12 KB → ~10 KB)
2. Minify JS (~13 KB → ~10 KB)
3. Consider combining into single files

**Tools:**
- terser (JS minifier)
- cssnano (CSS minifier)
- Or use build-free approach: online minifiers

**Estimated effort: 30 minutes**

### Priority 3: SEDANG - Critical CSS Inlining

**Impact: Faster First Contentful Paint**

1. Extract above-the-fold CSS (~2 KB)
2. Inline in `<style>` tag in `<head>`
3. Defer full CSS load

```html
<head>
    <style>/* Critical CSS here */</style>
    <link rel="stylesheet" href="css/style.css" media="print" onload="this.media='all'">
</head>
```

**Estimated effort: 1 hour**

### Priority 4: RENDAH - Resource Hints

**Impact: Marginal improvement**

```html
<link rel="preconnect" href="https://wa.me">
<link rel="dns-prefetch" href="https://wa.me">
```

**Estimated effort: 10 minutes**

### Priority 5: RENDAH - Image Dimensions

**Impact: Prevents Cumulative Layout Shift**

Add explicit `width` and `height` to images:
```javascript
'<img src="..." alt="..." width="400" height="400" loading="lazy">'
```

Or CSS:
```css
.menu-item-image {
    aspect-ratio: 1 / 1;
    width: 64px;
    height: auto;
}
```

**Estimated effort: 15 minutes**

---

### Summary: Performance Optimization Roadmap

| Phase | Task | Effort | Impact |
|-------|------|--------|--------|
| 1 | Image optimization (PNG → WebP) | 1-2 hours | 99% |
| 2 | CSS/JS minification | 30 min | 20% |
| 3 | Critical CSS inlining | 1 hour | 15% |
| 4 | Resource hints | 10 min | 5% |
| 5 | Image dimensions | 15 min | 5% |
| **Total** | | **~3 hours** | **~99%** |

**Phase 1 alone will transform this website from unusable to fast.**

---

> **Keseluruhan:** Performance project ini terbagi menjadi dua cerita: (1) Source code performance Excellent - ringan, cepat, minimal. (2) Image performance KRITIS - 51MB gambar membuat website tidak bisa diakses. Perbaikan gambar (WebP, 400px) adalah prioritas #1 dan akan memberikan improvement 99x lipat.
