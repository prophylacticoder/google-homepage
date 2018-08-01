var monthCounter = new Date();
monthCounter = monthCounter.getMonth();
const monthInfo = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function myFunction() {
  var x = document.getElementById("apps-section"),
      style = window.getComputedStyle(x);

  if (style.getPropertyValue('display') === "none")
    x.style.display = "block";
  else {
    x.style.display = "none";
    document.getElementById('apps-section').style.overflowY = 'hidden';
    document.getElementById('more-menu-section').style.display = 'none';
    document.getElementById('moreBtn').style.display = 'block';
  }
}

function showMore() {
    document.getElementById('moreBtn').style.display = 'none';
    document.getElementById('apps-section').style.overflowY = 'scroll';
    document.getElementById('more-menu-section').style.display = 'block';
}

function showMoreDropdown() {
  var e = document.getElementById('sfilter-mdpul'),
      style = window.getComputedStyle(e),
      s = document.getElementById('sfilter-sdpul'),
      sdStyle = window.getComputedStyle(s);

  if (sdStyle.getPropertyValue('display') === 'block')
    s.style.display = 'none';

  if (style.getPropertyValue('display') === 'none')
    e.style.display = 'block';
  else e.style.display = 'none';

}

function showSettingsDropdown() {
  var e = document.getElementById('sfilter-sdpul'),
      style = window.getComputedStyle(e),
      m = document.getElementById('sfilter-mdpul'),
      mdStyle = window.getComputedStyle(m);

  if (mdStyle.getPropertyValue('display') === 'block')
    m.style.display = 'none';

  if (style.getPropertyValue('display') === 'none')
    e.style.display = 'block';
  else e.style.display = 'none';

}

function showSFOList() {
  var e = document.getElementById('search-filter-options'),
      style = window.getComputedStyle(e);

  if (style.getPropertyValue('opacity') === '0') {
    // display...
    e.style.opacity = '1';
    e.style.top = '140px';
    e.style.visibility = 'visible';
  } else {
    // Close the sfo-items-atc if it is displayed.
    var sfoAI = document.getElementById('sfo-items-atc');
    if (window.getComputedStyle(sfoAI).getPropertyValue('display') === 'block')
      sfoAI.style.display = 'none';

    e.style.opacity ='0';
    e.style.top = '115px';
    e.style.visibility = 'hidden';
  }

}

function showSFOItems() {
  var e = document.getElementById('sfo-items-atc'),
  style = window.getComputedStyle(e),
  s = document.getElementById('sfo-items-ar');

//  if (s.style.display === 'block')
  //  s.style.display = 'none';

  if (style.getPropertyValue('display') === 'none')
    e.style.display = 'block';
  else e.style.display = 'none';
}

function showCRWindow() {
  updateCalendarData();
}

function updateCalendarData(direction) {
  // Creates object of the month and year paragraph;
  var myp = document.getElementById('crwcmyp');
  var dtCells = document.getElementById('crwcdt').children[0];
  var cDate = new Date();
  var today = [cDate.getFullYear(), cDate.getMonth(), cDate.getDate()];

  cDate.setDate(1);

  switch (direction) {
    case -1:
      document.getElementById('crwcfm').classList.remove('disabled-appearance');
      monthCounter -= 1;
      cDate.setMonth(monthCounter);
      break;
    case 1:
      // Only go forward if the computed month is
      // less than the current month;
      if (monthCounter < cDate.getMonth()) {
        monthCounter += 1;
        // Is monthcounter = to the current month?
        if (monthCounter == cDate.getMonth())
          document.getElementById('crwcfm').classList.add('disabled-appearance');
        cDate.setMonth(monthCounter);
      }
      break;
  }

  myp.innerHTML = monthInfo[cDate.getMonth()] + ' ' + cDate.getFullYear();

  if (cDate.getDay() != 0) {
    cDate.setDate(-(cDate.getDay()) + 1);
  }

  // Set cells to respective days;
  for (var i = 1, cm = 0; i<7; i++) // Loop through rows
    for (var wcell = 0, cElement = dtCells.children[i].children[wcell]; wcell < 7;
    wcell++, cDate.setDate(cDate.getDate() + 1), cElement = dtCells.children[i].children[wcell]) {
      // Set cells' respective days
      cElement.innerHTML = cDate.getDate();

      // If It is the first row and it is the first day of the current month
      // then toggle cm;
      if (i == 1 && cDate.getDate() == 1)
        cm = 1;
      // If it is the first day of the next month then toggle cm;
      else if (i > 1 && cDate.getDate() == 1)
        cm = 0;

      // Check if the current cell holds a day of the current month
      // and add/remove a class based on that condition
      if (cm) {
        // Is this cell holding a future day?
        // If so, then add a specified class
        if (cDate.getFullYear() >= today[0] && cDate.getMonth() >= today[1] && cDate.getDate() > today[2] )
          cElement.classList.add('disabled-appearance');
        // Okay, it is not a future day, but the cell contains the class of future days
        // therefore we need to remove it;
        else if (cElement.classList.contains('disabled-appearance'))
          cElement.classList.remove('disabled-appearance');
      } else if (!cm) {
          if (cDate.getFullYear() >= today[0] && cDate.getMonth() >= today[1] && cDate.getDate() > today[2] )
            cElement.classList.add('disabled-appearance'); // attention here **
          else cElement.classList.add('disabled-appearance');

      }
    }
}
