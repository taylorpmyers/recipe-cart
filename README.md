<h1 align="center">Nightmare Heroku Example</h1>

<p align="center">
	<a title="Nightmare" href="http://www.nightmarejs.org/"><b>Nightmare</b></a>
</p>
<p align="center">
	<a title="Heroku" href="https://www.heroku.com/"><img alt="Heroku" src="https://github.com/logo/heroku/blob/master/images/logo.svg" width="" height="64"></a>
</p>

<p align="center">
	<br><a title="GitPunch" href="https://gitpunch.com/"><img alt="GitPunch" src="https://raw.githubusercontent.com/vfeskov/gitpunch/master/client/src/big-logo.png" width="222" height="52"></a>
	<br>⭐ Star and get notified about new releases via email.
</p>

## Getting Started
- Initial steps
	- Install <a title="Node.js" href="https://nodejs.org/en/"><img alt="Node.js" src="https://camo.githubusercontent.com/9c24355bb3afbff914503b663ade7beb341079fa/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f2d6c696768742e737667" width="" height="18"></a> and <a title="Yarn" href="https://yarnpkg.com/lang/en/"><img alt="Yarn" src="https://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.svghttps://raw.githubusercontent.com/yarnpkg/assets/master/yarn-kitten-full.png" width="" height="18"></a>.
	- Install <a title="Heroku CLI" href="https://devcenter.heroku.com/articles/heroku-cli#download-and-install"><img alt="Heroku CLI" src="https://github.com/logo/heroku/blob/master/images/logo.svg" width="" height="18"> CLI</a> and <a title="Git" href="https://git-scm.com/downloads"><img alt="Git" src="https://cdn.svgporn.com/logos/git.svg" width="" height="18"></a>.
	- [Download](https://github.com/kireerik/nightmare-heroku-example/archive/master.zip) or [clone](github-windows://openRepo/https://github.com/kireerik/nightmare-heroku-example) this repository.
	- Open a command prompt in the project folder.

> Install dependencies:
> ```shell
> yarn install
> ```

Start the script:
> ```shell
> yarn start
> ```

## Development
Start the script in development mode:
> ```shell
> yarn dev
> ```

## Set up Heroku app
Create a new app from the Heroku Dashboard.

Go to Settings / Buildpacks and add the following buildpacks:
> `https://github.com/heroku/heroku-buildpack-apt`
> <br>`https://github.com/captain401/heroku-buildpack-xvfb.git`
> <br>`https://github.com/benschwarz/heroku-electron-buildpack.git`
> <br>`heroku/nodejs`

Modify the stack:
> ```shell
> heroku stack:set cedar-14 --app HEROKU_APP_NAME
> ```

> Create a Git repository (if you don't have one already)

Add the remote Heroku repository:
> ```shell
> git remote add heroku https://heroku:HEROKU_API_KEY@git.heroku.com/HEROKU_APP_NAME.git
> ```
> You can go to the Heroku Dashboard / {profile picture} / Account settings / API Key to get it.

Deploy to Heroku:
> ```shell
> yarn deploy
> ```

Go to the Heroku Dashboard / {app} / Resources and turn the `web` Dyno `off` and the `worker` Dyno `on`.

## Deployment
Deploy to Heroku:
> ```shell
> yarn deploy
> ```
