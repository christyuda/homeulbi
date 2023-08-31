import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import {
  CihuyPostHeaders,
  CihuyGetHeaders,
} from "https://c-craftjs.github.io/api/api.js";
import { CihuyQuerySelector } from "https://c-craftjs.github.io/element/element.js";

document.addEventListener("DOMContentLoaded", function () {
  // Dapatkan elemen dengan ID "rtm"
  let rtmLink = document.getElementById("rtm");

  // Dapatkan nilai cookie "login"
  let token = CihuyGetCookie("login");

  // Tambahkan event listener untuk mengarahkan saat elemen diklik
  rtmLink.addEventListener("click", function (event) {
    event.preventDefault(); // Mencegah perilaku default tautan

    if (token) {
      // Buat URL baru dengan menambahkan parameter uuid (gunakan nilai token)
      let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;

      // Arahkan pengguna ke URL baru
      window.location.assign(newUrl);
    } else {
      console.log("Token tidak ditemukan dalam cookie.");
    }
  });
});

export function handleRtmClick(event) {
  event.preventDefault();

  if (token) {
    let newUrl = `https://rtm.ulbi.ac.id/index.php/auth?uuid=${token}`;
    window.location.assign(newUrl);
  } else {
    console.log("Token tidak ditemukan dalam cookie.");
  }
}

//membuat get user

document.addEventListener("DOMContentLoaded", () => {
  const simpelbiCard = document.getElementById("simpelbiCard");

  if (simpelbiCard) {
    simpelbiCard.addEventListener("click", async (event) => {
      event.preventDefault();

      const postApiUrlMenu = "https://simbe-dev.ulbi.ac.id/api/v1/menu/";

      try {
        let token = CihuyGetCookie("login");

        // Lakukan permintaan POST
        await CihuyPostHeaders(postApiUrlMenu, token);

        console.log("Permintaan POST berhasil dilakukan");
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});
