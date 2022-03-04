module github.com/wowchemy/starter-blog

go 1.14

replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 => ./wowchemy-cms
replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 => ./wowchemy

// replace github.com/alphabiz-se2/wowchemy-module-chipchain => ./wowchemy-chipchain

require (
  github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 v5.0.0-20211017222640-7201a4fa8c44
  github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 v5.0.0-20211017222640-7201a4fa8c44

  github.com/alphabiz-se2/wowchemy-module-chipchain v0.1.0
)
