# Visual 555 Timer Calculator

Yet another 555 timer calculator. See this running live at [visual555.tardate.com](http://visual555.tardate.com)

Why? To play around with HTML5 simulation of the 555 timer circuit, and also demonstrate a grunt + coffeescript toolchain.


## Installation for Development

To hack on this, you need a recent `npm` installed, then run:

    $ npm install

Use grunt to just-in-time compile coffeescript sources as you work:

    $ grunt watch


## GitHub Pages Hosting

This repo uses GitHub Pages to host the site at [visual555.tardate.com](http://visual555.tardate.com).


## Sinatra Web App

There's also a sinatra wrapper that can be used to host the site at Heroku or similar services
(what I used to do before moving to GitHub Pages).

To run the sinatra app locally:

    $ bundle install
    $ ruby web_app.rb


## Contributing

1. Fork it ( https://github.com/tardate/visual555/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
