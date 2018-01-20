---
title:  "Today I Learned"
date:   2017-09-12 01:03:14 +0100
image: /assets/dist/images/today-i-learned/today-i-learned-masthead.jpg
---

I aim to use this space to keep an updated list of things I recently learnt and found interesting enough to note down.

<style>
  figure.example {
    max-width: 100%;
    background: #3099DD;
    padding: 8px;
    margin: 16px 0;
  }
  figure.example figcaption {
    font-size: 16px;
    text-align: center;
    background: #0e2439;
    color: #fff;
  }
  figure.example .fill {
    margin: 8px auto;
    width: 250px;
    height: 250px;
    background: #fff;
  }
  figure.example p {
    margin: 0;
    text-align: center;
    color: #fff;
  }

  figure.example.min-content {
    width: min-content;
  }
  figure.example.max-content {
    width: max-content;
  }

  .footer-example > div {
    border: 1px solid red;
  }
  .footer-example .left {
    float: left;
  }
  .footer-example .right {
    float: right;
  }
  .footer-example .center {
    margin: 0 auto;
    width: max-content;
  }
</style>

## 2017-09-12: max &amp; min-content

There exists 2 values for the css `width` attribute that I didn't know about: `max-content` &amp; `min-content`. Respectively, they adjust the width of an element to be that of the widest or most narrow object it contains. See examples below:


Using `width: min-content`, the card's width is set to the most narrow element within it, that being the white square, which has a width of 250px.

<figure class="example min-content">
  <figcaption>min-content</figcaption>
  <div class="fill"></div>
  <p>Ut aute in nisi cillum consequat excepteur minim culpa non fugiat deserunt.</p>
</figure>

Using `width: max-content`, the card's width is set to the widest element within it, that being the `<p>` element below the white square.

<figure class="example max-content">
  <figcaption>max-content</figcaption>
  <div class="fill"></div>
  <p>Ut aute in nisi cillum consequat excepteur minim culpa non fugiat deserunt.</p>
</figure>


Using this, we can create a layout with elements aligned to the left and right, with one in the center, that doesn't overlap the elements when the screen size is too small to contain all elements on the same line (a surprisingly hard challenge, even with the likes of flexbox). 

```css
#left {
  float: left;
}
#right {
  float: right;
}
#center {
  margin: 0 auto;
  width: max-content;
}
```

<div class="footer-example">
  <div class="left">
    Euexconsequatvelitpariatur.
  </div>
  <div class="right">
    Loremduissitelit.
  </div>
  <div class="center">
    Doloreinlabore.
  </div>
</div>

Try resizing the screen, the elements will stack on top of each other instead of overlapping, whilst keeping the middle element centered. Magic!

**N.B:** The support for this currently isn't great, firefox only supports using max &amp; min-content with width, not height, and you must prefix it with -moz-. Safari has partial support and requires the -webkit- prefix. [See full browser compatability here](http://caniuse.com/#feat=intrinsic-width).