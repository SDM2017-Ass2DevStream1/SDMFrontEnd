PKG = eslint-config-airbnb

upgrade_eslint:
	npm info '$(PKG)@latest' peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add '$(PKG)@latest' -D --save
