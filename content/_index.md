+++
date = "2015-08-22T06:42:21-07:00"
draft = false
title = "About me"
categories = [ "about" ]

+++

# 👋 Hi!

(test)
Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists
look like:

  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

1. this starts a list *with* numbers
+  this will show as number "2"
*  this will show as number "3."

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:

~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~

| Langauge                      | Experience | Level                         |
|-------------------------------|------------|-------------------------------|
| Programming                   |              |                               |
| Java                          | 3+ Years   | Advanced                      |
| C#/C++                        | 1 Year     | Confident in C#, learning C++ |
| Pascal                        | 4+ Years   | Confident                     |
| Python                        | < 1 Year   | Learning                      |
| Assembly                      | 1 Year     | Fundamentals                  |
| Web Development               |            |                               |
| HTML, CSS 3.0                 | 4+ Years   | Advanced                      |
| Javascript/JQuery (inc. AJAX) | 3+ Years   | Advanced                      |
| MySQL                         | 2+ Years   | Confident                     |
| ASP (Classic)                 | 2 Years    | Confident                     |
| PHP                           | 1 Year     | Confident                     |

### An h3 header ###

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header). Here's a footnote [^1].

[^1]: Footnote text goes here.


A horizontal rule follows.

***

Here's a definition list:

apples
  : Good for making applesauce.
oranges
  : Citrus!
tomatoes
  : There's no "e" in tomatoe.

Again, text is indented 4 spaces. (Put a blank line between each
term/definition pair to spread things out more.)

Here's a "line block":

| Line one
|   Line too
| Line tree

and images can be specified like so:

![example image](//placehold.it/300x300 "An exemplary image")


And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
