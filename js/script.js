'use strrict'

import { HDate } from 'hebcal'

// Immediately run once the DOM is parsed
document.addEventListener('DOMContentLoaded', () => {
  // 1) Get references to candle elements
  //    We'll have 8 "regular" candles + 1 shamash in the middle
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

  // 2) Use Hebcal to figure out if we're within Hanukkah, and if so, which night
  //    We'll do so by comparing today's HDate to the first day of Hanukkah
  //    for the current Hebrew year
  function getHanukkahNight() {
    // "today" in local time
    const today = new Date()

    // Convert to Hebrew date
    const hToday = new HDate(today)

    // Get Hebrew year (ex: 5784)
    const hebYear = hToday.getFullYear()

    // The first day of Hanukkah (25 Kislev) for that Hebrew year
    // Hebcal.HDate.hanukkah(hebrewYear) => returns an HDate for day #1 of Hanukkah
    const firstDay = HDate.hanukkah(hebYear)
    // For an 8-day holiday, day #8 ends the cycle
    const dayIndex = hToday.abs() - firstDay.abs() + 1

    // If dayIndex is between 1..8, we're within Hanukkah
    // Otherwise, not in Hanukkah
    if (dayIndex >= 1 && dayIndex <= 8) {
      return dayIndex // 1st night => 1, up to 8th night => 8
    } else {
      return 0 // not Hanukkah
    }
  }

  const currentNight = getHanukkahNight()

  // 3) If it's Hanukkah, light that many candles + shamash
  //    e.g. if currentNight = 4, we light 4 candles + shamash
  if (currentNight > 0) {
    // Always light the shamash
    shamash?.classList.remove('candle--off')

    // Light the correct number of candles from right to left
    // By tradition, on night #1 we light the rightmost candle, on #2 we light rightmost 2, etc.
    // The DOM might not be in that order visually, but let's assume .candle--1 is rightmost
    // or adapt as needed.
    // We'll just light the first N in the array. Adjust if your layout is reversed.
    for (let i = 0; i < currentNight; i++) {
      candles[i].classList.remove('candle--off')
    }
  }

  // 4) Attach click event to each candle so user can toggle on/off
  ;[...candles, shamash].forEach((candleEl) => {
    candleEl.addEventListener('click', () => {
      candleEl.classList.toggle('candle--off')
    })
  })
})

/********************************
 * 2) LANGUAGE TOGGLE LOGIC
 ********************************/
const langToggleBtn = document.getElementById('lang-toggle')
const htmlEl = document.documentElement // <html>
const langSections = document.querySelector('.lang-section')

// We’ll store user preference in localStorage if possible, or fallback
const STORAGE_KEY = 'hanukkahLangPreference'

// Utility: set language mode
function setLanguage(langMode) {
  // “en” or “he”
  if (langMode === 'he') {
    // hide English, show Hebrew
    langSections.classList.add('is-heb')
    langSections.classList.remove('is-en')
    langToggleBtn.textContent = 'Switch to English'
    // <html lang="he">
    htmlEl.setAttribute('lang', 'he')
  } else {
    // hide Hebrew, show English
    langSections.classList.add('is-en')
    langSections.classList.remove('is-heb')
    langToggleBtn.textContent = 'Switch to Hebrew'
    htmlEl.setAttribute('lang', 'en')
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
langToggleBtn.addEventListener('click', () => {
  // If Hebrew active => switch to English, else switch to Hebrew
  if (langSections.classList.contains('is-heb')) {
    setLanguage('en')
  } else {
    setLanguage('he')
  }
})
