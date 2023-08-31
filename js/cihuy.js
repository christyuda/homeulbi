import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import { CihuyPostHeaders } from "https://c-craftjs.github.io/api/api.js";
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

      const apiUrlMenu = "https://simbe-dev.ulbi.ac.id/api/v1/menu/";
      const baseUrl = "https://euis.ulbi.ac.id";

      try {
        let token = CihuyGetCookie("login");
        const postResult = await CihuyPostHeaders(apiUrlMenu, token);
        const postData = await postResult.json();
        const dataUrl = postData.data;

        let userRole = "";
        if (dataUrl === "/admins") {
          userRole = "admin";
        } else if (dataUrl === "/fakultas") {
          userRole = "fakultas";
        } else if (dataUrl === "/prodi") {
          userRole = "prodi";
        } else if (dataUrl === "/auditors") {
          userRole = "auditor";
        } else {
          console.error("URL tidak sesuai");
          return;
        }

        redirectToDashboard(baseUrl, dataUrl, userRole);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});

function redirectToDashboard(baseUrl, dataUrl, userRole) {
  const finalUrl = `${baseUrl}/simpelbi${dataUrl}/${userRole}`;
  window.location.href = finalUrl;
}
