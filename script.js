const countries = {
  "af-ZA": "Afrikaans",
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "az-AZ": "Azerbaijani",
  "be-BY": "Belarusian",
  "bem-ZM": "Bemba",
  "bg-BG": "Bulgarian",
  "bn-BD": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "de-DE": "German",
  "dv-MV": "Dhivehi",
  "dz-BT": "Dzongkha",
  "el-GR": "Greek",
  "en-GB": "English",
  "eo-EO": "Esperanto",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "Persian",
  "fi-FI": "Finnish",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "ga-IE": "Irish",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "ht-HT": "Haitian Creole",
  "hu-HU": "Hungarian",
  "hy-AM": "Armenian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "ka-GE": "Georgian",
  "kk-KZ": "Kazakh",
  "kl-GL": "Greenlandic",
  "km-KH": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lb-LU": "Luxembourgish",
  "lo-LA": "Lao",
  "lt-LT": "Lithuanian",
  "lv-LV": "Latvian",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "mk-MK": "Macedonian",
  "ml-IN": "Malayalam",
  "mn-MN": "Mongolian",
  "mr-IN": "Marathi",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "pa-IN": "Punjabi",
  "pl-PL": "Polish",
  "ps-AF": "Pashto",
  "pt-PT": "Portuguese",
  "qu-PE": "Quechua",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "rw-RW": "Kinyarwanda",
  "sd-PK": "Sindhi",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sl-SI": "Slovenian",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-KE": "Swahili",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-ET": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "tr-TR": "Turkish",
  "tt-RU": "Tatar",
  "uk-UA": "Ukrainian",
  "ur-PK": "Urdu",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "yo-NG": "Yoruba",
  "zh-CN": "Chinese",
  "zu-ZA": "Zulu"
};

const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromtext");
const toText = document.querySelector("#totext");
const icons = document.querySelectorAll(".fa-volume-high");
const copyIcons = document.querySelectorAll(".fa-copy");

// Populate dropdowns
selectTag.forEach((tag, id) => {
  for (const code in countries) {
    let selected = "";
    if (id === 0 && code === "en-GB") selected = "selected";
    else if (id === 1 && code === "hi-IN") selected = "selected";

    let option = `<option value="${code}" ${selected}>${countries[code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// Translate button click
translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim();
  let translateFrom = selectTag[0].value;
  let translateto = selectTag[1].value;

  if (!text) {
    alert("Please enter some text to translate.");
    return;
  }

  translateBtn.innerText = "Translating...";

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateto}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
    typeText(data.responseData.translatedText);
      translateBtn.innerText = "Translate";
    })
    .catch(() => {
      alert("Translation failed. Please try again.");
      translateBtn.innerText = "Translate";
    });
});

// Voice playback
icons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(
      index === 0 ? fromText.value : toText.value
    );
    utterance.lang = selectTag[index].value;
    speechSynthesis.speak(utterance);
  });
});

// Copy to clipboard
copyIcons.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    const textArea = index === 0 ? fromText : toText;
    navigator.clipboard.writeText(textArea.value);
  });
});


// Dark mode toggle

const toggle = document.createElement("button");
toggle.innerText = "🌙";
toggle.className = "darkToggle";
document.body.appendChild(toggle);

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Type text effect
function typeText(text) {
  toText.value = "";
  let i = 0;

  const interval = setInterval(() => {
    toText.value += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30); // Speed: 30ms per character
}


// Swap languages
swapBtn.addEventListener("click", () => {
  // Swap selected languages
  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;

  // Swap text content
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;
});

const historyPanel = document.querySelector("#historyPanel");
const toggleHistory = document.querySelector("#toggleHistory");




