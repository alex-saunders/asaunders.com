# Personal Site

### [asaunders.com](www.asaunders.com)

My personal site made using the [Hugo static site generator](https://gohugo.io/), with a custom theme created by myself with the [MDL library](https://getmdl.io/index.html).

If you want to develop/create some content (I imagine you must be pretty lost for things to do, to be honest this is mainly for personal reference) then follow these instructions:

### Dev environment
1. `npm install`
2. `npm run dev`
3. Edit the static assets to your heart's content
4. If you wish to see your changes you'll also have to initialise the content editing environment (see below)

### Content editing
1. `npm install`
2. `npm run create`
3. Navigate to [http://localhost:1313/](http://localhost:1313/)
4. Add markdown content within the 'content' folder

### Build
Build's the site content into the 'docs' folder and deploys to firebase (you'll have to ensure `firebase init` has been called on the project first)

1. `npm run build`
