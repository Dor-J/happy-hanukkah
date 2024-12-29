'use strict'

var gDayOfHanukkah = 0
var gDaysUntil = null
// Hanukkah dates for 2024–2042
const hanukkahDates = [
  { year: 2024, start: '2024-12-25', end: '2025-01-01' },
  { year: 2025, start: '2025-12-14', end: '2025-12-22' },
  { year: 2026, start: '2026-12-04', end: '2026-12-12' },
  { year: 2027, start: '2027-12-25', end: '2028-01-01' },
  { year: 2028, start: '2028-12-12', end: '2028-12-20' },
  { year: 2029, start: '2029-12-02', end: '2029-12-10' },
  { year: 2030, start: '2030-12-20', end: '2030-12-28' },
  { year: 2031, start: '2031-12-09', end: '2031-12-17' },
  { year: 2032, start: '2032-11-27', end: '2032-12-05' },
  { year: 2033, start: '2033-12-17', end: '2033-12-25' },
  { year: 2034, start: '2034-12-06', end: '2034-12-14' },
  { year: 2035, start: '2035-12-25', end: '2036-01-02' },
  { year: 2036, start: '2036-12-14', end: '2036-12-22' },
  { year: 2037, start: '2037-12-04', end: '2037-12-12' },
  { year: 2038, start: '2038-12-24', end: '2039-01-01' },
  { year: 2039, start: '2039-12-13', end: '2039-12-21' },
  { year: 2040, start: '2040-12-02', end: '2040-12-10' },
  { year: 2041, start: '2041-12-21', end: '2041-12-29' },
  { year: 2042, start: '2042-12-10', end: '2042-12-18' },
]

// Blessings for Hanukkah
const blessings = {
  english: [
    'Blessed are You, Lord our God, King of the Universe, who has sanctified us with His commandments and commanded us to light the Hanukkah candle.',
    'Blessed are You, Lord our God, King of the Universe, who performed miracles for our ancestors in those days at this time.',
    'Blessed are You, Lord our God, King of the Universe, who has granted us life, sustained us, and enabled us to reach this occasion.',
  ],
  hebrew: [
    "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם אֲשֶׁר קִדְּשָׁנוּ בְּמִצְוֹתָיו וְצִוָּנוּ לְהַדְלִיק נֵר שֶׁל חֲנֻכָּה",
    "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם שֶׁעָשָׂה נִסִּים לַאֲבוֹתֵינוּ בַּיָּמִים הָהֵם בַּזְּמַן הַזֶּה",
    "בָּרוּךְ אַתָּה ה' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם שֶׁהֶחֱיָנוּ וְקִיְּמָנוּ וְהִגִּיעָנוּ לַזְּמַן הַזֶּה",
  ],
}

// Function to check if today is Hanukkah and determine the day
function checkHanukkah() {
  const today = new Date()
  const todayString = today.toISOString().split('T')[0] // Get YYYY-MM-DD format

  for (const { year, start, end } of hanukkahDates) {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (today >= startDate && today <= endDate) {
      const dayOfHanukkah = Math.floor(
        (today - startDate) / (1000 * 60 * 60 * 24) + 1
      )
      if (gDayOfHanukkah === 0) {
        updateDayOfHannukah(dayOfHanukkah)
      }

      renderBlessing({
        info: [todayString, dayOfHanukkah, year],
        blEN: blessings.english,
        blHE: blessings.hebrew,
      })

      return
    }
  }

  // If not Hanukkah, display a message
  const elInfo = document.querySelector('.hanukkah-info .info')
  elInfo.innerHTML = `<p>Today (${todayString}) is not Hanukkah.</p>`
}
// Function to calculate days until the next Hanukkah
function daysUntilHanukkah() {
  const today = new Date()

  for (const { year, start } of hanukkahDates) {
    const startDate = new Date(start)
    if (today <= startDate) {
      const daysUntil = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24))

      gDaysUntil = daysUntil
      return
    }
  }
  gDaysUntil = null
}

// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', daysUntilHanukkah)
// Call the function after the DOM is loaded
document.addEventListener('DOMContentLoaded', checkHanukkah)

function updateDayOfHannukah(dayOfHanukkah) {
  gDayOfHanukkah = dayOfHanukkah
}
function getDayOfHannukah() {
  return gDayOfHanukkah === 0 ? false : gDayOfHanukkah
}
function getDaysUntilHannukah() {
  return !gDaysUntil ? gDaysUntil : false
}
