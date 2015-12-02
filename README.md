# ICaaS UI

This application is the UI of [ICaaS](https://github.com/grnet/icaas), in the form of a web and a desktop client.
The development of the clients is based on the framework Ember.js.

## Development of web client

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

### Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

### Running / Development

* In the directory `config` create a new file with the name `endpoints.js`.
  Copy the contents of the file `endpoints.js.example` in the new file and update the URLs to point to the APIs that the ICaaS client will use.
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

#### Running Tests

* `ember test`
* `ember test --server`

#### Building

* `ember build` (development)
* `ember build --environment production` (production)

#### Deploying

Specify what it takes to deploy your app.

### Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Development of nw client

ICaaS UI can either be deployed/used as a web client, or as a nw client.
The commits for the nw client are placed in the branch feature-nw.

### Installation
Checkout the branch `feature-nw`, in the directory app and then run:
* `npm install`
* `bower install`

### Running / Development

* In the directory `config` create a new file with the name `endpoints.js`.
  Copy the contents of the file `endpoints.js.example` in the new file and update the URLs to point to the APIs that the ICaaS client will use.
* `ember nw`

### Packaging
`ember nw:package`


## Copyright and license

Copyright (C) 2015 GRNET S.A.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.