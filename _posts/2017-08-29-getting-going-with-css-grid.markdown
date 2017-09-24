---
title:  "Getting going with CSS Grid"
date:   2017-08-29 01:03:14 +0100
image: /assets/dist/images/getting-going-with-css-grid/css-grid.jpg
tags:
  - CSS
  - Grid
scripts: 
  - "https://production-assets.codepen.io/assets/embed/ei.js"
  - "//cdn.jsdelivr.net/caniuse-embed/1.1.0/caniuse-embed.min.js"
---

Recently I've been playing around with the new CSS layout module - CSS Grid (I actually redesigned this site using it). I found a ton of resources for learning how to use CSS grid but found them to all be in different locations with different authors. Here I have collated what I consider to be the most important points to learn with CSS grid (it will probably need updating in the future, however), enjoy!

([The full spec for css grid can be found here](https://drafts.csswg.org/css-grid/)).

## Defining a grid

Grid does not need to be defined as a body-level layout, the `display: grid` attribute can be placed on any parent element. You can then define a grid using the `grid-template-columns` and `grid-template-rows` properties. These properties define the track sizing functions of the grid rows and columns, each value, seperated by a space, defining the size of a row/column.

```css
.grid {
  display: grid;
  grid-template-columns: 50px 50px /* creates 2 columns of 50px height */
  grid-template-rows: 100px 100px 100px /* creates 3 rows of 100px height */
}
```

All direct children of the parent now get laid out by the auto-placement algorithm, one for each grid cell. Extra rows will be created if needed.

<p data-height="265" data-theme-id="0" data-slug-hash="EvOPov" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - Barebones" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/EvOPov/">CSS Grid - Barebones</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

You can use the `grid-gap` property to create a gap between columns and rows. It is the shorthand property, combining the `grid-column-gap` and `grid-row-gap` properities so that you don't have to set these individually. Here I have used a `grid-gap` value of 10px.

<p data-height="265" data-theme-id="0" data-slug-hash="jLQWxW" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - grid-gap" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/jLQWxW/">CSS Grid - grid-gap</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### `Repeat()` Function

Also released with CSS is the new `repeat()` CSS function. As per the spec, `repeat()` represents a repeated fragment of the track-list, allowing for a large number of columns or rows that appear in a recurring pattern to be written in a more compact form. The function can be used on the `grid-template-rows` and `grid-template-columns` properties.

```css
.grid {
  display: grid;
  grid-template-rows: repeat(3, 100px); 
  /* is equivalent to grid-template-rows: 100px 100px 100px */
}
```

### `fr` unit

The `fr` data type denotes a flexible length within a grid container. 1fr is for 1 part of the remaining available space (think of it like a fraction).

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1f 1fr; 
  /* creates 4 columns that each take up the same amount of space */
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 20px 2fr; 
  /* creates 4 columns, with the last being double the width of the first 2. */
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="wqQGxJ" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - fr" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/wqQGxJ/">CSS Grid - fr</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### The `minmax()` function

The `minmax()` CSS function, also released with CSS Grid, defines a size range greater than or equal to *min* and less than or equal to *max*. Each value can be a *length*, *percentage*, a *fr* value, or one of the keyword values `max-content`, `min-content` or `auto`.

* **max-content**
Represents the largest max-content contribution of the grid items occupying the grid track.
* **min-content**
Represents the largest min-content contribution of the grid items occupying the grid track.
* **auto**
As a maximum, identical to max-content. As a minimum it represents the largest minimum size (as specified by min-width/min-height) of the grid items occupying the grid track.


```css 
.grid {
  display: grid;
  grid-template-columns: minmax(100px, max-content) minmax(200px, 1fr) 150px;
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="vJQypY" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - minmax" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/vJQypY/">CSS Grid - minmax</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Placing items in a grid

In the previous example, the grid items were automatically placed and laid out. You can, however, explicity define where an item resides in a grid and how much room it takes up. Using the `grid-column-start` &amp; `grid-column-end`, along with `grid-row-start` and `grid-row-end` properties, you can define an item's placement. These properties can be combined into the `grid-column` and `grid-row` shorthand properties, using a slash (`/`) to seperate the start and end values. Examples of all of these properties can be seen below.

<p data-height="265" data-theme-id="0" data-slug-hash="xLQZvz" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - Item placement" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/xLQZvz/">CSS Grid - Item placement</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### Using `space-around` and `space-between`

When creating a grid where the tracks have absolute sizes and in total are smaller than the area of the parent grid container you can use the `align-content: space-around` and `justify-content: space-between` properties to spread grid-items around to the bounds of the container. This creates extra space around the tracks and increases any gutter specified with `grid-gap`. When elements span more than one track (and therefore cross a gutter), they also gain this extra space.

<p data-height="265" data-theme-id="0" data-slug-hash="rzQWrZ" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - space-around/space-between" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/rzQWrZ/">CSS Grid - space-around/space-between</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

### `grid-template-areas`

Using the `grid-template-areas` property on the grid container defines a grid template by referencing the names of the grid areas which are specificed with the `grid-area` property. Repeating the name of a grid area causes the content to span those cells. A full stop represents an empty cell. This syntax is useful for providing a visualsation of the structure of the grid.

The following example creates a grid that's four columns wide by three rows tall. The entire top row will be taken up by the **header** area. The middle row will contain two **main** areas, one empty cell and one **sidebar** area. The last row is consumed by the **footer**.

```css
.grid {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer"
}
```

You can then use the `grid-area` property on grid-item child elements, referencing the names defined in `grid-template-areas` in order to place elements within the grid:

```css
.header {
  grid-area: header;
}
.main {
  grid-area: main;
}
.sidebar {
  grid-area: sidebar;
}
.footer {
  grid-area: footer;
}
```

<p data-height="265" data-theme-id="0" data-slug-hash="NvEEJO" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - grid-template-areas" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/NvEEJO/">CSS Grid - grid-template-areas</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

Using the `grid-template-areas` property we can easily come up with a solution for the ['holy grail layout of web design'](https://en.wikipedia.org/wiki/Holy_Grail_(web_design)) which aims to implement the following design:

![Holy Grail Layout](/assets/dist/images/getting-going-with-css-grid/HolyGrail.png)
*Image by David Lark, distributed under a CC-BY 2.0 license.*

The design requires a layout with three columns, with the main page content in one column, and supplementary content such as menus and advertisements in the other columns (sidebars). These columns commonly require separate backgrounds, with borders between them, and should appear to be the same height no matter which column has the tallest content. The sidebars have a fixed width, with the center column adjusting in size to fill the window (fluid or liquid layout). Another requirement is that, when a page does not contain enough content to fill the screen, the footer should drop to the bottom of the browser window instead of leaving blank space underneath. You can see an implementation of these requirements below (using only 29 lines of CSS, including borders and backgrounds!):

<p data-height="265" data-theme-id="0" data-slug-hash="XayoKd" data-default-tab="css,result" data-user="alex-saunders" data-embed-version="2" data-pen-title="CSS Grid - Holy Grail Layout" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/alex-saunders/pen/XayoKd/">CSS Grid - Holy Grail Layout</a> by Alex Saunders (<a href="https://codepen.io/alex-saunders">@alex-saunders</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Caveats

### Browser Support

Although CSS Grid provides a great new way of laying out pages, it's still being introduced by all major browser vendors and is not fully supported as of yet. Using vender prefixes is strongly recommended in order to get a consistent experience across all major browsers (a good website for finding which vendor prefixes are required can be found [here](http://shouldiprefix.com/)). The current state of CSS Grid can be seen below:

<p class="ciu_embed" data-feature="css-grid" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=css-grid">Can I Use css-grid?</a> Data on support for the css-grid feature across the major browsers from caniuse.com.
</p>

The original Grid implementation was a part of IE10. However, this implementation is now vastly different to the current spec and IE has said it will never update to the new specification, the original spec created for IE10 (&amp; IE11) can be viewed [here](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/). Rachel Andrew has a [great article](https://24ways.org/2012/css3-grid-layout/) on using the IE implemtation.

### Bugs

CSS Grid is not without its fair share of bugs. Rachel Andrew has been collecting a community curated list of CSS Grid Layout bugs, incomplete implementations and interop issues. This handy list can be found [here](https://github.com/rachelandrew/gridbugs). 

