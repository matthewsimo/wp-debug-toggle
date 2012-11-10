wp-debug-toggle
===============

CLI to quickly, without hassle, toggle debug on/off

This is just a little tool I've had locally for a little while that I decided to actually build out. Hopefully it'll be useful to you as well, if not, I don't care, fits my workflow.

---

### Installation

A npm module - install via `npm install wp-debug-toggle -g` (you'll want global).

If it doesn't work, you'll probably need to run it from sudo. If that doesn't work, something is terrible wrong. GL.

---

### Usage

Usage is designed to be extremely simple and super fast. The module exposes a parameter-less CLI command `debug-toggle` you can run from anywhere. It'll check your current directory for some common config files and parse through to find the `WP_DEBUG` php constant. If it finds it, it'll toggle the value and save the file. Super simple.


---

#### Notes

- the moduel checks current working directory only atm
- it searches a few common config files ( wp-config.php, local-config.php, wp-local-config.php )

---

#### Moving forward

This is a little tool for me, that I use to help speed up debugging when I'm coding on WP stuff. Use it if you want, I'll accept pull requests if it makes sense and doesn't add complexity. The purpose of this is meant to be fast & easy. That said, these are the items I plan on building out:

- Functionality that will recursively check parent directories looking for the config file so you can run this from anywhere within a WP project.
- Better reporting in general.
- More tests, I'm sure it's just happenstance this actually works, need to find & fix those edge cases that are broken.



