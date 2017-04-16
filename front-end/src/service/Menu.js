angular.module("Menu", [])
    .factory("Menu", () => {
         const id = data => document.getElementById(data);
         const menu = id("menu");
         const menuContent = id("menu-content");

         const showMenu = () => {
             menu.classList.remove("hideMenu");
             setTimeout(() => {
                 menu.classList.add("showMenu");
             });

             menuContent.classList.remove("hideContent");
             setTimeout(() => {
                 menuContent.classList.add("showContent");
             });

         };

         const hideMenu = () => {
             menu.classList.remove("showMenu");
             menu.classList.add("hideMenu");

             menuContent.classList.remove("showContent");
             menuContent.classList.add("hideContent");
         };

        return {
            showMenu: showMenu,
            hideMenu: hideMenu
        }

    });