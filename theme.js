/* Based on https://github.com/harbassan/spicetify-galaxy/blob/main/galaxy.js
   Credits to harbassan
*/
(function retroblur() {
    const YouTubeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><g fill="gray"><rect width="14.3" height="3.7" x=".8" y="11.5" ry=".1"/><rect width="5" height="5.6" x="-9.6" y="8.2" rx="0" ry=".1" transform="matrix(.63163 -.77527 .80715 .59035 0 0)"/><rect width="4.5" height="4.6" x="-1.3" y="13.1" rx="0" ry=".1" transform="matrix(.9021 -.43155 .62218 .78288 0 0)"/></g><g fill="#fff"><rect width="16" height="1.6" ry=".8"/><rect width="16" height="1.6" y="14.4" ry=".8"/><rect width="1.5" height="15.9" y=".1" ry=".8"/><rect width="1.7" height="15.9" x="14.3" ry=".8"/><ellipse cx="11.2" cy="4.4" rx="1.8" ry="1.9"/><rect width="2.7" height=".5" x="6.3" y="4.2" ry=".2"/><rect width="2.7" height=".5" x="4.9" y="7.1" ry=".2" transform="rotate(-14)"/><rect width="2.1" height=".5" x="6.6" y="-11.3" ry=".2" transform="rotate(90)"/><rect width="2.7" height=".5" x="7.1" y=".1" ry=".2" transform="rotate(18)"/><rect width="2.7" height=".5" x="-4.6" y="11.6" ry=".2" transform="rotate(-67)"/><rect width="2.7" height=".5" x="10" y="-9.6" ry=".2" transform="rotate(70)"/><rect width="2.7" height=".5" x=".1" y="10.5" ry=".2" transform="rotate(-43)"/></g></svg>`
    if (!(Spicetify.Player.data && Spicetify.Platform)) {
      setTimeout(retroblur, 100);
      return;
    }
  
    console.log("retroblur wallpaper changer running");
  
    Object.keys(localStorage).forEach(item => {
      if (item.includes("retroblur:temp")) localStorage.removeItem(item);
    });
  
    const config = {}
  
    function parseOptions() {
      config.matchWallpaperToTheme = JSON.parse(localStorage.getItem("matchWallpaperToTheme"));
    }
    parseOptions()
  
    let isDim = false;
  
    function loopOptions(page) {
        setBg(startImage);
    }
  
    var defImage = `https://github.com/Motschen/Retroblur/blob/main/assets/background_purple.jpg?raw=true`;
    console.log(getComputedStyle(document.body).getPropertyValue("--spice-button"))
    switch (getComputedStyle(document.body).getPropertyValue("--spice-button")) {
        case " #00bbff": {
            console.log("setting default wallpaper to water");
            defImage = "https://images.unsplash.com/photo-1502933691298-84fc14542831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
            break;
        }
        case " #b0fd68": {
            console.log("setting default wallpaper to lush");
            defImage = "https://images3.alphacoders.com/356/35627.jpg";
            break;
        }
        case " #ceeb26": {
            console.log("setting default wallpaper to sun");
            defImage = "https://images.unsplash.com/photo-1516370873344-fb7c61054fa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
            break;
        }
        case " #ebb726": {
            console.log("setting default wallpaper to sunset");
            defImage = "https://4kwallpapers.com/images/walls/thumbs_3t/4928.jpg";
            break;
        }
        case " #a10003": {
            console.log("setting default wallpaper to mercy");
            defImage = "https://images3.alphacoders.com/356/35627.jpg";
            break;
        }
    }
    let startImage = localStorage.getItem("retroblur:startupBg") || defImage;
    if (config.matchWallpaperToTheme) startImage = defImage;
  
    function setBg(imageData) {
      var image = imageData;
      if (config.matchWallpaperToTheme) image = defImage;
      document.body.style.backgroundImage = "url("+image+")";
      console.log("setBG"+image)
    }
  
    // input for custom background images
    const bannerInput = document.createElement("input");
    bannerInput.type = "file";
    bannerInput.className = "banner-input";
    bannerInput.accept = ["image/jpeg", "image/apng", "image/avif", "image/gif", "image/png", "image/svg+xml", "image/webp"].join(",");
  
    // when user selects a custom background image
    bannerInput.onchange = () => {
      if (!bannerInput.files.length) return;
  
      const file = bannerInput.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        const result = event.target.result;
          try {
            localStorage.setItem("retroblur:startupBg", result);
          } catch {
            Spicetify.showNotification("File too large");
            return;
          }
          document.querySelector("#wallpaper-select img").src = result;
      };
      reader.readAsDataURL(file);
    };
  
    const wallpaperEdit = new Spicetify.Menu.Item(
        "Edit Wallpaper",
        false,
        () => {
            const content = document.createElement("div");
            content.innerHTML = `
            <div class="main-playlistEditDetailsModal-albumCover" id="wallpaper-select">
              <div class="main-entityHeader-image" draggable="false">
                <img aria-hidden="false" draggable="false" loading="eager" class="main-image-image main-entityHeader-image main-entityHeader-shadow"></div>
              <div class="main-playlistEditDetailsModal-imageChangeButton">
                <div class="main-editImage-buttonContainer">
                  <button class="main-editImageButton-image main-editImageButton-overlay" aria-haspopup="true" type="button">
                    <div class="main-editImageButton-icon icon">
                      <svg role="img" height="48" width="48" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 EQkJl"><path d="M17.318 1.975a3.329 3.329 0 114.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 01-1.28-1.28l1.581-4.376a4.726 4.726 0 011.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 00-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 001.001-.636L20.611 5.268a1.329 1.329 0 000-1.879z"></path></svg><span class="Type__TypeElement-goli3j-0 gAmaez main-editImageButton-copy">Choose photo</span></div></button></div></div><div class="main-playlistEditDetailsModal-imageDropDownContainer"><button class="main-playlistEditDetailsModal-imageDropDownButton" type="button"><svg role="img" height="16" width="16" viewBox="0 0 16 16" class="Svg-sc-1bi12j5-0 EQkJl"><path d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"></path></svg><span class="hidden-visually">Edit photo</span></button></div></div>`;
        
            const optionList = document.createElement("div");
        
            function createOption(name, desc, defVal) {
              const optionRow = document.createElement("div");
              optionRow.classList.add("retroblurOptionRow");
              optionRow.innerHTML = `
              <span class="retroblurOptionDesc">${desc}</span>
              <button class="retroblurOptionToggle">
                <span class="toggleWrapper">
                  <span class="toggle"></span>
                </span>
              </button>`;
              optionRow.setAttribute("name", name);
              optionRow.querySelector("button").addEventListener("click", () => {
                optionRow.querySelector(".toggle").classList.toggle("enabled");
              });
              const isEnabled = JSON.parse(localStorage.getItem(name)) ?? defVal;
              optionRow.querySelector(".toggle").classList.toggle("enabled", isEnabled);
              optionList.append(optionRow);
            }
        
            const srcInput = document.createElement("input");
            srcInput.type = "text";
            srcInput.classList.add("main-playlistEditDetailsModal-textElement", "main-playlistEditDetailsModal-titleInput");
            srcInput.id = "src-input";
            srcInput.placeholder = "Wallpaper image URL (recommended)";
            content.append(srcInput);
        
            createOption("matchWallpaperToTheme", "Match wallpaper to the color scheme", true);
        
            content.append(optionList);
        
            img = content.querySelector("img");
            img.src = localStorage.getItem("retroblur:startupBg") || defImage;
            const editButton = content.querySelector(".main-editImageButton-image.main-editImageButton-overlay");
            editButton.onclick = () => {
              bannerInput.click();
            };
            const removeButton = content.querySelector(".main-playlistEditDetailsModal-imageDropDownButton");
            removeButton.onclick = () => {
              content.querySelector("img").src = defImage;
            };
        
            const saveButton = document.createElement("button");
            saveButton.id = "wallpaper-save";
            saveButton.innerHTML = "Save";
        
            saveButton.addEventListener("click", () => {
              // update changed bg image
              startImage = srcInput.value || content.querySelector("img").src;
              localStorage.setItem("retroblur:startupBg", startImage);
        
              // save options to local storage
              [...optionList.children].forEach(option => {
                localStorage.setItem(option.getAttribute("name"), option.querySelector(".toggle").classList.contains("enabled"));
                console.log(`retroblur: ${option.getAttribute("name")} set to ${option.querySelector(".toggle").classList.contains("enabled")}`);
              });
              parseOptions();
              loopOptions("/")
            });
        
            content.append(saveButton);
        
            const issueButton = document.createElement("a");
            issueButton.classList.add("issue-button");
            issueButton.innerHTML = "Report Issue";
            issueButton.href = "https://github.com/Motschen/Retroblur/issues";
            content.append(issueButton);
        
            Spicetify.PopupModal.display({ title: "Retroblur Settings", content: content });
          },
        YouTubeSVG
    ).register()

    let trackContextMenu = new Spicetify.ContextMenu.Item("Edit Wallpaper", () => {}, true, YouTubeSVG)
    trackContextMenu.register()
  
    // startup parse
    loopOptions("/");
  })();