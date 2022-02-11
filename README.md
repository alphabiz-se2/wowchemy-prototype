
# Configure Files

> Config: site/config/_default/config.yaml
>
> Params: site/config/_default/params.yaml
>
> Menus: site/config/_default/menus.yaml
>
> Themes: site/data/themes/<theme-name>.toml

# General

## Config
```yaml
title: WowchemyPrototype # Website name
baseurl: 'https://example.com/' # Website URL
```

## Params
```yaml
# use your theme (eg.alphabiz)
appearance:
  theme_day: alphabiz
  theme_night: alphabiz
description: 'A wowchemy prototype.'
design:
  css_class: # body class
  css_style: # body style

```

# Personalize Menu

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

# Personalize Footer

## Params
```yaml
footer:
  text: 'wowchemy prototype'
  show_translations: true
copyright: 
  notice: '© {year} Me'
```

# Partials::widget_page
```yaml
type: widget_page
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
design.background.image.image_darken

design.spacing.padding
design.clip_path
design.css_class
design.css_style
design.columns
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
    
    </div>        

    <div class="page-footer">
        <div class="container">
            {{ partial "site_footer" }}
        </div>
    </div>
</body>
</html>
```
