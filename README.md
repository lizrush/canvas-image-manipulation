# canvas-image-manipulation

This is a sample project that consists of an HTML document which uses a canvas element to proccess an image, allowing for user-initiated brightness adjustment of an image.

## To Dos

- [X] Set up HTML document which includes an image hidden on the page and a canvas element.
- [X] Write the pixel data from the image to the canvas.
- [X] Transform the image into a duotone of complementary colors.
- [X] Set the brightness of each pixel to map to a corresponding point on the gradient between the two colors.
- [ ] Add a user interaction feature which modulates the duotone effect, allowing the user to transition between the canvas completely filled with the dark color to the complete duotone image and back.
- [ ] Update README with any additional information needed.


## Run locally

This project uses [Middleman](https://middlemanapp.com), a static site generator, for local development with templating engines and live-reload.

Dependencies:
- Ruby
- Bundler

Clone the project and then in the project directory, run `bundle install` to ensure that you have all the required dependencies.

Use command `bundle exec middleman serve` to start the local server.

## Build

Run `bundle exec middleman build`.
