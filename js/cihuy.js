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

        // Lakukan permintaan POST untuk mendapatkan data
        const postResult = await CihuyPostHeaders(postApiUrlMenu, token, {});

        // Parse respons JSON dari permintaan POST
        const postData = JSON.parse(postResult);

        // Ambil data URL dari respons POST
        const dataUrl = postData.data;

        // Tentukan peran pengguna berdasarkan data URL
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

        // Buat URL akhir dan lakukan permintaan GET
        const finalUrl = `${getBaseUrl}/simpelbi${dataUrl}/${userRole}`;
        const getResult = await CihuyGetHeaders(finalUrl, token);
        console.log("GET Result:", getResult); // Lakukan apa yang perlu dilakukan dengan hasil GET di sini
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }
});
