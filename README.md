
# Configure Files

## Files
Config: `site/config/_default/config.yaml`

Params: `site/config/_default/params.yaml`

Menus: `site/config/_default/menus.yaml`

Languages: `site/config/_default/languages.yaml`

Icon: `site/assets/media/icon.png`

Logo: `site/assets/media/logo.png`

Themes: `site/data/themes/<theme-name>.toml`

I18n: `site/i18n/<langCode>.yaml`


# 1. General

## Config
```yaml
title: WowchemyPrototype # Website name
baseurl: 'https://example.com/' # Website URL
defaultContentLanguage: en
```

## Params
```yaml
font_size: 'S|M|L'
description: 'A wowchemy prototype.'
appearance:
  # use your theme (eg.alphabiz)
  theme_day: alphabiz
  theme_night: alphabiz
design:
  css_class: # body class
  css_style: # body style

```

# 2. Personalize Header

## Theme
```toml
name = "alphabiz" # theme name

font = 'minimal'
menu_blur = true # enable backdrop-filter blur
menu_border = true # enable menu bottom border
menu_hover = true # enable menu item hover

[light]
  # Primary
  primary = ""
  # Backgrounds
  background = ""
  # Menu
  menu_primary = ""
  menu_text = ""
  menu_text_active = ""
  menu_title = ""
  # Link (optional, default color: primary)
  link = ""
  link_hover = ""
  link_decoration = ""
  # Section (optional, default color: transparent)
  home_section_odd: ""
  home_section_even: ""

[dark]
  primary = ""
  # etc...

```

## Menus

```yaml
main:
  - name: Home
    url: /
    weight: 10
  - pre: "<<" 
    name: About
    post: ">>"
    url: about/
    weight: 20
  # etc...
```

## Params

```yaml
header.navbar.enable
header.navbar.highlight_active_link
header.navbar.align
header.navbar.show_language
header.navbar.show_translations
header.navbar.show_day_night # day night toggle
header.navbar.show_search # search button
header.navbar.show_logo
header.image.width, height # logo size
```

align: `l | c | r`

show_logo: 
> show website title if false
>
> assets: assets/media/logo.png or logo.svg

# 3. Personalize Footer

## Params
```yaml
footer:
  text: 'wowchemy prototype'
  show_translations: true
copyright: 
  notice: '© {year} Me'
```


# 4. Custom JS

### 1. module

put your module into `assets/js/_vendor` folder, then config `plugins_vendor` prop in the `params.yaml`

> site/assets/js/_vendor/tween.js

> params.js

```yaml
plugins_vendor: [tween]
```

### 2. general

put your js file into `assets/js` folder, then config `plugins_js` prop in the `params.yaml`

> site/assets/js/particles.js

> params.js

```yaml
plugins_js: [particles]
```

# 5. I18n

## Config

Set your default language
> config.yaml
```yaml
defaultContentLanguage: en
```

## Languages
```yaml
en:
  languageCode: en
  title: 'Alphabiz Official Website'
  contentDir: content/en
zh:
  languageCode: zh
  title: 'Alphabiz 中文官网'
  contentDir: content/zh
```

1. Config localization props in config into sub map (eg.`title`)

2. Move the files in `content` to its subfolder `content/en`,
and supplement the translated content in your second language folder `content/zh`

## I18n

Create i18n file `<langCode>.yaml` (eg.`site/i18n/en.yaml`)

## Params

Duplicate `params.yaml` to `params.<langCode>.yaml`

Config your localization props in `params` like footer

> params.en.yaml
```yaml
locale:
  date_format: 'Jan 2, 2006'
footer:
  text: 'a footer static text'
copyright:
  notice: '© {year} wowchemy prototype. All Rights Reserved'
```

> params.zh.yaml
```yaml
locale:
  date_format: '2006 Jan 2'
footer:
  text: '一段页脚静态文本'
copyright:
  notice: '© {year} wowchemy prototype. 版权所有'
```

> params.yaml
```yaml
# general params
appearance:
  theme_day: alphabiz
  theme_night: alphabiz
font_size: L
```

General params (eg.`appearance`) in `params.yaml` will be extended by the localization params file
(eg.`params.zh.yaml`)


## Menus

#### Option 1

You can set i18n field id as menuItem name and config your i18n file 

> menus.yaml
```yaml
main:
  - name: menu_item_home
    url: /
    weight: 10

  - name: menu_item_post
    url: post/
    weight: 20

  - name: menu_item_about
    url: about/
    weight: 100
```

> i18n/en.yaml
```yaml
- id: menu_item_home
  translation: Home
- id: menu_item_post
  translation: Post
- id: menu_item_about
  translation: About
```

> i18n/zh.yaml
```yaml
- id: menu_item_home
  translation: 主页
- id: menu_item_post
  translation: 博客
- id: menu_item_about
  translation: 关于
```

#### Option 2

Duplicate `menus.yaml` to `menus.xx.yaml` if you want to config a menu with different structure

> menus.en.yaml
```yaml
main:
  - name: Home
    url: /
    weight: 10

  - name: Post
    url: post/
    weight: 20

  - name: About
    url: about/
    weight: 100

  - name: Twitter
    url: twitter/
    weight: 110

```

> menus.zh.yaml
```yaml
main:
  - name: 主页
    url: /
    weight: 10

  - name: 博客
    url: post/
    weight: 20

  - name: 关于
    url: about/
    weight: 100
```

# Partials::widget_page
```yaml
type: widget_page
headless: false
active: true
title
subtitle

design.background.color
design.background.gradient_start
design.background.gradient_end
design.background.video.path
design.background.image.path
design.background.image.image_size
design.background.image.image_position
design.background.image.image_opacity
design.background.image.image_darken

design.spacing.padding
design.clip_path
design.css_class
design.css_style
design.columns
```

---

# Widgets::hero

```yaml

type: hero
headless: false
weight: 10
active: true

hero_media: 'foo.jpg' 
# site/assets/media/foo.jpg
# jpg | svg

title: 'text'

cta.url: 'url'
cta.icon_pack: 'fas | fab | far | fal'
cta.icon: 'text'
cta.label: 'text'
cta_alt.url: 'url'
cta_alt.label: 'text'
cta_note.label: 'text'

design.flip: 'bool'

hero_style:
  media_rounded: true

design:
  background:
    image: 'background_earth.png' # site/assets/media/background_earth.png
    image_size: contain
    image_position: top
    image_opacity: '0.6'
    image_parallax: false
  css_class: fullscreen # fullscreen background

```

---

# Advance

## Website Structure

#### Root HTML
> baseof.html
```html
<html>

{{ partial "site_head" }}

<body>

    {{ partial "search" }}

    <div class="page-header">
        {{ partial "navbar" }}
    </div>
    
    <div class="page-body">
        {{ block "main" }}{{ end }}
    </div>        

    <div class="page-footer">
        <div class="container">
            {{ partial "site_footer" }}
        </div>
    </div>
</body>
</html>
```
