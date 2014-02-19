GREEN   = \033[32m
YELLOW  = \033[38;5;226m
NOCOLOR = \033[39;0m

APP_NAME := com.mojosoftware.showcues

.PHONY: default
default: i

.PHONY: a
a:
	@echo "$(YELLOW) Building application... $(NOCOLOR)"
	@ti build -p android --device-id "Galaxy S4 - 4.3 - API 18 - 1080x1920_1"

.PHONY: i
i:
	@echo "$(YELLOW) Building application... $(NOCOLOR)"
	@ti build -p ios