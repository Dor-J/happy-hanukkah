'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const candles = [
    document.querySelector('.candle--1'),
    document.querySelector('.candle--2'),
    document.querySelector('.candle--3'),
    document.querySelector('.candle--4'),
    document.querySelector('.candle--5'),
    document.querySelector('.candle--6'),
    document.querySelector('.candle--7'),
    document.querySelector('.candle--8'),
  ]
  const shamash = document.querySelector('.candle--shamash')

  function getHanukkahNight() {
    const dayOfHannukah = getDayOfHannukah()
    if (!dayOfHannukah) return 0 // not Hanukkah
    return dayOfHannukah
  }

  const currentNight = getHanukkahNight()

  // If it's Hanukkah, light that many candles + shamash
  if (currentNight > 0) {
    // Always light the shamash
    shamash?.classList.remove('candle--off')

    for (let i = 0; i < currentNight; i++) {
      candles[i].classList.remove('candle--off')
    }
  }

  // Attach click event to each candle so user can toggle on/off
  ;[...candles, shamash].forEach((candleEl) => {
    candleEl.addEventListener('click', () => {
      candleEl.classList.toggle('candle--off')
    })
  })
})

/********************************
 * 2) LANGUAGE TOGGLE LOGIC
 ********************************/
const elLangToggleBtn = document.getElementById('lang-toggle')
const elHtml = document.documentElement // <html>
const elLangSections = document.querySelector('.lang-section')

// store user preference in localStorage if possible, or fallback
const STORAGE_KEY = 'hanukkahLangPreference'

// Utility: set language mode
function setLanguage(langMode) {
  // “en” or “he”
  if (langMode === 'he') {
    // hide English, show Hebrew
    elLangSections.classList.add('is-heb')
    elLangSections.classList.remove('is-en')
    elLangToggleBtn.textContent = 'Switch to English'
    // <html lang="he">
    elHtml.setAttribute('lang', 'he')
  } else {
    // hide Hebrew, show English
    elLangSections.classList.add('is-en')
    elLangSections.classList.remove('is-heb')
    elLangToggleBtn.textContent = 'Switch to Hebrew'
    elHtml.setAttribute('lang', 'en')
  }
  // store preference
  localStorage.setItem(STORAGE_KEY, langMode)
}

// On page load, auto-detect or read from storage
function initLanguage() {
  // 1) Check localStorage
  const savedLang = localStorage.getItem(STORAGE_KEY)
  if (savedLang) {
    setLanguage(savedLang)
    return
  }
  // 2) If not in localStorage, detect from browser
  // e.g. Chrome stores user’s preferred languages in navigator.languages
  const userLang =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0] // first preferred
      : navigator.language
  // If "he" is at start, we assume Hebrew
  if (userLang.toLowerCase().startsWith('he')) {
    setLanguage('he')
  } else {
    setLanguage('en')
  }
}

initLanguage()

// Toggle button handler
elLangToggleBtn.addEventListener('click', () => {
  // If Hebrew active => switch to English, else switch to Hebrew
  if (elLangSections.classList.contains('is-heb')) {
    setLanguage('en')
  } else {
    setLanguage('he')
  }
})

function renderBlessing(blessingData) {
  const elInfo = document.querySelector('.hanukkah-info .info')
  const elBlessingEn = document.querySelector('.hanukkah-info .blessing-en')
  const elBlessingHe = document.querySelector('.hanukkah-info .blessing-he')
  elInfo.innerHTML = `
          <p>Today is Hanukkah! (${blessingData.info[0]}). It's Day ${blessingData.info[1]} of Hanukkah ${blessingData.info[2]}.</p>
      `
  elBlessingEn.innerHTML = `
          
          <p><strong>Blessing in English:</strong></p>
          <p>${blessingData.blEN.join('<br>')}</p>
          
      `
  elBlessingHe.innerHTML = `
          
          <p><strong>Blessing in Hebrew:</strong></p>
          <p>${blessingData.blHE.join('<br>')}</p>
      `
}
